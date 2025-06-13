import { ThemeGenerationInput, ColorPalette } from './types';
import { resolveColors, ColorPalettes } from './theme-config';
import { validateNeutralPalette, replaceTokens } from './utils';
import { createEmptyTheme } from './empty-theme';
import { mapNeutralPaletteToTheme } from './neutral-mapper';
import { resolveToken } from './token-registry';

export class SimpleThemeGenerator {
  private colors: Record<string, string> = {};
  
  generate(input: ThemeGenerationInput): any {
    // Validate input
    this.validateInput(input);
    
    // Ensure neutral palette is an object
    if (typeof input.neutralPalette === 'string') {
      throw new Error('Neutral palette must be provided as a ColorPalette object');
    }
    
    // Prepare color palettes
    const palettes: ColorPalettes = {
      neutral: input.neutralPalette,
      dataColors: input.dataColors
    };
    
    // Resolve all colors based on mode
    const colors = resolveColors(input.mode, palettes);
    this.colors = colors;
    
    // Start with empty theme
    const theme = createEmptyTheme(input.name, input.dataColors);
    
    // Override with resolved colors
    Object.assign(theme, {
      // Critical colors for Power BI
      background: colors['text-secondary'], // Power BI uses this differently
      backgroundLight: colors['background-active'],
      backgroundNeutral: colors['background-secondary'],
      foreground: colors['text-secondary'],
      foregroundNeutralSecondary: colors['text-secondary'],
      foregroundNeutralTertiary: colors['text-tertiary'],
      
      // Semantic colors
      bad: colors['error'],
      good: colors['success'],
      neutral: colors['warning'],
      center: colors['text-primary'],
      
      // Structural colors (used by various visuals)
      firstLevelElements: colors['firstLevelElements'],
      secondLevelElements: colors['secondLevelElements'],
      thirdLevelElements: colors['thirdLevelElements'],
      fourthLevelElements: colors['fourthLevelElements'],
      tableAccent: colors['tableAccent'],
      
      // Text classes - user provides these
      textClasses: {},
      
      // Visual styles - user provides these
      visualStyles: {}
    });
    
    // Apply neutral palette mapping for hierarchy colors
    if (input.neutralPalette) {
      const neutralMapping = mapNeutralPaletteToTheme(
        { 
          id: 'custom',
          name: 'Custom',
          shades: input.neutralPalette,
          userId: 'temp',
          isBuiltIn: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        input.mode
      );
      
      // Apply the mapped colors to the theme
      Object.assign(theme, neutralMapping);
    }
    
    // Apply custom text classes if provided
    if (input.textClasses && Object.keys(input.textClasses).length > 0) {
      theme.textClasses = this.formatTextClasses(input.textClasses);
    }
    
    // Apply custom visual styles if provided
    if (input.visualStyles && Object.keys(input.visualStyles).length > 0) {
      // Create token resolver
      const tokenResolver = this.createTokenResolver(input, colors);
      const resolved = replaceTokens(input.visualStyles, tokenResolver, input.dataColors);
      theme.visualStyles = resolved;
    }
    
    return theme;
  }
  
  private createTokenResolver(input: ThemeGenerationInput, colors: Record<string, string>) {
    return (token: string): any => {
      // Prepare palettes for token resolution
      const palettes: ColorPalettes = {
        neutral: input.neutralPalette as Record<string, string>,
        dataColors: input.dataColors
      };
      
      // Try to resolve using centralized token registry
      const resolved = resolveToken(token, input.mode, palettes);
      if (resolved) return resolved;
      
      // Direct color mappings from theme-config
      if (colors[token]) {
        return colors[token];
      }
      
      // Check for font tokens - users provide font names directly
      if (token.startsWith('font-')) {
        const fontStyle = token.replace('font-', '');
        if (fontStyle === 'regular') return input.fontFamily;
        if (fontStyle === 'bold') return `${input.fontFamily} Bold`;
        if (fontStyle === 'semibold') return `${input.fontFamily} SemiBold`;
        if (fontStyle === 'light') return `${input.fontFamily} Light`;
      }
      
      // Direct value tokens
      if (token === 'name') return input.name;
      if (token === 'dataColors') return input.dataColors;
      if (token === 'border-radius') return input.borderRadius;
      if (token === 'padding') return 16; // Default padding
      
      // Return a fallback color for unresolved tokens
      if (token.startsWith('bg-')) return input.mode === 'light' ? '#F5F5F5' : '#1A1A1A';
      if (token.startsWith('text-')) return input.mode === 'light' ? '#1A1A1A' : '#F5F5F5';
      if (token.startsWith('border-')) return input.mode === 'light' ? '#CCCCCC' : '#4D4D4D';
      if (token.startsWith('fg-')) return input.mode === 'light' ? '#1A1A1A' : '#FFFFFF';
      
      return input.mode === 'light' ? '#000000' : '#FFFFFF';
    };
  }
  
  private validateInput(input: ThemeGenerationInput): void {
    const requiredFields: (keyof ThemeGenerationInput)[] = [
      'mode', 'neutralPalette', 'fontFamily', 'borderRadius', 'dataColors', 'name'
    ];
    
    const missing = requiredFields.filter(field => !(field in input));
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    // Validate and fix neutral palette if needed
    if (typeof input.neutralPalette === 'object' && input.neutralPalette !== null) {
      if (!validateNeutralPalette(input.neutralPalette)) {
        // Neutral palette validation failed, using Azure default as fallback
        // Import Azure palette as fallback
        const { AZURE_NEUTRAL_PALETTE } = require('@/lib/defaults/palettes');
        input.neutralPalette = AZURE_NEUTRAL_PALETTE.shades;
      }
    } else {
      // If neutral palette is missing or invalid, use Azure default
      // Missing or invalid neutral palette, using Azure default
      const { AZURE_NEUTRAL_PALETTE } = require('@/lib/defaults/palettes');
      input.neutralPalette = AZURE_NEUTRAL_PALETTE.shades;
    }
  }
  
  // Removed - users provide text classes directly
  
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