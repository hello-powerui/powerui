import { useEffect, useRef } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { getPreviewGenerator } from '@/lib/theme-generation/client-preview-generator';
import { useDebounce } from '@/lib/hooks/use-debounce';

/**
 * Hook that automatically generates preview themes when theme data changes
 */
export function useThemePreviewGenerator() {
  const theme = useThemeStudioStore((state) => state.theme);
  const resolved = useThemeStudioStore((state) => state.resolved);
  const setPreviewTheme = useThemeStudioStore((state) => state.setPreviewTheme);
  const isGenerating = useThemeStudioStore((state) => state.isGenerating);
  const setIsGenerating = useThemeStudioStore((state) => state.setIsGenerating);
  
  // Debounce theme changes for performance, but not when theme ID changes
  const previousThemeId = useRef(theme.id);
  const isThemeIdChange = previousThemeId.current !== theme.id;
  const debouncedTheme = useDebounce(theme, isThemeIdChange ? 0 : 300);
  
  useEffect(() => {
    // Update the previous theme ID
    previousThemeId.current = theme.id;
  }, [theme.id]);
  
  useEffect(() => {
    // Skip if palettes aren't resolved yet
    if (!resolved.colorPalette || !resolved.neutralPalette) {
      return;
    }
    
    // Skip if already generating
    if (isGenerating) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Prepare theme input for generator
      const themeInput = {
        name: debouncedTheme.name,
        mode: debouncedTheme.mode,
        dataColors: resolved.colorPalette.colors as string[],
        neutralPalette: resolved.neutralPalette.colors,
        fontFamily: debouncedTheme.fontFamily.toLowerCase().replace(/\s+/g, '-'),
        visualStyles: debouncedTheme.visualStyles,
        structuralColors: debouncedTheme.structuralColors && Object.keys(debouncedTheme.structuralColors).length > 0 ? debouncedTheme.structuralColors : undefined,
        textClasses: debouncedTheme.textClasses && Object.keys(debouncedTheme.textClasses).length > 0 ? debouncedTheme.textClasses : undefined
      };
      
      // Generate preview using client-side generator
      const previewGenerator = getPreviewGenerator();
      const previewTheme = previewGenerator.generatePreview(themeInput);
      
      setPreviewTheme(previewTheme);
    } catch (error) {
      console.error('Failed to generate preview theme:', error);
      setPreviewTheme(null);
    } finally {
      setIsGenerating(false);
    }
  }, [
    debouncedTheme,
    resolved.colorPalette,
    resolved.neutralPalette,
    isGenerating,
    setPreviewTheme,
    setIsGenerating
  ]);
  
  return {
    previewTheme: resolved.previewTheme,
    isGenerating
  };
}