import { useEffect, useRef, useMemo } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { getPreviewGenerator } from '@/lib/theme-generation/client-preview-generator';
import { useDebounce } from '@/lib/hooks/use-debounce';
import isEqual from 'fast-deep-equal';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook that automatically generates preview themes when theme data changes
 */
export function useThemePreviewGenerator() {
  // Use shallow equality for better performance
  const { theme, colorPalette, neutralPalette, previewTheme } = useThemeStudioStore(
    useShallow((state) => ({
      theme: state.theme,
      colorPalette: state.resolved.colorPalette,
      neutralPalette: state.resolved.neutralPalette,
      previewTheme: state.resolved.previewTheme
    }))
  );
  
  const setPreviewTheme = useThemeStudioStore((state) => state.setPreviewTheme);
  const isGenerating = useThemeStudioStore((state) => state.isGenerating);
  const setIsGenerating = useThemeStudioStore((state) => state.setIsGenerating);
  
  // Track previous visual properties for comparison
  const previousVisualPropsRef = useRef<any>(null);
  
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
  
  // Add debouncing to batch rapid changes
  const debouncedVisualProperties = useDebounce(visualProperties, 200);
  
  useEffect(() => {
    // Skip if palettes aren't resolved yet
    if (!colorPalette || !neutralPalette) {
      return;
    }
    
    // Check if only the name changed
    const onlyNameChanged = isEqual(previousVisualPropsRef.current, debouncedVisualProperties) && 
                           previewTheme && 
                           previewTheme.name !== theme.name;
    
    if (onlyNameChanged) {
      // Just update the name without regenerating the entire theme
      const updatedPreview = {
        ...previewTheme,
        name: theme.name
      };
      setPreviewTheme(updatedPreview);
      return;
    }
    
    // Visual properties changed, need to regenerate
    if (!isEqual(previousVisualPropsRef.current, debouncedVisualProperties)) {
      previousVisualPropsRef.current = debouncedVisualProperties;
      
      const generatePreview = async () => {
        setIsGenerating(true);
        
        try {
          // Prepare theme input for generator
          const themeInput = {
            name: theme.name,
            mode: debouncedVisualProperties.mode,
            dataColors: colorPalette!.colors as string[],
            neutralPalette: neutralPalette!.colors as string[],
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
    debouncedVisualProperties,
    theme.name,
    colorPalette,
    neutralPalette,
    previewTheme,
    setPreviewTheme,
    setIsGenerating
  ]);
  
  return {
    previewTheme,
    isGenerating
  };
}