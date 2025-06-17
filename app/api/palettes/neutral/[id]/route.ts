import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/utils/get-current-user';
import { getUserNeutralPalettes, getBuiltInNeutralPalettes } from '@/lib/db/services/palette-service';

// Define built-in neutral palettes that are always available
const BUILT_IN_NEUTRAL_PALETTES = [
  {
    id: 'azure-default',
    name: 'Azure',
    shades: {
      "25": "#F7F8F8", 
      "50": "#F1F3F4", 
      "100": "#E4E7E9", 
      "200": "#C9D0D3", 
      "300": "#AEB8BD", 
      "400": "#93A1A7", 
      "500": "#788991", 
      "600": "#606E74", 
      "700": "#485257", 
      "800": "#30373A", 
      "900": "#181B1D", 
      "950": "#0C0E0E" 
    },
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cool',
    name: 'Cool',
    shades: {
      '25': '#F9FAFB',
      '50': '#F3F4F6',
      '100': '#E5E7EB',
      '200': '#D1D5DB',
      '300': '#9CA3AF',
      '400': '#6B7280',
      '500': '#4B5563',
      '600': '#374151',
      '700': '#1F2937',
      '800': '#111827',
      '900': '#030712',
      '950': '#020617'
    },
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'neutral',
    name: 'Neutral',
    shades: {
      '25': '#FAFAFA',
      '50': '#F5F5F5',
      '100': '#E5E5E5',
      '200': '#D4D4D4',
      '300': '#A3A3A3',
      '400': '#737373',
      '500': '#525252',
      '600': '#404040',
      '700': '#262626',
      '800': '#171717',
      '900': '#0A0A0A',
      '950': '#050505'
    },
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'warm',
    name: 'Warm',
    shades: {
      '25': '#FAFAF9',
      '50': '#F5F5F4',
      '100': '#E7E5E4',
      '200': '#D6D3D1',
      '300': '#A8A29E',
      '400': '#78716C',
      '500': '#57534E',
      '600': '#44403C',
      '700': '#292524',
      '800': '#1C1917',
      '900': '#0C0A09',
      '950': '#080706'
    },
    isBuiltIn: true,
    userId: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // First check built-in palettes
    const builtInPalette = BUILT_IN_NEUTRAL_PALETTES.find(p => p.id === id);
    if (builtInPalette) {
      return NextResponse.json(builtInPalette);
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