'use client'

import { Layers, Plus, Copy, Trash2, Star, Zap } from 'lucide-react'

export default function VisualVariantsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          Visual Styles & Variants
          <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Exclusive</span>
        </h1>
        <p className="text-xl text-gray-600">
          Create multiple style variations for each visual type - a feature unique to Power UI.
        </p>
      </div>

      {/* What are Style Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Revolutionary Style Variants</h2>
        <p className="text-gray-600 mb-6">
          Style variants are Power UI's game-changing feature that allows you to create multiple styling options 
          for each visual type. Instead of one-size-fits-all styling, you can design variants for different purposes 
          within the same theme.
        </p>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Why Style Variants Matter
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Create emphasis variants for KPIs and critical metrics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Design subtle variants for supporting information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Maintain consistency while allowing flexibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Apply different styles to same visual type in one report</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Common Variant Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Variant Patterns</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Default (*)</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">The base style for all visuals of this type</p>
              <div className="bg-gray-100 rounded p-3">
                <div className="h-20 bg-white rounded border border-gray-300"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Standard appearance, balanced styling</p>
            </div>
          </div>

          <div className="border border-orange-200 rounded-lg overflow-hidden">
            <div className="bg-orange-50 px-4 py-3 border-b border-orange-200">
              <h3 className="font-semibold text-orange-900">Emphasis</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">For highlighting important data</p>
              <div className="bg-orange-100 rounded p-3">
                <div className="h-20 bg-white rounded border-2 border-orange-400 shadow-lg"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Bold borders, shadows, vibrant colors</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-600">Subtle</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">For supporting information</p>
              <div className="bg-gray-50 rounded p-3">
                <div className="h-20 bg-white rounded border border-gray-200 opacity-75"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Muted colors, minimal borders</p>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
              <h3 className="font-semibold text-blue-900">Minimal</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">Clean, distraction-free design</p>
              <div className="bg-blue-50 rounded p-3">
                <div className="h-20 bg-white rounded"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">No borders, clean backgrounds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creating Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creating Style Variants</h2>
        
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Step-by-Step Guide:</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-medium mb-1">Select Visual Type</p>
                  <p className="text-sm text-gray-600">In the Visual Styles panel (right), choose a visual type from the dropdown</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-medium mb-1">Open Variant Manager</p>
                  <p className="text-sm text-gray-600">The Style Variants section shows current variants for this visual</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-medium mb-1">Create New Variant</p>
                  <p className="text-sm text-gray-600">Click the "Create" button and enter a variant name (e.g., "emphasis")</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="font-medium mb-1">Customize Properties</p>
                  <p className="text-sm text-gray-600">Expand property sections and modify settings for this variant</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Variant Actions:</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center mx-auto mb-1">
                  <Plus className="w-4 h-4" />
                </div>
                <p className="text-xs">Create</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center mx-auto mb-1">
                  <Copy className="w-4 h-4" />
                </div>
                <p className="text-xs">Duplicate</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center mx-auto mb-1">
                  <Trash2 className="w-4 h-4" />
                </div>
                <p className="text-xs">Delete</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customizable Properties */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Customizable Properties</h2>
        <p className="text-gray-600 mb-6">
          Each variant can override any property of the visual type:
        </p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 flex items-center justify-between">
                <span className="font-medium">General Properties</span>
                <span className="text-xs text-gray-500">Click to expand</span>
              </summary>
              <div className="p-4 space-y-2">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Background color and transparency</li>
                  <li>• Border color, width, and radius</li>
                  <li>• Shadow effects</li>
                  <li>• Padding and margins</li>
                  <li>• Responsive behavior</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 flex items-center justify-between">
                <span className="font-medium">Title & Subtitle</span>
                <span className="text-xs text-gray-500">Click to expand</span>
              </summary>
              <div className="p-4 space-y-2">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Font family, size, and weight</li>
                  <li>• Text color and alignment</li>
                  <li>• Background color</li>
                  <li>• Divider line styling</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 flex items-center justify-between">
                <span className="font-medium">Data Elements</span>
                <span className="text-xs text-gray-500">Click to expand</span>
              </summary>
              <div className="p-4 space-y-2">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Data color overrides</li>
                  <li>• Data label formatting</li>
                  <li>• Marker shapes and sizes</li>
                  <li>• Line styles and widths</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 flex items-center justify-between">
                <span className="font-medium">Axes & Gridlines</span>
                <span className="text-xs text-gray-500">Click to expand</span>
              </summary>
              <div className="p-4 space-y-2">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Axis line colors and styles</li>
                  <li>• Gridline visibility and styling</li>
                  <li>• Tick mark appearance</li>
                  <li>• Label formatting</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Using Variants in Power BI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Variants in Power BI</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Applying Variants to Visuals:</h3>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="text-blue-700 font-medium">1.</span>
              <p className="text-blue-800">Apply your theme to the Power BI report</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-700 font-medium">2.</span>
              <p className="text-blue-800">Right-click on any visual</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-700 font-medium">3.</span>
              <p className="text-blue-800">Navigate to Format → Style presets</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-700 font-medium">4.</span>
              <p className="text-blue-800">Select from your created variants (default, emphasis, subtle, etc.)</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-700 font-medium">5.</span>
              <p className="text-blue-800">Visual instantly updates with variant styling</p>
            </li>
          </ol>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Pro Tip:</strong> Use consistent variant names across visual types for easier application 
            (e.g., all visuals have "emphasis" and "subtle" variants).
          </p>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Variant Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              Naming Convention
            </h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Use consistent names across visuals</li>
              <li>• Make names descriptive (emphasis, subtle)</li>
              <li>• Avoid version numbers (v1, v2)</li>
              <li>• Consider purpose-based names</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Strategic Usage
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Limit to 3-4 variants per visual</li>
              <li>• Default should work for 80% of cases</li>
              <li>• Use emphasis sparingly</li>
              <li>• Document variant purposes</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Visual Hierarchy</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Emphasis: KPIs and alerts</li>
              <li>• Default: Main content</li>
              <li>• Subtle: Supporting data</li>
              <li>• Minimal: Background context</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Team Collaboration</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Document each variant's purpose</li>
              <li>• Create usage guidelines</li>
              <li>• Include examples in theme docs</li>
              <li>• Train report authors on variants</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example Use Cases</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-1">Executive Dashboard</h3>
            <p className="text-sm text-gray-600">
              Use "emphasis" variant for KPI cards showing revenue and profit. Apply "subtle" to trend charts 
              in the background. Keep main visualizations as default.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-1">Sales Report</h3>
            <p className="text-sm text-gray-600">
              Apply "emphasis" to the current month's performance chart. Use "subtle" for historical comparisons. 
              Apply "minimal" to reference tables.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-1">Operational Dashboard</h3>
            <p className="text-sm text-gray-600">
              Create an "alert" variant with red borders for metrics outside thresholds. Use "emphasis" 
              for real-time metrics and default for standard reporting visuals.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Real-Time Preview</h3>
        <p className="text-gray-600 mb-4">
          Learn how to use the live Power BI preview to perfect your theme design.
        </p>
        <a
          href="/docs/real-time-preview"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Real-Time Preview →
        </a>
      </div>
    </div>
  )
}