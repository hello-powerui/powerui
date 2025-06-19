import { BaseService } from './base-service';
import type { User, Prisma } from '@/lib/generated/prisma';
import { NotFoundError } from '@/lib/errors';

export class UserService extends BaseService {
  /**
   * Get a user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getUserById');
    }
  }

  /**
   * Ensure a user exists in the database
   */
  async ensureUserExists(userId: string, email?: string): Promise<User> {
    try {
      const user = await this.prisma.user.upsert({
        where: { id: userId },
        update: { 
          email: email || undefined,
          updatedAt: new Date(),
        },
        create: {
          id: userId,
          email: email || '',
          plan: 'PRO', // Default plan for new users
        },
      });
      
      return user;
    } catch (error) {
      this.handleDatabaseError(error, 'ensureUserExists');
    }
  }

  /**
   * Update user information
   */
  async updateUser(
    userId: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data,
      });
    } catch (error) {
      this.handleDatabaseError(error, 'updateUser');
    }
  }

  /**
   * Update user's payment status
   */
  async updatePaymentStatus(
    userId: string,
    plan: 'PRO' | 'TEAM',
    stripeCustomerId?: string
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          plan,
          stripeCustomerId: stripeCustomerId || undefined,
        },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'updatePaymentStatus');
    }
  }

  /**
   * Get user's organization memberships
   */
  async getUserOrganizations(userId: string) {
    try {
      return await this.prisma.organizationMember.findMany({
        where: { userId },
        include: {
          organization: true,
        },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getUserOrganizations');
    }
  }

  /**
   * Delete a user and all their data
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      // Use transaction to ensure all data is deleted
      await this.prisma.$transaction(async (tx) => {
        // Delete themes
        await tx.theme.deleteMany({
          where: { userId },
        });
        
        // Delete palettes
        await tx.colorPalette.deleteMany({
          where: { userId },
        });
        
        await tx.neutralPalette.deleteMany({
          where: { userId },
        });
        
        // Delete organization memberships
        await tx.organizationMember.deleteMany({
          where: { userId },
        });
        
        // Delete user
        await tx.user.delete({
          where: { id: userId },
        });
      });
    } catch (error) {
      this.handleDatabaseError(error, 'deleteUser');
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string) {
    try {
      const [themes, colorPalettes, neutralPalettes, organizations] = await Promise.all([
        this.prisma.theme.count({ where: { userId } }),
        this.prisma.colorPalette.count({ where: { userId } }),
        this.prisma.neutralPalette.count({ where: { userId } }),
        this.prisma.organizationMember.count({ where: { userId } }),
      ]);
      
      return {
        themes,
        colorPalettes,
        neutralPalettes,
        organizations,
      };
    } catch (error) {
      this.handleDatabaseError(error, 'getUserStats');
    }
  }
}