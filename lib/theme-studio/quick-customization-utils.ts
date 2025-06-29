/**
 * Utilities for syncing quick customizations with visual styles
 */

// Quick customization value mappings
export const QUICK_CUSTOMIZATION_VALUES = {
  padding: {
    small: 12,
    medium: 16,
    large: 20
  },
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 12
  }
};

/**
 * Detects which quick customization values are currently applied in visual styles
 */
export function detectQuickCustomizationsFromVisualStyles(visualStyles: Record<string, any>) {
  const detectedCustomizations: {
    paddingStyle?: 'small' | 'medium' | 'large';
    borderRadius?: 'none' | 'small' | 'medium' | 'large';
    borderStyle?: 'default' | 'subtle' | 'none';
    backgroundStyle?: 'default' | 'subtle' | 'inversed';
  } = {};
  
  // Check padding
  const globalPadding = visualStyles?.['*']?.['*']?.padding?.[0];
  if (globalPadding?.show && 
      globalPadding.top === globalPadding.bottom && 
      globalPadding.left === globalPadding.right &&
      globalPadding.top === globalPadding.left) {
    // All padding values are equal, check if it matches a preset
    const paddingValue = globalPadding.top;
    for (const [key, value] of Object.entries(QUICK_CUSTOMIZATION_VALUES.padding)) {
      if (value === paddingValue) {
        detectedCustomizations.paddingStyle = key as 'small' | 'medium' | 'large';
        break;
      }
    }
  }
  
  // Check border radius
  const globalBorder = visualStyles?.['*']?.['*']?.border?.[0];
  if (globalBorder?.show && globalBorder.radius !== undefined) {
    for (const [key, value] of Object.entries(QUICK_CUSTOMIZATION_VALUES.borderRadius)) {
      if (value === globalBorder.radius) {
        detectedCustomizations.borderRadius = key as 'none' | 'small' | 'medium' | 'large';
        break;
      }
    }
  }
  
  // Check border style
  if (globalBorder?.show && globalBorder.color?.solid?.color) {
    const borderColor = globalBorder.color.solid.color;
    if (borderColor === '@border-primary') {
      detectedCustomizations.borderStyle = 'default';
    } else if (borderColor === '@border-secondary') {
      detectedCustomizations.borderStyle = 'subtle';
    } else if (borderColor === visualStyles?.['*']?.['*']?.background?.[0]?.color?.solid?.color) {
      detectedCustomizations.borderStyle = 'none';
    }
  }
  
  // Check background style
  const globalBackground = visualStyles?.['*']?.['*']?.background?.[0];
  const pageBackground = visualStyles?.page?.['*']?.background?.[0];
  
  if (globalBackground?.show && globalBackground.color?.solid?.color && 
      pageBackground?.color?.solid?.color) {
    const visualBg = globalBackground.color.solid.color;
    const canvasBg = pageBackground.color.solid.color;
    
    if (visualBg === '@bg-primary' && canvasBg === '@bg-primary') {
      detectedCustomizations.backgroundStyle = 'default';
    } else if (visualBg === '@bg-primary' && canvasBg === '@bg-secondary') {
      detectedCustomizations.backgroundStyle = 'subtle';
    } else if (visualBg === '@bg-secondary' && canvasBg === '@bg-primary') {
      detectedCustomizations.backgroundStyle = 'inversed';
    }
  }
  
  return detectedCustomizations;
}

/**
 * Checks if a visual style property matches any quick customization
 */
export function isPropertyControlledByQuickCustomization(
  path: string[], 
  quickCustomizations?: {
    paddingStyle?: string;
    borderRadius?: string;
    borderStyle?: string;
    backgroundStyle?: string;
  }
): string | null {
  const pathStr = path.join('.');
  
  // Check if it's a padding property
  if (pathStr.includes('*.*.padding') && quickCustomizations?.paddingStyle) {
    return 'paddingStyle';
  }
  
  // Check if it's a border radius property  
  if (pathStr.includes('*.*.border') && pathStr.includes('radius') && quickCustomizations?.borderRadius) {
    return 'borderRadius';
  }
  
  // Check if it's a border color property
  if (pathStr.includes('*.*.border') && pathStr.includes('color') && quickCustomizations?.borderStyle) {
    return 'borderStyle';
  }
  
  // Check if it's a background property
  if ((pathStr.includes('*.*.background') || pathStr.includes('page.*.background')) && 
      quickCustomizations?.backgroundStyle) {
    return 'backgroundStyle';
  }
  
  return null;
}