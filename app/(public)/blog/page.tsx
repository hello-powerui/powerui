import { getAllBlogs } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter-form'

export default function BlogPage() {
  const posts = getAllBlogs()

  // Get featured post (most recent)
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Learn about Power BI design, data visualization best practices, and updates from the Power UI team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 mb-4">
                    <BookOpen className="w-4 h-4" />
                    Featured Post
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-700 transition-colors">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readingTime}
                    </span>
                    {featuredPost.author && (
                      <span>
                        By {typeof featuredPost.author === 'string' 
                          ? featuredPost.author 
                          : featuredPost.author.name}
                      </span>
                    )}
                  </div>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex gap-2 mt-6">
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1.5 rounded-full">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post, index) => (
              <article 
                key={post.slug} 
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block p-6 h-full">
                  <div className="flex flex-col h-full">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Footer */}
                    <div className="mt-auto">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {post.author && (
                          <span className="text-sm text-gray-500">
                            {typeof post.author === 'string' 
                              ? post.author 
                              : post.author.name}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay up to date</h3>
          <p className="text-gray-600 mb-8">
            Get notified when we publish new articles about Power BI design and data visualization.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}