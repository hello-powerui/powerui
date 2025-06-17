/**
 * Central definition of built-in palettes
 * This replaces scattered definitions across the codebase
 */

import { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';

// Built-in color palettes
export const BUILT_IN_COLOR_PALETTES: Omit<ColorPalette, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'power-ui',
    name: 'Power UI',
    colors: [
      '#2568E8', '#8338EC', '#FF006E', '#F95608', 
      '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'
    ],
    description: 'Default Power UI color palette with vibrant, modern colors',
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    colors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FECA57', '#DDA0DD', '#FF8B94', '#B4A7D6'
    ],
    description: 'Bright and energetic colors for dynamic visualizations',
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'pastel',
    name: 'Pastel Dreams',
    colors: [
      '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', 
      '#BAE1FF', '#E8D5FF', '#FFC9DE', '#D4A5A5'
    ],
    description: 'Soft pastel colors for a gentle, calming effect',
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    colors: [
      '#003F5C', '#2F4B7C', '#665191', '#A05195', 
      '#D45087', '#F95D6A', '#FF7C43', '#FFA600'
    ],
    description: 'Professional palette transitioning from deep blues to warm accents',
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'nature',
    name: 'Natural Earth',
    colors: [
      '#264653', '#2A9D8F', '#E9C46A', '#F4A261', 
      '#E76F51', '#84A98C', '#52796F', '#354F52'
    ],
    description: 'Earth-inspired tones for organic, natural visualizations',
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: [
      '#780116', '#C32F27', '#D8572A', '#F7B538', 
      '#DB7C26', '#D8B863', '#C17767', '#B55239'
    ],
    description: 'Warm sunset colors from deep reds to golden yellows',
    isBuiltIn: true,
    userId: 'system'
  }
];

// Built-in neutral palettes  
export const BUILT_IN_NEUTRAL_PALETTES: Omit<NeutralPalette, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'azure-default',
    name: 'Azure',
    colors: [
      "#F7F8F8", // 25
      "#F1F3F4", // 50
      "#E4E7E9", // 100
      "#C9D0D3", // 200
      "#AEB8BD", // 300
      "#93A1A7", // 400
      "#788991", // 500
      "#606E74", // 600
      "#485257", // 700
      "#30373A", // 800
      "#1F2937", // 900
      "#111827"  // 950
    ],
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'cool',
    name: 'Cool',
    colors: [
      '#F9FAFB', // 25
      '#F3F4F6', // 50
      '#E5E7EB', // 100
      '#D1D5DB', // 200
      '#9CA3AF', // 300
      '#6B7280', // 400
      '#4B5563', // 500
      '#374151', // 600
      '#1F2937', // 700
      '#111827', // 800
      '#0F172A', // 900
      '#020617'  // 950
    ],
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'neutral',
    name: 'Neutral',
    colors: [
      '#FAFAFA', // 25
      '#F5F5F5', // 50
      '#E5E5E5', // 100
      '#D4D4D4', // 200
      '#A3A3A3', // 300
      '#737373', // 400
      '#525252', // 500
      '#404040', // 600
      '#262626', // 700
      '#171717', // 800
      '#0A0A0A', // 900
      '#050505'  // 950
    ],
    isBuiltIn: true,
    userId: 'system'
  },
  {
    id: 'warm',
    name: 'Warm',
    colors: [
      '#FAFAF9', // 25
      '#F5F5F4', // 50
      '#E7E5E4', // 100
      '#D6D3D1', // 200
      '#A8A29E', // 300
      '#78716C', // 400
      '#57534E', // 500
      '#44403C', // 600
      '#292524', // 700
      '#1C1917', // 800
      '#0F0F0E', // 900
      '#0A0A09'  // 950
    ],
    isBuiltIn: true,
    userId: 'system'
  }
];

// Helper to convert to API format (with timestamps)
export function toApiColorPalette(palette: typeof BUILT_IN_COLOR_PALETTES[0]): ColorPalette {
  return {
    ...palette,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function toApiNeutralPalette(palette: typeof BUILT_IN_NEUTRAL_PALETTES[0]): NeutralPalette {
  return {
    ...palette,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}