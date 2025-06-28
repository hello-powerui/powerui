import { LoopsClient } from "loops";
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });

async function exportLoopsContacts() {
  const loops = new LoopsClient(process.env.LOOPS_API_KEY!);
  
  console.log('🚀 Starting Loops contact export...\n');
  
  try {
    // Fetch all contacts
    console.log('Fetching contacts from Loops...');
    let allContacts: any[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const response = await loops.getContacts(page, 100); // 100 per page
      
      if (response.length > 0) {
        allContacts = allContacts.concat(response);
        console.log(`Fetched page ${page}: ${response.length} contacts (Total: ${allContacts.length})`);
        page++;
      } else {
        hasMore = false;
      }
      
      // Small delay to avoid rate limits
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`\n✅ Total contacts fetched: ${allContacts.length}`);
    
    // Convert to CSV format
    const csvHeaders = [
      'email',
      'firstName',
      'lastName',
      'userId',
      'userGroup',
      'plan',
      'source',
      'totalSpent',
      'teamRole',
      'teamName',
      'createdAt',
      'updatedAt',
      'subscribed'
    ];
    
    let csvContent = csvHeaders.join(',') + '\n';
    
    allContacts.forEach(contact => {
      const row = [
        contact.email || '',
        contact.firstName || '',
        contact.lastName || '',
        contact.userId || '',
        contact.userGroup || '',
        contact.plan || '',
        contact.source || '',
        contact.totalSpent || '',
        contact.teamRole || '',
        contact.teamName || '',
        contact.createdAt || '',
        contact.updatedAt || '',
        contact.subscribed !== undefined ? contact.subscribed : ''
      ];
      
      // Escape fields that contain commas
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && field.includes(',')) {
          return `"${field}"`;
        }
        return field;
      });
      
      csvContent += escapedRow.join(',') + '\n';
    });
    
    // Save to file
    const outputPath = path.join(process.cwd(), 'customer-analysis/output/loops-export.csv');
    writeFileSync(outputPath, csvContent);
    
    console.log(`\n📁 Contacts exported to: ${outputPath}`);
    
    // Also save as JSON for easier processing
    const jsonPath = path.join(process.cwd(), 'customer-analysis/output/loops-export.json');
    writeFileSync(jsonPath, JSON.stringify(allContacts, null, 2));
    console.log(`📁 JSON export saved to: ${jsonPath}`);
    
    // Summary statistics
    console.log('\n📊 Summary:');
    console.log(`- Total contacts: ${allContacts.length}`);
    
    // Count by user group
    const groupCounts: { [key: string]: number } = {};
    allContacts.forEach(c => {
      const group = c.userGroup || 'Unknown';
      groupCounts[group] = (groupCounts[group] || 0) + 1;
    });
    console.log('\nBy User Group:');
    Object.entries(groupCounts).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
      console.log(`  - ${group}: ${count}`);
    });
    
    // Count by plan
    const planCounts: { [key: string]: number } = {};
    allContacts.forEach(c => {
      const plan = c.plan || 'Free';
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    console.log('\nBy Plan:');
    Object.entries(planCounts).sort((a, b) => b[1] - a[1]).forEach(([plan, count]) => {
      console.log(`  - ${plan}: ${count}`);
    });
    
    // Count by source
    const sourceCounts: { [key: string]: number } = {};
    allContacts.forEach(c => {
      const source = c.source || 'Unknown';
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });
    console.log('\nBy Source:');
    Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
      console.log(`  - ${source}: ${count}`);
    });
    
  } catch (error) {
    console.error('\n❌ Export failed:', error);
    throw error;
  }
}

// Run the export
exportLoopsContacts()
  .then(() => {
    console.log('\n🎉 Export completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Export failed:', error);
    process.exit(1);
  });