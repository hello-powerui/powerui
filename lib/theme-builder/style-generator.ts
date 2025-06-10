import { ThemeGenerationInput, FillDefinition, Spacing } from '@/lib/theme-generation/types';

/**
 * Converts theme properties to CSS variables and style objects
 */
export class StyleGenerator {
  /**
   * Generate CSS variables from theme
   */
  static generateCSSVariables(theme: ThemeGenerationInput): Record<string, string> {
    const variables: Record<string, string> = {};
    
    // Data colors
    theme.dataColors.forEach((color, index) => {
      variables[`--theme-color${index + 1}`] = color;
    });
    
    // Font properties
    variables['--font-family'] = this.getFontFamilyValue(theme.fontFamily);
    variables['--font-size'] = `${theme.fontSize || 14}px`;
    variables['--font-weight'] = theme.fontWeight || 'normal';
    variables['--font-style'] = theme.fontStyle || 'normal';
    variables['--text-decoration'] = theme.textDecoration || 'none';
    variables['--line-height'] = String(theme.lineHeight || 1.5);
    
    // Border radius
    variables['--border-radius'] = `${theme.borderRadius}px`;
    
    // Colors from fill definitions
    if (theme.background?.solid?.color) {
      variables['--bg-custom'] = theme.background.solid.color;
    }
    if (theme.foreground?.solid?.color) {
      variables['--fg-custom'] = theme.foreground.solid.color;
    }
    if (theme.border?.solid?.color) {
      variables['--border-custom'] = theme.border.solid.color;
    }
    
    // Padding
    if (theme.padding) {
      variables['--padding-top'] = `${theme.padding.top || 16}px`;
      variables['--padding-right'] = `${theme.padding.right || 16}px`;
      variables['--padding-bottom'] = `${theme.padding.bottom || 16}px`;
      variables['--padding-left'] = `${theme.padding.left || 16}px`;
    }
    
    // Spacing
    variables['--spacing'] = `${theme.spacing || 8}px`;
    
    // Shadow - removed for cleaner appearance
    // if (theme.shadow) {
    //   const shadow = theme.shadow;
    //   const angle = (shadow.angle || 45) * Math.PI / 180;
    //   const x = Math.cos(angle) * (shadow.distance || 2);
    //   const y = Math.sin(angle) * (shadow.distance || 2);
    //   const color = this.hexToRgba(shadow.color || '#000000', 1 - (shadow.transparency || 0.1));
    //   
    //   variables['--shadow'] = `${x}px ${y}px ${shadow.blur || 4}px ${color}`;
    // }
    variables['--shadow'] = 'none';
    
    return variables;
  }
  
  /**
   * Generate style object from theme
   */
  static generateStyleObject(theme: ThemeGenerationInput, visualType?: string): React.CSSProperties {
    const styles: React.CSSProperties = {};
    
    // Get visual-specific overrides if available
    const visualOverrides = visualType && theme.visualStyles?.[visualType];
    
    // Typography
    styles.fontFamily = 'var(--font-family)';
    styles.fontSize = visualOverrides?.fontSize ? `${visualOverrides.fontSize}px` : 'var(--font-size)';
    styles.fontWeight = visualOverrides?.fontWeight || 'var(--font-weight)';
    styles.fontStyle = visualOverrides?.fontStyle || 'var(--font-style)';
    styles.textDecoration = 'var(--text-decoration)';
    styles.lineHeight = 'var(--line-height)';
    
    // Colors
    const background = visualOverrides?.background || theme.background;
    const foreground = visualOverrides?.foreground || theme.foreground;
    const border = visualOverrides?.border || theme.border;
    
    if (background?.solid?.color) {
      styles.backgroundColor = background.solid.color;
    } else {
      styles.backgroundColor = 'var(--bg-primary)';
    }
    
    if (foreground?.solid?.color) {
      styles.color = foreground.solid.color;
    } else {
      styles.color = 'var(--text-primary)';
    }
    
    // Border
    if (theme.showBorders !== false) {
      styles.border = `var(--border-width, 1px) solid var(--visual-border, var(--border-primary))`;
    } else {
      styles.border = 'none';
    }
    
    // Border radius
    styles.borderRadius = 'var(--border-radius)';
    
    // Padding
    styles.padding = 'var(--padding)';
    
    // Shadow - removed for cleaner appearance
    // if (theme.shadow && !theme.mode?.includes('dark')) {
    //   styles.boxShadow = 'var(--shadow)';
    // }
    
    return styles;
  }
  
  /**
   * Get font family CSS value
   */
  private static getFontFamilyValue(fontFamily: string): string {
    const fontMap: Record<string, string> = {
      'segoe-ui': '"Segoe UI", system-ui, sans-serif',
      'arial': 'Arial, system-ui, sans-serif',
      'calibri': 'Calibri, system-ui, sans-serif',
      'candara': 'Candara, system-ui, sans-serif',
      'corbel': 'Corbel, system-ui, sans-serif',
      'tahoma': 'Tahoma, system-ui, sans-serif',
      'trebuchet': '"Trebuchet MS", system-ui, sans-serif',
      'public-sans': '"Public Sans", system-ui, sans-serif',
      'space-grotesk': '"Space Grotesk", system-ui, sans-serif',
      'inter': '"Inter", system-ui, sans-serif',
    };
    
    return fontMap[fontFamily] || fontMap['segoe-ui'];
  }
  
  /**
   * Convert hex color to rgba
   */
  private static hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  /**
   * Get neutral palette CSS variables based on selection
   */
  static getNeutralPaletteVariables(neutralPalette: string | Record<string, string>): Record<string, string> {
    const variables: Record<string, string> = {};
    
    if (typeof neutralPalette === 'string') {
      // Load palette colors from palettes data
      const palettes = require('@/public/theme-data/palettes.json');
      const palette = palettes[neutralPalette];
      
      if (palette) {
        Object.entries(palette).forEach(([shade, color]) => {
          variables[`--neutral-${shade}`] = color as string;
        });
      }
    } else if (typeof neutralPalette === 'object') {
      // Custom neutral palette
      Object.entries(neutralPalette).forEach(([shade, color]) => {
        variables[`--neutral-${shade}`] = color;
      });
    }
    
    return variables;
  }
  
  /**
   * Get style preset CSS classes
   */
  static getStylePresetClasses(theme: ThemeGenerationInput): string[] {
    const classes: string[] = [];
    
    // Mode
    if (theme.mode === 'dark') {
      classes.push('dark');
    }
    
    // Neutral palette
    if (typeof theme.neutralPalette === 'string') {
      classes.push(theme.neutralPalette);
    }
    
    // Background style
    if (theme.bgStyle && theme.bgStyle !== 'default') {
      classes.push(`${theme.bgStyle}-contrast`);
    }
    
    // Border style
    if (theme.borderStyle) {
      classes.push(`border-style-${theme.borderStyle}`);
    }
    
    // Padding style
    if (theme.paddingStyle) {
      classes.push(`padding-style-${theme.paddingStyle}`);
    }
    
    // Border visibility
    if (!theme.showBorders) {
      classes.push('borders-hidden');
    }
    
    return classes;
  }
}