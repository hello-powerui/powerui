import { writeFileSync } from 'fs';
import path from 'path';

const MEMBERSTACK_API_KEY = 'sk_3c2a23ffd5c6958cc666';
const MEMBERSTACK_API_URL = 'https://admin.memberstack.com/members';

interface MemberstackMember {
  id: string;
  auth: {
    email: string;
  };
  customFields?: Record<string, any>;
  loginRedirect?: string;
  metadata?: Record<string, any>;
  metaData?: Record<string, any>;
  permissions?: string[];
  planConnections?: any[];
  profileImage?: string;
  signupRedirect?: string;
  stripeCustomerId?: string;
  createdAt?: string;
  lastSeen?: string;
  totalSpend?: number;
}

interface MemberstackListResponse {
  data: Array<{
    id: string;
    auth: {
      email: string;
    };
  }>;
  totalCount: number;
  hasNextPage: boolean;
  endCursor?: string;
}

// Rate limiting
const RATE_LIMIT = 20; // requests per second (Memberstack allows 25)
const RATE_WINDOW = 1000; // 1 second in milliseconds
let requestTimes: number[] = [];

async function rateLimitedRequest<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  requestTimes = requestTimes.filter(time => now - time < RATE_WINDOW);
  
  if (requestTimes.length >= RATE_LIMIT) {
    const oldestRequest = requestTimes[0];
    const waitTime = RATE_WINDOW - (now - oldestRequest) + 100; // Add 100ms buffer
    console.log(`⏳ Rate limit reached, waiting ${waitTime}ms...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return rateLimitedRequest(fn);
  }
  
  requestTimes.push(now);
  return fn();
}

async function fetchMembersList(after?: string): Promise<MemberstackListResponse> {
  const url = new URL(MEMBERSTACK_API_URL);
  url.searchParams.append('limit', '100'); // Max allowed
  if (after) {
    url.searchParams.append('after', after);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-KEY': MEMBERSTACK_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch members list: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchMemberDetails(memberId: string): Promise<MemberstackMember> {
  const response = await fetch(`${MEMBERSTACK_API_URL}/${memberId}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': MEMBERSTACK_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch member ${memberId}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

async function exportAllMemberstackMembers() {
  console.log('🚀 Starting Memberstack export...\n');
  
  const allMembers: MemberstackMember[] = [];
  let hasNextPage = true;
  let after: string | undefined;
  let page = 1;

  try {
    // Step 1: Fetch all member IDs
    console.log('📋 Fetching member list...');
    while (hasNextPage) {
      const listResponse = await rateLimitedRequest(() => 
        fetchMembersList(after)
      );
      
      console.log(`  Page ${page}: Found ${listResponse.data.length} members (Total so far: ${allMembers.length + listResponse.data.length})`);
      
      // Collect member IDs for detailed fetch
      for (const member of listResponse.data) {
        allMembers.push({
          id: member.id,
          auth: member.auth,
        } as MemberstackMember);
      }
      
      hasNextPage = listResponse.hasNextPage;
      after = listResponse.endCursor;
      
      if (hasNextPage) {
        console.log(`  → More pages available, continuing with cursor: ${String(after).substring(0, 10)}...`);
      }
      page++;
    }
    
    console.log(`\n✅ Found ${allMembers.length} total members\n`);
    
    // Step 2: Fetch detailed information for each member
    console.log('📊 Fetching detailed member information...');
    let processed = 0;
    const errors: Array<{id: string, error: string}> = [];
    
    for (let i = 0; i < allMembers.length; i++) {
      const member = allMembers[i];
      try {
        const details = await rateLimitedRequest(() => 
          fetchMemberDetails(member.id)
        );
        
        // Merge the detailed data
        allMembers[i] = details;
        processed++;
        
        if (processed % 50 === 0) {
          console.log(`  Processed ${processed}/${allMembers.length} members...`);
        }
      } catch (error) {
        console.error(`❌ Failed to fetch details for ${member.auth.email}:`, error);
        errors.push({
          id: member.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    console.log(`\n✅ Successfully processed ${processed}/${allMembers.length} members`);
    if (errors.length > 0) {
      console.log(`❌ Failed to process ${errors.length} members`);
    }
    
    // Step 3: Save the data
    const outputDir = path.join(process.cwd(), 'memberstack-export');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    
    // Save full JSON
    const jsonPath = path.join(outputDir, `memberstack-members-${timestamp}.json`);
    writeFileSync(jsonPath, JSON.stringify({
      exportDate: new Date().toISOString(),
      totalMembers: allMembers.length,
      successfulExports: processed,
      errors: errors,
      members: allMembers
    }, null, 2));
    
    // Save simplified CSV for quick reference
    const csvLines = [
      'id,email,stripeCustomerId,totalSpend,createdAt,lastSeen,permissions',
      ...allMembers.map(m => [
        m.id,
        m.auth.email,
        m.stripeCustomerId || '',
        m.totalSpend || '0',
        m.createdAt || '',
        m.lastSeen || '',
        (m.permissions || []).join(';')
      ].map(field => {
        // Escape fields containing commas
        if (typeof field === 'string' && field.includes(',')) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      }).join(','))
    ];
    
    const csvPath = path.join(outputDir, `memberstack-members-${timestamp}.csv`);
    writeFileSync(csvPath, csvLines.join('\n'));
    
    console.log('\n📁 Export complete! Files saved:');
    console.log(`  - ${jsonPath}`);
    console.log(`  - ${csvPath}`);
    
    // Summary statistics
    const stats = {
      totalMembers: allMembers.length,
      withStripeId: allMembers.filter(m => m.stripeCustomerId).length,
      withTotalSpend: allMembers.filter(m => m.totalSpend && m.totalSpend > 0).length,
      withPermissions: allMembers.filter(m => m.permissions && m.permissions.length > 0).length,
    };
    
    console.log('\n📊 Summary:');
    console.log(`  Total members: ${stats.totalMembers}`);
    console.log(`  With Stripe ID: ${stats.withStripeId}`);
    console.log(`  With purchases: ${stats.withTotalSpend}`);
    console.log(`  With permissions: ${stats.withPermissions}`);
    
  } catch (error) {
    console.error('Fatal error during export:', error);
    process.exit(1);
  }
}

// Run the export
exportAllMemberstackMembers().catch(console.error);