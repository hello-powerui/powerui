import { useEffect, useCallback, useMemo } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { detectQuickCustomizationsFromVisualStyles } from '@/lib/theme-studio/quick-customization-utils';
import { useThemeVisualStyles } from './use-theme-visual-styles';
import { useThemeData } from './use-theme-data';

/**
 * Hook that manages quick customizations and their sync with visual styles
 */
export function useQuickCustomizations() {
  const { theme, setQuickCustomization } = useThemeData();
  const { visualStyles, updateVisualStyles } = useThemeVisualStyles();
  
  const quickCustomizations = useMemo(() => theme.quickCustomizations || {}, [theme.quickCustomizations]);
  
  // Check visual styles on mount and when they change
  useEffect(() => {
    // Detect which quick customizations match current visual styles
    const detected = detectQuickCustomizationsFromVisualStyles(visualStyles);
    
    // Update quick customizations if they don't match visual styles
    const needsUpdate = 
      (quickCustomizations.paddingStyle && quickCustomizations.paddingStyle !== detected.paddingStyle) ||
      (quickCustomizations.borderRadius && quickCustomizations.borderRadius !== detected.borderRadius) ||
      (quickCustomizations.borderStyle && quickCustomizations.borderStyle !== detected.borderStyle) ||
      (quickCustomizations.backgroundStyle && quickCustomizations.backgroundStyle !== detected.backgroundStyle);
    
    if (needsUpdate) {
      // Clear quick customizations that no longer match
      if (quickCustomizations.paddingStyle && quickCustomizations.paddingStyle !== detected.paddingStyle) {
        setQuickCustomization('paddingStyle', '');
      }
      if (quickCustomizations.borderRadius && quickCustomizations.borderRadius !== detected.borderRadius) {
        setQuickCustomization('borderRadius', '');
      }
      if (quickCustomizations.borderStyle && quickCustomizations.borderStyle !== detected.borderStyle) {
        setQuickCustomization('borderStyle', '');
      }
      if (quickCustomizations.backgroundStyle && quickCustomizations.backgroundStyle !== detected.backgroundStyle) {
        setQuickCustomization('backgroundStyle', '');
      }
    }
  }, [visualStyles, quickCustomizations, setQuickCustomization]);
  
  // Apply quick customization and update visual styles
  const applyQuickCustomization = useCallback((key: string, value: string) => {
    // Update the quick customization state first
    setQuickCustomization(key as any, value);
    
    // Then update visual styles using the store's current state
    const store = useThemeStudioStore.getState();
    const currentStyles = store.theme.visualStyles || {};
    let updatedStyles = { ...currentStyles };
    
    // Initialize global styles if they don't exist
    if (!updatedStyles['*']) {
      updatedStyles['*'] = {};
    }
    if (!updatedStyles['*']['*']) {
      updatedStyles['*']['*'] = {};
    }
    
    // Apply the customization to visual styles
    switch (key) {
      case 'paddingStyle':
        const paddingValues = { small: 12, medium: 16, large: 20 };
        const paddingValue = paddingValues[value as keyof typeof paddingValues];
        updatedStyles['*']['*'].padding = [{
          show: true,
          top: paddingValue,
          bottom: paddingValue,
          left: paddingValue,
          right: paddingValue
        }];
        break;
        
      case 'borderRadius':
        const radiusValues = { none: 0, small: 4, medium: 8, large: 12 };
        if (!updatedStyles['*']['*'].border) {
          updatedStyles['*']['*'].border = [{ show: true }];
        }
        updatedStyles['*']['*'].border[0].radius = radiusValues[value as keyof typeof radiusValues];
        break;
        
      case 'borderStyle':
        if (!updatedStyles['*']['*'].border) {
          updatedStyles['*']['*'].border = [{ show: true }];
        }
        
        switch (value) {
          case 'default':
            updatedStyles['*']['*'].border[0].color = { solid: { color: '@border-primary' } };
            break;
          case 'subtle':
            updatedStyles['*']['*'].border[0].color = { solid: { color: '@border-secondary' } };
            break;
          case 'none':
            // Match border color to background
            if (!updatedStyles['*']['*'].background) {
              updatedStyles['*']['*'].background = [{ show: true, color: { solid: { color: '@bg-primary' } } }];
            }
            const bgColor = updatedStyles['*']['*'].background[0].color?.solid?.color || '@bg-primary';
            updatedStyles['*']['*'].border[0].color = { solid: { color: bgColor } };
            break;
        }
        break;
        
      case 'backgroundStyle':
        // Initialize page styles if they don't exist
        if (!updatedStyles.page) {
          updatedStyles.page = {};
        }
        if (!updatedStyles.page['*']) {
          updatedStyles.page['*'] = {};
        }
        
        switch (value) {
          case 'default':
            updatedStyles['*']['*'].background = [{
              show: true,
              color: { solid: { color: '@bg-primary' } }
            }];
            updatedStyles.page['*'].background = [{
              color: { solid: { color: '@bg-primary' } },
              transparency: 0
            }];
            break;
          case 'subtle':
            updatedStyles['*']['*'].background = [{
              show: true,
              color: { solid: { color: '@bg-primary' } }
            }];
            updatedStyles.page['*'].background = [{
              color: { solid: { color: '@bg-secondary' } },
              transparency: 0
            }];
            break;
          case 'inversed':
            updatedStyles['*']['*'].background = [{
              show: true,
              color: { solid: { color: '@bg-secondary' } }
            }];
            updatedStyles.page['*'].background = [{
              color: { solid: { color: '@bg-primary' } },
              transparency: 0
            }];
            break;
        }
        break;
    }
    
    // Update visual styles through the proper hook
    updateVisualStyles(updatedStyles);
  }, [setQuickCustomization, updateVisualStyles]);
  
  return {
    quickCustomizations,
    applyQuickCustomization,
    detectQuickCustomizationsFromVisualStyles
  };
}