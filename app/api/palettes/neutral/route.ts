import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, requireUser } from '@/lib/utils/get-current-user';
import { getUserNeutralPalettes, createNeutralPalette } from '@/lib/db/services/palette-service';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    // Return empty array for unauthenticated users instead of throwing error
    if (!user) {
      return NextResponse.json([]);
    }
    
    const palettes = await getUserNeutralPalettes(user.id);
    
    return NextResponse.json(palettes);
  } catch (error) {
    console.error('Error fetching neutral palettes:', error);
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
    
    if (!data.name || !data.shades) {
      return NextResponse.json(
        { error: 'Name and shades are required' },
        { status: 400 }
      );
    }
    
    const palette = await createNeutralPalette(user.id, {
      name: data.name,
      shades: data.shades
    });
    
    return NextResponse.json(palette);
  } catch (error) {
    console.error('Error creating neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create neutral palette' },
      { status: 500 }
    );
  }
}