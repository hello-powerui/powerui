# Production Deployment Strategy

## Coming Soon Mode

This application supports a "coming soon" mode that allows you to deploy the full application to production while showing only a coming soon page to visitors. This enables testing of webhooks and other production features without exposing the full site.

### Setup

1. **Environment Variables**
   - Set `COMING_SOON_MODE=true` in your production environment
   - Set `ADMIN_SECRET=your-secret-key` (choose a secure random string)

2. **Accessing the Full Site**
   - Visit `https://yoursite.com?admin=your-secret-key`
   - This will set a cookie allowing you to access the full application
   - The cookie lasts for 24 hours

### What Works in Coming Soon Mode

- ✅ All API endpoints and webhooks remain accessible
- ✅ Clerk webhooks for user creation/updates
- ✅ Stripe webhooks for payments
- ✅ Admin access with secret key
- ✅ Full application functionality when accessed as admin

### Testing Webhooks

1. **Clerk Webhooks** - Will work at `/api/webhooks/clerk`
2. **Stripe Webhooks** - Will work at `/api/webhooks/stripe`
3. **Health Check** - Available at `/api/health`

### Deployment Steps

1. Copy `.env.production.example` to `.env.production`
2. Fill in all production values
3. Set `COMING_SOON_MODE=true`
4. Deploy to production
5. Test webhooks and functionality using admin access
6. When ready to launch, set `COMING_SOON_MODE=false`

### Security Notes

- The `ADMIN_SECRET` should be a secure random string
- Don't share the admin URL with the secret
- The admin cookie is httpOnly and secure in production
- Consider rotating the `ADMIN_SECRET` periodically