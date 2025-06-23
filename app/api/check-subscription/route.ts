import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { hasActiveSubscription } from '@/lib/user-permissions';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ hasSubscription: false }, { status: 401 });
  }
  
  const hasSubscription = await hasActiveSubscription(userId);
  
  return NextResponse.json({ hasSubscription });
}