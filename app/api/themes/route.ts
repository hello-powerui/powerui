import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/utils/get-current-user';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const themes = await ThemeService.getUserThemes(user.id);
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const data = await req.json();

    const theme = await ThemeService.createTheme(user.id, {
      name: data.name,
      description: data.description,
      themeData: data.themeData
    });

    return NextResponse.json(theme);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}