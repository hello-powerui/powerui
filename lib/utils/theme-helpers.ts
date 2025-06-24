/**
 * Check if an object has actual content (not just empty structure)
 */
export function hasActualContent(value: any): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  // For arrays, check if any item has content
  if (Array.isArray(value)) {
    return value.some(item => hasActualContent(item));
  }

  // For objects, check if any property has a non-empty value
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return false;
  }

  // Check if any value is not empty
  return keys.some(key => {
    const val = value[key];
    
    // Skip undefined, null, empty strings
    if (val === undefined || val === null || val === '') {
      return false;
    }
    
    // Recursively check objects and arrays
    if (typeof val === 'object') {
      return hasActualContent(val);
    }
    
    // Any other value (number, boolean, non-empty string) is content
    return true;
  });
}