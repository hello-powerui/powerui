import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Your Power BI Design Journey: Resources & Continuous Learning | Power UI',
    description: 'Continue developing your Power BI dashboard design skills. Discover essential resources, learning paths, community contributions, and next steps for mastering professional dashboard design.',
    keywords: 'Power BI resources, dashboard design learning, Power BI community, design portfolio, continuous learning, Power BI certification',
    openGraph: {
      title: 'Your Power BI Design Journey: Resources and Continuous Learning',
      description: 'Your comprehensive guide to continuing your Power BI dashboard design education and contributing to the community.',
      type: 'article',
      publishedTime: '2024-12-23T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Your Power BI Design Journey',
      description: 'Continue developing your dashboard design skills with resources and community engagement.',
    }
  }
}

export default function PowerBIDesignJourneyPage() {
  return <BlogContent />
}