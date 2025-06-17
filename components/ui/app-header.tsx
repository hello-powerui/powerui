'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/themes', label: 'Themes' },
    { href: '/themes/studio', label: 'Studio' },
  ]

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              PowerUI
            </Link>
            <SignedIn>
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname.startsWith(item.href)
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SignedIn>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="flex gap-3">
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-sm">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <OrganizationSwitcher 
                afterCreateOrganizationUrl="/dashboard"
                afterSelectOrganizationUrl="/dashboard"
                appearance={{
                  elements: {
                    rootBox: "flex",
                    organizationSwitcherTrigger: "px-3 py-2 text-sm"
                  }
                }}
              />
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}