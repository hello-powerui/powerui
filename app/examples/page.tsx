import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Power BI Dashboard Examples</h1>
        <p className="text-xl text-gray-600 mb-8">
          Browse our collection of professionally designed Power BI dashboards
        </p>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">Examples coming soon...</p>
          <Link 
            href="/"
            className="text-gray-900 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}