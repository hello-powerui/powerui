#!/usr/bin/env node

import { exportAllData } from './export-data';

async function runFullAnalysis() {
  console.log('=================================');
  console.log('Customer Data Analysis');
  console.log('=================================\n');
  
  console.log('This script will:');
  console.log('1. Parse customer data from Gumroad, LemonSqueezy, Memberstack, and Loops');
  console.log('2. Fetch live data from Stripe API');
  console.log('3. Consolidate all customer records');
  console.log('4. Consolidate all financial transactions');
  console.log('5. Generate actionable reports\n');
  
  console.log('Starting analysis...\n');
  
  const startTime = Date.now();
  
  try {
    await exportAllData();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n=================================');
    console.log('Analysis Complete!');
    console.log('=================================');
    console.log(`Total time: ${duration} seconds\n`);
    
    console.log('Generated files:');
    console.log('- output/consolidated-customers.csv - Master customer list');
    console.log('- output/consolidated-transactions.csv - All transactions with fees');
    console.log('- output/loops-updates.csv - Required CRM updates');
    console.log('- output/clerk-migration.csv - Users to migrate to Clerk');
    console.log('- output/financial-summary.json - Financial analysis\n');
    
    console.log('Next steps:');
    console.log('1. Review consolidated-customers.csv for data quality');
    console.log('2. Use loops-updates.csv to clean up your CRM');
    console.log('3. Use clerk-migration.csv to migrate users to Clerk with correct plans');
    console.log('4. Review financial-summary.json for revenue insights');
    
  } catch (error) {
    console.error('\n❌ Analysis failed:', error);
    process.exit(1);
  }
}

// Run the analysis
runFullAnalysis();