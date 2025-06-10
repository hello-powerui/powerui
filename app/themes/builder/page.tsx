'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { ModernThemeBuilderCollapsible } from '@/components/theme-builder/ModernThemeBuilderCollapsible';
import { PreviewDashboard } from '@/components/theme-builder/PreviewDashboard';
import { ThemeActions } from '@/components/theme-builder/ThemeActions';
import './theme-preview.css';
import '@/components/theme-builder/preview-powerbi.css';

// Icons
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PreviewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default function ThemeBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, isGenerating, updateThemeProperty, loadTheme } = useThemeBuilderStore();
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  const [themeId, setThemeId] = useState<string | null>(null);
  const [themeDescription, setThemeDescription] = useState<string>('');

  // Load theme data from URL params
  useEffect(() => {
    const id = searchParams.get('id');
    const data = searchParams.get('data');
    const description = searchParams.get('description');
    
    if (id && data) {
      try {
        const themeData = JSON.parse(decodeURIComponent(data));
        loadTheme(themeData);
        setThemeId(id);
        setThemeDescription(description ? decodeURIComponent(description) : '');
        
        // Clear URL params after loading
        router.replace('/themes/builder', { scroll: false });
      } catch (error) {
        console.error('Failed to load theme data:', error);
      }
    }
  }, [searchParams, loadTheme, router]);

  // Generate theme on changes
  useEffect(() => {
    const generateTheme = async () => {
      useThemeBuilderStore.setState({ isGenerating: true });
      
      try {
        const response = await fetch('/api/generate-theme', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(theme),
        }).catch(err => {
          console.error('Network error generating theme:', err);
          return null;
        });
        
        if (response && response.ok) {
          const data = await response.json();
          setGeneratedTheme(data);
        } else if (response) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to generate theme:', response.status, errorData);
        }
      } catch (error) {
        console.error('Failed to generate theme:', error);
      } finally {
        useThemeBuilderStore.setState({ isGenerating: false });
      }
    };

    // Debounce theme generation
    const timeoutId = setTimeout(generateTheme, 500);
    return () => clearTimeout(timeoutId);
  }, [theme]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - matching dashboard style */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/themes')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BackIcon />
                <span>Back to themes</span>
              </button>
              <div className="border-l border-gray-200 pl-6">
                <input
                  type="text"
                  value={theme.name}
                  onChange={(e) => updateThemeProperty('name', e.target.value)}
                  className="text-lg font-semibold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md px-2 py-1 -ml-2 placeholder-gray-400"
                  placeholder="Untitled Theme"
                />
              </div>
            </div>
            
            <ThemeActions 
              generatedTheme={generatedTheme} 
              themeId={themeId}
              initialDescription={themeDescription}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Configuration */}
          <div className="lg:col-span-1">
            <ModernThemeBuilderCollapsible />
          </div>

          {/* Right Side - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Preview Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PreviewIcon />
                    <h3 className="text-sm font-medium text-gray-900">Live Preview</h3>
                    {isGenerating && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Updating...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Container */}
              <div>
                <PreviewDashboard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}