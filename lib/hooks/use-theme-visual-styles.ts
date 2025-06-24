import { useCallback } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeChanges } from './use-theme-changes';

/**
 * Hook for managing visual styles
 * Provides optimized access to visual style operations
 */
export function useThemeVisualStyles() {
  // Only get visual styles when needed
  const visualStyles = useThemeStudioStore((state) => state.theme.visualStyles);
  
  // Get actions
  const updateVisualStylesAction = useThemeStudioStore((state) => state.updateVisualStyles);
  const updateVisualStyleAction = useThemeStudioStore((state) => state.updateVisualStyle);
  
  // Get change tracking function from changes store
  const { trackChange } = useThemeChanges();

  // Enhanced update with change tracking
  const updateVisualStyles = useCallback((newVisualStyles: Record<string, any>) => {
    updateVisualStylesAction(newVisualStyles);
    if (trackChange) {
      trackChange(['visualStyles']);
    }
  }, [updateVisualStylesAction, trackChange]);

  // Enhanced update single visual style with change tracking
  const updateVisualStyle = useCallback((visual: string, variant: string, value: any) => {
    updateVisualStyleAction(visual, variant, value);
    if (trackChange) {
      trackChange(['visualStyles', visual, variant]);
    }
  }, [updateVisualStyleAction, trackChange]);

  // Get specific visual style
  const getVisualStyle = useCallback((visual: string, variant: string = '*') => {
    return visualStyles?.[visual]?.[variant] || {};
  }, [visualStyles]);

  // Check if a visual has variants
  const hasVariants = useCallback((visual: string) => {
    const visualData = visualStyles?.[visual];
    if (!visualData) return false;
    const variants = Object.keys(visualData);
    return variants.length > 1 || (variants.length === 1 && variants[0] !== '*');
  }, [visualStyles]);

  // Clear visual section for a specific variant
  const clearVisualSection = useCallback((visual: string, variant: string, section: string) => {
    const currentStyles = visualStyles?.[visual]?.[variant] || {};
    const newStyles = { ...currentStyles };
    
    // Define section property mappings
    const sectionPropertyPrefixes: Record<string, string[]> = {
      background: ['background', 'fill'],
      border: ['border', 'outline'],
      text: ['font', 'text', 'color'],
      spacing: ['padding', 'margin'],
      effects: ['shadow', 'opacity', 'filter']
    };
    
    const prefixes = sectionPropertyPrefixes[section] || [section];
    
    // Remove properties that match the section
    Object.keys(newStyles).forEach(key => {
      if (prefixes.some(prefix => key.toLowerCase().includes(prefix))) {
        delete newStyles[key];
      }
    });
    
    updateVisualStyle(visual, variant, newStyles);
  }, [visualStyles, updateVisualStyle]);

  // Clear all styles for a visual variant
  const clearVisualVariant = useCallback((visual: string, variant: string) => {
    updateVisualStyle(visual, variant, {});
  }, [updateVisualStyle]);

  return {
    // Data
    visualStyles,
    
    // Actions
    updateVisualStyles,
    updateVisualStyle,
    
    // Utilities
    getVisualStyle,
    hasVariants,
    
    // Clear actions
    clearVisualSection,
    clearVisualVariant
  };
}