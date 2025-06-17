# PowerUI Launch Punchlist

## User Migration & Authentication
- Import existing Memberstack users to Clerk
  - Export user data from Memberstack
  - Map users to appropriate tiers (free, pro, business)
  - Handle multiple payment sources (Stripe, LemonSqueezy, Gumroad)
  - Consolidate customer records where possible
- Set up Clerk production environment
- Define organization setup process for business licenses
  - Decide between automated vs manual organization creation
  - Handle existing business license holders
- Implement access control for free accounts
  - Prevent resource access without purchase
  - Define free tier limitations

## Email & Communication
- Integrate Loops.so webhook for email list management
- Set up user email communication system
  - Welcome emails
  - Purchase confirmations
  - Update notifications

## Theme Studio
- Polish and verify Theme Studio functionality
  - Test all theme aspect modifications
  - Verify state changes work correctly
  - Ensure theme sharing functionality works
  - General UI/UX polish

## Content & Assets
- Implement blog system
  - Set up MDX infrastructure
  - Migrate existing blog content
  - Create blog listing and post pages
- Migrate downloadable assets to Vercel
  - Move files from current storage
  - Set up access control for downloads

## Infrastructure
- Update landing page for launch
- Configure DNS migration from Webflow to Vercel
- Complete production deployment setup

## Payment & Billing
- Reconcile historical purchase data
  - Map Stripe customer IDs where available
  - Document purchases from LemonSqueezy and Gumroad
  - Create unified customer database