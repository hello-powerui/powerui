'use client'

import { Download, Copy, Search, Palette, Globe, Code, Layers, Lightbulb } from 'lucide-react'

export default function IconsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Icon Library</h1>
        <p className="text-xl text-gray-600">
          Access thousands of high-quality icons for your Power BI reports with custom colors and easy integration.
        </p>
      </div>

      {/* What is the Icon Library */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding the Icon Library</h2>
        <p className="text-gray-600 mb-4">
          The Power UI Icon Library provides instant access to the complete Lucide icon collection, optimized for Power BI. 
          Each icon can be customized with any color and accessed via a unique URL for seamless integration into your reports.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-3">Key Features:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              1,000+ professionally designed icons from Lucide
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Custom color selection for each icon
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Category-based browsing and search
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Direct URL access for Power BI integration
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Bulk export functionality for team workflows
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Icons are served as SVG format, ensuring perfect quality at any size in your Power BI reports.
          </p>
        </div>
      </section>

      {/* Accessing the Icon Library */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accessing the Icon Library</h2>
        
        <ol className="space-y-3">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
            <div>
              <p className="text-gray-700">Navigate to <strong>Icons</strong> in the main navigation menu</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
            <div>
              <p className="text-gray-700">Use the search bar to find specific icons or browse by category</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
            <div>
              <p className="text-gray-700">Select your desired color using the color picker</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Using Icons in Power BI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Icons in Power BI</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Method 1: Image Visual</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-medium mb-1">Copy the icon URL</p>
                  <p className="text-sm text-gray-600">Click any icon to copy its URL to your clipboard</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-medium mb-1">Add an Image visual to your report</p>
                  <p className="text-sm text-gray-600">From the Visualizations pane, select the Image visual</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-medium mb-1">Paste the URL</p>
                  <p className="text-sm text-gray-600">In the Image URL field, paste the copied icon URL</p>
                </div>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Method 2: Table/Matrix Icons</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-medium mb-1">Create a URL column in your data</p>
                  <p className="text-sm text-gray-600">Add a column containing icon URLs to your dataset</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-medium mb-1">Set data category to "Image URL"</p>
                  <p className="text-sm text-gray-600">In Power BI Desktop, mark the column as Image URL data category</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-medium mb-1">Add to table or matrix</p>
                  <p className="text-sm text-gray-600">The icons will automatically display in your visual</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Dynamic Color with DAX */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Dynamic Colors with DAX</h2>
        <p className="text-gray-600 mb-4">
          Create dynamic icon colors based on your data using DAX formulas:
        </p>
        
        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-sm">
            <code>{`Icon URL = 
"https://powerui.app/api/icons/lucide/" & [IconName] & 
"?color=" & ENCODEURL([ColorColumn])`}</code>
          </pre>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Example: Status Indicators</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm">
              <code>{`Status Icon = 
VAR StatusColor = 
    SWITCH([Status],
        "Success", "%23" & "10B981",  -- Green
        "Warning", "%23" & "F59E0B",  -- Amber
        "Error", "%23" & "EF4444",    -- Red
        "%23" & "6B7280"              -- Gray (default)
    )
RETURN
    "https://powerui.app/api/icons/lucide/circle?color=" & StatusColor`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Categories and Organization */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Icon Categories</h2>
        <p className="text-gray-600 mb-4">
          Icons are organized into intuitive categories for easy discovery:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Common Categories
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Navigation & Arrows</li>
              <li>• Communication & Social</li>
              <li>• Files & Documents</li>
              <li>• Charts & Analytics</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Business Categories
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Finance & Banking</li>
              <li>• Development & Code</li>
              <li>• Security & Privacy</li>
              <li>• Devices & Hardware</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bulk Export */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Bulk Export for Teams</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Download className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Export to CSV</h3>
              <p className="text-gray-600 mb-3">
                Export filtered icons as a CSV file containing icon names, URLs, and categories. Perfect for:
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Building icon reference tables in Power BI</li>
                <li>• Sharing icon sets with team members</li>
                <li>• Creating standardized icon libraries</li>
                <li>• Documenting design systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Icon Selection
            </h3>
            <p className="text-sm text-gray-600">
              Choose icons that are universally recognized and align with your data's meaning. Avoid overly decorative or ambiguous icons.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-500" />
              Color Consistency
            </h3>
            <p className="text-sm text-gray-600">
              Use colors that match your theme's color palette. Consider accessibility and ensure sufficient contrast.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500" />
              Performance
            </h3>
            <p className="text-sm text-gray-600">
              Icons are cached and optimized for fast loading. For reports with many icons, consider using conditional formatting to load only visible icons.
            </p>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
        
        <div className="bg-gray-900 text-gray-100 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-3">Icon URL Format</h3>
          <code className="text-sm text-green-400">
            https://powerui.app/api/icons/lucide/[icon-name]?color=[hex-color]
          </code>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <span className="text-gray-400">Parameters:</span>
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                <span className="text-blue-400">icon-name</span>
                <span className="text-gray-400"> - The name of the icon (e.g., "home", "chart-bar")</span>
              </li>
              <li>
                <span className="text-blue-400">color</span>
                <span className="text-gray-400"> - Hex color code with # encoded as %23</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Example:</p>
            <code className="text-sm text-green-400">
              https://powerui.app/api/icons/lucide/home?color=%23FF6B6B
            </code>
          </div>
        </div>
      </section>
    </div>
  )
}