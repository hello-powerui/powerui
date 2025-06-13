'use client'

import { ClerkProvider } from '@clerk/nextjs'

export function AuthClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signOutFallbackRedirectUrl="/"
    >
      {children}
    </ClerkProvider>
  )
}