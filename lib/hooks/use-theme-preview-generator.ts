import { useEffect, useRef, useMemo } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { getPreviewGenerator } from '@/lib/theme-generation/client-preview-generator';
// import { useDebounce } from '@/lib/hooks/use-debounce'; // Removed debouncing for immediate updates
import { useEffectDebug } from '@/lib/utils/debug-infinite-renders';

/**
 * Hook that automatically generates preview themes when theme data changes
 */
export function useThemePreviewGenerator() {
  const theme = useThemeStudioStore((state) => state.theme);
  const resolved = useThemeStudioStore((state) => state.resolved);
  const setPreviewTheme = useThemeStudioStore((state) => state.setPreviewTheme);
  const isGenerating = useThemeStudioStore((state) => state.isGenerating);
  const setIsGenerating = useThemeStudioStore((state) => state.setIsGenerating);
  
  // Track previous visual properties for comparison
  const previousVisualPropsRef = useRef<string>('');
  
  // Extract only the properties that affect visual rendering
  // Use useMemo to create stable reference when properties don't change
  const visualProperties = useMemo(() => ({
    mode: theme.mode,
    colorPaletteId: theme.colorPaletteId,
    neutralPaletteId: theme.neutralPaletteId,
    fontFamily: theme.fontFamily,
    visualStyles: theme.visualStyles,
    structuralColors: theme.structuralColors,
    textClasses: theme.textClasses
  }), [
    theme.mode,
    theme.colorPaletteId,
    theme.neutralPaletteId,
    theme.fontFamily,
    theme.visualStyles,
    theme.structuralColors,
    theme.textClasses
  ]);
  
  // Create a stable string representation for comparison
  const visualPropsString = JSON.stringify(visualProperties);
  
  // No debouncing for immediate updates
  const debouncedVisualProperties = visualProperties;
  
  useEffectDebug(() => {
    // Skip if palettes aren't resolved yet
    if (!resolved.colorPalette || !resolved.neutralPalette) {
      return;
    }
    
    // Check if only the name changed
    const onlyNameChanged = previousVisualPropsRef.current === visualPropsString && 
                           resolved.previewTheme && 
                           resolved.previewTheme.name !== theme.name;
    
    if (onlyNameChanged) {
      // Just update the name without regenerating the entire theme
      const updatedPreview = {
        ...resolved.previewTheme,
        name: theme.name
      };
      setPreviewTheme(updatedPreview);
      return;
    }
    
    // Visual properties changed, need to regenerate
    if (previousVisualPropsRef.current !== visualPropsString) {
      previousVisualPropsRef.current = visualPropsString;
      
      const generatePreview = async () => {
        setIsGenerating(true);
        
        try {
          // Prepare theme input for generator
          const themeInput = {
            name: theme.name,
            mode: debouncedVisualProperties.mode,
            dataColors: resolved.colorPalette!.colors as string[],
            neutralPalette: resolved.neutralPalette!.colors as string[],
            fontFamily: debouncedVisualProperties.fontFamily.toLowerCase().replace(/\s+/g, '-'),
            visualStyles: debouncedVisualProperties.visualStyles,
            structuralColors: debouncedVisualProperties.structuralColors && Object.keys(debouncedVisualProperties.structuralColors).length > 0 ? debouncedVisualProperties.structuralColors : undefined,
            textClasses: debouncedVisualProperties.textClasses && Object.keys(debouncedVisualProperties.textClasses).length > 0 ? debouncedVisualProperties.textClasses : undefined
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
      };
      
      generatePreview();
    }
  }, [
    visualPropsString,
    debouncedVisualProperties,
    theme.name,
    resolved.colorPalette,
    resolved.neutralPalette,
    resolved.previewTheme,
    setPreviewTheme,
    setIsGenerating
  ], 'useThemePreviewGenerator', 'generatePreview');
  
  return {
    previewTheme: resolved.previewTheme,
    isGenerating
  };
}