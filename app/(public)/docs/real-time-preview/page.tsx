'use client'

import { Eye, RefreshCw, Maximize2, MousePointer, Zap, Monitor } from 'lucide-react'

export default function RealTimePreviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Real-Time Preview</h1>
        <p className="text-xl text-gray-600">
          See your theme changes instantly in a live Power BI report.
        </p>
      </div>

      {/* Understanding Real-Time Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Power of Live Preview</h2>
        <p className="text-gray-600 mb-6">
          Power UI's real-time preview eliminates the tedious export-import cycle. Every change you make updates 
          the embedded Power BI report within 1-2 seconds, allowing you to perfect your theme with immediate visual feedback.
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Key Benefits
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Instant feedback on all changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Test with real Power BI visuals and data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Interactive preview with hover and click states</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>No need to constantly export and import</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Preview Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Preview Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Live Updates</h3>
            </div>
            <p className="text-sm text-gray-600">
              Changes appear within 1-2 seconds. No manual refresh needed - just make changes and watch them apply.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Full Interactivity</h3>
            </div>
            <p className="text-sm text-gray-600">
              Hover over visuals to see tooltips, click to test focus mode, and interact just like a real report.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Multiple Reports</h3>
            </div>
            <p className="text-sm text-gray-600">
              Switch between different sample reports to test your theme with various visual types and layouts.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold">Focus Mode</h3>
            </div>
            <p className="text-sm text-gray-600">
              Test how your theme looks when visuals are expanded to focus mode - critical for dashboard design.
            </p>
          </div>
        </div>
      </section>

      {/* Using the Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using the Preview Panel</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Preview Controls:</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">View Mode Toggle</h4>
                  <p className="text-sm text-gray-600">Switch between Preview and JSON view in the header</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Manual Refresh</h4>
                  <p className="text-sm text-gray-600">Force a preview update if needed (rarely necessary)</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Report Selector</h4>
                  <p className="text-sm text-gray-600">Choose from different sample reports to test various scenarios</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Full Screen</h4>
                  <p className="text-sm text-gray-600">Expand the preview for detailed inspection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Focus Mode */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Testing Focus Mode</h2>
        <p className="text-gray-600 mb-6">
          Focus mode is a critical feature in Power BI that expands a single visual for detailed analysis. 
          Testing your theme in focus mode ensures it looks great in all viewing contexts.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">How to Test Focus Mode:</h3>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              <p className="text-blue-800">Hover over any visual in the preview</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              <p className="text-blue-800">Click the focus icon (arrows) that appears in the top-right corner</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              <p className="text-blue-800">Visual expands to fill the preview area</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              <p className="text-blue-800">Test your theme's appearance in this expanded view</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              <p className="text-blue-800">Click outside the visual or the X button to exit focus mode</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Visual Selection Sync */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Visual Selection Synchronization</h2>
        <p className="text-gray-600 mb-6">
          One of Power UI's smartest features is the automatic synchronization between the preview and the Visual Styles panel.
        </p>
        
        <div className="border border-purple-200 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">How Sync Works:</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
              <p className="text-purple-800">Click any visual in the preview panel</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
              <p className="text-purple-800">Visual Styles panel automatically switches to that visual type</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
              <p className="text-purple-800">Make changes and see them applied to the selected visual instantly</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
              <p className="text-purple-800">Perfect for quick, targeted adjustments</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Pro Tip:</strong> Use this feature to quickly style similar visuals - click each one and apply the same variant.
          </p>
        </div>
      </section>

      {/* Testing Different Scenarios */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Testing Scenarios</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Data Density</h3>
            <p className="text-sm text-gray-600 mb-2">Test with different amounts of data:</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Few data points (2-3 series)</li>
              <li>• Medium complexity (5-8 series)</li>
              <li>• High density (10+ series)</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Visual Types</h3>
            <p className="text-sm text-gray-600 mb-2">Ensure your theme works across:</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Charts (column, line, area, pie)</li>
              <li>• Tables and matrices</li>
              <li>• Cards and KPIs</li>
              <li>• Maps and custom visuals</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Interactive States</h3>
            <p className="text-sm text-gray-600 mb-2">Test all interaction modes:</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Hover effects and tooltips</li>
              <li>• Selection highlighting</li>
              <li>• Cross-filtering between visuals</li>
              <li>• Focus mode expansion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tips for Effective Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Preview Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Start Simple</h4>
            <p className="text-sm text-blue-800">
              Begin with basic reports to establish your foundation colors and typography before testing complex scenarios.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Test Extremes</h4>
            <p className="text-sm text-green-800">
              Check both minimal (1-2 visuals) and dense (10+ visuals) layouts to ensure your theme scales well.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Use Real Data</h4>
            <p className="text-sm text-purple-800">
              The sample reports use realistic data patterns. Pay attention to how your theme handles actual business scenarios.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Check Readability</h4>
            <p className="text-sm text-orange-800">
              Zoom out to 75% to simulate viewing on smaller screens. Ensure text and data remain clear.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Preview Troubleshooting</h2>
        
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Preview not updating?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Wait 2-3 seconds for automatic update</li>
                <li>• Click the refresh button if needed</li>
                <li>• Check your internet connection</li>
                <li>• Try switching to JSON view and back</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Visual selection not syncing?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Ensure you're clicking directly on the visual</li>
                <li>• Wait for the visual to highlight before checking panels</li>
                <li>• Some custom visuals may not support selection</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Focus mode not working?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Hover to reveal the focus icon</li>
                <li>• Click the icon, not the visual itself</li>
                <li>• Some visual types may not support focus mode</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Import & Export</h3>
        <p className="text-gray-600 mb-4">
          Learn how to import existing themes and export your creations for use in Power BI.
        </p>
        <a
          href="/docs/import-export"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Import & Export →
        </a>
      </div>
    </div>
  )
}