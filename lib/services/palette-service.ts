import { BaseService } from './base-service';
import type { ColorPalette, NeutralPalette } from '@/lib/generated/prisma';
import { NotFoundError, AuthorizationError, ValidationError } from '@/lib/errors';
import { ColorPaletteSchema, NeutralPaletteSchema } from '@/lib/types/theme';

export class PaletteService extends BaseService {
  /**
   * Get all color palettes for a user
   */
  async getUserColorPalettes(userId: string): Promise<ColorPalette[]> {
    try {
      return await this.prisma.colorPalette.findMany({
        where: {
          OR: [
            { userId },
            { isBuiltIn: true },
          ],
        },
        orderBy: [
          { isBuiltIn: 'desc' },
          { createdAt: 'desc' },
        ],
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getUserColorPalettes');
    }
  }

  /**
   * Get all neutral palettes for a user
   */
  async getUserNeutralPalettes(userId: string): Promise<NeutralPalette[]> {
    try {
      return await this.prisma.neutralPalette.findMany({
        where: {
          OR: [
            { userId },
            { isBuiltIn: true },
          ],
        },
        orderBy: [
          { isBuiltIn: 'desc' },
          { createdAt: 'desc' },
        ],
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getUserNeutralPalettes');
    }
  }

  /**
   * Create a color palette
   */
  async createColorPalette(data: {
    name: string;
    colors: string[];
    userId: string;
  }): Promise<ColorPalette> {
    try {
      // Validate colors
      const validated = ColorPaletteSchema.parse(data);
      
      return await this.prisma.colorPalette.create({
        data: validated,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        throw new ValidationError('Invalid color palette data', error);
      }
      this.handleDatabaseError(error, 'createColorPalette');
    }
  }

  /**
   * Create a neutral palette
   */
  async createNeutralPalette(data: {
    name: string;
    colors: string[];
    userId: string;
  }): Promise<NeutralPalette> {
    try {
      // Validate colors
      const validated = NeutralPaletteSchema.parse(data);
      
      return await this.prisma.neutralPalette.create({
        data: validated,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        throw new ValidationError('Invalid neutral palette data', error);
      }
      this.handleDatabaseError(error, 'createNeutralPalette');
    }
  }

  /**
   * Update a color palette
   */
  async updateColorPalette(
    paletteId: string,
    userId: string,
    data: { name?: string; colors?: string[] }
  ): Promise<ColorPalette> {
    const palette = await this.prisma.colorPalette.findUnique({
      where: { id: paletteId },
    });
    
    if (!palette) {
      throw new NotFoundError('Color palette', paletteId);
    }
    
    if (palette.userId !== userId) {
      throw new AuthorizationError('You can only update your own palettes');
    }
    
    try {
      // Validate if colors are provided
      if (data.colors) {
        ColorPaletteSchema.shape.colors.parse(data.colors);
      }
      
      return await this.prisma.colorPalette.update({
        where: { id: paletteId },
        data,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        throw new ValidationError('Invalid color palette data', error);
      }
      this.handleDatabaseError(error, 'updateColorPalette');
    }
  }

  /**
   * Update a neutral palette
   */
  async updateNeutralPalette(
    paletteId: string,
    userId: string,
    data: { name?: string; colors?: string[] }
  ): Promise<NeutralPalette> {
    const palette = await this.prisma.neutralPalette.findUnique({
      where: { id: paletteId },
    });
    
    if (!palette) {
      throw new NotFoundError('Neutral palette', paletteId);
    }
    
    if (palette.userId !== userId) {
      throw new AuthorizationError('You can only update your own palettes');
    }
    
    try {
      // Validate if colors are provided
      if (data.colors) {
        NeutralPaletteSchema.shape.colors.parse(data.colors);
      }
      
      return await this.prisma.neutralPalette.update({
        where: { id: paletteId },
        data,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        throw new ValidationError('Invalid neutral palette data', error);
      }
      this.handleDatabaseError(error, 'updateNeutralPalette');
    }
  }

  /**
   * Delete a color palette
   */
  async deleteColorPalette(paletteId: string, userId: string): Promise<void> {
    const palette = await this.prisma.colorPalette.findUnique({
      where: { id: paletteId },
    });
    
    if (!palette) {
      throw new NotFoundError('Color palette', paletteId);
    }
    
    if (palette.userId !== userId) {
      throw new AuthorizationError('You can only delete your own palettes');
    }
    
    if (palette.isBuiltIn) {
      throw new AuthorizationError('Cannot delete built-in palettes');
    }
    
    try {
      await this.prisma.colorPalette.delete({
        where: { id: paletteId },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'deleteColorPalette');
    }
  }

  /**
   * Delete a neutral palette
   */
  async deleteNeutralPalette(paletteId: string, userId: string): Promise<void> {
    const palette = await this.prisma.neutralPalette.findUnique({
      where: { id: paletteId },
    });
    
    if (!palette) {
      throw new NotFoundError('Neutral palette', paletteId);
    }
    
    if (palette.userId !== userId) {
      throw new AuthorizationError('You can only delete your own palettes');
    }
    
    if (palette.isBuiltIn) {
      throw new AuthorizationError('Cannot delete built-in palettes');
    }
    
    try {
      await this.prisma.neutralPalette.delete({
        where: { id: paletteId },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'deleteNeutralPalette');
    }
  }

  /**
   * Get palettes used in themes
   */
  async getPalettesFromThemes(userId: string): Promise<{
    colorPalettes: Array<{ name: string; colors: string[] }>;
    neutralPalettes: Array<{ name: string; colors: string[] }>;
  }> {
    // Get user's themes
    const themes = await this.prisma.theme.findMany({
      where: { userId },
      select: { themeData: true },
    });
    
    const colorPalettesMap = new Map<string, { name: string; colors: string[] }>();
    const neutralPalettesMap = new Map<string, { name: string; colors: string[] }>();
    
    for (const theme of themes) {
      try {
        const themeData = typeof theme.themeData === 'string' 
          ? JSON.parse(theme.themeData)
          : theme.themeData;
        
        // Extract color palette
        if (themeData.dataColors && Array.isArray(themeData.dataColors)) {
          const key = themeData.dataColors.join(',');
          if (!colorPalettesMap.has(key)) {
            colorPalettesMap.set(key, {
              name: `Theme Colors ${colorPalettesMap.size + 1}`,
              colors: themeData.dataColors,
            });
          }
        }
        
        // Extract neutral colors from background/foreground
        if (themeData.background || themeData.foreground) {
          const colors = this.generateNeutralPaletteFromColors(
            themeData.background || '#FFFFFF',
            themeData.foreground || '#000000'
          );
          const key = colors.join(',');
          if (!neutralPalettesMap.has(key)) {
            neutralPalettesMap.set(key, {
              name: `Theme Neutrals ${neutralPalettesMap.size + 1}`,
              colors,
            });
          }
        }
      } catch (error) {
        this.logError(`Failed to parse theme data`, error);
      }
    }
    
    return {
      colorPalettes: Array.from(colorPalettesMap.values()),
      neutralPalettes: Array.from(neutralPalettesMap.values()),
    };
  }

  /**
   * Generate a neutral palette from background and foreground colors
   */
  private generateNeutralPaletteFromColors(bg: string, fg: string): string[] {
    // Simple interpolation - in real app would use proper color science
    const colors: string[] = [];
    for (let i = 0; i < 14; i++) {
      const ratio = i / 13;
      colors.push(this.interpolateColor(bg, fg, ratio));
    }
    return colors;
  }

  /**
   * Simple color interpolation
   */
  private interpolateColor(color1: string, color2: string, ratio: number): string {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}