# Organization Invitation Flow

## Overview
When team members are invited to join an organization, they receive an email invitation from Clerk. The flow should be:

1. User clicks invitation link in email
2. User is directed to sign-up (if new) or sign-in (if existing)
3. After authentication, user is automatically added to the organization
4. User is redirected to the dashboard

## Configuration
The following redirect configurations ensure invited users land on the dashboard:

### Environment Variables
```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

### Sign-Up/Sign-In Components
Both components include force and fallback redirect URLs:
- `signUpForceRedirectUrl="/dashboard"`
- `signUpFallbackRedirectUrl="/dashboard"`
- `signInForceRedirectUrl="/dashboard"`
- `signInFallbackRedirectUrl="/dashboard"`

## Troubleshooting

### Issue: User sees "Welcome, start building" page
This typically happens when:
1. The redirect URLs aren't properly configured
2. The invitation link is malformed
3. The organization webhook hasn't synced the user yet

### Solution:
1. Ensure all environment variables are set
2. Check that webhooks are properly configured in Clerk Dashboard
3. Have the user navigate directly to `/dashboard` after sign-up

### Backend Sync
The webhook at `/api/webhooks/clerk` handles:
- `organizationMembership.created`: Grants team access to new members
- `organizationMembership.deleted`: Revokes access when members are removed

## Testing Invitations
1. Create organization as team admin
2. Invite member via Clerk's OrganizationProfile component
3. Accept invitation in incognito/different browser
4. Verify redirect to dashboard
5. Confirm team access is granted