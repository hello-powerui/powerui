// Static blog post data for TSX blog pages
export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author?: string | { name: string; picture?: string }
  excerpt?: string
  tags?: string[]
  readingTime: string
  isTsx?: boolean // Flag to indicate TSX pages vs markdown
}

// Add your TSX blog posts here
export const tsxBlogPosts: BlogPostMeta[] = [
  {
    slug: 'power-bi-theme-generators',
    title: 'The Complete Guide to Power BI Theme Generators',
    date: '2025-01-02',
    author: 'Power UI Team',
    excerpt: 'An in-depth comparison of the top Power BI theme generators, their features, limitations, and how they can transform your report design workflow.',
    tags: ['Power BI', 'Theme Generators', 'Comparison', 'Design Tools'],
    readingTime: '15 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-design-journey',
    title: 'Your Power BI Design Journey: Resources & Continuous Learning',
    date: '2024-12-24',
    author: 'Power UI Team',
    excerpt: 'Continue developing your Power BI dashboard design skills. Discover essential resources, learning paths, and community contributions.',
    tags: ['Resources', 'Learning Path', 'Power BI', 'Community'],
    readingTime: '18 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-testing-deployment',
    title: 'Power BI Testing, Deployment & Maintenance Best Practices',
    date: '2024-12-23',
    author: 'Power UI Team',
    excerpt: 'Learn how to test Power BI dashboards with real users, optimize performance, deploy successfully, and maintain dashboards over time.',
    tags: ['Testing', 'Deployment', 'Performance', 'Power BI'],
    readingTime: '16 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-advanced-interactions',
    title: 'Power BI Advanced Interactions and Design Systems',
    date: '2024-12-22',
    author: 'Power UI Team',
    excerpt: 'Learn when and how to implement advanced interactions, create scalable design systems, and leverage theme files for consistent dashboards.',
    tags: ['Advanced Interactions', 'Design Systems', 'Power BI', 'Bookmarks'],
    readingTime: '15 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-clarity-efficiency',
    title: 'Power BI Dashboard Clarity: Creating Efficient Data Experiences',
    date: '2024-12-21',
    author: 'Power UI Team',
    excerpt: 'Master the principles of dashboard clarity and efficiency. Learn about data-to-ink ratio, precision, filtering, and user guidance.',
    tags: ['Dashboard Clarity', 'Efficiency', 'Power BI', 'UX Design'],
    readingTime: '13 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-color-design',
    title: 'Power BI Color Theory: Creating Polished Dashboards',
    date: '2024-12-20',
    author: 'Power UI Team',
    excerpt: 'Master color usage in Power BI dashboards. Learn why gray is your foundation color and how to create professional, accessible designs.',
    tags: ['Color Theory', 'Design Polish', 'Power BI', 'Accessibility'],
    readingTime: '14 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-visual-hierarchy',
    title: 'Mastering Visual Hierarchy in Power BI Dashboards',
    date: '2024-12-19',
    author: 'Power UI Team',
    excerpt: 'Learn how to guide user attention through effective visual hierarchy. Master typography, contrast, and data organization in Power BI.',
    tags: ['Visual Hierarchy', 'Typography', 'Power BI', 'Dashboard Design'],
    readingTime: '15 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-dashboard-planning',
    title: 'Power BI Dashboard Planning: Building a Strong Foundation',
    date: '2024-12-18',
    author: 'Power UI Team',
    excerpt: 'Master the fundamentals of dashboard planning in Power BI. Learn about wireframing, canvas sizing, grid systems, and creating modular designs.',
    tags: ['Dashboard Planning', 'Wireframing', 'Power BI', 'Design Systems'],
    readingTime: '13 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-dashboard-user-research',
    title: 'Understanding Your Power BI Dashboard Audience',
    date: '2024-12-17',
    author: 'Power UI Team',
    excerpt: 'Learn how to identify and understand your dashboard users. Master requirement gathering, user personas, and prioritization frameworks.',
    tags: ['User Research', 'Dashboard Design', 'Power BI', 'Requirements'],
    readingTime: '14 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-dashboard-design-philosophy',
    title: 'Power BI Dashboard Design Philosophy: Why Great Design Matters',
    date: '2024-12-16',
    author: 'Power UI Team',
    excerpt: 'Learn the fundamental principles of effective Power BI dashboard design. Understand why thoughtful design directly impacts business outcomes.',
    tags: ['Design Philosophy', 'Dashboard Design', 'Power BI', 'Best Practices'],
    readingTime: '12 min read',
    isTsx: true
  },
  {
    slug: 'power-bi-theme-generator-guide',
    title: 'Power BI Theme Generator: The Complete Guide',
    date: '2024-12-15',
    author: 'Power UI Team',
    excerpt: 'Master Power BI theme generation with our comprehensive guide. Learn best practices, advanced techniques, and common pitfalls to avoid.',
    tags: ['Theme Generator', 'Power BI', 'Tutorial', 'Best Practices'],
    readingTime: '15 min read',
    isTsx: true
  }
]