import * as path from 'path';
import { Customer, Transaction, ParsedGumroadRow } from '../lib/types';
import { readCSV, normalizeEmail, parseDate, safeParseFloat, extractPlanFromVariant } from '../lib/utils';
import { FeeCalculator } from '../lib/fee-calculator';

export function parseGumroadData(): { customers: Map<string, Partial<Customer>>, transactions: Transaction[] } {
  const customers = new Map<string, Partial<Customer>>();
  const transactions: Transaction[] = [];
  
  const csvPath = path.join(__dirname, '../../salescustomers/gumroad.csv');
  const rows = readCSV<any>(csvPath);
  
  console.log(`Parsing ${rows.length} Gumroad records...`);
  
  for (const row of rows) {
    try {
      const email = normalizeEmail(row['Purchase Email'] || row['Buyer Email'] || '');
      if (!email) continue;
      
      const purchaseDate = parseDate(row['Purchase Date']);
      const salePrice = safeParseFloat(row['Sale Price ($)']);
      const netTotal = safeParseFloat(row['Net Total ($)']);
      const refunded = row['Refunded?'] === 1 || row['Refunded?'] === true;
      const partialRefund = safeParseFloat(row['Partial Refund ($)']);
      const fullyRefunded = row['Fully Refunded?'] === 1 || row['Fully Refunded?'] === true;
      
      // Update or create customer
      const existingCustomer = customers.get(email) || {
        email,
        sources: [],
        plans: [],
        totalSpent: 0,
        firstSeenDate: purchaseDate,
        lastActivityDate: purchaseDate
      };
      
      if (!existingCustomer.sources.includes('gumroad')) {
        existingCustomer.sources.push('gumroad');
      }
      
      // Extract plan from variants
      const plan = extractPlanFromVariant(row['Variants'] || '');
      if (plan !== 'Unknown' && !existingCustomer.plans.includes(plan)) {
        existingCustomer.plans.push(plan);
      }
      
      // Update customer data
      existingCustomer.name = existingCustomer.name || row['Buyer Name'] || '';
      existingCustomer.firstSeenDate = new Date(Math.min(existingCustomer.firstSeenDate!.getTime(), purchaseDate.getTime()));
      existingCustomer.lastActivityDate = new Date(Math.max(existingCustomer.lastActivityDate!.getTime(), purchaseDate.getTime()));
      
      // Determine purchase status
      if (salePrice > 0 && !fullyRefunded) {
        existingCustomer.purchaseStatus = 'paid';
        existingCustomer.totalSpent = (existingCustomer.totalSpent || 0) + salePrice - partialRefund;
      }
      
      customers.set(email, existingCustomer);
      
      // Create transaction
      const fees = FeeCalculator.calculateGumroadFees(salePrice, netTotal);
      
      const transaction: Transaction = {
        id: `gumroad_${row['Purchase ID']}`,
        customerEmail: email,
        platform: 'gumroad',
        date: purchaseDate,
        grossAmount: salePrice,
        refundAmount: fullyRefunded ? salePrice : partialRefund,
        taxAmount: safeParseFloat(row['Taxes ($)']),
        platformFee: fees.platformFee,
        processorFee: fees.processorFee,
        netAmount: netTotal,
        productName: row['Item Name'] || '',
        status: fullyRefunded ? 'refunded' : partialRefund > 0 ? 'partial_refund' : 'completed',
        metadata: {
          variants: row['Variants'],
          discountCode: row['Discount Code'],
          orderNumber: row['Order Number']
        }
      };
      
      transactions.push(transaction);
      
    } catch (error) {
      console.error(`Error parsing Gumroad row:`, error, row);
    }
  }
  
  console.log(`Parsed ${customers.size} Gumroad customers and ${transactions.length} transactions`);
  
  return { customers, transactions };
}

// Run if called directly
if (require.main === module) {
  const result = parseGumroadData();
  console.log(`Found ${result.customers.size} customers and ${result.transactions.length} transactions`);
}