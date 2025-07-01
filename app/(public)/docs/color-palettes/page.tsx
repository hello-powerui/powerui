'use client'

import { Palette, Plus, Upload, Trash2, Edit2, Check, Globe, Lock, Users } from 'lucide-react'
import Image from 'next/image'

export default function ColorPalettesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Color Palettes</h1>
        <p className="text-xl text-gray-600">
          Create and manage vibrant color palettes for your data visualizations.
        </p>
      </div>

      {/* What are Color Palettes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Color Palettes</h2>
        <p className="text-gray-600 mb-4">
          Color palettes define the colors used for data representation in your Power BI visuals. These colors are automatically 
          assigned to chart series, data points, and legend items.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-3">Where Color Palettes Are Used:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Chart series (columns, lines, areas)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Pie and donut chart segments
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Legend items
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Conditional formatting rules
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              Data point markers
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Power BI cycles through your palette colors in order. Place your most important colors first.
          </p>
        </div>
      </section>

      {/* Accessing Palette Manager */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accessing the Palette Manager</h2>
        
        <ol className="space-y-3">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
            <div>
              <p className="text-gray-700">In the Foundation panel (left side), locate the <strong>"Color Palette"</strong> section</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
            <div>
              <p className="text-gray-700">Click the <strong>"Manage Palettes"</strong> button</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
            <div>
              <p className="text-gray-700">The Palette Manager opens with three tabs:</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="bg-white border border-gray-200 rounded p-2 text-center text-sm">My Palettes</div>
                <div className="bg-white border border-gray-200 rounded p-2 text-center text-sm">Trending</div>
                <div className="bg-white border border-gray-200 rounded p-2 text-center text-sm">Organization</div>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* Creating a Custom Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creating a Custom Palette</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Step-by-Step Guide:</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-medium mb-1">Click "New palette"</p>
                  <p className="text-sm text-gray-600">In the Palette Manager, click the <Plus className="inline w-3 h-3" /> New palette button</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-medium mb-1">Name your palette</p>
                  <p className="text-sm text-gray-600">Enter a descriptive name (e.g., "Brand Colors", "Quarterly Report")</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-medium mb-1">Add colors</p>
                  <p className="text-sm text-gray-600">Click "Add" to add colors using the color picker or hex input</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="font-medium mb-1">Arrange colors</p>
                  <p className="text-sm text-gray-600">Drag and drop to reorder colors (most important first)</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">5</span>
                <div>
                  <p className="font-medium mb-1">Save palette</p>
                  <p className="text-sm text-gray-600">Click "Create" to save your custom palette</p>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-lg font-semibold mb-3 mt-8">Understanding Color Palette Limits</h3>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            When designing color palettes in Power BI, it's important to understand both the technical limitations and practical considerations. While Power BI requires a minimum of one color in your palette to function properly, there is no hard-coded maximum limit enforced by the system. Theoretically, you could create a palette with dozens of colors, but this approach quickly becomes counterproductive.
          </p>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            In practice, if you find yourself needing 20 or more distinct colors in a single visualization, it's a strong indicator that your visual is trying to communicate too much information at once. Human perception struggles to differentiate between more than 8-10 colors effectively, especially when they appear in different sizes or are separated spatially on a dashboard. Beyond this threshold, viewers have difficulty associating specific colors with their corresponding data series, defeating the purpose of color coding entirely.
          </p>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            We strongly recommend limiting your palettes to 8 colors or fewer for optimal clarity and visual impact. This constraint forces you to be more thoughtful about your data presentation—perhaps grouping less important categories into an "Other" category, using different visual encoding methods like patterns or shapes, or splitting complex visuals into multiple, more focused charts. Remember, the ultimate goal of data visualization is to make information easy to understand and act upon, not to showcase every possible data point in a rainbow of colors.
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Professional data visualization follows the principle of progressive disclosure: show the most important information prominently, and allow users to drill down for details as needed. By keeping your color palette focused and intentional, you create visualizations that guide viewers to insights rather than overwhelming them with visual noise.
          </p>
        </div>
      </section>

      {/* Importing from Coolors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Importing from Coolors.co</h2>
        <p className="text-gray-600 mb-6">
          Power UI seamlessly integrates with Coolors.co, allowing you to import professionally designed palettes.
        </p>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium">How to Import:</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <span className="text-blue-500">1.</span>
              <div>
                <p className="text-gray-700">Visit <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Coolors.co</a> and create or find a palette</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-500">2.</span>
              <div>
                <p className="text-gray-700">Copy the palette URL from your browser</p>
                <p className="text-sm text-gray-500 mt-1">Example: https://coolors.co/palette/264653-2a9d8f-e9c46a</p>
                <div className="mt-3">
                  <Image 
                    src="/coolors-url-location.png" 
                    alt="Coolors.co URL location - shows where to find and copy the trending palette URL"
                    width={600}
                    height={300}
                    className="rounded-lg border border-gray-200 shadow-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    The URL for trending palettes can be found in your browser's address bar
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-500">3.</span>
              <div>
                <p className="text-gray-700">In the Palette Editor, paste the URL in the import field</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-500">4.</span>
              <div>
                <p className="text-gray-700">Click <Upload className="inline w-3 h-3" /> Import</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-500">5.</span>
              <div>
                <p className="text-gray-700">Colors are automatically added to your palette</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Supported URLs:</strong> Both coolors.co/palette/ and coolors.co/ formats work
          </p>
        </div>
      </section>

      {/* Using Palettes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using and Managing Palettes</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Selecting a Palette:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Click any palette in the manager to select it
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Selected palette shows a checkmark
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Changes apply immediately to preview
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Editing Existing Palettes:</h3>
            <ol className="space-y-2 text-gray-600">
              <li>1. Hover over a palette in your "My Palettes" tab</li>
              <li>2. Click the <Edit2 className="inline w-3 h-3" /> Edit icon</li>
              <li>3. Modify colors, name, or description</li>
              <li>4. Click "Save" to update</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Deleting Palettes:</h3>
            <p className="text-gray-600 mb-2">Only palettes you created can be deleted:</p>
            <ol className="space-y-2 text-gray-600">
              <li>1. Hover over your palette</li>
              <li>2. Click the <Trash2 className="inline w-3 h-3" /> Delete icon</li>
              <li>3. Confirm deletion</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Palette Tabs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Palette Tabs</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Palettes
            </h3>
            <p className="text-gray-600 text-sm">
              Your personal palettes. Create, edit, and delete as needed.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Trending
            </h3>
            <p className="text-gray-600 text-sm">
              Popular palettes from the Power UI community. Great for inspiration.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Organization
            </h3>
            <p className="text-gray-600 text-sm">
              Palettes shared within your organization (requires team account).
            </p>
          </div>
        </div>
      </section>


      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Neutral Palettes</h3>
        <p className="text-gray-600 mb-4">
          Learn how to create AI-powered neutral palettes for consistent UI elements.
        </p>
        <a
          href="/docs/neutral-palettes"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Neutral Palettes →
        </a>
      </div>
    </div>
  )
}