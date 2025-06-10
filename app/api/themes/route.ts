import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/utils/get-current-user';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const themes = await ThemeService.getUserThemes(user.id);
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Error fetching themes:', error);
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

    // Create a properly formatted theme configuration
    const themeConfig = {
      name: data.name,
      description: data.description,
      dataPalette: Array.isArray(data.dataColors) ? 'custom' : data.dataColors,
      neutralPalette: typeof data.neutralPalette === 'string' ? data.neutralPalette : 'custom',
      fontFamily: data.fontFamily,
      colorMode: data.mode,
      borders: String(data.borderRadius),
      bgStyle: data.bgStyle,
      borderStyle: data.borderStyle,
      paddingStyle: data.paddingStyle,
      showBorders: data.showBorders,
      // Include the full theme data for proper storage
      themeData: data.themeData || {
        name: data.name,
        dataColors: data.dataColors,
        neutralPalette: data.neutralPalette,
        mode: data.mode,
        fontFamily: data.fontFamily,
        fontSize: data.fontSize,
        borderRadius: data.borderRadius,
        bgStyle: data.bgStyle,
        borderStyle: data.borderStyle,
        paddingStyle: data.paddingStyle,
        showBorders: data.showBorders,
        spacing: data.spacing,
        description: data.description,
      }
    };

    const theme = await ThemeService.createTheme(user.id, themeConfig);

    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error creating theme:', error);
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}