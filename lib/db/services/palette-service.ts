import { prisma } from '@/lib/db/prisma'
import type { ColorPalette, NeutralPalette, Prisma } from '@prisma/client'
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes'
import { shadeMapToNeutralColors } from '@/lib/types/unified-palette'
import { BUILT_IN_COLOR_PALETTES, BUILT_IN_NEUTRAL_PALETTES } from '@/lib/constants/built-in-palettes'

export class PaletteService {
  /**
   * Get all color palettes for a user
   */
  static async getUserColorPalettes(userId: string): Promise<ColorPalette[]> {
    return prisma.colorPalette.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get built-in color palettes
   */
  static async getBuiltInColorPalettes(): Promise<ColorPalette[]> {
    return prisma.colorPalette.findMany({
      where: { isBuiltIn: true },
      orderBy: { name: 'asc' },
    })
  }

  /**
   * Create a color palette
   */
  static async createColorPalette(
    userId: string,
    data: {
      name: string
      description?: string
      colors: string[]
    }
  ): Promise<ColorPalette> {
    return prisma.colorPalette.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    })
  }

  /**
   * Update a color palette
   */
  static async updateColorPalette(
    paletteId: string,
    userId: string,
    data: {
      name?: string
      description?: string
      colors?: string[]
    }
  ): Promise<ColorPalette> {
    return prisma.colorPalette.update({
      where: {
        id: paletteId,
        userId,
      },
      data,
    })
  }

  /**
   * Delete a color palette and cascade update themes to default colors
   */
  static async deleteColorPalette(paletteId: string, userId: string): Promise<{ deletedPalette: boolean; updatedThemes: number }> {
    return await prisma.$transaction(async (tx) => {
      try {
        // First check if the palette exists and belongs to the user
        const palette = await tx.colorPalette.findFirst({
          where: {
            id: paletteId,
            userId,
          },
        });
        
        if (!palette) {
          throw new Error('Color palette not found or you do not have permission to delete it');
        }
        
        // Find themes using this palette - use raw query for reliability
        let affectedThemes: any[] = [];
        try {
          affectedThemes = await tx.$queryRaw`
            SELECT * FROM "Theme" 
            WHERE "userId" = ${userId} 
            AND ("themeData"->>'colorPaletteId') = ${paletteId}
          `;
        } catch (queryError) {
          console.error('Raw query failed, falling back to Prisma query:', queryError);
          // Fallback to regular Prisma query
          affectedThemes = await tx.theme.findMany({
            where: {
              userId,
              themeData: {
                path: ['colorPaletteId'],
                equals: paletteId
              }
            }
          });
        }
        
        // Update affected themes to use default colors
        for (const theme of affectedThemes) {
          const updatedThemeData = {
            ...(theme.themeData as Record<string, any> || {}),
            colorPaletteId: DEFAULT_COLOR_PALETTE.id,
            dataColors: DEFAULT_COLOR_PALETTE.colors
          };
          
          await tx.theme.update({
            where: { id: theme.id },
            data: { 
              themeData: updatedThemeData
            }
          });
        }
        
        // Now delete the palette
        await tx.colorPalette.delete({
          where: {
            id: paletteId,
          },
        });
        
        return {
          deletedPalette: true,
          updatedThemes: affectedThemes.length
        };
      } catch (error) {
        console.error('Error in deleteColorPalette transaction:', error);
        throw error;
      }
    });
  }

  /**
   * Get all neutral palettes for a user
   */
  static async getUserNeutralPalettes(userId: string): Promise<NeutralPalette[]> {
    return prisma.neutralPalette.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get built-in neutral palettes
   */
  static async getBuiltInNeutralPalettes(): Promise<NeutralPalette[]> {
    return prisma.neutralPalette.findMany({
      where: { isBuiltIn: true },
      orderBy: { name: 'asc' },
    })
  }

  /**
   * Create a neutral palette
   */
  static async createNeutralPalette(
    userId: string,
    data: {
      name: string
      colors?: string[]
      shades?: Record<string, string> // For backward compatibility
    }
  ): Promise<NeutralPalette> {
    // Convert shades to colors if needed
    const colors = data.colors || (data.shades ? Object.values(data.shades) : []);
    
    return prisma.neutralPalette.create({
      data: {
        name: data.name,
        colors,
        user: {
          connect: { id: userId },
        },
      },
    })
  }

  /**
   * Update a neutral palette
   */
  static async updateNeutralPalette(
    paletteId: string,
    userId: string,
    data: {
      name?: string
      colors?: string[]
      shades?: Record<string, string> // For backward compatibility
    }
  ): Promise<NeutralPalette> {
    // Convert shades to colors if needed
    const updateData: any = { name: data.name };
    if (data.colors) {
      updateData.colors = data.colors;
    } else if (data.shades) {
      updateData.colors = Object.values(data.shades);
    }
    
    return prisma.neutralPalette.update({
      where: {
        id: paletteId,
        userId,
      },
      data: updateData,
    })
  }

  /**
   * Find themes using a specific neutral palette
   */
  private static async findThemesUsingNeutralPalette(paletteId: string, userId: string) {
    try {
      // Use raw SQL for more reliable JSON querying
      const themes = await prisma.$queryRaw`
        SELECT * FROM "Theme" 
        WHERE "userId" = ${userId}::text 
        AND "themeData"->>'neutralPaletteId' = ${paletteId}::text
      `;
      
      return themes as any[];
    } catch (error) {
      console.error('Error finding themes with neutral palette:', error);
      // Fallback to basic Prisma query
      return prisma.theme.findMany({
        where: {
          userId,
          themeData: {
            path: ['neutralPaletteId'],
            equals: paletteId
          }
        }
      });
    }
  }

  /**
   * Find themes using a specific color palette  
   */
  private static async findThemesUsingColorPalette(paletteId: string, userId: string) {
    try {
      // Use raw SQL for more reliable JSON querying
      const themes = await prisma.$queryRaw`
        SELECT * FROM "Theme" 
        WHERE "userId" = ${userId}::text 
        AND "themeData"->>'colorPaletteId' = ${paletteId}::text
      `;
      
      return themes as any[];
    } catch (error) {
      console.error('Error finding themes with color palette:', error);
      // Fallback to basic Prisma query
      return prisma.theme.findMany({
        where: {
          userId,
          themeData: {
            path: ['colorPaletteId'],
            equals: paletteId
          }
        }
      });
    }
  }

  /**
   * Delete a neutral palette and cascade update themes to Azure default
   */
  static async deleteNeutralPalette(paletteId: string, userId: string): Promise<{ deletedPalette: boolean; updatedThemes: number }> {
    return await prisma.$transaction(async (tx) => {
      try {
        // First check if the palette exists and belongs to the user
        const palette = await tx.neutralPalette.findFirst({
          where: {
            id: paletteId,
            userId,
          },
        });
        
        if (!palette) {
          throw new Error('Neutral palette not found or you do not have permission to delete it');
        }
        
        console.log('Found palette to delete:', palette.id, palette.name);
        
        // Find themes using this palette - use raw query for reliability
        let affectedThemes: any[] = [];
        try {
          affectedThemes = await tx.$queryRaw`
            SELECT * FROM "Theme" 
            WHERE "userId" = ${userId}::text 
            AND "themeData"->>'neutralPaletteId' = ${paletteId}::text
          `;
        } catch (queryError) {
          console.error('Raw query failed, falling back to Prisma query:', queryError);
          // Fallback to regular Prisma query
          affectedThemes = await tx.theme.findMany({
            where: {
              userId,
              themeData: {
                path: ['neutralPaletteId'],
                equals: paletteId
              }
            }
          });
        }
        
        console.log(`Found ${affectedThemes.length} themes using this palette`);
        
        // Update affected themes to use Azure default
        for (const theme of affectedThemes) {
          const updatedThemeData = {
            ...(theme.themeData as Record<string, any> || {}),
            // Remove reference to deleted neutral palette
            neutralPaletteId: 'azure-default'
          };
          
          await tx.theme.update({
            where: { id: theme.id },
            data: { 
              themeData: updatedThemeData
            }
          });
        }
        
        console.log('Updated all affected themes');
        
        // Now delete the palette
        await tx.neutralPalette.delete({
          where: {
            id: paletteId,
          },
        });
        
        console.log('Successfully deleted palette');
        
        return {
          deletedPalette: true,
          updatedThemes: affectedThemes.length
        };
      } catch (error) {
        console.error('Error in deleteNeutralPalette transaction:', error);
        throw error;
      }
    });
  }

  /**
   * Seed built-in palettes (run once during setup)
   */
  static async seedBuiltInPalettes(): Promise<void> {

    // First ensure system user exists
    await prisma.user.upsert({
      where: { id: 'system' },
      update: {},
      create: {
        id: 'system',
        email: 'system@powerui.local',
      },
    });

    // Upsert built-in color palettes
    for (const palette of BUILT_IN_COLOR_PALETTES) {
      await prisma.colorPalette.upsert({
        where: { id: palette.id },
        update: {
          name: palette.name,
          description: palette.description,
          colors: palette.colors,
          isBuiltIn: palette.isBuiltIn,
        },
        create: {
          ...palette,
          userId: 'system',
        },
      })
    }

    // Upsert built-in neutral palettes
    for (const palette of BUILT_IN_NEUTRAL_PALETTES) {
      await prisma.neutralPalette.upsert({
        where: { id: palette.id },
        update: {
          name: palette.name,
          colors: palette.colors,
          isBuiltIn: palette.isBuiltIn,
        },
        create: {
          ...palette,
          userId: 'system',
        },
      })
    }
  }
}

// Export convenience functions
export const getUserColorPalettes = PaletteService.getUserColorPalettes;
export const getBuiltInColorPalettes = PaletteService.getBuiltInColorPalettes;
export const createColorPalette = PaletteService.createColorPalette;
export const updateColorPalette = PaletteService.updateColorPalette;
export const deleteColorPalette = PaletteService.deleteColorPalette;
export const getUserNeutralPalettes = PaletteService.getUserNeutralPalettes;
export const getBuiltInNeutralPalettes = PaletteService.getBuiltInNeutralPalettes;
export const createNeutralPalette = PaletteService.createNeutralPalette;
export const updateNeutralPalette = PaletteService.updateNeutralPalette;
export const deleteNeutralPalette = PaletteService.deleteNeutralPalette;