import { prisma } from '@/lib/db/prisma'
import type { Theme, Prisma } from '@prisma/client'

export class ThemeService {
  /**
   * Helper function to extract preview colors from theme data
   */
  private static async extractPreviewColors(theme: Theme): Promise<string[] | undefined> {
    if (!theme.themeData || typeof theme.themeData !== 'object') {
      return undefined;
    }
    
    const themeDataObj = theme.themeData as any;
    
    // Check for dataColors array (Power BI theme structure)
    if (themeDataObj.dataColors && Array.isArray(themeDataObj.dataColors)) {
      return themeDataObj.dataColors.slice(0, 5);
    }
    
    // Check for palette colors (alternative structure)
    if (themeDataObj.palette && themeDataObj.palette.colors && Array.isArray(themeDataObj.palette.colors)) {
      return themeDataObj.palette.colors.slice(0, 5);
    }
    
    // Check for colorPalette
    if (themeDataObj.colorPalette && Array.isArray(themeDataObj.colorPalette)) {
      return themeDataObj.colorPalette.slice(0, 5);
    }
    
    // Check for colorPaletteId and fetch from ColorPalette table
    if (themeDataObj.colorPaletteId) {
      try {
        const colorPalette = await prisma.colorPalette.findUnique({
          where: { id: themeDataObj.colorPaletteId },
          select: { colors: true }
        });
        if (colorPalette && colorPalette.colors && Array.isArray(colorPalette.colors)) {
          return (colorPalette.colors as string[]).slice(0, 5);
        }
      } catch (error) {
        console.error('Failed to fetch color palette:', error);
      }
    }
    
    return undefined;
  }
  /**
   * Get all themes for a user (including organization themes)
   */
  static async getUserThemes(userId: string): Promise<(Theme & { previewColors?: string[] })[]> {
    // Get user's organization memberships
    const memberships = await prisma.organizationMember.findMany({
      where: { userId },
      select: { organizationId: true },
    });
    
    const organizationIds = memberships.map(m => m.organizationId);
    
    const themes = await prisma.theme.findMany({
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
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            plan: true,
          },
        },
      },
    });

    // Extract preview colors from themeData
    const themesWithColors = await Promise.all(themes.map(async theme => {
      const themeWithColors = { ...theme } as Theme & { previewColors?: string[] };
      themeWithColors.previewColors = await this.extractPreviewColors(theme);
      return themeWithColors;
    }));
    
    return themesWithColors;
  }

  /**
   * Get a single theme by ID (with access check)
   */
  static async getThemeById(themeId: string, userId: string): Promise<Theme | null> {
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        organization: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            plan: true,
          },
        },
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
    // First check if user owns the theme or has organization access
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        organization: true,
      },
    });

    if (!theme) {
      throw new Error('Theme not found');
    }

    // Check if user can edit
    let canEdit = false;
    
    // Owner can always edit
    if (theme.userId === userId) {
      canEdit = true;
    }
    
    // Organization members can edit organization themes
    if (theme.visibility === 'ORGANIZATION' && theme.organizationId) {
      const membership = await prisma.organizationMember.findFirst({
        where: {
          userId,
          organizationId: theme.organizationId,
        },
      });
      if (membership) {
        canEdit = true;
      }
    }

    if (!canEdit) {
      throw new Error('Unauthorized to edit this theme');
    }

    return prisma.theme.update({
      where: { id: themeId },
      data,
    })
  }

  /**
   * Delete a theme
   */
  static async deleteTheme(themeId: string, userId: string): Promise<void> {
    // Only the owner can delete a theme
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
  static async getOrganizationThemes(organizationId: string): Promise<(Theme & { previewColors?: string[] })[]> {
    const themes = await prisma.theme.findMany({
      where: {
        organizationId,
        visibility: 'ORGANIZATION',
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });

    // Extract preview colors from themeData
    const themesWithColors = await Promise.all(themes.map(async theme => {
      const themeWithColors = { ...theme } as Theme & { previewColors?: string[] };
      themeWithColors.previewColors = await this.extractPreviewColors(theme);
      return themeWithColors;
    }));
    
    return themesWithColors;
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
        themeData: originalTheme.themeData || {},
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