import { useCallback, useMemo } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeStudioPalettes } from './use-theme-studio-palettes';
import { useThemePreviewGenerator } from './use-theme-preview-generator';
import { useThemeChanges } from './use-theme-changes';
import { useStableObject } from './use-stable-object';
import { toast } from 'sonner';
import { useRenderDebug } from '@/lib/utils/debug-infinite-renders';

// Stable empty set reference
const EMPTY_SET = new Set<string>();

/**
 * Main hook for theme studio that combines all functionality
 */
export function useThemeStudio() {
  // Theme store state - use specific selectors to avoid unnecessary re-renders
  const theme = useThemeStudioStore((state) => state.theme);
  const selectedVisual = useThemeStudioStore((state) => state.selectedVisual);
  const selectedVariant = useThemeStudioStore((state) => state.selectedVariant);
  const selectedState = useThemeStudioStore((state) => state.selectedState);
  const selectedSection = useThemeStudioStore((state) => state.selectedSection);
  const isDirty = useThemeStudioStore((state) => state.isDirty);
  const isSaving = useThemeStudioStore((state) => state.isSaving);
  
  // Store actions - use individual selectors for stable references
  const updateThemeAction = useThemeStudioStore((state) => state.updateTheme);
  const setColorPaletteIdAction = useThemeStudioStore((state) => state.setColorPaletteId);
  const setNeutralPaletteIdAction = useThemeStudioStore((state) => state.setNeutralPaletteId);
  const setThemeModeAction = useThemeStudioStore((state) => state.setThemeMode);
  const setFontFamilyAction = useThemeStudioStore((state) => state.setFontFamily);
  const setStructuralColorsAction = useThemeStudioStore((state) => state.setStructuralColors);
  const setTextClassesAction = useThemeStudioStore((state) => state.setTextClasses);
  const updateVisualStyleAction = useThemeStudioStore((state) => state.updateVisualStyle);
  const setSelectedVisual = useThemeStudioStore((state) => state.setSelectedVisual);
  const setSelectedVariant = useThemeStudioStore((state) => state.setSelectedVariant);
  const setSelectedState = useThemeStudioStore((state) => state.setSelectedState);
  const setSelectedSection = useThemeStudioStore((state) => state.setSelectedSection);
  const getVisualVariants = useThemeStudioStore((state) => state.getVisualVariants);
  const createVariant = useThemeStudioStore((state) => state.createVariant);
  const deleteVariant = useThemeStudioStore((state) => state.deleteVariant);
  const saveThemeAction = useThemeStudioStore((state) => state.saveTheme);
  const resetThemeAction = useThemeStudioStore((state) => state.resetTheme);
  const createNewThemeAction = useThemeStudioStore((state) => state.createNewTheme);
  const loadThemeAction = useThemeStudioStore((state) => state.loadTheme);
  const exportTheme = useThemeStudioStore((state) => state.exportTheme);
  
  // Palette resolution
  const { colorPalette, neutralPalette, isLoading: palettesLoading } = useThemeStudioPalettes();
  
  // Preview generation
  const { previewTheme, isGenerating } = useThemePreviewGenerator();
  
  // Change tracking - destructure to get specific functions
  const { changedPaths, trackChange, clearChanges, hasChanges } = useThemeChanges();
  const hasChangesValue = useMemo(() => hasChanges(), [changedPaths]); // Only recalculate when paths change
  
  // Add render debugging
  useRenderDebug('useThemeStudio', {
    theme,
    colorPalette,
    neutralPalette,
    previewTheme,
    isGenerating,
    hasChangesValue
  });
  
  // Combined save function with change tracking
  const saveTheme = useCallback(async () => {
    try {
      await saveThemeAction();
      clearChanges();
      toast.success('Theme saved successfully');
    } catch (error) {
      toast.error('Failed to save theme');
      throw error;
    }
  }, [saveThemeAction, clearChanges]);
  
  // Enhanced theme update with change tracking
  const updateTheme = useCallback((updates: Parameters<typeof updateThemeAction>[0]) => {
    updateThemeAction(updates);
    
    // Track changes for the updated keys, but skip visualStyles as it's tracked at a more specific level
    Object.keys(updates).forEach(key => {
      if (key !== 'visualStyles') {
        trackChange([key]);
      }
    });
  }, [updateThemeAction, trackChange]);
  
  // Enhanced visual style update with change tracking
  const updateVisualStyle = useCallback((visual: string, variant: string, value: any) => {
    updateVisualStyleAction(visual, variant, value);
    trackChange(['visualStyles', visual, variant]);
  }, [updateVisualStyleAction, trackChange]);
  
  // Reset with change clearing
  const resetTheme = useCallback(() => {
    clearChanges(); // Clear changes first
    resetThemeAction();
  }, [clearChanges, resetThemeAction]);
  
  // Create new theme with change clearing
  const createNewTheme = useCallback(() => {
    clearChanges(); // Clear changes first
    createNewThemeAction();
  }, [clearChanges, createNewThemeAction]);
  
  // Memoize callbacks that need to be stable
  const setColorPaletteId = useCallback((id: string) => {
    setColorPaletteIdAction(id);
    trackChange(['colorPaletteId']);
  }, [setColorPaletteIdAction, trackChange]);
  
  const setNeutralPaletteId = useCallback((id: string) => {
    setNeutralPaletteIdAction(id);
    trackChange(['neutralPaletteId']);
  }, [setNeutralPaletteIdAction, trackChange]);
  
  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    setThemeModeAction(mode);
    trackChange(['mode']);
  }, [setThemeModeAction, trackChange]);
  
  const setFontFamily = useCallback((fontFamily: string) => {
    setFontFamilyAction(fontFamily);
    trackChange(['fontFamily']);
  }, [setFontFamilyAction, trackChange]);
  
  const setStructuralColors = useCallback((colors: any) => {
    setStructuralColorsAction(colors);
    trackChange(['structuralColors']);
  }, [setStructuralColorsAction, trackChange]);
  
  const setTextClasses = useCallback((textClasses: any) => {
    setTextClassesAction(textClasses);
    trackChange(['textClasses']);
  }, [setTextClassesAction, trackChange]);
  
  const loadTheme = useCallback((themeData: any) => {
    clearChanges(); // Clear changes when loading a new theme
    loadThemeAction(themeData);
  }, [clearChanges, loadThemeAction]);

  // Create the return object
  const result = {
    // Theme data
    theme,
    previewTheme,
    
    // Resolved palettes
    colorPalette,
    neutralPalette,
    
    // UI state
    selectedVisual,
    selectedVariant,
    selectedState,
    selectedSection,
    
    // Loading states
    isLoading: palettesLoading,
    isSaving,
    isGenerating,
    
    // Change tracking
    isDirty: isDirty || hasChangesValue,
    changedPaths: changedPaths || EMPTY_SET,
    
    // Theme actions
    updateTheme,
    setColorPaletteId,
    setNeutralPaletteId,
    setThemeMode,
    setFontFamily,
    setStructuralColors,
    setTextClasses,
    updateVisualStyle,
    
    // UI actions
    setSelectedVisual,
    setSelectedVariant,
    setSelectedState,
    setSelectedSection,
    
    // Variant management
    getVisualVariants,
    createVariant,
    deleteVariant,
    
    // Save/load
    saveTheme,
    loadTheme,
    resetTheme,
    createNewTheme,
    exportTheme,
  };
  
  // Return a stable object reference
  return useStableObject(result);
}