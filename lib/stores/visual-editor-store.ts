import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface VisualEditorState {
  // Selection state
  selectedVisual: string;
  selectedStyle: string;
  selectedVariant: string;
  selectedProperty: string;
  selectedState: string; // For state-driven properties (default, hover, selected, etc.)
  
  // Actions
  setSelectedVisual: (visual: string) => void;
  setSelectedStyle: (style: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedProperty: (property: string) => void;
  setSelectedState: (state: string) => void;
  
  // Variant management
  getVisualVariants: (visual: string, currentTheme: any) => string[];
  createVariant: (visual: string, variantName: string, updateTheme: (theme: any) => void) => void;
  deleteVariant: (visual: string, variantName: string, updateTheme: (theme: any) => void) => void;
  
  // Helper to clear selections
  clearSelections: () => void;
}

export const useVisualEditorStore = create<VisualEditorState>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedVisual: '',
      selectedStyle: '*',
      selectedVariant: '*',
      selectedProperty: '',
      selectedState: 'default',

      // Actions
      setSelectedVisual: (visual) => set({ 
        selectedVisual: visual,
        selectedStyle: '*',
        selectedVariant: '*',
        selectedProperty: '',
      }),
      
      setSelectedStyle: (style) => set({ selectedStyle: style }),
      setSelectedVariant: (variant) => set({ selectedVariant: variant }),
      setSelectedProperty: (property) => set({ selectedProperty: property }),
      setSelectedState: (state) => set({ selectedState: state }),

      // Variant management
      getVisualVariants: (visual, currentTheme) => {
        if (!currentTheme?.visualStyles?.[visual]) {
          return ['*'];
        }
        return Object.keys(currentTheme.visualStyles[visual]);
      },

      createVariant: (visual, variantName, updateTheme) => {
        updateTheme((theme: any) => {
          const newTheme = { ...theme };
          
          if (!newTheme.visualStyles) {
            newTheme.visualStyles = {};
          }
          
          if (!newTheme.visualStyles[visual]) {
            newTheme.visualStyles[visual] = {};
          }
          
          // Copy from default variant or create empty
          const defaultVariant = newTheme.visualStyles[visual]['*'] || {};
          newTheme.visualStyles[visual][variantName] = { ...defaultVariant };
          
          return newTheme;
        });
        
        set({ selectedVariant: variantName });
      },

      deleteVariant: (visual, variantName, updateTheme) => {
        if (variantName === '*') return; // Can't delete default variant
        
        updateTheme((theme: any) => {
          const newTheme = { ...theme };
          
          if (newTheme.visualStyles?.[visual]?.[variantName]) {
            delete newTheme.visualStyles[visual][variantName];
            
            // Clean up if no variants left except default
            if (Object.keys(newTheme.visualStyles[visual]).length === 0) {
              delete newTheme.visualStyles[visual];
            }
          }
          
          return newTheme;
        });
        
        set({ selectedVariant: '*' });
      },

      clearSelections: () => set({
        selectedVisual: '',
        selectedStyle: '*',
        selectedVariant: '*',
        selectedProperty: '',
        selectedState: 'default',
      }),
    }),
    {
      name: 'visual-editor-store',
    }
  )
);