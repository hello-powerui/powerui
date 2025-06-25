'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Grid, Maximize, Layers, Ruler, Layout, Square, Move, Copy, Check, ChevronRight, Clock, Calendar, BookOpen, Monitor, Tablet, Smartphone } from 'lucide-react'

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
            Power BI Dashboard Planning: Canvas Setup, Grids & Spacing
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Before placing any visuals in Power BI, successful designers create a plan. This guide walks you 
            through wireframing, canvas sizing, grid systems, and spacing principles that form the foundation 
            of professional dashboards.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Dashboard Planning', 'Canvas Setup', 'Grid Systems', 'Power BI', 'Layout Design'].map((tag) => (
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
              <a href="#wireframing" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard planning and wireframing basics
              </a>
              <a href="#canvas-sizing" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Canvas sizing options and when to use each
              </a>
              <a href="#grid-systems" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Grid systems for consistent alignment
              </a>
              <a href="#spacing" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Spacing and rhythm principles
              </a>
              <a href="#implementation" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Implementing your foundation in Power BI
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Dashboard Planning */}
          <section id="wireframing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Dashboard Planning and Wireframing</h2>
            
            <p className="text-gray-700 mb-6">
              Before placing any visuals in Power BI, successful designers create a plan. This planning phase 
              prevents costly revisions and ensures your dashboard serves its intended purpose.
            </p>

            {/* Information Architecture */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-600" />
                Information Architecture Steps
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">List Required Metrics</h4>
                    <p className="text-gray-600 text-sm">Inventory all data points and dimensions needed</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Group Related Information</h4>
                    <p className="text-gray-600 text-sm">Organize metrics into logical sections</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Prioritize by Importance</h4>
                    <p className="text-gray-600 text-sm">Rank information based on business value</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sketch Layouts</h4>
                    <p className="text-gray-600 text-sm">Create rough drafts on paper or whiteboard</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Consider User Workflow</h4>
                    <p className="text-gray-600 text-sm">Think about scanning patterns and navigation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wireframing */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Wireframing Basics</h3>
              <p className="text-gray-700 mb-4">
                A wireframe is a simple sketch showing where elements will be placed. It focuses on structure 
                rather than visual design, preventing distraction by colors and fonts before solving fundamental 
                layout challenges.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded p-4">
                  <h4 className="font-medium mb-2">Elements to Include:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Title and header information</li>
                    <li>• Major section divisions</li>
                    <li>• Key metrics and KPIs</li>
                    <li>• Charts (as labeled boxes)</li>
                    <li>• Navigation elements</li>
                    <li>• Footer information</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded p-4">
                  <h4 className="font-medium mb-2">Tools for Wireframing:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pen and paper (fastest)</li>
                    <li>• PowerPoint/Google Slides</li>
                    <li>• Figma or Sketch</li>
                    <li>• Power BI shapes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Canvas Sizing */}
          <section id="canvas-sizing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Canvas Sizing Fundamentals</h2>
            
            <p className="text-gray-700 mb-6">
              In Power BI, the canvas is where all your visuals come together. Unlike responsive web design, 
              Power BI uses fixed canvas dimensions, making your sizing decision crucial.
            </p>

            {/* Canvas Size Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Monitor className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold">1280x720px (Default)</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Works well for dashboards and presentations. Scales nicely on TVs and PowerPoint.
                </p>
                <div className="bg-purple-50 rounded p-3">
                  <h4 className="font-medium text-sm mb-1">Choose when:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Presenting on large screens</li>
                    <li>• Embedding in PowerPoint</li>
                    <li>• Creating executive dashboards</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Maximize className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold">1440x1080px (Recommended)</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Offers more space for complex reports. Standard for web dashboards.
                </p>
                <div className="bg-blue-50 rounded p-3">
                  <h4 className="font-medium text-sm mb-1">Choose when:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Building detailed dashboards</li>
                    <li>• Including multiple visuals</li>
                    <li>• Desktop viewing primary</li>
                    <li>• Need extensive filters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Page View Settings */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Page View Settings</h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Actual Size</h4>
                  <p className="text-gray-700 text-sm">
                    Shows the report at designed dimensions. Best for development and precise control.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Fit to Page</h4>
                  <p className="text-gray-700 text-sm">
                    Scales entire report to fit browser window. Good for varying screen sizes but may make text small.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Fit to Width</h4>
                  <p className="text-gray-700 text-sm">
                    Scales report width to match browser. Users may need to scroll vertically.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-100 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Recommendation:</strong> Develop in Actual size, then use Fit to page or Fit to width 
                  when publishing based on your content length.
                </p>
              </div>
            </div>
          </section>

          {/* Grid Systems */}
          <section id="grid-systems" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Grid Systems for Alignment</h2>
            
            <p className="text-gray-700 mb-6">
              Before placing any visuals, set up a grid to guide alignment and spacing. Proper alignment is 
              fundamental to creating polished, professional-looking reports.
            </p>

            {/* Default Grid */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Grid className="w-5 h-5 text-gray-600" />
                Power BI's Default Grid
              </h3>
              <p className="text-gray-700 mb-4">
                The default grid consists of 96x96px squares. These remain fixed regardless of canvas size. 
                While it doesn't scale with canvas changes, it provides a simple way to introduce structure.
              </p>
              
              <div className="bg-gray-50 rounded p-4">
                <h4 className="font-medium mb-2">Grid Navigation Shortcuts:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Move className="w-4 h-4 text-gray-500" />
                      Arrow keys
                    </span>
                    <span className="text-gray-600">Move by 8px (16px when zoomed out)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Move className="w-4 h-4 text-gray-500" />
                      Shift + Arrow keys
                    </span>
                    <span className="text-gray-600">Move by 96px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Without "Snap to Grid"</span>
                    <span className="text-gray-600">Arrow: 1px, Shift+Arrow: 10px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Column Grid */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Ruler className="w-6 h-6 text-gray-700" />
                Custom Column Grid System
              </h3>
              
              <p className="text-gray-700 mb-4">
                Create a more sophisticated grid system for consistent spacing and professional layouts:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">80px</div>
                  <div className="font-medium">Margins</div>
                  <p className="text-sm text-gray-600">Outer edge spacing</p>
                </div>
                <div className="bg-white rounded p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">26px</div>
                  <div className="font-medium">Gutters</div>
                  <p className="text-sm text-gray-600">Between columns</p>
                </div>
                <div className="bg-white rounded p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">83px</div>
                  <div className="font-medium">Column Width</div>
                  <p className="text-sm text-gray-600">Each column</p>
                </div>
              </div>
              
              <div className="bg-white rounded p-4">
                <p className="text-sm text-gray-700">
                  <strong>For 1440px width:</strong> Content area = 1,280px (after subtracting margins)
                </p>
              </div>
            </div>

            {/* Creating Grids */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Creating Grids in Power BI</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <p>Insert rectangle shapes to mark column boundaries</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <p>Set consistent spacing measurements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <p>Group grid elements in the Selection Pane</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <p>Toggle grid visibility on/off while developing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    5
                  </div>
                  <p>Hide the grid before publishing</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Use grids as guides, not rigid rules. Flexibility allows for 
                  creative adjustments while maintaining consistency.
                </p>
              </div>
            </div>
          </section>

          {/* Spacing and Rhythm */}
          <section id="spacing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Spacing and Rhythm Principles</h2>
            
            <p className="text-gray-700 mb-6">
              Grid systems help with alignment across the page. Managing spacing within your visuals is equally 
              important. This is where padding and rhythm come into play.
            </p>

            {/* Padding Consistency */}
            <div className="bg-purple-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Square className="w-6 h-6 text-purple-600" />
                Padding Consistency
              </h3>
              
              <p className="text-gray-700 mb-4">
                Padding ensures your content has breathing room. It prevents visuals from feeling cramped while 
                improving readability. Set consistent padding (such as 16px on all sides) throughout your report.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2">Benefits of Consistent Padding:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Prevents cluttered appearance</li>
                    <li>• Establishes clear hierarchy</li>
                    <li>• Guides viewer attention smoothly</li>
                    <li>• Makes data easier to interpret</li>
                    <li>• Streamlines design process</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <div className="border-2 border-dashed border-purple-300 rounded p-8 text-center">
                    <div className="bg-purple-100 rounded p-4">
                      <p className="text-sm font-medium text-purple-700">Visual Content</p>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">16px padding</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rhythm */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Horizontal and Vertical Rhythm</h3>
              
              <p className="text-gray-700 mb-4">
                Many report authors place visuals with little concern for layout. This makes reports feel chaotic. 
                Improve your layout by using consistent horizontal and vertical rhythm.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blue-600" />
                    Horizontal Rhythm
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Align visuals along a row with equal spacing between them. This creates balance across the canvas.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-green-600 rotate-90" />
                    Vertical Rhythm
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ensure consistent spacing between rows of visuals. This prevents cramped or uneven appearance.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-gray-700 text-sm">
                  Together, these create a grid-like structure that promotes clarity and readability.
                </p>
              </div>
            </div>

            {/* Managing Spacing */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Managing Spacing Manually</h3>
              
              <p className="text-gray-700 mb-4">
                Power BI doesn't have auto-layout options like CSS. You must manually manage alignment and spacing. 
                Use shapes with pre-defined sizes to maintain consistent spacing.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Create "spacer" rectangles with standard measurements</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Use the Selection Pane to organize spacing elements</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Document your spacing standards for team consistency</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Test spacing on different screen sizes</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <p className="text-sm">Consider touch targets for mobile users</p>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation */}
          <section id="implementation" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Foundation Summary</h2>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Building Strong Foundations</h3>
              <p className="text-blue-50">
                Canvas sizing, grid systems, and consistent padding form the foundation of well-structured, 
                visually appealing reports. When these elements work together, your dashboard looks clean and 
                professional while becoming easier to navigate.
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              Proper spacing within and between visuals creates order. This makes data more accessible and 
              reduces clutter. Setting up these design fundamentals early streamlines the report-building 
              process. You can focus more on content and insights rather than layout adjustments.
            </p>

            {/* Key Principles */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Key Foundation Principles</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Plan your information architecture before building</li>
                  <li>• Choose appropriate canvas sizes for your audience</li>
                  <li>• Use grid systems to guide alignment</li>
                  <li>• Apply consistent padding throughout</li>
                  <li>• Create rhythm through alignment</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Remember</h3>
                <p className="text-gray-700 text-sm mb-3">
                  You don't need every detail perfect before starting. These elements provide a flexible 
                  framework that can evolve as your report takes shape.
                </p>
                <p className="text-gray-700 text-sm">
                  Start with good structure. This allows for experimentation and adjustments without losing 
                  consistency.
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
                  <span>Always wireframe before building to organize information logically</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Choose canvas sizes based on your audience's primary viewing context</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Use grid systems to ensure consistent alignment and professional appearance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Apply consistent padding and spacing to create visual rhythm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Foundations can evolve—start with structure and refine as needed</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Better Foundations?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Apply these principles to your next dashboard and see the difference proper planning makes.
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
                  href="/blog/power-bi-visual-hierarchy"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue to Visual Hierarchy
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
                  <p className="text-gray-600 text-sm">Visual Hierarchy and Organization in Power BI Dashboards</p>
                </div>
                <Link
                  href="/blog/power-bi-visual-hierarchy"
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