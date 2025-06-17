import { Transaction, FinancialSummary } from '../lib/types';
import { parseGumroadData } from './parse-gumroad';
import { parseLemonSqueezyData } from './parse-lemonsqueezy';
import { fetchStripeData } from './fetch-stripe-data';

export async function consolidateTransactions(): Promise<{ transactions: Transaction[], summary: FinancialSummary }> {
  console.log('Starting transaction consolidation...\n');
  
  // Get all transactions
  const gumroadData = parseGumroadData();
  const lemonSqueezyData = parseLemonSqueezyData();
  const stripeData = await fetchStripeData();
  
  // Combine all transactions
  const allTransactions: Transaction[] = [
    ...gumroadData.transactions,
    ...lemonSqueezyData.transactions,
    ...stripeData.transactions
  ];
  
  // Sort by date
  allTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  console.log(`\nTotal transactions: ${allTransactions.length}`);
  
  // Calculate financial summary
  const summary: FinancialSummary = {
    totalRevenue: 0,
    totalRefunds: 0,
    totalFees: 0,
    netRevenue: 0,
    byPlatform: {},
    customerStats: {
      total: 0,
      paid: 0,
      free: 0,
      incomplete: 0,
      emailOnly: 0
    }
  };
  
  // Initialize platform stats
  for (const platform of ['gumroad', 'lemonsqueezy', 'stripe']) {
    summary.byPlatform[platform] = {
      revenue: 0,
      refunds: 0,
      fees: 0,
      netRevenue: 0,
      transactionCount: 0
    };
  }
  
  // Add LemonSqueezy payout fees to the platform fees
  if (lemonSqueezyData.payoutFees) {
    summary.byPlatform.lemonsqueezy.fees += lemonSqueezyData.payoutFees;
    summary.totalFees += lemonSqueezyData.payoutFees;
  }
  
  // Process all transactions
  for (const transaction of allTransactions) {
    const totalFees = transaction.platformFee + transaction.processorFee;
    
    // Update totals
    summary.totalRevenue += transaction.grossAmount;
    summary.totalRefunds += transaction.refundAmount;
    summary.totalFees += totalFees;
    
    // Update platform stats
    const platformStats = summary.byPlatform[transaction.platform];
    platformStats.revenue += transaction.grossAmount;
    platformStats.refunds += transaction.refundAmount;
    platformStats.fees += totalFees;
    platformStats.transactionCount++;
  }
  
  // Calculate net revenues
  summary.netRevenue = summary.totalRevenue - summary.totalRefunds - summary.totalFees;
  
  for (const platform of Object.keys(summary.byPlatform)) {
    const stats = summary.byPlatform[platform];
    stats.netRevenue = stats.revenue - stats.refunds - stats.fees;
  }
  
  // Display summary
  console.log('\n=== Financial Summary ===');
  console.log(`Total Revenue: $${summary.totalRevenue.toFixed(2)}`);
  console.log(`Total Refunds: $${summary.totalRefunds.toFixed(2)}`);
  console.log(`Total Fees: $${summary.totalFees.toFixed(2)}`);
  console.log(`Net Revenue: $${summary.netRevenue.toFixed(2)}`);
  
  console.log('\n=== By Platform ===');
  for (const [platform, stats] of Object.entries(summary.byPlatform)) {
    if (stats.transactionCount > 0) {
      console.log(`\n${platform.charAt(0).toUpperCase() + platform.slice(1)}:`);
      console.log(`  Transactions: ${stats.transactionCount}`);
      console.log(`  Revenue: $${stats.revenue.toFixed(2)}`);
      console.log(`  Refunds: $${stats.refunds.toFixed(2)}`);
      console.log(`  Fees: $${stats.fees.toFixed(2)}`);
      console.log(`  Net: $${stats.netRevenue.toFixed(2)}`);
    }
  }
  
  return { transactions: allTransactions, summary };
}

// Run if called directly
if (require.main === module) {
  consolidateTransactions().then(result => {
    console.log(`\nProcessed ${result.transactions.length} total transactions`);
  });
}