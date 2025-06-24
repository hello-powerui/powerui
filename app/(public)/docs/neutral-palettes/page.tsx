'use client'

import { Sparkles, Loader2, Plus } from 'lucide-react'

export default function NeutralPalettesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Neutral Palettes</h1>
        <p className="text-xl text-gray-600">
          AI-powered grayscale generation for consistent UI elements.
        </p>
      </div>

      {/* Understanding Neutral Palettes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Neutral Palettes</h2>
        <p className="text-gray-600 mb-4">
          Neutral palettes provide a consistent grayscale system for all non-data UI elements in your Power BI themes. 
          Unlike color palettes that highlight data, neutral palettes create the visual structure and hierarchy.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-3">Where Neutral Palettes Are Used:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Backgrounds and surfaces
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Borders and dividers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Text colors (primary, secondary, disabled)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Shadows and overlays
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Grid lines and axes
            </li>
          </ul>
        </div>
      </section>

      {/* The 12-Shade System */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The 12-Shade System</h2>
        <p className="text-gray-600 mb-6">
          Power UI uses a professional 12-shade system based on modern design standards:
        </p>
        
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 mb-4">
            {['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className="aspect-square rounded border border-gray-200 mb-1"
                  style={{ backgroundColor: shade === '25' ? '#FAFAFA' : shade === '950' ? '#0A0A0A' : `rgb(${255 - (parseInt(shade) / 950 * 255)}, ${255 - (parseInt(shade) / 950 * 255)}, ${255 - (parseInt(shade) / 950 * 255)})` }}
                />
                <span className="text-xs font-medium">{shade}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <div className="border-l-4 border-gray-200 pl-4">
              <h4 className="font-medium">Light Shades (25-100)</h4>
              <p className="text-sm text-gray-600">Backgrounds, subtle borders, hover states</p>
            </div>
            <div className="border-l-4 border-gray-400 pl-4">
              <h4 className="font-medium">Medium Shades (200-400)</h4>
              <p className="text-sm text-gray-600">Dividers, disabled elements, secondary UI</p>
            </div>
            <div className="border-l-4 border-gray-600 pl-4">
              <h4 className="font-medium">Base Shades (500-600)</h4>
              <p className="text-sm text-gray-600">Default borders, secondary text, icons</p>
            </div>
            <div className="border-l-4 border-gray-800 pl-4">
              <h4 className="font-medium">Dark Shades (700-950)</h4>
              <p className="text-sm text-gray-600">Primary text, strong borders, emphasis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creating a Neutral Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creating an AI-Generated Palette</h2>
        
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">AI-Powered Generation</h3>
            </div>
            <p className="text-sm text-purple-800">
              Our AI analyzes your base color and generates a complete 12-shade palette optimized for UI consistency.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Step-by-Step Guide:</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                <div>
                  <p className="font-medium mb-1">Open Palette Manager</p>
                  <p className="text-sm text-gray-600">In Foundation panel, find "Neutral Palette" and click "Manage Palettes"</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
                <div>
                  <p className="font-medium mb-1">Create New Palette</p>
                  <p className="text-sm text-gray-600">Click <Plus className="inline w-3 h-3" /> New palette</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
                <div>
                  <p className="font-medium mb-1">Name Your Palette</p>
                  <p className="text-sm text-gray-600">Enter a descriptive name (e.g., "Warm Gray", "Cool Neutral")</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">4</span>
                <div>
                  <p className="font-medium mb-1">Choose Base Color</p>
                  <p className="text-sm text-gray-600">Set a base color - typically a mid-gray like #6B7280</p>
                  <div className="mt-2 flex gap-2">
                    <div className="w-12 h-12 bg-gray-500 rounded border border-gray-300"></div>
                    <div className="flex items-center px-3 bg-gray-100 rounded text-sm font-mono">#6B7280</div>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">5</span>
                <div>
                  <p className="font-medium mb-1">Generate Scale</p>
                  <p className="text-sm text-gray-600">Click "Generate Scale" and AI creates all 12 shades</p>
                  <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm">
                    <Sparkles className="w-4 h-4" />
                    Generate Scale
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">6</span>
                <div>
                  <p className="font-medium mb-1">Review & Save</p>
                  <p className="text-sm text-gray-600">Preview the generated shades and click "Create"</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Types of Neutral Palettes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Types of Neutral Palettes</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">True Neutral</h3>
            <div className="flex gap-1 mb-3">
              {[100, 300, 500, 700, 900].map(shade => (
                <div key={shade} className="w-8 h-8 rounded" style={{ backgroundColor: `rgb(${255 - shade/950 * 255}, ${255 - shade/950 * 255}, ${255 - shade/950 * 255})` }} />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Pure grayscale without color tint. Professional and versatile.
            </p>
            <p className="text-xs text-gray-500 mt-2">Base: #6B7280</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Warm Gray</h3>
            <div className="flex gap-1 mb-3">
              {[100, 300, 500, 700, 900].map(shade => (
                <div key={shade} className="w-8 h-8 rounded" style={{ backgroundColor: `rgb(${255 - shade/950 * 250}, ${255 - shade/950 * 255}, ${255 - shade/950 * 260})` }} />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Slight red/yellow tint. Friendlier and more approachable.
            </p>
            <p className="text-xs text-gray-500 mt-2">Base: #78716C</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Cool Gray</h3>
            <div className="flex gap-1 mb-3">
              {[100, 300, 500, 700, 900].map(shade => (
                <div key={shade} className="w-8 h-8 rounded" style={{ backgroundColor: `rgb(${255 - shade/950 * 260}, ${255 - shade/950 * 255}, ${255 - shade/950 * 250})` }} />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Slight blue tint. Modern and professional appearance.
            </p>
            <p className="text-xs text-gray-500 mt-2">Base: #64748B</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Blue Gray</h3>
            <div className="flex gap-1 mb-3">
              {[100, 300, 500, 700, 900].map(shade => (
                <div key={shade} className="w-8 h-8 rounded" style={{ backgroundColor: `rgb(${255 - shade/950 * 270}, ${255 - shade/950 * 260}, ${255 - shade/950 * 240})` }} />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Stronger blue undertone. Tech-focused and contemporary.
            </p>
            <p className="text-xs text-gray-500 mt-2">Base: #475569</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How AI Generation Works</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <h4 className="font-medium">Color Analysis</h4>
                <p className="text-sm text-gray-600">AI analyzes the hue, saturation, and lightness of your base color</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <h4 className="font-medium">Curve Generation</h4>
                <p className="text-sm text-gray-600">Creates a smooth lightness curve maintaining the color's character</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <h4 className="font-medium">Contrast Optimization</h4>
                <p className="text-sm text-gray-600">Ensures proper contrast ratios between adjacent shades</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
              <div>
                <h4 className="font-medium">UI Mapping</h4>
                <p className="text-sm text-gray-600">Maps shades to appropriate UI elements automatically</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Choose the Right Temperature</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Warm grays: Consumer-friendly, approachable reports</li>
              <li>• Cool grays: Corporate, professional dashboards</li>
              <li>• True neutral: Maximum versatility</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Test in Both Modes</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Preview in light and dark theme modes</li>
              <li>• Ensure sufficient contrast in both</li>
              <li>• Check text readability at all levels</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Consistency is Key</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Use one neutral palette per theme</li>
              <li>• Avoid mixing different gray temperatures</li>
              <li>• Apply consistently across all visuals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Typography</h3>
        <p className="text-gray-600 mb-4">
          Learn how to set fonts and text styling for professional reports.
        </p>
        <a
          href="/docs/typography"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Typography →
        </a>
      </div>
    </div>
  )
}