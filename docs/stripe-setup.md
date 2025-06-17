# Stripe Billing Setup Guide

## Overview
PowerUI uses Stripe for processing one-time payments for lifetime access. This guide walks through setting up Stripe for the application.

## Setup Steps

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the onboarding process
3. Keep your account in test mode initially

### 2. Get API Keys
1. Go to Dashboard > Developers > API keys
2. Copy your test keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### 3. Configure Environment Variables
Add these to your `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Create Products and Prices
Run the setup script:
```bash
tsx scripts/setup-stripe-products.ts
```

This will create three products:
- PowerUI Pro - $119
- PowerUI Team (5 seats) - $399
- PowerUI Team (10 seats) - $699

The script will output price IDs. Add them to `.env.local`:
```bash
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_5_PRICE_ID=price_...
STRIPE_TEAM_10_PRICE_ID=price_...
```

### 5. Set Up Webhook
1. Go to Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 6. Test the Integration

#### Test Cards
Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

#### Test Flow
1. Go to `/pricing`
2. Click on a plan
3. Complete checkout with test card
4. Verify:
   - Purchase record created in database
   - User plan updated
   - Redirect to success page

## Database Schema

The integration uses these models:

### Purchase Model
```prisma
model Purchase {
  id                String   @id @default(uuid())
  userId            String?  @unique
  organizationId    String?  @unique
  stripeCustomerId  String
  stripePaymentId   String   @unique
  stripePriceId     String
  amount            Int      // Amount in cents
  currency          String   @default("usd")
  plan              PurchasePlan
  seats             Int?     // For team plans
  status            PurchaseStatus @default(PENDING)
  createdAt         DateTime @default(now())
}
```

### User Model
```prisma
model User {
  id              String   @id // Clerk user ID
  email           String   @unique
  plan            UserPlan @default(PRO)
  stripeCustomerId String? @unique
  // ... other fields
}
```

## Webhook Processing

The webhook handler (`/api/webhooks/stripe`) processes:

1. **checkout.session.completed**:
   - Creates/updates user with Stripe customer ID
   - Creates purchase record
   - Updates user plan
   - For team plans: Prepares for organization creation

2. **payment_intent.payment_failed**:
   - Updates purchase status to FAILED

## Security Considerations

1. **Webhook Signature Verification**: Always verify webhook signatures
2. **Idempotency**: Handle duplicate webhook events gracefully
3. **Authentication**: Ensure users are authenticated before checkout
4. **Environment Variables**: Never commit API keys to version control

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**:
   - Check webhook URL is correct
   - Verify webhook secret is correct
   - Check logs for signature verification errors

2. **Checkout fails**:
   - Verify price IDs are correct
   - Check Stripe dashboard for errors
   - Ensure user is authenticated

3. **Purchase not recorded**:
   - Check webhook logs in Stripe dashboard
   - Verify database connection
   - Check server logs for errors

### Testing Webhooks Locally

Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will print a webhook signing secret for local testing.

## Going Live

1. Switch to live mode in Stripe dashboard
2. Create live products and prices
3. Update environment variables with live keys
4. Update webhook endpoint with production URL
5. Test with real payment method