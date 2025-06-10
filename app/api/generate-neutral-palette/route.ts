import { NextRequest, NextResponse } from 'next/server';
import { generateNeutralPalette, generateNeutralPaletteOffline } from '@/lib/theme-generation/neutral-palette';
import { NeutralPaletteGenerationInput } from '@/lib/theme-generation/types';
import { requireUser } from '@/lib/utils/get-current-user';

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    await requireUser();

    // Parse request body
    const data: NeutralPaletteGenerationInput = await req.json();

    if (!data.hexColor) {
      return NextResponse.json(
        { error: 'Hex color is required' },
        { status: 400 }
      );
    }

    // Try to generate using the API
    try {
      const result = await generateNeutralPalette(data);
      return NextResponse.json(result);
    } catch (apiError) {
      console.warn('Failed to generate palette using API, falling back to offline generation:', apiError);
      
      // Fallback to offline generation
      const palette = generateNeutralPaletteOffline(data.hexColor);
      return NextResponse.json({
        name: 'Custom',
        palette
      });
    }
  } catch (error) {
    console.error('Error generating neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate neutral palette' },
      { status: 500 }
    );
  }
}