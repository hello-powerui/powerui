'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Bookmark, Layers, Settings, Code, Package, Zap, AlertCircle, ChevronRight, Clock, Calendar, BookOpen, Copy, Check, FileJson } from 'lucide-react'

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
              15 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Power BI Advanced Interactions and Design Systems
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Power BI enables creation of sophisticated, web-like experiences through bookmarks and design systems. 
            Learn when and how to implement advanced interactions, create scalable design systems, and leverage 
            theme files for consistent, professional dashboards.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Advanced Interactions', 'Design Systems', 'Power BI', 'Bookmarks', 'Theme Files'].map((tag) => (
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
              <a href="#bookmark-interactions" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Advanced bookmark interactions and limitations
              </a>
              <a href="#when-to-use" className="block text-gray-600 hover:text-gray-900 transition-colors">
                When to use advanced features vs. native functionality
              </a>
              <a href="#design-systems" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Design system fundamentals for Power BI
              </a>
              <a href="#theme-files" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Theme file creation and implementation
              </a>
              <a href="#power-ui-system" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Leveraging the Power UI design system
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Advanced Bookmark Interactions */}
          <section id="bookmark-interactions" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advanced Bookmark Interactions</h2>
            
            <p className="text-gray-700 mb-6">
              Power BI enables creation of sophisticated, web-like experiences that feel modern and interactive. 
              However, these features require careful consideration of implementation complexity and maintenance overhead.
            </p>

            {/* Bookmark Limitations */}
            <div className="bg-red-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Understanding Bookmark Limitations
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-red-900">Page-specific functionality</h4>
                  <p className="text-gray-700 text-sm">
                    Bookmarks only work on a single page. You can't reuse bookmark states across different pages 
                    or reports.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-red-900">Maintenance complexity</h4>
                  <p className="text-gray-700 text-sm">
                    Creating similar interactions on another page requires new buttons and new bookmark states. 
                    This makes scaling these experiences time-consuming.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-red-900">Development overhead</h4>
                  <p className="text-gray-700 text-sm">
                    The number of steps involved grows exponentially with the number of interactive elements.
                  </p>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">When to Use Advanced Interactions</h3>
              
              <p className="text-gray-700 mb-4">
                Use bookmark-based interactions sparingly. Save this technique for scenarios where:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded p-4">
                  <h4 className="font-medium mb-2 text-green-900">Good Use Cases:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Highly customized user experience needed</li>
                    <li>• Standard slicers won't suffice</li>
                    <li>• Added complexity justified by user value</li>
                    <li>• Resources available for maintenance</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded p-4">
                  <h4 className="font-medium mb-2 text-blue-900">Better Alternatives:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Native Filter Pane for most filtering</li>
                    <li>• Standard slicers for common filters</li>
                    <li>• Drill-through for detailed views</li>
                    <li>• Built-in visual interactions</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Best Practice:</strong> Leveraging native Filter Pane and slicers is more efficient 
                  and easier to maintain. This approach keeps dashboards user-friendly and reduces time spent 
                  on upkeep.
                </p>
              </div>
            </div>
          </section>

          {/* Creating Modal Interactions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Creating Modal Interactions</h2>
            
            <p className="text-gray-700 mb-6">
              This general pattern can be used to create dropdowns and state-driven experiences in reports. 
              Here's how to build a pop-up modal that shows data refresh details:
            </p>

            {/* Step-by-Step Guide */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6">Step-by-Step Modal Creation</h3>
              
              <div className="space-y-6">
                <div className="bg-white/80 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Build the modal</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Create modal content using shapes, text boxes, and visuals</li>
                        <li>• Position it where you want it to appear when active</li>
                        <li>• Style appropriately with backgrounds, borders, and spacing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Create visible state bookmark</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• With modal visible, select View {`>`} Bookmarks {`>`} Add</li>
                        <li>• Rename bookmark to "Modal - Data Refresh Visible"</li>
                        <li>• In bookmark options, deselect "Data" to save only visual layout</li>
                        <li>• This ensures users can still interact with data while modal is open</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Create hidden state bookmark</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Hide the modal using the Selection Pane</li>
                        <li>• Create another bookmark "Modal - Data Refresh Hidden"</li>
                        <li>• Again, deselect "Data" option</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Add action buttons</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Add a button to open the modal</li>
                        <li>• Set its action to navigate to the "visible" bookmark</li>
                        <li>• On the modal, add a close button</li>
                        <li>• Set close button action to navigate to "hidden" bookmark</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Test and refine</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Test the interaction flow thoroughly</li>
                        <li>• Ensure smooth transitions between states</li>
                        <li>• Verify that data interactions still work properly</li>
                        <li>• Check performance with realistic data loads</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookmark Management */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-600" />
                Managing Multiple Bookmark States
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Organization Tips:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Use consistent naming: "Feature - State" (e.g., "Filter Panel - Open")</li>
                    <li>• Group related bookmarks in the Selection Pane</li>
                    <li>• Document what each bookmark controls</li>
                    <li>• Test all interactions after making changes</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Alternative:</strong> Consider using the bookmark navigation visual, which allows users 
                    to toggle between multiple bookmark states using only one visual element.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Design Systems */}
          <section id="design-systems" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Design Systems Fundamentals</h2>
            
            <p className="text-gray-700 mb-6">
              A design system is a comprehensive collection of standards, guidelines, and reusable components. 
              It ensures consistency, efficiency, and scalability in design projects.
            </p>

            {/* Design System Components */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold">UI Components</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Buttons, slicers, icons, and other interface elements with consistent styling
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold">Design Principles</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Guidelines for color schemes, typography, spacing, and visual hierarchy
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <FileJson className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold">Design Tokens</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Stored values such as colors, fonts, and measurements that make updates simple
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                  <h3 className="font-semibold">Documentation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Clear instructions and examples for implementation and maintenance
                </p>
              </div>
            </div>

            {/* Power BI Design Systems */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Power BI Design Systems</h3>
              
              <p className="text-gray-700 mb-4">
                In Power BI, a design system typically revolves around a theme file. This file, in JSON format, 
                defines consistent colors, fonts, and other visual elements for reports.
              </p>
              
              <div className="bg-white/80 rounded p-4">
                <h4 className="font-medium mb-3">Benefits of Theme-Based Design Systems:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Easy customization of data colors, typography, and visual properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Consistent padding, borders, and spacing across all visuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Cohesion and professionalism across reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Alignment with broader organizational design principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Simplified maintenance and updates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Design Tokens */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Design Tokens and Variables</h3>
              
              <p className="text-gray-700 mb-4">
                Color variables play a vital role in modern design systems. They ensure consistency and 
                flexibility across all user interfaces.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 rounded p-4">
                  <h4 className="font-medium mb-2">Primitives</h4>
                  <p className="text-sm text-gray-600">
                    Raw color values like hex codes (#FF0000)
                  </p>
                </div>
                <div className="bg-blue-50 rounded p-4">
                  <h4 className="font-medium mb-2">Semantic Variables</h4>
                  <p className="text-sm text-gray-600">
                    Purpose-based names like "error-color" or "primary-background"
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Power BI Limitation:</strong> JSON theme files don't natively support variables. This 
                  makes theme management more cumbersome, as color values need to be manually updated throughout 
                  the file.
                </p>
              </div>
            </div>
          </section>

          {/* Theme Files */}
          <section id="theme-files" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Theme File Creation and Implementation</h2>
            
            {/* Understanding Theme Files */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Understanding Theme Files</h3>
              
              <p className="text-gray-700 mb-4">
                Theme files are JSON documents that define the default appearance of visuals, colors, and text 
                styles in Power BI reports. They allow you to standardize the look and feel by specifying 
                consistent styling choices.
              </p>
              
              <div className="bg-white rounded p-4">
                <h4 className="font-medium mb-3">What Theme Files Control:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-1">
                    <li>• Color palettes for data and UI elements</li>
                    <li>• Font families, sizes, and weights</li>
                    <li>• Visual padding and spacing</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• Background colors and borders</li>
                    <li>• Default visual properties</li>
                    <li>• Chart-specific styling</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Theme File Example */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 text-white">
              <h3 className="text-white font-semibold mb-4">Basic Theme File Structure</h3>
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`{
  "name": "Corporate Theme",
  "dataColors": [
    "#1E88E5", "#43A047", "#FFA726", "#E53935",
    "#8E24AA", "#00ACC1", "#FFB300", "#546E7A"
  ],
  "background": "#FFFFFF",
  "foreground": "#000000",
  "tableAccent": "#1E88E5",
  "textClasses": {
    "title": {
      "fontSize": 16,
      "fontFace": "Segoe UI",
      "color": "#000000"
    },
    "label": {
      "fontSize": 12,
      "fontFace": "Segoe UI",
      "color": "#666666"
    }
  }
}`}</code>
              </pre>
              <button
                onClick={() => copyCode(`{
  "name": "Corporate Theme",
  "dataColors": [
    "#1E88E5", "#43A047", "#FFA726", "#E53935",
    "#8E24AA", "#00ACC1", "#FFB300", "#546E7A"
  ],
  "background": "#FFFFFF",
  "foreground": "#000000",
  "tableAccent": "#1E88E5",
  "textClasses": {
    "title": {
      "fontSize": 16,
      "fontFace": "Segoe UI",
      "color": "#000000"
    },
    "label": {
      "fontSize": 12,
      "fontFace": "Segoe UI",
      "color": "#666666"
    }
  }
}`, "theme-basic")}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                {copiedCode === 'theme-basic' ? 
                  <Check className="w-4 h-4" /> : 
                  <Copy className="w-4 h-4" />
                }
                Copy Code
              </button>
            </div>

            {/* Benefits of Theme Files */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Theme File Benefits</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Consistency:</strong> Every report aligns with standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Efficiency:</strong> Streamlines report-building process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Scalability:</strong> Easy to apply across teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Maintenance:</strong> Updates apply uniformly</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Implementation Best Practices</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Version control:</strong> Maintain versions and document changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Team training:</strong> Ensure understanding of theme usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Fallback planning:</strong> Have backup when themes fail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Performance testing:</strong> Ensure no negative impact</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Power UI Design System */}
          <section id="power-ui-system" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Power UI Design System</h2>
            
            <p className="text-gray-700 mb-6">
              If you're ready to implement professional design practices in your Power BI reports, the Power UI 
              design system provides a comprehensive solution. Power UI is the companion design system to this 
              handbook, designed to help you apply all the tips and practices from this book.
            </p>

            {/* What Power UI Provides */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6">What Power UI Provides</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileJson className="w-5 h-5 text-purple-600" />
                    Customizable JSON Theme File
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Meticulously crafted theme that makes reports look modern and professional with all best 
                    practices built in.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Online Customization Portal
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Customize everything from gray palettes to border rounding and fonts without starting from 
                    scratch.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-green-600" />
                    Multiple Report Styles
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Tailored options for different tastes and use cases, including light and dark themes.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    Component Library
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Hundreds of pixel-perfect design elements and pre-built design system applied to core visuals.
                  </p>
                </div>
              </div>
            </div>

            {/* Power UI Advantages */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Power UI Advantages</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Built on Proven Principles</p>
                    <p className="text-gray-600 text-sm">Based on key design principles and best practices covered in this handbook</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Scalable and Maintainable</p>
                    <p className="text-gray-600 text-sm">Modern design system that grows with your needs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Complete Solution</p>
                    <p className="text-gray-600 text-sm">PBIX files with UI components and over 1,500 clean, consistent icons</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Multiple Styling Variations</p>
                    <p className="text-gray-600 text-sm">Since you can only specify one default styling per visual in a theme file</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-black text-white rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Getting Started with Power UI</h3>
              <p className="text-gray-300 mb-6">
                The Power UI system eliminates the need to build theme files from scratch. Instead of spending 
                time on technical implementation, you can focus on content and insights while maintaining 
                professional design standards.
              </p>
              <Link
                href="/themes/studio"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Power UI Studio
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Advanced Considerations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advanced Design Considerations</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Responsive Design Principles</h3>
                <p className="text-gray-700 text-sm mb-3">
                  While Power BI doesn't support truly responsive design, you can apply responsive principles:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Mobile-first thinking</li>
                  <li>• Progressive disclosure</li>
                  <li>• Touch-friendly sizing</li>
                  <li>• Readable text sizes</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Accessibility in Advanced Designs</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Ensure your advanced features remain accessible:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Keyboard navigation</li>
                  <li>• Screen reader compatibility</li>
                  <li>• Color contrast maintenance</li>
                  <li>• Motion sensitivity options</li>
                </ul>
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
                  <span>Use advanced bookmark interactions sparingly and only when they add significant value</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Implement design systems through theme files for consistency and efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Plan for maintenance and scalability when creating complex interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Consider using established design systems like Power UI to accelerate development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Always test advanced features thoroughly with real users and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Balance sophistication with usability and performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Document your design decisions and interaction patterns for team consistency</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Advanced Dashboards?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Create sophisticated interactions and scalable design systems with Power UI.
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
                  href="/blog/power-bi-testing-deployment"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue to Testing & Deployment
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
                  <p className="text-gray-600 text-sm">Power BI Testing, Iteration, and Deployment Best Practices</p>
                </div>
                <Link
                  href="/blog/power-bi-testing-deployment"
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