import type { Metadata } from 'next'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
          {children}
          <Toaster position="bottom-right" />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}