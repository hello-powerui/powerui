'use client'

import { Sparkles, Loader2, Plus } from 'lucide-react'

export default function NeutralPalettesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Neutral Palettes</h1>
        <p className="text-xl text-gray-600">
          Professional grayscale systems for consistent UI elements.
        </p>
      </div>

      {/* Understanding Neutral Palettes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Neutral Palettes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Neutral palettes provide a consistent grayscale system for all non-data UI elements in your Power BI themes. 
          Unlike color palettes that highlight data, neutral palettes create the visual structure and hierarchy.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Why do we need a dedicated neutral palette system? The answer lies in the complexity of modern data visualization. Power BI themes contain hundreds of color properties across dozens of visual types—backgrounds, borders, gridlines, text at various levels, shadows, and subtle UI elements. Without a systematic approach, you'd need to manually specify gray values for each property, inevitably leading to inconsistencies where one visual uses #E5E5E5 for borders while another uses #D4D4D4, creating a disjointed appearance.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          A neutral palette solves this by providing a single source of truth for all grayscale values in your theme. When you select a 12-shade neutral palette, Power UI automatically maps these shades to appropriate uses: lighter shades for backgrounds and subtle dividers, mid-tones for secondary text and borders, and darker shades for primary text and emphasis. This systematic approach ensures that every visual in your report shares the same grayscale foundation, creating visual coherence that makes your data easier to process.
        </p>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          Beyond consistency, neutral palettes enable powerful theme flexibility. Want to switch from a light theme to a dark theme? With a properly structured neutral palette, it's a one-click operation. Need to adjust the overall contrast for accessibility? The entire theme updates harmoniously. This abstraction layer between raw color values and their semantic uses is what separates professional themes from amateur ones—and it's why every serious design system, from Material Design to Apple's Human Interface Guidelines, relies on structured neutral palettes.
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
        <h2 className="text-2xl font-semibold mb-4">Creating a Neutral Palette</h2>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Power UI's neutral palette generation system uses advanced color science to create perfectly balanced grayscale systems. Unlike simple mathematical interpolation, our system understands the nuances of human color perception and creates palettes that feel natural and harmonious across all shades.
        </p>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          The system analyzes your chosen base color to extract its underlying tone and temperature, then generates a complete 12-shade scale that maintains these characteristics throughout the range. Each shade is carefully calibrated to ensure optimal contrast ratios for text readability, proper visual hierarchy, and consistent appearance across different screen types. The result is a neutral palette that feels cohesive and professional, whether you're viewing it on a high-end monitor or a standard laptop display.
        </p>
        
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Intelligent Color Mapping</h3>
            </div>
            <p className="text-sm text-purple-800">
              Our system automatically maps each generated shade to appropriate UI elements based on accessibility standards and design best practices, ensuring your themes are both beautiful and functional.
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
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          The base shade you choose for your neutral palette fundamentally changes how your entire report feels. Even subtle variations in tone can dramatically impact user perception—transforming a cold, clinical dashboard into something warm and inviting, or elevating a basic report into something that feels cutting-edge and sophisticated. Understanding these nuances helps you choose the right palette for your audience and context.
        </p>
        
        <div className="space-y-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">True Neutral</h3>
            <div className="grid grid-cols-12 gap-1 mb-4">
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#FAFAFA' }} />
                <span className="text-xs mt-1 block">25</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F5F5F5' }} />
                <span className="text-xs mt-1 block">50</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#E5E5E5' }} />
                <span className="text-xs mt-1 block">100</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#D4D4D4' }} />
                <span className="text-xs mt-1 block">200</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#A3A3A3' }} />
                <span className="text-xs mt-1 block">300</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#737373' }} />
                <span className="text-xs mt-1 block">400</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#525252' }} />
                <span className="text-xs mt-1 block">500</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#404040' }} />
                <span className="text-xs mt-1 block">600</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#262626' }} />
                <span className="text-xs mt-1 block">700</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#171717' }} />
                <span className="text-xs mt-1 block">800</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#0A0A0A' }} />
                <span className="text-xs mt-1 block">900</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#050505' }} />
                <span className="text-xs mt-1 block">950</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Pure grayscale without any color tint creates maximum versatility and objectivity. This palette works seamlessly with any color scheme and is ideal for financial reports, analytics dashboards, or any context where neutrality and professionalism are paramount. The lack of color bias ensures your data colors remain true and uninfluenced.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Warm Gray</h3>
            <div className="grid grid-cols-12 gap-1 mb-4">
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#FAFAF9' }} />
                <span className="text-xs mt-1 block">25</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F5F5F4' }} />
                <span className="text-xs mt-1 block">50</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#E7E5E4' }} />
                <span className="text-xs mt-1 block">100</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#D6D3D1' }} />
                <span className="text-xs mt-1 block">200</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#A8A29E' }} />
                <span className="text-xs mt-1 block">300</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#78716C' }} />
                <span className="text-xs mt-1 block">400</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#57534E' }} />
                <span className="text-xs mt-1 block">500</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#44403C' }} />
                <span className="text-xs mt-1 block">600</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#292524' }} />
                <span className="text-xs mt-1 block">700</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#1C1917' }} />
                <span className="text-xs mt-1 block">800</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#0C0A09' }} />
                <span className="text-xs mt-1 block">900</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#080605' }} />
                <span className="text-xs mt-1 block">950</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Warm grays contain subtle hints of red and yellow, creating a friendlier, more approachable feeling. This palette is perfect for customer-facing dashboards, retail analytics, or any report where you want to reduce the corporate coldness often associated with data. The warmth makes extended viewing more comfortable and creates a subtle psychological connection with viewers.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Cool Gray</h3>
            <div className="grid grid-cols-12 gap-1 mb-4">
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F8FAFC' }} />
                <span className="text-xs mt-1 block">25</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F1F5F9' }} />
                <span className="text-xs mt-1 block">50</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#E2E8F0' }} />
                <span className="text-xs mt-1 block">100</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#CBD5E1' }} />
                <span className="text-xs mt-1 block">200</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#94A3B8' }} />
                <span className="text-xs mt-1 block">300</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#64748B' }} />
                <span className="text-xs mt-1 block">400</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#475569' }} />
                <span className="text-xs mt-1 block">500</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#334155' }} />
                <span className="text-xs mt-1 block">600</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#1E293B' }} />
                <span className="text-xs mt-1 block">700</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#0F172A' }} />
                <span className="text-xs mt-1 block">800</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#020617' }} />
                <span className="text-xs mt-1 block">900</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#010409' }} />
                <span className="text-xs mt-1 block">950</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Cool grays with blue undertones convey modernity, technology, and precision. This palette is ideal for IT dashboards, SaaS analytics, or any report targeting a tech-savvy audience. The cool tones create a sense of innovation and forward-thinking while maintaining professional credibility. They pair exceptionally well with bright accent colors.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Green Gray</h3>
            <div className="grid grid-cols-12 gap-1 mb-4">
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F9FAF9' }} />
                <span className="text-xs mt-1 block">25</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#F3F5F3' }} />
                <span className="text-xs mt-1 block">50</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#E5E9E5' }} />
                <span className="text-xs mt-1 block">100</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#CDD4CD' }} />
                <span className="text-xs mt-1 block">200</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#9BA79B' }} />
                <span className="text-xs mt-1 block">300</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#6B7A6B' }} />
                <span className="text-xs mt-1 block">400</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#4F5E4F' }} />
                <span className="text-xs mt-1 block">500</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#3D493D' }} />
                <span className="text-xs mt-1 block">600</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#283128' }} />
                <span className="text-xs mt-1 block">700</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#1A201A' }} />
                <span className="text-xs mt-1 block">800</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#0D110D' }} />
                <span className="text-xs mt-1 block">900</span>
              </div>
              <div className="text-center">
                <div className="h-12 rounded" style={{ backgroundColor: '#070907' }} />
                <span className="text-xs mt-1 block">950</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Green grays bring a natural, organic quality to your reports. This palette is ideal for environmental dashboards, sustainability reports, or any context where you want to convey growth, balance, and harmony. The subtle green undertones create a calming effect that reduces visual fatigue during extended viewing sessions while maintaining professional credibility.
            </p>
          </div>
        </div>
      </section>

      {/* Introducing Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Beyond Palettes: Introduction to Tokens</h2>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          While our palette system provides the raw colors for your theme, Power UI goes a step further with our token system. Tokens are semantic color assignments that automatically map your palette colors to specific UI elements throughout Power BI. Instead of manually assigning "gray-300" to every border in your theme, tokens let you define semantic relationships like "border-color" that automatically update when you change palettes.
        </p>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          This abstraction layer is what makes Power UI themes truly powerful. When you switch from a warm gray to a cool gray palette, all your borders, backgrounds, and text colors update automatically while maintaining proper contrast and hierarchy. In the next section, we'll explore how tokens work and how you can customize them to create themes that are both beautiful and maintainable.
        </p>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: The Token System</h3>
        <p className="text-gray-600 mb-4">
          Dive deeper into how tokens create intelligent, adaptable themes.
        </p>
        <a
          href="/docs/token-system"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Token System →
        </a>
      </div>
    </div>
  )
}