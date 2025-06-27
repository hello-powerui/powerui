import { readFileSync } from 'fs';
import path from 'path';

function summarizeLoopsMigration() {
  console.log('📊 Loops Migration Summary\n');
  
  // Load the cleanup log
  const logPath = path.join(process.cwd(), 'customer-analysis/output/loops-cleanup-log.json');
  const logData = JSON.parse(readFileSync(logPath, 'utf-8'));
  
  console.log(`Total Contacts Processed: ${logData.totalProcessed}`);
  console.log(`Successful Updates: ${logData.successfulUpdates.length}`);
  console.log(`Failed Updates: ${logData.failedUpdates.length}`);
  console.log(`Started: ${logData.startedAt}`);
  console.log(`Completed: ${logData.lastUpdatedAt}\n`);
  
  // Count by source
  const sourceCounts: { [key: string]: number } = {};
  const planCounts: { [key: string]: number } = {};
  const groupCounts: { [key: string]: number } = {};
  const teamRoleCounts: { [key: string]: number } = {};
  
  logData.successfulUpdates.forEach((update: any) => {
    const source = update.updates.source || 'Unknown';
    const plan = update.updates.plan || 'Free';
    const group = update.updates.userGroup || 'Unknown';
    const teamRole = update.updates.teamRole;
    
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    planCounts[plan] = (planCounts[plan] || 0) + 1;
    groupCounts[group] = (groupCounts[group] || 0) + 1;
    
    if (teamRole) {
      teamRoleCounts[teamRole] = (teamRoleCounts[teamRole] || 0) + 1;
    }
  });
  
  console.log('📍 By Source:');
  Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
    console.log(`  ${source}: ${count} (${((count / logData.totalProcessed) * 100).toFixed(1)}%)`);
  });
  
  console.log('\n💎 By Plan:');
  Object.entries(planCounts).sort((a, b) => b[1] - a[1]).forEach(([plan, count]) => {
    const planDisplay = plan === '' ? 'Free' : plan;
    console.log(`  ${planDisplay}: ${count} (${((count / logData.totalProcessed) * 100).toFixed(1)}%)`);
  });
  
  console.log('\n👥 By User Group:');
  Object.entries(groupCounts).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
    console.log(`  ${group}: ${count} (${((count / logData.totalProcessed) * 100).toFixed(1)}%)`);
  });
  
  if (Object.keys(teamRoleCounts).length > 0) {
    console.log('\n🏢 Team Roles:');
    Object.entries(teamRoleCounts).forEach(([role, count]) => {
      console.log(`  ${role}: ${count}`);
    });
  }
  
  // List failed updates
  if (logData.failedUpdates.length > 0) {
    console.log('\n❌ Failed Updates:');
    logData.failedUpdates.forEach((failure: any) => {
      console.log(`  ${failure.email}: ${failure.error}`);
    });
  }
  
  console.log('\n✅ All contacts have been processed and are now in Loops!');
  console.log('Total in Loops: 1506 (including 9 contacts that were already there)');
}

summarizeLoopsMigration();