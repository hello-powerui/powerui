import { z } from 'zod';

// Common schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

// Theme schemas
export const createThemeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  themeData: z.record(z.any()), // Will be validated by theme service
  isPublic: z.boolean().default(false),
});

export const updateThemeSchema = createThemeSchema.partial();

// Palette schemas
export const colorSchema = z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color');

export const createColorPaletteSchema = z.object({
  name: z.string().min(1).max(50),
  colors: z.array(colorSchema).min(1).max(20),
  description: z.string().max(200).optional(),
});

export const createNeutralPaletteSchema = z.object({
  name: z.string().min(1).max(50),
  baseColor: colorSchema,
  description: z.string().max(200).optional(),
});

// Share schemas
export const shareThemeSchema = z.object({
  expiresIn: z.enum(['1h', '24h', '7d', '30d', 'never']).optional(),
});

// Webhook schemas
export const clerkWebhookHeadersSchema = z.object({
  'svix-id': z.string(),
  'svix-timestamp': z.string(),
  'svix-signature': z.string(),
});

// Response schemas for type safety
export const themeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  themeData: z.record(z.any()),
  userId: z.string(),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const paletteResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  colors: z.array(colorSchema),
  userId: z.string(),
  isBuiltIn: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type PaginationParams = z.infer<typeof paginationSchema>;
export type CreateThemeInput = z.infer<typeof createThemeSchema>;
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
export type CreateColorPaletteInput = z.infer<typeof createColorPaletteSchema>;
export type CreateNeutralPaletteInput = z.infer<typeof createNeutralPaletteSchema>;
export type ShareThemeInput = z.infer<typeof shareThemeSchema>;
export type ThemeResponse = z.infer<typeof themeResponseSchema>;
export type PaletteResponse = z.infer<typeof paletteResponseSchema>;