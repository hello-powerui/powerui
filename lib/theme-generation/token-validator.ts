import { TOKEN_REGISTRY } from './token-registry';

/**
 * Validates and sanitizes visual styles to ensure token references are valid
 */
export function validateVisualStyles(visualStyles: any): any {
  if (!visualStyles || typeof visualStyles !== 'object') {
    return {};
  }
  
  return validateObject(visualStyles);
}

function validateObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => validateObject(item));
  }
  
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  const validated: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a color property with a token reference
    if (key === 'color' && value && typeof value === 'object') {
      validated[key] = validateColorValue(value);
    } else if (value && typeof value === 'object' && 'solid' in value && value.solid && typeof value.solid === 'object' && 'color' in value.solid) {
      // Handle { solid: { color: "@token" } } structure
      validated[key] = validateColorValue(value);
    } else {
      // Recursively validate nested objects
      validated[key] = validateObject(value);
    }
  }
  
  return validated;
}

function validateColorValue(colorObj: any): any {
  // Handle { solid: { color: "@token" } } structure
  if (colorObj.solid?.color) {
    const colorValue = colorObj.solid.color;
    
    // Token reference
    if (typeof colorValue === 'string' && colorValue.startsWith('@')) {
      const isValid = TOKEN_REGISTRY[colorValue] !== undefined;
      if (!isValid) {
        
        // Replace with a fallback token
        return { solid: { color: '@text-primary' } };
      }
    }
    // Theme data color reference - valid
    else if (colorValue?.expr?.ThemeDataColor) {
      return colorObj;
    }
    // Hex color - validate format
    else if (typeof colorValue === 'string' && colorValue.startsWith('#')) {
      if (!/^#[0-9A-Fa-f]{6}$/.test(colorValue)) {
        
        return { solid: { color: '#000000' } };
      }
    }
  }
  
  return colorObj;
}

/**
 * Get a list of unknown tokens in visual styles
 */
export function findUnknownTokens(visualStyles: any): string[] {
  const unknownTokens = new Set<string>();
  
  function checkObject(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach(item => checkObject(item));
      return;
    }
    
    if (!obj || typeof obj !== 'object') {
      return;
    }
    
    for (const value of Object.values(obj)) {
      // Check for token in { solid: { color: "@token" } } structure
      if (value && typeof value === 'object') {
        const color = (value as any).solid?.color;
        if (typeof color === 'string' && color.startsWith('@')) {
          if (!TOKEN_REGISTRY[color]) {
            unknownTokens.add(color);
          }
        }
      }
      
      // Recurse into nested objects
      if (value && typeof value === 'object') {
        checkObject(value);
      }
    }
  }
  
  checkObject(visualStyles);
  return Array.from(unknownTokens);
}