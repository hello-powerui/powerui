'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useThemeLoader } from './hooks/useThemeLoader';
import { useThemePersistence } from './hooks/useThemePersistence';
import { useUIState } from './hooks/useUIState';
import { ThemeStudioHeader } from './components/header/ThemeStudioHeader';
import { FoundationSidebar } from './components/sidebars/FoundationSidebar';
import { CreateVariantModal } from './components/modals/CreateVariantModal';

// Store imports
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useFoundationStore } from '@/lib/stores/foundation-store';
import { useThemeVisualStore } from '@/lib/stores/theme-visual-store';
import { useThemeExportStore } from '@/lib/stores/theme-export-store';
import { useVisualEditingStore } from '@/lib/stores/visual-editing-store';
import { useUIStateStore } from '@/lib/stores/ui-state-store';

// Component imports
import { ThemePreview } from '@/components/theme-studio/preview/ThemePreview';
import { UnifiedPaletteManager } from '@/components/theme-studio/palette/UnifiedPaletteManager';
import { TextClassesEditor } from '@/components/theme-studio/typography/TextClassesEditor';
import { ImportThemeModal } from '@/components/theme-studio/ImportThemeModal';
import { VisualPropertiesPanel } from '@/components/theme-studio/form/VisualPropertiesPanel';

export default function ThemeStudioRefactored() {
  const searchParams = useSearchParams();
  const themeIdFromUrl = searchParams.get('theme');

  // Custom hooks
  const { isLoading, error, theme } = useThemeLoader(themeIdFromUrl);
  const { isSaving, handleSave, handleExport, handleImport, handleReset } = useThemePersistence();
  const { 
    uiState, 
    togglePaletteManager,
    toggleNeutralPaletteManager,
    toggleImportModal,
    toggleTextClassesEditor,
    toggleVariantDialog,
    toggleFoundation,
    toggleVisualStyles,
    setNewVariantName,
  } = useUIState();

  // Store hooks
  const { themeData, setThemeData, updateThemeDataField } = useThemeDataStore();
  const { 
    themeName, 
    description, 
    dataColors, 
    neutralColors,
    structuralColors,
    canvasLayout,
    textClasses,
    setThemeName,
    setDescription,
  } = useFoundationStore();
  const { 
    selectedVisualType,
    selectedVariant,
    addVariant,
  } = useThemeVisualStore();
  const { hasChanges, originalTheme } = useThemeExportStore();
  const { selectedVisualId } = useVisualEditingStore();
  const { isGeneratingTheme } = useUIStateStore();

  // Initialize schema loader
  useEffect(() => {
    // Schema loading is handled by stores
  }, []);

  // Handlers
  const handleSaveTheme = () => {
    handleSave({
      themeId: themeIdFromUrl,
      themeName,
      description,
      themeData,
    });
  };

  const handleExportTheme = () => {
    handleExport(themeName, themeData);
  };

  const handleResetTheme = () => {
    handleReset(originalTheme, setThemeData);
  };

  const handleImportFile = async (file: File) => {
    try {
      const importedTheme = await handleImport(file);
      setThemeData(importedTheme);
      toggleImportModal();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCreateVariant = () => {
    if (uiState.newVariantName.trim() && selectedVisualType) {
      addVariant(selectedVisualType, uiState.newVariantName.trim());
      setNewVariantName('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading theme...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <ThemeStudioHeader
        themeName={themeName}
        onThemeNameChange={setThemeName}
        onSave={handleSaveTheme}
        onExport={handleExportTheme}
        onImport={toggleImportModal}
        onReset={handleResetTheme}
        hasChanges={hasChanges}
        isSaving={isSaving}
        showFoundation={uiState.showFoundation}
        showVisualStyles={uiState.showVisualStyles}
        onToggleFoundation={toggleFoundation}
        onToggleVisualStyles={toggleVisualStyles}
      />

      <div className="flex-1 flex overflow-hidden">
        {uiState.showFoundation && (
          <FoundationSidebar
            description={description}
            onDescriptionChange={setDescription}
            dataColors={dataColors}
            neutralColors={neutralColors}
            structuralColors={structuralColors}
            canvasLayout={canvasLayout}
            textClasses={textClasses}
            onTogglePaletteManager={togglePaletteManager}
            onToggleNeutralPaletteManager={toggleNeutralPaletteManager}
            onToggleTextClassesEditor={toggleTextClassesEditor}
            updateThemeDataField={updateThemeDataField}
          />
        )}

        {uiState.showVisualStyles && (
          <VisualPropertiesPanel
            selectedSection={uiState.selectedSection}
            onSectionChange={(section: any) => section}
          />
        )}

        <div className="flex-1 flex flex-col">
          <ThemePreview
            themeData={themeData}
            isGenerating={isGeneratingTheme}
            selectedVisualId={selectedVisualId}
          />
        </div>
      </div>

      {/* Modals */}
      <UnifiedPaletteManager
        open={uiState.showPaletteManager}
        onOpenChange={togglePaletteManager}
        mode="color"
      />

      <UnifiedPaletteManager
        open={uiState.showNeutralPaletteManager}
        onOpenChange={toggleNeutralPaletteManager}
        mode="neutral"
      />

      <TextClassesEditor
        open={uiState.showTextClassesEditor}
        onOpenChange={toggleTextClassesEditor}
      />

      <ImportThemeModal
        open={uiState.showImportModal}
        onOpenChange={toggleImportModal}
        onImport={handleImportFile}
      />

      <CreateVariantModal
        isOpen={uiState.showVariantDialog}
        onClose={toggleVariantDialog}
        variantName={uiState.newVariantName}
        onVariantNameChange={setNewVariantName}
        onCreateVariant={handleCreateVariant}
        visualType={selectedVisualType || ''}
      />
    </div>
  );
}