'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ImportThemeModal } from '@/components/theme-advanced/ui/import-theme-modal';
import { PowerBITheme } from '@/lib/theme-advanced/types';

interface AdvancedTheme {
  id: string;
  name: string;
  description: string | null;
  schemaVersion: string;
  createdAt: string;
  updatedAt: string;
}

// Icons
const AdvancedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function AdvancedThemesPage() {
  const router = useRouter();
  const [themes, setThemes] = useState<AdvancedTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/themes/advanced');
      if (response.ok) {
        const data = await response.json();
        setThemes(data.themes || []);
      }
    } catch (error) {
      console.error('Failed to fetch advanced themes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (themeId: string) => {
    if (!confirm('Are you sure you want to delete this theme?')) return;

    try {
      const response = await fetch(`/api/themes/advanced/${themeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setThemes(themes.filter(t => t.id !== themeId));
      }
    } catch (error) {
      console.error('Failed to delete theme:', error);
    }
  };

  const handleExport = async (themeId: string, themeName: string) => {
    try {
      const response = await fetch(`/api/themes/advanced/export/${themeId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${themeName.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export theme:', error);
    }
  };

  const handleImport = async (importedTheme: PowerBITheme) => {
    try {
      const response = await fetch('/api/themes/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: importedTheme.name || 'Imported Theme',
          description: 'Imported theme',
          themeData: importedTheme,
          schemaVersion: '2.143',
        }),
      });

      if (response.ok) {
        const { theme } = await response.json();
        router.push(`/themes/advanced/${theme.id}`);
      }
    } catch (error) {
      console.error('Failed to save imported theme:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/themes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <BackIcon />
          <span className="text-sm">Back to Themes</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <AdvancedIcon />
            Advanced Theme Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Create and edit Power BI themes with complete control over every property
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import Theme
          </button>
          <button 
            onClick={() => router.push('/themes/advanced/editor')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Advanced Theme
          </button>
        </div>
      </div>

      {/* Features Card */}
      <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Advanced Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Edit any Power BI theme property with schema-driven forms</li>
          <li>• Support for visual states (default, hover, selected, disabled)</li>
          <li>• Theme color references with shade adjustments</li>
          <li>• Import existing Power BI theme files</li>
          <li>• Real-time preview and validation</li>
        </ul>
      </Card>
      
      {/* Themes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading advanced themes...</p>
        </div>
      ) : themes.length === 0 ? (
        <Card className="text-center py-12 text-gray-500">
          <AdvancedIcon />
          <p className="mt-4">You haven't created any advanced themes yet.</p>
          <p className="mt-2">Click "Create Advanced Theme" to get started!</p>
          <p className="mt-4 text-sm">
            Advanced themes give you complete control over every aspect of your Power BI theme.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Card key={theme.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{theme.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  v{theme.schemaVersion}
                </span>
              </div>
              
              {theme.description && (
                <p className="text-gray-600 text-sm mb-4">{theme.description}</p>
              )}
              
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <div>Created: {new Date(theme.createdAt).toLocaleDateString()}</div>
                <div>Updated: {new Date(theme.updatedAt).toLocaleDateString()}</div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => router.push(`/themes/advanced/${theme.id}`)}
                  className="flex-1 px-3 py-1.5 text-sm bg-primary text-white hover:opacity-90 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleExport(theme.id, theme.name)}
                  className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Export
                </button>
                <button 
                  onClick={() => handleDelete(theme.id)}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Import Modal */}
      <ImportThemeModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />
    </div>
  );
}