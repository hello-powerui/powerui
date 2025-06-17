import * as path from 'path';
import * as fs from 'fs';
import { Customer, Transaction, ParsedLemonSqueezyRow, LemonSqueezyPayoutRow } from '../lib/types';
import { readCSV, normalizeEmail, parseDate, safeParseFloat } from '../lib/utils';
import { FeeCalculator } from '../lib/fee-calculator';

export function parseLemonSqueezyData(): { customers: Map<string, Partial<Customer>>, transactions: Transaction[], payoutFees: number } {
  const customers = new Map<string, Partial<Customer>>();
  const transactions: Transaction[] = [];
  let totalPayoutFees = 0;
  
  // First, load all payout data to map fees to orders
  const payoutMap = new Map<string, LemonSqueezyPayoutRow>();
  const payoutsDir = path.join(__dirname, '../../salescustomers/lemonsqueezypayouts');
  
  const payoutFiles = fs.readdirSync(payoutsDir).filter(f => f.endsWith('.csv'));
  console.log(`Loading ${payoutFiles.length} payout files...`);
  
  for (const file of payoutFiles) {
    const payoutPath = path.join(payoutsDir, file);
    const payoutRows = readCSV<any>(payoutPath);
    
    for (const row of payoutRows) {
      if (row['Sale']) {
        if (row['Sale'].includes('Order #')) {
          // Extract just the number from "Order #84725123"
          const match = row['Sale'].match(/Order #(\d+)/);
          if (match) {
            const orderNumber = match[1];
            payoutMap.set(orderNumber, {
              date: row['Date'],
              sale: row['Sale'],
              total: safeParseFloat(row['Total (USD)']),
              refunds: safeParseFloat(row['Refunds (USD)']),
              tax: safeParseFloat(row['Tax (USD)']),
              platformFee: Math.abs(safeParseFloat(row['Platform Fee (USD)'])),
              netTotal: safeParseFloat(row['Net Total (USD)'])
            });
          }
        } else if (row['Sale'] === 'Payout fee') {
          // Track payout fees
          const payoutFee = Math.abs(safeParseFloat(row['Net Total (USD)']));
          totalPayoutFees += payoutFee;
        }
      }
    }
  }
  
  console.log(`Loaded ${payoutMap.size} payout records`);
  
  // Now parse the main LemonSqueezy orders
  const csvPath = path.join(__dirname, '../../salescustomers/lemonsqueezy.csv');
  const rows = readCSV<any>(csvPath);
  
  console.log(`Parsing ${rows.length} LemonSqueezy records...`);
  
  for (const row of rows) {
    try {
      // Skip Gumroad records that end with ==
      const identifier = row['identifier'] || '';
      if (identifier.endsWith('==')) {
        console.log(`Skipping Gumroad record: ${identifier}`);
        continue;
      }
      
      const email = normalizeEmail(row['user_email'] || '');
      if (!email) continue;
      
      const orderNumber = row['order_number'];
      const purchaseDate = parseDate(row['date_utc']);
      let subtotal = safeParseFloat(row['subtotal']);
      let total = safeParseFloat(row['total']);
      const tax = safeParseFloat(row['tax']);
      
      // Convert from cents to dollars
      if (subtotal > 100) subtotal = subtotal / 100;
      if (total > 100) total = total / 100;
      
      // If subtotal/total are empty, try to get from payout data
      if (total === 0 && subtotal === 0) {
        const payoutData = payoutMap.get(orderNumber);
        if (payoutData) {
          total = payoutData.total;
          subtotal = payoutData.total - payoutData.tax;
        }
      }
      
      // Update or create customer
      const existingCustomer = customers.get(email) || {
        email,
        sources: [],
        plans: [],
        totalSpent: 0,
        firstSeenDate: purchaseDate,
        lastActivityDate: purchaseDate
      };
      
      if (!existingCustomer.sources.includes('lemonsqueezy')) {
        existingCustomer.sources.push('lemonsqueezy');
      }
      
      // Determine plan from product/variant name
      const productName = row['product_name'] || '';
      const variantName = row['variant_name'] || '';
      
      if (productName.includes('Power UI') && !productName.includes('ebook')) {
        existingCustomer.plans.push('Power UI PRO');
        existingCustomer.purchaseStatus = 'paid';
        existingCustomer.totalSpent = (existingCustomer.totalSpent || 0) + total;
      } else if (productName.includes('ebook') || productName.includes('Guide')) {
        // This is just an ebook purchase
        if (!existingCustomer.purchaseStatus || existingCustomer.purchaseStatus === 'email_only') {
          existingCustomer.purchaseStatus = 'email_only';
        }
      }
      
      existingCustomer.name = existingCustomer.name || row['user_name'] || '';
      existingCustomer.firstSeenDate = new Date(Math.min(existingCustomer.firstSeenDate!.getTime(), purchaseDate.getTime()));
      existingCustomer.lastActivityDate = new Date(Math.max(existingCustomer.lastActivityDate!.getTime(), purchaseDate.getTime()));
      
      customers.set(email, existingCustomer);
      
      // Look up payout data for fees
      const payoutData = payoutMap.get(orderNumber);
      let fees = { platformFee: 0, processorFee: 0, totalFee: 0 };
      
      if (payoutData) {
        fees = FeeCalculator.parseLemonSqueezyFees(payoutData.platformFee, total);
      }
      
      // Create transaction (only for actual purchases, not free ebooks)
      if (total > 0) {
        const transaction: Transaction = {
          id: `lemonsqueezy_${orderNumber}_${row['identifier']}`,
          customerEmail: email,
          platform: 'lemonsqueezy',
          date: purchaseDate,
          grossAmount: total,
          refundAmount: payoutData?.refunds || 0,
          taxAmount: tax || payoutData?.tax || 0,
          platformFee: fees.platformFee,
          processorFee: fees.processorFee,
          netAmount: payoutData?.netTotal || (total - fees.totalFee - tax),
          productName: productName,
          status: payoutData?.refunds > 0 ? 'refunded' : 'completed',
          metadata: {
            orderNumber,
            variantName,
            country: row['country'],
            discountCode: row['discount_code']
          }
        };
        
        transactions.push(transaction);
      }
      
    } catch (error) {
      console.error(`Error parsing LemonSqueezy row:`, error, row);
    }
  }
  
  console.log(`Parsed ${customers.size} LemonSqueezy customers and ${transactions.length} transactions`);
  console.log(`Total payout fees: $${totalPayoutFees.toFixed(2)}`);
  
  return { customers, transactions, payoutFees: totalPayoutFees };
}

// Run if called directly
if (require.main === module) {
  const result = parseLemonSqueezyData();
  console.log(`Found ${result.customers.size} customers and ${result.transactions.length} transactions`);
}