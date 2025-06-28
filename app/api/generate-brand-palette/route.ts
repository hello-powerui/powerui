import { NextRequest, NextResponse } from 'next/server';
import { generateBrandPaletteWithName } from '@/lib/theme-generation/brand-palette';
import { BrandPaletteGenerationInput } from '@/lib/theme-generation/brand-palette';
import { requireUser } from '@/lib/utils/get-current-user';

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    await requireUser();

    // Parse request body
    const data: BrandPaletteGenerationInput = await req.json();

    if (!data.hexColor) {
      return NextResponse.json(
        { error: 'Hex color is required' },
        { status: 400 }
      );
    }

    // Generate palette using our enhanced algorithm
    const result = await generateBrandPaletteWithName(data);
    return NextResponse.json(result);
  } catch (error) {
    // console.error('Error generating brand palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate brand palette' },
      { status: 500 }
    );
  }
}