import { NeutralPalette } from '@/lib/generated/prisma';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface ThemeColorMapping {
  light: {
    foreground: string;
    foregroundNeutralSecondary: string;
    foregroundNeutralTertiary: string;
    firstLevelElements: string;
    secondLevelElements: string;
    thirdLevelElements: string;
    fourthLevelElements: string;
    background: string;
    backgroundLight: string;
    backgroundNeutral: string;
    tableAccent: string;
  };
  dark: {
    foreground: string;
    foregroundNeutralSecondary: string;
    foregroundNeutralTertiary: string;
    firstLevelElements: string;
    secondLevelElements: string;
    thirdLevelElements: string;
    fourthLevelElements: string;
    background: string;
    backgroundLight: string;
    backgroundNeutral: string;
    tableAccent: string;
  };
}

/**
 * Maps neutral palette shades to Power BI theme properties
 * Based on the semantic color hierarchy in elements.json
 */
export function mapNeutralPaletteToTheme(
  palette: NeutralPalette,
  mode: 'light' | 'dark'
): Partial<ThemeColorMapping['light']> {
  // Defensive check: if palette is invalid, use Azure default
  if (!palette || !palette.shades || typeof palette.shades !== 'object') {
    
    palette = AZURE_NEUTRAL_PALETTE as NeutralPalette;
  }
  
  const shades = palette.shades as Record<string, string>;
  
  if (mode === 'light') {
    return {
      // Text hierarchy - darkest to lightest
      foreground: shades['900'],                    // Primary text
      foregroundNeutralSecondary: shades['700'],    // Secondary text
      foregroundNeutralTertiary: shades['600'],     // Tertiary text
      
      // Element hierarchy - dark to light
      firstLevelElements: shades['800'],            // Most prominent
      secondLevelElements: shades['600'],           // Secondary prominence
      thirdLevelElements: shades['400'],            // Tertiary prominence
      fourthLevelElements: shades['300'],           // Least prominent
      
      // Backgrounds - lightest to darker
      background: '#FFFFFF',                        // Primary background
      backgroundLight: shades['50'],                // Light background
      backgroundNeutral: shades['100'],             // Neutral background
      
      // Accents
      tableAccent: shades['200'],                   // Table accents
    };
  } else {
    // Dark mode - inverted hierarchy
    return {
      // Text hierarchy - lightest to darker
      foreground: shades['50'],                     // Primary text
      foregroundNeutralSecondary: shades['300'],    // Secondary text
      foregroundNeutralTertiary: shades['400'],     // Tertiary text
      
      // Element hierarchy - light to dark
      firstLevelElements: shades['200'],            // Most prominent
      secondLevelElements: shades['400'],           // Secondary prominence
      thirdLevelElements: shades['600'],            // Tertiary prominence
      fourthLevelElements: shades['700'],           // Least prominent
      
      // Backgrounds - darkest to lighter
      background: shades['950'],                    // Primary background
      backgroundLight: shades['900'],               // Light background
      backgroundNeutral: shades['800'],             // Neutral background
      
      // Accents
      tableAccent: shades['700'],                   // Table accents
    };
  }
}

/**
 * Get a preview of how the neutral palette will map to theme properties
 */
export function getNeutralPalettePreview(
  palette: NeutralPalette,
  mode: 'light' | 'dark'
): { property: string; value: string; description: string }[] {
  const mapping = mapNeutralPaletteToTheme(palette, mode);
  
  return [
    {
      property: 'foreground',
      value: mapping.foreground!,
      description: 'Primary text and foreground elements'
    },
    {
      property: 'foregroundNeutralSecondary',
      value: mapping.foregroundNeutralSecondary!,
      description: 'Secondary text and labels'
    },
    {
      property: 'foregroundNeutralTertiary',
      value: mapping.foregroundNeutralTertiary!,
      description: 'Tertiary text and subtle elements'
    },
    {
      property: 'firstLevelElements',
      value: mapping.firstLevelElements!,
      description: 'Primary UI elements (buttons, headers)'
    },
    {
      property: 'secondLevelElements',
      value: mapping.secondLevelElements!,
      description: 'Secondary UI elements'
    },
    {
      property: 'thirdLevelElements',
      value: mapping.thirdLevelElements!,
      description: 'Tertiary UI elements'
    },
    {
      property: 'fourthLevelElements',
      value: mapping.fourthLevelElements!,
      description: 'Subtle UI elements and borders'
    },
    {
      property: 'background',
      value: mapping.background!,
      description: 'Primary background color'
    },
    {
      property: 'backgroundLight',
      value: mapping.backgroundLight!,
      description: 'Light background for sections'
    },
    {
      property: 'backgroundNeutral',
      value: mapping.backgroundNeutral!,
      description: 'Neutral background for cards'
    },
    {
      property: 'tableAccent',
      value: mapping.tableAccent!,
      description: 'Table row accents and highlights'
    }
  ];
}