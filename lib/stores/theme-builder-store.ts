import { create } from 'zustand';
import { ColorPalette, NeutralPalette } from '@/lib/generated/prisma';
import { StructuralColors, TextClasses } from '@/lib/theme-generation/types';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';

interface ThemeBuilderTheme {
  id?: string;
  name: string;
  description?: string;
  mode: 'light' | 'dark';
  palette: ColorPalette;
  neutralPalette: NeutralPalette;
  fontFamily: string;
  borderRadius: number;
  spacing: 'compact' | 'normal' | 'relaxed';
  bgStyle: string;
  borderStyle: string;
  paddingStyle?: string;
  structuralColors?: StructuralColors;
  textClasses?: TextClasses;
  structuralColorsMode?: 'auto' | 'custom';
}

interface ThemeBuilderState {
  // Current theme configuration
  theme: ThemeBuilderTheme;
  
  // UI state
  activeTab: 'color' | 'typography' | 'style';
  isSaving: boolean;
  isGenerating: boolean;
  
  // Actions
  setTheme: (theme: Partial<ThemeBuilderTheme>) => void;
  setPalette: (palette: ColorPalette) => void;
  setNeutralPalette: (palette: NeutralPalette) => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setFontFamily: (fontFamily: string) => void;
  setBorderRadius: (radius: number) => void;
  setSpacing: (spacing: 'compact' | 'normal' | 'relaxed') => void;
  setBgStyle: (style: string) => void;
  setBorderStyle: (style: string) => void;
  setStructuralColors: (colors: StructuralColors) => void;
  setStructuralColorsMode: (mode: 'auto' | 'custom') => void;
  setTextClasses: (textClasses: TextClasses) => void;
  setTextClass: (className: keyof TextClasses, value: any) => void;
  updateTextClasses: (textClasses: Record<string, any>) => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  setIsSaving: (saving: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  resetTheme: () => void;
  generateAndSaveTheme: (name: string, visualStyles?: Record<string, any>) => Promise<void>;
}

const defaultTheme: ThemeBuilderTheme = {
  name: 'Untitled Theme',
  mode: 'light',
  palette: DEFAULT_COLOR_PALETTE,
  neutralPalette: AZURE_NEUTRAL_PALETTE,
  fontFamily: 'Segoe UI',
  borderRadius: 4,
  spacing: 'normal',
  bgStyle: 'default',
  borderStyle: 'default',
  paddingStyle: 'default',
  structuralColorsMode: 'auto',
  structuralColors: {},
  textClasses: {}
};

export const useThemeBuilderStore = create<ThemeBuilderState>((set, get) => ({
  theme: defaultTheme,
  activeTab: 'color',
  isSaving: false,
  isGenerating: false,
  
  setTheme: (theme) =>
    set((state) => ({
      theme: { ...state.theme, ...theme },
    })),
    
  setPalette: (palette) =>
    set((state) => ({
      theme: { ...state.theme, palette },
    })),
    
  setNeutralPalette: (neutralPalette) =>
    set((state) => ({
      theme: { ...state.theme, neutralPalette },
    })),
    
  setThemeMode: (mode) =>
    set((state) => ({
      theme: { ...state.theme, mode },
    })),
    
  setFontFamily: (fontFamily) =>
    set((state) => ({
      theme: { ...state.theme, fontFamily },
    })),
    
  setBorderRadius: (borderRadius) =>
    set((state) => ({
      theme: { ...state.theme, borderRadius },
    })),
    
  setSpacing: (spacing) =>
    set((state) => ({
      theme: { ...state.theme, spacing },
    })),
    
  setBgStyle: (bgStyle) =>
    set((state) => ({
      theme: { ...state.theme, bgStyle },
    })),
    
  setBorderStyle: (borderStyle) =>
    set((state) => ({
      theme: { ...state.theme, borderStyle },
    })),
    
  setStructuralColors: (structuralColors) =>
    set((state) => ({
      theme: { ...state.theme, structuralColors },
    })),
    
  setStructuralColorsMode: (mode) =>
    set((state) => ({
      theme: { ...state.theme, structuralColorsMode: mode },
    })),
    
  setTextClasses: (textClasses) =>
    set((state) => ({
      theme: { ...state.theme, textClasses },
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
    })),
    
  updateTextClasses: (textClasses) =>
    set((state) => ({
      theme: { ...state.theme, textClasses }
    })),
    
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  
  resetTheme: () => set({ theme: defaultTheme }),
  
  generateAndSaveTheme: async (name: string, visualStyles?: Record<string, any>) => {
    const { theme } = get();
    set({ isSaving: true });
    
    try {
      // Transform theme to match API expectations
      const themeInput = {
        name: name || theme.name,
        mode: theme.mode,
        dataColors: theme.palette.colors,
        neutralPalette: theme.neutralPalette.shades,
        fontFamily: theme.fontFamily.toLowerCase().replace(/\s+/g, '-'),
        borderRadius: theme.borderRadius,
        bgStyle: theme.bgStyle || 'default',
        borderStyle: theme.borderStyle || 'default',
        spacing: theme.spacing,
        paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default',
        structuralColors: theme.structuralColorsMode === 'custom' ? theme.structuralColors : undefined,
        structuralColorsMode: theme.structuralColorsMode,
        textClasses: theme.textClasses && Object.keys(theme.textClasses).length > 0 ? theme.textClasses : undefined,
        visualStyles: visualStyles && Object.keys(visualStyles).length > 0 ? visualStyles : undefined,
        // Include full theme data for reloading
        themeData: {
          ...theme,
          palette: theme.palette.colors,
          neutralPalette: theme.neutralPalette.shades,
          visualStyles: visualStyles
        }
      };
      
      // Determine if this is an update or create operation
      const isUpdate = theme.id !== undefined;
      const url = isUpdate ? `/api/themes/${theme.id}` : '/api/themes';
      const method = isUpdate ? 'PUT' : 'POST';
      
      // Save theme via API
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(themeInput)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save theme');
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
  }
}));