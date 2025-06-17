import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, requireUser } from '@/lib/utils/get-current-user';
import { getUserNeutralPalettes, getBuiltInNeutralPalettes, createNeutralPalette } from '@/lib/db/services/palette-service';
import { BUILT_IN_NEUTRAL_PALETTES, toApiNeutralPalette } from '@/lib/constants/built-in-palettes';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    // Try to get built-in palettes from database
    let builtInPalettes = [];
    try {
      builtInPalettes = await getBuiltInNeutralPalettes();
    } catch (dbError) {
      // console.error('Failed to fetch built-in palettes from DB:', dbError);
      // Use fallback palettes
      builtInPalettes = BUILT_IN_NEUTRAL_PALETTES.map(toApiNeutralPalette);
    }
    
    // If no built-in palettes from DB, use our hardcoded ones
    if (builtInPalettes.length === 0) {
      builtInPalettes = BUILT_IN_NEUTRAL_PALETTES.map(toApiNeutralPalette);
    }
    
    if (!user) {
      return NextResponse.json(builtInPalettes);
    }
    
    let userPalettes = [];
    try {
      userPalettes = await getUserNeutralPalettes(user.id);
    } catch (dbError) {
      // console.error('Failed to fetch user palettes:', dbError);
      // Continue with just built-in palettes
    }
    
    // Combine built-in and user palettes
    const allPalettes = [...builtInPalettes, ...userPalettes];
    
    return NextResponse.json(allPalettes);
  } catch (error) {
    // console.error('Error fetching neutral palettes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch neutral palettes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
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
    
    const palette = await createNeutralPalette(user.id, {
      name: data.name,
      colors: colors
    });
    
    return NextResponse.json(palette);
  } catch (error) {
    // console.error('Error creating neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create neutral palette' },
      { status: 500 }
    );
  }
}