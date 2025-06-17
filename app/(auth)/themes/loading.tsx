export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="border-l border-gray-200 pl-6">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="mb-3">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-1">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mb-3">
                <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
              </div>
              
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
                <div className="h-8 w-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}