import { getBlogBySlug, getBlogSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'

// Configure marked options for better rendering
marked.setOptions({
  breaks: true, // Enable line breaks
  gfm: true, // Enable GitHub Flavored Markdown
})

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


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  // Use marked to convert markdown to HTML
  const htmlContent = marked(post.content)
  
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
        className="prose prose-lg max-w-none dark:prose-invert
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:mb-6 prose-p:leading-relaxed prose-p:text-muted-foreground
          prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:my-8 prose-img:shadow-md
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-strong:font-semibold prose-strong:text-foreground
          prose-em:italic
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:mb-2"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}