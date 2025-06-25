import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Advanced Interactions & Design Systems | Power UI',
    description: 'Master advanced bookmark interactions, design systems, and theme file creation in Power BI. Learn when to use sophisticated features vs. native functionality for scalable dashboard design.',
    keywords: 'Power BI bookmarks, design systems, Power BI theme files, advanced interactions, Power UI design system',
    openGraph: {
      title: 'Power BI Advanced Interactions and Design Systems',
      description: 'Learn how to create sophisticated interactions and scalable design systems in Power BI.',
      type: 'article',
      publishedTime: '2024-12-21T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Advanced Interactions & Design Systems',
      description: 'Master bookmark interactions and design systems for professional Power BI dashboards.',
    }
  }
}

export default function PowerBIAdvancedInteractionsPage() {
  return <BlogContent />
}