import { useCallback } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook for accessing and modifying core theme data
 * Only subscribes to theme data changes, not UI state
 */
export function useThemeData() {
  // Use shallow equality to prevent re-renders when objects don't actually change
  const { theme, colorPalette, neutralPalette } = useThemeStudioStore(
    useShallow((state) => ({
      theme: state.theme,
      colorPalette: state.resolved.colorPalette,
      neutralPalette: state.resolved.neutralPalette
    }))
  );

  // Individual theme property selectors for granular subscriptions
  const themeName = useThemeStudioStore((state) => state.theme.name);
  const themeId = useThemeStudioStore((state) => state.theme.id);
  const colorPaletteId = useThemeStudioStore((state) => state.theme.colorPaletteId);
  const neutralPaletteId = useThemeStudioStore((state) => state.theme.neutralPaletteId);
  const mode = useThemeStudioStore((state) => state.theme.mode);
  const fontFamily = useThemeStudioStore((state) => state.theme.fontFamily);

  // Actions - get stable references
  const updateTheme = useThemeStudioStore((state) => state.updateTheme);
  const setColorPaletteId = useThemeStudioStore((state) => state.setColorPaletteId);
  const setNeutralPaletteId = useThemeStudioStore((state) => state.setNeutralPaletteId);
  const setThemeMode = useThemeStudioStore((state) => state.setThemeMode);
  const setFontFamily = useThemeStudioStore((state) => state.setFontFamily);
  const setStructuralColors = useThemeStudioStore((state) => state.setStructuralColors);
  const setTextClasses = useThemeStudioStore((state) => state.setTextClasses);
  const setQuickCustomization = useThemeStudioStore((state) => state.setQuickCustomization);

  // Clear actions
  const clearTypography = useCallback(() => {
    updateTheme({ 
      fontFamily: 'Segoe UI',
      textClasses: {} 
    });
  }, [updateTheme]);

  const clearStructuralColors = useCallback(() => {
    updateTheme({ structuralColors: {} });
  }, [updateTheme]);

  const clearTextClasses = useCallback(() => {
    updateTheme({ textClasses: {} });
  }, [updateTheme]);

  return {
    // Full theme object (use sparingly)
    theme,
    
    // Individual properties (prefer these for specific needs)
    themeName,
    themeId,
    colorPaletteId,
    neutralPaletteId,
    mode,
    fontFamily,
    
    // Resolved palettes
    colorPalette,
    neutralPalette,
    
    // Actions
    updateTheme,
    setColorPaletteId,
    setNeutralPaletteId,
    setThemeMode,
    setFontFamily,
    setStructuralColors,
    setTextClasses,
    setQuickCustomization,
    
    // Clear actions
    clearTypography,
    clearStructuralColors,
    clearTextClasses
  };
}