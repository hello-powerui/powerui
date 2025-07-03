import { ColorPalette } from './types';
import { hexToOklch, oklchToHex, clamp, cubicBezier } from './color-utils';
import { hexToHSL } from './utils';

// Enhanced brand palette generation using OKLCH color space
export function generateBrandPalette(hexColor: string): ColorPalette {
  // Convert input color to OKLCH
  const baseColor = hexToOklch(hexColor);
  
  // Define shade mappings with improved dark end distinction
  // Brand colors typically have higher chroma than neutrals
  // Adjusted to prevent shades 800-950 from being too similar or too close to black
  const shadeConfig = [
    { name: '25', lightnessTarget: 0.97, chromaFactor: 0.15 },  // L=97%
    { name: '50', lightnessTarget: 0.95, chromaFactor: 0.25 },  // L=95%
    { name: '100', lightnessTarget: 0.90, chromaFactor: 0.4 },   // L=90%
    { name: '200', lightnessTarget: 0.82, chromaFactor: 0.6 },   // L=82%
    { name: '300', lightnessTarget: 0.73, chromaFactor: 0.8 },   // L=73%
    { name: '400', lightnessTarget: 0.64, chromaFactor: 0.9 },   // L=64%
    { name: '500', lightnessTarget: 0.54, chromaFactor: 1.0 },   // L=54% - Base color
    { name: '600', lightnessTarget: 0.44, chromaFactor: 0.95 },  // L=44%
    { name: '700', lightnessTarget: 0.34, chromaFactor: 0.85 },  // L=34%
    { name: '800', lightnessTarget: 0.26, chromaFactor: 0.7 },   // L=26%
    { name: '900', lightnessTarget: 0.20, chromaFactor: 0.5 },   // L=20%
    { name: '950', lightnessTarget: 0.15, chromaFactor: 0.3 }    // L=15%
  ];

  const palette: ColorPalette = {};
  
  // Use the base color's chroma as reference
  const baseChroma = baseColor.c;
  
  // Generate each shade
  for (const config of shadeConfig) {
    // Calculate lightness using cubic bezier for smooth transitions
    const t = (11 - shadeConfig.indexOf(config)) / 11;
    const lightnessControl = cubicBezier(t, 0.3, 0.85);
    const targetLightness = config.lightnessTarget;
    
    // Adjust chroma based on position in the scale
    // Brand colors maintain more chroma throughout the scale than neutrals
    const adjustedChroma = baseChroma * config.chromaFactor;
    
    // Very subtle hue shift for natural appearance
    // Slightly cooler at light end, slightly warmer at dark end
    const hueShift = (config.lightnessTarget - 0.5) * -5;
    const adjustedHue = (baseColor.h + hueShift + 360) % 360;
    
    // Ensure values are within valid ranges
    const finalLightness = clamp(targetLightness, 0, 1);
    const finalChroma = clamp(adjustedChroma, 0, 0.4); // Higher max chroma for brand colors
    
    // Convert back to hex
    const shadeHex = oklchToHex(finalLightness, finalChroma, adjustedHue);
    palette[config.name] = shadeHex;
  }

  return palette;
}

// Generate a descriptive name for the brand color
export function generateBrandColorName(hex: string): string {
  const { h, s, l } = hexToHSL(hex);
  
  // Determine base color name from hue
  let baseName = 'Blue'; // Default for brand colors
  if (h >= 0 && h < 15) baseName = 'Red';
  else if (h >= 15 && h < 40) baseName = 'Orange';
  else if (h >= 40 && h < 65) baseName = 'Yellow';
  else if (h >= 65 && h < 150) baseName = 'Green';
  else if (h >= 150 && h < 250) baseName = 'Blue';
  else if (h >= 250 && h < 290) baseName = 'Purple';
  else if (h >= 290 && h < 330) baseName = 'Pink';
  else if (h >= 330) baseName = 'Red';
  
  // Add modifier based on lightness and saturation
  if (s < 20) {
    return 'Gray Brand'; // Very desaturated
  }
  
  if (l < 30) return `Dark ${baseName}`;
  if (l > 70) return `Light ${baseName}`;
  if (s > 80) return `Vibrant ${baseName}`;
  
  return baseName;
}

// API function that matches the neutral palette interface
export interface BrandPaletteGenerationInput {
  hexColor: string;
}

export interface BrandPaletteResponse {
  name: string;
  palette: ColorPalette;
}

export async function generateBrandPaletteWithName(
  data: BrandPaletteGenerationInput
): Promise<BrandPaletteResponse> {
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
    // Generate the brand palette
    const palette = generateBrandPalette(cleanHex);
    
    // Generate a name based on the color
    const colorName = generateBrandColorName(cleanHex);
    
    return {
      name: colorName,
      palette
    };
  } catch (error) {
    throw new Error(`Failed to generate brand palette: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}