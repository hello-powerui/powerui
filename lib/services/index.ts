import { PrismaClient } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db/prisma';
import { ThemeService } from './theme-service';
import { PaletteService } from './palette-service';
import { UserService } from './user-service';
import { PowerBIService } from './powerbi-service';

/**
 * Service registry for dependency injection
 * Provides singleton instances of all services
 */
class ServiceRegistry {
  private static instance: ServiceRegistry;
  
  public readonly theme: ThemeService;
  public readonly palette: PaletteService;
  public readonly user: UserService;
  public readonly powerbi: PowerBIService;
  
  private constructor(prismaClient: PrismaClient) {
    this.theme = new ThemeService(prismaClient);
    this.palette = new PaletteService(prismaClient);
    this.user = new UserService(prismaClient);
    this.powerbi = PowerBIService.getInstance();
  }
  
  public static getInstance(prismaClient?: PrismaClient): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry(prismaClient || prisma);
    }
    return ServiceRegistry.instance;
  }
  
  /**
   * Reset the service registry (useful for testing)
   */
  public static reset(): void {
    ServiceRegistry.instance = undefined as any;
  }
}

// Export singleton instance
export const services = ServiceRegistry.getInstance();

// Export individual services for backward compatibility
export const themeService = services.theme;
export const paletteService = services.palette;
export const userService = services.user;
export const powerbiService = services.powerbi;