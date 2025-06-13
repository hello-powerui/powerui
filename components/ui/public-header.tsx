'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function PublicHeader() {
  const pathname = usePathname()
  
  // Don't show header on homepage
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