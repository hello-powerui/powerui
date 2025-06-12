import { ThemeGenerationInput } from './types';
import { themeConfig, resolveColors, ColorPalettes } from './theme-config';
import { validateNeutralPalette, replaceTokens } from './utils';

export class SimpleThemeGenerator {
  private colors: Record<string, string> = {};
  
  generate(input: ThemeGenerationInput): any {
    // Validate input
    this.validateInput(input);
    
    // Prepare color palettes
    const palettes: ColorPalettes = {
      neutral: typeof input.neutralPalette === 'string' 
        ? this.getBuiltInNeutralPalette(input.neutralPalette)
        : input.neutralPalette,
      dataColors: input.dataColors
    };
    
    // Resolve all colors based on mode
    const colors = resolveColors(input.mode, palettes);
    this.colors = colors;
    
    // Get font configuration
    const fontConfig = themeConfig.fonts[input.fontFamily] || themeConfig.fonts['segoe-ui'];
    
    // Build the theme
    const theme = {
      name: input.name,
      dataColors: input.dataColors,
      
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
      
      // Text classes
      textClasses: this.generateTextClasses(colors, fontConfig),
      
      // Visual styles
      visualStyles: this.generateVisualStyles(input, colors, fontConfig)
    };
    
    // Apply custom text classes if provided
    if (input.textClasses && Object.keys(input.textClasses).length > 0) {
      Object.assign(theme.textClasses, this.formatTextClasses(input.textClasses));
    }
    
    // Apply custom visual styles if provided
    if (input.visualStyles && Object.keys(input.visualStyles).length > 0) {
      // Create token resolver
      const tokenResolver = this.createTokenResolver(input, colors);
      this.mergeVisualStyles(theme.visualStyles, input.visualStyles, tokenResolver, input.dataColors);
    }
    
    return theme;
  }
  
  private createTokenResolver(input: ThemeGenerationInput, colors: Record<string, string>) {
    return (token: string): any => {
      // Direct color mappings
      if (colors[token]) {
        return colors[token];
      }
      
      // Check for color token prefixes that might map differently
      const colorMappings: Record<string, string> = {
        'bg-primary': colors['background-primary'],
        'bg-secondary': colors['background-secondary'],
        'bg-tertiary': colors['background-tertiary'],
        'bg-active': colors['background-active'],
        'text-primary': colors['text-primary'],
        'text-secondary': colors['text-secondary'],
        'text-tertiary': colors['text-tertiary'],
        'border-primary': colors['border-primary'],
        'border-secondary': colors['border-secondary'],
        'border-tertiary': colors['border-tertiary'],
        'fg-error-primary': colors['error'],
        'fg-warning-primary': colors['warning'],
        'fg-success-primary': colors['success'],
      };
      
      if (colorMappings[token]) {
        return colorMappings[token];
      }
      
      // Check for font tokens
      const fontConfig = themeConfig.fonts[input.fontFamily] || themeConfig.fonts['segoe-ui'];
      if (token.startsWith('font-')) {
        const fontStyle = token.replace('font-', '');
        if (fontConfig[fontStyle]) {
          return fontConfig[fontStyle];
        }
      }
      
      // Check for font size tokens
      if (themeConfig.fontSizes[token]) {
        return themeConfig.fontSizes[token];
      }
      
      // Direct value tokens
      if (token === 'name') return input.name;
      if (token === 'dataColors') return input.dataColors;
      if (token === 'border-radius') return input.borderRadius;
      if (token === 'padding') return input.paddingStyle === 'large' ? 20 : 16;
      
      // Only warn in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Token not resolved: ${token}`);
      }
      
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
    
    // Validate neutral palette if it's an object
    if (typeof input.neutralPalette === 'object' && !validateNeutralPalette(input.neutralPalette)) {
      throw new Error('Invalid neutral palette format');
    }
  }
  
  private getBuiltInNeutralPalette(name: string): any {
    // For now, return a default palette
    // In a real implementation, this would load from a built-in set
    return {
      '25': '#FBFDFF',
      '50': '#F5FAFF',
      '100': '#E6F3FF',
      '200': '#C2E4FF',
      '300': '#8CC7FF',
      '400': '#4DA6FF',
      '500': '#1A82E2',
      '600': '#0059CC',
      '700': '#003A8C',
      '800': '#00265E',
      '900': '#001A40',
      '950': '#001333'
    };
  }
  
  private generateTextClasses(colors: Record<string, string>, fontConfig: any): any {
    return {
      callout: {
        color: colors['text-primary'],
        fontFace: fontConfig.regular,
        fontSize: themeConfig.fontSizes['text-sm']
      },
      title: {
        color: colors['text-primary'],
        fontFace: fontConfig.regular,
        fontSize: themeConfig.fontSizes['text-sm']
      },
      header: {
        color: colors['text-primary'],
        fontFace: fontConfig.semibold,
        fontSize: themeConfig.fontSizes['text-md']
      },
      label: {
        color: colors['text-secondary'],
        fontFace: fontConfig.regular,
        fontSize: themeConfig.fontSizes['text-xs']
      }
    };
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
  
  private generateVisualStyles(
    input: ThemeGenerationInput,
    colors: Record<string, string>,
    fontConfig: any
  ): any {
    const { borderRadius, borderStyle = 'default', paddingStyle = 'default' } = input;
    const padding = paddingStyle === 'large' ? 20 : 16;
    const showBorder = borderStyle !== 'none';
    const borderColor = borderStyle === 'subtle' 
      ? colors['border-tertiary'] 
      : colors['border-primary'];
    
    // Global visual styles that apply to all visuals
    const globalStyles = {
      // Apply default backgrounds for canvas elements if not overridden
      // These will be merged with any custom settings from input.visualStyles
      ...(input.mode === 'dark' && {
        report: {
          '*': {
            background: [
              {
                color: {
                  solid: {
                    color: colors['background-primary']
                  }
                }
              }
            ]
          }
        },
        page: {
          '*': {
            background: [
              {
                color: {
                  solid: {
                    color: colors['background-secondary']
                  }
                }
              }
            ]
          }
        },
        filter: {
          '*': {
            background: [
              {
                color: {
                  solid: {
                    color: colors['background-primary']
                  }
                }
              }
            ]
          }
        }
      }),
      
      // Global visual styles
      '*': {
        '*': {
          // Array structure for Power BI
          '*': [
            {
              customizeSpacing: true,
              spaceBelowTitle: 4,
              spaceBelowSubTitle: 4
            },
            {
              top: padding,
              right: padding,
              bottom: padding,
              left: padding
            }
          ],
          background: [
            {
              show: true,
              color: {
                solid: {
                  color: colors['background-primary']
                }
              }
            }
          ],
          border: [
            {
              show: showBorder,
              color: {
                solid: {
                  color: borderColor
                }
              },
              radius: borderRadius
            }
          ],
          title: [
            {
              show: true,
              fontColor: {
                solid: {
                  color: colors['text-primary']
                }
              },
              fontFamily: fontConfig.semibold,
              fontSize: themeConfig.fontSizes['text-md'],
              bold: false,
              titleWrap: true
            }
          ],
          subTitle: [
            {
              show: true,
              fontColor: {
                solid: {
                  color: colors['text-secondary']
                }
              },
              fontFamily: fontConfig.regular,
              fontSize: themeConfig.fontSizes['text-sm'],
              titleWrap: true
            }
          ],
          divider: [
            {
              show: false,
              color: {
                solid: {
                  color: colors['border-secondary']
                }
              },
              style: 'dashed',
              ignorePadding: false
            }
          ],
          // Common chart properties
          categoryAxis: [
            {
              show: true,
              labelColor: {
                solid: {
                  color: colors['chart-axis-text']
                }
              },
              fontFamily: fontConfig.regular,
              fontSize: themeConfig.fontSizes['text-xs'],
              gridlineShow: false,
              gridlineColor: {
                solid: {
                  color: colors['chart-gridline']
                }
              },
              gridlineStyle: 'solid',
              gridlineThickness: 1,
              showAxisTitle: false
            }
          ],
          valueAxis: [
            {
              show: true,
              labelColor: {
                solid: {
                  color: colors['chart-axis-text']
                }
              },
              fontFamily: fontConfig.regular,
              fontSize: themeConfig.fontSizes['text-xs'],
              gridlineShow: true,
              gridlineColor: {
                solid: {
                  color: colors['chart-gridline']
                }
              },
              gridlineStyle: 'solid',
              gridlineThickness: 1,
              showAxisTitle: false
            }
          ],
          visualTooltip: [
            {
              show: true,
              background: {
                solid: {
                  color: colors['tooltip-background']
                }
              },
              titleFontColor: {
                solid: {
                  color: colors['tooltip-text']
                }
              },
              valueFontColor: {
                solid: {
                  color: colors['tooltip-text']
                }
              },
              fontSize: themeConfig.fontSizes['text-xs']
            }
          ]
        }
      }
    };
    
    // Specific visual overrides
    const visualOverrides = {
      // Table styling
      tableEx: {
        '*': {
          columnHeaders: [
            {
              fontColor: {
                solid: {
                  color: colors['table-header-text']
                }
              },
              backColor: {
                solid: {
                  color: colors['table-header-bg']
                }
              },
              outline: 'BottomOnly',
              outlineColor: {
                solid: {
                  color: colors['border-secondary']
                }
              }
            }
          ],
          values: [
            {
              fontColor: {
                solid: {
                  color: colors['text-primary']
                }
              },
              backColor: {
                solid: {
                  color: colors['background-primary']
                }
              },
              backColorPrimary: {
                solid: {
                  color: colors['background-primary']
                }
              },
              backColorSecondary: {
                solid: {
                  color: colors['table-row-alt']
                }
              }
            }
          ],
          grid: [
            {
              gridHorizontal: true,
              gridHorizontalColor: {
                solid: {
                  color: colors['table-gridline']
                }
              },
              gridHorizontalWeight: 1,
              rowPadding: 4
            }
          ],
          total: [
            {
              fontColor: {
                solid: {
                  color: colors['text-primary']
                }
              },
              backColor: {
                solid: {
                  color: colors['table-total-bg']
                }
              },
              outline: 'TopOnly',
              outlineColor: {
                solid: {
                  color: colors['border-secondary']
                }
              }
            }
          ]
        }
      },
      
      // Card styling
      card: {
        '*': {
          background: [
            {
              show: true,
              color: {
                solid: {
                  color: colors['card-background']
                }
              }
            }
          ],
          border: [
            {
              show: showBorder,
              color: {
                solid: {
                  color: colors['card-border']
                }
              },
              radius: borderRadius
            }
          ]
        }
      },
      
      // Slicer specific styling
      slicer: {
        '*': {
          background: [{ show: false }],
          border: [{ show: false }],
          header: [
            {
              show: true,
              fontColor: {
                solid: {
                  color: colors['text-primary']
                }
              }
            }
          ],
          items: [
            {
              fontColor: {
                solid: {
                  color: colors['text-primary']
                }
              },
              background: {
                solid: {
                  color: colors['background-primary']
                }
              }
            }
          ]
        }
      },
      
      // Page background
      page: {
        '*': {
          background: [
            {
              show: true,
              color: {
                solid: {
                  color: colors['background-secondary']
                }
              }
            }
          ]
        }
      }
    };
    
    // Merge global and specific styles
    return { ...globalStyles, ...visualOverrides };
  }
  
  private mergeVisualStyles(target: any, source: any, tokenResolver: (token: string) => any, dataColors?: string[]): void {
    // First resolve tokens in the source
    const resolvedSource = replaceTokens(source, tokenResolver, dataColors);
    
    for (const [visualType, visualConfig] of Object.entries(resolvedSource)) {
      if (!target[visualType]) {
        target[visualType] = {};
      }
      
      // Handle variant structure
      if (typeof visualConfig === 'object' && visualConfig !== null) {
        // Check if this has variant structure (keys like '*', 'minimal', etc.)
        const hasVariantStructure = Object.keys(visualConfig).some(
          key => key === '*' || !key.includes('.')
        );
        
        if (hasVariantStructure) {
          // Process each variant
          for (const [variant, variantConfig] of Object.entries(visualConfig)) {
            if (!target[visualType][variant]) {
              target[visualType][variant] = {};
            }
            
            // Deep merge the variant configuration
            this.deepMerge(target[visualType][variant], variantConfig);
          }
        } else {
          // Legacy structure - treat as default variant
          if (!target[visualType]['*']) {
            target[visualType]['*'] = {};
          }
          this.deepMerge(target[visualType]['*'], visualConfig);
        }
      }
    }
  }
  
  private deepMerge(target: any, source: any): any {
    if (!source) return target;
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          this.deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    
    return target;
  }
}