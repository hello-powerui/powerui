import { prisma } from '@/lib/db/prisma'
import type { ColorPalette, NeutralPalette, Prisma } from '@/lib/generated/prisma'

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
   * Delete a color palette
   */
  static async deleteColorPalette(paletteId: string, userId: string): Promise<void> {
    await prisma.colorPalette.delete({
      where: {
        id: paletteId,
        userId,
      },
    })
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
      shades: Record<string, string>
    }
  ): Promise<NeutralPalette> {
    return prisma.neutralPalette.create({
      data: {
        ...data,
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
      shades?: Record<string, string>
    }
  ): Promise<NeutralPalette> {
    return prisma.neutralPalette.update({
      where: {
        id: paletteId,
        userId,
      },
      data,
    })
  }

  /**
   * Delete a neutral palette
   */
  static async deleteNeutralPalette(paletteId: string, userId: string): Promise<void> {
    await prisma.neutralPalette.delete({
      where: {
        id: paletteId,
        userId,
      },
    })
  }

  /**
   * Seed built-in palettes (run once during setup)
   */
  static async seedBuiltInPalettes(): Promise<void> {
    // Built-in color palette
    const powerUIPalette = {
      id: 'power-ui',
      name: 'Power UI',
      colors: [
        '#2568E8', '#8338EC', '#FF006E', '#F95608', 
        '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'
      ],
      isBuiltIn: true,
    }

    // Built-in neutral palettes
    const builtInNeutrals = [
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
      // Add more built-in palettes as needed
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

    // Upsert built-in color palette
    await prisma.colorPalette.upsert({
      where: { id: powerUIPalette.id },
      update: powerUIPalette,
      create: {
        ...powerUIPalette,
        userId: 'system',
      },
    })

    // Upsert built-in neutral palettes
    for (const palette of builtInNeutrals) {
      await prisma.neutralPalette.upsert({
        where: { id: palette.id },
        update: palette,
        create: palette,
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