import { useCallback, useMemo } from 'react';
import { useThemeData } from './use-theme-data';
import { useThemeUI } from './use-theme-ui';
import { useThemePersistence } from './use-theme-persistence';
import { useThemeVisualStyles } from './use-theme-visual-styles';
import { useThemeStudioPalettes } from './use-theme-studio-palettes';
import { useThemePreviewGenerator } from './use-theme-preview-generator';
import { useThemeChanges } from './use-theme-changes';
import { useRenderDebug } from '@/lib/utils/debug-infinite-renders';

// Stable empty set reference
const EMPTY_SET = new Set<string>();

/**
 * Main hook for theme studio that combines all functionality
 * Now uses focused hooks to reduce re-renders
 */
export function useThemeStudio() {
  // Use focused hooks for better performance
  const themeData = useThemeData();
  const uiState = useThemeUI();
  const persistence = useThemePersistence();
  const visualStyles = useThemeVisualStyles();
  
  // Palette resolution
  const { colorPalette, neutralPalette, isLoading: palettesLoading } = useThemeStudioPalettes();
  
  // Preview generation
  const { previewTheme, isGenerating } = useThemePreviewGenerator();
  
  // Change tracking
  const { changedPaths, trackChange, hasChanges } = useThemeChanges();
  const hasChangesValue = useMemo(() => hasChanges(), [changedPaths]);
  
  // Add render debugging
  useRenderDebug('useThemeStudio', {
    theme: themeData.theme,
    colorPalette,
    neutralPalette,
    previewTheme,
    isGenerating,
    hasChangesValue
  });
  
  // Enhanced theme update with change tracking
  const updateTheme = useCallback((updates: Parameters<typeof themeData.updateTheme>[0]) => {
    themeData.updateTheme(updates);
    
    // Track changes for the updated keys, but skip visualStyles as it's tracked at a more specific level
    Object.keys(updates).forEach(key => {
      if (key !== 'visualStyles') {
        trackChange([key]);
      }
    });
  }, [themeData, trackChange]);
  
  // Wrap theme data actions with change tracking
  const setColorPaletteId = useCallback((id: string) => {
    themeData.setColorPaletteId(id);
    trackChange(['colorPaletteId']);
  }, [themeData, trackChange]);
  
  const setNeutralPaletteId = useCallback((id: string) => {
    themeData.setNeutralPaletteId(id);
    trackChange(['neutralPaletteId']);
  }, [themeData, trackChange]);
  
  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    themeData.setThemeMode(mode);
    trackChange(['mode']);
  }, [themeData, trackChange]);
  
  const setFontFamily = useCallback((fontFamily: string) => {
    themeData.setFontFamily(fontFamily);
    trackChange(['fontFamily']);
  }, [themeData, trackChange]);
  
  const setStructuralColors = useCallback((colors: any) => {
    themeData.setStructuralColors(colors);
    trackChange(['structuralColors']);
  }, [themeData, trackChange]);
  
  const setTextClasses = useCallback((textClasses: any) => {
    themeData.setTextClasses(textClasses);
    trackChange(['textClasses']);
  }, [themeData, trackChange]);

  // Return combined API without useStableObject - hooks already provide stable references
  return {
    // Theme data
    theme: themeData.theme,
    previewTheme,
    
    // Resolved palettes
    colorPalette,
    neutralPalette,
    
    // UI state
    selectedVisual: uiState.selectedVisual,
    selectedVariant: uiState.selectedVariant,
    selectedState: uiState.selectedState,
    selectedSection: uiState.selectedSection,
    
    // Loading states
    isLoading: palettesLoading,
    isSaving: persistence.isSaving,
    isGenerating,
    
    // Change tracking
    isDirty: persistence.isDirty || hasChangesValue,
    changedPaths: changedPaths || EMPTY_SET,
    
    // Theme actions
    updateTheme,
    setColorPaletteId,
    setNeutralPaletteId,
    setThemeMode,
    setFontFamily,
    setStructuralColors,
    setTextClasses,
    updateVisualStyle: visualStyles.updateVisualStyle,
    
    // UI actions
    setSelectedVisual: uiState.setSelectedVisual,
    setSelectedVariant: uiState.setSelectedVariant,
    setSelectedState: uiState.setSelectedState,
    setSelectedSection: uiState.setSelectedSection,
    
    // Variant management
    getVisualVariants: uiState.getVisualVariants,
    createVariant: uiState.createVariant,
    deleteVariant: uiState.deleteVariant,
    
    // Save/load
    saveTheme: persistence.saveTheme,
    loadTheme: persistence.loadTheme,
    resetTheme: persistence.resetTheme,
    createNewTheme: persistence.createNewTheme,
    exportTheme: persistence.exportTheme,
  };
}