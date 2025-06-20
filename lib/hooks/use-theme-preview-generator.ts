import { useEffect, useRef, useMemo } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { getPreviewGenerator } from '@/lib/theme-generation/client-preview-generator';
import { useEffectDebug } from '@/lib/utils/debug-infinite-renders';
import isEqual from 'fast-deep-equal';

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
  
  useEffectDebug(() => {
    // Skip if palettes aren't resolved yet
    if (!resolved.colorPalette || !resolved.neutralPalette) {
      return;
    }
    
    // Check if only the name changed
    const onlyNameChanged = isEqual(previousVisualPropsRef.current, visualProperties) && 
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
    if (!isEqual(previousVisualPropsRef.current, visualProperties)) {
      previousVisualPropsRef.current = visualProperties;
      
      const generatePreview = async () => {
        setIsGenerating(true);
        
        try {
          // Prepare theme input for generator
          const themeInput = {
            name: theme.name,
            mode: visualProperties.mode,
            dataColors: resolved.colorPalette!.colors as string[],
            neutralPalette: resolved.neutralPalette!.colors as string[],
            fontFamily: visualProperties.fontFamily.toLowerCase().replace(/\s+/g, '-'),
            visualStyles: visualProperties.visualStyles,
            structuralColors: visualProperties.structuralColors && Object.keys(visualProperties.structuralColors).length > 0 ? visualProperties.structuralColors : undefined,
            textClasses: visualProperties.textClasses && Object.keys(visualProperties.textClasses).length > 0 ? visualProperties.textClasses : undefined
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
    visualProperties,
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