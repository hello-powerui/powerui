import { ColorPalette, NeutralPaletteGenerationInput, NeutralPaletteResponse } from './types';
import { hexToHSL, hslToHex } from './utils';

interface UIColorsResponse {
  name: string;
  shades: Array<{
    name: string;
    hexcode: string;
    hsl: {
      hue: number;
      saturation: number;
      lightness: number;
    };
  }>;
}

export async function generateNeutralPalette(
  data: NeutralPaletteGenerationInput
): Promise<NeutralPaletteResponse> {
  const hexColor = data.hexColor.trim().replace('#', '');
  
  if (!hexColor) {
    throw new Error('Hex color is required');
  }

  const apiKey = process.env.UICOLORS_API_KEY;
  if (!apiKey) {
    throw new Error('UICOLORS_API_KEY not configured');
  }

  try {
    const response = await fetch(
      `https://uicolors.app/api/v1/color-scales/tailwindcss3/generate/${hexColor}`,
      {
        method: 'POST',
        headers: {
          'x-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate palette: ${response.status}`);
    }

    const paletteData: UIColorsResponse = await response.json();

    // Transform the response into our required format
    const palette: ColorPalette = {};
    for (const shade of paletteData.shades) {
      palette[shade.name] = shade.hexcode;
    }

    // Calculate and add shade 25 by modifying shade 50
    const shade50 = paletteData.shades.find(shade => shade.name === '50');
    if (shade50) {
      const shade25HSL = {
        h: shade50.hsl.hue,
        s: Math.max(5, shade50.hsl.saturation - 5), // Slightly reduce saturation
        l: Math.min(98, shade50.hsl.lightness + 8)  // Much bigger lightness increase
      };

      palette['25'] = hslToHex(shade25HSL.h, shade25HSL.s, shade25HSL.l);
    }

    return {
      name: paletteData.name,
      palette
    };
  } catch (error) {
    console.error('Error generating neutral palette:', error);
    throw new Error(`Failed to generate palette: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// For fallback or offline generation (simplified version)
export function generateNeutralPaletteOffline(hexColor: string): ColorPalette {
  const { h, s, l } = hexToHSL(hexColor);
  
  // Generate a basic neutral palette
  const shades = [
    { name: '25', lightness: 98 },
    { name: '50', lightness: 96 },
    { name: '100', lightness: 90 },
    { name: '200', lightness: 82 },
    { name: '300', lightness: 68 },
    { name: '400', lightness: 54 },
    { name: '500', lightness: 40 },
    { name: '600', lightness: 32 },
    { name: '700', lightness: 24 },
    { name: '800', lightness: 16 },
    { name: '900', lightness: 8 },
    { name: '950', lightness: 4 }
  ];

  const palette: ColorPalette = {};
  
  for (const shade of shades) {
    // Reduce saturation as lightness increases/decreases
    const saturationAdjust = Math.abs(shade.lightness - 50) * 0.3;
    const adjustedSaturation = Math.max(5, s - saturationAdjust);
    
    palette[shade.name] = hslToHex(h, adjustedSaturation, shade.lightness);
  }

  return palette;
}