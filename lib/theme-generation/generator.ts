import { 
  ThemeGenerationInput, 
  ThemeConfigs, 
  ColorPalette, 
  Palettes,
  StyleConfig 
} from './types';
import { 
  validateNeutralPalette, 
  updateThemePath, 
  getThemeValue, 
  replaceTokens 
} from './utils';
import { mapNeutralPaletteToTheme } from './neutral-mapper';

export class ThemeGenerator {
  private configs: ThemeConfigs;

  constructor(configs: ThemeConfigs) {
    this.configs = configs;
  }

  private createPaletteMapping(neutralPalette: string | ColorPalette): Record<string, ColorPalette> {
    return {
      base: this.configs.palettes.base,
      error: this.configs.palettes.error,
      success: this.configs.palettes.success,
      warning: this.configs.palettes.warning,
      neutral: typeof neutralPalette === 'string' 
        ? this.configs.palettes[neutralPalette] 
        : neutralPalette
    };
  }

  private resolveModeToken(token: string, neutralPalette: string | ColorPalette): any {
    if (!token.includes(':')) {
      return null;
    }

    const [tokenMode, baseToken] = token.split(':');
    if (!['dark', 'light'].includes(tokenMode)) {
      // For other modes, return the base token for further processing
      return baseToken;
    }

    const modeMappings = this.configs.elements[tokenMode as 'light' | 'dark'];
    if (!(baseToken in modeMappings)) {
      console.warn(`Unresolved mode-specific token: ${token}`);
      return `@${token}`;
    }

    const [palette, shade] = modeMappings[baseToken].split('-');
    const paletteMapping = this.createPaletteMapping(neutralPalette);
    
    if (palette in paletteMapping) {
      return paletteMapping[palette][shade];
    }

    console.warn(`Unresolved mode-specific token: ${token}`);
    return `@${token}`;
  }

  private resolveDirectToken(token: string, data: ThemeGenerationInput): any {
    const directMappings: Record<string, any> = {
      'name': data.name,
      'dataColors': data.dataColors,
      'border-radius': data.borderRadius,
      'padding': data.paddingStyle === 'large' ? 20 : 16
    };
    return directMappings[token];
  }

  private resolveFontToken(token: string, data: ThemeGenerationInput): any {
    if (token.startsWith('font-')) {
      const fontStyle = token.replace('font-', '');
      return this.configs.fonts[data.fontFamily]?.[fontStyle];
    }

    if (token in this.configs.font_sizes) {
      return this.configs.font_sizes[token];
    }

    return null;
  }

  private resolveColorToken(
    token: string, 
    tokenMappings: Record<string, string>, 
    neutralPalette: string | ColorPalette
  ): any {
    if (!(token in tokenMappings)) {
      return null;
    }

    const paletteRef = tokenMappings[token];
    const [palette, shade] = paletteRef.split('-');
    const paletteMapping = this.createPaletteMapping(neutralPalette);
    
    if (palette in paletteMapping) {
      return paletteMapping[palette][shade];
    }

    console.warn(`Unsupported palette: ${palette}`);
    return null;
  }

  private applyStyleConfig(
    theme: any,
    styleConfig: StyleConfig,
    styleName?: string,
    specialHandlers?: Record<string, (theme: any, path: string) => void>
  ): void {
    if (styleName) {
      console.info(`Applying ${styleName} style`);
    }

    specialHandlers = specialHandlers || {};

    for (const [token, paths] of Object.entries(styleConfig.styles)) {
      for (const path of paths) {
        if (token in specialHandlers) {
          specialHandlers[token](theme, path);
        } else {
          // Default: use token as value, convert to int if it's numeric
          // Token strings will be resolved later in the second pass
          const value = /^\d+$/.test(token) ? parseInt(token) : token;
          updateThemePath(theme, path, value);
        }
      }
    }
  }

  private handleBorderInheritBg(theme: any, path: string): void {
    const visualPath = path.replace('border[0].color.solid.color', 'background[0].color.solid.color');
    try {
      const bgValue = getThemeValue(theme, visualPath);
      updateThemePath(theme, path, bgValue);
    } catch (error) {
      console.error('Error getting background value:', error);
      throw error;
    }
  }

  private validateAndGetStyle(
    styleName: string,
    styleCategory: 'containerStyles' | 'borderStyles' | 'paddingStyles',
    defaultStyle: string = 'default'
  ): StyleConfig {
    const styles = this.configs.styles[styleCategory];
    if (!(styleName in styles)) {
      console.warn(`Invalid ${styleCategory.slice(0, -1)} style: ${styleName}, using ${defaultStyle}`);
      styleName = defaultStyle;
    }
    return styles[styleName];
  }

  private getFallbackColor(token: string, mode: 'light' | 'dark'): string {
    // Provide reasonable fallback colors when tokens can't be resolved
    const lightDefaults: Record<string, string> = {
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#F5F5F5',
      'bg-tertiary': '#E5E5E5',
      'bg-brand-primary': '#E6F3FF',
      'text-primary': '#1A1A1A',
      'text-secondary': '#4D4D4D',
      'text-tertiary': '#666666',
      'border-primary': '#CCCCCC',
      'border-secondary': '#E5E5E5',
      'fg-primary': '#1A1A1A',
      'fg-secondary': '#4D4D4D',
      'fg-brand-primary': '#0066CC',
      'fg-error-primary': '#DC2626',
      'fg-warning-primary': '#F59E0B',
      'fg-success-primary': '#10B981'
    };

    const darkDefaults: Record<string, string> = {
      'bg-primary': '#0D0D0D',
      'bg-secondary': '#1A1A1A',
      'bg-tertiary': '#2D2D2D',
      'bg-brand-primary': '#003366',
      'text-primary': '#F5F5F5',
      'text-secondary': '#CCCCCC',
      'text-tertiary': '#999999',
      'border-primary': '#4D4D4D',
      'border-secondary': '#333333',
      'fg-primary': '#FFFFFF',
      'fg-secondary': '#CCCCCC',
      'fg-brand-primary': '#3399FF',
      'fg-error-primary': '#EF4444',
      'fg-warning-primary': '#FCD34D',
      'fg-success-primary': '#34D399'
    };

    const defaults = mode === 'light' ? lightDefaults : darkDefaults;
    
    // Check for exact match
    if (token in defaults) {
      return defaults[token];
    }
    
    // Check for pattern match (e.g., bg-brand-solid, text-brand-secondary)
    for (const [key, value] of Object.entries(defaults)) {
      if (token.startsWith(key.split('-').slice(0, -1).join('-'))) {
        return value;
      }
    }
    
    // Ultimate fallbacks
    if (token.startsWith('bg-')) return mode === 'light' ? '#F5F5F5' : '#1A1A1A';
    if (token.startsWith('text-')) return mode === 'light' ? '#1A1A1A' : '#F5F5F5';
    if (token.startsWith('border-')) return mode === 'light' ? '#CCCCCC' : '#4D4D4D';
    if (token.startsWith('fg-')) return mode === 'light' ? '#1A1A1A' : '#FFFFFF';
    
    return mode === 'light' ? '#000000' : '#FFFFFF';
  }

  generate(data: ThemeGenerationInput): any {
    // Validate required fields
    const requiredFields: (keyof ThemeGenerationInput)[] = [
      'mode', 'neutralPalette', 'fontFamily', 'borderRadius', 'dataColors', 'name'
    ];
    const missing = requiredFields.filter(field => !(field in data));
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate neutral palette format
    const neutralPalette = data.neutralPalette;
    if (typeof neutralPalette === 'object' && !validateNeutralPalette(neutralPalette)) {
      throw new Error('Invalid neutral palette format');
    }

    // Get token mappings for selected mode
    const mode = data.mode.toLowerCase() as 'light' | 'dark';
    const tokenMappings = this.configs.elements[mode];

    const resolveToken = (token: string): any => {
      // Handle mode-specific tokens like @dark:bg-primary or @light:text-primary
      if (token.includes(':')) {
        const [specifiedMode, baseToken] = token.split(':');
        if (['dark', 'light'].includes(specifiedMode)) {
          // Use the specified mode's mappings instead of current mode
          const specificModeMappings = this.configs.elements[specifiedMode as 'light' | 'dark'];
          const result = this.resolveColorToken(baseToken, specificModeMappings, neutralPalette);
          if (result !== null) {
            return result;
          }
          // If not found in mappings, use fallback for the specified mode
          return this.getFallbackColor(baseToken, specifiedMode as 'light' | 'dark');
        }
      }
      
      // Try mode-specific tokens first
      let result = this.resolveModeToken(token, neutralPalette);
      if (result !== null) {
        if (typeof result === 'string' && !result.startsWith('@')) {
          if (!result.includes(':')) {
            // This is a base token to resolve recursively
            return resolveToken(result);
          }
          return result;
        }
      }

      // Try direct mappings
      result = this.resolveDirectToken(token, data);
      if (result !== null) {
        return result;
      }

      // Try font tokens
      result = this.resolveFontToken(token, data);
      if (result !== null) {
        return result;
      }

      // Try color tokens
      result = this.resolveColorToken(token, tokenMappings, neutralPalette);
      if (result !== null) {
        return result;
      }

      // Check if this is a color token that should be in tokenMappings
      const colorTokenPrefixes = ['bg-', 'text-', 'fg-', 'border-'];
      const isColorToken = colorTokenPrefixes.some(prefix => token.startsWith(prefix));
      
      if (isColorToken) {
        // Return a fallback color based on the token type and mode
        return this.getFallbackColor(token, mode);
      }

      // For any other unresolved token, return a visible fallback
      console.warn(`Unresolved token: ${token}`);
      return mode === 'light' ? '#FF00FF' : '#00FFFF'; // Magenta/Cyan to make it obvious
    };

    // Start with base theme
    const baseTheme = JSON.parse(JSON.stringify(this.configs.theme));
    
    // IMPORTANT: Remove any pre-existing visualStyles.*.* to avoid conflicts
    // The style system will recreate these with the correct tokens
    if (baseTheme.visualStyles?.['*']?.['*']) {
      delete baseTheme.visualStyles['*']['*'];
    }
    
    // Apply styles BEFORE any token resolution to ensure tokens are in place
    // Apply container style
    if (data.bgStyle) {
      const containerStyle = this.configs.styles.containerStyles[data.bgStyle];
      if (containerStyle) {
        this.applyStyleConfig(baseTheme, containerStyle, `container (${data.bgStyle})`);
      }
    }

    // Apply border styles with special inherit-bg handling
    const borderStyle = data.borderStyle || 'default';
    const borderConfig = this.validateAndGetStyle(borderStyle, 'borderStyles');
    const specialHandlers = {
      'inherit-bg': (theme: any, path: string) => this.handleBorderInheritBg(theme, path)
    };
    this.applyStyleConfig(baseTheme, borderConfig, `border (${borderStyle})`, specialHandlers);

    // Apply padding styles
    const paddingStyle = data.paddingStyle || 'default';
    const paddingConfig = this.validateAndGetStyle(paddingStyle, 'paddingStyles');
    this.applyStyleConfig(baseTheme, paddingConfig, `padding (${paddingStyle})`);
    
    // NOW resolve all tokens in one pass
    const finalTheme = replaceTokens(baseTheme, resolveToken, data.dataColors);
    

    // Ensure critical color properties are resolved
    const criticalColors = [
      'background', 'backgroundLight', 'backgroundNeutral',
      'foreground', 'foregroundNeutralSecondary', 'foregroundNeutralTertiary',
      'bad', 'good', 'neutral', 'center'
    ];
    
    // Re-add critical colors from base theme and resolve them
    for (const colorProp of criticalColors) {
      if (colorProp in this.configs.theme) {
        const baseValue = this.configs.theme[colorProp];
        if (typeof baseValue === 'string' && baseValue.startsWith('@')) {
          const tokenName = baseValue.slice(1);
          
          // Try to resolve the token directly from tokenMappings first
          let resolved: any = null;
          
          // Check if it's in tokenMappings
          if (tokenMappings && tokenName in tokenMappings) {
            const paletteRef = tokenMappings[tokenName];
            const [palette, shade] = paletteRef.split('-');
            const paletteMapping = this.createPaletteMapping(neutralPalette);
            
            if (palette in paletteMapping && shade in paletteMapping[palette]) {
              resolved = paletteMapping[palette][shade];
            }
          }
          
          // If not resolved, try the general resolver
          if (!resolved) {
            resolved = resolveToken(tokenName);
          }
          
          if (resolved && typeof resolved === 'string' && !resolved.startsWith('@')) {
            finalTheme[colorProp] = resolved;
          } else {
            // Set mode-appropriate fallback colors
            if (mode === 'dark') {
              finalTheme[colorProp] = colorProp.includes('background') ? '#1E1E1E' : '#FFFFFF';
            } else {
              finalTheme[colorProp] = colorProp.includes('background') ? '#FFFFFF' : '#000000';
            }
          }
        } else {
          finalTheme[colorProp] = baseValue;
        }
      }
    }

    // Add icons if available
    if (this.configs.icons && mode in this.configs.icons) {
      finalTheme.icons = this.configs.icons[mode];
    }

    // Apply neutral palette mapping for hierarchy colors
    const neutralPaletteData = typeof neutralPalette === 'string' 
      ? this.configs.palettes[neutralPalette] 
      : neutralPalette;
    
    if (neutralPaletteData) {
      const neutralMapping = mapNeutralPaletteToTheme(
        { 
          id: typeof neutralPalette === 'string' ? neutralPalette : 'custom',
          name: typeof neutralPalette === 'string' ? neutralPalette : 'Custom',
          shades: neutralPaletteData
        }, 
        mode
      );
      
      // Apply the mapped colors to the theme
      Object.assign(finalTheme, neutralMapping);
    }
    
    // Apply structural colors if provided (overrides neutral mapping)
    if (data.structuralColors) {
      const structuralColors = data.structuralColors;
      if (structuralColors.firstLevelElements) finalTheme.firstLevelElements = structuralColors.firstLevelElements;
      if (structuralColors.secondLevelElements) finalTheme.secondLevelElements = structuralColors.secondLevelElements;
      if (structuralColors.thirdLevelElements) finalTheme.thirdLevelElements = structuralColors.thirdLevelElements;
      if (structuralColors.fourthLevelElements) finalTheme.fourthLevelElements = structuralColors.fourthLevelElements;
      if (structuralColors.background) finalTheme.background = structuralColors.background;
      if (structuralColors.secondaryBackground) finalTheme.secondaryBackground = structuralColors.secondaryBackground;
      if (structuralColors.tableAccent) finalTheme.tableAccent = structuralColors.tableAccent;
    }
    
    // Apply text classes if provided
    if (data.textClasses) {
      finalTheme.textClasses = {};
      
      // Helper to create text class object
      const createTextClass = (textClass: any) => {
        const result: any = {};
        if (textClass.fontColor) result.color = textClass.fontColor;
        if (textClass.fontFace) result.fontFace = textClass.fontFace;
        if (textClass.fontSize) result.fontSize = textClass.fontSize;
        if (textClass.bold) result.bold = true;
        return result;
      };
      
      // Apply each text class if defined
      if (data.textClasses.callout) finalTheme.textClasses.callout = createTextClass(data.textClasses.callout);
      if (data.textClasses.header) finalTheme.textClasses.header = createTextClass(data.textClasses.header);
      if (data.textClasses.title) finalTheme.textClasses.title = createTextClass(data.textClasses.title);
      if (data.textClasses.largeTitle) finalTheme.textClasses.largeTitle = createTextClass(data.textClasses.largeTitle);
      if (data.textClasses.label) finalTheme.textClasses.label = createTextClass(data.textClasses.label);
      if (data.textClasses.semiboldLabel) finalTheme.textClasses.semiboldLabel = createTextClass(data.textClasses.semiboldLabel);
      if (data.textClasses.largeLabel) finalTheme.textClasses.largeLabel = createTextClass(data.textClasses.largeLabel);
      if (data.textClasses.smallLabel) finalTheme.textClasses.smallLabel = createTextClass(data.textClasses.smallLabel);
      if (data.textClasses.lightLabel) finalTheme.textClasses.lightLabel = createTextClass(data.textClasses.lightLabel);
      if (data.textClasses.boldLabel) finalTheme.textClasses.boldLabel = createTextClass(data.textClasses.boldLabel);
      if (data.textClasses.largeLightLabel) finalTheme.textClasses.largeLightLabel = createTextClass(data.textClasses.largeLightLabel);
      if (data.textClasses.smallLightLabel) finalTheme.textClasses.smallLightLabel = createTextClass(data.textClasses.smallLightLabel);
    }

    // Apply visual style overrides if provided
    if (data.visualStyles && Object.keys(data.visualStyles).length > 0) {
      if (!finalTheme.visualStyles) {
        finalTheme.visualStyles = {};
      }
      
      // Apply each visual's custom settings
      for (const [visualType, settings] of Object.entries(data.visualStyles)) {
        if (settings && Object.keys(settings).length > 0) {
          if (!finalTheme.visualStyles[visualType]) {
            finalTheme.visualStyles[visualType] = {};
          }
          
          // Check if settings already has the variant structure
          if (typeof settings === 'object' && !Array.isArray(settings)) {
            // If settings has keys like '*', 'minimal', etc., it's already in variant format
            const hasVariantStructure = Object.keys(settings).some(key => key === '*' || !key.startsWith('@'));
            
            if (hasVariantStructure) {
              // Settings already has variant structure, apply token resolution to each variant
              for (const [variant, variantSettings] of Object.entries(settings)) {
                const resolvedSettings = replaceTokens(variantSettings, resolveToken, data.dataColors);
                finalTheme.visualStyles[visualType][variant] = resolvedSettings;
              }
            } else {
              // Legacy format - wrap in default variant
              const resolvedSettings = replaceTokens(settings, resolveToken, data.dataColors);
              finalTheme.visualStyles[visualType]['*'] = resolvedSettings;
            }
          } else {
            // Legacy format - wrap in default variant
            const resolvedSettings = replaceTokens(settings, resolveToken, data.dataColors);
            finalTheme.visualStyles[visualType]['*'] = resolvedSettings;
          }
        }
      }
    }

    return finalTheme;
  }
}