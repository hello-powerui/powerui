import * as fs from 'fs';
import { Customer, Transaction, FinancialSummary } from '../lib/types';
import { writeCSV, getOutputPath, ensureOutputDir, formatCurrency } from '../lib/utils';
import { consolidateCustomers } from './consolidate-customers';
import { consolidateTransactions } from './consolidate-transactions';

export async function exportAllData() {
  console.log('Starting data export...\n');
  
  ensureOutputDir();
  
  // Get consolidated data
  const customers = await consolidateCustomers();
  const { transactions, summary } = await consolidateTransactions();
  
  // Export consolidated customers
  console.log('\nExporting customer data...');
  const customerArray = Array.from(customers.values()).map(customer => ({
    email: customer.email,
    name: customer.name,
    status: customer.purchaseStatus,
    total_spent: formatCurrency(customer.totalSpent),
    sources: customer.sources.join(', '),
    plans: customer.plans.join(', '),
    first_seen: customer.firstSeenDate.toISOString().split('T')[0],
    last_activity: customer.lastActivityDate.toISOString().split('T')[0],
    stripe_customer_id: customer.stripeCustomerId || '',
    memberstack_id: customer.memberstackId || '',
    loops_user_id: customer.loopsUserId || ''
  }));
  
  writeCSV(getOutputPath('consolidated-customers.csv'), customerArray);
  console.log(`Exported ${customerArray.length} customers to consolidated-customers.csv`);
  
  // Export transactions
  console.log('Exporting transaction data...');
  const transactionArray = transactions.map(transaction => ({
    id: transaction.id,
    email: transaction.customerEmail,
    platform: transaction.platform,
    date: transaction.date.toISOString().split('T')[0],
    product: transaction.productName,
    gross_amount: formatCurrency(transaction.grossAmount),
    refund_amount: formatCurrency(transaction.refundAmount),
    tax_amount: formatCurrency(transaction.taxAmount),
    platform_fee: formatCurrency(transaction.platformFee),
    processor_fee: formatCurrency(transaction.processorFee),
    total_fees: formatCurrency(transaction.platformFee + transaction.processorFee),
    net_amount: formatCurrency(transaction.netAmount),
    status: transaction.status
  }));
  
  writeCSV(getOutputPath('consolidated-transactions.csv'), transactionArray);
  console.log(`Exported ${transactionArray.length} transactions to consolidated-transactions.csv`);
  
  // Export Loops updates
  console.log('Generating Loops CRM updates...');
  const loopsUpdates = Array.from(customers.values())
    .filter(customer => customer.sources.includes('loops'))
    .map(customer => ({
      email: customer.email,
      current_status: customer.purchaseStatus,
      recommended_group: customer.purchaseStatus === 'paid' ? 'Paying Customer' : 
                        customer.purchaseStatus === 'free' ? 'Free User' : 
                        customer.purchaseStatus === 'incomplete' ? 'Incomplete Checkout' : 
                        'Email Subscriber',
      current_plan: customer.plans.join(', '),
      total_spent: formatCurrency(customer.totalSpent),
      has_stripe: customer.stripeCustomerId ? 'Yes' : 'No',
      has_memberstack: customer.memberstackId ? 'Yes' : 'No',
      action_needed: determineLoopsAction(customer)
    }));
  
  writeCSV(getOutputPath('loops-updates.csv'), loopsUpdates);
  console.log(`Generated ${loopsUpdates.length} Loops updates`);
  
  // Export Clerk migration list
  console.log('Generating Clerk migration list...');
  const clerkMigrations = Array.from(customers.values())
    .filter(customer => customer.purchaseStatus === 'paid' && !customer.sources.includes('stripe'))
    .map(customer => ({
      email: customer.email,
      name: customer.name,
      plan: determinePlanForClerk(customer),
      source_platforms: customer.sources.join(', '),
      total_spent: formatCurrency(customer.totalSpent),
      memberstack_id: customer.memberstackId || '',
      notes: generateMigrationNotes(customer)
    }));
  
  writeCSV(getOutputPath('clerk-migration.csv'), clerkMigrations);
  console.log(`Generated ${clerkMigrations.length} users to migrate to Clerk`);
  
  // Export financial summary
  console.log('Exporting financial summary...');
  fs.writeFileSync(
    getOutputPath('financial-summary.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log('Exported financial summary to financial-summary.json');
  
  console.log('\n=== Export Complete ===');
  console.log('All data exported to the /output directory');
}

function determineLoopsAction(customer: Customer): string {
  if (customer.purchaseStatus === 'paid' && !customer.loopsUserId) {
    return 'Add to Loops as Paying Customer';
  }
  if (customer.purchaseStatus === 'free' && !customer.loopsUserId) {
    return 'Add to Loops as Free User';
  }
  if (customer.loopsUserId) {
    // Check if status needs updating
    return 'Update user group if needed';
  }
  return 'No action needed';
}

function determinePlanForClerk(customer: Customer): string {
  // Prioritize most recent/highest plan
  if (customer.plans.includes('Team 10')) return 'TEAM_10';
  if (customer.plans.includes('Team 5')) return 'TEAM_5';
  if (customer.plans.includes('Business')) return 'TEAM_10'; // Map old business to Team 10
  if (customer.plans.includes('Power UI PRO')) return 'PRO';
  if (customer.plans.includes('Legacy PRO')) return 'PRO';
  if (customer.plans.includes('Pro')) return 'PRO';
  return 'PRO'; // Default for paid customers
}

function generateMigrationNotes(customer: Customer): string {
  const notes: string[] = [];
  
  if (customer.sources.includes('gumroad')) {
    notes.push('Legacy Gumroad customer');
  }
  if (customer.sources.includes('lemonsqueezy')) {
    notes.push('Migrated from LemonSqueezy');
  }
  if (customer.memberstackId) {
    notes.push('Has Memberstack account');
  }
  
  return notes.join('; ');
}

// Run if called directly
if (require.main === module) {
  exportAllData().then(() => {
    console.log('\nAll exports complete!');
  }).catch(error => {
    console.error('Export error:', error);
  });
}