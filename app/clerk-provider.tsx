'use client'

import { ClerkProvider as ClerkProviderPrimitive } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{children}</>
  }

  return <ClerkProviderPrimitive>{children}</ClerkProviderPrimitive>
}