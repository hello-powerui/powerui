import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db/prisma';
import { UserService } from '@/lib/db/services/user-service';
import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

// Configuration
const CONFIG = {
  CSV_PATH: path.join(process.cwd(), 'customer-analysis/output/consolidated-customers.csv'),
  MIGRATION_LOG_PATH: path.join(process.cwd(), 'customer-analysis/output/migration-log.json'),
  RATE_LIMIT: {
    requests: 20,
    perSeconds: 10,
  },
  BATCH_SIZE: 5, // Process 5 users at a time
  TEST_MODE: process.env.TEST_MODE === 'true',
  MAX_USERS: parseInt(process.env.MAX_USERS || '5'), // Start with 5 users
};

interface Customer {
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

interface MigrationLog {
  processedEmails: string[];
  failedMigrations: Array<{
    email: string;
    error: string;
    timestamp: string;
  }>;
  successfulMigrations: Array<{
    email: string;
    clerkId: string;
    timestamp: string;
  }>;
  lastProcessedIndex: number;
  totalProcessed: number;
  startedAt: string;
  lastUpdatedAt: string;
}

class RateLimiter {
  private requestTimes: number[] = [];

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const windowStart = now - (CONFIG.RATE_LIMIT.perSeconds * 1000);
    
    // Remove old requests outside the window
    this.requestTimes = this.requestTimes.filter(time => time > windowStart);
    
    // If we've hit the rate limit, wait
    if (this.requestTimes.length >= CONFIG.RATE_LIMIT.requests) {
      const oldestRequest = this.requestTimes[0];
      const waitTime = oldestRequest + (CONFIG.RATE_LIMIT.perSeconds * 1000) - now + 100; // Add 100ms buffer
      
      if (waitTime > 0) {
        console.log(`⏳ Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    this.requestTimes.push(Date.now());
  }
}

function loadMigrationLog(): MigrationLog {
  if (existsSync(CONFIG.MIGRATION_LOG_PATH)) {
    const data = readFileSync(CONFIG.MIGRATION_LOG_PATH, 'utf-8');
    return JSON.parse(data);
  }
  
  return {
    processedEmails: [],
    failedMigrations: [],
    successfulMigrations: [],
    lastProcessedIndex: 0,
    totalProcessed: 0,
    startedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
  };
}

function saveMigrationLog(log: MigrationLog): void {
  log.lastUpdatedAt = new Date().toISOString();
  writeFileSync(CONFIG.MIGRATION_LOG_PATH, JSON.stringify(log, null, 2));
}

function parseCustomerName(name: string): { firstName: string; lastName: string; username: string } {
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || 'User';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Generate username from email or name
  const username = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20) || `user${Date.now()}`;
  
  return { firstName, lastName, username };
}

function determinePlan(customer: Customer): 'PRO' | 'TEAM' | null {
  const plans = customer.plans.toLowerCase();
  
  // Check for team plans
  if (plans.includes('team') || plans.includes('business')) {
    return 'TEAM';
  }
  
  // Check for pro plans
  if (plans.includes('pro') || customer.status === 'paid') {
    return 'PRO';
  }
  
  return null;
}

async function migrateCustomer(customer: Customer, rateLimiter: RateLimiter): Promise<{ success: boolean; clerkId?: string; error?: string }> {
  try {
    // Rate limit check
    await rateLimiter.waitIfNeeded();
    
    const clerk = await clerkClient();
    const { firstName, lastName, username } = parseCustomerName(customer.name);
    
    // Check if user already exists in Clerk
    const existingUsers = await clerk.users.getUserList({
      emailAddress: [customer.email]
    });
    
    let clerkUser;
    if (existingUsers.data.length > 0) {
      console.log(`   ⚠️  User ${customer.email} already exists in Clerk`);
      clerkUser = existingUsers.data[0];
    } else {
      // Create user in Clerk
      const userData: any = {
        emailAddress: [customer.email],
        firstName,
        lastName,
        username,
        skipPasswordRequirement: true,
        skipPasswordChecks: true,
        legal_accepted_at: new Date().toISOString(),
      };
      
      if (customer.stripe_customer_id) {
        userData.publicMetadata = {
          stripeCustomerId: customer.stripe_customer_id,
          migrationSource: customer.sources,
          migrationDate: new Date().toISOString(),
        };
      }
      
      clerkUser = await clerk.users.createUser(userData);
      console.log(`   ✅ Created Clerk user: ${customer.email} (${clerkUser.id})`);
    }
    
    // Create/Update user in database
    const dbUser = await UserService.upsertUser(
      clerkUser.id,
      customer.email,
      username
    );
    
    // Assign plan if applicable
    const plan = determinePlan(customer);
    if (plan) {
      await prisma.user.update({
        where: { id: clerkUser.id },
        data: { 
          plan,
          stripeCustomerId: customer.stripe_customer_id || undefined,
        }
      });
      console.log(`   ✅ Assigned ${plan} plan to ${customer.email}`);
    }
    
    // Create purchase record if they have a paid plan
    if (plan && customer.total_spent !== '$0.00') {
      const amount = Math.round(parseFloat(customer.total_spent.replace('$', '')) * 100);
      
      await prisma.purchase.create({
        data: {
          userId: clerkUser.id,
          stripeCustomerId: customer.stripe_customer_id || `migration_${customer.memberstack_id || Date.now()}`,
          stripePaymentId: `migration_${customer.memberstack_id || Date.now()}_${Date.now()}`,
          stripePriceId: plan === 'PRO' ? (process.env.STRIPE_PRO_PRICE_ID || 'price_migration') : (process.env.STRIPE_TEAM_5_PRICE_ID || 'price_migration'),
          amount: amount || 0,
          currency: 'usd',
          plan: plan === 'PRO' ? 'PRO' : 'TEAM_5',
          status: 'COMPLETED',
        }
      });
      console.log(`   ✅ Created purchase record for ${customer.email}`);
    }
    
    return { success: true, clerkId: clerkUser.id };
    
  } catch (error) {
    console.error(`   ❌ Failed to migrate ${customer.email}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function main() {
  console.log('🚀 Starting customer migration to Clerk\n');
  console.log(`📋 Configuration:`);
  console.log(`   - Max users to process: ${CONFIG.MAX_USERS}`);
  console.log(`   - Rate limit: ${CONFIG.RATE_LIMIT.requests} requests per ${CONFIG.RATE_LIMIT.perSeconds} seconds`);
  console.log(`   - CSV file: ${CONFIG.CSV_PATH}`);
  console.log(`   - Log file: ${CONFIG.MIGRATION_LOG_PATH}\n`);
  
  try {
    // Load CSV data
    const csvContent = readFileSync(CONFIG.CSV_PATH, 'utf-8');
    const customers: Customer[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });
    
    console.log(`📊 Found ${customers.length} total customers in CSV\n`);
    
    // Load migration log
    const migrationLog = loadMigrationLog();
    console.log(`📝 Migration status:`);
    console.log(`   - Already processed: ${migrationLog.processedEmails.length}`);
    console.log(`   - Failed migrations: ${migrationLog.failedMigrations.length}`);
    console.log(`   - Successful migrations: ${migrationLog.successfulMigrations.length}\n`);
    
    // Filter out already processed customers
    const customersToProcess = customers
      .filter(c => !migrationLog.processedEmails.includes(c.email))
      .slice(0, CONFIG.MAX_USERS);
    
    if (customersToProcess.length === 0) {
      console.log('✅ All customers have been processed!');
      return;
    }
    
    console.log(`🎯 Processing ${customersToProcess.length} customers...\n`);
    
    const rateLimiter = new RateLimiter();
    let successCount = 0;
    let failCount = 0;
    
    // Process customers
    for (let i = 0; i < customersToProcess.length; i++) {
      const customer = customersToProcess[i];
      console.log(`\n[${i + 1}/${customersToProcess.length}] Processing ${customer.email}...`);
      
      const result = await migrateCustomer(customer, rateLimiter);
      
      // Update migration log
      migrationLog.processedEmails.push(customer.email);
      
      if (result.success) {
        successCount++;
        migrationLog.successfulMigrations.push({
          email: customer.email,
          clerkId: result.clerkId!,
          timestamp: new Date().toISOString(),
        });
      } else {
        failCount++;
        migrationLog.failedMigrations.push({
          email: customer.email,
          error: result.error!,
          timestamp: new Date().toISOString(),
        });
      }
      
      migrationLog.totalProcessed++;
      
      // Save progress after each user
      saveMigrationLog(migrationLog);
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📁 Total processed in this run: ${customersToProcess.length}`);
    console.log(`   📁 Total processed overall: ${migrationLog.totalProcessed}`);
    console.log(`   📁 Remaining: ${customers.length - migrationLog.processedEmails.length}`);
    console.log('='.repeat(60) + '\n');
    
    if (migrationLog.failedMigrations.length > 0) {
      console.log('❌ Failed migrations:');
      migrationLog.failedMigrations.slice(-5).forEach(failure => {
        console.log(`   - ${failure.email}: ${failure.error}`);
      });
    }
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
main()
  .then(() => {
    console.log('\n✅ Migration batch completed!');
    console.log('To continue with more users, increase MAX_USERS and run again.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });