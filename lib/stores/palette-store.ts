import { create } from 'zustand'
import { ColorPalette, NeutralPalette } from '@/lib/generated/prisma'

interface PaletteStore {
  colorPalettes: ColorPalette[]
  neutralPalettes: NeutralPalette[]
  selectedColorPaletteId: string | null
  selectedNeutralPaletteId: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  loadPalettes: () => Promise<void>
  createColorPalette: (palette: Partial<ColorPalette>) => Promise<void>
  updateColorPalette: (id: string, palette: Partial<ColorPalette>) => Promise<void>
  deleteColorPalette: (id: string) => Promise<void>
  
  createNeutralPalette: (palette: Partial<NeutralPalette>) => Promise<void>
  updateNeutralPalette: (id: string, palette: Partial<NeutralPalette>) => Promise<void>
  deleteNeutralPalette: (id: string) => Promise<void>
  
  selectColorPalette: (id: string | null) => void
  selectNeutralPalette: (id: string | null) => void
}

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  colorPalettes: [],
  neutralPalettes: [],
  selectedColorPaletteId: null,
  selectedNeutralPaletteId: null,
  isLoading: false,
  error: null,
  
  loadPalettes: async () => {
    set({ isLoading: true, error: null });
    try {
      // Load both color and neutral palettes with better error handling
      const [colorResponse, neutralResponse] = await Promise.allSettled([
        fetch('/api/palettes/color').catch(err => {
          // console.error('Network error fetching color palettes:', err);
          return null;
        }),
        fetch('/api/palettes/neutral').catch(err => {
          // console.error('Network error fetching neutral palettes:', err);
          return null;
        })
      ]);
      
      // Handle color palettes
      let validColorPalettes = [];
      if (colorResponse.status === 'fulfilled' && colorResponse.value) {
        const response = colorResponse.value;
        if (response.ok) {
          try {
            const colorData = await response.json();
            validColorPalettes = (colorData.palettes || []).filter((p: any) => 
              p.id && p.name && Array.isArray(p.colors) && p.colors.length > 0
            );
          } catch (err) {
            // console.error('Error parsing color palettes response:', err);
          }
        } else {
          // console.error('Failed to load color palettes:', response.status);
        }
      }
      
      // Add default palette if no palettes exist
      if (validColorPalettes.length === 0) {
        validColorPalettes.push({
          id: 'default',
          name: 'Default Palette',
          colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56'],
          isBuiltIn: true,
          userId: 'system',
          description: 'Default color palette',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      // Handle neutral palettes
      let validNeutralPalettes = [];
      if (neutralResponse.status === 'fulfilled' && neutralResponse.value) {
        const response = neutralResponse.value;
        if (response.ok) {
          try {
            const neutralData = await response.json();
            validNeutralPalettes = Array.isArray(neutralData) ? neutralData.filter((p: any) => 
              p.id && p.name && p.shades && typeof p.shades === 'object'
            ) : [];
          } catch (err) {
            // console.error('Error parsing neutral palettes response:', err);
          }
        } else {
          // console.error('Failed to load neutral palettes:', response.status);
        }
      }
      
      // Ensure Azure palette is always available as fallback
      if (!validNeutralPalettes.some((p: any) => p.id === 'azure-default')) {
        const { AZURE_NEUTRAL_PALETTE } = await import('@/lib/defaults/palettes');
        validNeutralPalettes.unshift(AZURE_NEUTRAL_PALETTE);
      }
      
      set({ 
        colorPalettes: validColorPalettes, 
        neutralPalettes: validNeutralPalettes,
        isLoading: false 
      });
    } catch (error) {
      // console.error('Failed to load palettes:', error);
      const { AZURE_NEUTRAL_PALETTE } = await import('@/lib/defaults/palettes');
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load palettes', 
        isLoading: false,
        // Set a default palette on error
        colorPalettes: [{
          id: 'fallback',
          name: 'Fallback Palette',
          colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56'],
          isBuiltIn: true,
          userId: 'system',
          description: 'Fallback color palette',
          createdAt: new Date(),
          updatedAt: new Date()
        }],
        neutralPalettes: [AZURE_NEUTRAL_PALETTE]
      });
    }
  },
  
  createColorPalette: async (paletteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/palettes/color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paletteData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // console.error('Failed to create palette:', response.status, errorData);
        throw new Error(errorData.error || 'Failed to create palette');
      }
      
      const data = await response.json();
      set((state) => ({ 
        colorPalettes: [...state.colorPalettes, data.palette],
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create palette', isLoading: false });
      throw error;
    }
  },
  
  updateColorPalette: async (id, paletteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/palettes/color/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paletteData),
      });
      
      if (!response.ok) throw new Error('Failed to update palette');
      
      const data = await response.json();
      set((state) => ({
        colorPalettes: state.colorPalettes.map(palette => 
          palette.id === id ? data.palette : palette
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update palette', isLoading: false });
      throw error;
    }
  },
  
  deleteColorPalette: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/palettes/color/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete palette');
      
      set((state) => ({
        colorPalettes: state.colorPalettes.filter(palette => palette.id !== id),
        selectedColorPaletteId: state.selectedColorPaletteId === id ? null : state.selectedColorPaletteId,
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete palette', isLoading: false });
      throw error;
    }
  },
  
  createNeutralPalette: async (paletteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/palettes/neutral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paletteData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // console.error('Failed to create neutral palette:', response.status, errorData);
        throw new Error(errorData.error || 'Failed to create neutral palette');
      }
      
      const palette = await response.json();
      set((state) => ({ 
        neutralPalettes: [...state.neutralPalettes, palette],
        isLoading: false
      }));
      return palette;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create neutral palette', isLoading: false });
      throw error;
    }
  },
  
  updateNeutralPalette: async (id, paletteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/palettes/neutral/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paletteData),
      });
      
      if (!response.ok) throw new Error('Failed to update neutral palette');
      
      const palette = await response.json();
      set((state) => ({
        neutralPalettes: state.neutralPalettes.map(p => 
          p.id === id ? palette : p
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update neutral palette', isLoading: false });
      throw error;
    }
  },
  
  deleteNeutralPalette: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/palettes/neutral/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete neutral palette');
      
      set((state) => ({
        neutralPalettes: state.neutralPalettes.filter(p => p.id !== id),
        selectedNeutralPaletteId: state.selectedNeutralPaletteId === id ? null : state.selectedNeutralPaletteId,
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete neutral palette', isLoading: false });
      throw error;
    }
  },
  
  selectColorPalette: (id) => set({ selectedColorPaletteId: id }),
  selectNeutralPalette: (id) => set({ selectedNeutralPaletteId: id }),
}))