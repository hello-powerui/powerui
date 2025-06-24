'use client'

import { Sun, Moon, Monitor, Palette } from 'lucide-react'

export default function LightDarkModePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Light & Dark Mode</h1>
        <p className="text-xl text-gray-600">
          Create themes that adapt beautifully to any lighting environment.
        </p>
      </div>

      {/* Understanding Theme Modes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Theme Modes</h2>
        <p className="text-gray-600 mb-6">
          Power UI's theme mode system allows you to create themes that work perfectly in both light and dark environments. 
          Colors automatically adjust to maintain readability and visual hierarchy.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Light Mode</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Dark text on light backgrounds</li>
              <li>• Ideal for bright environments</li>
              <li>• Traditional report appearance</li>
              <li>• Better for printing</li>
            </ul>
          </div>

          <div className="border border-gray-800 bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">Dark Mode</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Light text on dark backgrounds</li>
              <li>• Reduces eye strain in dim settings</li>
              <li>• Modern, sophisticated look</li>
              <li>• Energy-efficient on OLED displays</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Toggle Modes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Toggling Theme Mode</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <p className="font-medium mb-1">Locate Theme Mode Toggle</p>
                <p className="text-sm text-gray-600">In the Foundation panel, find the "Theme Mode" section</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <p className="font-medium mb-1">Click to Switch</p>
                <p className="text-sm text-gray-600">Toggle between Light and Dark modes</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <p className="font-medium mb-1">Preview Updates</p>
                <p className="text-sm text-gray-600">Watch colors adapt in real-time in the preview</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> The exported theme will include the mode that's currently active. Power BI doesn't support dynamic mode switching.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Automatic Color Adaptation</h2>
        <p className="text-gray-600 mb-6">
          When you switch modes, Power UI intelligently adjusts colors to maintain optimal contrast and readability:
        </p>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Structural Colors</h3>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Light Mode</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white border border-gray-300 rounded"></div>
                      <span className="text-sm">Background: White</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-900 rounded"></div>
                      <span className="text-sm">Foreground: Black</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Dark Mode</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-900 border border-gray-700 rounded"></div>
                      <span className="text-sm">Background: Dark Gray</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <span className="text-sm">Foreground: White</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Neutral Palette Usage</h3>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Light Mode Mapping</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Shade 25-100: Backgrounds</li>
                    <li>• Shade 200-400: Borders</li>
                    <li>• Shade 700-950: Text</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Dark Mode Mapping</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Shade 800-950: Backgrounds</li>
                    <li>• Shade 600-700: Borders</li>
                    <li>• Shade 25-200: Text</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Data Colors</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Data colors may shift slightly in dark mode to maintain sufficient contrast against dark backgrounds.
              </p>
              <div className="flex gap-2">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded mb-1"></div>
                  <span className="text-xs">Light</span>
                </div>
                <div className="flex items-center">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-400 rounded mb-1"></div>
                  <span className="text-xs">Dark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode-Specific Customization */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Mode-Specific Customization</h2>
        <p className="text-gray-600 mb-6">
          Some properties can have different values for light and dark modes:
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold mb-3">How to Customize per Mode:</h3>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="text-purple-600">1.</span>
              <p className="text-purple-800">Set your theme to light mode and configure properties</p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600">2.</span>
              <p className="text-purple-800">Switch to dark mode</p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600">3.</span>
              <p className="text-purple-800">Adjust any properties that don't work well in dark mode</p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600">4.</span>
              <p className="text-purple-800">The theme remembers both sets of values</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Design Considerations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design Considerations</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Light Mode Design</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Sun className="w-4 h-4 mt-0.5 text-yellow-500" />
                <span className="text-sm">Use subtle shadows for depth</span>
              </li>
              <li className="flex items-start gap-2">
                <Sun className="w-4 h-4 mt-0.5 text-yellow-500" />
                <span className="text-sm">Light gray borders work well</span>
              </li>
              <li className="flex items-start gap-2">
                <Sun className="w-4 h-4 mt-0.5 text-yellow-500" />
                <span className="text-sm">Maintain high contrast for text</span>
              </li>
              <li className="flex items-start gap-2">
                <Sun className="w-4 h-4 mt-0.5 text-yellow-500" />
                <span className="text-sm">Use white space effectively</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Dark Mode Design</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Moon className="w-4 h-4 mt-0.5 text-blue-500" />
                <span className="text-sm">Avoid pure black backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <Moon className="w-4 h-4 mt-0.5 text-blue-500" />
                <span className="text-sm">Use subtle highlights for depth</span>
              </li>
              <li className="flex items-start gap-2">
                <Moon className="w-4 h-4 mt-0.5 text-blue-500" />
                <span className="text-sm">Reduce color saturation slightly</span>
              </li>
              <li className="flex items-start gap-2">
                <Moon className="w-4 h-4 mt-0.5 text-blue-500" />
                <span className="text-sm">Ensure sufficient but not harsh contrast</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testing Your Theme */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Testing in Both Modes</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Testing Checklist:</h3>
          <div className="space-y-3">
            {[
              'Text readability on all backgrounds',
              'Data color visibility and differentiation',
              'Border and divider visibility',
              'Interactive states (hover, selection)',
              'Chart gridlines and axes',
              'Legend and tooltip contrast',
              'Card visual values',
              'Table alternating rows'
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-3 text-gray-700">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Start with Light Mode</h4>
            <p className="text-sm text-blue-800">
              Design your theme in light mode first, then switch to dark mode and make adjustments. 
              This ensures both modes are well-optimized.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Consider the Context</h4>
            <p className="text-sm text-green-800">
              Think about where reports will be viewed. Office environments typically use light mode, 
              while dashboards on large screens may benefit from dark mode.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Test Real Content</h4>
            <p className="text-sm text-purple-800">
              Preview with actual data densities and visual types. What works for simple charts 
              may need adjustment for complex tables or matrices.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Document Mode Usage</h4>
            <p className="text-sm text-orange-800">
              When sharing themes, indicate which mode was primarily designed for and tested with. 
              Include any mode-specific considerations.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Visual Styles & Variants</h3>
        <p className="text-gray-600 mb-4">
          Discover Power UI's exclusive feature - creating multiple style variations for each visual type.
        </p>
        <a
          href="/docs/visual-variants"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Visual Styles & Variants →
        </a>
      </div>
    </div>
  )
}