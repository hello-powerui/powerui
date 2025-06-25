import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Dashboard Design Philosophy: Why Great Design Matters | Power UI',
    description: 'Learn the fundamental principles of effective Power BI dashboard design. Discover why design matters for business success and how to communicate effectively through data visualization.',
    keywords: 'Power BI dashboard design, data visualization principles, dashboard philosophy, business intelligence design, Power UI',
    openGraph: {
      title: 'Power BI Dashboard Design Philosophy: Why Great Design Matters',
      description: 'Master the core principles that guide professional dashboard creation in Power BI.',
      type: 'article',
      publishedTime: '2024-12-15T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Dashboard Design Philosophy',
      description: 'Learn why dashboard design matters for business success and how to create impactful reports.',
    }
  }
}

export default function PowerBIDashboardDesignPhilosophyPage() {
  return <BlogContent />
}