// Re-export unified palette types
export type { 
  ColorPalette, 
  NeutralPalette, 
  ThemePaletteReference,
  ThemeGenerationPalettes,
  PaletteType 
} from './unified-palette';

export { 
  NEUTRAL_SHADE_KEYS,
  neutralColorsToShadeMap,
  shadeMapToNeutralColors,
  isColorPalette,
  isNeutralPalette
} from './unified-palette';