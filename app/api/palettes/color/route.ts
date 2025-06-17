import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PaletteService } from '@/lib/db/services/palette-service';
import { UserService } from '@/lib/db/services/user-service';

// Define built-in palettes that are always available
const BUILT_IN_COLOR_PALETTES = [
  {
    id: 'power-ui',
    name: 'Power UI',
    colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Default Power UI color palette with vibrant, modern colors',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#DDA0DD', '#FF8B94', '#B4A7D6'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Bright and energetic colors for dynamic visualizations',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pastel',
    name: 'Pastel Dreams',
    colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E8D5FF', '#FFC9DE', '#D4A5A5'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Soft pastel colors for a gentle, calming effect',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    colors: ['#003F5C', '#2F4B7C', '#665191', '#A05195', '#D45087', '#F95D6A', '#FF7C43', '#FFA600'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Professional palette transitioning from deep blues to warm accents',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'nature',
    name: 'Natural Earth',
    colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#84A98C', '#52796F', '#354F52'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Earth-inspired tones for organic, natural visualizations',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: ['#780116', '#C32F27', '#D8572A', '#F7B538', '#DB7C26', '#D8B863', '#C17767', '#B55239'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Warm sunset colors from deep reds to golden yellows',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(request: NextRequest) {

  try {
    let userId: string | null = null;
    
    try {
      const authResult = await auth();
      
      userId = authResult?.userId || null;
    } catch (authError) {
      // console.error('[Palette API] Auth error:', authError);
      // Continue without authentication
    }

    if (!userId) {
      // Return built-in palettes for unauthenticated users
      return NextResponse.json({ palettes: BUILT_IN_COLOR_PALETTES });
    }

    const dbUserId = await UserService.ensureUserExists(userId);

    // Get both user palettes and built-in palettes
    
    let userPalettes = [];
    let builtInPalettes = [];
    
    try {
      [userPalettes, builtInPalettes] = await Promise.all([
        PaletteService.getUserColorPalettes(dbUserId),
        PaletteService.getBuiltInColorPalettes()
      ]);

    } catch (dbError) {
      // console.error('[Palette API] Database error:', dbError);
      // Continue with fallback palettes
    }
    
    // If no built-in palettes from DB, use our hardcoded ones
    if (builtInPalettes.length === 0) {
      builtInPalettes = BUILT_IN_COLOR_PALETTES;
    }
    
    const palettes = [...builtInPalettes, ...userPalettes];
    
    return NextResponse.json({ palettes });
  } catch (error) {
    // console.error('Error fetching color palettes:', error);
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
    // console.error('Error creating color palette:', error);
    
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