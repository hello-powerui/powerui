import { create } from 'zustand'

interface Theme {
  id: string
  name: string
  dataColors: string[]
  neutralPalette: string
  fontFamily: string
  colorMode: 'light' | 'dark'
  borderRadius: number
  bgStyle: string
  borderStyle: string
  paddingStyle: string
  showBorders: boolean
}

interface ThemeStore {
  themes: Theme[]
  selectedThemeId: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setThemes: (themes: Theme[]) => void
  addTheme: (theme: Theme) => void
  updateTheme: (id: string, theme: Partial<Theme>) => void
  deleteTheme: (id: string) => void
  selectTheme: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themes: [],
  selectedThemeId: null,
  isLoading: false,
  error: null,
  
  setThemes: (themes) => set({ themes }),
  
  addTheme: (theme) => set((state) => ({ 
    themes: [...state.themes, theme] 
  })),
  
  updateTheme: (id, updatedTheme) => set((state) => ({
    themes: state.themes.map(theme => 
      theme.id === id ? { ...theme, ...updatedTheme } : theme
    )
  })),
  
  deleteTheme: (id) => set((state) => ({
    themes: state.themes.filter(theme => theme.id !== id),
    selectedThemeId: state.selectedThemeId === id ? null : state.selectedThemeId
  })),
  
  selectTheme: (id) => set({ selectedThemeId: id }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error })
}))