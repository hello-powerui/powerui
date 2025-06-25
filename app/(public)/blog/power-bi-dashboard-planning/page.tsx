import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Dashboard Planning: Canvas Setup, Grids & Spacing | Power UI',
    description: 'Master the foundations of Power BI dashboard design. Learn wireframing, canvas sizing, grid systems, and spacing principles for professional, consistent layouts.',
    keywords: 'Power BI canvas size, dashboard grid system, Power BI spacing, wireframing dashboards, Power BI layout design',
    openGraph: {
      title: 'Power BI Dashboard Planning: Building Strong Foundations',
      description: 'Create professional Power BI dashboards with proper planning, grid systems, and consistent spacing.',
      type: 'article',
      publishedTime: '2024-12-17T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Dashboard Planning & Foundation Setup',
      description: 'Learn essential planning techniques for creating well-structured Power BI dashboards.',
    }
  }
}

export default function PowerBIDashboardPlanningPage() {
  return <BlogContent />
}