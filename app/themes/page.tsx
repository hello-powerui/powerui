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

// Icon for delete
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Icon for more options
const MoreIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

export default function ThemesPage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (themeId: string, themeName: string) => {
    if (!confirm(`Are you sure you want to delete "${themeName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(themeId);
    try {
      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setThemes(themes.filter(t => t.id !== themeId));
      } else {
        alert('Failed to delete theme');
      }
    } catch (error) {
      console.error('Failed to delete theme:', error);
      alert('Failed to delete theme');
    } finally {
      setDeletingId(null);
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
            <button 
              onClick={() => router.push('/themes/studio')}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors text-sm font-medium"
            >
              Create New Theme
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="flex -space-x-1 mb-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  <div className="h-8 bg-gray-200 rounded w-10"></div>
                </div>
              </div>
            ))}
          </div>
        ) : themes.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No themes yet</h3>
            <p className="text-sm text-gray-500 mb-4">Get started by creating your first theme</p>
            <button 
              onClick={() => router.push('/themes/studio')}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors"
            >
              Create New Theme
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <div key={theme.id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all group relative overflow-hidden">
              {/* Delete button - absolute positioned */}
              <button
                onClick={() => handleDelete(theme.id, theme.name)}
                disabled={deletingId === theme.id}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100 z-10"
                title="Delete theme"
              >
                {deletingId === theme.id ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <TrashIcon />
                )}
              </button>
              
              <div className="p-4">
                {/* Title and metadata */}
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 mb-1 pr-8">{theme.name}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(theme.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                
                {/* Color preview - more compact */}
                {theme.themeData?.dataColors && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-1">
                      {theme.themeData.dataColors.slice(0, 4).map((color: string, i: number) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-white"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {theme.themeData.dataColors.length > 4 && (
                      <span className="text-xs text-gray-500">+{theme.themeData.dataColors.length - 4}</span>
                    )}
                  </div>
                )}
                
                {/* Compact metadata pills */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {theme.colorMode}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {theme.fontFamily.replace('-', ' ')}
                  </span>
                </div>
                
                {/* Actions - more compact */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => router.push(`/themes/${theme.id}`)}
                    className="flex-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    className="px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={async () => {
                      const themeInput = theme.themeData || {
                        name: theme.name,
                        mode: theme.colorMode || 'light',
                        dataColors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C'],
                        neutralPalette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#000000'],
                        fontFamily: theme.fontFamily || 'segoe-ui',
                        borderRadius: parseInt(theme.borders || '4'),
                      };
                      
                      const response = await fetch('/api/generate-theme', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(themeInput),
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  )
}