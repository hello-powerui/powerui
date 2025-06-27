import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Routes that should always be accessible (webhooks, API endpoints)
const isAlwaysAccessible = createRouteMatcher([
  '/api/webhooks(.*)',
  '/api/health',
])

// Admin test routes (only accessible with secret key)
const isAdminRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/themes(.*)',
  '/palettes(.*)',
  '/team-setup(.*)',
  '/test-stripe(.*)',
  '/success(.*)',
])

// Public routes when site is live
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing',
  '/contact-sales',
  '/examples',
  '/privacy',
  '/terms',
  '/checkout',
  '/api/checkout',
  '/api/icons(.*)',
  '/upgrade',
  '/blog(.*)',
  '/icons',
  '/docs(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const isComingSoonMode = process.env.COMING_SOON_MODE === 'true'
  const adminSecret = req.nextUrl.searchParams.get('admin')
  const isValidAdmin = adminSecret === process.env.ADMIN_SECRET
  
  // Always allow webhook and health endpoints
  if (isAlwaysAccessible(req)) {
    return NextResponse.next()
  }
  
  // In coming soon mode
  if (isComingSoonMode) {
    // Allow admin access with secret
    if (isValidAdmin) {
      // Set a cookie to remember admin access
      const response = NextResponse.next()
      response.cookies.set('admin-access', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })
      return response
    }
    
    // Check for admin cookie
    const hasAdminCookie = req.cookies.get('admin-access')?.value === 'true'
    
    // If not admin and trying to access non-coming-soon pages, redirect
    if (!hasAdminCookie && req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  // Block test-stripe page in production (unless admin)
  if (process.env.NODE_ENV === 'production' && 
      req.nextUrl.pathname === '/test-stripe' && 
      !isValidAdmin && 
      !req.cookies.get('admin-access')?.value) {
    return Response.redirect(new URL('/404', req.url))
  }
  
  // Standard auth protection
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}