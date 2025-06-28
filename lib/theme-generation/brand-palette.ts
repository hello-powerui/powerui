import { ColorPalette } from './types';
import { hexToOklch, oklchToHex, clamp, cubicBezier } from './color-utils';
import { hexToHSL } from './utils';

// Enhanced brand palette generation using OKLCH color space
export function generateBrandPalette(hexColor: string): ColorPalette {
  // Convert input color to OKLCH
  const baseColor = hexToOklch(hexColor);
  
  // Define shade mappings with perceptually uniform lightness values
  // Brand colors typically have higher chroma than neutrals
  const shadeConfig = [
    { name: '25', lightnessTarget: 0.97, chromaFactor: 0.15 },
    { name: '50', lightnessTarget: 0.95, chromaFactor: 0.25 },
    { name: '100', lightnessTarget: 0.90, chromaFactor: 0.4 },
    { name: '200', lightnessTarget: 0.82, chromaFactor: 0.6 },
    { name: '300', lightnessTarget: 0.71, chromaFactor: 0.8 },
    { name: '400', lightnessTarget: 0.58, chromaFactor: 0.9 },
    { name: '500', lightnessTarget: 0.45, chromaFactor: 1.0 }, // Base color
    { name: '600', lightnessTarget: 0.36, chromaFactor: 0.95 },
    { name: '700', lightnessTarget: 0.27, chromaFactor: 0.85 },
    { name: '800', lightnessTarget: 0.19, chromaFactor: 0.7 },
    { name: '900', lightnessTarget: 0.12, chromaFactor: 0.5 },
    { name: '950', lightnessTarget: 0.06, chromaFactor: 0.3 }
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