import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook for managing UI state in the theme studio
 * Handles selections, panel states, and other UI concerns
 */
export function useThemeUI() {
  // UI state selections
  const uiState = useThemeStudioStore(
    useShallow((state) => ({
      selectedVisual: state.selectedVisual,
      selectedVariant: state.selectedVariant,
      selectedState: state.selectedState,
      selectedSection: state.selectedSection,
      expandedPanels: state.expandedPanels,
      activeTab: state.activeTab
    }))
  );

  // UI actions
  const setSelectedVisual = useThemeStudioStore((state) => state.setSelectedVisual);
  const setSelectedVariant = useThemeStudioStore((state) => state.setSelectedVariant);
  const setSelectedState = useThemeStudioStore((state) => state.setSelectedState);
  const setSelectedSection = useThemeStudioStore((state) => state.setSelectedSection);
  const setActiveTab = useThemeStudioStore((state) => state.setActiveTab);
  const togglePanel = useThemeStudioStore((state) => state.togglePanel);

  // Variant management
  const getVisualVariants = useThemeStudioStore((state) => state.getVisualVariants);
  const createVariant = useThemeStudioStore((state) => state.createVariant);
  const deleteVariant = useThemeStudioStore((state) => state.deleteVariant);
  const renameVariant = useThemeStudioStore((state) => state.renameVariant);

  return {
    // UI state
    ...uiState,
    
    // UI actions
    setSelectedVisual,
    setSelectedVariant,
    setSelectedState,
    setSelectedSection,
    setActiveTab,
    togglePanel,
    
    // Variant management
    getVisualVariants,
    createVariant,
    deleteVariant,
    renameVariant
  };
}