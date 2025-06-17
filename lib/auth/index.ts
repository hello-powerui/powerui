import { auth, clerkClient } from '@clerk/nextjs/server'
import { services } from '@/lib/services'
import { hasActiveSubscription } from './permissions'
import { 
  AuthenticationError, 
  SubscriptionRequiredError 
} from '@/lib/errors'
import type { User } from '@/lib/generated/prisma'
import type { User as ClerkUser } from '@clerk/nextjs/server'

interface AuthenticatedUser {
  clerkUser: ClerkUser;
  dbUser: User;
}

/**
 * Gets the current Clerk user if authenticated
 */
export async function getCurrentClerkUser(): Promise<ClerkUser | null> {
  const { userId } = await auth();
  if (!userId) return null;
  
  const client = await clerkClient();
  return client.users.getUser(userId);
}

/**
 * Gets the current database user if authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;
  
  return services.user.getUserById(userId);
}

/**
 * Gets both Clerk and database user records
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const { userId } = await auth();
  if (!userId) return null;
  
  const [clerkUser, dbUser] = await Promise.all([
    (await clerkClient()).users.getUser(userId),
    services.user.ensureUserExists(userId)
  ]);
  
  return { clerkUser, dbUser };
}

/**
 * Requires an authenticated user, throws if not authenticated
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
}

/**
 * Requires an authenticated user with an active subscription
 */
export async function requirePaidUser(): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  
  const hasSubscription = await hasActiveSubscription(user.dbUser.id);
  if (!hasSubscription) {
    throw new SubscriptionRequiredError();
  }
  
  return user;
}

/**
 * Helper to get just the user ID if authenticated
 */
export async function getAuthUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Helper to require just the user ID
 */
export async function requireAuthUserId(): Promise<string> {
  const userId = await getAuthUserId();
  if (!userId) {
    throw new AuthenticationError();
  }
  return userId;
}

// Re-export permissions
export * from './permissions';