import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface MemberstackMember {
  id: string;
  auth: {
    email: string;
  };
  customFields?: {
    'first-name'?: string;
    'last-name'?: string;
    [key: string]: any;
  };
  json?: any; // The json field that contains custom palettes
  planConnections?: Array<{
    id: string;
    active: boolean;
    status: string;
    planId: string;
    planName: string;
    type: string;
    payment: any;
  }>;
}

interface PaidMemberPalette {
  memberId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  planName: string;
  json?: {
    themes?: any[];
    customPalettes?: any[];
    neutralPalettes?: any[];
  };
}

function extractPaidMemberPalettes() {
  console.log('🎨 Extracting color palettes for paid members...\n');

  // Read the Memberstack export
  const memberstackPath = '/Users/jonsandmann/projects/powerui/memberstack-export/memberstack-members-2025-06-27T15-14-00.json';
  const memberstackData = JSON.parse(readFileSync(memberstackPath, 'utf-8'));
  const members: MemberstackMember[] = memberstackData.members;

  console.log(`Total members to process: ${members.length}`);

  const paidMemberPalettes: PaidMemberPalette[] = [];
  let paidMembersCount = 0;
  let membersWithPalettes = 0;
  let errors: Array<{ email: string; error: string }> = [];

  members.forEach(member => {
    // Check if member has a paid plan
    const hasPaidPlan = member.planConnections?.some(plan => 
      plan.active && 
      plan.type !== 'FREE' && 
      (plan.planName.toLowerCase().includes('pro') || 
       plan.planName.toLowerCase().includes('team'))
    );

    if (hasPaidPlan) {
      paidMembersCount++;
      
      // Get the active paid plan name
      const activePlan = member.planConnections?.find(plan => 
        plan.active && plan.type !== 'FREE'
      );
      
      const planName = activePlan?.planName || 'Unknown Plan';

      // Check if member has json field with customPalettes
      if (member.json && (member.json.customPalettes || member.json.themes)) {
        try {
          paidMemberPalettes.push({
            memberId: member.id,
            email: member.auth.email,
            firstName: member.customFields?.['first-name'],
            lastName: member.customFields?.['last-name'],
            planName,
            json: {
              themes: member.json.themes || [],
              customPalettes: member.json.customPalettes || [],
              neutralPalettes: member.json.neutralPalettes || []
            }
          });

          membersWithPalettes++;
        } catch (error) {
          errors.push({
            email: member.auth.email,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`  Total paid members: ${paidMembersCount}`);
  console.log(`  Paid members with palettes: ${membersWithPalettes}`);
  console.log(`  Errors encountered: ${errors.length}`);

  // Save the results
  const outputDir = path.join(process.cwd(), 'memberstack-export');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  
  // Save paid member palettes
  const palettesPath = path.join(outputDir, `paid-member-palettes-${timestamp}.json`);
  writeFileSync(palettesPath, JSON.stringify({
    exportDate: new Date().toISOString(),
    totalPaidMembers: paidMembersCount,
    membersWithPalettes: membersWithPalettes,
    errors: errors.length,
    palettes: paidMemberPalettes
  }, null, 2));

  console.log(`\n✅ Palette data saved to: ${palettesPath}`);

  // If there were errors, save them separately
  if (errors.length > 0) {
    const errorsPath = path.join(outputDir, `palette-extraction-errors-${timestamp}.json`);
    writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
    console.log(`❌ Errors saved to: ${errorsPath}`);
  }

  // Show a sample of the data
  if (paidMemberPalettes.length > 0) {
    console.log('\n📝 Sample palette data:');
    console.log(JSON.stringify(paidMemberPalettes[0], null, 2));
  }
}

// Run the extraction
extractPaidMemberPalettes();