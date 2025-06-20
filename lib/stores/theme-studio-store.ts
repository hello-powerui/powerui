import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme, StudioThemeData, SchemaValidationError } from '@/lib/theme-studio/types';
import { ColorPalette, NeutralPalette } from '@prisma/client';
import { StructuralColors, TextClasses } from '@/lib/theme-generation/types';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';

// Single unified theme structure
interface StudioTheme {
  // Metadata
  id?: string;
  name: string;
  description?: string;
  
  // Foundation settings (stored as IDs only)
  colorPaletteId: string;
  neutralPaletteId: string;
  mode: 'light' | 'dark';
  fontFamily: string;
  structuralColors?: StructuralColors;
  textClasses?: TextClasses;
  
  // Visual Styles
  visualStyles: Record<string, any>;
}

// Resolved runtime data (not stored)
interface ResolvedThemeData {
  colorPalette: ColorPalette | null;
  neutralPalette: NeutralPalette | null;
  previewTheme: PowerBITheme | null;
}

interface ThemeStudioState {
  // Single source of truth for theme data
  theme: StudioTheme;
  
  // Resolved/computed data
  resolved: ResolvedThemeData;
  
  // UI state
  selectedVisual: string;
  selectedStyle: string;
  selectedVariant: string;
  selectedProperty: string;
  selectedSection: 'typography' | 'structural' | 'visuals' | 'global';
  selectedState: string; // For state-driven properties (default, hover, selected, etc.)
  expandedPanels: string[];
  isDirty: boolean;
  isSaving: boolean;
  isLoading: boolean;
  isGenerating: boolean;
  validationErrors: SchemaValidationError[];
  activeTab: 'color' | 'typography' | 'style';
  
  // History for undo/redo
  history: StudioTheme[];
  historyIndex: number;
  maxHistorySize: number;
  
  // Theme actions (simplified and unified)
  updateTheme: (updates: Partial<StudioTheme>) => void;
  setColorPaletteId: (paletteId: string) => void;
  setNeutralPaletteId: (paletteId: string) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setFontFamily: (fontFamily: string) => void;
  setStructuralColors: (colors: StructuralColors) => void;
  setTextClasses: (textClasses: TextClasses) => void;
  updateVisualStyles: (visualStyles: Record<string, any>) => void;
  updateVisualStyle: (visual: string, variant: string, value: any) => void;
  
  // Resolved data actions
  setResolvedPalettes: (colorPalette: ColorPalette | null, neutralPalette: NeutralPalette | null) => void;
  setPreviewTheme: (previewTheme: PowerBITheme | null) => void;
  
  // UI state actions
  setSelectedVisual: (visual: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedState: (state: string) => void;
  setSelectedSection: (section: 'typography' | 'structural' | 'visuals' | 'global') => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  togglePanel: (panelId: string) => void;
  
  // Variant management
  getVisualVariants: (visual: string) => string[];
  createVariant: (visual: string, variantName: string) => void;
  deleteVariant: (visual: string, variantName: string) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  addToHistory: () => void; // Simplified - uses current theme
  
  // Loading/saving actions
  setIsSaving: (saving: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setValidationErrors: (errors: SchemaValidationError[]) => void;
  saveTheme: () => Promise<void>;
  loadTheme: (themeData: any) => void;
  resetTheme: () => void;
  createNewTheme: () => void;
  exportTheme: () => StudioTheme;
}

const defaultStudioTheme: StudioTheme = {
  name: 'Untitled Theme',
  colorPaletteId: DEFAULT_COLOR_PALETTE.id,
  neutralPaletteId: AZURE_NEUTRAL_PALETTE.id,
  mode: 'light',
  fontFamily: 'Segoe UI',
  structuralColors: {},
  textClasses: {},
  visualStyles: {
    '*': { '*': {} }  // Initialize global properties structure
  }
};

const defaultResolvedData: ResolvedThemeData = {
  colorPalette: null,
  neutralPalette: null,
  previewTheme: null
};

export const useThemeStudioStore = create<ThemeStudioState>()(
  devtools(
    (set, get) => ({
      // Initial state
      theme: { ...defaultStudioTheme },
      resolved: { ...defaultResolvedData },
      
      // UI state
      selectedVisual: '',
      selectedVariant: '*',
      selectedState: 'default',
      selectedSection: 'typography',
      selectedStyle: '*',
      selectedProperty: '',
      expandedPanels: [],
      activeTab: 'color',
      
      // Loading states
      isDirty: false,
      isSaving: false,
      isLoading: false,
      isGenerating: false,
      validationErrors: [],
      
      // History
      history: [{ ...defaultStudioTheme }],
      historyIndex: 0,
      maxHistorySize: 50,

      // Theme actions (simplified and unified)
      updateTheme: (updates) =>
        set((state) => {
          // Check if the update actually changes anything
          const hasChanges = Object.keys(updates).some(
            key => state.theme[key as keyof StudioTheme] !== updates[key as keyof StudioTheme]
          );
          
          if (!hasChanges) {
            return state; // No actual changes, return current state
          }
          
          const newTheme = { ...state.theme, ...updates };
          return {
            theme: newTheme,
            isDirty: true,
          };
        }),
        
      setColorPaletteId: (paletteId) =>
        set((state) => ({
          theme: { ...state.theme, colorPaletteId: paletteId },
          isDirty: true,
        })),
        
      setNeutralPaletteId: (paletteId) =>
        set((state) => ({
          theme: { ...state.theme, neutralPaletteId: paletteId },
          isDirty: true,
        })),
        
      setThemeMode: (mode) =>
        set((state) => ({
          theme: { ...state.theme, mode },
          isDirty: true,
        })),
        
      setFontFamily: (fontFamily) =>
        set((state) => ({
          theme: { ...state.theme, fontFamily },
          isDirty: true,
        })),
        
      setStructuralColors: (structuralColors) =>
        set((state) => ({
          theme: { ...state.theme, structuralColors },
          isDirty: true,
        })),
        
      setTextClasses: (textClasses) =>
        set((state) => ({
          theme: { ...state.theme, textClasses },
          isDirty: true,
        })),
        
      updateVisualStyles: (visualStyles) =>
        set((state) => ({
          theme: { ...state.theme, visualStyles },
          isDirty: true,
        })),
        
      updateVisualStyle: (visual, variant, value) =>
        set((state) => {
          const newVisualStyles = { ...state.theme.visualStyles };
          
          if (!newVisualStyles[visual]) {
            newVisualStyles[visual] = {};
          }
          
          newVisualStyles[visual][variant] = value;
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles },
            isDirty: true,
          };
        }),
      
      // Resolved data actions
      setResolvedPalettes: (colorPalette, neutralPalette) =>
        set((state) => ({
          resolved: {
            ...state.resolved,
            colorPalette,
            neutralPalette,
          },
        })),
        
      setPreviewTheme: (previewTheme) =>
        set((state) => ({
          resolved: {
            ...state.resolved,
            previewTheme,
          },
        })),

      // UI state actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      setSelectedVisual: (visual) => set({ selectedVisual: visual }),
      setSelectedVariant: (variant) => set({ selectedVariant: variant }),
      setSelectedState: (state) => set({ selectedState: state }),
      setSelectedSection: (section) => set({ selectedSection: section }),
      
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
        const visualStyles = state.theme.visualStyles?.[visual];
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
          const newVisualStyles = { ...state.theme.visualStyles };
          
          if (!newVisualStyles[visual]) {
            newVisualStyles[visual] = { '*': {} };
          }
          
          // Initialize the new variant with empty object
          newVisualStyles[visual][variantName] = {};
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles },
            selectedVariant: variantName,
            isDirty: true,
          };
        });
        get().addToHistory();
      },

      deleteVariant: (visual, variantName) => {
        if (variantName === '*') return; // Cannot delete default variant
        
        set((state) => {
          const newVisualStyles = { ...state.theme.visualStyles };
          
          if (newVisualStyles[visual]?.[variantName]) {
            delete newVisualStyles[visual][variantName];
          }
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles },
            selectedVariant: '*', // Reset to default
            isDirty: true,
          };
        });
        get().addToHistory();
      },

      // History actions
      addToHistory: () => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push({ ...state.theme });
          
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
              theme: { ...state.history[newIndex] },
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
              theme: { ...state.history[newIndex] },
              historyIndex: newIndex,
              isDirty: true,
            };
          }
          return state;
        });
      },

      // Loading/saving actions
      setIsSaving: (saving) => set({ isSaving: saving }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      setValidationErrors: (errors) => set({ validationErrors: errors }),
      
      saveTheme: async () => {
        const { theme } = get();
        set({ isSaving: true });
        
        try {
          const isUpdate = theme.id !== undefined;
          const url = isUpdate ? `/api/themes/${theme.id}` : '/api/themes';
          const method = isUpdate ? 'PUT' : 'POST';
          
          const payload = {
            name: theme.name,
            themeData: theme // Send the entire theme object
          };
          
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
            throw new Error('Failed to save theme');
          }
          
          const savedTheme = await response.json();
          
          // Update ID if it was a create operation
          if (!isUpdate && savedTheme.id) {
            set((state) => ({
              theme: { ...state.theme, id: savedTheme.id },
              isDirty: false
            }));
          } else {
            set({ isDirty: false });
          }
          
          return savedTheme;
        } finally {
          set({ isSaving: false });
        }
      },

      loadTheme: (themeData) => {
        // Extract theme data, handling both old and new formats
        const loadedTheme = themeData.themeData || themeData;
        
        // Ensure visualStyles has the proper structure for global properties
        const visualStyles = loadedTheme.visualStyles || {};
        if (!visualStyles['*']) {
          visualStyles['*'] = { '*': {} };
        } else if (!visualStyles['*']['*']) {
          visualStyles['*']['*'] = {};
        }
        
        // Ensure we have all required fields
        const theme: StudioTheme = {
          id: themeData.id,
          name: loadedTheme.name || themeData.name || 'Untitled Theme',
          description: loadedTheme.description || themeData.description || '',
          colorPaletteId: loadedTheme.colorPaletteId || loadedTheme.paletteReference?.colorPaletteId || loadedTheme.paletteId || DEFAULT_COLOR_PALETTE.id,
          neutralPaletteId: loadedTheme.neutralPaletteId || loadedTheme.paletteReference?.neutralPaletteId || AZURE_NEUTRAL_PALETTE.id,
          mode: loadedTheme.mode || 'light',
          fontFamily: loadedTheme.fontFamily || 'Segoe UI',
          structuralColors: loadedTheme.structuralColors || {},
          textClasses: loadedTheme.textClasses || {},
          visualStyles: visualStyles
        };
        
        set({
          theme,
          isDirty: false,
          history: [{ ...theme }],
          historyIndex: 0,
        });
      },

      resetTheme: () => {
        set({
          theme: { ...defaultStudioTheme },
          resolved: { ...defaultResolvedData },
          selectedVisual: '',
          selectedVariant: '*',
          selectedState: 'default',
          selectedSection: 'global',
          expandedPanels: [],
          isDirty: false,
          validationErrors: [],
          history: [{ ...defaultStudioTheme }],
          historyIndex: 0,
        });
      },

      createNewTheme: () => {
        // Create a fresh theme without any ID
        const newTheme = { ...defaultStudioTheme };
        delete newTheme.id; // Explicitly remove any ID
        
        // Ensure global properties structure exists
        if (!newTheme.visualStyles['*']) {
          newTheme.visualStyles['*'] = { '*': {} };
        }
        
        set({
          theme: newTheme,
          resolved: { ...defaultResolvedData },
          selectedVisual: '',
          selectedVariant: '*',
          selectedState: 'default',
          selectedSection: 'typography', // Keep default as typography
          expandedPanels: [],
          isDirty: false,
          validationErrors: [],
          history: [newTheme],
          historyIndex: 0,
        });
      },

      exportTheme: () => get().theme,
    }),
    {
      name: 'theme-studio-store',
    }
  )
);

