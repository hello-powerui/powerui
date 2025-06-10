'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';

interface ThemeActionsProps {
  generatedTheme: any;
  themeId?: string | null;
  initialDescription?: string;
}

export function ThemeActions({ generatedTheme, themeId, initialDescription = '' }: ThemeActionsProps) {
  const router = useRouter();
  const { theme, isSaving, setIsSaving } = useThemeBuilderStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [themeDescription, setThemeDescription] = useState(initialDescription);

  const handleSave = async () => {
    if (!theme.name?.trim()) return;
    
    setIsSaving(true);
    try {
      const url = themeId ? `/api/themes/${themeId}` : '/api/themes';
      const method = themeId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...theme,
          description: themeDescription,
          themeData: {
            ...theme,
            description: themeDescription,
          },
        }),
      });

      if (response.ok) {
        const savedTheme = await response.json();
        router.push('/themes');
      } else {
        const error = await response.json();
        console.error('Failed to save theme:', error);
        alert('Failed to save theme. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
      alert('Failed to save theme. Please try again.');
    } finally {
      setIsSaving(false);
      setShowSaveModal(false);
    }
  };

  const handleDownload = () => {
    if (!generatedTheme) return;

    const blob = new Blob([JSON.stringify(generatedTheme, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
          disabled={!generatedTheme}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
        
        <button
          onClick={() => setShowSaveModal(true)}
          className="px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-sm font-medium"
          disabled={isSaving}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save
        </button>
      </div>

      {/* Modern Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-5 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Save Theme</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-md p-3">
                <div className="text-xs text-gray-600 mb-0.5">Theme Name</div>
                <div className="text-sm font-medium text-gray-900">{theme.name || 'Untitled Theme'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all resize-none"
                  rows={3}
                  placeholder="Describe your theme..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!theme.name?.trim() || isSaving}
                className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSaving ? 'Saving...' : 'Save Theme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}