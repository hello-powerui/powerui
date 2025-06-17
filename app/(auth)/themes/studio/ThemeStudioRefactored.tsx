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
  const { currentTheme: themeData, loadTheme, updateThemeProperty } = useThemeDataStore();
  const foundationStore = useFoundationStore();
  const { 
    themeName, 
    description, 
    palette,
    neutralPalette,
    structuralColors,
    textClasses,
    setThemeName,
    setDescription,
  } = foundationStore;
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
    // Combine foundation data with theme data
    const completeThemeData = {
      ...themeData,
      name: themeName,
      description,
      general: {
        ...themeData.general,
        palette: {
          dataColors: palette.colors,
          neutralColors: neutralPalette
        },
        textClasses,
      },
      structuralColors,
    };
    
    handleSave({
      themeId: themeIdFromUrl,
      themeName,
      description,
      themeData: completeThemeData,
    });
  };

  const handleExportTheme = () => {
    // Combine foundation data with theme data for export
    const completeThemeData = {
      ...themeData,
      name: themeName,
      description,
      general: {
        ...themeData.general,
        palette: {
          dataColors: palette.colors,
          neutralColors: neutralPalette
        },
        textClasses,
      },
      structuralColors,
    };
    
    handleExport(themeName, completeThemeData);
  };

  const handleResetTheme = () => {
    // Reset should also restore foundation data
    if (originalTheme) {
      // Need to create a proper theme object for loadTheme
      loadTheme({ theme: originalTheme } as any);
      
      // Reset foundation data from original theme
      if (originalTheme.general?.palette?.dataColors) {
        const colors = originalTheme.general.palette.dataColors;
        const colorArray = Array.isArray(colors) 
          ? colors 
          : Object.values(colors).filter((v): v is string => typeof v === 'string');
        foundationStore.setPalette({ colors: colorArray } as any);
      }
      
      if (originalTheme.general?.palette?.neutralColors) {
        foundationStore.setNeutralPalette(originalTheme.general.palette.neutralColors);
      }
      
      if (originalTheme.general?.textClasses) {
        foundationStore.setTextClasses(originalTheme.general.textClasses);
      }
    }
  };

  const handleImportFile = async (file: File) => {
    try {
      const importedTheme = await handleImport(file);
      loadTheme({ theme: importedTheme } as any);
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
            dataColors={palette.colors}
            neutralColors={neutralPalette}
            structuralColors={structuralColors}
            canvasLayout={themeData?.general?.canvasLayout}
            textClasses={textClasses}
            onTogglePaletteManager={togglePaletteManager}
            onToggleNeutralPaletteManager={toggleNeutralPaletteManager}
            onToggleTextClassesEditor={toggleTextClassesEditor}
            updateThemeDataField={(path, value) => updateThemeProperty(path.split('.'), value)}
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