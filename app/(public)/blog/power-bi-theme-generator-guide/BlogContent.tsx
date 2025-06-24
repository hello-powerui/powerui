'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Copy, Check, BookOpen, Zap, Download, Palette, Layers, Eye, ChevronRight, ExternalLink, Clock, Calendar } from 'lucide-react'

export default function BlogContent() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2024
            </time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              12 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Power BI Theme Generator: The Complete Guide to Creating Professional Themes
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your Power BI reports from basic to beautiful with Power UI Theme Generator. 
            This comprehensive guide shows you how to create consistent, professional themes that 
            elevate your data visualization game.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Power BI', 'Theme Design', 'Data Visualization', 'Tutorial'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Table of Contents
            </h2>
            <nav className="space-y-2">
              <a href="#why-themes-matter" className="block text-gray-600 hover:text-gray-900 transition-colors">
                1. Why Power BI Themes Matter
              </a>
              <a href="#getting-started" className="block text-gray-600 hover:text-gray-900 transition-colors">
                2. Getting Started with Power UI
              </a>
              <a href="#color-palettes" className="block text-gray-600 hover:text-gray-900 transition-colors">
                3. Creating Custom Color Palettes
              </a>
              <a href="#typography" className="block text-gray-600 hover:text-gray-900 transition-colors">
                4. Typography and Text Styling
              </a>
              <a href="#visual-customization" className="block text-gray-600 hover:text-gray-900 transition-colors">
                5. Advanced Visual Customization
              </a>
              <a href="#best-practices" className="block text-gray-600 hover:text-gray-900 transition-colors">
                6. Best Practices and Tips
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Why Themes Matter */}
          <section id="why-themes-matter" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Power BI Themes Matter</h2>
            
            <p className="text-gray-700 mb-6">
              In the world of data visualization, first impressions count. A well-designed Power BI theme 
              transforms raw data into compelling visual stories that engage stakeholders and drive decisions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-blue-900">Without Themes</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Default, generic appearance</li>
                  <li>• Inconsistent styling across reports</li>
                  <li>• Time wasted on manual formatting</li>
                  <li>• No brand alignment</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-green-900">With Custom Themes</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Professional, polished look</li>
                  <li>• Consistent design system</li>
                  <li>• One-click styling for all visuals</li>
                  <li>• Perfect brand compliance</li>
                </ul>
              </div>
            </div>

            <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-gray-700">
              "A consistent theme can reduce report creation time by up to 60% while significantly 
              improving the professional appearance of your dashboards."
            </blockquote>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Getting Started with Power UI</h2>
            
            <p className="text-gray-700 mb-6">
              Power UI Theme Generator is the fastest way to create professional Power BI themes. 
              Let's walk through creating your first theme in just a few minutes.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Quick Start Steps</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">1</span>
                  <div>
                    <p className="font-medium">Navigate to Theme Studio</p>
                    <p className="text-gray-600 text-sm">Visit powerui.app and click "Create Theme"</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">2</span>
                  <div>
                    <p className="font-medium">Choose Your Starting Point</p>
                    <p className="text-gray-600 text-sm">Start from scratch, use a template, or import from Figma</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">3</span>
                  <div>
                    <p className="font-medium">Customize Your Theme</p>
                    <p className="text-gray-600 text-sm">Adjust colors, typography, and visual styles</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">4</span>
                  <div>
                    <p className="font-medium">Export and Apply</p>
                    <p className="text-gray-600 text-sm">Download your theme.json and apply in Power BI</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="my-8">
              <Image 
                src="/theme-studio-interface.png" 
                alt="Power UI Theme Studio Interface" 
                width={800} 
                height={450}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-500 text-center mt-2">
                The Power UI Theme Studio interface with live preview
              </p>
            </div>
          </section>

          {/* Color Palettes */}
          <section id="color-palettes" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Creating Custom Color Palettes</h2>
            
            <p className="text-gray-700 mb-6">
              Colors are the foundation of any great theme. Power UI provides multiple ways to create 
              harmonious color palettes that work beautifully in your reports.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Method 1: AI-Powered Generation</h3>
            
            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <p className="text-purple-900 mb-4">
                Simply describe your desired color scheme, and our AI will generate a professional palette:
              </p>
              
              <div className="bg-white rounded border border-purple-200 p-4 font-mono text-sm relative">
                <code className="text-purple-800">
                  "Generate a modern palette with navy blue as primary, coral accents, and neutral grays"
                </code>
                <button
                  onClick={() => copyCode("Generate a modern palette with navy blue as primary, coral accents, and neutral grays", "ai-prompt")}
                  className="absolute top-2 right-2 p-2 hover:bg-purple-100 rounded transition-colors"
                >
                  {copiedCode === 'ai-prompt' ? 
                    <Check className="w-4 h-4 text-green-600" /> : 
                    <Copy className="w-4 h-4 text-purple-600" />
                  }
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Method 2: Figma Import</h3>
            
            <p className="text-gray-700 mb-4">
              Already have brand colors in Figma? Import them directly:
            </p>
            
            <ol className="space-y-3 mb-6">
              <li>1. Copy your Figma file URL</li>
              <li>2. Click "Import from Figma" in Power UI</li>
              <li>3. Paste the URL and authenticate</li>
              <li>4. Select color styles to import</li>
            </ol>

            <h3 className="text-2xl font-semibold mb-4">Method 3: Manual Creation</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Data Colors</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Used for chart series, should be visually distinct
                </p>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-blue-600 rounded"></div>
                  <div className="w-12 h-12 bg-green-600 rounded"></div>
                  <div className="w-12 h-12 bg-yellow-500 rounded"></div>
                  <div className="w-12 h-12 bg-red-600 rounded"></div>
                  <div className="w-12 h-12 bg-purple-600 rounded"></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Neutral Palette</h4>
                <p className="text-gray-600 text-sm mb-3">
                  For backgrounds, borders, and text
                </p>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded border"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div className="w-12 h-12 bg-gray-500 rounded"></div>
                  <div className="w-12 h-12 bg-gray-700 rounded"></div>
                  <div className="w-12 h-12 bg-gray-900 rounded"></div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Pro Tip:</strong> Ensure your colors have sufficient contrast for accessibility. 
                Power UI automatically checks WCAG compliance as you design.
              </p>
            </div>
          </section>

          {/* Typography */}
          <section id="typography" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Typography and Text Styling</h2>
            
            <p className="text-gray-700 mb-6">
              Consistent typography creates hierarchy and improves readability across your reports. 
              Power UI lets you define text styles once and apply them everywhere.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Text Class Hierarchy</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h4 className="text-2xl font-bold mb-1">Title Text</h4>
                  <p className="text-gray-600 text-sm">Large, bold text for report and visual titles</p>
                  <code className="text-xs text-gray-500">Size: 16-20px | Weight: 600-700</code>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="text-lg font-semibold mb-1">Header Text</h4>
                  <p className="text-gray-600 text-sm">Section headers and important labels</p>
                  <code className="text-xs text-gray-500">Size: 14-16px | Weight: 500-600</code>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="text-base mb-1">Label Text</h4>
                  <p className="text-gray-600 text-sm">Axis labels, data labels, and general text</p>
                  <code className="text-xs text-gray-500">Size: 10-12px | Weight: 400</code>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="text-sm mb-1">Callout Text</h4>
                  <p className="text-gray-600 text-sm">Small annotations and secondary information</p>
                  <code className="text-xs text-gray-500">Size: 8-10px | Weight: 400</code>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Font Selection Best Practices</h3>
            
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Stick to System Fonts:</strong> Use Segoe UI, Arial, or Helvetica for maximum compatibility
                </div>
              </li>
              <li className="flex gap-3">
                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Limit Font Families:</strong> Use maximum 2 font families (one for headers, one for body)
                </div>
              </li>
              <li className="flex gap-3">
                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Maintain Hierarchy:</strong> Use size and weight to create clear visual hierarchy
                </div>
              </li>
              <li className="flex gap-3">
                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Consider Context:</strong> Smaller fonts for dense dashboards, larger for presentations
                </div>
              </li>
            </ul>
          </section>

          {/* Visual Customization */}
          <section id="visual-customization" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advanced Visual Customization</h2>
            
            <p className="text-gray-700 mb-6">
              Power UI goes beyond basic styling to offer granular control over every visual type 
              in Power BI. Create themes that handle edge cases and special requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Visual Variants
                </h3>
                <p className="text-gray-600 mb-4">
                  Create multiple style variations for different use cases:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Default:</strong> Standard appearance</li>
                  <li>• <strong>Emphasis:</strong> Highlighted visuals</li>
                  <li>• <strong>Subtle:</strong> Background elements</li>
                  <li>• <strong>Custom:</strong> Special purpose styles</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Per-Visual Settings
                </h3>
                <p className="text-gray-600 mb-4">
                  Customize each visual type independently:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Column & Bar Charts</li>
                  <li>• Line & Area Charts</li>
                  <li>• Tables & Matrices</li>
                  <li>• Cards & KPIs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-white font-semibold mb-4">Example: Custom Card Styling</h3>
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`"card": {
  "*": {
    "labels": [{
      "fontSize": 24,
      "fontFamily": "Segoe UI",
      "color": { "solid": { "color": "#1a1a1a" } }
    }],
    "categoryLabels": [{
      "fontSize": 12,
      "color": { "solid": { "color": "#666666" } }
    }],
    "background": [{
      "color": { "solid": { "color": "#f8f9fa" } },
      "transparency": 0
    }],
    "border": [{
      "show": true,
      "color": { "solid": { "color": "#e9ecef" } },
      "radius": 8
    }]
  }
}`}</code>
              </pre>
              <button
                onClick={() => copyCode(`"card": {
  "*": {
    "labels": [{
      "fontSize": 24,
      "fontFamily": "Segoe UI",
      "color": { "solid": { "color": "#1a1a1a" } }
    }],
    "categoryLabels": [{
      "fontSize": 12,
      "color": { "solid": { "color": "#666666" } }
    }],
    "background": [{
      "color": { "solid": { "color": "#f8f9fa" } },
      "transparency": 0
    }],
    "border": [{
      "show": true,
      "color": { "solid": { "color": "#e9ecef" } },
      "radius": 8
    }]
  }
}`, "card-example")}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                {copiedCode === 'card-example' ? 
                  <Check className="w-4 h-4" /> : 
                  <Copy className="w-4 h-4" />
                }
                Copy Code
              </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Interactive States</h3>
            
            <p className="text-gray-700 mb-4">
              Power UI helps you design for all interaction states:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-12 bg-blue-600 rounded flex items-center justify-center text-white text-sm">
                  Default
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="w-24 h-12 bg-blue-700 rounded flex items-center justify-center text-white text-sm shadow-lg">
                  Hover
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="w-24 h-12 bg-blue-800 rounded flex items-center justify-center text-white text-sm ring-2 ring-blue-400">
                  Selected
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Best Practices and Pro Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Do's ✅</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-green-500 mt-0.5">•</span>
                    <div>
                      <strong>Test with real data:</strong> Always preview with actual report data
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 mt-0.5">•</span>
                    <div>
                      <strong>Consider accessibility:</strong> Ensure sufficient color contrast
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 mt-0.5">•</span>
                    <div>
                      <strong>Document your theme:</strong> Include usage guidelines
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-500 mt-0.5">•</span>
                    <div>
                      <strong>Version control:</strong> Keep track of theme iterations
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Don'ts ❌</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <strong>Over-customize:</strong> Avoid styling every single property
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <strong>Use too many colors:</strong> Stick to 5-7 data colors max
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <strong>Ignore performance:</strong> Complex themes can slow reports
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <strong>Forget mobile:</strong> Test on different screen sizes
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Advanced Power User Tips</h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">1. Use Theme Templates</h4>
                  <p className="text-gray-700">
                    Start with Power UI's industry-specific templates and customize from there. 
                    Finance, healthcare, and retail templates include best practices built-in.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">2. Leverage JSON View</h4>
                  <p className="text-gray-700">
                    For bulk operations and precise control, switch to JSON view. Perfect for 
                    copying styles between visuals or making systematic changes.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">3. Create a Theme Library</h4>
                  <p className="text-gray-700">
                    Build a collection of themes for different purposes: executive dashboards, 
                    operational reports, customer-facing analytics, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Reports?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Join thousands of data professionals creating beautiful Power BI themes with Power UI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/themes/studio"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Start Creating
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/docs" className="group border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Documentation →
                </h3>
                <p className="text-gray-600">
                  Comprehensive guides, API references, and tutorials
                </p>
              </Link>
              
              <Link href="/themes" className="group border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Theme Gallery →
                </h3>
                <p className="text-gray-600">
                  Browse pre-built themes and community creations
                </p>
              </Link>
              
              <a href="https://community.powerbi.com" target="_blank" rel="noopener noreferrer" className="group border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  Power BI Community
                  <ExternalLink className="w-4 h-4" />
                </h3>
                <p className="text-gray-600">
                  Connect with other Power BI professionals
                </p>
              </a>
              
              <Link href="/support" className="group border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  Support →
                </h3>
                <p className="text-gray-600">
                  Get help from our team and community
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold">Power UI Team</h3>
              <p className="text-gray-600 mb-2">
                Building tools to make Power BI more powerful and beautiful.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}