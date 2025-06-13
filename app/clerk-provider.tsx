'use client'

import { ClerkProvider as ClerkProviderPrimitive } from '@clerk/nextjs'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <ClerkProviderPrimitive>{children}</ClerkProviderPrimitive>
}