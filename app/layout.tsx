import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  title: 'Power UI - Something big is coming',
  description: 'The future of Power BI theming is almost here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}