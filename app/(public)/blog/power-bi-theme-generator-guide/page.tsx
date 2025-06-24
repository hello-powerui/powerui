import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Theme Generator: Complete Guide to Professional Themes | Power UI',
    description: 'Learn how to create stunning Power BI themes in minutes with Power UI Theme Generator. Import from Figma, create custom palettes, and build consistent design systems.',
    keywords: 'Power BI themes, theme generator, data visualization, Power UI, theme design, Figma integration',
    openGraph: {
      title: 'Power BI Theme Generator: Complete Guide to Professional Themes',
      description: 'Transform your Power BI reports from basic to beautiful with custom themes.',
      type: 'article',
      publishedTime: '2024-12-01T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Theme Generator: Complete Guide',
      description: 'Learn how to create professional Power BI themes that elevate your data visualization.',
    }
  }
}

export default function PowerBIThemeGeneratorGuidePage() {
  return <BlogContent />
}