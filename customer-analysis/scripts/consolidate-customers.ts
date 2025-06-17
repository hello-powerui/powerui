import { Customer } from '../lib/types';
import { normalizeEmail } from '../lib/utils';
import { parseGumroadData } from './parse-gumroad';
import { parseLemonSqueezyData } from './parse-lemonsqueezy';
import { parseMemberstackData } from './parse-memberstack';
import { parseLoopsData } from './parse-loops';
import { fetchStripeData } from './fetch-stripe-data';

// Helper function to infer plan from spending amount
function inferPlanFromSpending(customer: Customer) {
  const spent = customer.totalSpent;
  
  // Common price points:
  // PRO: $49, $69, $89, $99, $119
  // Team 5: $199, $249
  // Team 10: $349, $399, $449, $499
  
  if (spent >= 300) {
    customer.plans.push('Team 10');
  } else if (spent >= 150) {
    customer.plans.push('Team 5');
  } else if (spent > 0) {
    customer.plans.push('PRO');
  }
}

export async function consolidateCustomers(): Promise<Map<string, Customer>> {
  console.log('Starting customer consolidation...\n');
  
  // Parse all data sources
  const gumroadData = parseGumroadData();
  const lemonSqueezyData = parseLemonSqueezyData();
  const memberstackCustomers = parseMemberstackData();
  const loopsCustomers = parseLoopsData();
  const stripeData = await fetchStripeData();
  
  // Master customer map
  const consolidatedCustomers = new Map<string, Customer>();
  
  // Helper function to merge customer data
  const mergeCustomer = (email: string, newData: Partial<Customer>) => {
    const existing = consolidatedCustomers.get(email);
    
    if (!existing) {
      // Create new customer
      const customer: Customer = {
        email,
        name: newData.name || '',
        sources: newData.sources || [],
        purchaseStatus: newData.purchaseStatus || 'email_only',
        plans: newData.plans || [],
        firstSeenDate: newData.firstSeenDate || new Date(),
        lastActivityDate: newData.lastActivityDate || new Date(),
        totalSpent: newData.totalSpent || 0,
        stripeCustomerId: newData.stripeCustomerId,
        memberstackId: newData.memberstackId,
        loopsUserId: newData.loopsUserId
      };
      consolidatedCustomers.set(email, customer);
    } else {
      // Merge with existing
      existing.name = existing.name || newData.name || '';
      
      // Merge sources
      for (const source of (newData.sources || [])) {
        if (!existing.sources.includes(source)) {
          existing.sources.push(source);
        }
      }
      
      // Merge plans
      for (const plan of (newData.plans || [])) {
        if (!existing.plans.includes(plan)) {
          existing.plans.push(plan);
        }
      }
      
      // Update dates
      if (newData.firstSeenDate) {
        existing.firstSeenDate = new Date(Math.min(
          existing.firstSeenDate.getTime(),
          newData.firstSeenDate.getTime()
        ));
      }
      
      if (newData.lastActivityDate) {
        existing.lastActivityDate = new Date(Math.max(
          existing.lastActivityDate.getTime(),
          newData.lastActivityDate.getTime()
        ));
      }
      
      // Update purchase status (paid > free > incomplete > email_only)
      const statusPriority = { paid: 4, free: 3, incomplete: 2, email_only: 1 };
      if (newData.purchaseStatus) {
        const existingPriority = statusPriority[existing.purchaseStatus] || 0;
        const newPriority = statusPriority[newData.purchaseStatus] || 0;
        if (newPriority > existingPriority) {
          existing.purchaseStatus = newData.purchaseStatus;
        }
      }
      
      // If customer is paid but has no plans, try to infer from total spent
      if (existing.purchaseStatus === 'paid' && existing.plans.length === 0) {
        inferPlanFromSpending(existing);
      }
      
      // Update total spent
      existing.totalSpent += newData.totalSpent || 0;
      
      // Update IDs
      existing.stripeCustomerId = existing.stripeCustomerId || newData.stripeCustomerId;
      existing.memberstackId = existing.memberstackId || newData.memberstackId;
      existing.loopsUserId = existing.loopsUserId || newData.loopsUserId;
    }
  };
  
  // Process all data sources
  console.log('Merging Gumroad customers...');
  for (const [email, customer] of gumroadData.customers) {
    mergeCustomer(email, customer);
  }
  
  console.log('Merging LemonSqueezy customers...');
  for (const [email, customer] of lemonSqueezyData.customers) {
    mergeCustomer(email, customer);
  }
  
  console.log('Merging Memberstack customers...');
  for (const [email, customer] of memberstackCustomers) {
    mergeCustomer(email, customer);
  }
  
  console.log('Merging Loops customers...');
  for (const [email, customer] of loopsCustomers) {
    mergeCustomer(email, customer);
  }
  
  console.log('Merging Stripe customers...');
  for (const [email, customer] of stripeData.customers) {
    mergeCustomer(email, customer);
  }
  
  // Final pass - ensure all paid customers have plans
  for (const customer of consolidatedCustomers.values()) {
    if (customer.purchaseStatus === 'paid' && customer.plans.length === 0) {
      inferPlanFromSpending(customer);
    }
  }
  
  // Final statistics
  console.log(`\nConsolidation complete!`);
  console.log(`Total unique customers: ${consolidatedCustomers.size}`);
  
  // Count by status
  const stats = {
    paid: 0,
    free: 0,
    incomplete: 0,
    email_only: 0
  };
  
  let paidWithoutPlans = 0;
  for (const customer of consolidatedCustomers.values()) {
    stats[customer.purchaseStatus]++;
    if (customer.purchaseStatus === 'paid' && customer.plans.length === 0) {
      paidWithoutPlans++;
    }
  }
  
  console.log(`\nCustomer breakdown:`);
  console.log(`- Paid customers: ${stats.paid}`);
  console.log(`- Free users: ${stats.free}`);
  console.log(`- Incomplete checkouts: ${stats.incomplete}`);
  console.log(`- Email only: ${stats.email_only}`);
  
  if (paidWithoutPlans > 0) {
    console.log(`\nWARNING: ${paidWithoutPlans} paid customers still have no plans assigned!`);
  }
  
  return consolidatedCustomers;
}

// Run if called directly
if (require.main === module) {
  consolidateCustomers().then(customers => {
    console.log(`\nConsolidation complete with ${customers.size} unique customers`);
  });
}