import { prisma } from '@/lib/db/prisma'
import type { User } from '@/lib/generated/prisma'

export class UserService {
  /**
   * Create or update a user from Clerk data
   */
  static async upsertUser(clerkUserId: string, email: string): Promise<User> {
    return prisma.user.upsert({
      where: { id: clerkUserId },
      update: { email },
      create: {
        id: clerkUserId,
        email,
      },
    })
  }

  /**
   * Ensure user exists, creating from Clerk if needed
   */
  static async ensureUserExists(clerkUserId: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { id: clerkUserId },
    });

    if (existingUser) {
      return existingUser;
    }

    // If user doesn't exist, we need to get their email from Clerk
    // For now, create with a placeholder email that will be updated by webhook
    const newUser = await prisma.user.create({
      data: {
        id: clerkUserId,
        email: `${clerkUserId}@placeholder.local`, // This will be updated by Clerk webhook
      },
    });

    return newUser;
  }

  /**
   * Get user by Clerk ID
   */
  static async getUserById(clerkUserId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: clerkUserId },
    })
  }

  /**
   * Delete user and all their data
   */
  static async deleteUser(clerkUserId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: clerkUserId },
    })
  }
}