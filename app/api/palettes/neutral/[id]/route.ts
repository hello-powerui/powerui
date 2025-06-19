import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, requireUser } from '@/lib/utils/get-current-user';
import { getUserNeutralPalettes, getBuiltInNeutralPalettes, updateNeutralPalette, deleteNeutralPalette } from '@/lib/db/services/palette-service';
import { BUILT_IN_NEUTRAL_PALETTES, toApiNeutralPalette } from '@/lib/constants/built-in-palettes';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // First check built-in palettes
    const builtInPalette = BUILT_IN_NEUTRAL_PALETTES.find(p => p.id === id);
    if (builtInPalette) {
      return NextResponse.json(toApiNeutralPalette(builtInPalette));
    }
    
    // Try to get from database
    const user = await getCurrentUser();
    
    // Check built-in palettes from database
    try {
      const dbBuiltInPalettes = await getBuiltInNeutralPalettes();
      const dbPalette = dbBuiltInPalettes.find(p => p.id === id);
      if (dbPalette) {
        return NextResponse.json(dbPalette);
      }
    } catch (error) {
      // Continue to user palettes
    }
    
    // Check user palettes if user is logged in
    if (user) {
      try {
        const userPalettes = await getUserNeutralPalettes(user.id);
        const userPalette = userPalettes.find(p => p.id === id);
        if (userPalette) {
          return NextResponse.json(userPalette);
        }
      } catch (error) {
        // Continue to not found
      }
    }
    
    return NextResponse.json(
      { error: 'Neutral palette not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch neutral palette' },
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
    const { id } = await params;
    const data = await req.json();
    
    if (!data.name || (!data.colors && !data.shades)) {
      return NextResponse.json(
        { error: 'Name and colors are required' },
        { status: 400 }
      );
    }
    
    // Support both formats during transition
    const colors = data.colors || (data.shades ? Object.values(data.shades) : null);
    if (!Array.isArray(colors) || colors.length !== 12) {
      return NextResponse.json(
        { error: 'Colors must be an array of 12 hex values' },
        { status: 400 }
      );
    }
    
    const palette = await updateNeutralPalette(id, user.id, {
      name: data.name,
      colors: colors
    });
    
    return NextResponse.json(palette);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update neutral palette' },
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
    
    // Check if this is a built-in palette (cannot be deleted)
    const builtInPalette = BUILT_IN_NEUTRAL_PALETTES.find(p => p.id === id);
    if (builtInPalette) {
      return NextResponse.json(
        { error: 'Built-in palettes cannot be deleted' },
        { status: 400 }
      );
    }
    
    const result = await deleteNeutralPalette(id, user.id);
    
    return NextResponse.json({
      success: true,
      message: `Palette deleted successfully`,
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete neutral palette' },
      { status: 500 }
    );
  }
}