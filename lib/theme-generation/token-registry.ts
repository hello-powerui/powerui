import { NeutralPalette } from '@prisma/client';

// Type definitions for theme configuration
export interface ColorPalettes {
  neutral: Record<string, string> | null;
  brand: Record<string, string> | null;
  success: Record<string, string> | null;
  warning: Record<string, string> | null;
  error: Record<string, string> | null;
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
  // Text - Default
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
    light: (p) => p.neutral?.['500'] || '#808080',
    dark: (p) => p.neutral?.['500'] || '#808080'
  },
  
  // Text - Brand
  '@text-brand': {
    name: 'Brand text',
    category: 'Text',
    light: (p) => p.brand?.['600'] || '#2568E8',
    dark: (p) => p.neutral?.['300'] || '#CCCCCC'
  },
  '@text-brand-hover': {
    name: 'Brand text hover',
    category: 'Text',
    light: (p) => p.brand?.['700'] || '#1E50C0',
    dark: (p) => p.brand?.['200'] || '#93BBFF'
  },
  '@text-brand-press': {
    name: 'Brand text press',
    category: 'Text',
    light: (p) => p.brand?.['800'] || '#163A8C',
    dark: (p) => p.brand?.['100'] || '#C6DAFF'
  },
  '@text-brand-disabled': {
    name: 'Brand text disabled',
    category: 'Text',
    light: (p) => p.neutral?.['400'] || '#999999',
    dark: (p) => p.neutral?.['600'] || '#666666'
  },
  '@text-on-brand': {
    name: 'Text on brand background',
    category: 'Text',
    light: (p) => p.neutral?.['25'] || '#FAFAFA',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  
  // Text - States
  '@text-success': {
    name: 'Success text',
    category: 'Text',
    light: (p) => p.success?.['500'] || '#22C55E',
    dark: (p) => p.success?.['300'] || '#6EE7B7'
  },
  '@text-warning': {
    name: 'Warning text',
    category: 'Text',
    light: (p) => p.warning?.['500'] || '#FFC107',
    dark: (p) => p.warning?.['300'] || '#FCD34D'
  },
  '@text-error': {
    name: 'Error text',
    category: 'Text',
    light: (p) => p.error?.['500'] || '#F87171',
    dark: (p) => p.error?.['300'] || '#FCA5A5'
  },
  
  // Backgrounds - Default
  '@bg-primary': {
    name: 'Primary background',
    category: 'Backgrounds',
    light: () => '#FFFFFF',
    dark: (p) => p.neutral?.['950'] || '#0A0A0A'
  },
  '@bg-secondary': {
    name: 'Secondary background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['25'] || '#FAFAFA',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@bg-tertiary': {
    name: 'Tertiary background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-active': {
    name: 'Active background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['50'] || '#F5F5F5',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  '@bg-disabled': {
    name: 'Disabled background',
    category: 'Backgrounds',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  
  // Backgrounds - Brand
  '@bg-brand-primary': {
    name: 'Brand primary background',
    category: 'Backgrounds',
    light: (p) => p.brand?.['500'] || '#2568E8',
    dark: (p) => p.brand?.['400'] || '#3B82F6'
  },
  '@bg-brand-hover': {
    name: 'Brand hover background',
    category: 'Backgrounds',
    light: (p) => p.brand?.['600'] || '#1E50C0',
    dark: (p) => p.brand?.['300'] || '#93BBFF'
  },
  '@bg-brand-press': {
    name: 'Brand press background',
    category: 'Backgrounds',
    light: (p) => p.brand?.['700'] || '#163A8C',
    dark: (p) => p.brand?.['200'] || '#C6DAFF'
  },
  '@bg-brand-disabled': {
    name: 'Brand disabled background',
    category: 'Backgrounds',
    light: (p) => p.brand?.['200'] || '#C6DAFF',
    dark: (p) => p.brand?.['700'] || '#163A8C'
  },
  
  // Backgrounds - States
  '@bg-success': {
    name: 'Success background',
    category: 'Backgrounds',
    light: (p) => p.success?.['200'] || '#D1FAE5',
    dark: (p) => p.success?.['900'] || '#064E3B'
  },
  '@bg-warning': {
    name: 'Warning background',
    category: 'Backgrounds',
    light: (p) => p.warning?.['200'] || '#FEF3C7',
    dark: (p) => p.warning?.['900'] || '#78350F'
  },
  '@bg-error': {
    name: 'Error background',
    category: 'Backgrounds',
    light: (p) => p.error?.['200'] || '#FEE2E2',
    dark: (p) => p.error?.['900'] || '#7F1D1D'
  },
  
  // Borders - Default
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
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
  },
  '@border-disabled': {
    name: 'Disabled border',
    category: 'Borders',
    light: (p) => p.neutral?.['100'] || '#EEEEEE',
    dark: (p) => p.neutral?.['800'] || '#333333'
  },
  
  // Borders - Brand
  '@border-brand': {
    name: 'Brand border',
    category: 'Borders',
    light: (p) => p.brand?.['500'] || '#2568E8',
    dark: (p) => p.brand?.['400'] || '#3B82F6'
  },
  '@border-brand-hover': {
    name: 'Brand hover border',
    category: 'Borders',
    light: (p) => p.brand?.['600'] || '#1E50C0',
    dark: (p) => p.brand?.['300'] || '#93BBFF'
  },
  '@border-brand-press': {
    name: 'Brand press border',
    category: 'Borders',
    light: (p) => p.brand?.['700'] || '#163A8C',
    dark: (p) => p.brand?.['200'] || '#C6DAFF'
  },
  '@border-brand-disabled': {
    name: 'Brand disabled border',
    category: 'Borders',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['700'] || '#404040'
  },
  
  // Utility
  '@utility-icon': {
    name: 'Icon color',
    category: 'Utility',
    light: () => '#000000',
    dark: () => '#FFFFFF'
  },
  '@utility-shadow': {
    name: 'Shadow color',
    category: 'Utility',
    light: (p) => p.neutral?.['200'] || '#E0E0E0',
    dark: (p) => p.neutral?.['900'] || '#1A1A1A'
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