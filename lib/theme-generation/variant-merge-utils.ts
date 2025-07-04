// Type definitions for visual styles
type VisualStyleProperties = Record<string, any>;
type VisualStyles = Record<string, Record<string, VisualStyleProperties>>;

/**
 * Computes the final style for a variant by merging the default "*" style with variant overrides
 * This simulates Power BI's cascade behavior where variants inherit from the default
 */
export function computeVariantStyle(
  visualStyles: VisualStyles,
  visualType: string,
  variantName: string
): VisualStyleProperties | null {
  if (!visualStyles[visualType]) {
    return null;
  }

  const baseStyle = visualStyles[visualType]['*'] || {};
  
  // If requesting the default variant, return it as-is
  if (variantName === '*') {
    return baseStyle;
  }

  const variantOverrides = visualStyles[visualType][variantName];
  if (!variantOverrides) {
    return baseStyle;
  }

  // Deep merge base with overrides
  return mergeStyles(baseStyle, variantOverrides);
}

/**
 * Deep merges two style objects, with special handling for Power BI's array-based properties
 */
export function mergeStyles(
  base: VisualStyleProperties,
  override: VisualStyleProperties
): VisualStyleProperties {
  // Deep clone the base to avoid mutations
  const result = JSON.parse(JSON.stringify(base)) as VisualStyleProperties;
  
  Object.keys(override).forEach(property => {
    const baseValue = result[property];
    const overrideValue = override[property];
    
    if (Array.isArray(overrideValue) && Array.isArray(baseValue)) {
      // Special handling for array properties (fill, text, border, etc.)
      result[property] = mergePropertyArrays(baseValue, overrideValue);
    } else if (
      typeof overrideValue === 'object' && 
      overrideValue !== null &&
      typeof baseValue === 'object' &&
      baseValue !== null &&
      !Array.isArray(overrideValue)
    ) {
      // Recursively merge nested objects
      result[property] = mergeStyles(baseValue, overrideValue);
    } else {
      // Direct replacement for primitives and null values
      result[property] = overrideValue;
    }
  });
  
  return result;
}

/**
 * Merges two arrays of Power BI property objects
 * For arrays without $id, merges by index. For arrays with $id, merges by matching $id.
 */
function mergePropertyArrays(baseArray: any[], overrideArray: any[]): any[] {
  // Check if arrays use $id pattern
  const hasIds = baseArray.some(item => item && typeof item === 'object' && '$id' in item) ||
                 overrideArray.some(item => item && typeof item === 'object' && '$id' in item);
  
  if (hasIds) {
    // Use $id-based merging
    const baseMap = new Map<string, any>();
    const baseWithoutId: any[] = [];
    
    baseArray.forEach(item => {
      if (item && typeof item === 'object' && '$id' in item) {
        baseMap.set(item.$id, item);
      } else {
        baseWithoutId.push(item);
      }
    });
    
    const result: any[] = [];
    const processedIds = new Set<string>();
    
    overrideArray.forEach(overrideItem => {
      if (overrideItem && typeof overrideItem === 'object' && '$id' in overrideItem) {
        const baseItem = baseMap.get(overrideItem.$id);
        if (baseItem) {
          // Merge matching items
          result.push(mergeStyles(baseItem, overrideItem));
          processedIds.add(overrideItem.$id);
        } else {
          // New item from override
          result.push(overrideItem);
        }
      } else {
        // Items without $id - merge with first base item without $id if exists
        if (baseWithoutId.length > 0) {
          result.push(mergeStyles(baseWithoutId[0], overrideItem));
          baseWithoutId.shift(); // Remove the merged item
        } else {
          result.push(overrideItem);
        }
      }
    });
    
    // Add base items that weren't overridden
    baseMap.forEach((item, id) => {
      if (!processedIds.has(id)) {
        result.push(item);
      }
    });
    
    // Add remaining base items without $id
    result.push(...baseWithoutId);
    
    return result;
  } else {
    // For arrays without $id, merge by index
    const maxLength = Math.max(baseArray.length, overrideArray.length);
    const result: any[] = [];
    
    for (let i = 0; i < maxLength; i++) {
      const baseItem = baseArray[i];
      const overrideItem = overrideArray[i];
      
      if (baseItem !== undefined && overrideItem !== undefined) {
        // Both arrays have items at this index - merge them
        if (typeof baseItem === 'object' && typeof overrideItem === 'object' && 
            baseItem !== null && overrideItem !== null) {
          result.push(mergeStyles(baseItem, overrideItem));
        } else {
          // Non-object values - override wins
          result.push(overrideItem);
        }
      } else if (overrideItem !== undefined) {
        // Only override has item at this index
        result.push(overrideItem);
      } else {
        // Only base has item at this index
        result.push(baseItem);
      }
    }
    
    return result;
  }
}

/**
 * Determines the source of each property in a variant style
 * Returns a map indicating whether each property is inherited, overridden, or new
 */
export function getPropertySources(
  baseStyle: VisualStyleProperties,
  variantStyle: VisualStyleProperties,
  computedStyle: VisualStyleProperties
): Map<string, 'inherited' | 'overridden' | 'new'> {
  const sources = new Map<string, 'inherited' | 'overridden' | 'new'>();
  
  // Check all properties in the computed style
  Object.keys(computedStyle).forEach(property => {
    if (property in variantStyle) {
      // Property exists in variant - it's either overridden or new
      if (property in baseStyle) {
        sources.set(property, 'overridden');
      } else {
        sources.set(property, 'new');
      }
    } else {
      // Property only exists in base - it's inherited
      sources.set(property, 'inherited');
    }
  });
  
  return sources;
}

/**
 * Extracts only the variant overrides (diff) from a computed style
 * This is what should be exported to maintain Power BI's cascade behavior
 */
export function extractVariantOverrides(
  baseStyle: VisualStyleProperties,
  computedStyle: VisualStyleProperties
): VisualStyleProperties {
  const overrides: VisualStyleProperties = {};
  
  Object.keys(computedStyle).forEach(property => {
    const baseValue = baseStyle[property];
    const computedValue = computedStyle[property];
    
    // Only include properties that differ from base
    if (!deepEqual(baseValue, computedValue)) {
      overrides[property] = computedValue;
    }
  });
  
  return overrides;
}

/**
 * Deep equality check for property values
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== typeof b) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}