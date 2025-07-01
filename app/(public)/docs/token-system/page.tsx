'use client'

import { Layers, Sun, Moon, Palette, ArrowRight, Zap } from 'lucide-react'

export default function TokenSystemPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">The Token System</h1>
        <p className="text-xl text-gray-600">
          Semantic color mapping that makes themes intelligent and adaptable.
        </p>
      </div>

      {/* Understanding Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Understanding Design Tokens</h2>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Design tokens are the secret to creating themes that are both powerful and maintainable. Instead of hard-coding specific colors throughout your theme, tokens create a semantic layer that describes the purpose of each color. This abstraction might seem like extra complexity at first, but it's what enables professional-grade themes that can adapt to different contexts without manual updates.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Think of tokens as meaningful names for design decisions. Rather than saying "make this border #E5E5E5," you say "make this border use border-color." The token system then determines what border-color means in different contexts—it might be gray-200 in light mode, gray-700 in dark mode, or even adapt based on the visual type or emphasis level. This semantic approach is why you can switch between radically different visual styles with a single click.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Power UI's token system goes beyond simple color mapping. It understands the relationships between different UI elements and ensures they work harmoniously together. When you change your neutral palette from cool gray to warm gray, every token that references those shades updates automatically while maintaining proper contrast ratios and visual hierarchy. This systematic approach eliminates the tedious work of manually updating hundreds of color properties across dozens of visual types.
        </p>
      </section>

      {/* Why Use Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why We Use a Token System</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Theme-Wide Consistency</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Power BI themes contain hundreds of color properties spread across different visual types. Without tokens, maintaining consistency is nearly impossible. Imagine manually ensuring that every border across tables, charts, cards, and slicers uses the exact same shade of gray. With tokens, you define "border-color" once, and it's automatically applied everywhere borders appear. Change the token definition, and every border updates instantly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Instant Mode Switching</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Light and dark modes aren't just about inverting colors—they require thoughtful adjustments to maintain readability and visual hierarchy. Tokens make this possible by mapping to different color values based on the active mode. A token like "text-primary" might map to gray-900 in light mode for dark text on light backgrounds, but switch to gray-100 in dark mode for light text on dark backgrounds. This intelligent mapping ensures your reports look professional in any lighting condition.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Brand Flexibility</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Organizations often need themes for different contexts—executive dashboards might use sophisticated blue-grays, while customer-facing reports use warmer, friendlier tones. With tokens, you can create these variations by simply swapping the underlying palettes. The semantic structure remains the same, ensuring that primary buttons, headers, and key metrics maintain their visual importance regardless of the color scheme.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Future-Proof Design</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              As Power BI evolves and adds new visual types or properties, a token-based theme can adapt without starting from scratch. New properties can reference existing tokens, automatically inheriting your design decisions. This forward compatibility means your investment in theme design continues to pay dividends as the platform grows.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How Tokens Work: Visual Examples</h2>
        
        {/* Example 1: Basic Token Mapping */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Basic Token Mapping</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <p className="text-sm font-medium">Token: <code className="bg-gray-200 px-2 py-1 rounded">border-color</code></p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Palette Color</p>
                  <div className="inline-flex items-center gap-2">
                    <div className="w-8 h-8 rounded border-2 border-gray-300" style={{ backgroundColor: '#D4D4D4' }} />
                    <code className="text-sm">gray-300</code>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Applied To</p>
                  <ul className="text-sm text-left inline-block">
                    <li>• Table borders</li>
                    <li>• Card outlines</li>
                    <li>• Visual dividers</li>
                    <li>• Input fields</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 2: Mode-Aware Tokens */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Mode-Aware Token Behavior</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-sm font-medium">Light Mode</p>
                <Sun className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">background</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white border border-gray-200 rounded" />
                    <span className="text-sm text-gray-600">white</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">text-primary</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-900 rounded" />
                    <span className="text-sm text-gray-600">gray-900</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">border-color</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                    <span className="text-sm text-gray-600">gray-300</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-700 bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <Moon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300">background</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-900 border border-gray-700 rounded" />
                    <span className="text-sm text-gray-400">gray-900</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300">text-primary</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded" />
                    <span className="text-sm text-gray-400">gray-100</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300">border-color</code>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-700 rounded" />
                    <span className="text-sm text-gray-400">gray-700</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 3: Token Inheritance */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Token Inheritance & Relationships</h3>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">When you change your base palette...</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cool Gray</p>
                    <div className="flex gap-1">
                      {['#F8FAFC', '#E2E8F0', '#94A3B8', '#475569', '#0F172A'].map((color, i) => (
                        <div key={i} className="w-8 h-8 rounded" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Warm Gray</p>
                    <div className="flex gap-1">
                      {['#FAFAF9', '#E7E5E4', '#A8A29E', '#57534E', '#1C1917'].map((color, i) => (
                        <div key={i} className="w-8 h-8 rounded" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">All tokens automatically update...</p>
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-xs">surface-1</code>
                    <div className="mt-2 h-6 rounded bg-gradient-to-r from-slate-50 to-stone-50" />
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-xs">border-subtle</code>
                    <div className="mt-2 h-6 rounded bg-gradient-to-r from-slate-200 to-stone-200" />
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-xs">text-secondary</code>
                    <div className="mt-2 h-6 rounded bg-gradient-to-r from-slate-600 to-stone-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Token Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Token Categories</h2>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          Power UI organizes tokens into logical categories that map to how designers think about visual hierarchy. Understanding these categories helps you customize themes effectively and create your own token mappings when needed.
        </p>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Surface Tokens
            </h3>
            <p className="text-gray-700 mb-3 text-sm">
              Define the layering system for backgrounds and cards
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <code className="text-xs text-gray-600">surface-canvas</code>
                <div className="mt-1 h-12 bg-gray-50 rounded border border-gray-200" />
              </div>
              <div>
                <code className="text-xs text-gray-600">surface-1</code>
                <div className="mt-1 h-12 bg-white rounded border border-gray-200" />
              </div>
              <div>
                <code className="text-xs text-gray-600">surface-2</code>
                <div className="mt-1 h-12 bg-gray-50 rounded border border-gray-200" />
              </div>
              <div>
                <code className="text-xs text-gray-600">surface-3</code>
                <div className="mt-1 h-12 bg-gray-100 rounded border border-gray-200" />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Text Hierarchy Tokens</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Establish clear content hierarchy through text colors
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-sm">text-primary</code>
                <span className="text-gray-900 font-medium">Primary content and headers</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">text-secondary</code>
                <span className="text-gray-600">Supporting content and labels</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">text-tertiary</code>
                <span className="text-gray-400">Subtle hints and metadata</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm">text-disabled</code>
                <span className="text-gray-300">Inactive or unavailable content</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Interactive State Tokens</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Provide consistent feedback for user interactions
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Standard States</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><code className="text-xs bg-gray-100 px-1 rounded">hover-overlay</code> - Subtle hover indication</li>
                  <li><code className="text-xs bg-gray-100 px-1 rounded">active-overlay</code> - Pressed/active state</li>
                  <li><code className="text-xs bg-gray-100 px-1 rounded">selected-border</code> - Selection emphasis</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Focus States</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><code className="text-xs bg-gray-100 px-1 rounded">focus-ring</code> - Keyboard focus indicator</li>
                  <li><code className="text-xs bg-gray-100 px-1 rounded">focus-background</code> - Focused item background</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Switching */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Light & Dark Mode with Tokens</h2>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          The token system is what makes instant mode switching possible. Each token knows how to adapt its color value based on the current mode, ensuring your reports maintain readability and visual hierarchy whether viewed in a bright office or on a dashboard in a dimly lit operations center.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">How Mode Switching Works</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <p className="font-medium mb-1">Toggle Theme Mode</p>
                <p className="text-sm text-gray-600">Click the theme mode toggle in the Foundation panel</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <p className="font-medium mb-1">Tokens Recalculate</p>
                <p className="text-sm text-gray-600">Each token updates its color value based on the new mode</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <p className="font-medium mb-1">Theme Updates Globally</p>
                <p className="text-sm text-gray-600">All visuals instantly reflect the new color mappings</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> The exported Power BI theme file will contain the color values for the currently active mode. Power BI itself doesn't support dynamic mode switching—you'll need to export separate theme files for light and dark modes if you need both.
          </p>
        </div>
      </section>

      {/* Customizing Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Customizing Token Mappings</h2>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          While Power UI provides intelligent default token mappings, you have full control to customize how tokens map to colors. This flexibility lets you create unique visual treatments while maintaining the benefits of the token system.
        </p>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Advanced Token Features
          </h3>
          <ul className="space-y-3 text-purple-800">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <div>
                <strong>Visual-Specific Tokens:</strong> Different visuals can use different token mappings. For example, tables might use subtle borders while cards use stronger ones.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <div>
                <strong>Conditional Tokens:</strong> Tokens can adapt based on context, such as using higher contrast for small text or reducing contrast for large background areas.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <div>
                <strong>Brand Tokens:</strong> Create custom tokens for brand-specific elements that remain consistent regardless of theme variations.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Token System Best Practices</h2>
        
        <h3 className="text-lg font-semibold mb-3 mt-6">Respect the Semantic Layer</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The power of tokens comes from their semantic meaning. When customizing token mappings, maintain the intended purpose—don't map text-primary to a light color just because you prefer it. Instead, adjust your palette or create new tokens that better express your design intent while preserving the logical structure.
        </p>

        <h3 className="text-lg font-semibold mb-3 mt-6">Test Across Contexts</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Tokens affect multiple visual types and properties. When adjusting a token mapping, preview your changes across different visuals—tables, charts, cards, and slicers. What works beautifully for one visual type might create problems in another. The preview panel is your best friend for catching these issues early.
        </p>

        <h3 className="text-lg font-semibold mb-3 mt-6">Document Custom Tokens</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          If you create custom tokens or significantly modify default mappings, document these changes. Future theme maintainers (including yourself) will appreciate understanding why certain tokens map to unexpected colors. This documentation is especially important for team environments where multiple people might work with the theme.
        </p>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Typography</h3>
        <p className="text-gray-600 mb-4">
          Learn how to configure fonts and text styling to complete your professional theme.
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