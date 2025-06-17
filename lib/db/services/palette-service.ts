import { prisma } from '@/lib/db/prisma'
import type { ColorPalette, NeutralPalette, Prisma } from '@/lib/generated/prisma'
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes'

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
    // Find themes using this palette
    const affectedThemes = await this.findThemesUsingColorPalette(paletteId, userId);
    
    // Update affected themes to use default colors
    const updatePromises = affectedThemes.map(theme => {
      const updatedThemeData = {
        ...(theme.themeData as Record<string, any> || {}),
        palette: DEFAULT_COLOR_PALETTE,
        dataColors: DEFAULT_COLOR_PALETTE.colors
      };
      
      return prisma.theme.update({
        where: { id: theme.id },
        data: { 
          themeData: updatedThemeData
        }
      });
    });
    
    await Promise.all(updatePromises);
    
    // Now delete the palette
    await prisma.colorPalette.delete({
      where: {
        id: paletteId,
        userId,
      },
    });
    
    return {
      deletedPalette: true,
      updatedThemes: affectedThemes.length
    };
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
    return prisma.theme.findMany({
      where: {
        userId,
        themeData: {
          path: ['neutralPalette', 'id'],
          equals: paletteId
        }
      }
    });
  }

  /**
   * Find themes using a specific color palette  
   */
  private static async findThemesUsingColorPalette(paletteId: string, userId: string) {
    return prisma.theme.findMany({
      where: {
        userId,
        themeData: {
          path: ['palette', 'id'],
          equals: paletteId
        }
      }
    });
  }

  /**
   * Delete a neutral palette and cascade update themes to Azure default
   */
  static async deleteNeutralPalette(paletteId: string, userId: string): Promise<{ deletedPalette: boolean; updatedThemes: number }> {
    // Find themes using this palette
    const affectedThemes = await this.findThemesUsingNeutralPalette(paletteId, userId);
    
    // Update affected themes to use Azure default
    const updatePromises = affectedThemes.map(theme => {
      const updatedThemeData = {
        ...(theme.themeData as Record<string, any> || {}),
        neutralPalette: AZURE_NEUTRAL_PALETTE
      };
      
      return prisma.theme.update({
        where: { id: theme.id },
        data: { 
          themeData: updatedThemeData
        }
      });
    });
    
    await Promise.all(updatePromises);
    
    // Now delete the palette
    await prisma.neutralPalette.delete({
      where: {
        id: paletteId,
        userId,
      },
    });
    
    return {
      deletedPalette: true,
      updatedThemes: affectedThemes.length
    };
  }

  /**
   * Seed built-in palettes (run once during setup)
   */
  static async seedBuiltInPalettes(): Promise<void> {
    // Built-in color palettes
    const builtInColorPalettes = [
      {
        id: 'power-ui',
        name: 'Power UI',
        colors: [
          '#2568E8', '#8338EC', '#FF006E', '#F95608', 
          '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'
        ],
        description: 'Default Power UI color palette with vibrant, modern colors',
        isBuiltIn: true,
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
      }
    ]

    // Built-in neutral palettes
    const builtInNeutrals = [
      {
        id: 'azure-default',
        name: 'Azure',
        shades: {
          "25": "#F7F8F8", 
          "50": "#F1F3F4", 
          "100": "#E4E7E9", 
          "200": "#C9D0D3", 
          "300": "#AEB8BD", 
          "400": "#93A1A7", 
          "500": "#788991", 
          "600": "#606E74", 
          "700": "#485257", 
          "800": "#30373A", 
          "900": "#181B1D", 
          "950": "#0C0E0E" 
        },
        isBuiltIn: true,
      },
      {
        id: 'cool',
        name: 'Cool',
        shades: {
          '25': '#F9FAFB',
          '50': '#F3F4F6',
          '100': '#E5E7EB',
          '200': '#D1D5DB',
          '300': '#9CA3AF',
          '400': '#6B7280',
          '500': '#4B5563',
          '600': '#374151',
          '700': '#1F2937',
          '800': '#111827',
          '900': '#030712',
          '950': '#020617'
        },
        isBuiltIn: true,
      },
      {
        id: 'neutral',
        name: 'Neutral',
        shades: {
          '25': '#FAFAFA',
          '50': '#F5F5F5',
          '100': '#E5E5E5',
          '200': '#D4D4D4',
          '300': '#A3A3A3',
          '400': '#737373',
          '500': '#525252',
          '600': '#404040',
          '700': '#262626',
          '800': '#171717',
          '900': '#0A0A0A',
          '950': '#050505'
        },
        isBuiltIn: true,
      },
      {
        id: 'warm',
        name: 'Warm',
        shades: {
          '25': '#FAFAF9',
          '50': '#F5F5F4',
          '100': '#E7E5E4',
          '200': '#D6D3D1',
          '300': '#A8A29E',
          '400': '#78716C',
          '500': '#57534E',
          '600': '#44403C',
          '700': '#292524',
          '800': '#1C1917',
          '900': '#0C0A09',
          '950': '#080706'
        },
        isBuiltIn: true,
      },
    ]

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
    for (const palette of builtInColorPalettes) {
      await prisma.colorPalette.upsert({
        where: { id: palette.id },
        update: palette,
        create: {
          ...palette,
          userId: 'system',
        },
      })
    }

    // Upsert built-in neutral palettes
    for (const palette of builtInNeutrals) {
      await prisma.neutralPalette.upsert({
        where: { id: palette.id },
        update: palette,
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