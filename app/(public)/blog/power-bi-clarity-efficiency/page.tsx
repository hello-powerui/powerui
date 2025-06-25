import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Clarity & Efficiency: Data-to-Ink Ratio & Smart Design | Power UI',
    description: 'Optimize your Power BI dashboards for clarity and efficiency. Learn data-to-ink ratio principles, precision formatting, smart filtering strategies, and KPI context techniques.',
    keywords: 'Power BI data-to-ink ratio, dashboard clarity, Power BI efficiency, KPI design, smart filtering, data precision',
    openGraph: {
      title: 'Power BI Clarity & Efficiency: Creating Clean, Focused Dashboards',
      description: 'Master the art of removing clutter and focusing on what matters in your Power BI reports.',
      type: 'article',
      publishedTime: '2024-12-20T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Clarity & Efficiency',
      description: 'Learn how to create clean, efficient Power BI dashboards that users can understand quickly.',
    }
  }
}

export default function PowerBIClarityEfficiencyPage() {
  return <BlogContent />
}