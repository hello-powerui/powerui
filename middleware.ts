// Simplified middleware that only runs the basic Clerk middleware
// Authentication checks are handled by Clerk's React components instead
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // Only run middleware on API routes and specific pages that need auth
  matcher: [
    "/api/((?!webhooks).*)",
    "/dashboard(.*)",
    "/themes(.*)",
    "/palettes(.*)",
  ],
};