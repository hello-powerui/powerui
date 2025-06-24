'use client'

import { Type, AlignLeft, Heading1, CreditCard } from 'lucide-react'

export default function TypographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Typography</h1>
        <p className="text-xl text-gray-600">
          Control fonts and text styling throughout your Power BI reports.
        </p>
      </div>

      {/* Understanding Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Typography in Power BI Themes</h2>
        <p className="text-gray-600 mb-4">
          Typography settings control how text appears across all visuals in your reports. Consistent typography 
          improves readability and creates a professional appearance.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Typography Controls:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <Type className="w-4 h-4 mt-0.5 text-gray-400" />
              <span>Font family for all text elements</span>
            </li>
            <li className="flex items-start gap-2">
              <Heading1 className="w-4 h-4 mt-0.5 text-gray-400" />
              <span>Text class styling (titles, labels, values)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlignLeft className="w-4 h-4 mt-0.5 text-gray-400" />
              <span>Size and weight for different text types</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Font Family Selection */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Setting the Font Family</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Available Fonts:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">System Fonts</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li style={{ fontFamily: 'Arial' }}>• Arial - Clean, widely supported</li>
                  <li style={{ fontFamily: 'Calibri' }}>• Calibri - Modern, readable</li>
                  <li style={{ fontFamily: 'Segoe UI' }}>• Segoe UI - Windows standard</li>
                  <li style={{ fontFamily: 'Helvetica' }}>• Helvetica - Classic, professional</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Additional Options</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Times New Roman - Traditional</li>
                  <li>• Georgia - Elegant serif</li>
                  <li>• Verdana - Screen-optimized</li>
                  <li>• Tahoma - Compact, clear</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Choose fonts that are available on all target systems. Segoe UI and Arial are safe choices for most organizations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">How to Change Font Family:</h3>
            <ol className="space-y-3">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="text-gray-700">In the Foundation panel, locate the <strong>Typography</strong> section</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="text-gray-700">Click the <strong>Font Family</strong> dropdown</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="text-gray-700">Select your preferred font</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="text-gray-700">Preview updates immediately across all visuals</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Text Classes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Text Classes</h2>
        <p className="text-gray-600 mb-6">
          Power BI themes support three main text classes, each serving different purposes:
        </p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <Heading1 className="w-4 h-4" />
              <h3 className="font-semibold">Title</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Used for visual titles and report headers</p>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Example:</p>
                <p className="text-xl font-semibold">Sales Performance Dashboard</p>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-600">Customizable properties:</p>
                <ul className="text-sm text-gray-600 ml-4">
                  <li>• Font size (default: 12px)</li>
                  <li>• Font weight (light to bold)</li>
                  <li>• Color (inherits from structural colors)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <Type className="w-4 h-4" />
              <h3 className="font-semibold">Label</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Used for axis labels, data labels, and legend text</p>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Example:</p>
                <p className="text-sm">Q1 2024 • Revenue • Product Category</p>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-600">Customizable properties:</p>
                <ul className="text-sm text-gray-600 ml-4">
                  <li>• Font size (default: 10px)</li>
                  <li>• Font weight (typically regular)</li>
                  <li>• Color (adapts to context)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <h3 className="font-semibold">Callout Value</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Used for card visual values and KPI displays</p>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Example:</p>
                <p className="text-3xl font-bold">$1.2M</p>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-600">Customizable properties:</p>
                <ul className="text-sm text-gray-600 ml-4">
                  <li>• Font size (default: 45px)</li>
                  <li>• Font weight (typically bold)</li>
                  <li>• Color (often uses accent colors)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuring Text Classes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuring Text Classes</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Steps to Customize:</h3>
            <ol className="space-y-3">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="text-gray-700">In Foundation panel, expand <strong>Text Classes</strong> section</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="text-gray-700">Select the text class to modify (Title, Label, or Callout)</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="text-gray-700">Adjust font size using the number input</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="text-gray-700">Select font weight from the dropdown</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Font Weight Options:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="bg-white rounded p-2 text-center">Light (300)</div>
              <div className="bg-white rounded p-2 text-center font-medium">Regular (400)</div>
              <div className="bg-white rounded p-2 text-center font-semibold">Semibold (600)</div>
              <div className="bg-white rounded p-2 text-center font-bold">Bold (700)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creating Visual Hierarchy</h2>
        
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold mb-4">Recommended Size Ratios:</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold w-24">Title</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4"></div>
              <span className="text-sm text-gray-600">12-16px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-base w-24">Label</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3" style={{ width: '75%' }}></div>
              <span className="text-sm text-gray-600">9-11px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold w-24">Value</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6"></div>
              <span className="text-sm text-gray-600">28-45px</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Maintain clear size differences between text classes for better hierarchy and readability.
          </p>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Typography Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Readability First</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use minimum 9px for labels</li>
              <li>• Ensure contrast with backgrounds</li>
              <li>• Test at different zoom levels</li>
              <li>• Avoid decorative fonts</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Consistency Matters</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• One font family per theme</li>
              <li>• Limit font weights to 2-3</li>
              <li>• Maintain size hierarchy</li>
              <li>• Apply uniformly across visuals</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Performance Tips</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Use system fonts when possible</li>
              <li>• Avoid embedding custom fonts</li>
              <li>• Consider mobile viewing</li>
              <li>• Test on target devices</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Accessibility</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Minimum WCAG AA contrast</li>
              <li>• Avoid all-caps for body text</li>
              <li>• Use weight for emphasis</li>
              <li>• Consider dyslexia-friendly fonts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Light/Dark Mode</h3>
        <p className="text-gray-600 mb-4">
          Learn how to create themes that adapt beautifully to different viewing modes.
        </p>
        <a
          href="/docs/light-dark-mode"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Light/Dark Mode →
        </a>
      </div>
    </div>
  )
}