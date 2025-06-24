'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function PublicHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Don't show header on homepage (it has its own navigation)
  if (pathname === '/') return null
  
  const navLinks = [
    { href: '/themes', label: 'Themes' },
    { href: '/docs', label: 'Docs' },
    { href: '/examples', label: 'Examples' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ]
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Power UI
            </Link>
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname.startsWith(link.href)
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link 
                href="/sign-in" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <SignedOut>
                <Link 
                  href="/sign-in" 
                  className="block py-2 text-sm text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="block py-2 text-sm font-medium text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="block py-2 text-sm text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}