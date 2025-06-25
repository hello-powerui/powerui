'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Palette, Layers, Eye, Droplet, Sun, Moon, Copy, Check, ChevronRight, Clock, Calendar, BookOpen, AlertCircle } from 'lucide-react'

export default function BlogContent() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2024
            </time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              13 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Power BI Color Design: Strategic Use of Color and Visual Polish
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Color is one of the most powerful tools in visual design. When used thoughtfully, it helps create 
            structure, hierarchy, and guides user attention. Learn how to master color in Power BI, from the 
            foundational role of gray to advanced shadow techniques.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Color Theory', 'Visual Design', 'Power BI', 'Dashboard Polish', 'Gray Palettes'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              What You'll Learn
            </h2>
            <nav className="space-y-2">
              <a href="#color-fundamentals" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Color theory fundamentals for dashboards
              </a>
              <a href="#less-is-more" className="block text-gray-600 hover:text-gray-900 transition-colors">
                The "less is more" approach to color
              </a>
              <a href="#power-of-gray" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Why gray is your most important color
              </a>
              <a href="#theme-colors" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Theme colors vs. color picker best practices
              </a>
              <a href="#visual-polish" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Shadow implementation and visual polish
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Color Fundamentals */}
          <section id="color-fundamentals" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Color Theory Fundamentals</h2>
            
            <p className="text-gray-700 mb-6">
              Color is one of the most powerful tools in visual and data visualization design. It enhances 
              aesthetic appeal and plays a crucial role in conveying information and guiding user attention. 
              When used thoughtfully, color helps create structure and hierarchy.
            </p>

            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-blue-600" />
                The Dual Role of Color
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Functional Purpose</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Identify important data points</li>
                    <li>• Show relationships between elements</li>
                    <li>• Create visual hierarchy</li>
                    <li>• Guide user attention</li>
                  </ul>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Emotional Impact</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Evoke specific emotions</li>
                    <li>• Shape data perception</li>
                    <li>• Make complex info digestible</li>
                    <li>• Build brand connection</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Warning:</strong> Improper use of color can cause confusion, overwhelm users, or lead 
                  to misinterpretation of data. In data visualization, clarity and accuracy are paramount.
                </p>
              </div>
            </div>
          </section>

          {/* Less is More */}
          <section id="less-is-more" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Less is More with Color</h2>
            
            <p className="text-gray-700 mb-6">
              Overloading your report with bold colors, excessive labels, or unnecessary elements distracts users 
              from the data itself. By keeping color choices subtle, you allow the most important elements to 
              stand out without overwhelming the user.
            </p>

            {/* Visual Chaos Example */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Avoiding Visual Chaos
              </h3>
              
              <p className="text-gray-700 mb-4">
                Overloading a dashboard with too many colors creates visual chaos. This makes it difficult for 
                users to interpret data and understand key messages.
              </p>
              
              <div className="bg-red-50 rounded p-4 mb-4">
                <h4 className="font-medium mb-2">Guidelines for Color Restraint:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limit your palette to 5-7 colors maximum</li>
                  <li>• Use neutral colors (grays) for 80% of your design</li>
                  <li>• Reserve bright colors for highlighting critical information</li>
                  <li>• Ensure each color serves a specific function</li>
                  <li>• Test your design in grayscale to verify hierarchy works without color</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Pro Tip:</strong> If you can't explain why you're using a particular color, you 
                  probably don't need it.
                </p>
              </div>
            </div>

            {/* Background Colors */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Canvas Backgrounds</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Should be subtle and neutral. Light or muted backgrounds create contrast with vibrant data 
                  colors without competing for attention.
                </p>
                <div className="h-20 bg-gradient-to-b from-gray-50 to-white rounded border"></div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Visual Backgrounds</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Use sparingly and ensure they complement the overall design. Avoid bold or saturated colors 
                  that distract from data.
                </p>
                <div className="h-20 bg-white rounded border border-gray-200"></div>
              </div>
            </div>
          </section>

          {/* Power of Gray */}
          <section id="power-of-gray" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">The Power of Gray</h2>
            
            <p className="text-gray-700 mb-6">
              Gray is the most important color in your design palette. It serves as the backbone of professional 
              design, providing balance and contrast without overpowering other elements.
            </p>

            {/* Gray's Role */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Gray's Foundational Role</h3>
              
              <p className="text-gray-700 mb-4">
                Gray is used for nearly all components:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2">UI Elements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Background colors and surfaces</li>
                    <li>• Borders and dividers</li>
                    <li>• Text and labels</li>
                    <li>• Shadows and subtle effects</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2">Creating Hierarchy</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lighter grays: De-emphasize less important</li>
                    <li>• Darker grays: Add weight and emphasis</li>
                    <li>• Medium grays: Provide structure</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gray Palette Examples */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Default Power BI Gray Palette Issues</h3>
              
              <p className="text-gray-700 mb-4">
                The default Power BI color palette includes 8 shades of gray, but there are nuances:
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-red-600">❌</span>
                  <span>Overlapping brightness levels in some shades</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">❌</span>
                  <span>Inconsistent progression from white to black</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600">❌</span>
                  <span>Confusing layout that makes consistent application difficult</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded p-4">
                <h4 className="font-medium mb-2">Solution: Expanded Gray Palette</h4>
                <p className="text-green-800 text-sm">
                  Using more shades of gray (10-15) allows for greater flexibility and contrast. This gives you 
                  more control over subtle distinctions between elements.
                </p>
              </div>
            </div>

            {/* Gray Types */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Gray Doesn't Have to Be Neutral</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-orange-800">Warm Grays</h4>
                  <div className="h-20 bg-gradient-to-b from-gray-100 to-gray-200 rounded mb-2" style={{backgroundColor: '#F5F3F0'}}></div>
                  <p className="text-sm">
                    Hints of red, yellow, or brown create cozy, approachable feel
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-blue-800">Cool Grays</h4>
                  <div className="h-20 bg-gradient-to-b from-gray-100 to-gray-200 rounded mb-2" style={{backgroundColor: '#E8EAED'}}></div>
                  <p className="text-sm">
                    Blue or green undertones create modern, professional appearance
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 text-purple-800">Tinted Grays</h4>
                  <div className="h-20 bg-gradient-to-b from-gray-100 to-gray-200 rounded mb-2" style={{backgroundColor: '#ECEAF2'}}></div>
                  <p className="text-sm">
                    Hints of purple, teal give unique edge while maintaining neutrality
                  </p>
                </div>
              </div>
            </div>

            {/* Gray Implementation Example */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 text-white">
              <h3 className="text-white font-semibold mb-4">Gray Hierarchy Implementation</h3>
              <pre className="text-gray-300 text-sm overflow-x-auto">
                <code>{`// Example gray palette implementation
{
  "text": {
    "primary": "#171717",      // Titles
    "secondary": "#454545",    // Subtitles  
    "tertiary": "#5C5C5C",     // Axis labels
    "disabled": "#B3B3B3"      // Inactive elements
  },
  "borders": {
    "primary": "#ABABAB",      // Main dividers
    "secondary": "#C7C7C7",    // Subtle separations
    "light": "#E3E3E3"         // Background separations
  },
  "backgrounds": {
    "primary": "#FFFFFF",      // Main content
    "secondary": "#F1F1F1",    // Section backgrounds
    "tertiary": "#E3E3E3"      // Subtle variations
  }
}`}</code>
              </pre>
              <button
                onClick={() => copyCode(`{
  "text": {
    "primary": "#171717",
    "secondary": "#454545",
    "tertiary": "#5C5C5C",
    "disabled": "#B3B3B3"
  },
  "borders": {
    "primary": "#ABABAB",
    "secondary": "#C7C7C7",
    "light": "#E3E3E3"
  },
  "backgrounds": {
    "primary": "#FFFFFF",
    "secondary": "#F1F1F1",
    "tertiary": "#E3E3E3"
  }
}`, "gray-palette")}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                {copiedCode === 'gray-palette' ? 
                  <Check className="w-4 h-4" /> : 
                  <Copy className="w-4 h-4" />
                }
                Copy Code
              </button>
            </div>
          </section>

          {/* Theme Colors vs Color Picker */}
          <section id="theme-colors" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Theme Colors vs. Color Picker</h2>
            
            <p className="text-gray-700 mb-6">
              Understanding Power BI's color system is crucial for maintaining design consistency. The distinction 
              between theme colors and custom colors has significant implications for your workflow.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Theme Color Advantages
                </h3>
                <p className="text-gray-700 mb-3">
                  Power BI generates five different shades of your selected colors automatically.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Updates globally when theme changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Maintains consistency across reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Automatic shade generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Professional color relationships</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Color Picker Limitations
                </h3>
                <p className="text-gray-700 mb-3">
                  Custom colors selected with the color picker won't change with theme updates.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✗</span>
                    <span>Locks in HEX code permanently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✗</span>
                    <span>Breaks connection to theme system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✗</span>
                    <span>Requires manual updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✗</span>
                    <span>Creates maintenance overhead</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Example Scenario */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-3">Example Scenario</h3>
              <p className="text-gray-700 mb-3">
                If you set a bar chart to theme color 2 at 60% lighter, it will reference the new theme color 2 
                at 60% lighter when the theme changes. This automatic updating ensures consistency.
              </p>
              <div className="bg-white rounded p-4">
                <p className="text-sm text-blue-800">
                  <strong>Best Practice:</strong> Use predefined theme colors rather than the color picker. This 
                  ensures your colors remain consistent when you update your theme file later.
                </p>
              </div>
            </div>

            {/* State Colors */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">State Color Implementation</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-16 bg-green-600 rounded mb-2"></div>
                  <p className="font-medium text-sm">Success</p>
                  <p className="text-xs text-gray-600">Positive metrics</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-yellow-500 rounded mb-2"></div>
                  <p className="font-medium text-sm">Warning</p>
                  <p className="text-xs text-gray-600">Caution needed</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-red-600 rounded mb-2"></div>
                  <p className="font-medium text-sm">Error</p>
                  <p className="text-xs text-gray-600">Critical issues</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-blue-600 rounded mb-2"></div>
                  <p className="font-medium text-sm">Information</p>
                  <p className="text-xs text-gray-600">Neutral info</p>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Polish */}
          <section id="visual-polish" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Visual Polish Techniques</h2>
            
            {/* Shadow Implementation */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-600" />
                Shadow Implementation
              </h3>
              
              <p className="text-gray-700 mb-4">
                Shadows add depth and dimension to your dashboards, but they must be applied carefully.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Common Shadow Problems:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Default Power BI shadows are too harsh</li>
                    <li>• Overly prominent shadows look unprofessional</li>
                    <li>• Shadows that don't match background color</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Professional Shadow Guidelines:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Keep shadows soft and subtle</li>
                    <li>• Match shadow color to background</li>
                    <li>• Use shadows to add depth, not draw attention</li>
                    <li>• Ensure shadows enhance rather than distract</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/80 rounded p-4">
                <h4 className="font-medium mb-3">Recommended Shadow Settings:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Blur:</span>
                      <span className="font-mono">8px (not 10px default)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance:</span>
                      <span className="font-mono">4px (not 10px default)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Angle:</span>
                      <span className="font-mono">90° (not 45° default)</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transparency:</span>
                      <span className="font-mono">70%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-mono">1px (not 3px default)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Backgrounds */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-600" />
                  Light Background Benefits
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• Better for detailed analysis</li>
                  <li>• Easier to read in bright environments</li>
                  <li>• Traditional, familiar appearance</li>
                  <li>• Better for printing</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-900 text-white">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-purple-400" />
                  Dark Background Benefits
                </h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>• Reduces eye strain in low light</li>
                  <li>• Makes elements stand out</li>
                  <li>• Adds sophistication</li>
                  <li>• Draws attention to key info</li>
                </ul>
              </div>
            </div>

            {/* Custom Backgrounds Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Custom Background Images (Not Recommended)
              </h3>
              
              <p className="text-gray-700 mb-4">
                A trend involves creating custom images in external tools (Canva, PowerPoint, Figma) as canvas 
                backgrounds. While this can create attractive gradients, it's generally not recommended.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Problems with Custom Backgrounds:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Lack of flexibility:</strong> Difficult to update or adjust</li>
                    <li>• <strong>Scalability issues:</strong> May not scale properly on different screens</li>
                    <li>• <strong>Over-reliance on external tools:</strong> Prevents mastering native Power BI</li>
                  </ul>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Alternative Approaches:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Use Power BI's built-in shape tools</li>
                    <li>• Apply gradients through overlapping transparent shapes</li>
                    <li>• Leverage theme files for consistent backgrounds</li>
                    <li>• Focus on mastering native design capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Use color sparingly and strategically to avoid overwhelming users</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Gray is your most important color—use it systematically for hierarchy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Maintain consistency in data colors across all visuals in your report</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Choose theme colors over custom color picker selections for scalability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Apply shadows subtly to enhance depth without distraction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Avoid custom background images in favor of native Power BI design capabilities</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Master Color in Power BI?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Create professional color palettes and apply strategic color design to your dashboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/themes/studio"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Try Color Palette Generator
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog/power-bi-clarity-efficiency"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue to Clarity & Efficiency
                </Link>
              </div>
            </div>
          </section>

          {/* Next in Series */}
          <section>
            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Next in the series</h3>
                  <p className="text-gray-600 text-sm">Power BI Clarity and Efficiency: Data-to-Ink Ratio and Smart Design</p>
                </div>
                <Link
                  href="/blog/power-bi-clarity-efficiency"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Reading
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold">Power UI Team</h3>
              <p className="text-gray-600 mb-2">
                Helping data professionals create beautiful, effective Power BI dashboards through better design.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}