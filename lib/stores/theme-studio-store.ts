import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme, StudioThemeData, SchemaValidationError } from '@/lib/theme-studio/types';
import { ColorPalette, NeutralPalette } from '@prisma/client';
import { StructuralColors, TextClasses, TextClass } from '@/lib/theme-generation/types';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';
import isEqual from 'fast-deep-equal';
import { cleanupVisualStyles } from '@/lib/utils/theme-helpers';
import { detectQuickCustomizationsFromVisualStyles, isPropertyControlledByQuickCustomization } from '@/lib/theme-studio/quick-customization-utils';
import { computeVariantStyle, getPropertySources } from '@/lib/theme-generation/variant-merge-utils';

// Single unified theme structure
interface StudioTheme {
  // Metadata
  id?: string;
  name: string;
  description?: string;
  
  // Foundation settings (stored as IDs only)
  colorPaletteId: string;
  neutralPaletteId: string;
  brandPalette?: Record<string, string>;
  brandColor?: string;
  successPalette?: string;
  warningPalette?: string;
  errorPalette?: string;
  mode: 'light' | 'dark';
  fontFamily: string;
  structuralColors?: StructuralColors;
  textClasses?: TextClasses;
  
  // Quick Customizations
  quickCustomizations?: {
    paddingStyle?: 'small' | 'medium' | 'large';
    borderRadius?: 'none' | 'small' | 'medium' | 'large';
    borderStyle?: 'default' | 'subtle' | 'none';
    backgroundStyle?: 'default' | 'subtle' | 'inversed';
  };
  
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
  
  // Force refresh counter for palette resolution
  paletteRefreshCounter: number;
  
  // UI state
  selectedVisual: string;
  selectedStyle: string;
  selectedVariant: string;
  selectedProperty: string;
  selectedSection: 'typography' | 'structural' | 'visuals' | 'global' | 'canvas';
  selectedState: string; // For state-driven properties (default, hover, selected, etc.)
  expandedPanels: string[];
  isSaving: boolean;
  isLoading: boolean;
  isGenerating: boolean;
  validationErrors: SchemaValidationError[];
  activeTab: 'color' | 'typography' | 'style';
  
  // Theme actions (simplified and unified)
  updateTheme: (updates: Partial<StudioTheme>) => void;
  setColorPaletteId: (paletteId: string) => void;
  setNeutralPaletteId: (paletteId: string) => void;
  setBrandPalette: (palette: Record<string, string>) => void;
  setStatePalette: (type: 'success' | 'warning' | 'error', paletteName: string) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setFontFamily: (fontFamily: string) => void;
  setStructuralColors: (colors: StructuralColors) => void;
  setTextClasses: (textClasses: TextClasses) => void;
  updateTextClassProperty: (className: keyof TextClasses, property: keyof TextClass, value: any) => void;
  updateVisualStyles: (visualStyles: Record<string, any>) => void;
  updateVisualStyle: (visual: string, variant: string, value: any) => void;
  setQuickCustomization: (key: keyof NonNullable<StudioTheme['quickCustomizations']>, value: string) => void;
  
  // Resolved data actions
  setResolvedPalettes: (colorPalette: ColorPalette | null, neutralPalette: NeutralPalette | null) => void;
  setPreviewTheme: (previewTheme: PowerBITheme | null) => void;
  refreshPalettes: () => void;
  forceRefreshCurrentPalettes: () => void;
  
  // UI state actions
  setSelectedVisual: (visual: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedState: (state: string) => void;
  setSelectedSection: (section: 'typography' | 'structural' | 'visuals' | 'global' | 'canvas') => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  togglePanel: (panelId: string) => void;
  
  // Variant management
  getVisualVariants: (visual: string) => string[];
  createVariant: (visual: string, variantName: string, initialData?: any) => void;
  deleteVariant: (visual: string, variantName: string) => void;
  renameVariant: (visual: string, oldName: string, newName: string) => void;
  
  // Computed style methods (for showing merged styles in UI)
  getComputedStyle: (visual: string, variant: string) => any;
  getPropertySource: (visual: string, variant: string, property: string) => 'inherited' | 'overridden' | 'new' | null;
  
  // Loading/saving actions
  setIsSaving: (saving: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setValidationErrors: (errors: SchemaValidationError[]) => void;
  saveTheme: () => Promise<void>;
  loadTheme: (themeData: any) => void;
  resetTheme: () => void;
  createNewTheme: () => void;
  
  // Clear section actions
  clearTypography: () => void;
  clearStructuralColors: () => void;
  clearTextClasses: () => void;
  clearVisualSection: (visual: string, variant: string, section: string) => void;
}

const defaultStudioTheme: StudioTheme = {
  name: 'Untitled Theme',
  description: '',
  colorPaletteId: DEFAULT_COLOR_PALETTE.id,
  neutralPaletteId: AZURE_NEUTRAL_PALETTE.id,
  brandColor: '#2568E8',
  successPalette: 'green',
  warningPalette: 'amber',
  errorPalette: 'red',
  mode: 'light',
  fontFamily: 'Segoe UI',
  structuralColors: {},
  textClasses: {},
  quickCustomizations: {
    paddingStyle: 'medium',
    borderRadius: 'medium',
    borderStyle: 'default',
    backgroundStyle: 'default'
  },
  visualStyles: {}
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
      paletteRefreshCounter: 0,
      
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
      isSaving: false,
      isLoading: false,
      isGenerating: false,
      validationErrors: [],

      // Theme actions (simplified and unified)
      updateTheme: (updates) =>
        set((state) => {
          // Deep equality check for complex properties
          const hasChanges = Object.keys(updates).some(key => {
            const oldValue = state.theme[key as keyof StudioTheme];
            const newValue = updates[key as keyof StudioTheme];
            
            // Use fast-deep-equal for accurate comparison
            return !isEqual(oldValue, newValue);
          });
          
          if (!hasChanges) {
            return state; // No actual changes, return current state
          }
          
          const newTheme = { ...state.theme, ...updates };
          return {
            theme: newTheme
          };
        }),
        
      setColorPaletteId: (paletteId) =>
        set((state) => ({
          theme: { ...state.theme, colorPaletteId: paletteId }
        })),
        
      setNeutralPaletteId: (paletteId) =>
        set((state) => ({
          theme: { ...state.theme, neutralPaletteId: paletteId }
        })),
        
      setBrandPalette: (palette) =>
        set((state) => ({
          theme: { ...state.theme, brandPalette: palette }
        })),
        
      setStatePalette: (type, paletteName) =>
        set((state) => ({
          theme: { 
            ...state.theme, 
            [`${type}Palette`]: paletteName 
          }
        })),
        
      setThemeMode: (mode) =>
        set((state) => ({
          theme: { ...state.theme, mode }
        })),
        
      setFontFamily: (fontFamily) =>
        set((state) => ({
          theme: { ...state.theme, fontFamily }
        })),
        
      setStructuralColors: (structuralColors) =>
        set((state) => ({
          theme: { ...state.theme, structuralColors }
        })),
        
      setTextClasses: (textClasses) =>
        set((state) => ({
          theme: { ...state.theme, textClasses }
        })),
        
      updateTextClassProperty: (className, property, value) =>
        set((state) => {
          const newTextClasses = { ...state.theme.textClasses };
          
          // Initialize the text class if it doesn't exist
          if (!newTextClasses[className]) {
            newTextClasses[className] = {} as TextClass;
          }
          
          // Update only the specific property
          newTextClasses[className] = {
            ...newTextClasses[className],
            [property]: value
          };
          
          return {
            theme: { ...state.theme, textClasses: newTextClasses }
          };
        }),
        
      updateVisualStyles: (visualStyles) =>
        set((state) => {
          const cleanedVisualStyles = cleanupVisualStyles(visualStyles);
          return {
            theme: { ...state.theme, visualStyles: cleanedVisualStyles }
          };
        }),
        
      updateVisualStyle: (visual, variant, value) =>
        set((state) => {
          const newVisualStyles = { ...state.theme.visualStyles };
          
          // Check if value is empty or should be removed
          const isEmpty = !value || (typeof value === 'object' && Object.keys(value).length === 0);
          
          if (isEmpty) {
            // Remove the variant if it exists
            if (newVisualStyles[visual]?.[variant]) {
              delete newVisualStyles[visual][variant];
              
              // Clean up empty visual object
              if (Object.keys(newVisualStyles[visual]).length === 0) {
                delete newVisualStyles[visual];
              }
            }
          } else {
            // Add or update the value
            if (!newVisualStyles[visual]) {
              newVisualStyles[visual] = {};
            }
            newVisualStyles[visual][variant] = value;
          }
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles }
          };
        }),
        
      setQuickCustomization: (key, value) =>
        set((state) => ({
          theme: { 
            ...state.theme, 
            quickCustomizations: {
              ...state.theme.quickCustomizations,
              [key]: value
            }
          }
        })),
      
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
        
      refreshPalettes: () =>
        set((state) => ({
          paletteRefreshCounter: state.paletteRefreshCounter + 1,
        })),
        
      forceRefreshCurrentPalettes: () =>
        set((state) => ({
          paletteRefreshCounter: state.paletteRefreshCounter + 1,
          // Also clear resolved palettes to force fresh resolution
          resolved: {
            ...state.resolved,
            colorPalette: null,
            neutralPalette: null,
          }
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

      createVariant: (visual, variantName, initialData = {}) => {
        if (!variantName || variantName === '*') return;
        
        set((state) => {
          const newVisualStyles = { ...state.theme.visualStyles };
          
          if (!newVisualStyles[visual]) {
            newVisualStyles[visual] = { '*': {} };
          }
          
          // Initialize the new variant with provided data or empty object
          newVisualStyles[visual][variantName] = initialData;
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles },
            selectedVariant: variantName,
          };
        });
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
          };
        });
      },

      renameVariant: (visual, oldName, newName) => {
        if (oldName === '*' || newName === '*') return; // Cannot rename default variant
        if (oldName === newName) return; // No change needed
        
        set((state) => {
          const newVisualStyles = { ...state.theme.visualStyles };
          
          // Check if the old variant exists
          if (!newVisualStyles[visual]?.[oldName]) return state;
          
          // Check if the new name already exists
          if (newVisualStyles[visual]?.[newName]) {
            console.warn(`Variant "${newName}" already exists for ${visual}`);
            return state;
          }
          
          // Copy the variant data to the new name
          newVisualStyles[visual][newName] = newVisualStyles[visual][oldName];
          
          // Delete the old variant
          delete newVisualStyles[visual][oldName];
          
          return {
            theme: { ...state.theme, visualStyles: newVisualStyles },
            selectedVariant: newName, // Update selection to the new name
          };
        });
      },
      
      // Computed style methods
      getComputedStyle: (visual, variant) => {
        const state = get();
        return computeVariantStyle(state.theme.visualStyles, visual, variant);
      },
      
      getPropertySource: (visual, variant, property) => {
        const state = get();
        const visualStyles = state.theme.visualStyles;
        
        if (!visualStyles[visual]) return null;
        
        const baseStyle = visualStyles[visual]['*'] || {};
        const variantStyle = visualStyles[visual][variant] || {};
        const computedStyle = computeVariantStyle(visualStyles, visual, variant);
        
        if (!computedStyle || !(property in computedStyle)) return null;
        
        const sources = getPropertySources(baseStyle, variantStyle, computedStyle);
        return sources.get(property) || null;
      },

      // Loading/saving actions
      setIsSaving: (saving) => set({ isSaving: saving }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      setValidationErrors: (errors) => set({ validationErrors: errors }),
      
      saveTheme: async () => {
        const { theme } = get();
        
        // Set saving state
        set({ isSaving: true });
        
        try {
          const isUpdate = theme.id !== undefined;
          const url = isUpdate ? `/api/themes/${theme.id}` : '/api/themes';
          const method = isUpdate ? 'PUT' : 'POST';
          
          // Extract only the theme data fields, excluding metadata
          const { id, ...themeDataFields } = theme;
          
          const payload = {
            name: theme.name,
            description: theme.description,
            themeData: themeDataFields // Send only the theme configuration data
          };
          
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Save theme failed:', response.status, errorText);
            throw new Error(`Failed to save theme: ${response.status} ${errorText}`);
          }
          
          const savedTheme = await response.json();
          
          // Update state after successful save
          set((state) => ({
            theme: !isUpdate && savedTheme.id 
              ? { ...state.theme, id: savedTheme.id }
              : state.theme,
            isSaving: false
          }));
          
          return savedTheme;
        } catch (error) {
          // Only update isSaving on error
          set({ isSaving: false });
          throw error;
        }
      },

      loadTheme: (themeData) => {
        // Extract theme data, handling both old and new formats
        const loadedTheme = themeData.themeData || themeData;
        
        // Use visualStyles as-is from the loaded theme
        const visualStyles = loadedTheme.visualStyles || {};
        
        // Ensure we have all required fields
        const theme: StudioTheme = {
          id: themeData.id,
          name: loadedTheme.name || themeData.name || 'Untitled Theme',
          description: loadedTheme.description || themeData.description || '',
          colorPaletteId: loadedTheme.colorPaletteId || loadedTheme.paletteReference?.colorPaletteId || loadedTheme.paletteId || DEFAULT_COLOR_PALETTE.id,
          neutralPaletteId: loadedTheme.neutralPaletteId || loadedTheme.paletteReference?.neutralPaletteId || AZURE_NEUTRAL_PALETTE.id,
          successPalette: loadedTheme.successPalette,
          warningPalette: loadedTheme.warningPalette,
          errorPalette: loadedTheme.errorPalette,
          mode: loadedTheme.mode || 'light',
          fontFamily: loadedTheme.fontFamily || 'Segoe UI',
          structuralColors: loadedTheme.structuralColors || {},
          textClasses: loadedTheme.textClasses || {},
          quickCustomizations: loadedTheme.quickCustomizations || {
            paddingStyle: 'medium',
            borderRadius: 'medium',
            borderStyle: 'default',
            backgroundStyle: 'default'
          },
          visualStyles: visualStyles
        };
        
        set({
          theme
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
          validationErrors: []
        });
      },

      createNewTheme: () => {
        // Create a fresh theme without any ID
        const newTheme = { ...defaultStudioTheme };
        delete newTheme.id; // Explicitly remove any ID
        
        
        set({
          theme: newTheme,
          resolved: { ...defaultResolvedData },
          selectedVisual: '',
          selectedVariant: '*',
          selectedState: 'default',
          selectedSection: 'typography', // Keep default as typography
          expandedPanels: [],
          validationErrors: []
        });
      },

    }),
    {
      name: 'theme-studio-store',
    }
  )
);

