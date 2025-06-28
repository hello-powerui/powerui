'use client';

import { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useThemeStudio } from '@/lib/hooks/use-theme-studio';
import { FoundationPanel } from './components/FoundationPanel';
import { VisualStylesPanel } from './components/VisualStylesPanel';
import { PowerBIPreview } from '@/components/theme-studio/preview/PowerBIPreview';
import { UnifiedPaletteManager } from '@/components/theme-studio/palette/UnifiedPaletteManager';
import { ImportThemeModal } from '@/components/theme-studio/ui/import-theme-modal';
import { ThemeJsonView } from './components/ThemeJsonView';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ErrorBoundaryWithLogging } from '@/components/debug/ErrorBoundaryWithLogging';
import { downloadThemeJson } from '@/lib/utils/theme-export';
import Script from 'next/script';

// Global types are defined in types/global.d.ts

// Icons
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

function ThemeStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeStudio = useThemeStudio();
  
  
  // Local UI state
  const [showFoundation, setShowFoundation] = useState(true);
  const [showVisualStyles, setShowVisualStyles] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPaletteManager, setShowPaletteManager] = useState(false);
  const [showNeutralPaletteManager, setShowNeutralPaletteManager] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'json'>('preview');
  
  // Track loaded theme ID to prevent duplicate loading
  const loadedThemeIdRef = useRef<string | null>(null);
  
  // Visual styles panel width - fixed
  const visualStylesPanelWidth = 380;
  
  // Get visual styles directly from the store
  const visualSettings = themeStudio.theme.visualStyles || {};
  
  
  // Focus mode state
  const [isInFocusMode, setIsInFocusMode] = useState(false);
  const [reportResetFn, setReportResetFn] = useState<(() => void) | null>(null);
  
  
  // Extract themeId to use as dependency
  const themeId = searchParams.get('themeId');
  
  const loadTheme = useCallback(async (themeId: string) => {
    // Prevent duplicate loading of the same theme
    if (loadedThemeIdRef.current === themeId) {
      return;
    }
    
    setIsThemeLoading(true);
    try {
      const response = await fetch(`/api/themes/${themeId}`);
      if (!response.ok) throw new Error('Failed to load theme');
      
      const apiResponse = await response.json();
      themeStudio.loadTheme(apiResponse);
      
      // Mark this theme as loaded
      loadedThemeIdRef.current = themeId;
      
      // If theme has visual styles, show the visual styles panel
      const themeData = apiResponse.themeData || {};
      if (themeData.visualStyles && Object.keys(themeData.visualStyles).length > 0) {
        setShowVisualStyles(true);
      }
    } catch (error) {
      toast.error('Failed to load theme');
      console.error('Error loading theme:', error);
    } finally {
      setIsThemeLoading(false);
    }
  }, [themeStudio, setShowVisualStyles]);
  
  // Load theme on mount
  useEffect(() => {
    if (themeId) {
      // Only load the theme if it's different from what we already have loaded
      // This prevents resetting when we're just updating the URL after save
      if (loadedThemeIdRef.current !== themeId) {
        // Reset store state before loading new theme to prevent stale data
        themeStudio.resetTheme();
        loadTheme(themeId);
      }
    } else {
      // New theme - create a fresh one
      loadedThemeIdRef.current = null; // Clear the loaded theme ref
      themeStudio.createNewTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId]); // Only depend on themeId to avoid infinite loops
  
  const handleSave = async () => {
    try {
      await themeStudio.saveTheme();
      
      // If it was a new theme, update the URL without triggering a reload
      if (!searchParams.get('themeId') && themeStudio.theme.id) {
        // Update the loaded theme ref to prevent reload
        loadedThemeIdRef.current = themeStudio.theme.id;
        // Use replace instead of push to avoid adding to history
        router.replace(`/themes/studio?themeId=${themeStudio.theme.id}`, { scroll: false });
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };
  
  const handleReset = () => {
    if (themeStudio.isDirty) {
      if (confirm('Reset all unsaved changes?')) {
        themeStudio.resetTheme();
      }
    }
  };
  
  const handleExport = () => {
    if (!themeStudio.previewTheme) {
      toast.error('Please generate a preview first');
      return;
    }
    
    const filename = `${themeStudio.theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    downloadThemeJson(themeStudio.previewTheme, filename);
    toast.success('Theme exported');
  };
  
  const handleShowPaletteManager = (type: 'color' | 'neutral') => {
    if (type === 'color') {
      setShowPaletteManager(true);
    } else {
      setShowNeutralPaletteManager(true);
    }
  };
  
  const handleVisualSettingsChange = useCallback((newVisualSettings: Record<string, any>) => {
    // Update the theme with new visual styles
    themeStudio.updateTheme({ visualStyles: newVisualSettings });
  }, [themeStudio]);
  
  const handleVisualStyleChange = (visual: string, variant: string, value: any) => {
    themeStudio.updateVisualStyle(visual, variant, value);
  };
  
  return (
    <div className="theme-studio-page flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Loading Bar */}
      {isThemeLoading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200">
            <div className="h-full bg-blue-500 animate-pulse" style={{
              animation: 'loading 1.5s ease-in-out infinite',
              background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, #3B82F6 100%)',
              backgroundSize: '200% 100%',
            }}>
              <style jsx>{`
                @keyframes loading {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Back button and theme name */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (themeStudio.isDirty) {
                    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
                      loadedThemeIdRef.current = null; // Clear loaded theme ref
                      themeStudio.resetTheme(); // Reset store when leaving
                      router.push('/themes');
                    }
                  } else {
                    loadedThemeIdRef.current = null; // Clear loaded theme ref
                    themeStudio.resetTheme(); // Reset store when leaving
                    router.push('/themes');
                  }
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Back to themes"
              >
                <BackIcon />
              </button>
              <div className="ml-3 pl-3 border-l border-gray-200">
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={themeStudio.theme.name}
                    onChange={(e) => themeStudio.updateTheme({ name: e.target.value })}
                    className="text-lg font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-2 py-1 rounded"
                    placeholder="Untitled Theme"
                  />
                  <input
                    type="text"
                    value={themeStudio.theme.description || ''}
                    onChange={(e) => themeStudio.updateTheme({ description: e.target.value })}
                    className="text-sm text-gray-600 bg-transparent border-none outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-2 py-0.5 rounded"
                    placeholder="Add a description..."
                  />
                </div>
              </div>
              {themeStudio.isDirty && (
                <div className="ml-3 flex items-center gap-1.5 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>{themeStudio.changedPaths.size} unsaved {themeStudio.changedPaths.size === 1 ? 'change' : 'changes'}</span>
                </div>
              )}
            </div>
            
            {/* Center: View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('preview')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                  viewMode === 'preview' 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5",
                  viewMode === 'json' 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                JSON
              </button>
            </div>
            
            {/* Right side: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import
              </button>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              {themeStudio.isDirty && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={themeStudio.isSaving}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-sm font-medium disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {themeStudio.isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Foundation Sidebar - Left */}
        <div className={cn(
          "border-r bg-gray-50 transition-all duration-300",
          showFoundation ? "w-96" : "w-12"
        )}>
          <ErrorBoundaryWithLogging componentName="FoundationPanel">
            <FoundationPanel
              theme={themeStudio.theme}
              colorPalette={themeStudio.colorPalette}
              neutralPalette={themeStudio.neutralPalette}
              brandPalette={themeStudio.theme.brandPalette}
              visualSettings={visualSettings}
              hasChanges={(path) => themeStudio.changedPaths.has(path.join('.'))}
              onThemeChange={themeStudio.updateTheme}
              onColorPaletteChange={themeStudio.setColorPaletteId}
              onNeutralPaletteChange={themeStudio.setNeutralPaletteId}
              onBrandPaletteChange={themeStudio.setBrandPalette}
              onStatePaletteChange={themeStudio.setStatePalette}
              onThemeModeChange={themeStudio.setThemeMode}
              onFontFamilyChange={themeStudio.setFontFamily}
              onStructuralColorsChange={themeStudio.setStructuralColors}
              onTextClassesChange={themeStudio.setTextClasses}
              onShowPaletteManager={handleShowPaletteManager}
              onVisualSettingsChange={handleVisualSettingsChange}
              trackChange={(path) => {
                // Change tracking is handled internally by updateTheme
              }}
              isVisible={showFoundation}
              onToggleVisibility={setShowFoundation}
            />
          </ErrorBoundaryWithLogging>
        </div>

        {/* Preview Panel - Center */}
        <div className="flex-1 overflow-hidden h-full">
          <ErrorBoundaryWithLogging componentName={viewMode === 'preview' ? 'PowerBIPreview' : 'ThemeJsonView'}>
            {/* Keep Power BI component mounted but hidden when in JSON mode */}
            {(isThemeLoading || !themeStudio.previewTheme) ? (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">
                    {isThemeLoading ? 'Loading theme...' : 'Generating preview...'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Power BI Preview - Keep mounted but use CSS to show/hide */}
                <div style={{ display: viewMode === 'preview' ? 'block' : 'none', height: '100%', position: 'relative' }}>
                  <PowerBIPreview 
                    generatedTheme={themeStudio.previewTheme}
                    selectedVisualType={themeStudio.selectedVisual}
                    selectedVariant={themeStudio.selectedVariant}
                    onExitFocusMode={() => {
                      setIsInFocusMode(false);
                      // Don't change the selected visual - keep it selected
                    }}
                    onVariantChange={themeStudio.setSelectedVariant}
                    onReportReset={(resetFn) => {
                      // Use setTimeout to avoid state update during render
                      setTimeout(() => setReportResetFn(() => resetFn), 0);
                    }}
                    enterFocusMode={isInFocusMode}
                  />
                </div>
                
                {/* JSON View - Show when in JSON mode */}
                {viewMode === 'json' && (
                  <div style={{ height: '100%' }}>
                    <ThemeJsonView theme={themeStudio.previewTheme} />
                  </div>
                )}
              </>
            )}
          </ErrorBoundaryWithLogging>
        </div>

        {/* Visual Styles Sidebar - Right */}
        <div 
          className={cn(
            "relative border-l bg-gray-50 transition-all duration-300",
            !showVisualStyles && "w-12"
          )}
          style={showVisualStyles ? { width: `${visualStylesPanelWidth}px` } : undefined}
        >
          <ErrorBoundaryWithLogging componentName="VisualStylesPanel">
            <VisualStylesPanel
              theme={themeStudio.theme}
              visualSettings={visualSettings}
              selectedVisual={themeStudio.selectedVisual}
              selectedVariant={themeStudio.selectedVariant}
              selectedSection={themeStudio.selectedSection}
              onVisualSettingsChange={handleVisualSettingsChange}
              onVisualStyleChange={handleVisualStyleChange}
              onSelectedVisualChange={themeStudio.setSelectedVisual}
              onSelectedVariantChange={themeStudio.setSelectedVariant}
              onSelectedSectionChange={themeStudio.setSelectedSection}
              onCreateVariant={themeStudio.createVariant}
              onDeleteVariant={themeStudio.deleteVariant}
              getVisualVariants={themeStudio.getVisualVariants}
              trackChange={() => {
                // Change tracking is handled by the updateTheme and updateVisualStyle methods
              }}
              onEnterFocusMode={() => setIsInFocusMode(true)}
            />
          </ErrorBoundaryWithLogging>
        </div>
      </div>

      {/* Modals */}
      <UnifiedPaletteManager
        open={showPaletteManager}
        onOpenChange={setShowPaletteManager}
        paletteType="color"
        selectedColorPaletteId={themeStudio.theme.colorPaletteId}
        onSelectColorPalette={(palette) => {
          themeStudio.setColorPaletteId(palette.id);
          setShowPaletteManager(false);
        }}
      />

      <UnifiedPaletteManager
        open={showNeutralPaletteManager}
        onOpenChange={setShowNeutralPaletteManager}
        paletteType="neutral"
        selectedNeutralPaletteId={themeStudio.theme.neutralPaletteId}
        onSelectNeutralPalette={(palette) => {
          themeStudio.setNeutralPaletteId(palette.id);
          setShowNeutralPaletteManager(false);
        }}
      />

      
      <ImportThemeModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(importedTheme) => {
          // Theme import is handled by the modal itself
          toast.success('Theme imported successfully');
          setShowImportModal(false);
        }}
      />
    </div>
  );
}

export default function UnifiedThemeStudioNew() {
  return (
    <>
      <Script
        src="https://app.powerbi.com/13.0.23829.90/scripts/powerbiloader.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Preload Power BI resources after the script loads
          if (typeof window !== 'undefined' && window.powerbi && 'preloadResource' in window.powerbi) {
            (window.powerbi as any).preloadResource('report');
          }
        }}
      />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }>
        <ThemeStudioContent />
      </Suspense>
    </>
  );
}