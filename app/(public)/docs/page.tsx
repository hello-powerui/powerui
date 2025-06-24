'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  BookOpen, 
  Zap, 
  Palette, 
  Code, 
  FileJson, 
  Layers, 
  HelpCircle,
  ChevronRight,
  Search,
  Menu,
  X,
  ExternalLink
} from 'lucide-react'

const docsSections = [
  {
    title: 'Getting Started',
    icon: Zap,
    items: [
      { title: 'Introduction', href: '/docs/introduction', description: 'Learn what Power UI is and how it can help you' },
      { title: 'Quick Start', href: '/docs/quickstart', description: 'Get up and running in 5 minutes' },
      { title: 'Interface Overview', href: '/docs/interface-overview', description: 'Understanding the Theme Studio workspace' },
    ]
  },
  {
    title: 'Theme Foundation',
    icon: Palette,
    items: [
      { title: 'Color Palettes', href: '/docs/color-palettes', description: 'Create and manage data color palettes' },
      { title: 'Neutral Palettes', href: '/docs/neutral-palettes', description: 'AI-powered grayscale generation' },
      { title: 'Typography', href: '/docs/typography', description: 'Font families and text styling' },
      { title: 'Light/Dark Mode', href: '/docs/light-dark-mode', description: 'Theme mode switching and customization' },
    ]
  },
  {
    title: 'Visual Customization',
    icon: Layers,
    items: [
      { title: 'Visual Styles & Variants', href: '/docs/visual-variants', description: 'Create multiple style variations per visual' },
      { title: 'Real-Time Preview', href: '/docs/real-time-preview', description: 'Test themes with live Power BI reports' },
      { title: 'Import & Export', href: '/docs/import-export', description: 'Theme file management and enhancement' },
    ]
  },
  {
    title: 'Collaboration',
    icon: Code,
    items: [
      { title: 'Sharing Themes', href: '/docs/sharing', description: 'Public, private, and organization sharing' },
      { title: 'JSON Editing', href: '/docs/json-editing', description: 'Direct JSON manipulation for developers' },
      { title: 'Team Workflows', href: '/docs/team-workflows', description: 'Best practices for team collaboration' },
    ]
  },
  {
    title: 'Resources',
    icon: BookOpen,
    items: [
      { title: 'Keyboard Shortcuts', href: '/docs/keyboard-shortcuts', description: 'Speed up your workflow' },
      { title: 'Best Practices', href: '/docs/best-practices', description: 'Design guidelines and pro tips' },
      { title: 'Troubleshooting', href: '/docs/troubleshooting', description: 'Common issues and solutions' },
    ]
  }
]

const popularGuides = [
  {
    title: 'Create your first theme',
    description: 'Learn the basics of theme creation with our step-by-step guide',
    href: '/docs/quickstart',
    icon: Zap,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Visual Style Variants',
    description: 'Create multiple style variations for each visual type - exclusive to Power UI',
    href: '/docs/visual-variants',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Import from Coolors',
    description: 'Import beautiful color palettes directly from Coolors.co',
    href: '/docs/color-palettes',
    icon: Palette,
    color: 'from-green-500 to-emerald-500'
  }
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredSections = docsSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know about using Power UI to create beautiful Power BI themes.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Popular Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <guide.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {guide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation - Desktop */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 space-y-8">
                {docsSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-4 rounded-full shadow-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Sidebar */}
            {mobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-white">
                <div className="h-full overflow-y-auto pt-20 pb-20 px-6">
                  <nav className="space-y-8">
                    {docsSections.map((section, index) => (
                      <div key={index}>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                          <section.icon className="w-4 h-4" />
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.href}
                                className="text-sm text-gray-600"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            {/* Main Content */}
            <main className="lg:col-span-3">
              {searchQuery && filteredSections.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No results found for "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-900 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {(searchQuery ? filteredSections : docsSections).map((section, index) => (
                    <div key={index}>
                      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                        <section.icon className="w-5 h-5" />
                        {section.title}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                          >
                            <h3 className="font-semibold mb-2 group-hover:text-gray-700 transition-colors flex items-center gap-2">
                              {item.title}
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Help Section */}
              <div className="mt-16 bg-gray-50 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <HelpCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Need help?</h3>
                    <p className="text-gray-600 mb-4">
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-gray-900 font-medium hover:underline"
                      >
                        Contact Support
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-900 font-medium hover:underline"
                      >
                        Visit Blog
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}