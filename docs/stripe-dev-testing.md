# Stripe Development Testing Guide

## Quick Start

1. **Set up test environment variables** in `.env.local`:
```bash
# Use your Stripe test keys (start with sk_test_ and pk_test_)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# You'll get this from step 2
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs from running stripe:setup
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_5_PRICE_ID=price_...
STRIPE_TEAM_10_PRICE_ID=price_...
```

2. **Start webhook forwarding** (in a separate terminal):
```bash
npm run dev:stripe
```
Copy the webhook secret that appears and add it to `.env.local`.

3. **Run the development server**:
```bash
npm run dev
```

4. **Test the integration**:
- Go to http://localhost:3000/test-stripe
- Use test card: `4242 4242 4242 4242`
- Any future expiry date, any 3-digit CVC

## Testing Workflows

### 1. Full Checkout Flow
1. Go to `/pricing`
2. Click on a plan
3. Sign in if needed
4. Use test card `4242 4242 4242 4242`
5. Complete checkout
6. Verify redirect to success page

### 2. Quick Database Testing
Create a test purchase without going through Stripe:
```bash
tsx scripts/create-test-purchase.ts [userId] [plan]

# Example:
tsx scripts/create-test-purchase.ts user_123abc pro
tsx scripts/create-test-purchase.ts user_123abc team-5
```

### 3. Webhook Testing
With `npm run dev:stripe` running:
1. Complete a checkout
2. Watch the terminal for webhook logs
3. Check database for purchase record

## Test Scenarios

### Success Cases
- ✅ **Normal purchase**: Card `4242 4242 4242 4242`
- ✅ **3D Secure**: Card `4000 0025 0000 3155`

### Failure Cases
- ❌ **Declined**: Card `4000 0000 0000 0002`
- ❌ **Insufficient funds**: Card `4000 0000 0000 9995`

### Edge Cases
- 🔄 **Duplicate purchase**: Try to buy again with same user
- 👥 **Team setup**: Complete team purchase, then set up org
- 🚫 **No webhook secret**: Remove STRIPE_WEBHOOK_SECRET

## Debugging Tips

### 1. Check Webhook Logs
The webhook handler logs detailed info in development:
```
🔔 Stripe Webhook Received: checkout.session.completed
📦 Event ID: evt_...
✅ Purchase completed successfully!
   User: user_123
   Plan: pro
   Amount: $119.00
```

### 2. Verify Database
Check purchase records:
```bash
npm run db:studio
```
Look for:
- Purchase table entries
- User plan updates
- Stripe customer IDs

### 3. Common Issues

**"No signature" error**
- Make sure `npm run dev:stripe` is running
- Check webhook secret in `.env.local`

**"Invalid plan" error**
- Run `npm run stripe:setup` to create products
- Add price IDs to `.env.local`

**Purchase not recorded**
- Check webhook terminal for errors
- Verify database connection
- Check Prisma schema is up to date

### 4. Reset Test Data
To clean up test purchases:
```sql
-- In Prisma Studio or your database client
DELETE FROM "Purchase" WHERE "stripePaymentId" LIKE 'pi_test_%';
UPDATE "User" SET "plan" = 'PRO' WHERE "email" LIKE 'test-%@example.com';
```

## Test Page Features

Visit http://localhost:3000/test-stripe for:
- Test card reference
- Quick checkout buttons
- Database test purchases
- Webhook setup instructions

## Going to Production

Before launching:
1. Switch to live Stripe keys
2. Remove `/test-stripe` page
3. Update webhook endpoint in Stripe dashboard
4. Test with real card (then refund)