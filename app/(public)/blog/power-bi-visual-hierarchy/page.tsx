import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Visual Hierarchy: Typography, Organization & Labels | Power UI',
    description: 'Master visual hierarchy in Power BI dashboards. Learn typography best practices, data organization strategies, and labeling techniques for clear, professional reports.',
    keywords: 'Power BI typography, visual hierarchy, dashboard organization, Power BI fonts, data labeling, DAX formatting',
    openGraph: {
      title: 'Power BI Visual Hierarchy: Creating Clear Information Structure',
      description: 'Learn how to use typography and organization to guide users through your Power BI dashboards effectively.',
      type: 'article',
      publishedTime: '2024-12-18T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Visual Hierarchy & Typography',
      description: 'Master the art of creating clear information hierarchy in your Power BI dashboards.',
    }
  }
}

export default function PowerBIVisualHierarchyPage() {
  return <BlogContent />
}