'use client';

import { Label } from '@/components/ui/label';
import { HelpTooltip } from '@/components/theme-studio/HelpTooltip';
import { ChangeIndicator } from '@/components/theme-studio/ui/change-indicator';
import { THEME_STUDIO_TYPOGRAPHY } from '@/components/theme-studio/constants/typography';
import { cn } from '@/lib/utils';
import React from 'react';
import { useQuickCustomizations } from '@/lib/hooks/use-quick-customizations';

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
    
    // Track quick customization change
    trackChange(['quickCustomizations', key]);
    
    // Apply the customization (this will track visual styles changes internally)
    applyQuickCustomization(key, value);
    
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(scrollLeft, scrollTop);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>
            Quick Styles
          </Label>
          <HelpTooltip 
            content="Apply common styling patterns quickly. These options update multiple visual properties at once to create cohesive designs."
          />
          <ChangeIndicator hasChanged={hasChanges(['quickCustomizations'])} />
        </div>
        <p className="text-sm text-gray-600">
          Pre-configured style options that update multiple properties at once
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Padding Style */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Padding</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'small', label: 'Small', size: '12px', padding: 3 },
              { value: 'medium', label: 'Medium', size: '16px', padding: 5 },
              { value: 'large', label: 'Large', size: '20px', padding: 7 }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuickCustomization('paddingStyle', option.value)}
                className={cn(
                  "relative p-2.5 rounded-lg border-2 transition-all",
                  quickCustomizations.paddingStyle === option.value
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                )}
              >
                {/* Visual Preview */}
                <div className="w-full h-12 mb-2 relative rounded bg-white overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      padding: `${option.padding}px`,
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 3px,
                        rgba(59, 130, 246, 0.15) 3px,
                        rgba(59, 130, 246, 0.15) 6px
                      )`
                    }}
                  >
                    <div className="w-full h-full bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.size}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Border Radius</Label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'none', label: 'None', radius: 0 },
              { value: 'small', label: 'Small', radius: 4 },
              { value: 'medium', label: 'Medium', radius: 8 },
              { value: 'large', label: 'Large', radius: 12 }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuickCustomization('borderRadius', option.value)}
                className={cn(
                  "p-2.5 rounded-lg border-2 transition-all",
                  quickCustomizations.borderRadius === option.value
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                )}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 h-10 bg-gray-300 mb-1.5"
                    style={{ borderRadius: `${option.radius}px` }}
                  />
                  <span className="text-xs font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Border Style */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Border Style</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'default', label: 'Default', borderWidth: 1.5, borderColor: '#6b7280' },
              { value: 'subtle', label: 'Subtle', borderWidth: 1, borderColor: '#d1d5db' },
              { value: 'none', label: 'None', borderWidth: 0, borderColor: 'transparent' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuickCustomization('borderStyle', option.value)}
                className={cn(
                  "p-2.5 rounded-lg border-2 transition-all",
                  quickCustomizations.borderStyle === option.value
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                )}
              >
                <div className="w-full h-12 mb-2 rounded bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-8 rounded bg-white" 
                    style={{ 
                      border: option.borderWidth > 0 ? `${option.borderWidth}px solid ${option.borderColor}` : 'none'
                    }}
                  />
                </div>
                <div className="text-sm font-medium text-gray-900 text-center">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Background Style */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Background Style</Label>
          <div className="space-y-3">
            {[
              {
                value: 'default',
                label: 'Default',
                description: 'Visuals and canvas share the same background color for a unified look',
                canvasBg: '#f9fafb',
                visualBg: '#f9fafb'
              },
              {
                value: 'subtle',
                label: 'Subtle Contrast',
                description: 'Visuals on primary background, canvas on secondary for depth',
                canvasBg: '#f3f4f6',
                visualBg: '#ffffff'
              },
              {
                value: 'inversed',
                label: 'Inversed Contrast',
                description: 'Canvas on primary background, visuals on secondary for emphasis',
                canvasBg: '#ffffff',
                visualBg: '#f3f4f6'
              }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuickCustomization('backgroundStyle', option.value)}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4",
                  quickCustomizations.backgroundStyle === option.value
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                )}
              >
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900 mb-1">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.description}</div>
                </div>
                {/* Visual Preview */}
                <div className="flex-shrink-0 w-20 h-12 rounded border border-gray-300 overflow-hidden" 
                  style={{ backgroundColor: option.canvasBg }}
                >
                  <div className="flex gap-1 p-1.5 h-full">
                    <div className="flex-1 rounded" style={{ backgroundColor: option.visualBg }} />
                    <div className="flex-1 rounded" style={{ backgroundColor: option.visualBg }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}