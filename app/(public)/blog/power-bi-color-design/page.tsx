import { Metadata } from 'next'
import BlogContent from './BlogContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Power BI Color Design: Strategic Color Use & Visual Polish | Power UI',
    description: 'Master color theory for Power BI dashboards. Learn strategic color use, the power of gray palettes, shadow implementation, and professional visual polish techniques.',
    keywords: 'Power BI color theory, dashboard color palette, Power BI gray colors, visual design, shadow effects, theme colors',
    openGraph: {
      title: 'Power BI Color Design: Strategic Use of Color and Visual Polish',
      description: 'Transform your Power BI dashboards with professional color strategies and visual polish techniques.',
      type: 'article',
      publishedTime: '2024-12-19T00:00:00.000Z',
      authors: ['Power UI Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Power BI Color Design & Visual Polish',
      description: 'Learn how to use color strategically in your Power BI dashboards for maximum impact.',
    }
  }
}

export default function PowerBIColorDesignPage() {
  return <BlogContent />
}