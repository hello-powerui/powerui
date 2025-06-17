import { PrismaClient } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db/prisma';

/**
 * Base service class that provides common functionality
 * for all services in the application
 */
export abstract class BaseService {
  protected prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || prisma;
  }

  /**
   * Helper to handle database errors consistently
   */
  protected handleDatabaseError(error: unknown, operation: string): never {
    console.error(`Database error during ${operation}:`, error);
    
    if (error instanceof Error) {
      // Check for common Prisma errors
      if (error.message.includes('P2002')) {
        throw new Error(`Duplicate record found during ${operation}`);
      }
      if (error.message.includes('P2025')) {
        throw new Error(`Record not found during ${operation}`);
      }
      throw error;
    }
    
    throw new Error(`Unknown error during ${operation}`);
  }

  /**
   * Helper for consistent logging
   */
  protected log(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${this.constructor.name}] ${message}`, data || '');
    }
  }

  /**
   * Helper for error logging
   */
  protected logError(message: string, error: unknown): void {
    console.error(`[${this.constructor.name}] ${message}`, error);
  }
}