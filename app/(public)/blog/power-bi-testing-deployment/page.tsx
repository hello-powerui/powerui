import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Testing, Deployment & Maintenance Best Practices | Power UI',
    description: 'Learn how to test Power BI dashboards with real users, optimize performance, deploy successfully, and maintain dashboards over time. Essential strategies for dashboard success.',
    keywords: 'Power BI testing, dashboard deployment, performance optimization, user testing, Power BI maintenance, dashboard governance',
    openGraph: {
      title: 'Power BI Testing, Deployment & Maintenance: Ensuring Dashboard Success',
      description: 'Master the complete lifecycle of Power BI dashboards from testing through deployment and ongoing maintenance.',
      type: 'article',
      publishedTime: '2024-12-22T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Testing & Deployment Best Practices',
      description: 'Learn how to test, deploy, and maintain successful Power BI dashboards.',
    }
  }
}

export default function PowerBITestingDeploymentPage() {
  return <BlogContent />
}