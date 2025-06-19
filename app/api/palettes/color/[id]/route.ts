import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PaletteService } from '@/lib/db/services/palette-service';
import { UserService } from '@/lib/db/services/user-service';
import { ThemeService } from '@/lib/db/services/theme-service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await UserService.ensureUserExists(userId);
    const data = await request.json();
    const { id } = await params;
    
    const palette = await PaletteService.updateColorPalette(id, dbUser.id, {
      name: data.name,
      description: data.description,
      colors: data.colors,
    });
    
    if (!palette) {
      return NextResponse.json(
        { error: 'Palette not found or unauthorized' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ palette });
  } catch (error) {
    // console.error('Error updating color palette:', error);
    return NextResponse.json(
      { error: 'Failed to update palette' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await UserService.ensureUserExists(userId);
    const { id } = await params;
    
    const result = await PaletteService.deleteColorPalette(id, dbUser.id);
    
    return NextResponse.json({ 
      success: true,
      message: result.updatedThemes > 0 
        ? `Palette deleted successfully. ${result.updatedThemes} theme(s) updated to use default colors.`
        : 'Palette deleted successfully.'
    });
  } catch (error) {
    // console.error('Error deleting color palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete palette' },
      { status: 500 }
    );
  }
}