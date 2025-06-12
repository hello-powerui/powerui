import { NextRequest, NextResponse } from 'next/server';
import { SimpleThemeGenerator } from '@/lib/theme-generation/simple-generator';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data: ThemeGenerationInput = await req.json();

    // Generate theme using the new simple generator
    const generator = new SimpleThemeGenerator();
    const theme = generator.generate(data);

    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error generating theme:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate theme' },
      { status: 500 }
    );
  }
}