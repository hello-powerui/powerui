import { useEffect, useState, useRef } from 'react';

/**
 * Hook that debounces a value by the specified delay
 * @param skipInitial - If true, returns the initial value immediately without debouncing
 */
export function useDebounce<T>(value: T, delay: number, skipInitial = false): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip debounce on initial mount if requested
    if (isInitialMount.current && skipInitial) {
      setDebouncedValue(value);
      isInitialMount.current = false;
      return;
    }
    
    isInitialMount.current = false;
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, skipInitial]);

  return debouncedValue;
}