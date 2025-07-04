import Link from 'next/link'

export default function ContactSalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact Sales</h1>
        <p className="text-xl text-gray-600 mb-8">
          Let&apos;s discuss how Power UI can help your organization
        </p>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 mb-4">
            For enterprise inquiries, please email us at{' '}
            <a href="mailto:sales@powerui.com" className="text-gray-900 underline">
              sales@powerui.com
            </a>
          </p>
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