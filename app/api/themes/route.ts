import { NextRequest, NextResponse } from 'next/server';
import { requirePaidUser, handleAuthError } from '@/lib/auth-helpers';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function GET(req: NextRequest) {
  try {
    const userId = await requirePaidUser();
    const themes = await ThemeService.getUserThemes(userId);
    return NextResponse.json(themes);
  } catch (error) {
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message === 'Subscription required')) {
      return handleAuthError(error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await requirePaidUser();
    const data = await req.json();

    const theme = await ThemeService.createTheme(userId, {
      name: data.name,
      description: data.description,
      themeData: data.themeData
    });

    return NextResponse.json(theme);
  } catch (error) {
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message === 'Subscription required')) {
      return handleAuthError(error);
    }
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}