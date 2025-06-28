import { readFileSync } from 'fs';
import { LoopsClient } from 'loops';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.development' });

if (!process.env.LOOPS_API_KEY) {
  console.error('❌ LOOPS_API_KEY not found in environment variables');
  process.exit(1);
}

const loops = new LoopsClient(process.env.LOOPS_API_KEY);

interface TeamData {
  admin: string;
  members: string[];
}

interface TeamMembersFile {
  teams: TeamData[];
}

// Rate limiting
const RATE_LIMIT = 8; // requests per second
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

async function updateTeamMembersInLoops() {
  // Read team members data
  const teamData: TeamMembersFile = JSON.parse(
    readFileSync('/Users/jonsandmann/projects/powerui/customer-analysis/team-members.json', 'utf-8')
  );
  
  // Read current Loops export to check existing data
  const csvPath = '/Users/jonsandmann/projects/powerui/customer-analysis/output/loops-final-export.csv';
  const csvContent = readFileSync(csvPath, 'utf-8');
  const existingContacts = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  
  // Create a map for quick lookup
  const contactMap = new Map(existingContacts.map((c: any) => [c.email, c]));
  
  console.log('🏢 Updating Team Members in Loops\n');
  console.log(`Total teams to process: ${teamData.teams.length}`);
  
  let totalUpdates = 0;
  let successCount = 0;
  let errorCount = 0;
  
  for (const team of teamData.teams) {
    console.log(`\n📋 Processing team with admin: ${team.admin}`);
    
    // Update admin
    const adminContact = contactMap.get(team.admin);
    if (adminContact) {
      try {
        await rateLimitedRequest(async () => {
          const response = await loops.updateContact(team.admin, {
            teamRole: 'admin',
            lastUpdated: new Date().toISOString()
          });
          return response;
        });
        console.log(`✅ Updated admin: ${team.admin}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to update admin ${team.admin}:`, error);
        errorCount++;
      }
      totalUpdates++;
    } else {
      console.log(`⚠️  Admin ${team.admin} not found in Loops export`);
    }
    
    // Update members
    for (const memberEmail of team.members) {
      const memberContact = contactMap.get(memberEmail);
      if (memberContact) {
        try {
          await rateLimitedRequest(async () => {
            const response = await loops.updateContact(memberEmail, {
              teamRole: 'member',
              userGroup: 'Team Customer',
              plan: 'TEAM',
              lastUpdated: new Date().toISOString()
            });
            return response;
          });
          console.log(`✅ Updated member: ${memberEmail}`);
          successCount++;
        } catch (error) {
          console.error(`❌ Failed to update member ${memberEmail}:`, error);
          errorCount++;
        }
        totalUpdates++;
      } else {
        console.log(`⚠️  Member ${memberEmail} not found in Loops export`);
      }
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`Total updates attempted: ${totalUpdates}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
}

// Run the script
updateTeamMembersInLoops().catch(console.error);