/**
 * Unified palette type definitions - single source of truth
 * This replaces the scattered palette definitions across the codebase
 */

/**
 * Base palette structure shared by all palette types
 */
interface BasePalette {
  id: string;
  name: string;
  description?: string | null;
  isBuiltIn: boolean;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Color palette for data visualization colors
 * Used for chart colors, categorical data, etc.
 */
export interface ColorPalette extends BasePalette {
  colors: string[]; // Array of hex colors
}

/**
 * Neutral palette for UI colors
 * Used for backgrounds, borders, text, etc.
 */
export interface NeutralPalette extends BasePalette {
  colors: string[]; // Array of 14 hex colors from light to dark
}

/**
 * Palette reference stored in themes
 * Only stores IDs to avoid data duplication
 */
export interface ThemePaletteReference {
  colorPaletteId: string;
  neutralPaletteId: string;
}

/**
 * Runtime palette data used in theme generation
 * This is what the theme generator expects
 */
export interface ThemeGenerationPalettes {
  dataColors: string[]; // From ColorPalette.colors
  neutralColors: Record<string, string>; // Mapped from NeutralPalette.colors
}

/**
 * Helper type for palette selection
 */
export type PaletteType = 'color' | 'neutral';

/**
 * Standard neutral palette shade keys
 */
export const NEUTRAL_SHADE_KEYS = [
  '0', '25', '50', '75', '100', '200', '300', 
  '400', '500', '600', '700', '800', '900', '1000'
] as const;

/**
 * Helper function to convert neutral colors array to shade map
 */
export function neutralColorsToShadeMap(colors: string[]): Record<string, string> {
  const shadeMap: Record<string, string> = {};
  NEUTRAL_SHADE_KEYS.forEach((key, index) => {
    if (index < colors.length) {
      shadeMap[key] = colors[index];
    }
  });
  return shadeMap;
}

/**
 * Helper function to convert shade map to neutral colors array
 */
export function shadeMapToNeutralColors(shadeMap: Record<string, string>): string[] {
  return NEUTRAL_SHADE_KEYS.map(key => shadeMap[key] || '#000000');
}

/**
 * Type guard for ColorPalette
 */
export function isColorPalette(palette: any): palette is ColorPalette {
  return palette && 
    typeof palette.id === 'string' &&
    typeof palette.name === 'string' &&
    Array.isArray(palette.colors) &&
    palette.colors.every((c: any) => typeof c === 'string');
}

/**
 * Type guard for NeutralPalette
 */
export function isNeutralPalette(palette: any): palette is NeutralPalette {
  return palette && 
    typeof palette.id === 'string' &&
    typeof palette.name === 'string' &&
    Array.isArray(palette.colors) &&
    palette.colors.length === 14 &&
    palette.colors.every((c: any) => typeof c === 'string');
}