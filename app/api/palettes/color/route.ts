import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PaletteService } from '@/lib/db/services/palette-service';
import { UserService } from '@/lib/db/services/user-service';

export async function GET(request: NextRequest) {
  console.log('[Palette API] GET request received');
  
  try {
    let userId: string | null = null;
    
    try {
      const authResult = await auth();
      console.log('[Palette API] Auth result:', authResult);
      userId = authResult?.userId || null;
    } catch (authError) {
      console.error('[Palette API] Auth error:', authError);
      // Continue without authentication
    }
    
    console.log('[Palette API] User ID:', userId);
    
    if (!userId) {
      // Return default palettes for unauthenticated users
      const defaultPalettes = [
        {
          id: 'default-1',
          name: 'Power UI Default',
          colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56'],
          isBuiltIn: true,
          userId: null,
          description: 'Default color palette',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'default-2',
          name: 'Vibrant',
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#DDA0DD'],
          isBuiltIn: true,
          userId: null,
          description: 'Vibrant color palette',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      return NextResponse.json({ palettes: defaultPalettes });
    }

    console.log('[Palette API] Ensuring user exists...');
    const dbUserId = await UserService.ensureUserExists(userId);
    console.log('[Palette API] DB User ID:', dbUserId);
    
    // Get both user palettes and built-in palettes
    console.log('[Palette API] Fetching palettes...');
    const [userPalettes, builtInPalettes] = await Promise.all([
      PaletteService.getUserColorPalettes(dbUserId),
      PaletteService.getBuiltInColorPalettes()
    ]);
    
    console.log('[Palette API] User palettes:', userPalettes.length);
    console.log('[Palette API] Built-in palettes:', builtInPalettes.length);
    
    const palettes = [...builtInPalettes, ...userPalettes];
    
    // If no palettes exist, return defaults
    if (palettes.length === 0) {
      const defaultPalettes = [
        {
          id: 'default-1',
          name: 'Power UI Default',
          colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56'],
          isBuiltIn: true,
          userId: null,
          description: 'Default color palette',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      return NextResponse.json({ palettes: defaultPalettes });
    }
    
    return NextResponse.json({ palettes });
  } catch (error) {
    console.error('Error fetching color palettes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch palettes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUserId = await UserService.ensureUserExists(userId);
    const data = await request.json();
    
    // Validate input
    if (!data.name || typeof data.name !== 'string') {
      return NextResponse.json(
        { error: 'Palette name is required' },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(data.colors) || data.colors.length === 0) {
      return NextResponse.json(
        { error: 'Colors array is required and must not be empty' },
        { status: 400 }
      );
    }
    
    if (data.colors.length > 20) {
      return NextResponse.json(
        { error: 'Palette cannot have more than 20 colors' },
        { status: 400 }
      );
    }
    
    // Validate all colors are valid hex
    const hexRegex = /^#[0-9A-F]{6}$/i;
    const invalidColors = data.colors.filter((color: any) => 
      typeof color !== 'string' || !hexRegex.test(color)
    );
    
    if (invalidColors.length > 0) {
      return NextResponse.json(
        { error: 'All colors must be valid hex colors (e.g., #FF6B6B)' },
        { status: 400 }
      );
    }
    
    const palette = await PaletteService.createColorPalette(dbUserId, {
      name: data.name.trim().slice(0, 50),
      description: data.description ? data.description.trim().slice(0, 200) : undefined,
      colors: data.colors.map((c: string) => c.toUpperCase()),
    });
    
    return NextResponse.json({ palette }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating color palette:', error);
    
    // Check for unique constraint violation (duplicate name)
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'A palette with this name already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create palette', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}