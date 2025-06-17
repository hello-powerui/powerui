import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { services } from '@/lib/services';
import { apiSuccess, handleApiError } from '@/lib/api/middleware';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return apiSuccess({ 
        authenticated: false,
        clerkUserId: null,
        dbUser: null 
      });
    }
    
    const dbUser = await services.user.getUserById(userId);
    
    return apiSuccess({
      authenticated: true,
      clerkUserId: userId,
      dbUser: dbUser,
      hasUser: !!dbUser,
      plan: dbUser?.plan || 'NO_USER',
      isPaidUser: dbUser && ['PRO', 'TEAM'].includes(dbUser.plan)
    });
  } catch (error) {
    return handleApiError(error);
  }
}