import { prisma } from '@/lib/db/prisma'
import type { Theme, Prisma } from '@/lib/generated/prisma'

export class ThemeService {
  /**
   * Get all themes for a user
   */
  static async getUserThemes(userId: string): Promise<Theme[]> {
    return prisma.theme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get a single theme by ID
   */
  static async getThemeById(themeId: string, userId: string): Promise<Theme | null> {
    return prisma.theme.findFirst({
      where: {
        id: themeId,
        userId,
      },
    })
  }

  /**
   * Create a new theme
   */
  static async createTheme(
    userId: string,
    data: Omit<Prisma.ThemeCreateInput, 'user'>
  ): Promise<Theme> {
    return prisma.theme.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    })
  }

  /**
   * Update a theme
   */
  static async updateTheme(
    themeId: string,
    userId: string,
    data: Prisma.ThemeUpdateInput
  ): Promise<Theme> {
    return prisma.theme.update({
      where: {
        id: themeId,
        userId,
      },
      data,
    })
  }

  /**
   * Delete a theme
   */
  static async deleteTheme(themeId: string, userId: string): Promise<void> {
    await prisma.theme.delete({
      where: {
        id: themeId,
        userId,
      },
    })
  }

  /**
   * Set default theme for user
   */
  static async setDefaultTheme(themeId: string, userId: string): Promise<void> {
    await prisma.$transaction([
      // Clear existing default
      prisma.theme.updateMany({
        where: {
          userId,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      }),
      // Set new default
      prisma.theme.update({
        where: {
          id: themeId,
          userId,
        },
        data: {
          isDefault: true,
        },
      }),
    ])
  }

  /**
   * Cache generated theme JSON
   */
  static async cacheGeneratedTheme(
    themeId: string,
    generatedJson: object,
    version: string = '2.143'
  ): Promise<void> {
    await prisma.generatedTheme.create({
      data: {
        themeId,
        generatedJson,
        version,
      },
    })
  }

  /**
   * Get cached generated theme
   */
  static async getCachedTheme(themeId: string): Promise<object | null> {
    const cached = await prisma.generatedTheme.findFirst({
      where: { themeId },
      orderBy: { createdAt: 'desc' },
    })
    
    return cached?.generatedJson as object | null
  }
}