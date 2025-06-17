import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ColorPalette, NeutralPalette } from '@/lib/generated/prisma';
import { StructuralColors, TextClasses } from '@/lib/theme-generation/types';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';

interface FoundationState {
  // Color settings
  palette: ColorPalette;
  neutralPalette: NeutralPalette;
  paletteId?: string;
  neutralPaletteId?: string;
  
  // Typography
  fontFamily: string;
  textClasses?: TextClasses;
  
  // Structural colors
  structuralColors?: StructuralColors;
  structuralColorsMode: 'auto' | 'custom';
  
  // Theme mode
  themeMode: 'light' | 'dark';
  
  // Actions
  setPalette: (palette: ColorPalette, paletteId?: string) => void;
  setNeutralPalette: (palette: NeutralPalette, neutralPaletteId?: string) => void;
  setFontFamily: (fontFamily: string) => void;
  setStructuralColors: (colors: StructuralColors) => void;
  setStructuralColorsMode: (mode: 'auto' | 'custom') => void;
  setTextClasses: (textClasses: TextClasses) => void;
  setTextClass: (className: keyof TextClasses, value: any) => void;
  updateTextClasses: (textClasses: Record<string, any>) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  reset: () => void;
}

const defaultFoundation = {
  palette: DEFAULT_COLOR_PALETTE,
  neutralPalette: AZURE_NEUTRAL_PALETTE,
  fontFamily: 'wf_standard-font, helvetica, arial, sans-serif',
  structuralColorsMode: 'auto' as const,
  themeMode: 'light' as const,
};

export const useFoundationStore = create<FoundationState>()(
  devtools(
    (set) => ({
      // Initial state
      ...defaultFoundation,

      // Actions
      setPalette: (palette, paletteId) => set({ 
        palette, 
        paletteId,
        structuralColors: undefined // Reset when palette changes
      }),
      
      setNeutralPalette: (neutralPalette, neutralPaletteId) => set({ 
        neutralPalette, 
        neutralPaletteId,
        structuralColors: undefined // Reset when palette changes
      }),
      
      setFontFamily: (fontFamily) => set({ fontFamily }),
      
      setStructuralColors: (structuralColors) => set({ 
        structuralColors,
        structuralColorsMode: 'custom'
      }),
      
      setStructuralColorsMode: (mode) => set((state) => ({
        structuralColorsMode: mode,
        structuralColors: mode === 'auto' ? undefined : state.structuralColors
      })),
      
      setTextClasses: (textClasses) => set({ textClasses }),
      
      setTextClass: (className, value) => {
        set((state) => ({
          textClasses: {
            ...state.textClasses,
            [className]: value
          } as TextClasses
        }));
      },
      
      updateTextClasses: (updates) => {
        set((state) => ({
          textClasses: {
            ...state.textClasses,
            ...updates
          } as TextClasses
        }));
      },
      
      setThemeMode: (themeMode) => set({ themeMode }),
      
      reset: () => set(defaultFoundation),
    }),
    {
      name: 'foundation-store',
    }
  )
);