import { NextRequest, NextResponse } from 'next/server';
import { ThemeGenerator } from '@/lib/theme-generation/generator';
import { loadThemeConfigs } from '@/lib/theme-generation/data-loader';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';
import { validateNeutralPalette } from '@/lib/theme-generation/utils';
// Note: Theme caching is only available for saved themes, not during generation

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data: ThemeGenerationInput = await req.json();

    // Validate required fields
    const requiredFields: (keyof ThemeGenerationInput)[] = [
      'mode', 'neutralPalette', 'fontFamily', 'borderRadius', 'dataColors', 'name'
    ];
    const missing = requiredFields.filter(field => !(field in data));
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate neutral palette if it's an object
    if (typeof data.neutralPalette === 'object' && !validateNeutralPalette(data.neutralPalette)) {
      return NextResponse.json(
        { error: 'Invalid neutral palette format' },
        { status: 400 }
      );
    }

    // Skip caching for unsaved themes - caching only works with saved theme IDs
    // The GeneratedTheme table has a foreign key to Theme table
    
    // Load theme configurations
    const configs = await loadThemeConfigs();

    // Generate theme
    const generator = new ThemeGenerator(configs);
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