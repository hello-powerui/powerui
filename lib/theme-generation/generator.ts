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

      // Return unresolved tokens for second pass
      if (token.startsWith('bg-') || token === 'border-primary') {
        return `@${token}`;
      }

      // Only warn for truly unresolved tokens, not those we expect to resolve later
      if (!token.startsWith('text-') && !token.startsWith('fg-')) {
        console.warn(`Unresolved token: ${token}`);
      }
      return `@${token}`;
    };

    // Start with base theme
    const theme = JSON.parse(JSON.stringify(this.configs.theme));
    

    // Apply container style
    if (data.bgStyle) {
      const containerStyle = this.configs.styles.containerStyles[data.bgStyle];
      if (containerStyle) {
        this.applyStyleConfig(theme, containerStyle, `container (${data.bgStyle})`);
      }
    }

    // Apply border styles with special inherit-bg handling
    const borderStyle = data.borderStyle || 'default';
    const borderConfig = this.validateAndGetStyle(borderStyle, 'borderStyles');
    const specialHandlers = {
      'inherit-bg': (theme: any, path: string) => this.handleBorderInheritBg(theme, path)
    };
    this.applyStyleConfig(theme, borderConfig, `border (${borderStyle})`, specialHandlers);

    // Apply padding styles
    const paddingStyle = data.paddingStyle || 'default';
    const paddingConfig = this.validateAndGetStyle(paddingStyle, 'paddingStyles');
    this.applyStyleConfig(theme, paddingConfig, `padding (${paddingStyle})`);

    // Resolve all tokens
    const finalTheme = replaceTokens(theme, resolveToken);
    

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

    return finalTheme;
  }
}