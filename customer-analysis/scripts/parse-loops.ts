import * as path from 'path';
import { Customer, ParsedLoopsRow } from '../lib/types';
import { readCSV, normalizeEmail, parseDate } from '../lib/utils';

export function parseLoopsData(): Map<string, Partial<Customer>> {
  const customers = new Map<string, Partial<Customer>>();
  
  const csvPath = path.join(__dirname, '../../salescustomers/loops.csv');
  const rows = readCSV<any>(csvPath);
  
  console.log(`Parsing ${rows.length} Loops records...`);
  
  for (const row of rows) {
    try {
      const email = normalizeEmail(row['email'] || '');
      if (!email) continue;
      
      const createdDate = parseDate(row['createdAt']);
      
      // Update or create customer
      const existingCustomer = customers.get(email) || {
        email,
        sources: [],
        plans: [],
        totalSpent: 0,
        firstSeenDate: createdDate,
        lastActivityDate: createdDate
      };
      
      if (!existingCustomer.sources.includes('loops')) {
        existingCustomer.sources.push('loops');
      }
      
      // Store Loops user ID
      existingCustomer.loopsUserId = row['userId'];
      
      // Parse user group and plan
      const userGroup = row['userGroup'] || '';
      const memberstackPlan = row['memberstack_plan'] || '';
      
      if (userGroup === 'Paying Customer' || memberstackPlan.includes('PRO')) {
        if (!existingCustomer.plans.includes('Legacy PRO') && memberstackPlan === 'Legacy PRO') {
          existingCustomer.plans.push('Legacy PRO');
        }
        if (!existingCustomer.purchaseStatus || existingCustomer.purchaseStatus === 'email_only') {
          existingCustomer.purchaseStatus = 'paid';
        }
      } else if (userGroup === 'Free User') {
        if (!existingCustomer.purchaseStatus || existingCustomer.purchaseStatus === 'email_only') {
          existingCustomer.purchaseStatus = 'free';
        }
      } else {
        // Just on email list
        if (!existingCustomer.purchaseStatus) {
          existingCustomer.purchaseStatus = 'email_only';
        }
      }
      
      // Update customer info
      existingCustomer.name = existingCustomer.name || 
        `${row['firstName'] || ''} ${row['lastName'] || ''}`.trim();
      
      // Check if subscribed
      const subscribed = row['subscribed'] === true || row['subscribed'] === 'true';
      
      // Store metadata about subscription status
      if (!existingCustomer.metadata) {
        existingCustomer.metadata = {};
      }
      existingCustomer.metadata.loopsSubscribed = subscribed;
      existingCustomer.metadata.loopsSource = row['source'];
      
      customers.set(email, existingCustomer);
      
    } catch (error) {
      console.error(`Error parsing Loops row:`, error, row);
    }
  }
  
  console.log(`Parsed ${customers.size} Loops customers`);
  
  return customers;
}

// Run if called directly
if (require.main === module) {
  const result = parseLoopsData();
  console.log(`Found ${result.size} customers`);
  
  // Show some stats
  let paid = 0, free = 0, emailOnly = 0;
  for (const customer of result.values()) {
    if (customer.purchaseStatus === 'paid') paid++;
    else if (customer.purchaseStatus === 'free') free++;
    else if (customer.purchaseStatus === 'email_only') emailOnly++;
  }
  
  console.log(`Paid: ${paid}, Free: ${free}, Email Only: ${emailOnly}`);
}