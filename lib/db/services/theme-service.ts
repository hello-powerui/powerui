import { prisma } from '@/lib/db/prisma'
import type { Theme, Prisma } from '@/lib/generated/prisma'

export class ThemeService {
  /**
   * Get all themes for a user (including organization themes)
   */
  static async getUserThemes(userId: string): Promise<Theme[]> {
    // Get user's organization memberships
    const memberships = await prisma.organizationMember.findMany({
      where: { userId },
      select: { organizationId: true },
    });
    
    const organizationIds = memberships.map(m => m.organizationId);
    
    return prisma.theme.findMany({
      where: {
        OR: [
          { userId }, // User's own themes
          { 
            visibility: 'ORGANIZATION',
            organizationId: { in: organizationIds }
          }, // Organization themes
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        organization: true,
      },
    })
  }

  /**
   * Get a single theme by ID (with access check)
   */
  static async getThemeById(themeId: string, userId: string): Promise<Theme | null> {
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        organization: true,
      },
    });
    
    if (!theme) return null;
    
    // Check access
    if (theme.userId === userId) return theme; // Owner
    if (theme.visibility === 'PUBLIC') return theme; // Public
    
    // Check organization access
    if (theme.visibility === 'ORGANIZATION' && theme.organizationId) {
      const membership = await prisma.organizationMember.findFirst({
        where: {
          organizationId: theme.organizationId,
          userId,
        },
      });
      if (membership) return theme;
    }
    
    return null;
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
   * Get organization themes
   */
  static async getOrganizationThemes(organizationId: string): Promise<Theme[]> {
    return prisma.theme.findMany({
      where: {
        organizationId,
        visibility: 'ORGANIZATION',
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    })
  }

  /**
   * Share theme with organization
   */
  static async shareThemeWithOrganization(
    themeId: string,
    userId: string,
    organizationId: string
  ): Promise<Theme> {
    return prisma.theme.update({
      where: {
        id: themeId,
        userId, // Ensure user owns the theme
      },
      data: {
        visibility: 'ORGANIZATION',
        organizationId,
      },
    })
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

  /**
   * Duplicate a theme
   */
  static async duplicateTheme(
    themeId: string,
    userId: string,
    newName?: string
  ): Promise<Theme> {
    // Get the original theme with access check
    const originalTheme = await this.getThemeById(themeId, userId);
    
    if (!originalTheme) {
      throw new Error('Theme not found or access denied');
    }

    // Create the duplicate with a new name
    const duplicatedTheme = await prisma.theme.create({
      data: {
        name: newName || `${originalTheme.name} (Copy)`,
        description: originalTheme.description,
        themeData: originalTheme.themeData,
        visibility: 'PRIVATE', // Always set duplicated themes as private
        isDefault: false,
        user: {
          connect: { id: userId },
        },
      },
    });

    return duplicatedTheme;
  }
}