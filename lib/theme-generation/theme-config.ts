import { NeutralPalette } from '@/lib/generated/prisma';

// Type definitions for theme configuration
export interface ColorPalettes {
  neutral: Record<string, string> | null;
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
      'background-secondary': (p) => p.neutral?.['50'] || '#F5F5F5',
      'background-tertiary': (p) => p.neutral?.['100'] || '#EEEEEE',
      'background-active': (p) => p.neutral?.['50'] || '#F5F5F5',
      'background-disabled': (p) => p.neutral?.['100'] || '#EEEEEE',
      
      // Text
      'text-primary': (p) => p.neutral?.['900'] || '#1A1A1A',
      'text-secondary': (p) => p.neutral?.['700'] || '#404040',
      'text-tertiary': (p) => p.neutral?.['600'] || '#666666',
      'text-disabled': (p) => p.neutral?.['400'] || '#999999',
      
      // Borders
      'border-primary': (p) => p.neutral?.['300'] || '#CCCCCC',
      'border-secondary': (p) => p.neutral?.['200'] || '#E0E0E0',
      'border-tertiary': (p) => p.neutral?.['100'] || '#EEEEEE',
      
      // Semantic colors
      'error': () => '#DC2626',
      'warning': () => '#F59E0B',
      'success': () => '#10B981',
      
      // Visual-specific colors
      'table-header-bg': (p) => p.neutral?.['100'] || '#EEEEEE',
      'table-header-text': (p) => p.neutral?.['700'] || '#404040',
      'table-row-alt': (p) => p.neutral?.['50'] || '#F5F5F5',
      'table-gridline': (p) => p.neutral?.['200'] || '#E0E0E0',
      'table-total-bg': (p) => p.neutral?.['200'] || '#E0E0E0',
      
      'chart-gridline': (p) => p.neutral?.['200'] || '#E0E0E0',
      'chart-axis-text': (p) => p.neutral?.['600'] || '#666666',
      
      'card-background': () => '#FFFFFF',
      'card-border': (p) => p.neutral?.['200'] || '#E0E0E0',
      
      'tooltip-background': (p) => p.neutral?.['900'] || '#1A1A1A',
      'tooltip-text': () => '#FFFFFF',
      
      // Structural colors (from neutral palette mapping)
      'firstLevelElements': (p) => p.neutral?.['800'] || '#333333',
      'secondLevelElements': (p) => p.neutral?.['600'] || '#666666',
      'thirdLevelElements': (p) => p.neutral?.['400'] || '#999999',
      'fourthLevelElements': (p) => p.neutral?.['300'] || '#CCCCCC',
      'tableAccent': (p) => p.neutral?.['200'] || '#E0E0E0',
    },
    
    dark: {
      // Backgrounds
      'background-primary': (p) => p.neutral?.['950'] || '#0A0A0A',
      'background-secondary': (p) => p.neutral?.['900'] || '#1A1A1A',
      'background-tertiary': (p) => p.neutral?.['800'] || '#333333',
      'background-active': (p) => p.neutral?.['800'] || '#333333',
      'background-disabled': (p) => p.neutral?.['800'] || '#333333',
      
      // Text
      'text-primary': (p) => p.neutral?.['50'] || '#F5F5F5',
      'text-secondary': (p) => p.neutral?.['300'] || '#CCCCCC',
      'text-tertiary': (p) => p.neutral?.['400'] || '#999999',
      'text-disabled': (p) => p.neutral?.['600'] || '#666666',
      
      // Borders
      'border-primary': (p) => p.neutral?.['700'] || '#404040',
      'border-secondary': (p) => p.neutral?.['800'] || '#333333',
      'border-tertiary': (p) => p.neutral?.['800'] || '#333333',
      
      // Semantic colors
      'error': () => '#EF4444',
      'warning': () => '#FCD34D',
      'success': () => '#34D399',
      
      // Visual-specific colors
      'table-header-bg': (p) => p.neutral?.['800'] || '#333333',
      'table-header-text': (p) => p.neutral?.['200'] || '#E0E0E0',
      'table-row-alt': (p) => p.neutral?.['900'] || '#1A1A1A',
      'table-gridline': (p) => p.neutral?.['700'] || '#404040',
      'table-total-bg': (p) => p.neutral?.['700'] || '#404040',
      
      'chart-gridline': (p) => p.neutral?.['800'] || '#333333',
      'chart-axis-text': (p) => p.neutral?.['400'] || '#999999',
      
      'card-background': (p) => p.neutral?.['900'] || '#1A1A1A',
      'card-border': (p) => p.neutral?.['700'] || '#404040',
      
      'tooltip-background': (p) => p.neutral?.['100'] || '#EEEEEE',
      'tooltip-text': (p) => p.neutral?.['900'] || '#1A1A1A',
      
      // Structural colors
      'firstLevelElements': (p) => p.neutral?.['200'] || '#E0E0E0',
      'secondLevelElements': (p) => p.neutral?.['400'] || '#999999',
      'thirdLevelElements': (p) => p.neutral?.['600'] || '#666666',
      'fourthLevelElements': (p) => p.neutral?.['700'] || '#404040',
      'tableAccent': (p) => p.neutral?.['700'] || '#404040',
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