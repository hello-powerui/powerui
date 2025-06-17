# Customer Analysis Project

This project consolidates customer data from multiple platforms (Gumroad, LemonSqueezy, Stripe, Memberstack, Loops) and provides comprehensive financial analysis.

## Purpose

1. Create a unified customer list from all platforms
2. Calculate complete financial transactions with all fees
3. Identify customer categories (paid, free, incomplete, email-only)
4. Generate actionable reports for:
   - Cleaning up Loops CRM
   - Migrating users to Clerk with correct plans
   - Understanding complete financial picture

## Data Sources

- **Gumroad**: Historical sales data (`/salescustomers/gumroad.csv`)
- **LemonSqueezy**: Recent sales and payout data (`/salescustomers/lemonsqueezy.csv` + payout files)
- **Memberstack**: Current user base (`/salescustomers/memberstack.csv`)
- **Loops**: Email CRM data (`/salescustomers/loops.csv`)
- **Stripe**: Live API data (requires STRIPE_SECRET_KEY)

## Usage

1. Ensure you have Node.js and npm installed
2. Install dependencies: `npm install`
3. Set up environment variables (copy from main project .env)
4. Run the analysis: `npm run analyze`

## Scripts

- `parse-gumroad.ts` - Parses Gumroad sales data
- `parse-lemonsqueezy.ts` - Parses LemonSqueezy orders and matches with payouts
- `parse-memberstack.ts` - Parses Memberstack user data
- `parse-loops.ts` - Parses Loops CRM data
- `fetch-stripe-data.ts` - Fetches live Stripe data via API
- `consolidate-customers.ts` - Merges and deduplicates customer data
- `consolidate-transactions.ts` - Consolidates all financial transactions
- `export-data.ts` - Generates output reports
- `run-analysis.ts` - Main orchestration script

## Output

All reports are generated in the `/output` directory:
- `consolidated-customers.csv` - Master customer list
- `consolidated-transactions.csv` - All transactions with complete fee breakdown
- `loops-updates.csv` - Required updates for Loops CRM
- `clerk-migration.csv` - Users to migrate to Clerk
- `financial-summary.json` - Summary statistics

## Cleanup

To remove this entire analysis project, simply delete the `customer-analysis` directory or run:
```bash
rm -rf /Users/jonsandmann/Library/Mobile\ Documents/com~apple~CloudDocs/Projects/powerui/customer-analysis
```