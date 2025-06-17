/**
 * Default palette constants for fallback and cascade updates
 */

import { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';
import { BUILT_IN_COLOR_PALETTES, BUILT_IN_NEUTRAL_PALETTES, toApiColorPalette, toApiNeutralPalette } from '@/lib/constants/built-in-palettes';

// Get default palettes from centralized definitions
export const AZURE_NEUTRAL_PALETTE: NeutralPalette = toApiNeutralPalette(
  BUILT_IN_NEUTRAL_PALETTES.find(p => p.id === 'azure-default')!
);

export const DEFAULT_COLOR_PALETTE: ColorPalette = toApiColorPalette(
  BUILT_IN_COLOR_PALETTES.find(p => p.id === 'power-ui')!
);