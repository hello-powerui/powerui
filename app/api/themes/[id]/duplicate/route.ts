import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get optional new name from request body
    let newName: string | undefined;
    try {
      const body = await request.json();
      newName = body.name;
    } catch {
      // If no body or invalid JSON, that's okay - we'll use default naming
    }

    const { id } = await params;
    const duplicatedTheme = await ThemeService.duplicateTheme(
      id,
      userId,
      newName
    );

    return NextResponse.json(duplicatedTheme);
  } catch (error) {
    console.error('Failed to duplicate theme:', error);
    
    if (error instanceof Error && error.message === 'Theme not found or access denied') {
      return NextResponse.json(
        { error: 'Theme not found or access denied' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to duplicate theme' },
      { status: 500 }
    );
  }
}