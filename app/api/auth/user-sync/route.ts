import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserService } from '@/lib/db/services/user-service';

/**
 * Lightweight user sync endpoint
 * Automatically creates/updates user in database if they're authenticated
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ synced: false, message: 'Not authenticated' });
    }
    
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@user.local`;
    
    const dbUser = await UserService.upsertUser(userId, email, clerkUser?.username || undefined);
    
    return NextResponse.json({
      synced: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
      }
    });
  } catch (error) {
    // console.error('User sync error:', error);
    return NextResponse.json({ synced: false, error: 'Sync failed' });
  }
}