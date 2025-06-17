export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        
        {/* My Themes section skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto animate-pulse" />
            </div>
          </div>
        </div>

        {/* Team Themes section skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-3 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </div>

        {/* Reports section skeleton */}
        <div className="mb-8">
          <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Resources section skeleton */}
        <div>
          <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}