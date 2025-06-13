'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Suspense, lazy } from 'react'

// Lazy load AppHeader to avoid SSR issues
const AppHeader = lazy(() => import('./app-header').then(mod => ({ default: mod.AppHeader })))

export function AppHeaderWrapper() {
  const pathname = usePathname()
  
  // Check if we're in an authenticated route
  const isAuthRoute = pathname.startsWith('/dashboard') || 
                     pathname.startsWith('/themes') || 
                     pathname.startsWith('/palettes')
  
  // Only render AppHeader in auth routes where ClerkProvider is available
  if (isAuthRoute) {
    return (
      <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
        <AppHeader />
      </Suspense>
    )
  }
  
  // For public routes, render a simple header without Clerk components
  if (pathname === '/') return null
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">PowerUI</h1>
          <div className="flex gap-3">
            <Link 
              href="/sign-in" 
              className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}