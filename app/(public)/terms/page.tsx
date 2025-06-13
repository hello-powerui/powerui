import Link from 'next/link'


export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 mb-4">Terms of service content coming soon...</p>
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