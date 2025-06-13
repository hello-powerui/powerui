import { ThemeGenerationInput, ColorPalette } from './types';
import { ColorPalettes } from './token-registry';
import { validateNeutralPalette, replaceTokens } from './utils';
import { createEmptyTheme } from './empty-theme';
import { mapNeutralPaletteToTheme } from './neutral-mapper';
import { createUnifiedTokenResolver } from './shared-token-resolver';

export class SimpleThemeGenerator {
  
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
    
    // Create token resolver
    const resolveToken = createUnifiedTokenResolver({
      name: input.name,
      mode: input.mode,
      palettes,
      dataColors: input.dataColors
    });
    
    // Start with empty theme
    const theme = createEmptyTheme(input.name, input.dataColors);
    
    // Override with resolved colors
    Object.assign(theme, {
      // Critical colors for Power BI
      background: resolveToken('@text-secondary'), // Power BI uses this differently
      backgroundLight: resolveToken('@bg-active'),
      backgroundNeutral: resolveToken('@bg-secondary'),
      foreground: resolveToken('@text-secondary'),
      foregroundNeutralSecondary: resolveToken('@text-secondary'),
      foregroundNeutralTertiary: resolveToken('@text-tertiary'),
      
      // Semantic colors
      bad: resolveToken('@text-error-primary'),
      good: resolveToken('@text-success-primary'),
      neutral: resolveToken('@text-warning-primary'),
      center: resolveToken('@text-primary'),
      
      // Structural colors (used by various visuals)
      firstLevelElements: resolveToken('@firstLevelElements'),
      secondLevelElements: resolveToken('@secondLevelElements'),
      thirdLevelElements: resolveToken('@thirdLevelElements'),
      fourthLevelElements: resolveToken('@fourthLevelElements'),
      tableAccent: resolveToken('@tableAccent'),
      
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
      const resolved = replaceTokens(input.visualStyles, resolveToken, input.dataColors);
      theme.visualStyles = resolved;
    }
    
    return theme;
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