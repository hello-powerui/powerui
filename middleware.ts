import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

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
  '/api/webhooks(.*)',
  '/api/checkout',
  '/api/icons(.*)',
  '/upgrade',
  '/blog(.*)',
  '/themes(.*)',
  '/icons',
  '/docs(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Block test-stripe page in production
  if (process.env.NODE_ENV === 'production' && req.nextUrl.pathname === '/test-stripe') {
    return Response.redirect(new URL('/404', req.url))
  }
  
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