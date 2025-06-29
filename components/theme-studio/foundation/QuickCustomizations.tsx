'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpTooltip } from '@/components/theme-studio/HelpTooltip';
import { ChangeIndicator } from '@/components/theme-studio/ui/change-indicator';
import { THEME_STUDIO_TYPOGRAPHY } from '@/components/theme-studio/constants/typography';
import { cn } from '@/lib/utils';
import React from 'react';
import { useQuickCustomizations } from '@/lib/hooks/use-quick-customizations';

// Custom RadioGroupItem that prevents focus issues
const NoFocusRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItem>
>((props, ref) => {
  return (
    <RadioGroupItem 
      {...props} 
      ref={ref}
      onFocus={(e) => {
        e.preventDefault();
        e.currentTarget.blur();
      }}
    />
  );
});
NoFocusRadioItem.displayName = 'NoFocusRadioItem';

interface QuickCustomizationsProps {
  hasChanges: (path: string[]) => boolean;
  trackChange: (path: string[]) => void;
}

export function QuickCustomizations({ hasChanges, trackChange }: QuickCustomizationsProps) {
  const { quickCustomizations, applyQuickCustomization } = useQuickCustomizations();

  // Apply quick customization and track the change
  const handleQuickCustomization = (key: string, value: string) => {
    // Preserve scroll position before state update
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    applyQuickCustomization(key, value);
    trackChange(['quickCustomizations', key]);
    
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(scrollLeft, scrollTop);
    });
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
            value={quickCustomizations.paddingStyle || 'medium'}
            onValueChange={(value) => handleQuickCustomization('paddingStyle', value)}
            className="grid grid-cols-3 gap-2"
          >
            <div 
              onClick={() => handleQuickCustomization('paddingStyle', 'small')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'small' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="small" id="padding-small" className="sr-only" />
              <span className="text-sm">Small (12px)</span>
            </div>
            <div 
              onClick={() => handleQuickCustomization('paddingStyle', 'medium')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'medium' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="medium" id="padding-medium" className="sr-only" />
              <span className="text-sm">Medium (16px)</span>
            </div>
            <div 
              onClick={() => handleQuickCustomization('paddingStyle', 'large')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.paddingStyle === 'large' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="large" id="padding-large" className="sr-only" />
              <span className="text-sm">Large (20px)</span>
            </div>
          </RadioGroup>
        </div>

        {/* Border Radius */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Border Radius</Label>
          <RadioGroup
            value={quickCustomizations.borderRadius || 'medium'}
            onValueChange={(value) => handleQuickCustomization('borderRadius', value)}
            className="grid grid-cols-4 gap-1.5"
          >
            {['none', 'small', 'medium', 'large'].map((size) => (
              <div 
                key={size}
                onClick={() => handleQuickCustomization('borderRadius', size)}
                className={cn(
                  "flex items-center justify-center p-1.5 rounded-md border cursor-pointer transition-all",
                  quickCustomizations.borderRadius === size 
                    ? "border-gray-900 bg-gray-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <NoFocusRadioItem value={size} id={`radius-${size}`} className="sr-only" />
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 bg-gray-300 mb-1"
                    style={{ 
                      borderRadius: size === 'none' ? 0 : 
                        size === 'small' ? 4 : 
                        size === 'medium' ? 8 : 12
                    }}
                  />
                  <span className="text-xs capitalize">{size}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Border Style */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Border Style</Label>
          <RadioGroup
            value={quickCustomizations.borderStyle || 'default'}
            onValueChange={(value) => handleQuickCustomization('borderStyle', value)}
            className="grid grid-cols-3 gap-2"
          >
            <div 
              onClick={() => handleQuickCustomization('borderStyle', 'default')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'default' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="default" id="border-default" className="sr-only" />
              <span className="text-sm">Default</span>
            </div>
            <div 
              onClick={() => handleQuickCustomization('borderStyle', 'subtle')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'subtle' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="subtle" id="border-subtle" className="sr-only" />
              <span className="text-sm">Subtle</span>
            </div>
            <div 
              onClick={() => handleQuickCustomization('borderStyle', 'none')}
              className={cn(
                "flex items-center justify-center p-2 rounded-md border cursor-pointer transition-all",
                quickCustomizations.borderStyle === 'none' 
                  ? "border-gray-900 bg-gray-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <NoFocusRadioItem value="none" id="border-none" className="sr-only" />
              <span className="text-sm">None</span>
            </div>
          </RadioGroup>
        </div>

        {/* Background Style */}
        <div>
          <Label className="text-xs text-gray-600 mb-2 block">Background Style</Label>
          <RadioGroup
            value={quickCustomizations.backgroundStyle || 'default'}
            onValueChange={(value) => handleQuickCustomization('backgroundStyle', value)}
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
              <NoFocusRadioItem value="default" id="bg-default" className="mr-2" />
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
              <NoFocusRadioItem value="subtle" id="bg-subtle" className="mr-2" />
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
              <NoFocusRadioItem value="inversed" id="bg-inversed" className="mr-2" />
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