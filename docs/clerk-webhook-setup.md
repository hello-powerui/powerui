# Clerk Webhook Configuration

To complete the organization setup, configure these webhooks in your Clerk Dashboard:

## Required Webhook Events

1. **user.created** - Sync new users to database
2. **user.updated** - Update user email if changed
3. **user.deleted** - Clean up user data
4. **organization.created** - Sync new organizations to database
5. **organizationMembership.created** - Grant team access to members
6. **organizationMembership.deleted** - Revoke team access if no personal license

## Setup Instructions

1. Go to Clerk Dashboard → Webhooks
2. Create new endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select the events listed above
4. Copy the signing secret to `CLERK_WEBHOOK_SECRET` in your .env

## What Clerk Handles Automatically

- Organization creation UI
- Member invitations and limits (respects your seat count)
- Role management (admin/member)
- Organization switching
- Member removal

## What Our Webhook Handles

- Syncs organizations to our database for license tracking
- Grants/revokes PRO features based on organization membership
- Links purchases to organizations

Note: Clerk automatically enforces seat limits based on the organization's subscription plan, so we don't need to track member counts manually.