import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, requireUser } from '@/lib/utils/get-current-user';
import { getUserNeutralPalettes, getBuiltInNeutralPalettes, createNeutralPalette } from '@/lib/db/services/palette-service';

// Define built-in neutral palettes that are always available
const BUILT_IN_NEUTRAL_PALETTES = [
  {
    id: 'azure-default',
    name: 'Azure',
    colors: [
      "#FFFFFF", // 0
      "#F7F8F8", // 25
      "#F1F3F4", // 50
      "#E4E7E9", // 75
      "#E4E7E9", // 100
      "#C9D0D3", // 200
      "#AEB8BD", // 300
      "#93A1A7", // 400
      "#788991", // 500
      "#606E74", // 600
      "#485257", // 700
      "#30373A", // 800
      "#181B1D", // 900
      "#000000"  // 1000
    ],
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cool',
    name: 'Cool',
    colors: [
      '#FFFFFF', // 0
      '#F9FAFB', // 25
      '#F3F4F6', // 50
      '#E5E7EB', // 75
      '#E5E7EB', // 100
      '#D1D5DB', // 200
      '#9CA3AF', // 300
      '#6B7280', // 400
      '#4B5563', // 500
      '#374151', // 600
      '#1F2937', // 700
      '#111827', // 800
      '#030712', // 900
      '#000000'  // 1000
    ],
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'neutral',
    name: 'Neutral',
    colors: [
      '#FFFFFF', // 0
      '#FAFAFA', // 25
      '#F5F5F5', // 50
      '#E5E5E5', // 75
      '#E5E5E5', // 100
      '#D4D4D4', // 200
      '#A3A3A3', // 300
      '#737373', // 400
      '#525252', // 500
      '#404040', // 600
      '#262626', // 700
      '#171717', // 800
      '#0A0A0A', // 900
      '#000000'  // 1000
    ],
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'warm',
    name: 'Warm',
    colors: [
      '#FFFFFF', // 0
      '#FAFAF9', // 25
      '#F5F5F4', // 50
      '#E7E5E4', // 75
      '#E7E5E4', // 100
      '#D6D3D1', // 200
      '#A8A29E', // 300
      '#78716C', // 400
      '#57534E', // 500
      '#44403C', // 600
      '#292524', // 700
      '#1C1917', // 800
      '#0C0A09', // 900
      '#000000'  // 1000
    ],
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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
      builtInPalettes = BUILT_IN_NEUTRAL_PALETTES;
    }
    
    // If no built-in palettes from DB, use our hardcoded ones
    if (builtInPalettes.length === 0) {
      builtInPalettes = BUILT_IN_NEUTRAL_PALETTES;
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
    if (!Array.isArray(colors) || colors.length !== 14) {
      return NextResponse.json(
        { error: 'Colors must be an array of 14 hex values' },
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