import { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'The Complete Guide to Power BI Theme Generators | Power UI Blog',
  description: 'An in-depth comparison of the top Power BI theme generators, their features, limitations, and how they can transform your report design workflow.',
  openGraph: {
    title: 'The Complete Guide to Power BI Theme Generators',
    description: 'Compare Power UI, PowerBI.Tips, BIBB, and Themes.pbix. Discover which theme generator best fits your Power BI development needs.',
    images: [
      {
        url: '/blog/power-bi-theme-generators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Power BI Theme Generators Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Complete Guide to Power BI Theme Generators',
    description: 'Compare the top Power BI theme generators and find the perfect tool for your needs.',
    images: ['/blog/power-bi-theme-generators-og.jpg'],
  },
}

export default function PowerBIThemeGeneratorsPage() {
  return <BlogContent />
}