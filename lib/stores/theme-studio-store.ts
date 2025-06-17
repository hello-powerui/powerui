import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme, StudioThemeData, SchemaValidationError } from '@/lib/theme-studio/types';
import { ColorPalette, NeutralPalette } from '@/lib/generated/prisma';
import { StructuralColors, TextClasses } from '@/lib/theme-generation/types';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';

// Unified theme interface combining foundation and visual styles
interface UnifiedTheme extends PowerBITheme {
  id?: string;
  description?: string;
  palette: ColorPalette;
  neutralPalette: NeutralPalette;
  fontFamily: string;
  structuralColors?: StructuralColors;
  textClasses?: TextClasses;
  structuralColorsMode?: 'auto' | 'custom';
  // Store palette references for reloading
  paletteId?: string;
  neutralPaletteId?: string;
}

interface ThemeStudioState {
  // Theme data
  currentTheme: PowerBITheme;
  theme: UnifiedTheme; // Foundation settings
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
  isGenerating: boolean;
  validationErrors: SchemaValidationError[];
  activeTab: 'color' | 'typography' | 'style';
  
  // History for undo/redo
  history: PowerBITheme[];
  historyIndex: number;
  maxHistorySize: number;
  
  // Foundation actions (from theme-builder)
  setTheme: (theme: Partial<UnifiedTheme>) => void;
  setPalette: (palette: ColorPalette) => void;
  setNeutralPalette: (palette: NeutralPalette) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setFontFamily: (fontFamily: string) => void;
  setStructuralColors: (colors: StructuralColors) => void;
  setStructuralColorsMode: (mode: 'auto' | 'custom') => void;
  setTextClasses: (textClasses: TextClasses) => void;
  setTextClass: (className: keyof TextClasses, value: any) => void;
  updateTextClasses: (textClasses: Record<string, any>) => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  setIsSaving: (saving: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  generateAndSaveTheme: (name: string, visualStyles?: Record<string, any>) => Promise<void>;
  
  // Visual styles actions (original theme studio)
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
  setThemeMetadata: (metadata: Partial<ThemeStudioState['themeMetadata']>) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  addToHistory: (theme: PowerBITheme) => void;
  
  // Loading/saving states
  setIsLoading: (loading: boolean) => void;
  setValidationErrors: (errors: SchemaValidationError[]) => void;
  
  // Theme management
  loadTheme: (themeData: StudioThemeData) => void;
  resetTheme: () => void;
  exportTheme: () => PowerBITheme;
}

const defaultTheme: PowerBITheme = {
  name: 'Untitled Theme',
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

const defaultUnifiedTheme: UnifiedTheme = {
  ...defaultTheme,
  palette: DEFAULT_COLOR_PALETTE,
  neutralPalette: AZURE_NEUTRAL_PALETTE,
  fontFamily: 'Segoe UI',
  structuralColorsMode: 'auto',
  structuralColors: {},
  textClasses: {},
  paletteId: DEFAULT_COLOR_PALETTE.id,
  neutralPaletteId: AZURE_NEUTRAL_PALETTE.id,
  visualStyles: {}
};

export const useThemeStudioStore = create<ThemeStudioState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTheme: { ...defaultTheme },
      theme: defaultUnifiedTheme,
      themeMetadata: {
        name: 'Untitled Theme',
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
      isGenerating: false,
      validationErrors: [],
      activeTab: 'color',
      history: [{ ...defaultTheme }],
      historyIndex: 0,
      maxHistorySize: 50,

      // Foundation actions (from theme-builder)
      setTheme: (themeUpdate) =>
        set((state) => ({
          theme: { ...state.theme, ...themeUpdate },
          currentTheme: { 
            ...state.currentTheme, 
            name: themeUpdate.name || state.currentTheme.name,
            mode: themeUpdate.mode || state.currentTheme.mode,
            dataColors: themeUpdate.palette?.colors ? (Array.isArray(themeUpdate.palette.colors) ? themeUpdate.palette.colors as string[] : []) : state.currentTheme.dataColors
          },
          isDirty: true,
        })),
        
      setPalette: (palette) =>
        set((state) => ({
          theme: { ...state.theme, palette },
          currentTheme: { ...state.currentTheme, dataColors: Array.isArray(palette.colors) ? palette.colors as string[] : [] },
          isDirty: true,
        })),
        
      setNeutralPalette: (neutralPalette) =>
        set((state) => ({
          theme: { 
            ...state.theme, 
            neutralPalette,
            neutralPaletteId: neutralPalette.id || state.theme.neutralPaletteId
          },
          isDirty: true,
        })),
        
      setThemeMode: (mode) =>
        set((state) => ({
          theme: { ...state.theme, mode },
          currentTheme: { ...state.currentTheme, mode },
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
        
      setStructuralColorsMode: (mode) =>
        set((state) => ({
          theme: { ...state.theme, structuralColorsMode: mode },
          isDirty: true,
        })),
        
      setTextClasses: (textClasses) =>
        set((state) => ({
          theme: { ...state.theme, textClasses },
          isDirty: true,
        })),
        
      setTextClass: (className, value) =>
        set((state) => ({
          theme: {
            ...state.theme,
            textClasses: {
              ...state.theme.textClasses,
              [className]: value
            }
          },
          isDirty: true,
        })),
        
      updateTextClasses: (textClasses) =>
        set((state) => ({
          theme: { ...state.theme, textClasses },
          isDirty: true,
        })),
        
      setActiveTab: (tab) => set({ activeTab: tab }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      
      generateAndSaveTheme: async (name: string, visualStyles?: Record<string, any>) => {
        const { theme } = get();
        set({ isSaving: true });
        
        try {
          // Create a single, complete theme data object
          const completeThemeData = {
            id: theme.id,
            name: name || theme.name,
            description: theme.description,
            mode: theme.mode,
            palette: theme.palette,
            neutralPalette: theme.neutralPalette,
            fontFamily: theme.fontFamily,
            structuralColors: theme.structuralColors,
            structuralColorsMode: theme.structuralColorsMode,
            textClasses: theme.textClasses,
            visualStyles: visualStyles || {},
            // Include palette references
            paletteId: theme.paletteId || theme.palette.id,
            neutralPaletteId: theme.neutralPaletteId || theme.neutralPalette.id
          };
          
          // Prepare the API payload
          const apiPayload = {
            name: completeThemeData.name,
            description: completeThemeData.description,
            themeData: completeThemeData
          };
          
          // Determine if this is an update or create operation
          const isUpdate = theme.id !== undefined;
          const url = isUpdate ? `/api/themes/${theme.id}` : '/api/themes';
          const method = isUpdate ? 'PUT' : 'POST';
          
          // Save theme via API
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload)
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            const errorMessage = response.status === 404 
              ? `Theme not found (ID: ${theme.id}). The theme may have been deleted or you don't have permission to edit it.`
              : `Failed to save theme: ${errorData.error || response.statusText}`;
            throw new Error(errorMessage);
          }
          
          const savedTheme = await response.json();
          
          // Update the theme ID if this was a create operation
          if (!isUpdate && savedTheme.id) {
            set({ theme: { ...theme, id: savedTheme.id } });
          }
          
          return savedTheme;
        } finally {
          set({ isSaving: false });
        }
      },

      // Visual styles actions (original theme studio)
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
          theme: defaultUnifiedTheme,
          themeMetadata: {
            name: 'Untitled Theme',
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
      name: 'theme-studio-store',
    }
  )
);

