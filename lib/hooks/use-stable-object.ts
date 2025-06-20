import { useRef, useEffect } from 'react';

/**
 * Returns a stable object reference that only updates when its properties change
 */
export function useStableObject<T extends Record<string, any>>(obj: T): T {
  const ref = useRef<T>(obj);
  const keysRef = useRef<string[]>(Object.keys(obj));
  
  // Check if any property has changed
  let hasChanged = false;
  const currentKeys = Object.keys(obj);
  
  // Check if keys have changed
  if (currentKeys.length !== keysRef.current.length || 
      !currentKeys.every(key => keysRef.current.includes(key))) {
    hasChanged = true;
  } else {
    // Check if any value has changed
    for (const key of currentKeys) {
      if (ref.current[key] !== obj[key]) {
        hasChanged = true;
        break;
      }
    }
  }
  
  // Update the ref if something changed
  if (hasChanged) {
    ref.current = obj;
    keysRef.current = currentKeys;
  }
  
  return ref.current;
}