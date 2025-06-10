import { create } from 'zustand';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';

interface ThemeBuilderState {
  // Current theme configuration
  theme: ThemeGenerationInput;
  
  // UI state
  activeTab: 'color' | 'typography' | 'style';
  isSaving: boolean;
  isGenerating: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  
  // Actions
  setTheme: (theme: Partial<ThemeGenerationInput>) => void;
  updateThemeProperty: <K extends keyof ThemeGenerationInput>(
    key: K,
    value: ThemeGenerationInput[K]
  ) => void;
  setActiveTab: (tab: 'color' | 'typography' | 'style') => void;
  setIsSaving: (saving: boolean) => void;
  setIsGenerating: (generating: boolean) => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  resetTheme: () => void;
  loadTheme: (themeData: Partial<ThemeGenerationInput>) => void;
}

const defaultTheme: ThemeGenerationInput = {
  name: 'Untitled Theme',
  mode: 'light',
  neutralPalette: 'azure',
  fontFamily: 'segoe-ui',
  borderRadius: 4,
  dataColors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'],
  bgStyle: 'default',
  borderStyle: 'default',
  paddingStyle: 'default',
  showBorders: true,
  
  // Typography defaults
  fontSize: 14,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: 1.5,
  
  // Color defaults (using neutral palette)
  background: { solid: { color: '#FFFFFF' } },
  foreground: { solid: { color: '#000000' } },
  border: { solid: { color: '#E4E7E9' } },
  
  // Spacing defaults
  padding: {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16
  },
  spacing: 8,
  
  // Shadow defaults
  shadow: {
    color: '#000000',
    blur: 4,
    distance: 2,
    angle: 45,
    transparency: 0.1
  },
  
  // Visual-specific overrides (empty by default)
  visualStyles: {}
};

export const useThemeBuilderStore = create<ThemeBuilderState>((set) => ({
  theme: defaultTheme,
  activeTab: 'color',
  isSaving: false,
  isGenerating: false,
  previewMode: 'desktop',
  
  setTheme: (theme) =>
    set((state) => ({
      theme: { ...state.theme, ...theme },
    })),
    
  updateThemeProperty: (key, value) =>
    set((state) => ({
      theme: { ...state.theme, [key]: value },
    })),
    
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  
  resetTheme: () => set({ theme: defaultTheme }),
  
  loadTheme: (themeData) => 
    set({ 
      theme: { 
        ...defaultTheme, 
        ...themeData 
      } 
    }),
}));