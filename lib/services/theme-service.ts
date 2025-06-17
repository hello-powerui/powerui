import { BaseService } from './base-service';
import type { Theme, Prisma } from '@/lib/generated/prisma';
import { NotFoundError, AuthorizationError } from '@/lib/errors';
import { validatePowerBITheme } from '@/lib/types/theme';

export class ThemeService extends BaseService {
  /**
   * Get all themes accessible to a user
   */
  async getUserThemes(userId: string): Promise<Theme[]> {
    try {
      // Get user's organization memberships
      const memberships = await this.prisma.organizationMember.findMany({
        where: { userId },
        select: { organizationId: true },
      });
      
      const organizationIds = memberships.map(m => m.organizationId);
      
      return await this.prisma.theme.findMany({
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
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getUserThemes');
    }
  }

  /**
   * Get a single theme by ID with access check
   */
  async getThemeById(themeId: string, userId: string): Promise<Theme> {
    const theme = await this.prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        organization: true,
      },
    });
    
    if (!theme) {
      throw new NotFoundError('Theme', themeId);
    }
    
    // Check access
    const hasAccess = await this.checkThemeAccess(theme, userId);
    if (!hasAccess) {
      throw new AuthorizationError('You do not have access to this theme');
    }
    
    return theme;
  }

  /**
   * Create a new theme
   */
  async createTheme(data: {
    name: string;
    description?: string;
    theme: string;
    userId: string;
    organizationId?: string;
    visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
    schemaVersion?: string;
  }): Promise<Theme> {
    try {
      // Validate theme data
      const themeData = validatePowerBITheme(JSON.parse(data.theme));
      
      return await this.prisma.theme.create({
        data: {
          ...data,
          theme: JSON.stringify(themeData),
          schemaVersion: data.schemaVersion || '2.143',
          visibility: data.visibility || 'PRIVATE',
        },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'createTheme');
    }
  }

  /**
   * Update an existing theme
   */
  async updateTheme(
    themeId: string, 
    userId: string,
    data: Prisma.ThemeUpdateInput
  ): Promise<Theme> {
    // First check if user has access
    const theme = await this.getThemeById(themeId, userId);
    
    // Only owner can update
    if (theme.userId !== userId) {
      throw new AuthorizationError('Only the theme owner can update this theme');
    }
    
    try {
      // If theme data is provided, validate it
      if (data.theme && typeof data.theme === 'string') {
        const themeData = validatePowerBITheme(JSON.parse(data.theme));
        data.theme = JSON.stringify(themeData);
      }
      
      return await this.prisma.theme.update({
        where: { id: themeId },
        data,
      });
    } catch (error) {
      this.handleDatabaseError(error, 'updateTheme');
    }
  }

  /**
   * Delete a theme
   */
  async deleteTheme(themeId: string, userId: string): Promise<void> {
    const theme = await this.getThemeById(themeId, userId);
    
    // Only owner can delete
    if (theme.userId !== userId) {
      throw new AuthorizationError('Only the theme owner can delete this theme');
    }
    
    try {
      await this.prisma.theme.delete({
        where: { id: themeId },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'deleteTheme');
    }
  }

  /**
   * Get public themes
   */
  async getPublicThemes(limit = 20, offset = 0): Promise<Theme[]> {
    try {
      return await this.prisma.theme.findMany({
        where: { visibility: 'PUBLIC' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getPublicThemes');
    }
  }

  /**
   * Check if a user has access to a theme
   */
  private async checkThemeAccess(theme: Theme, userId: string): Promise<boolean> {
    // Owner always has access
    if (theme.userId === userId) return true;
    
    // Public themes are accessible to all
    if (theme.visibility === 'PUBLIC') return true;
    
    // Organization themes require membership
    if (theme.visibility === 'ORGANIZATION' && theme.organizationId) {
      const membership = await this.prisma.organizationMember.findFirst({
        where: {
          userId,
          organizationId: theme.organizationId,
        },
      });
      return !!membership;
    }
    
    return false;
  }
}