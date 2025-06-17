import { ThemeGenerationInput } from './types';
import { ColorPalettes } from './token-registry';
import { createUnifiedTokenResolver } from './shared-token-resolver';
import { replaceTokens } from './utils';
import { mapNeutralPaletteToTheme } from './neutral-mapper';
import { createEmptyTheme } from './empty-theme';
import { neutralColorsToShadeMap } from '@/lib/types/unified-palette';

/**
 * Client-side theme generator for preview purposes.
 * This avoids API calls and provides instant preview updates.
 */
export class ClientPreviewGenerator {
  /**
   * Generate a preview theme with resolved tokens.
   * This is a simplified version that handles the most common cases.
   */
  generatePreview(input: ThemeGenerationInput): any {
    // Start with empty theme
    const theme = createEmptyTheme(input.name, input.dataColors);
    
    // Prepare color palettes
    const palettes: ColorPalettes = {
      neutral: Array.isArray(input.neutralPalette) 
        ? neutralColorsToShadeMap(input.neutralPalette)
        : input.neutralPalette as Record<string, string>,
      dataColors: input.dataColors
    };
    
    // Apply neutral palette mapping
    if (input.neutralPalette) {
      const neutralMapping = mapNeutralPaletteToTheme(
        {
          id: 'preview',
          name: 'Preview',
          colors: Array.isArray(input.neutralPalette) 
            ? input.neutralPalette 
            : Object.values(input.neutralPalette),
          userId: 'preview',
          isBuiltIn: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        input.mode
      );
      Object.assign(theme, neutralMapping);
    }
    
    // Apply custom text classes if provided
    if (input.textClasses && Object.keys(input.textClasses).length > 0) {
      theme.textClasses = this.formatTextClasses(input.textClasses);
    }
    
    // Apply visual styles with token resolution
    if (input.visualStyles && Object.keys(input.visualStyles).length > 0) {
      const tokenResolver = this.createTokenResolver(input.mode, palettes, input.dataColors);
      theme.visualStyles = replaceTokens(input.visualStyles, tokenResolver, input.dataColors);
    }
    
    return theme;
  }
  
  private createTokenResolver(
    mode: 'light' | 'dark',
    palettes: ColorPalettes,
    dataColors: string[]
  ) {
    return createUnifiedTokenResolver({
      mode,
      palettes,
      dataColors,
      isPreview: true
    });
  }
  
  private formatTextClasses(textClasses: any): any {
    const formatted: any = {};
    
    for (const [className, config] of Object.entries(textClasses)) {
      if (config && typeof config === 'object') {
        const textClass: any = {};
        const classConfig = config as any;
        
        if (classConfig.fontColor) textClass.color = classConfig.fontColor;
        if (classConfig.fontFace) textClass.fontFace = classConfig.fontFace;
        if (classConfig.fontSize) textClass.fontSize = classConfig.fontSize;
        if (classConfig.bold) textClass.bold = true;
        
        formatted[className] = textClass;
      }
    }
    
    return formatted;
  }
}

// Singleton instance
let previewGenerator: ClientPreviewGenerator | null = null;

export function getPreviewGenerator(): ClientPreviewGenerator {
  if (!previewGenerator) {
    previewGenerator = new ClientPreviewGenerator();
  }
  return previewGenerator;
}