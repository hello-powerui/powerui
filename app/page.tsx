import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to PowerUI
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Professional Power BI Theme Generator
        </p>
        
        <div className="text-center">
          <p className="mb-8 text-lg">
            Create beautiful, consistent Power BI themes with our intuitive theme generator.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-lg"
            >
              Get Started
            </Link>
            <Link 
              href="/themes/studio"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-lg"
            >
              Theme Studio
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Custom Palettes</h3>
            <p className="text-gray-600">Create and save unlimited color palettes for your reports</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
            <p className="text-gray-600">Generate Power BI theme files with one click</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">Full Customization</h3>
            <p className="text-gray-600">Customize fonts, borders, and every visual element</p>
          </div>
        </div>
      </div>
    </main>
  )
}