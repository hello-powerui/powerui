import { useCallback, useMemo } from 'react';
import { useThemeData } from './use-theme-data';
import { useThemeUI } from './use-theme-ui';
import { useThemePersistence } from './use-theme-persistence';
import { useThemeVisualStyles } from './use-theme-visual-styles';
import { useThemeStudioPalettes } from './use-theme-studio-palettes';
import { useThemePreviewGenerator } from './use-theme-preview-generator';
import { useThemeChanges } from './use-theme-changes';

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
  const hasChangesValue = useMemo(() => hasChanges(), [hasChanges]);
  
  
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
  
  // Wrap theme data actions with change tracking - using batch update
  const setColorPaletteId = useCallback((id: string) => {
    updateTheme({ colorPaletteId: id });
  }, [updateTheme]);
  
  const setNeutralPaletteId = useCallback((id: string) => {
    updateTheme({ neutralPaletteId: id });
  }, [updateTheme]);
  
  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    updateTheme({ mode });
  }, [updateTheme]);
  
  const setFontFamily = useCallback((fontFamily: string) => {
    updateTheme({ fontFamily });
  }, [updateTheme]);
  
  const setStructuralColors = useCallback((colors: any) => {
    updateTheme({ structuralColors: colors });
  }, [updateTheme]);
  
  const setTextClasses = useCallback((textClasses: any) => {
    updateTheme({ textClasses });
  }, [updateTheme]);
  
  const setBrandPalette = useCallback((palette: Record<string, string>) => {
    updateTheme({ brandPalette: palette });
  }, [updateTheme]);
  
  const setStatePalette = useCallback((type: 'success' | 'warning' | 'error', paletteName: string) => {
    updateTheme({ [`${type}Palette`]: paletteName });
  }, [updateTheme]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
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
    isDirty: hasChangesValue,
    changedPaths: changedPaths || EMPTY_SET,
    
    // Theme actions
    updateTheme,
    setColorPaletteId,
    setNeutralPaletteId,
    setThemeMode,
    setFontFamily,
    setStructuralColors,
    setTextClasses,
    setBrandPalette,
    setStatePalette,
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
    
    // Clear actions
    clearTypography: themeData.clearTypography,
    clearStructuralColors: themeData.clearStructuralColors,
    clearTextClasses: themeData.clearTextClasses,
    clearVisualSection: visualStyles.clearVisualSection,
    clearVisualVariant: visualStyles.clearVisualVariant,
  }), [
    themeData.theme,
    previewTheme,
    colorPalette,
    neutralPalette,
    uiState.selectedVisual,
    uiState.selectedVariant,
    uiState.selectedState,
    uiState.selectedSection,
    palettesLoading,
    persistence.isSaving,
    isGenerating,
    hasChangesValue,
    changedPaths,
    updateTheme,
    setColorPaletteId,
    setNeutralPaletteId,
    setThemeMode,
    setFontFamily,
    setStructuralColors,
    setTextClasses,
    setBrandPalette,
    setStatePalette,
    visualStyles.updateVisualStyle,
    uiState.setSelectedVisual,
    uiState.setSelectedVariant,
    uiState.setSelectedState,
    uiState.setSelectedSection,
    uiState.getVisualVariants,
    uiState.createVariant,
    uiState.deleteVariant,
    persistence.saveTheme,
    persistence.loadTheme,
    persistence.resetTheme,
    persistence.createNewTheme,
    themeData.clearTypography,
    themeData.clearStructuralColors,
    themeData.clearTextClasses,
    visualStyles.clearVisualSection,
    visualStyles.clearVisualVariant,
  ]);
}