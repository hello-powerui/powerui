import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public paths that don't require authentication
const publicPaths = ['/', '/sign-in', '/sign-up', '/pricing', '/contact-sales', '/examples', '/privacy', '/terms']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }
  
  // Allow API webhooks
  if (pathname.startsWith('/api/webhooks')) {
    return NextResponse.next()
  }
  
  // Check for auth cookie (Clerk sets __session cookie)
  const isAuthenticated = request.cookies.has('__session')
  
  // Redirect to sign-in if not authenticated
  if (!isAuthenticated && !pathname.startsWith('/sign-in')) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}