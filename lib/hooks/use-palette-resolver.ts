import { useEffect, useState } from 'react';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';
import { DEFAULT_COLOR_PALETTE, AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface UsePaletteResolverOptions {
  colorPaletteId?: string;
  neutralPaletteId?: string;
}

interface UsePaletteResolverResult {
  colorPalette: ColorPalette;
  neutralPalette: NeutralPalette;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to resolve palette IDs to actual palette objects
 * Handles loading palettes and provides fallbacks
 */
export function usePaletteResolver({
  colorPaletteId = DEFAULT_COLOR_PALETTE.id,
  neutralPaletteId = AZURE_NEUTRAL_PALETTE.id
}: UsePaletteResolverOptions): UsePaletteResolverResult {
  const { 
    colorPalettes, 
    neutralPalettes, 
    loadPalettes, 
    isLoading: storeLoading 
  } = usePaletteStore();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load palettes on mount
  useEffect(() => {
    if (isInitialLoad) {
      loadPalettes()
        .then(() => setIsInitialLoad(false))
        .catch((err) => {
          setError(err.message);
          setIsInitialLoad(false);
        });
    }
  }, [isInitialLoad, loadPalettes]);

  // Resolve color palette
  const colorPalette = colorPalettes.find(p => p.id === colorPaletteId) || DEFAULT_COLOR_PALETTE;
  
  // Resolve neutral palette
  const neutralPalette = neutralPalettes.find(p => p.id === neutralPaletteId) || AZURE_NEUTRAL_PALETTE;

  return {
    colorPalette,
    neutralPalette,
    isLoading: storeLoading || isInitialLoad,
    error
  };
}