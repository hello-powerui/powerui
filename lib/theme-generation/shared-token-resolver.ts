import { resolveToken } from './token-registry';
import { ColorPalettes } from '@/lib/types/color-palettes';

export interface TokenResolverOptions {
  name?: string;
  mode: 'light' | 'dark';
  palettes: ColorPalettes;
  dataColors?: string[];
  colors?: Record<string, string>;
  isPreview?: boolean;
}

/**
 * Creates a unified token resolver function that can be used by both
 * server-side and client-side theme generators
 */
export function createUnifiedTokenResolver(options: TokenResolverOptions) {
  const { name, mode, palettes, dataColors = [], colors = {}, isPreview = false } = options;
  
  return (token: string): any => {
    // 1. Try centralized token registry first
    const resolved = resolveToken(token, mode, palettes);
    if (resolved) return resolved;
    
    // 2. Direct color mappings (for server-side generator)
    if (colors[token]) return colors[token];
    
    // 3. Font tokens
    if (token.startsWith('font-')) {
      // Handle font defaults
      if (token === 'font-family-default') return 'Segoe UI';
      if (token === 'font-size-default') return '11px';
      return undefined;
    }
    
    // 4. Direct value tokens
    if (token === 'name') return isPreview ? 'Preview Theme' : (name || 'My Theme');
    if (token === 'background-transparency') return 0;
    if (token === 'foreground-transparency') return 0;
    if (token === 'background-color-code') return mode === 'light' ? '#FFFFFF' : '#212121';
    if (token === 'foreground-color-code') return mode === 'light' ? '#212121' : '#FFFFFF';
    
    // 5. Data colors (with array bounds checking)
    const dataColorMatch = token.match(/^dataColors\.(\d+)$/);
    if (dataColorMatch) {
      const index = parseInt(dataColorMatch[1]);
      if (index >= 0 && index < dataColors.length) {
        return dataColors[index];
      }
    }
    
    // 6. Fallback colors based on prefix
    const fallbacks: Record<string, string> = {
      'bg-': mode === 'light' ? '#FFFFFF' : '#212121',
      'text-': mode === 'light' ? '#212121' : '#F5F5F5',
      'border-': mode === 'light' ? '#E0E0E0' : '#424242',
      'foreground-': mode === 'light' ? '#212121' : '#F5F5F5',
      'data-': dataColors[0] || '#118DFF',
      'selection-': '#118DFF',
      'hover-': mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
      'disabled-': mode === 'light' ? '#CCCCCC' : '#666666'
    };
    
    for (const [prefix, fallback] of Object.entries(fallbacks)) {
      if (token.startsWith(prefix)) {
        return fallback;
      }
    }
    
    // No resolution found
    return undefined;
  };
}