import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserService } from '@/lib/db/services/user-service';

/**
 * Manual sync endpoint to sync current Clerk user to database
 * Visit /api/auth/sync while signed in to sync your user
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated. Please sign in first.' },
        { status: 401 }
      );
    }
    
    const user = await currentUser();
    
    if (!user || !user.emailAddresses[0]) {
      return NextResponse.json(
        { error: 'No user email found' },
        { status: 400 }
      );
    }
    
    const dbUser = await UserService.upsertUser(
      userId,
      user.emailAddresses[0].emailAddress
    );
    
    return NextResponse.json({
      success: true,
      message: 'User synced successfully!',
      user: {
        id: dbUser.id,
        email: dbUser.email,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
      }
    });
  } catch (error) {
    // console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}