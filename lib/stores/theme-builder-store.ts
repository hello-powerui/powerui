import { create } from 'zustand';
import { ColorPalette, NeutralPalette } from './palette-store';

interface ThemeBuilderTheme {
  name: string;
  mode: 'light' | 'dark';
  palette: ColorPalette;
  neutralPalette: NeutralPalette;
  fontFamily: string;
  borderRadius: number;
  spacing: 'compact' | 'normal' | 'relaxed';
  bgStyle: string;
  borderStyle: string;
  paddingStyle?: string;
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
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  setIsSaving: (saving: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  resetTheme: () => void;
  generateAndSaveTheme: (name: string) => Promise<void>;
}

const defaultTheme: ThemeBuilderTheme = {
  name: 'Untitled Theme',
  mode: 'light',
  palette: {
    id: 'default',
    name: 'Default',
    colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999']
  },
  neutralPalette: {
    id: 'azure',
    name: 'Azure',
    shades: {
      '25': '#FBFDFF',
      '50': '#F5FAFF',
      '100': '#E6F3FF',
      '200': '#C2E4FF',
      '300': '#8CC7FF',
      '400': '#4DA6FF',
      '500': '#1A82E2',
      '600': '#0059CC',
      '700': '#003A8C',
      '800': '#00265E',
      '900': '#001A40',
      '950': '#001333'
    }
  },
  fontFamily: 'Segoe UI',
  borderRadius: 4,
  spacing: 'normal',
  bgStyle: 'default',
  borderStyle: 'default',
  paddingStyle: 'default'
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
    
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  
  resetTheme: () => set({ theme: defaultTheme }),
  
  generateAndSaveTheme: async (name: string) => {
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
        paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default'
      };
      
      // Save theme via API
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(themeInput)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save theme');
      }
      
      return await response.json();
    } finally {
      set({ isSaving: false });
    }
  }
}));