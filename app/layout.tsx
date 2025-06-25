import type { Metadata } from 'next'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://powerui.com'),
  title: {
    default: 'PowerUI - Professional Power BI Theme Generator',
    template: '%s | PowerUI'
  },
  description: 'Create beautiful, consistent Power BI themes with PowerUI. Professional theme generation for Power BI reports.',
  keywords: ['Power BI', 'themes', 'data visualization', 'design system', 'theme generator', 'dashboard design', 'business intelligence'],
  authors: [{ name: 'PowerUI Team' }],
  creator: 'PowerUI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://powerui.com',
    siteName: 'PowerUI',
    title: 'PowerUI - Professional Power BI Theme Generator',
    description: 'Create beautiful, consistent Power BI themes with PowerUI. Stop wrestling with JSON files and start shipping.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'PowerUI - Power BI Theme Generator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PowerUI - Professional Power BI Theme Generator',
    description: 'Create beautiful, consistent Power BI themes with PowerUI. Stop wrestling with JSON files and start shipping.',
    images: ['/twitter-image.png'],
    creator: '@powerui'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
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