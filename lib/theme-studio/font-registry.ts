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

// Available font weights per font family
export const FONT_AVAILABLE_WEIGHTS: Record<string, string[]> = {
  'Segoe UI': ["300", "400", "600", "700"],
  'Arial': ["400", "700"],
  'Calibri': ["400", "700"],
  'Helvetica Neue': ["300", "400", "500", "700"],
  'Georgia': ["400", "700"],
  'Times New Roman': ["400", "700"],
  'Roboto': ["100", "300", "400", "500", "700", "900"],
  'Inter': ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  'Open Sans': ["300", "400", "600", "700", "800"],
  'Lato': ["100", "300", "400", "700", "900"]
};

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