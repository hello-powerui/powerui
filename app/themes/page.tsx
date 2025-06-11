'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  dataPalette: string;
  neutralPalette: string;
  fontFamily: string;
  colorMode: string;
  borders: string;
  themeData: any;
}

// Icon for back navigation
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function ThemesPage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/themes');
      if (response.ok) {
        const data = await response.json();
        setThemes(data);
      }
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BackIcon />
                <span>Back to Dashboard</span>
              </button>
              <div className="border-l border-gray-200 pl-6">
                <h1 className="text-xl font-semibold text-gray-900">My Themes</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => router.push('/themes/builder')}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-sm"
              >
                + Create New Theme
              </button>
              <button 
                onClick={() => router.push('/themes/studio')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Theme Studio
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading themes...</p>
          </div>
        ) : themes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>You haven't created any themes yet.</p>
            <p className="mt-2">Click "Create New Theme" to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div key={theme.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{theme.name}</h3>
              {theme.description && (
                <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
              )}
              <p className="text-gray-500 text-xs mb-4">
                Created on: {new Date(theme.createdAt).toLocaleDateString()}
              </p>
              
              {/* Color preview */}
              {theme.themeData?.dataColors && (
                <div className="flex gap-1 mb-4">
                  {theme.themeData.dataColors.slice(0, 5).map((color: string, i: number) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {theme.themeData.dataColors.length > 5 && (
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                      +{theme.themeData.dataColors.length - 5}
                    </div>
                  )}
                </div>
              )}
              
              {/* Theme metadata */}
              <div className="text-xs text-gray-600 mb-4 space-y-1">
                <div>Mode: {theme.colorMode}</div>
                <div>Font: {theme.fontFamily.replace('-', ' ')}</div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => router.push(`/themes/${theme.id}`)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Edit
                </button>
                <button 
                  className="px-3 py-1 text-sm bg-primary text-white hover:opacity-90 rounded"
                  onClick={async () => {
                    const response = await fetch('/api/generate-theme', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(theme.themeData || {
                        name: theme.name,
                        mode: theme.colorMode,
                        dataColors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C'],
                        neutralPalette: theme.neutralPalette,
                        fontFamily: theme.fontFamily,
                        borderRadius: parseInt(theme.borders),
                        bgStyle: theme.bgStyle,
                        borderStyle: theme.borderStyle,
                        paddingStyle: theme.paddingStyle,
                        showBorders: theme.showBorders,
                      }),
                    });
                    if (response.ok) {
                      const generatedTheme = await response.json();
                      // Download the theme
                      const blob = new Blob([JSON.stringify(generatedTheme, null, 2)], {
                        type: 'application/json',
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  )
}