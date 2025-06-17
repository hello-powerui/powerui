import { useState, useCallback } from 'react';

export interface ThemeStudioUIState {
  showPaletteManager: boolean;
  showNeutralPaletteManager: boolean;
  showImportModal: boolean;
  showTextClassesEditor: boolean;
  showVariantDialog: boolean;
  showFoundation: boolean;
  showVisualStyles: boolean;
  selectedSection: 'global' | 'properties' | 'visuals';
  newVariantName: string;
}

const initialUIState: ThemeStudioUIState = {
  showPaletteManager: false,
  showNeutralPaletteManager: false,
  showImportModal: false,
  showTextClassesEditor: false,
  showVariantDialog: false,
  showFoundation: true,
  showVisualStyles: true,
  selectedSection: 'global',
  newVariantName: '',
};

export function useUIState() {
  const [uiState, setUIState] = useState<ThemeStudioUIState>(initialUIState);

  const toggleModal = useCallback((modal: keyof ThemeStudioUIState, value?: boolean) => {
    setUIState(prev => ({
      ...prev,
      [modal]: value !== undefined ? value : !prev[modal as keyof ThemeStudioUIState]
    }));
  }, []);

  const setSelectedSection = useCallback((section: 'global' | 'properties' | 'visuals') => {
    setUIState(prev => ({ ...prev, selectedSection: section }));
  }, []);

  const setNewVariantName = useCallback((name: string) => {
    setUIState(prev => ({ ...prev, newVariantName: name }));
  }, []);

  return {
    uiState,
    toggleModal,
    setSelectedSection,
    setNewVariantName,
    // Convenience methods
    togglePaletteManager: () => toggleModal('showPaletteManager'),
    toggleNeutralPaletteManager: () => toggleModal('showNeutralPaletteManager'),
    toggleImportModal: () => toggleModal('showImportModal'),
    toggleTextClassesEditor: () => toggleModal('showTextClassesEditor'),
    toggleVariantDialog: () => toggleModal('showVariantDialog'),
    toggleFoundation: () => toggleModal('showFoundation'),
    toggleVisualStyles: () => toggleModal('showVisualStyles'),
  };
}