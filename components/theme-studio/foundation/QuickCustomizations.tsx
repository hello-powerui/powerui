'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { HelpTooltip } from '@/components/theme-studio/HelpTooltip';
import { ChangeIndicator } from '@/components/theme-studio/ui/change-indicator';
import { THEME_STUDIO_TYPOGRAPHY } from '@/components/theme-studio/constants/typography';
import { cn } from '@/lib/utils';

interface QuickCustomizationsProps {
  hasChanges: (path: string[]) => boolean;
  trackChange: (path: string[]) => void;
}

export function QuickCustomizations({ hasChanges, trackChange }: QuickCustomizationsProps) {
  const { theme, setQuickCustomization, updateVisualStyles } = useThemeStudioStore();
  const quickCustomizations = theme.quickCustomizations || {
    paddingStyle: 'medium',
    borderRadius: 'medium',
    borderStyle: 'default',
    backgroundStyle: 'default'
  };

  // Padding values
  const paddingValues = {
    small: 12,
    medium: 16,
    large: 20
  };

  // Border radius values
  const borderRadiusValues = {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    xl: 16
  };

  // Apply quick customizations to visual styles
  const applyQuickCustomizations = (key: string, value: string) => {
    setQuickCustomization(key as any, value);
    trackChange(['quickCustomizations', key]);

    const currentVisualStyles = theme.visualStyles || {};
    let updatedStyles = { ...currentVisualStyles };

    // Initialize global styles if they don't exist
    if (!updatedStyles['*']) {
      updatedStyles['*'] = {};
    }
    if (!updatedStyles['*']['*']) {
      updatedStyles['*']['*'] = {};
    }

    switch (key) {
      case 'paddingStyle':
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
        if (!updatedStyles['*']['*'].border) {
          updatedStyles['*']['*'].border = [{ show: true }];
        }
        updatedStyles['*']['*'].border[0].radius = borderRadiusValues[value as keyof typeof borderRadiusValues];
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
            // Both use bg-primary
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
            // Visuals use bg-primary, canvas uses bg-secondary
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
            // Canvas uses bg-primary, visuals use bg-secondary
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

    updateVisualStyles(updatedStyles);
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 p-4">
      <div className="flex items-center gap-1.5 mb-4">
        <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>
          Quick Customizations
        </Label>
        <HelpTooltip 
          content="Apply common styling patterns quickly. These options update multiple visual properties at once to create cohesive designs."
        />
        <ChangeIndicator hasChanged={hasChanges(['quickCustomizations'])} />
      </div>
      
      <div className="space-y-4">
        {/* Padding Style */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Padding</Label>
          <RadioGroup
            value={quickCustomizations.paddingStyle}
            onValueChange={(value) => applyQuickCustomizations('paddingStyle', value)}
            className="grid grid-cols-3 gap-2"
          >
            <Label 
              htmlFor="padding-small" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'small' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="small" id="padding-small" className="sr-only" />
              <span className="text-sm">Small (12px)</span>
            </Label>
            <Label 
              htmlFor="padding-medium" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'medium' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="medium" id="padding-medium" className="sr-only" />
              <span className="text-sm">Medium (16px)</span>
            </Label>
            <Label 
              htmlFor="padding-large" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'large' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="large" id="padding-large" className="sr-only" />
              <span className="text-sm">Large (20px)</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Border Radius */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Border Radius</Label>
          <RadioGroup
            value={quickCustomizations.borderRadius}
            onValueChange={(value) => applyQuickCustomizations('borderRadius', value)}
            className="grid grid-cols-5 gap-1.5"
          >
            {['none', 'small', 'medium', 'large', 'xl'].map((size) => (
              <Label 
                key={size}
                htmlFor={`radius-${size}`}
                className={cn(
                  "flex items-center justify-center p-1.5 rounded-md border cursor-pointer transition-all",
                  quickCustomizations.borderRadius === size 
                    ? "border-gray-900 bg-gray-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <RadioGroupItem value={size} id={`radius-${size}`} className="sr-only" />
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 bg-gray-300 mb-1"
                    style={{ 
                      borderRadius: `${borderRadiusValues[size as keyof typeof borderRadiusValues]}px` 
                    }}
                  />
                  <span className="text-xs capitalize">{size}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Border Style */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Border Style</Label>
          <RadioGroup
            value={quickCustomizations.borderStyle}
            onValueChange={(value) => applyQuickCustomizations('borderStyle', value)}
            className="grid grid-cols-3 gap-2"
          >
            <Label 
              htmlFor="border-default" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'default' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="default" id="border-default" className="sr-only" />
              <span className="text-sm">Default</span>
            </Label>
            <Label 
              htmlFor="border-subtle" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'subtle' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="subtle" id="border-subtle" className="sr-only" />
              <span className="text-sm">Subtle</span>
            </Label>
            <Label 
              htmlFor="border-none" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'none' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="none" id="border-none" className="sr-only" />
              <span className="text-sm">None</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Background Style */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Background Style</Label>
          <RadioGroup
            value={quickCustomizations.backgroundStyle}
            onValueChange={(value) => applyQuickCustomizations('backgroundStyle', value)}
            className="space-y-2"
          >
            <Label 
              htmlFor="bg-default" 
              className={cn(
                "flex items-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.backgroundStyle === 'default' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="default" id="bg-default" className="mr-2" />
              <div className="flex-1">
                <span className="text-sm font-medium">Default</span>
                <p className="text-xs text-gray-500">Visuals and canvas share the same background</p>
              </div>
            </Label>
            <Label 
              htmlFor="bg-subtle" 
              className={cn(
                "flex items-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.backgroundStyle === 'subtle' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="subtle" id="bg-subtle" className="mr-2" />
              <div className="flex-1">
                <span className="text-sm font-medium">Subtle Contrast</span>
                <p className="text-xs text-gray-500">Visuals on primary, canvas on secondary background</p>
              </div>
            </Label>
            <Label 
              htmlFor="bg-inversed" 
              className={cn(
                "flex items-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.backgroundStyle === 'inversed' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <RadioGroupItem value="inversed" id="bg-inversed" className="mr-2" />
              <div className="flex-1">
                <span className="text-sm font-medium">Inversed Contrast</span>
                <p className="text-xs text-gray-500">Canvas on primary, visuals on secondary background</p>
              </div>
            </Label>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}