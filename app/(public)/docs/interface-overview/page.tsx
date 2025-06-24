'use client'

import Image from 'next/image'
import { Info, ChevronLeft, ChevronRight, Eye, Code, Download, Save, RotateCcw, Upload } from 'lucide-react'

export default function InterfaceOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Interface Overview</h1>
        <p className="text-xl text-gray-600">
          Understanding the Theme Studio workspace and its powerful features.
        </p>
      </div>

      {/* Three Panel Layout */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Three-Panel Layout</h2>
        <p className="text-gray-600 mb-6">
          Theme Studio uses an intuitive three-panel layout designed for efficient theme creation:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Left Panel: Foundation
            </h3>
            <p className="text-sm text-gray-600">
              Core theme settings including palettes, typography, and structural colors
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Center: Preview/JSON
            </h3>
            <p className="text-sm text-gray-600">
              Live Power BI preview or real-time JSON view of your theme
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Right Panel: Visual Styles
            </h3>
            <p className="text-sm text-gray-600">
              Detailed customization for each visual type with style variants
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> All panels are collapsible. Click the panel headers to expand/collapse them for more workspace.
          </p>
        </div>
      </section>

      {/* Header Controls */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Header Controls</h2>
        <p className="text-gray-600 mb-6">
          The header provides quick access to essential theme management functions:
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Back Button</h3>
              <p className="text-sm text-gray-600">
                Return to themes list. If you have unsaved changes, you'll be prompted to save.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Theme Name & Description</h3>
              <p className="text-sm text-gray-600">
                Click to edit your theme's name and description. Changes save automatically.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">View Toggle</h3>
              <p className="text-sm text-gray-600">
                Switch between Preview (live Power BI report) and JSON (code view) modes.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Import</h3>
              <p className="text-sm text-gray-600">
                Import existing Power BI themes to enhance with Power UI features.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Export</h3>
              <p className="text-sm text-gray-600">
                Download your theme as a .json file ready for Power BI.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Reset</h3>
              <p className="text-sm text-gray-600">
                Revert all unsaved changes to the last saved state.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Save className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Save</h3>
              <p className="text-sm text-gray-600">
                Save your theme to the cloud. Creates a unique URL on first save.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Panel */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Foundation Panel (Left)</h2>
        <p className="text-gray-600 mb-4">
          The Foundation panel contains the core building blocks of your theme:
        </p>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium">Sections</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-3">
              <h4 className="font-medium mb-1">Palettes</h4>
              <p className="text-sm text-gray-600">Color and neutral palette selection with management tools</p>
            </div>
            <div className="px-4 py-3">
              <h4 className="font-medium mb-1">Typography</h4>
              <p className="text-sm text-gray-600">Font family selection for all text elements</p>
            </div>
            <div className="px-4 py-3">
              <h4 className="font-medium mb-1">Structural Colors</h4>
              <p className="text-sm text-gray-600">Background, foreground, and UI element colors</p>
            </div>
            <div className="px-4 py-3">
              <h4 className="font-medium mb-1">Text Classes</h4>
              <p className="text-sm text-gray-600">Specific styling for titles, labels, and callout values</p>
            </div>
            <div className="px-4 py-3">
              <h4 className="font-medium mb-1">Canvas Layout</h4>
              <p className="text-sm text-gray-600">Report canvas background and padding settings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Styles Panel */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Visual Styles Panel (Right)</h2>
        <p className="text-gray-600 mb-4">
          Customize individual visual types and create style variants:
        </p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Visual Type Selector</h3>
            <p className="text-sm text-gray-600">
              Dropdown to choose which visual type to customize (Column Chart, Line Chart, etc.)
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-medium mb-2">Style Variants Manager</h3>
            <p className="text-sm text-gray-600 mb-2">
              Create multiple style variations for each visual type - exclusive to Power UI!
            </p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Default (*) - Base style for the visual</li>
              <li>• Create custom variants (emphasis, subtle, etc.)</li>
              <li>• Duplicate existing variants</li>
              <li>• Delete variants you no longer need</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Property Sections</h3>
            <p className="text-sm text-gray-600">
              Expandable sections for different aspects of the visual (General, Title, Data Colors, etc.)
            </p>
          </div>
        </div>
      </section>

      {/* Visual Indicators */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Visual Indicators</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <h3 className="font-medium">Blue Dots</h3>
              <p className="text-sm text-gray-600">
                Indicate properties that have been modified from their default values
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm font-medium">
              5 unsaved
            </div>
            <div>
              <h3 className="font-medium">Unsaved Changes</h3>
              <p className="text-sm text-gray-600">
                Header shows count of unsaved changes. Click Save to persist them.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <h3 className="font-medium">Save Success</h3>
              <p className="text-sm text-gray-600">
                Green checkmark appears briefly after successful save
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interface Tips</h2>
        
        <div className="bg-blue-50 rounded-lg p-6 space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-800">
              <strong>Responsive Design:</strong> Panels automatically adjust on smaller screens
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-800">
              <strong>Preview Sync:</strong> Clicking a visual in preview auto-selects it in Visual Styles
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-800">
              <strong>Quick Toggle:</strong> Use keyboard shortcuts to toggle panels (Ctrl/Cmd + 1, 2, 3)
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-800">
              <strong>Auto-Save:</strong> Changes persist in browser even if you navigate away
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Start with Color Palettes</h3>
        <p className="text-gray-600 mb-4">
          Now that you understand the interface, let's dive into creating beautiful color palettes for your theme.
        </p>
        <a
          href="/docs/color-palettes"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Color Palettes →
        </a>
      </div>
    </div>
  )
}