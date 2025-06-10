'use client';

import React, { useMemo, useEffect, ReactNode } from 'react';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';
import { StyleGenerator } from '@/lib/theme-builder/style-generator';

// Font stack mappings for better cross-platform support
const fontStacks: Record<string, string> = {
  'segoe-ui': '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif',
  'inter': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  'arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  'calibri': 'Calibri, "Carlito", "Segoe UI", Arial, sans-serif',
  'tahoma': 'Tahoma, Geneva, Verdana, sans-serif',
  'verdana': 'Verdana, Geneva, Tahoma, sans-serif',
  'trebuchet': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
  'public-sans': '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  'hubot-sans': '"Hubot Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  'space-grotesk': '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
  'cormorant': '"Cormorant Unicase", Georgia, serif',
  'candara': 'Candara, Calibri, "Segoe UI", Arial, sans-serif',
  'corbel': 'Corbel, "Lucida Grande", "Lucida Sans Unicode", sans-serif',
};

function getFontStack(fontFamily: string): string {
  return fontStacks[fontFamily] || fontStacks['segoe-ui'];
}

interface ThemePreviewWrapperProps {
  theme: ThemeGenerationInput;
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component that provides scoped theme styles to preview components
 */
export function ThemePreviewWrapper({ theme, children, className = '' }: ThemePreviewWrapperProps) {
  // Generate CSS variables from theme
  const cssVariables = useMemo(() => {
    const baseVariables = StyleGenerator.generateCSSVariables(theme);
    const neutralVariables = StyleGenerator.getNeutralPaletteVariables(theme.neutralPalette);
    
    // Add theme color variables for data series
    const themeColorVariables: Record<string, string> = {};
    if (theme.dataColors && theme.dataColors.length > 0) {
      theme.dataColors.forEach((color, index) => {
        themeColorVariables[`--theme-color${index + 1}`] = color;
      });
    }
    
    // Add color mode specific variables
    const colorVariables: Record<string, string> = {
      '--text-primary': theme.mode === 'dark' ? 'var(--neutral-50)' : 'var(--neutral-900)',
      '--text-secondary': theme.mode === 'dark' ? 'var(--neutral-300)' : 'var(--neutral-700)',
      '--text-tertiary': theme.mode === 'dark' ? 'var(--neutral-400)' : 'var(--neutral-600)',
      
      '--bg-primary': theme.mode === 'dark' ? 'var(--neutral-950)' : '#FFFFFF',
      '--bg-primary_alt': theme.mode === 'dark' ? 'var(--neutral-900)' : 'var(--neutral-25)',
      '--bg-secondary': theme.mode === 'dark' ? 'var(--neutral-800)' : 'var(--neutral-50)',
      
      '--border-primary': theme.mode === 'dark' ? 'var(--neutral-700)' : 'var(--neutral-300)',
      '--border-secondary': theme.mode === 'dark' ? 'var(--neutral-800)' : 'var(--neutral-200)',
      '--border-tertiary': theme.mode === 'dark' ? 'var(--neutral-800)' : 'var(--neutral-100)',
      
      '--base-white': '#FFFFFF',
      '--base-black': '#000000',
      '--padding': theme.paddingStyle === 'large' ? '20px' : '16px',
      '--radius': `${theme.borderRadius || 4}px`,
      '--shadow': 'none', // Clean appearance without shadows
      '--font-family': getFontStack(theme.fontFamily || 'segoe-ui'),
    };
    
    // Handle background style variations
    if (theme.bgStyle === 'subtle-contrast') {
      colorVariables['--canvas-bg'] = 'var(--bg-secondary)';
      colorVariables['--visual-bg'] = 'var(--bg-primary)';
    } else if (theme.bgStyle === 'inversed-contrast') {
      colorVariables['--canvas-bg'] = 'var(--bg-primary)';
      colorVariables['--visual-bg'] = 'var(--bg-secondary)';
    } else {
      // Default style
      colorVariables['--visual-bg'] = 'var(--bg-primary)';
      colorVariables['--canvas-bg'] = 'var(--bg-primary_alt)';
    }
    
    // Handle border visibility
    if (!theme.showBorders || theme.borderStyle === 'none') {
      colorVariables['--visual-border'] = 'transparent';
    } else if (theme.borderStyle === 'subtle') {
      colorVariables['--visual-border'] = 'var(--border-tertiary)';
    } else {
      colorVariables['--visual-border'] = 'var(--border-primary)';
    }
    
    return {
      ...baseVariables,
      ...neutralVariables,
      ...themeColorVariables,
      ...colorVariables,
    };
  }, [theme]);
  
  // Generate data attributes for style variations
  const dataAttributes = useMemo(() => {
    const attrs: Record<string, string> = {
      'data-theme-mode': theme.mode,
      'data-bg-style': theme.bgStyle || 'default',
      'data-border-style': theme.borderStyle || 'default',
      'data-padding-style': theme.paddingStyle || 'default',
      'data-font-family': theme.fontFamily,
    };
    
    if (typeof theme.neutralPalette === 'string') {
      attrs['data-neutral-palette'] = theme.neutralPalette;
    } else {
      attrs['data-neutral-palette'] = 'custom';
    }
    
    if (!theme.showBorders) {
      attrs['data-borders'] = 'hidden';
    }
    
    return attrs;
  }, [theme]);
  
  // Generate CSS classes from theme
  const themeClasses = useMemo(() => {
    return StyleGenerator.getStylePresetClasses(theme).join(' ');
  }, [theme]);
  
  // Generate unique wrapper ID for this instance
  // Use a stable ID based on theme properties to avoid hydration mismatches
  const wrapperId = useMemo(() => {
    const themeHash = `${theme.name}-${theme.mode}-${theme.fontFamily}`.replace(/\s+/g, '-').toLowerCase();
    return `theme-preview-${themeHash}`;
  }, [theme.name, theme.mode, theme.fontFamily]);
  
  // Inject CSS variables into a style tag
  useEffect(() => {
    const styleId = `theme-preview-style-${wrapperId}`;
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    
    // Create CSS text with variables scoped to this preview wrapper
    const cssText = `
      #${wrapperId} {
        ${Object.entries(cssVariables)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
      
      /* Apply mode-specific styles */
      #${wrapperId}.dark {
        color-scheme: dark;
      }
      
      
      /* Apply border styles */
      #${wrapperId}[data-border-style="none"],
      #${wrapperId}[data-borders="hidden"] {
        --visual-border: transparent;
      }
      
      #${wrapperId}[data-border-style="subtle"] {
        --visual-border: var(--border-tertiary);
      }
      
      /* Apply padding styles */
      #${wrapperId}[data-padding-style="large"] {
        --padding: 20px;
      }
    `;
    
    styleTag.textContent = cssText;
    
    return () => {
      // Clean up on unmount
      if (styleTag && styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }
    };
  }, [cssVariables, wrapperId]);
  
  return (
    <div 
      id={wrapperId}
      className={`theme-preview-wrapper ${themeClasses} ${className} ${theme.mode === 'dark' ? 'dark' : ''}`}
      style={{
        fontFamily: 'var(--font-family)',
        color: 'var(--text-primary)',
        position: 'relative',
        containerType: 'inline-size',
      }}
      {...dataAttributes}
    >
      {children}
    </div>
  );
}