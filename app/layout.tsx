import type { Metadata } from 'next'
import { Providers } from './providers'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  title: 'PowerUI - Professional Power BI Theme Generator',
  description: 'Create beautiful, consistent Power BI themes with PowerUI. Professional theme generation for Power BI reports.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-segoe">
        <Providers>
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-bold text-gray-900">PowerUI</h1>
                <div>
                  <SignedOut>
                    <div className="flex gap-3">
                      <SignInButton mode="modal">
                        <button className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-sm">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}