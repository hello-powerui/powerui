import { getBlogBySlug, getBlogSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// MDX component mappings for custom rendering
const components = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null
    return (
      <div className="my-8">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />
      </div>
    )
  },
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
      {children}
    </pre>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  ),
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown
  
  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3 className="text-xl font-semibold mt-8 mb-4">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 className="text-2xl font-semibold mt-8 mb-4">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 className="text-3xl font-bold mt-8 mb-4">$1</h1>')
  
  // Convert bold and italic
  html = html.replace(/\*\*\*(.*)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*)\*/g, '<em>$1</em>')
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
  
  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" className="my-8 rounded-lg w-full" />')
  
  // Convert code blocks
  html = html.replace(/```json\n([\s\S]*?)```/g, '<pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code>$1</code></pre>')
  html = html.replace(/```([\s\S]*?)```/g, '<pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code>$1</code></pre>')
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code className="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
  
  // Convert paragraphs
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.trim() && !paragraph.startsWith('<')) {
      return `<p className="mb-4">${paragraph}</p>`
    }
    return paragraph
  }).join('\n\n')
  
  return html
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  const htmlContent = convertMarkdownToHtml(post.content)
  
  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-12">
        <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
          ← Back to blog
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
          {post.author && (
            <>
              <span>•</span>
              <span>
                {typeof post.author === 'string' 
                  ? post.author 
                  : post.author.name}
              </span>
            </>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div 
        className="prose prose-lg max-w-none
          prose-headings:font-bold
          prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:mb-4 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:my-8
          prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
          prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-strong:font-semibold
          prose-em:italic"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}