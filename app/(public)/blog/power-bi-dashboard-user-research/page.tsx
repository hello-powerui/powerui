import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Understanding Your Power BI Dashboard Users: A Complete Guide | Power UI',
    description: 'Learn how to identify and analyze your dashboard users, gather requirements effectively, and design Power BI reports that meet real business needs. Essential user research techniques for data professionals.',
    keywords: 'Power BI user research, dashboard audience analysis, user requirements gathering, data visualization UX, Power BI accessibility',
    openGraph: {
      title: 'Understanding Your Power BI Dashboard Users: The Foundation of Great Design',
      description: 'Master user research techniques to create Power BI dashboards that truly serve your audience.',
      type: 'article',
      publishedTime: '2024-12-16T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Understanding Your Power BI Dashboard Users',
      description: 'Learn essential user research techniques for creating effective Power BI dashboards.',
    }
  }
}

export default function PowerBIDashboardUserResearchPage() {
  return <BlogContent />
}