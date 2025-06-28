import { LoopsClient } from "loops";
import { prisma } from '@/lib/db/prisma';
import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

// Configuration
const CONFIG = {
  LOOPS_UPDATES_PATH: path.join(process.cwd(), 'customer-analysis/output/consolidated-customers.csv'),
  MIGRATION_LOG_PATH: path.join(process.cwd(), 'customer-analysis/output/loops-cleanup-log.json'),
  RATE_LIMIT: {
    requests: 8, // Loops rate limit is 10/second, keeping it under
    perSeconds: 1,
  },
  BATCH_SIZE: 5,
  MAX_CONTACTS: parseInt(process.env.MAX_CONTACTS || '5'),
  DRY_RUN: process.env.DRY_RUN === 'true',
};

interface LoopsUpdate {
  email: string;
  name: string;
  status: string;
  total_spent: string;
  sources: string;
  plans: string;
  first_seen: string;
  last_activity: string;
  stripe_customer_id: string;
  memberstack_id: string;
  loops_user_id: string;
}

interface CleanupLog {
  processedEmails: string[];
  successfulUpdates: Array<{
    email: string;
    updates: any;
    timestamp: string;
  }>;
  failedUpdates: Array<{
    email: string;
    error: string;
    timestamp: string;
  }>;
  skippedEmails: Array<{
    email: string;
    reason: string;
    timestamp: string;
  }>;
  totalProcessed: number;
  startedAt: string;
  lastUpdatedAt: string;
}

class RateLimiter {
  private requestTimes: number[] = [];

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const windowStart = now - (CONFIG.RATE_LIMIT.perSeconds * 1000);
    
    this.requestTimes = this.requestTimes.filter(time => time > windowStart);
    
    if (this.requestTimes.length >= CONFIG.RATE_LIMIT.requests) {
      const oldestRequest = this.requestTimes[0];
      const waitTime = oldestRequest + (CONFIG.RATE_LIMIT.perSeconds * 1000) - now + 100;
      
      if (waitTime > 0) {
        console.log(`⏳ Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    this.requestTimes.push(Date.now());
  }
}

function loadCleanupLog(): CleanupLog {
  if (existsSync(CONFIG.MIGRATION_LOG_PATH)) {
    const data = readFileSync(CONFIG.MIGRATION_LOG_PATH, 'utf-8');
    return JSON.parse(data);
  }
  
  return {
    processedEmails: [],
    successfulUpdates: [],
    failedUpdates: [],
    skippedEmails: [],
    totalProcessed: 0,
    startedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
  };
}

function saveCleanupLog(log: CleanupLog): void {
  log.lastUpdatedAt = new Date().toISOString();
  writeFileSync(CONFIG.MIGRATION_LOG_PATH, JSON.stringify(log, null, 2));
}

function determineUserGroup(update: LoopsUpdate, dbUser?: any): string {
  // If we have a database user with a plan, use that
  if (dbUser?.plan) {
    switch (dbUser.plan) {
      case 'TEAM':
        return 'Team Customer';
      case 'PRO':
        return 'Pro Customer';
      default:
        return 'Free User';
    }
  }
  
  // Fallback logic based on plan
  const plans = update.plans.toLowerCase();
  if (plans.includes('team') || plans.includes('business')) {
    return 'Team Customer';
  } else if (plans.includes('pro') || update.status === 'paid') {
    return 'Pro Customer';
  }
  
  return 'Free User';
}

function determinePlan(update: LoopsUpdate, dbUser?: any): string {
  // If we have a database user with a plan, use that
  if (dbUser?.plan) {
    return dbUser.plan; // Will be 'PRO' or 'TEAM'
  }
  
  // Otherwise, determine from CSV data
  const plans = update.plans.toLowerCase();
  
  // Check for team/business plans
  if (plans.includes('team') || plans.includes('business')) {
    return 'TEAM';
  }
  
  // Check for pro plans or paid status
  if (plans.includes('pro')) {
    return 'PRO';
  }
  
  // If they have paid status but no clear plan type, assume PRO
  if (update.status === 'paid' && update.total_spent !== '$0.00') {
    return 'PRO';
  }
  
  return ''; // No plan (free user, signed up but didn't buy)
}

function determineSource(update: LoopsUpdate): string {
  // Determine the original source from the CSV sources field
  const sources = update.sources?.toLowerCase() || '';
  
  // Check in priority order - where they FIRST came from
  // Priority: Gumroad (1st platform) → LemonSqueezy (2nd) → Memberstack (3rd)
  if (sources.includes('gumroad')) {
    return 'Gumroad';
  } else if (sources.includes('lemonsqueezy')) {
    return 'LemonSqueezy';
  } else if (sources.includes('memberstack')) {
    return 'Memberstack';
  }
  
  // If no source found, check if they're just in loops
  if (sources.includes('loops')) {
    return 'Direct';
  }
  
  // Check for Stripe direct
  if (sources.includes('stripe')) {
    return 'Stripe';
  }
  
  return 'Unknown';
}

async function updateLoopsContact(
  update: LoopsUpdate, 
  rateLimiter: RateLimiter
): Promise<{ success: boolean; updates?: any; error?: string; skipped?: boolean; skipReason?: string }> {
  try {
    // Check if user exists in our database
    const dbUser = await prisma.user.findUnique({
      where: { email: update.email },
      select: { 
        id: true, 
        email: true, 
        plan: true,
        stripeCustomerId: true,
        createdAt: true,
      }
    });
    
    // Also check if they're part of an organization (for team role detection)
    let organizationMember = null;
    let isTeamPurchaser = false;
    
    if (dbUser) {
      organizationMember = await prisma.organizationMember.findFirst({
        where: { userId: dbUser.id },
        include: { organization: true }
      });
      
      // Check if they made a team purchase
      const teamPurchase = await prisma.purchase.findFirst({
        where: {
          userId: dbUser.id,
          plan: { in: ['TEAM_5', 'TEAM_10'] },
          status: 'COMPLETED'
        }
      });
      
      isTeamPurchaser = !!teamPurchase;
    }
    
    // Don't skip anyone - this is a CRM, include everyone
    
    // Determine the correct user group and plan
    const userGroup = determineUserGroup(update, dbUser);
    const plan = determinePlan(update, dbUser);
    const source = determineSource(update);
    
    // Build the update payload
    const contactUpdate: any = {
      userGroup,
      plan, // Single plan field: '', 'PRO', or 'TEAM'
      source, // Gumroad, LemonSqueezy, or Memberstack
      lastUpdated: new Date().toISOString(),
    };
    
    // Add user ID if available
    if (dbUser) {
      contactUpdate.userId = dbUser.id;
      
      // Add team role if they're in an organization
      if (organizationMember) {
        contactUpdate.teamRole = organizationMember.role === 'ADMIN' ? 'admin' : 'member';
        contactUpdate.teamName = organizationMember.organization.name;
        
        // Override to show they're the purchaser if they bought the team plan
        if (isTeamPurchaser) {
          contactUpdate.teamRole = 'purchaser';
        }
      }
    }
    
    // For legacy team customers without database records, try to identify purchasers
    // Business plan purchasers are likely the team admins
    if (!dbUser && plan === 'TEAM' && update.plans.toLowerCase().includes('business')) {
      contactUpdate.teamRole = 'purchaser';
    }
    
    // Add total spent for reference
    contactUpdate.totalSpent = update.total_spent;
    
    if (CONFIG.DRY_RUN) {
      console.log(`   🔍 [DRY RUN] Would update ${update.email}:`, contactUpdate);
      return { success: true, updates: contactUpdate };
    }
    
    // Rate limit check
    await rateLimiter.waitIfNeeded();
    
    // Just try to update first, create if it fails
    const loops = new LoopsClient(process.env.LOOPS_API_KEY!);
    let action = 'Updated';
    
    try {
      // Try to update first
      await loops.updateContact(update.email, contactUpdate);
    } catch (error: any) {
      // If update fails because contact doesn't exist, create it
      if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
        action = 'Created';
        await loops.createContact(update.email, contactUpdate);
      } else {
        // Re-throw other errors
        throw error;
      }
    }
    
    console.log(`   ✅ ${action} ${update.email} - Group: ${userGroup}, Plan: ${plan || 'Free'}, Source: ${source}${contactUpdate.teamRole ? `, Role: ${contactUpdate.teamRole}` : ''}`);
    
    return { success: true, updates: contactUpdate };
    
  } catch (error) {
    console.error(`   ❌ Failed to update ${update.email}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function main() {
  console.log('🧹 Starting Loops Contact Cleanup\n');
  console.log(`📋 Configuration:`);
  console.log(`   - Max contacts to process: ${CONFIG.MAX_CONTACTS}`);
  console.log(`   - Rate limit: ${CONFIG.RATE_LIMIT.requests} requests per ${CONFIG.RATE_LIMIT.perSeconds} seconds`);
  console.log(`   - CSV file: ${CONFIG.LOOPS_UPDATES_PATH}`);
  console.log(`   - Log file: ${CONFIG.MIGRATION_LOG_PATH}`);
  console.log(`   - Mode: ${CONFIG.DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);
  
  try {
    // Load CSV data
    const csvContent = readFileSync(CONFIG.LOOPS_UPDATES_PATH, 'utf-8');
    const updates: LoopsUpdate[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });
    
    console.log(`📊 Found ${updates.length} total contacts in CSV\n`);
    
    // Load cleanup log
    const cleanupLog = loadCleanupLog();
    console.log(`📝 Cleanup status:`);
    console.log(`   - Already processed: ${cleanupLog.processedEmails.length}`);
    console.log(`   - Successful updates: ${cleanupLog.successfulUpdates.length}`);
    console.log(`   - Failed updates: ${cleanupLog.failedUpdates.length}`);
    console.log(`   - Skipped: ${cleanupLog.skippedEmails.length}\n`);
    
    // Filter out already processed contacts
    let contactsToProcess = updates
      .filter(u => !cleanupLog.processedEmails.includes(u.email));
    
    // If SKIP_TO environment variable is set, skip to that index
    const skipTo = parseInt(process.env.SKIP_TO || '0');
    if (skipTo > 0) {
      console.log(`⏭️  Skipping to index ${skipTo}...\n`);
      contactsToProcess = contactsToProcess.slice(skipTo);
    }
    
    contactsToProcess = contactsToProcess.slice(0, CONFIG.MAX_CONTACTS);
    
    if (contactsToProcess.length === 0) {
      console.log('✅ All contacts have been processed!');
      return;
    }
    
    console.log(`🎯 Processing ${contactsToProcess.length} contacts...\n`);
    
    const rateLimiter = new RateLimiter();
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;
    
    // Process contacts
    for (let i = 0; i < contactsToProcess.length; i++) {
      const update = contactsToProcess[i];
      console.log(`\n[${i + 1}/${contactsToProcess.length}] Processing ${update.email}...`);
      
      const result = await updateLoopsContact(update, rateLimiter);
      
      // Update cleanup log
      cleanupLog.processedEmails.push(update.email);
      
      if (result.skipped) {
        skipCount++;
        cleanupLog.skippedEmails.push({
          email: update.email,
          reason: result.skipReason!,
          timestamp: new Date().toISOString(),
        });
      } else if (result.success) {
        successCount++;
        cleanupLog.successfulUpdates.push({
          email: update.email,
          updates: result.updates!,
          timestamp: new Date().toISOString(),
        });
      } else {
        failCount++;
        cleanupLog.failedUpdates.push({
          email: update.email,
          error: result.error!,
          timestamp: new Date().toISOString(),
        });
      }
      
      cleanupLog.totalProcessed++;
      
      // Save progress after each contact
      if (!CONFIG.DRY_RUN) {
        saveCleanupLog(cleanupLog);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Cleanup Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   ⏭️  Skipped: ${skipCount}`);
    console.log(`   📁 Total processed in this run: ${contactsToProcess.length}`);
    console.log(`   📁 Total processed overall: ${cleanupLog.totalProcessed}`);
    console.log(`   📁 Remaining: ${updates.length - cleanupLog.processedEmails.length}`);
    console.log('='.repeat(60) + '\n');
    
    if (CONFIG.DRY_RUN) {
      console.log('ℹ️  This was a DRY RUN. No actual updates were made.');
      console.log('   To run for real, remove DRY_RUN=true from the command.\n');
    }
    
  } catch (error) {
    console.error('\n💥 Cleanup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
main()
  .then(() => {
    console.log('\n✅ Loops cleanup batch completed!');
    console.log('To continue with more contacts, increase MAX_CONTACTS and run again.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Cleanup failed:', error);
    process.exit(1);
  });