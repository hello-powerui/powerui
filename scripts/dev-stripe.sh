#!/bin/bash

echo "🚀 Starting Stripe webhook forwarding for local development..."
echo ""
echo "⚠️  IMPORTANT: Copy the webhook signing secret that appears below"
echo "   and add it to your .env.local file as STRIPE_WEBHOOK_SECRET"
echo ""
echo "📝 Example: STRIPE_WEBHOOK_SECRET=whsec_..."
echo ""
echo "Press Ctrl+C to stop forwarding"
echo "----------------------------------------"
echo ""

stripe listen --forward-to localhost:3000/api/webhooks/stripe