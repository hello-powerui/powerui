import Stripe from 'stripe';
import { Customer, Transaction } from '../lib/types';
import { normalizeEmail, loadEnv } from '../lib/utils';
import { FeeCalculator } from '../lib/fee-calculator';

export async function fetchStripeData(): Promise<{ customers: Map<string, Partial<Customer>>, transactions: Transaction[] }> {
  loadEnv();
  
  const stripeKey = process.env.STRIPE_SECRET_KEY_LIVE || process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey) {
    console.error('STRIPE_SECRET_KEY_LIVE or STRIPE_SECRET_KEY not found in environment variables');
    return { customers: new Map(), transactions: [] };
  }
  
  const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-12-18.acacia',
  });
  
  const customers = new Map<string, Partial<Customer>>();
  const transactions: Transaction[] = [];
  
  console.log('Fetching Stripe customers...');
  
  try {
    // Fetch all customers
    let hasMore = true;
    let startingAfter: string | undefined;
    
    while (hasMore) {
      const customerList = await stripe.customers.list({
        limit: 100,
        starting_after: startingAfter
      });
      
      for (const stripeCustomer of customerList.data) {
        if (!stripeCustomer.email) continue;
        
        const email = normalizeEmail(stripeCustomer.email);
        const created = new Date(stripeCustomer.created * 1000);
        
        const customer: Partial<Customer> = {
          email,
          name: stripeCustomer.name || '',
          sources: ['stripe'],
          plans: [],
          totalSpent: 0,
          firstSeenDate: created,
          lastActivityDate: created,
          stripeCustomerId: stripeCustomer.id,
          purchaseStatus: 'incomplete' // Will update based on charges
        };
        
        customers.set(email, customer);
      }
      
      hasMore = customerList.has_more;
      if (customerList.data.length > 0) {
        startingAfter = customerList.data[customerList.data.length - 1].id;
      }
    }
    
    console.log(`Fetched ${customers.size} Stripe customers`);
    console.log('Fetching Stripe payment intents...');
    
    // Fetch all payment intents
    hasMore = true;
    startingAfter = undefined;
    let paymentIntentCount = 0;
    
    while (hasMore) {
      const paymentIntentsList = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: startingAfter,
        expand: ['data.customer', 'data.latest_charge', 'data.latest_charge.balance_transaction']
      });
      
      for (const paymentIntent of paymentIntentsList.data) {
        paymentIntentCount++;
        
        // Get customer email from the payment intent or customer object
        let email: string | null = null;
        if (paymentIntent.receipt_email) {
          email = paymentIntent.receipt_email;
        } else if (paymentIntent.customer && typeof paymentIntent.customer === 'object' && paymentIntent.customer.email) {
          email = paymentIntent.customer.email;
        }
        
        if (!email) continue;
        
        email = normalizeEmail(email);
        const intentDate = new Date(paymentIntent.created * 1000);
        const amount = paymentIntent.amount / 100; // Convert from cents
        
        // Update or create customer
        let customer = customers.get(email);
        if (!customer) {
          customer = {
            email,
            name: '',
            sources: ['stripe'],
            plans: [],
            totalSpent: 0,
            firstSeenDate: intentDate,
            lastActivityDate: intentDate,
            stripeCustomerId: typeof paymentIntent.customer === 'string' ? paymentIntent.customer : paymentIntent.customer?.id,
            purchaseStatus: 'incomplete'
          };
          customers.set(email, customer);
        }
        
        // Update customer based on payment intent status
        if (paymentIntent.status === 'succeeded') {
          customer.purchaseStatus = 'paid';
          customer.totalSpent = (customer.totalSpent || 0) + amount;
        } else if (paymentIntent.status === 'canceled' || paymentIntent.status === 'requires_payment_method') {
          if (customer.purchaseStatus !== 'paid') {
            customer.purchaseStatus = 'incomplete';
          }
        }
        
        customer.lastActivityDate = new Date(Math.max(customer.lastActivityDate!.getTime(), intentDate.getTime()));
        
        // Try to determine plan from metadata or description
        const description = paymentIntent.description || '';
        const metadata = paymentIntent.metadata || {};
        
        if (description.includes('PRO') || metadata.plan === 'pro') {
          if (!customer.plans.includes('PRO')) customer.plans.push('PRO');
        } else if (description.includes('Team 5') || metadata.plan === 'team-5') {
          if (!customer.plans.includes('Team 5')) customer.plans.push('Team 5');
        } else if (description.includes('Team 10') || metadata.plan === 'team-10') {
          if (!customer.plans.includes('Team 10')) customer.plans.push('Team 10');
        } else if (paymentIntent.status === 'succeeded' && customer.plans.length === 0) {
          // Infer from amount if no plan found
          if (amount >= 300) {
            customer.plans.push('Team 10');
          } else if (amount >= 150) {
            customer.plans.push('Team 5');
          } else if (amount > 0) {
            customer.plans.push('PRO');
          }
        }
        
        // Get exact fees from balance transaction
        let platformFee = 0;
        let processorFee = 0;
        let stripeFee = 0;
        let taxAmount = 0;
        
        if (paymentIntent.latest_charge && typeof paymentIntent.latest_charge === 'object') {
          const charge = paymentIntent.latest_charge;
          
          // Get balance transaction for exact fees
          if (charge.balance_transaction && typeof charge.balance_transaction === 'object') {
            const balanceTransaction = charge.balance_transaction;
            
            // Find the stripe fee
            if (balanceTransaction.fee) {
              stripeFee = balanceTransaction.fee / 100; // Convert from cents
            }
            
            // Look for tax in fee details
            if (balanceTransaction.fee_details) {
              for (const feeDetail of balanceTransaction.fee_details) {
                if (feeDetail.type === 'tax') {
                  taxAmount += feeDetail.amount / 100;
                }
              }
            }
          }
        }
        
        // Calculate Memberstack fee (3% assumption)
        if (paymentIntent.status === 'succeeded') {
          platformFee = amount * 0.03; // 3% Memberstack fee
          processorFee = stripeFee;
        }
        
        // Only create transaction records for successful payments or refunds
        if (paymentIntent.status === 'succeeded' || (paymentIntent.status === 'canceled' && paymentIntent.amount_refunded > 0)) {
          // Create transaction
          const transaction: Transaction = {
            id: `stripe_${paymentIntent.id}`,
            customerEmail: email,
            platform: 'stripe',
            date: intentDate,
            grossAmount: amount,
            refundAmount: paymentIntent.amount_refunded ? paymentIntent.amount_refunded / 100 : 0,
            taxAmount: taxAmount,
            platformFee: platformFee,
            processorFee: processorFee,
            netAmount: amount - platformFee - processorFee - taxAmount,
            productName: paymentIntent.description || 'Power UI',
            status: paymentIntent.status === 'succeeded' ? 'completed' : 'refunded',
            metadata: {
              paymentIntentId: paymentIntent.id,
              customerId: paymentIntent.customer,
              status: paymentIntent.status,
              paymentMethod: paymentIntent.payment_method_types?.[0]
            }
          };
          
          transactions.push(transaction);
        }
      }
      
      hasMore = paymentIntentsList.has_more;
      if (paymentIntentsList.data.length > 0) {
        startingAfter = paymentIntentsList.data[paymentIntentsList.data.length - 1].id;
      }
    }
    
    console.log(`Fetched ${paymentIntentCount} Stripe payment intents`);
    console.log(`Found ${transactions.length} successful transactions with emails`);
    
  } catch (error) {
    console.error('Error fetching Stripe data:', error);
  }
  
  return { customers, transactions };
}

// Run if called directly
if (require.main === module) {
  fetchStripeData().then(result => {
    console.log(`Found ${result.customers.size} customers and ${result.transactions.length} transactions`);
  });
}