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

    const updateData = {
      name: data.name,
      description: data.description,
      // Store the complete theme data as-is
      themeData: data.themeData,
      version: '2.0', // Update version to indicate new format
    };
    
    const updatedTheme = await ThemeService.updateTheme(
      id,
      user.id,
      updateData
    );
    
    return NextResponse.json(updatedTheme);
  } catch (error) {
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
    return NextResponse.json(
      { error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}