import { useEffect } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { DEFAULT_COLOR_PALETTE, AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

/**
 * Hook that automatically resolves palette IDs to palette objects
 * and updates the resolved data in the theme studio store
 */
export function useThemeStudioPalettes() {
  const theme = useThemeStudioStore((state) => state.theme);
  const paletteRefreshCounter = useThemeStudioStore((state) => state.paletteRefreshCounter);
  const setResolvedPalettes = useThemeStudioStore((state) => state.setResolvedPalettes);
  
  const { 
    colorPalettes, 
    neutralPalettes, 
    loadPalettes,
    isLoading: palettesLoading 
  } = usePaletteStore();

  // Load palettes on mount
  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  // Resolve palettes whenever theme or palettes change
  useEffect(() => {
    if (palettesLoading) return;

    // Resolve color palette
    const colorPalette = colorPalettes.find(p => p.id === theme.colorPaletteId) || DEFAULT_COLOR_PALETTE;
    
    // Resolve neutral palette
    const neutralPalette = neutralPalettes.find(p => p.id === theme.neutralPaletteId) || AZURE_NEUTRAL_PALETTE;


    setResolvedPalettes(colorPalette as any, neutralPalette as any);
  }, [
    theme.colorPaletteId, 
    theme.neutralPaletteId, 
    colorPalettes, 
    neutralPalettes, 
    palettesLoading,
    paletteRefreshCounter,
    setResolvedPalettes
  ]);

  return {
    isLoading: palettesLoading,
    colorPalette: useThemeStudioStore((state) => state.resolved.colorPalette),
    neutralPalette: useThemeStudioStore((state) => state.resolved.neutralPalette),
  };
}