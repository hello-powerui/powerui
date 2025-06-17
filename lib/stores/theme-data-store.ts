import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PowerBITheme, StudioThemeData } from '@/lib/theme-studio/types';

interface ThemeMetadata {
  id?: string;
  name: string;
  description?: string;
  schemaVersion: string;
}

interface ThemeDataState {
  // Core theme data
  currentTheme: PowerBITheme;
  themeMetadata: ThemeMetadata;
  
  // State
  isDirty: boolean;
  
  // Actions
  updateThemeProperty: (path: string[], value: any) => void;
  updateVisualStyle: (visual: string, style: string, value: any) => void;
  setThemeMetadata: (metadata: Partial<ThemeMetadata>) => void;
  loadTheme: (themeData: StudioThemeData) => void;
  resetTheme: () => void;
  exportTheme: () => PowerBITheme & { name: string };
  markDirty: () => void;
  markClean: () => void;
}

const defaultTheme: PowerBITheme = {
  name: 'Custom Theme',
  visualStyles: {},
};

export const useThemeDataStore = create<ThemeDataState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTheme: { ...defaultTheme },
      themeMetadata: {
        name: 'Untitled Theme',
        schemaVersion: '2.143',
      },
      isDirty: false,

      // Actions
      updateThemeProperty: (path, value) => {
        set((state) => {
          const newTheme = { ...state.currentTheme };
          let current: any = newTheme;
          
          for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!(key in current)) {
              current[key] = {};
            }
            current = current[key];
          }
          
          const lastKey = path[path.length - 1];
          if (value === undefined || value === null || value === '') {
            delete current[lastKey];
          } else {
            current[lastKey] = value;
          }
          
          return {
            currentTheme: newTheme,
            isDirty: true,
          };
        });
      },

      updateVisualStyle: (visual, style, value) => {
        set((state) => {
          const newTheme = { ...state.currentTheme };
          
          if (!newTheme.visualStyles) {
            newTheme.visualStyles = {};
          }
          
          if (!newTheme.visualStyles[visual]) {
            newTheme.visualStyles[visual] = { '*': {} };
          }
          
          if (!newTheme.visualStyles[visual]['*']) {
            newTheme.visualStyles[visual]['*'] = {};
          }
          
          if (value === undefined || value === null || value === '') {
            delete newTheme.visualStyles[visual]['*'][style];
            
            // Clean up empty objects
            if (Object.keys(newTheme.visualStyles[visual]['*']).length === 0) {
              delete newTheme.visualStyles[visual]['*'];
            }
            if (Object.keys(newTheme.visualStyles[visual]).length === 0) {
              delete newTheme.visualStyles[visual];
            }
          } else {
            newTheme.visualStyles[visual]['*'][style] = value;
          }
          
          return {
            currentTheme: newTheme,
            isDirty: true,
          };
        });
      },

      setThemeMetadata: (metadata) => {
        set((state) => ({
          themeMetadata: { ...state.themeMetadata, ...metadata },
          isDirty: true,
        }));
      },

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
        });
      },

      resetTheme: () => {
        set({
          currentTheme: { ...defaultTheme },
          themeMetadata: {
            name: 'Untitled Theme',
            schemaVersion: '2.143',
          },
          isDirty: false,
        });
      },

      exportTheme: () => {
        const state = get();
        return {
          ...state.currentTheme,
          name: state.themeMetadata.name,
        };
      },

      markDirty: () => set({ isDirty: true }),
      markClean: () => set({ isDirty: false }),
    }),
    {
      name: 'theme-data-store',
    }
  )
);