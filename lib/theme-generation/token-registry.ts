import { NeutralPalette } from '@prisma/client';

// Type definitions for theme configuration
export interface ColorPalettes {
  neutral: Record<string, string> | null;
  dataColors: string[];
}

export type ColorResolver = (palettes: ColorPalettes) => string;

export interface TokenDefinition {
  name: string;
  category: string;
  light: (palettes: ColorPalettes) => string;
  dark: (palettes: ColorPalettes) => string;
}

export const TOKEN_REGISTRY: Record<string, TokenDefinition> = {
  // Backgrounds
  '@bg-primary': {
    name: 'Primary background',
    category: 'Backgrounds',
    light: () => '#FFFFFF',
    dark: (p) => p.neutral?.['950'] || '#0A0A0A'
  },
  '@bg-primary_alt': {
    name: 'Primary alternative',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@bg-primary_hover': {
    name: 'Primary hover',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-secondary': {
    name: 'Secondary background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@bg-secondary_alt': {
    name: 'Secondary alternative',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-tertiary': {
    name: 'Tertiary background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-quaternary': {
    name: 'Quaternary background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@bg-active': {
    name: 'Active state',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-disabled': {
    name: 'Disabled state',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-brand-primary': {
    name: 'Brand primary',
    category: 'Backgrounds',
    light: () => '#2568E8',
    dark: () => '#3B82F6'
  },
  '@bg-brand-solid': {
    name: 'Brand solid',
    category: 'Backgrounds',
    light: () => '#2568E8',
    dark: () => '#3B82F6'
  },
  '@bg-error-primary': {
    name: 'Error background',
    category: 'Backgrounds',
    light: () => '#FEE2E2',
    dark: () => '#7F1D1D'
  },
  '@bg-warning-primary': {
    name: 'Warning background',
    category: 'Backgrounds',
    light: () => '#FEF3C7',
    dark: () => '#78350F'
  },
  '@bg-success-primary': {
    name: 'Success background',
    category: 'Backgrounds',
    light: () => '#D1FAE5',
    dark: () => '#064E3B'
  },

  // Text
  '@text-primary': {
    name: 'Primary text',
    category: 'Text',
    light: (p) => p.neutral?.['900'] || '#1A1A1A',
    dark: (p) => p.neutral?.['50'] || '#F5F5F5'
  },
  '@text-secondary': {
    name: 'Secondary text',
    category: 'Text',
    light: (p) => p.neutral?.['700'] || '#404040',
    dark: (p) => p.neutral?.['300'] || '#CCCCCC'
  },
  '@text-tertiary': {
    name: 'Tertiary text',
    category: 'Text',
    light: (p) => p.neutral?.['600'] || '#666666',
    dark: (p) => p.neutral?.['400'] || '#999999'
  },
  '@text-disabled': {
    name: 'Disabled text',
    category: 'Text',
    light: (p) => p.neutral?.['400'] || '#999999',
    dark: (p) => p.neutral?.['600'] || '#666666'
  },
  '@text-placeholder': {
    name: 'Placeholder text',
    category: 'Text',
    light: (p) => p.neutral?.['500'] || '#808080',
    dark: (p) => p.neutral?.['500'] || '#808080'
  },
  '@text-brand-primary': {
    name: 'Brand text',
    category: 'Text',
    light: () => '#2568E8',
    dark: () => '#60A5FA'
  },
  '@text-error-primary': {
    name: 'Error text',
    category: 'Text',
    light: () => '#DC2626',
    dark: () => '#EF4444'
  },
  '@text-warning-primary': {
    name: 'Warning text',
    category: 'Text',
    light: () => '#D97706',
    dark: () => '#FCD34D'
  },
  '@text-success-primary': {
    name: 'Success text',
    category: 'Text',
    light: () => '#059669',
    dark: () => '#34D399'
  },

  // Borders
  '@border-primary': {
    name: 'Primary border',
    category: 'Borders',
    light: (p) => p.neutral?.['300'] || '#CCCCCC',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@border-secondary': {
    name: 'Secondary border',
    category: 'Borders',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@border-tertiary': {
    name: 'Tertiary border',
    category: 'Borders',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@border-disabled': {
    name: 'Disabled border',
    category: 'Borders',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@border-brand': {
    name: 'Brand border',
    category: 'Borders',
    light: () => '#2568E8',
    dark: () => '#3B82F6'
  },
  '@border-error': {
    name: 'Error border',
    category: 'Borders',
    light: () => '#DC2626',
    dark: () => '#EF4444'
  },

  // Foreground
  '@fg-primary': {
    name: 'Primary foreground',
    category: 'Foreground',
    light: (p) => p.neutral?.['900'] || '#1A1A1A',
    dark: (p) => p.neutral?.['50'] || '#F5F5F5'
  },
  '@fg-secondary': {
    name: 'Secondary foreground',
    category: 'Foreground',
    light: (p) => p.neutral?.['700'] || '#404040',
    dark: (p) => p.neutral?.['300'] || '#CCCCCC'
  },
  '@fg-tertiary': {
    name: 'Tertiary foreground',
    category: 'Foreground',
    light: (p) => p.neutral?.['600'] || '#666666',
    dark: (p) => p.neutral?.['400'] || '#999999'
  },
  '@fg-disabled': {
    name: 'Disabled foreground',
    category: 'Foreground',
    light: (p) => p.neutral?.['400'] || '#999999',
    dark: (p) => p.neutral?.['600'] || '#666666'
  },
  '@fg-brand-primary': {
    name: 'Brand foreground',
    category: 'Foreground',
    light: () => '#2568E8',
    dark: () => '#60A5FA'
  },
  '@fg-error-primary': {
    name: 'Error foreground',
    category: 'Foreground',
    light: () => '#DC2626',
    dark: () => '#EF4444'
  },
  '@fg-warning-primary': {
    name: 'Warning foreground',
    category: 'Foreground',
    light: () => '#D97706',
    dark: () => '#FCD34D'
  },
  '@fg-success-primary': {
    name: 'Success foreground',
    category: 'Foreground',
    light: () => '#059669',
    dark: () => '#34D399'
  },

  // Visual-specific tokens
  '@table-header-bg': {
    name: 'Table header background',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@table-header-text': {
    name: 'Table header text',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['700'] || '#404040',
    dark: (p) => p.neutral?.['200'] || '#E0E0E0'
  },
  '@table-row-alt': {
    name: 'Table alternate row',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@table-gridline': {
    name: 'Table gridline',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@table-total-bg': {
    name: 'Table total background',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@chart-gridline': {
    name: 'Chart gridline',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@chart-axis-text': {
    name: 'Chart axis text',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['600'] || '#666666',
    dark: (p) => p.neutral?.['400'] || '#999999'
  },
  '@card-background': {
    name: 'Card background',
    category: 'Visual Elements',
    light: () => '#FFFFFF',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@card-border': {
    name: 'Card border',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@tooltip-background': {
    name: 'Tooltip background',
    category: 'Visual Elements',
    light: (p) => p.neutral?.['900'] || '#1A1A1A',
    dark: (p) => p.neutral?.['100'] || '#EEEEEE'
  },
  '@tooltip-text': {
    name: 'Tooltip text',
    category: 'Visual Elements',
    light: () => '#FFFFFF',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },

  // Structural colors (from neutral palette mapping)
  '@firstLevelElements': {
    name: 'First level elements',
    category: 'Structural',
    light: (p) => p.neutral?.['800'] || '#333333',
    dark: (p) => p.neutral?.['200'] || '#E0E0E0'
  },
  '@secondLevelElements': {
    name: 'Second level elements',
    category: 'Structural',
    light: (p) => p.neutral?.['600'] || '#666666',
    dark: (p) => p.neutral?.['400'] || '#999999'
  },
  '@thirdLevelElements': {
    name: 'Third level elements',
    category: 'Structural',
    light: (p) => p.neutral?.['400'] || '#999999',
    dark: (p) => p.neutral?.['600'] || '#666666'
  },
  '@fourthLevelElements': {
    name: 'Fourth level elements',
    category: 'Structural',
    light: (p) => p.neutral?.['300'] || '#CCCCCC',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  '@tableAccent': {
    name: 'Table accent',
    category: 'Structural',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  }
};

// Helper to get token options for UI
export function getTokenOptions() {
  return Object.entries(TOKEN_REGISTRY).map(([token, def]) => ({
    token,
    description: def.name,
    category: def.category
  }));
}

// Helper to resolve a token to its color value
export function resolveToken(
  token: string,
  mode: 'light' | 'dark',
  palettes: ColorPalettes
): string | null {
  const definition = TOKEN_REGISTRY[token];
  if (!definition) return null;
  
  try {
    return definition[mode](palettes);
  } catch (error) {
    
    return mode === 'light' ? '#000000' : '#FFFFFF';
  }
}

// Type for all valid token names
export type ValidTokenName = keyof typeof TOKEN_REGISTRY;