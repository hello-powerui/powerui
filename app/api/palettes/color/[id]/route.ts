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

    const dbUserId = await UserService.ensureUserExists(userId);
    const data = await request.json();
    const { id } = await params;
    
    const palette = await PaletteService.updateColorPalette(id, dbUserId, {
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
    console.error('Error updating color palette:', error);
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

    const dbUserId = await UserService.ensureUserExists(userId);
    const { id } = await params;
    
    // Check if palette is referenced by any themes
    const themes = await ThemeService.getUserThemes(dbUserId);
    const referencingThemes = themes.filter(theme => theme.dataPalette === id);
    
    try {
      await PaletteService.deleteColorPalette(id, dbUserId);
    } catch (error) {
      return NextResponse.json(
        { error: 'Palette not found or unauthorized' },
        { status: 404 }
      );
    }
    
    // Reset themes that were using this palette
    if (referencingThemes.length > 0) {
      const defaultPalette = await PaletteService.getBuiltInColorPalettes();
      const defaultPaletteId = defaultPalette[0]?.id;
      
      if (defaultPaletteId) {
        for (const theme of referencingThemes) {
          await ThemeService.updateTheme(theme.id, dbUserId, {
            dataPalette: defaultPaletteId
          });
        }
      }
    }
    
    return NextResponse.json({ 
      success: true,
      affectedThemes: referencingThemes.map(t => t.name)
    });
  } catch (error) {
    console.error('Error deleting color palette:', error);
    return NextResponse.json(
      { error: 'Failed to delete palette' },
      { status: 500 }
    );
  }
}