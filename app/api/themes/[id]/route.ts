import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/utils/get-current-user';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const theme = await ThemeService.getThemeById(id, user.id);
    
    if (!theme) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json(
      { error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const { id } = await params;
    
    // Check if theme exists and belongs to user
    const existingTheme = await ThemeService.getThemeById(id, user.id);
    if (!existingTheme) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      );
    }
    
    // Create update data with proper formatting
    const updateData = {
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
      // Store complete theme data for re-loading
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
      },
      version: '1.0', // Update version if schema changes
    };
    
    const updatedTheme = await ThemeService.updateTheme(
      id,
      user.id,
      updateData
    );
    
    return NextResponse.json(updatedTheme);
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    
    // Check if theme exists and belongs to user
    const existingTheme = await ThemeService.getThemeById(id, user.id);
    if (!existingTheme) {
      return NextResponse.json(
        { error: 'Theme not found' },
        { status: 404 }
      );
    }
    
    await ThemeService.deleteTheme(id, user.id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json(
      { error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}