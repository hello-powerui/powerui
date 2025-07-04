import { NextRequest, NextResponse } from 'next/server';
import { generateNeutralPalette } from '@/lib/theme-generation/neutral-palette';
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

    // Generate palette using our enhanced algorithm
    const result = await generateNeutralPalette(data);
    return NextResponse.json(result);
  } catch (error) {
    // console.error('Error generating neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate neutral palette' },
      { status: 500 }
    );
  }
}