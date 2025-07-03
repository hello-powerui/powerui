import { ColorPalette, NeutralPaletteGenerationInput, NeutralPaletteResponse } from './types';
import { hexToHSL, hslToHex } from './utils';
import { hexToOklch, oklchToHex, clamp, cubicBezier } from './color-utils';

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
  const hexColor = data.hexColor.trim();
  
  if (!hexColor) {
    throw new Error('Hex color is required');
  }

  // Validate hex format
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  const cleanHex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
  
  if (!hexRegex.test(cleanHex)) {
    throw new Error('Invalid hex color format');
  }

  try {
    // Use our enhanced offline generator exclusively
    const palette = generateNeutralPaletteOffline(cleanHex);
    
    // Generate a name based on the color
    const colorName = generateColorName(cleanHex);
    
    return {
      name: colorName,
      palette
    };
  } catch (error) {
    // console.error('Error generating neutral palette:', error);
    throw new Error(`Failed to generate palette: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to generate a descriptive name for the color
function generateColorName(hex: string): string {
  const { h, s, l } = hexToHSL(hex);
  
  // Determine base color name from hue
  let baseName = 'Gray';
  if (s > 10) {
    if (h >= 0 && h < 15) baseName = 'Red';
    else if (h >= 15 && h < 40) baseName = 'Orange';
    else if (h >= 40 && h < 65) baseName = 'Yellow';
    else if (h >= 65 && h < 150) baseName = 'Green';
    else if (h >= 150 && h < 250) baseName = 'Blue';
    else if (h >= 250 && h < 290) baseName = 'Purple';
    else if (h >= 290 && h < 330) baseName = 'Pink';
    else baseName = 'Red';
  }
  
  // Add modifier based on lightness and saturation
  if (s < 15) {
    if (l < 20) return 'Charcoal';
    if (l > 80) return 'Light Gray';
    return 'Gray';
  }
  
  if (l < 30) return `Dark ${baseName}`;
  if (l > 70) return `Light ${baseName}`;
  
  return baseName;
}

// Enhanced offline generation using OKLCH color space for perceptual uniformity
export function generateNeutralPaletteOffline(hexColor: string): ColorPalette {
  // Convert input color to OKLCH
  const baseColor = hexToOklch(hexColor);
  
  // Define shade mappings with improved dark end distinction
  // Adjusted to prevent shades 800-950 from being too similar or too close to black
  const shadeConfig = [
    { name: '25', lightnessTarget: 0.97, chromaFactor: 0.1 },  // L=97%
    { name: '50', lightnessTarget: 0.95, chromaFactor: 0.15 }, // L=95%
    { name: '100', lightnessTarget: 0.90, chromaFactor: 0.25 }, // L=90%
    { name: '200', lightnessTarget: 0.82, chromaFactor: 0.4 },  // L=82%
    { name: '300', lightnessTarget: 0.73, chromaFactor: 0.6 },  // L=73%
    { name: '400', lightnessTarget: 0.64, chromaFactor: 0.8 },  // L=64%
    { name: '500', lightnessTarget: 0.54, chromaFactor: 1.0 },  // L=54%
    { name: '600', lightnessTarget: 0.44, chromaFactor: 0.9 },  // L=44%
    { name: '700', lightnessTarget: 0.34, chromaFactor: 0.7 },  // L=34%
    { name: '800', lightnessTarget: 0.26, chromaFactor: 0.5 },  // L=26%
    { name: '900', lightnessTarget: 0.20, chromaFactor: 0.3 },  // L=20%
    { name: '950', lightnessTarget: 0.15, chromaFactor: 0.2 }   // L=15%
  ];

  const palette: ColorPalette = {};
  
  // Base chroma for neutrals (low saturation)
  const neutralChroma = Math.min(baseColor.c * 0.25, 0.04);
  
  // Generate each shade
  for (const config of shadeConfig) {
    // Calculate lightness using cubic bezier for smooth transitions
    const t = (11 - shadeConfig.indexOf(config)) / 11;
    const lightnessControl = cubicBezier(t, 0.25, 0.9);
    const targetLightness = config.lightnessTarget;
    
    // Adjust chroma based on position in the scale
    // Less chroma at extremes, more in the middle
    const adjustedChroma = neutralChroma * config.chromaFactor;
    
    // Subtle hue shift for more natural neutrals
    // Cooler (bluer) at light end, warmer at dark end
    // Increased shift for darker colors to help with distinction
    const hueShift = (config.lightnessTarget - 0.5) * -20;
    const adjustedHue = (baseColor.h + hueShift + 360) % 360;
    
    // Ensure values are within valid ranges
    const finalLightness = clamp(targetLightness, 0, 1);
    const finalChroma = clamp(adjustedChroma, 0, 0.1);
    
    // Convert back to hex
    const shadeHex = oklchToHex(finalLightness, finalChroma, adjustedHue);
    palette[config.name] = shadeHex;
  }

  return palette;
}