import * as path from 'path';
import { Customer, ParsedMemberstackRow } from '../lib/types';
import { readCSV, normalizeEmail, parseDate } from '../lib/utils';

export function parseMemberstackData(): Map<string, Partial<Customer>> {
  const customers = new Map<string, Partial<Customer>>();
  
  const csvPath = path.join(__dirname, '../../salescustomers/memberstack.csv');
  const rows = readCSV<any>(csvPath);
  
  console.log(`Parsing ${rows.length} Memberstack records...`);
  
  for (const row of rows) {
    try {
      const email = normalizeEmail(row['email'] || '');
      if (!email) continue;
      
      const createdDate = parseDate(row['CreatedAt']);
      const lastLoginDate = row['Last Login'] ? parseDate(row['Last Login']) : createdDate;
      
      // Update or create customer
      const existingCustomer = customers.get(email) || {
        email,
        sources: [],
        plans: [],
        totalSpent: 0,
        firstSeenDate: createdDate,
        lastActivityDate: lastLoginDate
      };
      
      if (!existingCustomer.sources.includes('memberstack')) {
        existingCustomer.sources.push('memberstack');
      }
      
      // Store Memberstack ID
      existingCustomer.memberstackId = row['Member ID'];
      existingCustomer.stripeCustomerId = existingCustomer.stripeCustomerId || row['Stripe Customer ID'];
      
      // Parse plans
      const freePlans = row['Free Plans (plan ids)'] || '';
      const paidPlans = row['Paid Plans (price ids)'] || '';
      
      if (paidPlans && paidPlans.includes('legacy-pro')) {
        existingCustomer.plans.push('Legacy PRO');
        existingCustomer.purchaseStatus = 'paid';
      } else if (freePlans) {
        // Free plan user
        if (!existingCustomer.purchaseStatus || existingCustomer.purchaseStatus === 'email_only') {
          existingCustomer.purchaseStatus = 'free';
        }
      }
      
      // Update customer info
      existingCustomer.name = existingCustomer.name || 
        `${row['First Name'] || ''} ${row['Last Name'] || ''}`.trim();
      existingCustomer.firstSeenDate = new Date(Math.min(existingCustomer.firstSeenDate!.getTime(), createdDate.getTime()));
      existingCustomer.lastActivityDate = new Date(Math.max(existingCustomer.lastActivityDate!.getTime(), lastLoginDate.getTime()));
      
      customers.set(email, existingCustomer);
      
    } catch (error) {
      console.error(`Error parsing Memberstack row:`, error, row);
    }
  }
  
  console.log(`Parsed ${customers.size} Memberstack customers`);
  
  return customers;
}

// Run if called directly
if (require.main === module) {
  const result = parseMemberstackData();
  console.log(`Found ${result.size} customers`);
  
  // Show some stats
  let paid = 0, free = 0;
  for (const customer of result.values()) {
    if (customer.purchaseStatus === 'paid') paid++;
    else if (customer.purchaseStatus === 'free') free++;
  }
  
  console.log(`Paid: ${paid}, Free: ${free}`);
}