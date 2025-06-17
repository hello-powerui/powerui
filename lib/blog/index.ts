import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const blogsDirectory = path.join(process.cwd(), 'blogs')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author?: string | { name: string; picture?: string }
  excerpt?: string
  tags?: string[]
  content: string
  readingTime: string
}

export function getBlogSlugs() {
  const files = fs.readdirSync(blogsDirectory)
  return files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx?$/, ''))
}

export function getBlogBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(blogsDirectory, `${realSlug}.md`)
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
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs()
  const posts = slugs
    .map(slug => getBlogBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  
  return posts
}