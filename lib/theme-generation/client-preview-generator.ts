import { ThemeGenerationInput } from './types';
import { ColorPalettes } from './token-registry';
import { createUnifiedTokenResolver } from './shared-token-resolver';
import { replaceTokens } from './utils';
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
      brand: input.brandPalette || null,
      success: input.successPalette || null,
      warning: input.warningPalette || null,
      error: input.errorPalette || null,
      dataColors: input.dataColors
    };
    
    // Create token resolver early so it can be used for all color resolution
    const tokenResolver = this.createTokenResolver(input.mode, palettes, input.dataColors);
    
    // No automatic neutral palette mapping - structural colors are handled explicitly
    
    // Apply custom structural colors with token resolution
    if (input.structuralColors && Object.keys(input.structuralColors).length > 0) {
      // Resolve tokens in structural colors
      const resolvedStructuralColors = replaceTokens(input.structuralColors, tokenResolver, input.dataColors);
      Object.assign(theme, resolvedStructuralColors);
    }
    
    // Apply custom text classes with token resolution
    if (input.textClasses && Object.keys(input.textClasses).length > 0) {
      const resolvedTextClasses = replaceTokens(input.textClasses, tokenResolver, input.dataColors);
      theme.textClasses = this.formatTextClasses(resolvedTextClasses);
    }
    
    // Apply visual styles with token resolution
    if (input.visualStyles && Object.keys(input.visualStyles).length > 0) {
      theme.visualStyles = replaceTokens(input.visualStyles, tokenResolver, input.dataColors);
      
      // Post-processing for Power BI schema quirks
      this.applyPowerBIQuirks(theme.visualStyles);
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
        
        // Map color property (already using correct name)
        if (classConfig.color) textClass.color = classConfig.color;
        if (classConfig.fontFace) textClass.fontFace = classConfig.fontFace;
        if (classConfig.fontSize) textClass.fontSize = classConfig.fontSize;
        if (classConfig.fontWeight) textClass.fontWeight = classConfig.fontWeight;
        
        formatted[className] = textClass;
      }
    }
    
    return formatted;
  }
  
  /**
   * Apply Power BI specific quirks and workarounds
   */
  private applyPowerBIQuirks(visualStyles: any): void {
    // Clean up all visual styles
    Object.keys(visualStyles).forEach(visualType => {
      const visual = visualStyles[visualType];
      
      Object.keys(visual || {}).forEach(variant => {
        const variantStyles = visual[variant];
        
        // Clean up empty objects in arrays (common in state-driven properties)
        Object.keys(variantStyles || {}).forEach(property => {
          if (Array.isArray(variantStyles[property])) {
            // Remove empty objects (objects with no meaningful content)
            variantStyles[property] = variantStyles[property].filter((item: any) => {
              if (!item || typeof item !== 'object') return false;
              const keys = Object.keys(item);
              
              // Empty object
              if (keys.length === 0) return false;
              
              // Object with only undefined/null/empty values
              const hasContent = keys.some(key => {
                const value = item[key];
                // Check for meaningful content (not undefined, null, or empty string)
                if (value === undefined || value === null || value === '') return false;
                // Check for empty nested objects/arrays
                if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false;
                if (Array.isArray(value) && value.length === 0) return false;
                return true;
              });
              
              return hasContent;
            });
            
            // If array is now empty, remove the property
            if (variantStyles[property].length === 0) {
              delete variantStyles[property];
            }
          }
        });
      });
    });
    
    // Handle advancedSlicerVisual specific quirks
    if (visualStyles.advancedSlicerVisual) {
      Object.keys(visualStyles.advancedSlicerVisual).forEach(variant => {
        const variantStyles = visualStyles.advancedSlicerVisual[variant];
        
        // shapeCustomRectangle - requires $id: 'default' (Power BI bug)
        if (variantStyles && variantStyles.shapeCustomRectangle) {
          // Ensure shapeCustomRectangle has $id: 'default' in first item
          if (Array.isArray(variantStyles.shapeCustomRectangle) && 
              variantStyles.shapeCustomRectangle.length > 0 && 
              !variantStyles.shapeCustomRectangle[0].$id) {
            variantStyles.shapeCustomRectangle[0] = {
              $id: 'default',
              ...variantStyles.shapeCustomRectangle[0]
            };
          }
        }
      });
    }
    
    // Add other Power BI quirks here as needed
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