import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { tsxBlogPosts } from './blog-data'

const blogsDirectory = path.join(process.cwd(), 'blogs')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author?: string | { name: string; picture?: string }
  excerpt?: string
  tags?: string[]
  content?: string
  readingTime: string
  isTsx?: boolean
}

export function getBlogSlugs() {
  try {
    const files = fs.readdirSync(blogsDirectory)
    return files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx?$/, ''))
  } catch (error) {
    console.error('Error reading blogs directory:', error)
    return []
  }
}

export function getBlogBySlug(slug: string): BlogPost | null {
  // First check if it's a TSX blog post
  const tsxPost = tsxBlogPosts.find(post => post.slug === slug)
  if (tsxPost) {
    return tsxPost
  }

  // Otherwise, look for markdown file
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(blogsDirectory, `${realSlug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)
    
    return {
      slug: realSlug,
      title: data.title || realSlug,
      date: data.date || new Date().toISOString(),
      author: data.author,
      excerpt: data.excerpt,
      tags: data.tags,
      content,
      readingTime: stats.text
    }
  } catch (error) {
    return null
  }
}

export function getAllBlogs(): BlogPost[] {
  // Only return TSX blog posts
  return tsxBlogPosts
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}