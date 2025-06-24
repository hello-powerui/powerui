'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
    </ClerkProvider>
  )
}