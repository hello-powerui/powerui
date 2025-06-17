import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SchemaValidationError } from '@/lib/theme-studio/types';

interface UIStateStore {
  // Panel and section state
  selectedSection: 'properties' | 'visuals' | 'global';
  expandedPanels: string[];
  activeTab: 'color' | 'typography' | 'style';
  
  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  
  // Validation
  validationErrors: SchemaValidationError[];
  
  // Actions
  setSelectedSection: (section: 'properties' | 'visuals' | 'global') => void;
  togglePanel: (panelId: string) => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  setIsLoading: (loading: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setValidationErrors: (errors: SchemaValidationError[]) => void;
  
  // Bulk panel operations
  expandAllPanels: () => void;
  collapseAllPanels: () => void;
}

export const useUIStateStore = create<UIStateStore>()(
  devtools(
    (set) => ({
      // Initial state
      selectedSection: 'properties',
      expandedPanels: [],
      activeTab: 'color',
      isLoading: false,
      isSaving: false,
      isGenerating: false,
      validationErrors: [],

      // Actions
      setSelectedSection: (section) => set({ selectedSection: section }),
      
      togglePanel: (panelId) => {
        set((state) => ({
          expandedPanels: state.expandedPanels.includes(panelId)
            ? state.expandedPanels.filter(id => id !== panelId)
            : [...state.expandedPanels, panelId]
        }));
      },
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setIsSaving: (saving) => set({ isSaving: saving }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      setValidationErrors: (errors) => set({ validationErrors: errors }),
      
      expandAllPanels: () => set({ expandedPanels: ['*'] }),
      collapseAllPanels: () => set({ expandedPanels: [] }),
    }),
    {
      name: 'ui-state-store',
    }
  )
);