import { NeutralPalette } from '@/lib/generated/prisma';

// Type definitions for theme configuration
export interface ColorPalettes {
  neutral: NeutralPalette['shades'];
  dataColors: string[];
}

export type ColorResolver = (palettes: ColorPalettes) => string;

export interface ColorMappings {
  light: Record<string, ColorResolver>;
  dark: Record<string, ColorResolver>;
}

// Main theme configuration
export const themeConfig = {
  // Color mappings for different UI elements - these can be used as a reference
  // but users will provide their own colors
  colorMappings: {
    light: {
      // Backgrounds
      'background-primary': () => '#FFFFFF',
      'background-secondary': (p) => p.neutral['50'],
      'background-tertiary': (p) => p.neutral['100'],
      'background-active': (p) => p.neutral['50'],
      'background-disabled': (p) => p.neutral['100'],
      
      // Text
      'text-primary': (p) => p.neutral['900'],
      'text-secondary': (p) => p.neutral['700'],
      'text-tertiary': (p) => p.neutral['600'],
      'text-disabled': (p) => p.neutral['400'],
      
      // Borders
      'border-primary': (p) => p.neutral['300'],
      'border-secondary': (p) => p.neutral['200'],
      'border-tertiary': (p) => p.neutral['100'],
      
      // Semantic colors
      'error': () => '#DC2626',
      'warning': () => '#F59E0B',
      'success': () => '#10B981',
      
      // Visual-specific colors
      'table-header-bg': (p) => p.neutral['100'],
      'table-header-text': (p) => p.neutral['700'],
      'table-row-alt': (p) => p.neutral['50'],
      'table-gridline': (p) => p.neutral['200'],
      'table-total-bg': (p) => p.neutral['200'],
      
      'chart-gridline': (p) => p.neutral['200'],
      'chart-axis-text': (p) => p.neutral['600'],
      
      'card-background': () => '#FFFFFF',
      'card-border': (p) => p.neutral['200'],
      
      'tooltip-background': (p) => p.neutral['900'],
      'tooltip-text': () => '#FFFFFF',
      
      // Structural colors (from neutral palette mapping)
      'firstLevelElements': (p) => p.neutral['800'],
      'secondLevelElements': (p) => p.neutral['600'],
      'thirdLevelElements': (p) => p.neutral['400'],
      'fourthLevelElements': (p) => p.neutral['300'],
      'tableAccent': (p) => p.neutral['200'],
    },
    
    dark: {
      // Backgrounds
      'background-primary': (p) => p.neutral['950'],
      'background-secondary': (p) => p.neutral['900'],
      'background-tertiary': (p) => p.neutral['800'],
      'background-active': (p) => p.neutral['800'],
      'background-disabled': (p) => p.neutral['800'],
      
      // Text
      'text-primary': (p) => p.neutral['50'],
      'text-secondary': (p) => p.neutral['300'],
      'text-tertiary': (p) => p.neutral['400'],
      'text-disabled': (p) => p.neutral['600'],
      
      // Borders
      'border-primary': (p) => p.neutral['700'],
      'border-secondary': (p) => p.neutral['800'],
      'border-tertiary': (p) => p.neutral['800'],
      
      // Semantic colors
      'error': () => '#EF4444',
      'warning': () => '#FCD34D',
      'success': () => '#34D399',
      
      // Visual-specific colors
      'table-header-bg': (p) => p.neutral['800'],
      'table-header-text': (p) => p.neutral['200'],
      'table-row-alt': (p) => p.neutral['900'],
      'table-gridline': (p) => p.neutral['700'],
      'table-total-bg': (p) => p.neutral['700'],
      
      'chart-gridline': (p) => p.neutral['800'],
      'chart-axis-text': (p) => p.neutral['400'],
      
      'card-background': (p) => p.neutral['900'],
      'card-border': (p) => p.neutral['700'],
      
      'tooltip-background': (p) => p.neutral['100'],
      'tooltip-text': (p) => p.neutral['900'],
      
      // Structural colors
      'firstLevelElements': (p) => p.neutral['200'],
      'secondLevelElements': (p) => p.neutral['400'],
      'thirdLevelElements': (p) => p.neutral['600'],
      'fourthLevelElements': (p) => p.neutral['700'],
      'tableAccent': (p) => p.neutral['700'],
    }
  } as ColorMappings
};

// Helper function to resolve all colors for a given mode and palettes
export function resolveColors(
  mode: 'light' | 'dark',
  palettes: ColorPalettes,
  overrides?: Partial<Record<string, ColorResolver>>
): Record<string, string> {
  const mappings = { ...themeConfig.colorMappings[mode], ...overrides };
  const resolved: Record<string, string> = {};
  
  for (const [key, resolver] of Object.entries(mappings)) {
    try {
      resolved[key] = resolver!(palettes);
    } catch (error) {
      console.warn(`Failed to resolve color for ${key}:`, error);
      resolved[key] = mode === 'light' ? '#000000' : '#FFFFFF';
    }
  }
  
  return resolved;
}