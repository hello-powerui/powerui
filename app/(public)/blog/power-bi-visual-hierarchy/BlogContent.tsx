'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Type, Layers, Tag, Calendar, Clock, Info, Code, FileText, BookOpen, ChevronRight, Copy, Check, Sparkles } from 'lucide-react'

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
              11 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Power BI Visual Hierarchy: Typography, Organization & Clear Communication
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Typography might be the most overlooked aspect of Power BI design, yet it's crucial for creating 
            dashboards users can navigate effortlessly. Learn how to establish clear visual hierarchy through 
            fonts, organization, and strategic labeling.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Typography', 'Visual Hierarchy', 'Power BI', 'Dashboard Design', 'Data Organization'].map((tag) => (
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
              What You'll Learn
            </h2>
            <nav className="space-y-2">
              <a href="#typography" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Typography fundamentals for Power BI
              </a>
              <a href="#font-selection" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Choosing and implementing fonts effectively
              </a>
              <a href="#organization" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Visual elements and data organization
              </a>
              <a href="#dynamic-content" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Dynamic visuals and icon usage
              </a>
              <a href="#data-freshness" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Communicating data freshness and context
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Typography Fundamentals */}
          <section id="typography" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Typography Fundamentals</h2>
            
            <p className="text-gray-700 mb-6">
              Typography plays a crucial role in shaping how users perceive and interact with your data. The 
              right font choices and consistent use of font weights improve readability, create visual hierarchy, 
              and enhance the overall user experience.
            </p>

            {/* Font Application */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Type className="w-6 h-6 text-blue-600" />
                Font Application in Power BI
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Theme File Specification</h4>
                  <p className="text-gray-700 text-sm">
                    Custom font and weight for specific components. Only applies to components defined in the theme.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Default Font Selection</h4>
                  <p className="text-gray-700 text-sm">
                    Using Power BI's built-in font list and weights. Available in the font dropdown for all elements.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Custom fonts specified in theme files won't appear in Power BI's font 
                  dropdown for other elements.
                </p>
              </div>
            </div>

            {/* Default Fonts */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Default Font Combinations</h3>
              <p className="text-gray-700 mb-4">
                When you create a new Power BI report, the default theme combines two fonts:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded p-4">
                  <h4 className="font-['Segoe_UI'] text-xl mb-2">Segoe UI</h4>
                  <p className="text-sm text-gray-600">
                    Used for most components including text boxes and labels
                  </p>
                </div>
                <div className="bg-gray-50 rounded p-4">
                  <h4 className="font-mono text-xl mb-2">DIN</h4>
                  <p className="text-sm text-gray-600">
                    Used for KPI cards, axis labels, slicer headers, and axis titles
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-purple-50 rounded">
                <p className="text-purple-800">
                  <strong>Best Practice:</strong> Choose one font family and use it consistently throughout your 
                  report for a more cohesive design.
                </p>
              </div>
            </div>
          </section>

          {/* Font Selection */}
          <section id="font-selection" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Font Selection Criteria</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3">Font Weights</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose fonts with five or more weights for maximum flexibility in creating hierarchy.
                </p>
                <div className="text-xs text-gray-500">
                  Light • Regular • Medium • Semibold • Bold
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3">Sans-serif Preference</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Clean, modern appearance with excellent readability across different screen sizes.
                </p>
                <div className="text-xs text-gray-500">
                  Better for screens • Modern look • Clear at small sizes
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3">Web-safe Options</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Ensure fonts display correctly on all operating systems by choosing web-safe options.
                </p>
                <div className="text-xs text-gray-500">
                  Universal availability • Consistent rendering
                </div>
              </div>
            </div>

            {/* Recommended Fonts */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6">Recommended Font Choices</h3>
              
              <div className="space-y-6">
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="text-xl font-['Segoe_UI'] font-semibold mb-3 flex items-center gap-2">
                    <span className="text-green-600">★</span>
                    Segoe UI (Preferred)
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Hands-down the best choice for most dashboards. Benefits include:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Sans-serif design for modern appearance</li>
                    <li>• Six available weights for hierarchy flexibility</li>
                    <li>• Excellent screen readability</li>
                    <li>• Native Power BI integration</li>
                  </ul>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="text-xl font-['Arial'] font-semibold mb-3">Arial (Web-safe Alternative)</h4>
                  <p className="text-gray-700 mb-3">
                    The clear choice for web-safe dashboards, despite having only three weights:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Universal availability across operating systems</li>
                    <li>• Reliable rendering on all devices</li>
                    <li>• Professional appearance</li>
                  </ul>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3">Custom Fonts (Use Sparingly)</h4>
                  <p className="text-gray-700">
                    Only recommended when IT teams control font installation across all devices. Users must have 
                    the same fonts installed for consistent display.
                  </p>
                </div>
              </div>
            </div>

            {/* Font Sizing */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Font Sizing Systems</h3>
              
              <p className="text-gray-700 mb-4">
                Power BI uses points (pt) like Microsoft Office, but most web designers use pixels (px). 
                Understanding the conversion helps maintain consistency:
              </p>
              
              <div className="bg-gray-50 rounded p-4 mb-4">
                <h4 className="font-medium mb-3">Key Sizing Guidelines:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span><strong>16px (12pt)</strong></span>
                    <span className="text-gray-600">Default minimum for accessibility</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>12px (9pt)</strong></span>
                    <span className="text-gray-600">Smallest size that should be used</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>24px (18pt)</strong></span>
                    <span className="text-gray-600">Appropriate for dashboard titles</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                WCAG recommends at least 16px as a starting point for text to enhance readability and improve 
                user experience.
              </p>
            </div>

            {/* Hierarchy Example */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 text-white">
              <h3 className="text-white font-semibold mb-4">Font Sizing System Implementation</h3>
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`// Example sizing scale for theme file
{
  "H1": { "fontSize": 24, "fontWeight": 600 },  // Dashboard title
  "H2": { "fontSize": 20, "fontWeight": 600 },  // Section headers
  "H3": { "fontSize": 16, "fontWeight": 500 },  // Subsection headers
  "Body": { "fontSize": 14, "fontWeight": 400 }, // Body text
  "Small": { "fontSize": 12, "fontWeight": 400 } // Small text
}`}</code>
              </pre>
              <button
                onClick={() => copyCode(`{
  "H1": { "fontSize": 24, "fontWeight": 600 },
  "H2": { "fontSize": 20, "fontWeight": 600 },
  "H3": { "fontSize": 16, "fontWeight": 500 },
  "Body": { "fontSize": 14, "fontWeight": 400 },
  "Small": { "fontSize": 12, "fontWeight": 400 }
}`, "font-scale")}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                {copiedCode === 'font-scale' ? 
                  <Check className="w-4 h-4" /> : 
                  <Copy className="w-4 h-4" />
                }
                Copy Code
              </button>
            </div>
          </section>

          {/* Visual Organization */}
          <section id="organization" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Visual Elements and Organization</h2>
            
            <p className="text-gray-700 mb-6">
              Clear organization extends beyond typography to include how you structure and label all visual 
              elements. Clarity isn't just about design—it's about how you label and organize your data.
            </p>

            {/* Data Naming */}
            <div className="bg-red-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6 text-red-600" />
                Data Organization and Naming
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Avoid Technical Names</h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-3">
                      <div className="text-red-600 text-sm font-mono">❌ Bad:</div>
                      <p className="text-sm">"Sum of ttl_sale_rev by dim_date_id"</p>
                    </div>
                    <div className="bg-green-50 rounded p-3">
                      <div className="text-green-600 text-sm font-mono">✓ Good:</div>
                      <p className="text-sm">"Total Sales Revenue by Date"</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Use Familiar Terminology</h4>
                  <p className="text-gray-700 text-sm">
                    If a metric is commonly called "headcount," don't label it "staffing." Stick to terms your 
                    users know. This ensures clarity and consistency across reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Measures and Documentation */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600" />
                Measures and Documentation
              </h3>
              
              <p className="text-gray-700 mb-4">
                Always comment and properly format your measures. Comments help you remember logic and intent. 
                They make code accessible to other developers who might work on the report later.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded p-4">
                  <h4 className="font-medium mb-2">Formatting Tools:</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Bravo (SQLBI)</strong> - Format all measures at once</li>
                    <li><strong>DAX Formatter</strong> - Web-based for individual measures</li>
                    <li><strong>Tabular Editor</strong> - Bulk measure management</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded p-4">
                  <h4 className="font-medium mb-2">Formatting Benefits:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Commas for large numbers</li>
                    <li>• Currency symbols where appropriate</li>
                    <li>• Percentage formatting</li>
                    <li>• Consistent decimal places</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Titles and Labels */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Titles and Labels Best Practices</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold mb-2">Dashboard Titles</h4>
                  <p className="text-gray-700 text-sm">
                    Should be subtle yet descriptive. Clearly indicate the report's focus without overwhelming. 
                    Aim for around 24px (18pt) - it doesn't need to be huge.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold mb-2">Visual Titles</h4>
                  <p className="text-gray-700 text-sm">
                    Should clearly convey what each visual represents. If you've used human-friendly names in 
                    your model, default titles will automatically be meaningful.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold mb-2">Axis Titles and Labels</h4>
                  <p className="text-gray-700 text-sm">
                    Should derive from well-named fields. Most users aren't database administrators familiar 
                    with technical field names.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Content */}
          <section id="dynamic-content" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Dynamic Visuals and Icons</h2>
            
            {/* SVG Content */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                SVG and Dynamic Content
              </h3>
              
              <p className="text-gray-700 mb-4">
                SVG images give Power BI users incredible flexibility for creating dynamic visuals that update 
                with data. Using DAX measures and variables, you can create nearly any visual from progress bars 
                to star ratings.
              </p>
              
              <div className="bg-yellow-50 rounded p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Pro Tip:</strong> If you're unfamiliar with XML code for SVG visuals, tools like 
                  Power UI GPT can help. These tools take plain English descriptions and generate SVG code 
                  embedded in DAX measures ready for Power BI.
                </p>
              </div>
            </div>

            {/* Icon Usage */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Icon Usage Best Practices</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Common Icon Problems:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Inconsistent styles from various sources</li>
                    <li>• Oversized icons that overpower content</li>
                    <li>• Icons that don't align with overall design</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Icon Consistency Guidelines:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Stick to cohesive style, size, and color scheme</li>
                    <li>• Ensure icons complement data visualizations</li>
                    <li>• Use scalable, high-quality icons</li>
                    <li>• Maintain consistent sizing and positioning</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white rounded">
                <p className="text-blue-800 text-sm">
                  <strong>Technical Note:</strong> SVG images scale infinitely without quality loss. However, 
                  Power BI doesn't support importing SVGs directly to the canvas. Use PNGs or default Power BI 
                  shapes for static canvas icons.
                </p>
              </div>
            </div>
          </section>

          {/* Grouping and Context */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Grouping and Labeling</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  Visual Grouping Strategies
                </h3>
                <p className="text-gray-700 mb-4">
                  Group related visuals in the Selection Pane. This practice:
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Keeps reports organized for developers</li>
                  <li>• Clarifies purpose for users</li>
                  <li>• Simplifies managing states with bookmarks</li>
                  <li>• Makes applying consistent adjustments easier</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Context and Modals
                </h3>
                <p className="text-gray-700 mb-4">
                  When reports require extensive context, consider using modals. Good uses include:
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Complex business logic explanations</li>
                  <li>• Data refresh schedules and processes</li>
                  <li>• Data source documentation</li>
                  <li>• Detailed methodology explanations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Freshness */}
          <section id="data-freshness" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Data Freshness and Transparency</h2>
            
            <div className="bg-orange-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-600" />
                Communicating Data Currency
              </h3>
              
              <p className="text-gray-700 mb-4">
                If your report doesn't provide real-time data, make refresh dates clear and visible. Users need 
                to know:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded p-4 text-center">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Last Updated</h4>
                  <p className="text-sm text-gray-600">When data was refreshed</p>
                </div>
                <div className="bg-white rounded p-4 text-center">
                  <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Data Source</h4>
                  <p className="text-sm text-gray-600">Where data comes from</p>
                </div>
                <div className="bg-white rounded p-4 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Data Currency</h4>
                  <p className="text-sm text-gray-600">How current the info is</p>
                </div>
              </div>
            </div>

            {/* Dataset vs Data Refresh */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Dataset vs. Data Refresh Timing</h3>
              
              <p className="text-gray-700 mb-4">
                Differentiate between Power BI dataset refresh time and actual data refresh date. Power BI shows 
                when the dataset was last refreshed, but this doesn't always reflect true data freshness.
              </p>
              
              <div className="bg-yellow-50 rounded p-4">
                <h4 className="font-medium mb-2">Example Scenario:</h4>
                <p className="text-yellow-800 text-sm">
                  A file processes through a data flow daily, but the latest file hasn't been received. The 
                  dataset might still refresh on schedule, misleading users into thinking data is current.
                </p>
                <p className="text-yellow-800 text-sm mt-2">
                  <strong>Solution:</strong> Include visuals that clearly display latest data availability based 
                  on real-world updates.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Use typography systematically to create clear information hierarchy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Choose appropriate fonts and sizing for your audience and context</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Organize and label data with human-readable, familiar terminology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Group related visuals logically for better navigation and maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Communicate data freshness and context clearly to build user trust</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Consider modals for complex information that would clutter the main view</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Better Visual Hierarchy?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Apply these typography and organization principles to transform your dashboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/themes/studio"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Try Power UI Studio
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog/power-bi-color-design"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue to Color Design
                </Link>
              </div>
            </div>
          </section>

          {/* Next in Series */}
          <section>
            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Next in the series</h3>
                  <p className="text-gray-600 text-sm">Power BI Color Design: Strategic Use of Color and Visual Polish</p>
                </div>
                <Link
                  href="/blog/power-bi-color-design"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Reading
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                Helping data professionals create beautiful, effective Power BI dashboards through better design.
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