import { useCallback } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeStudioPalettes } from './use-theme-studio-palettes';
import { useThemePreviewGenerator } from './use-theme-preview-generator';
import { useThemeChanges } from './use-theme-changes';
import { toast } from 'sonner';
import { useRenderDebug } from '@/lib/utils/debug-infinite-renders';

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
  
  // Store actions - these are stable references
  const storeActions = useThemeStudioStore((state) => ({
    updateTheme: state.updateTheme,
    setColorPaletteId: state.setColorPaletteId,
    setNeutralPaletteId: state.setNeutralPaletteId,
    setThemeMode: state.setThemeMode,
    setFontFamily: state.setFontFamily,
    setStructuralColors: state.setStructuralColors,
    setTextClasses: state.setTextClasses,
    updateVisualStyle: state.updateVisualStyle,
    setSelectedVisual: state.setSelectedVisual,
    setSelectedVariant: state.setSelectedVariant,
    setSelectedState: state.setSelectedState,
    setSelectedSection: state.setSelectedSection,
    getVisualVariants: state.getVisualVariants,
    createVariant: state.createVariant,
    deleteVariant: state.deleteVariant,
    saveTheme: state.saveTheme,
    resetTheme: state.resetTheme,
    createNewTheme: state.createNewTheme,
    loadTheme: state.loadTheme,
    exportTheme: state.exportTheme
  }));
  
  // Palette resolution
  const { colorPalette, neutralPalette, isLoading: palettesLoading } = useThemeStudioPalettes();
  
  // Preview generation
  const { previewTheme, isGenerating } = useThemePreviewGenerator();
  
  // Change tracking
  const { hasChanges, changedPaths, trackChange, clearChanges } = useThemeChanges();
  
  // Add render debugging
  useRenderDebug('useThemeStudio', {
    theme,
    colorPalette,
    neutralPalette,
    previewTheme,
    isGenerating,
    hasChanges
  });
  
  // Combined save function with change tracking
  const saveTheme = useCallback(async () => {
    try {
      await storeActions.saveTheme();
      clearChanges();
      toast.success('Theme saved successfully');
    } catch (error) {
      toast.error('Failed to save theme');
      throw error;
    }
  }, [storeActions, clearChanges]);
  
  // Enhanced theme update with change tracking
  const updateTheme = useCallback((updates: Parameters<typeof storeActions.updateTheme>[0]) => {
    storeActions.updateTheme(updates);
    
    // Track changes for the updated keys, but skip visualStyles as it's tracked at a more specific level
    Object.keys(updates).forEach(key => {
      if (key !== 'visualStyles') {
        trackChange([key]);
      }
    });
  }, [storeActions, trackChange]);
  
  // Enhanced visual style update with change tracking
  const updateVisualStyle = useCallback((visual: string, variant: string, value: any) => {
    storeActions.updateVisualStyle(visual, variant, value);
    trackChange(['visualStyles', visual, variant]);
  }, [storeActions, trackChange]);
  
  // Reset with change clearing
  const resetTheme = useCallback(() => {
    clearChanges(); // Clear changes first
    storeActions.resetTheme();
  }, [clearChanges, storeActions]);
  
  // Create new theme with change clearing
  const createNewTheme = useCallback(() => {
    clearChanges(); // Clear changes first
    storeActions.createNewTheme();
  }, [clearChanges, storeActions]);
  
  return {
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
    isDirty: isDirty || hasChanges(),
    changedPaths: changedPaths || new Set(),
    
    // Theme actions
    updateTheme,
    setColorPaletteId: useCallback((id: string) => {
      storeActions.setColorPaletteId(id);
      trackChange(['colorPaletteId']);
    }, [storeActions, trackChange]),
    setNeutralPaletteId: useCallback((id: string) => {
      storeActions.setNeutralPaletteId(id);
      trackChange(['neutralPaletteId']);
    }, [storeActions, trackChange]),
    setThemeMode: useCallback((mode: 'light' | 'dark') => {
      storeActions.setThemeMode(mode);
      trackChange(['mode']);
    }, [storeActions, trackChange]),
    setFontFamily: useCallback((fontFamily: string) => {
      storeActions.setFontFamily(fontFamily);
      trackChange(['fontFamily']);
    }, [storeActions, trackChange]),
    setStructuralColors: useCallback((colors: any) => {
      storeActions.setStructuralColors(colors);
      trackChange(['structuralColors']);
    }, [storeActions, trackChange]),
    setTextClasses: useCallback((textClasses: any) => {
      storeActions.setTextClasses(textClasses);
      trackChange(['textClasses']);
    }, [storeActions, trackChange]),
    updateVisualStyle,
    
    // UI actions
    setSelectedVisual: storeActions.setSelectedVisual,
    setSelectedVariant: storeActions.setSelectedVariant,
    setSelectedState: storeActions.setSelectedState,
    setSelectedSection: storeActions.setSelectedSection,
    
    // Variant management
    getVisualVariants: storeActions.getVisualVariants,
    createVariant: storeActions.createVariant,
    deleteVariant: storeActions.deleteVariant,
    
    // Save/load
    saveTheme,
    loadTheme: useCallback((themeData: any) => {
      clearChanges(); // Clear changes when loading a new theme
      storeActions.loadTheme(themeData);
    }, [clearChanges, storeActions]),
    resetTheme,
    createNewTheme,
    exportTheme: storeActions.exportTheme,
  };
}