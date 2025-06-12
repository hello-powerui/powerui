import { ColorPalette } from './types';

export function validateNeutralPalette(palette: any): palette is ColorPalette {
  const requiredShades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  // Check if it's an object
  if (typeof palette !== 'object' || palette === null) {
    return false;
  }
  
  // Check all required shades exist
  const missing = requiredShades.filter(shade => !(shade in palette));
  if (missing.length > 0) {
    console.error(`Neutral palette missing required shades: ${missing.join(', ')}`);
    return false;
  }
  
  // Validate hex codes
  for (const [shade, color] of Object.entries(palette)) {
    if (typeof color !== 'string' || !color.startsWith('#') || (color.length !== 4 && color.length !== 7)) {
      console.error(`Invalid hex code for shade ${shade}: ${color}`);
      return false;
    }
  }
  
  return true;
}

export function parsePath(path: string): Array<{ name: string; index?: number }> {
  return path.split('.').map(part => {
    if (part.includes('[') && part.includes(']')) {
      const [name, indexPart] = part.split('[');
      const index = parseInt(indexPart.split(']')[0]);
      return { name, index };
    }
    return { name: part };
  });
}

export function updateThemePath(theme: any, path: string, value: any): void {
  try {
    let current = theme;
    const parts = parsePath(path);
    
    // Handle all parts except the last
    for (let i = 0; i < parts.length - 1; i++) {
      const { name, index } = parts[i];
      if (index !== undefined) {
        if (!current[name]) {
          current[name] = [];
        }
        while (current[name].length <= index) {
          // For Power BI theme arrays, index 0 should have metadata
          if (current[name].length === 0 && (name === 'background' || name === 'border' || name === 'padding')) {
            current[name].push({ show: true });
          } else {
            current[name].push({});
          }
        }
        current = current[name][index];
      } else {
        if (!current[name]) {
          current[name] = {};
        }
        current = current[name];
      }
    }
    
    // Handle the final part
    const last = parts[parts.length - 1];
    if (last.index !== undefined) {
      if (!current[last.name]) {
        current[last.name] = [];
      }
      while (current[last.name].length <= last.index) {
        // For Power BI theme arrays, index 0 should have metadata
        if (current[last.name].length === 0 && (last.name === 'background' || last.name === 'border' || last.name === 'padding')) {
          current[last.name].push({ show: true });
        } else {
          current[last.name].push({});
        }
      }
      current[last.name][last.index] = value;
    } else {
      current[last.name] = value;
    }
  } catch (error) {
    console.error(`Error updating path ${path}:`, error);
  }
}

export function getThemeValue(theme: any, path: string): any {
  try {
    let current = theme;
    const parts = parsePath(path);
    
    for (const { name, index } of parts) {
      if (index !== undefined) {
        current = current[name][index];
      } else {
        current = current[name];
      }
    }
    return current;
  } catch (error) {
    console.error(`Error getting value at path ${path}:`, error);
    return null;
  }
}

export function replaceTokens(
  obj: any, 
  tokenResolver: (token: string) => any,
  dataColors?: string[]
): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(item => replaceTokens(item, tokenResolver, dataColors));
    } else {
      // Check if this is a color object with solid.color structure
      if (obj.solid?.color) {
        const colorValue = obj.solid.color;
        
        // Handle token references
        if (typeof colorValue === 'string' && colorValue.startsWith('@')) {
          const resolved = tokenResolver(colorValue.slice(1));
          return { solid: { color: resolved } };
        }
        
        // Handle theme data color references
        if (colorValue?.expr?.ThemeDataColor && dataColors) {
          const resolved = resolveThemeDataColor(colorValue, dataColors);
          if (resolved) {
            return { solid: { color: resolved } };
          }
        }
      }
      
      // Check if this is a ThemeDataColor expression at the current level
      if (obj.expr?.ThemeDataColor && dataColors) {
        const resolved = resolveThemeDataColor(obj, dataColors);
        if (resolved) {
          return resolved;
        }
      }
      
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const replaced = replaceTokens(value, tokenResolver, dataColors);
        // Always add the property, even if null/undefined
        // This preserves the structure of the theme
        result[key] = replaced;
      }
      return result;
    }
  } else if (typeof obj === 'string' && obj.startsWith('@')) {
    const resolved = tokenResolver(obj.slice(1));
    // Always return the resolved value, even if null
    // The token resolver should always return a valid color or null
    return resolved;
  }
  return obj;
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToHex(h: number, s: number, l: number): string {
  // Convert percentages to decimals
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  
  // Convert to 0-255 range
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  // Convert to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function adjustColorBrightness(hex: string, percent: number): string {
  // Convert hex to HSL
  const hsl = hexToHSL(hex);
  
  // Adjust lightness based on percentage
  // Negative percent darkens, positive lightens
  let newL = hsl.l + (hsl.l * percent);
  newL = Math.max(0, Math.min(100, newL)); // Clamp between 0 and 100
  
  // Convert back to hex
  return hslToHex(hsl.h, hsl.s, newL);
}

export function resolveThemeDataColor(
  expression: any,
  dataColors: string[]
): string | null {
  // Handle ThemeDataColor expressions
  if (expression?.expr?.ThemeDataColor) {
    const { ColorId, Percent } = expression.expr.ThemeDataColor;
    
    // ColorId is 0-indexed in the dataColors array
    if (ColorId >= 0 && ColorId < dataColors.length) {
      const baseColor = dataColors[ColorId];
      
      // If there's a percentage adjustment, apply it
      if (Percent !== undefined && Percent !== 0) {
        return adjustColorBrightness(baseColor, Percent);
      }
      
      return baseColor;
    }
  }
  
  return null;
}