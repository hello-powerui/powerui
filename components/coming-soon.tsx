'use client';

import { useEffect, useState } from 'react';

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Power UI
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Something big is coming
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re building the future of Power BI theming. Get ready for a completely new experience.
          </p>
        </div>

        {/* Visual Interest */}
        <div className="flex justify-center items-center space-x-3 mb-12">
          <div className={`h-3 w-3 bg-blue-500 rounded-full ${mounted ? 'animate-pulse' : ''}`}></div>
          <div className={`h-3 w-3 bg-purple-500 rounded-full ${mounted ? 'animate-pulse delay-150' : ''}`}></div>
          <div className={`h-3 w-3 bg-pink-500 rounded-full ${mounted ? 'animate-pulse delay-300' : ''}`}></div>
        </div>

        {/* Teaser */}
        <div className="mt-8">
          <p className="text-gray-400 text-lg">
            Launching soon
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>© 2025 Power UI. All rights reserved.</p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}