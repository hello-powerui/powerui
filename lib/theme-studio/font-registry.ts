// Font weight definitions
export const FONT_WEIGHTS = [
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" }
] as const;

// Font categories
export interface FontInfo {
  name: string;
  weights: string[];
  category: 'powerbi' | 'custom';
  description?: string;
  requiresInstall?: boolean;
}

// Power BI built-in fonts (sans-serif)
const POWERBI_FONTS: FontInfo[] = [
  { name: 'Arial', weights: ["400", "700"], category: 'powerbi' },
  { name: 'Segoe UI', weights: ["300", "400", "600", "700"], category: 'powerbi' },
  { name: 'Calibri', weights: ["400", "700"], category: 'powerbi' },
  { name: 'Candara', weights: ["400", "700"], category: 'powerbi' },
  { name: 'Corbel', weights: ["400", "700"], category: 'powerbi' },
  { name: 'Tahoma', weights: ["400", "700"], category: 'powerbi' },
  { name: 'Trebuchet MS', weights: ["400", "700"], category: 'powerbi' }
];

// Custom fonts (require installation)
const CUSTOM_FONTS: FontInfo[] = [
  { 
    name: 'Public Sans', 
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    category: 'custom',
    description: 'Modern, clean sans-serif designed for digital interfaces',
    requiresInstall: true
  },
  { 
    name: 'Space Grotesk', 
    weights: ["300", "400", "500", "600", "700"],
    category: 'custom',
    description: 'Geometric sans-serif with unique character',
    requiresInstall: true
  },
  { 
    name: 'Inter', 
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    category: 'custom',
    description: 'Highly legible font optimized for UI design',
    requiresInstall: true
  }
];

// All available fonts
export const AVAILABLE_FONTS: FontInfo[] = [...POWERBI_FONTS, ...CUSTOM_FONTS];

// Available font weights per font family (for backward compatibility)
export const FONT_AVAILABLE_WEIGHTS: Record<string, string[]> = AVAILABLE_FONTS.reduce((acc, font) => {
  acc[font.name] = font.weights;
  return acc;
}, {} as Record<string, string[]>);

// Font size presets
export const FONT_SIZE_PRESETS = {
  'xs': 9,
  'sm': 10,
  'base': 12,
  'lg': 14,
  'xl': 16,
  'xxl': 20,
  'display': 45
} as const;

// Convert points to pixels (approximate)
export function pointsToPixels(points: number): number {
  return Math.round(points * 1.333);
}

// Get available weights for a font, with fallback
export function getAvailableWeights(fontFamily: string): string[] {
  return FONT_AVAILABLE_WEIGHTS[fontFamily] || ["400", "700"];
}

// Get weight label
export function getWeightLabel(weight: string): string {
  const weightDef = FONT_WEIGHTS.find(w => w.value === weight);
  return weightDef?.label || weight;
}