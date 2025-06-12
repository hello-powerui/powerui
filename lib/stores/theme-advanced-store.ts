import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme, AdvancedThemeData, SchemaValidationError } from '@/lib/theme-advanced/types';

interface ThemeAdvancedState {
  // Theme data
  currentTheme: PowerBITheme;
  themeMetadata: {
    id?: string;
    name: string;
    description?: string;
    schemaVersion: string;
  };
  
  // UI state
  selectedVisual: string;
  selectedStyle: string;
  selectedVariant: string;
  selectedProperty: string;
  selectedSection: 'properties' | 'visuals' | 'global';
  selectedState: string; // For state-driven properties (default, hover, selected, etc.)
  expandedPanels: string[];
  isDirty: boolean;
  isSaving: boolean;
  isLoading: boolean;
  validationErrors: SchemaValidationError[];
  
  // History for undo/redo
  history: PowerBITheme[];
  historyIndex: number;
  maxHistorySize: number;
  
  // Actions
  setTheme: (theme: PowerBITheme) => void;
  updateThemeProperty: (path: string[], value: any) => void;
  updateVisualStyle: (visual: string, style: string, value: any) => void;
  setSelectedVisual: (visual: string) => void;
  setSelectedStyle: (style: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedProperty: (property: string) => void;
  setSelectedSection: (section: 'properties' | 'visuals' | 'global') => void;
  setSelectedState: (state: string) => void;
  togglePanel: (panelId: string) => void;
  
  // Variant management
  getVisualVariants: (visual: string) => string[];
  createVariant: (visual: string, variantName: string) => void;
  deleteVariant: (visual: string, variantName: string) => void;
  
  // Metadata actions
  setThemeMetadata: (metadata: Partial<ThemeAdvancedState['themeMetadata']>) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  addToHistory: (theme: PowerBITheme) => void;
  
  // Loading/saving states
  setIsSaving: (saving: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setValidationErrors: (errors: SchemaValidationError[]) => void;
  
  // Theme management
  loadTheme: (themeData: AdvancedThemeData) => void;
  resetTheme: () => void;
  exportTheme: () => PowerBITheme;
}

const defaultTheme: PowerBITheme = {
  name: 'Untitled Advanced Theme',
  mode: 'light',
  dataColors: [
    '#2568E8',
    '#8338EC',
    '#FF006E',
    '#F95608',
    '#FFBE0C',
    '#2ACF56',
    '#3498DB',
    '#A66999',
  ],
};

export const useThemeAdvancedStore = create<ThemeAdvancedState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTheme: { ...defaultTheme },
      themeMetadata: {
        name: 'Untitled Advanced Theme',
        schemaVersion: '2.143',
      },
      selectedVisual: '',
      selectedStyle: '*',
      selectedVariant: '*',
      selectedProperty: '',
      selectedSection: 'properties',
      selectedState: 'default',
      expandedPanels: [],
      isDirty: false,
      isSaving: false,
      isLoading: false,
      validationErrors: [],
      history: [{ ...defaultTheme }],
      historyIndex: 0,
      maxHistorySize: 50,

      // Theme actions
      setTheme: (theme) => {
        set((state) => ({
          currentTheme: theme,
          isDirty: true,
        }));
        get().addToHistory(theme);
      },

      updateThemeProperty: (path, value) => {
        set((state) => {
          const newTheme = { ...state.currentTheme };
          let current: any = newTheme;
          
          // Navigate to the parent of the target property
          for (let i = 0; i < path.length - 1; i++) {
            if (!current[path[i]]) {
              current[path[i]] = {};
            }
            current = current[path[i]];
          }
          
          // Set the value
          current[path[path.length - 1]] = value;
          
          return {
            currentTheme: newTheme,
            isDirty: true,
          };
        });
        get().addToHistory(get().currentTheme);
      },

      updateVisualStyle: (visual, style, value) => {
        set((state) => {
          const newTheme = { ...state.currentTheme };
          
          if (!newTheme.visualStyles) {
            newTheme.visualStyles = {};
          }
          
          if (!newTheme.visualStyles[visual]) {
            newTheme.visualStyles[visual] = {};
          }
          
          newTheme.visualStyles[visual][style] = value;
          
          return {
            currentTheme: newTheme,
            isDirty: true,
          };
        });
        get().addToHistory(get().currentTheme);
      },

      // UI state actions
      setSelectedVisual: (visual) => set({ selectedVisual: visual }),
      setSelectedStyle: (style) => set({ selectedStyle: style }),
      setSelectedVariant: (variant) => set({ selectedVariant: variant }),
      setSelectedProperty: (property) => set({ selectedProperty: property }),
      setSelectedSection: (section) => set({ selectedSection: section }),
      setSelectedState: (state) => set({ selectedState: state }),
      
      togglePanel: (panelId) => {
        set((state) => ({
          expandedPanels: state.expandedPanels.includes(panelId)
            ? state.expandedPanels.filter((id) => id !== panelId)
            : [...state.expandedPanels, panelId],
        }));
      },

      // Variant management
      getVisualVariants: (visual) => {
        const state = get();
        const visualStyles = state.currentTheme.visualStyles?.[visual];
        if (!visualStyles) return ['*'];
        return Object.keys(visualStyles).sort((a, b) => {
          if (a === '*') return -1;
          if (b === '*') return 1;
          return a.localeCompare(b);
        });
      },

      createVariant: (visual, variantName) => {
        if (!variantName || variantName === '*') return;
        
        set((state) => {
          const newTheme = { ...state.currentTheme };
          
          if (!newTheme.visualStyles) {
            newTheme.visualStyles = {};
          }
          
          if (!newTheme.visualStyles[visual]) {
            newTheme.visualStyles[visual] = { '*': {} };
          }
          
          // Initialize the new variant with empty object
          newTheme.visualStyles[visual][variantName] = {};
          
          return {
            currentTheme: newTheme,
            selectedVariant: variantName,
            isDirty: true,
          };
        });
        get().addToHistory(get().currentTheme);
      },

      deleteVariant: (visual, variantName) => {
        if (variantName === '*') return; // Cannot delete default variant
        
        set((state) => {
          const newTheme = { ...state.currentTheme };
          
          if (newTheme.visualStyles?.[visual]?.[variantName]) {
            delete newTheme.visualStyles[visual][variantName];
          }
          
          return {
            currentTheme: newTheme,
            selectedVariant: '*', // Reset to default
            isDirty: true,
          };
        });
        get().addToHistory(get().currentTheme);
      },

      // Metadata actions
      setThemeMetadata: (metadata) => {
        set((state) => ({
          themeMetadata: { ...state.themeMetadata, ...metadata },
          isDirty: true,
        }));
      },

      // History actions
      addToHistory: (theme) => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push({ ...theme });
          
          // Limit history size
          if (newHistory.length > state.maxHistorySize) {
            newHistory.shift();
          }
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1,
          };
        });
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              currentTheme: { ...state.history[newIndex] },
              historyIndex: newIndex,
              isDirty: true,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              currentTheme: { ...state.history[newIndex] },
              historyIndex: newIndex,
              isDirty: true,
            };
          }
          return state;
        });
      },

      // Loading/saving states
      setIsSaving: (saving) => set({ isSaving: saving }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setValidationErrors: (errors) => set({ validationErrors: errors }),

      // Theme management
      loadTheme: (themeData) => {
        const theme = typeof themeData.theme === 'string' 
          ? JSON.parse(themeData.theme) 
          : themeData.theme;
          
        set({
          currentTheme: theme,
          themeMetadata: {
            id: themeData.id,
            name: themeData.name,
            description: themeData.description,
            schemaVersion: themeData.schemaVersion,
          },
          isDirty: false,
          history: [{ ...theme }],
          historyIndex: 0,
        });
      },

      resetTheme: () => {
        set({
          currentTheme: { ...defaultTheme },
          themeMetadata: {
            name: 'Untitled Advanced Theme',
            schemaVersion: '2.143',
          },
          selectedVisual: '',
          selectedStyle: '*',
          selectedVariant: '*',
          selectedProperty: '',
          selectedSection: 'properties',
          selectedState: 'default',
          expandedPanels: [],
          isDirty: false,
          validationErrors: [],
          history: [{ ...defaultTheme }],
          historyIndex: 0,
        });
      },

      exportTheme: () => {
        const state = get();
        return {
          ...state.currentTheme,
          name: state.themeMetadata.name,
        };
      },
    }),
    {
      name: 'theme-advanced-store',
    }
  )
);