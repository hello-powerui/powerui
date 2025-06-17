import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeStudioPalettes } from './use-theme-studio-palettes';
import { useThemePreviewGenerator } from './use-theme-preview-generator';
import { useThemeChanges } from './use-theme-changes';
import { toast } from 'sonner';

/**
 * Main hook for theme studio that combines all functionality
 */
export function useThemeStudio() {
  // Theme store state and actions
  const store = useThemeStudioStore();
  
  // Palette resolution
  const { colorPalette, neutralPalette, isLoading: palettesLoading } = useThemeStudioPalettes();
  
  // Preview generation
  const { previewTheme, isGenerating } = useThemePreviewGenerator();
  
  // Change tracking
  const { hasChanges, changedPaths, trackChange, clearChanges } = useThemeChanges();
  
  // Combined save function with change tracking
  const saveTheme = async () => {
    try {
      await store.saveTheme();
      clearChanges();
      toast.success('Theme saved successfully');
    } catch (error) {
      toast.error('Failed to save theme');
      throw error;
    }
  };
  
  // Enhanced theme update with change tracking
  const updateTheme = (updates: Parameters<typeof store.updateTheme>[0]) => {
    store.updateTheme(updates);
    
    // Track changes for the updated keys
    Object.keys(updates).forEach(key => {
      trackChange([key]);
    });
  };
  
  // Enhanced visual style update with change tracking
  const updateVisualStyle = (visual: string, variant: string, value: any) => {
    store.updateVisualStyle(visual, variant, value);
    trackChange(['visualStyles', visual, variant]);
  };
  
  // Reset with change clearing
  const resetTheme = () => {
    store.resetTheme();
    clearChanges();
  };
  
  return {
    // Theme data
    theme: store.theme,
    previewTheme,
    
    // Resolved palettes
    colorPalette,
    neutralPalette,
    
    // UI state
    selectedVisual: store.selectedVisual,
    selectedVariant: store.selectedVariant,
    selectedState: store.selectedState,
    selectedSection: store.selectedSection,
    activeTab: store.activeTab,
    
    // Loading states
    isLoading: store.isLoading || palettesLoading,
    isSaving: store.isSaving,
    isGenerating,
    
    // Change tracking
    isDirty: store.isDirty || hasChanges(),
    changedPaths: changedPaths || new Set(),
    
    // Theme actions
    updateTheme,
    setColorPaletteId: (id: string) => {
      store.setColorPaletteId(id);
      trackChange(['colorPaletteId']);
    },
    setNeutralPaletteId: (id: string) => {
      store.setNeutralPaletteId(id);
      trackChange(['neutralPaletteId']);
    },
    setThemeMode: (mode: 'light' | 'dark') => {
      store.setThemeMode(mode);
      trackChange(['mode']);
    },
    setFontFamily: (fontFamily: string) => {
      store.setFontFamily(fontFamily);
      trackChange(['fontFamily']);
    },
    setStructuralColors: (colors: any) => {
      store.setStructuralColors(colors);
      trackChange(['structuralColors']);
    },
    setStructuralColorsMode: (mode: 'auto' | 'custom') => {
      store.setStructuralColorsMode(mode);
      trackChange(['structuralColorsMode']);
    },
    setTextClasses: (textClasses: any) => {
      store.setTextClasses(textClasses);
      trackChange(['textClasses']);
    },
    updateVisualStyle,
    
    // UI actions
    setSelectedVisual: store.setSelectedVisual,
    setSelectedVariant: store.setSelectedVariant,
    setSelectedState: store.setSelectedState,
    setSelectedSection: store.setSelectedSection,
    setActiveTab: store.setActiveTab,
    togglePanel: store.togglePanel,
    
    // Variant management
    getVisualVariants: store.getVisualVariants,
    createVariant: store.createVariant,
    deleteVariant: store.deleteVariant,
    
    // History
    undo: store.undo,
    redo: store.redo,
    
    // Save/load
    saveTheme,
    loadTheme: store.loadTheme,
    resetTheme,
    exportTheme: store.exportTheme,
  };
}