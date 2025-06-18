import { z } from 'zod';

// Color types
export const ColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color');

export const ColorPaletteSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  userId: z.string().optional(),
  colors: z.array(ColorSchema).length(8),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const NeutralPaletteSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  userId: z.string().optional(),
  colors: z.array(ColorSchema).length(14),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Text class schemas
export const TextClassSchema = z.object({
  fontFace: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.string().optional(),
  color: z.union([
    z.string(),
    z.object({ color: z.string() }),
    z.object({ dataColorIndex: z.number() })
  ]).optional(),
});

export const TextClassesSchema = z.object({
  callout: TextClassSchema.optional(),
  title: TextClassSchema.optional(),
  header: TextClassSchema.optional(),
  label: TextClassSchema.optional(),
  largeTitle: TextClassSchema.optional(),
  dataTitle: TextClassSchema.optional(),
  boldLabel: TextClassSchema.optional(),
  largeLabel: TextClassSchema.optional(),
  largeLightLabel: TextClassSchema.optional(),
  lightLabel: TextClassSchema.optional(),
  semiboldLabel: TextClassSchema.optional(),
  smallLabel: TextClassSchema.optional(),
  smallLightLabel: TextClassSchema.optional(),
  smallDataLabel: TextClassSchema.optional(),
});

// Structural colors schema
export const StructuralColorsSchema = z.object({
  firstLevelElements: ColorSchema.optional(),
  secondLevelElements: ColorSchema.optional(),
  thirdLevelElements: ColorSchema.optional(),
  fourthLevelElements: ColorSchema.optional(),
  background: ColorSchema.optional(),
  secondaryBackground: ColorSchema.optional(),
  tableAccent: ColorSchema.optional(),
});

// Visual style value types
export const VisualStyleValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string(), z.number()])),
  z.record(z.unknown()),
]);

// PowerBI theme schema
export const VisualStylesSchema = z.record(
  z.string(), // Visual name
  z.record(
    z.string(), // Variant (usually '*')
    z.record(z.string(), VisualStyleValueSchema) // Style properties
  )
);

export const PowerBIThemeSchema = z.object({
  name: z.string(),
  dataColors: z.array(ColorSchema).optional(),
  background: ColorSchema.optional(),
  foreground: ColorSchema.optional(),
  tableAccent: ColorSchema.optional(),
  visualStyles: VisualStylesSchema.optional(),
  textClasses: TextClassesSchema.optional(),
  // Allow additional properties for extensibility
}).passthrough();

// Theme metadata schema
export const ThemeMetadataSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  schemaVersion: z.string(),
});

// Complete theme data schema
export const ThemeDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  theme: z.union([z.string(), PowerBIThemeSchema]), // Can be JSON string or object
  userId: z.string(),
  organizationId: z.string().optional(),
  isPublic: z.boolean(),
  schemaVersion: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type ColorPalette = z.infer<typeof ColorPaletteSchema>;
export type NeutralPalette = z.infer<typeof NeutralPaletteSchema>;
export type TextClasses = z.infer<typeof TextClassesSchema>;
export type StructuralColors = z.infer<typeof StructuralColorsSchema>;
export type PowerBITheme = z.infer<typeof PowerBIThemeSchema>;
export type ThemeMetadata = z.infer<typeof ThemeMetadataSchema>;
export type ThemeData = z.infer<typeof ThemeDataSchema>;
export type VisualStyles = z.infer<typeof VisualStylesSchema>;

// Validation helpers
export function validateThemeData(data: unknown): ThemeData {
  return ThemeDataSchema.parse(data);
}

export function validatePowerBITheme(data: unknown): PowerBITheme {
  return PowerBIThemeSchema.parse(data);
}

export function safeParseThemeJSON(json: string): PowerBITheme | null {
  try {
    const parsed = JSON.parse(json);
    return PowerBIThemeSchema.parse(parsed);
  } catch (error) {
    console.error('Failed to parse theme JSON:', error);
    return null;
  }
}