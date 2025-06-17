import { getAllBlogs } from '@/lib/blog'
import Link from 'next/link'

export default function BlogPage() {
  const posts = getAllBlogs()
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-muted-foreground mb-12">
        Insights and best practices for Power BI theme design
      </p>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8 last:border-0">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              )}
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
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}