import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

interface LoopsContact {
  createdAt: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  subscribed: string;
  source: string;
  userGroup: string;
  notes: string;
  plan: string;
  lastUpdated: string;
  totalSpent: string;
  teamRole: string;
  name: string;
}

function analyzeLoopsExport() {
  const csvPath = '/Users/jonsandmann/projects/powerui/customer-analysis/Power UI-1751034847704.csv';
  const csvContent = readFileSync(csvPath, 'utf-8');
  
  const contacts: LoopsContact[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  
  console.log('📊 Loops Export Analysis\n');
  console.log(`Total Contacts: ${contacts.length}\n`);
  
  // Subscription status
  const subscribed = contacts.filter(c => c.subscribed === 'true').length;
  const unsubscribed = contacts.filter(c => c.subscribed === 'false').length;
  console.log('📧 Subscription Status:');
  console.log(`  Subscribed: ${subscribed} (${((subscribed / contacts.length) * 100).toFixed(1)}%)`);
  console.log(`  Unsubscribed: ${unsubscribed} (${((unsubscribed / contacts.length) * 100).toFixed(1)}%)\n`);
  
  // By Source
  const sourceCounts: { [key: string]: number } = {};
  contacts.forEach(c => {
    const source = c.source || 'Not Set';
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });
  
  console.log('📍 By Source:');
  Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
    console.log(`  ${source}: ${count} (${((count / contacts.length) * 100).toFixed(1)}%)`);
  });
  
  // By Plan
  const planCounts: { [key: string]: number } = {};
  contacts.forEach(c => {
    const plan = c.plan || 'Free';
    planCounts[plan] = (planCounts[plan] || 0) + 1;
  });
  
  console.log('\n💎 By Plan:');
  Object.entries(planCounts).sort((a, b) => b[1] - a[1]).forEach(([plan, count]) => {
    console.log(`  ${plan}: ${count} (${((count / contacts.length) * 100).toFixed(1)}%)`);
  });
  
  // By User Group
  const groupCounts: { [key: string]: number } = {};
  contacts.forEach(c => {
    const group = c.userGroup || 'Not Set';
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });
  
  console.log('\n👥 By User Group:');
  Object.entries(groupCounts).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
    console.log(`  ${group}: ${count} (${((count / contacts.length) * 100).toFixed(1)}%)`);
  });
  
  // Team Roles
  const teamRoles = contacts.filter(c => c.teamRole);
  if (teamRoles.length > 0) {
    console.log('\n🏢 Team Roles:');
    const roleCounts: { [key: string]: number } = {};
    teamRoles.forEach(c => {
      roleCounts[c.teamRole] = (roleCounts[c.teamRole] || 0) + 1;
    });
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`  ${role}: ${count}`);
    });
  }
  
  // Contacts without our updates (the original 9)
  const notUpdated = contacts.filter(c => !c.lastUpdated || !c.lastUpdated.includes('2025-06-27'));
  console.log(`\n📝 Original Loops Contacts (not updated): ${notUpdated.length}`);
  if (notUpdated.length > 0) {
    console.log('  Emails:');
    notUpdated.forEach(c => {
      console.log(`    - ${c.email} (source: ${c.source || 'not set'}, group: ${c.userGroup || 'not set'})`);
    });
  }
  
  // Find paid customers
  const paidCustomers = contacts.filter(c => c.plan === 'PRO' || c.plan === 'TEAM');
  console.log(`\n💰 Paid Customers: ${paidCustomers.length}`);
  
  // Revenue summary
  let totalRevenue = 0;
  contacts.forEach(c => {
    if (c.totalSpent) {
      const amount = parseFloat(c.totalSpent.replace('$', '').replace(',', ''));
      if (!isNaN(amount)) {
        totalRevenue += amount;
      }
    }
  });
  console.log(`💵 Total Revenue Tracked: $${totalRevenue.toFixed(2)}`);
  
  // Save a clean version for further analysis
  const outputPath = path.join(process.cwd(), 'customer-analysis/output/loops-final-export.csv');
  const cleanCsv = [
    'email,firstName,lastName,subscribed,source,userGroup,plan,totalSpent,teamRole,userId',
    ...contacts.map(c => [
      c.email,
      c.firstName,
      c.lastName,
      c.subscribed,
      c.source || '',
      c.userGroup || '',
      c.plan || '',
      c.totalSpent || '',
      c.teamRole || '',
      c.userId || ''
    ].join(','))
  ].join('\n');
  
  writeFileSync(outputPath, cleanCsv);
  console.log(`\n📁 Clean export saved to: ${outputPath}`);
}

analyzeLoopsExport();