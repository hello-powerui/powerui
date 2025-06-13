import type { Metadata } from 'next'
import { AppHeader } from '@/components/ui/app-header'
import { Toaster } from 'sonner'
import { Providers } from './providers'
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
          <AppHeader />
          <main>{children}</main>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}