import { useCallback, useMemo } from 'react';
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useVisualEditorStore } from '@/lib/stores/visual-editor-store';

/**
 * Get value from object by path array
 */
function getValueByPath(obj: any, path: string[]): any {
  return path.reduce((current, key) => current?.[key], obj);
}

/**
 * Custom hook for managing theme properties
 */
export function useThemeProperty(path: string[]) {
  const { currentTheme, updateThemeProperty } = useThemeDataStore();
  
  const value = useMemo(() => 
    getValueByPath(currentTheme, path),
    [currentTheme, path.join('.')]
  );
  
  const setValue = useCallback((newValue: any) => {
    updateThemeProperty(path, newValue);
  }, [path.join('.'), updateThemeProperty]);
  
  return [value, setValue] as const;
}

/**
 * Custom hook for managing visual style properties
 */
export function useVisualStyleProperty(
  visual: string,
  property: string,
  variant: string = '*'
) {
  const { currentTheme, updateVisualStyle } = useThemeDataStore();
  
  const value = useMemo(() => 
    currentTheme.visualStyles?.[visual]?.[variant]?.[property],
    [currentTheme, visual, variant, property]
  );
  
  const setValue = useCallback((newValue: any) => {
    updateVisualStyle(visual, property, newValue);
  }, [visual, property, updateVisualStyle]);
  
  return [value, setValue] as const;
}

/**
 * Custom hook for managing property inheritance
 */
export function usePropertyInheritance(
  path: string[],
  globalPath?: string[]
) {
  const { currentTheme } = useThemeDataStore();
  
  const localValue = useMemo(() => 
    getValueByPath(currentTheme, path),
    [currentTheme, path.join('.')]
  );
  
  const globalValue = useMemo(() => 
    globalPath ? getValueByPath(currentTheme, globalPath) : undefined,
    [currentTheme, globalPath?.join('.')]
  );
  
  const effectiveValue = localValue ?? globalValue;
  const isInherited = !localValue && !!globalValue;
  
  return {
    value: effectiveValue,
    localValue,
    globalValue,
    isInherited,
  };
}