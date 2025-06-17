'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function UpgradeHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              PowerUI
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonBox: "flex",
                    userButtonTrigger: "focus:shadow-none"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}