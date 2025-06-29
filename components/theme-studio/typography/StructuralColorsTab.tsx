'use client';

import { useState, useEffect } from 'react';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { ConnectedProperty } from '@/components/theme-studio/ui/connected-property';
import { PropertyWrapper } from '@/components/theme-studio/form/property-wrapper';
import { FillControl } from '@/components/theme-studio/form/controls/fill-control-modern';
import { THEME_STUDIO_SPACING } from '@/components/theme-studio/constants/layout';
import { Button } from '@/components/ui/button';

// Structural colors are all top-level properties except these
const EXCLUDED_PROPERTIES = ['$schema', 'name', 'visualStyles', 'dataColors', 'icons', 'textClasses'];

// Group and organize structural colors for better UX
const STRUCTURAL_COLOR_GROUPS = {
  'Core Colors': {
    colors: ['accent', 'background', 'foreground', 'secondaryBackground'],
    description: 'Primary colors used throughout the report'
  },
  'Background Variants': {
    colors: ['backgroundLight', 'backgroundDark', 'backgroundNeutral'],
    description: 'Different background color variations'
  },
  'Foreground Variants': {
    colors: ['foregroundLight', 'foregroundDark', 'foregroundButton', 'foregroundSelected'],
    description: 'Text and content color variations'
  },
  'Neutral Colors': {
    colors: ['foregroundNeutralDark', 'foregroundNeutralLight', 'foregroundNeutralSecondary', 
             'foregroundNeutralSecondaryAlt', 'foregroundNeutralSecondaryAlt2', 
             'foregroundNeutralTertiary', 'foregroundNeutralTertiaryAlt'],
    description: 'Neutral color variations for subtle elements'
  },
  'Semantic Colors': {
    colors: ['good', 'neutral', 'bad', 'maximum', 'center', 'minimum', 'null'],
    description: 'Colors for data states and conditions'
  },
  'Interactive Elements': {
    colors: ['hyperlink', 'visitedHyperlink', 'disabledText'],
    description: 'Colors for interactive and disabled states'
  },
  'Visual Elements': {
    colors: ['tableAccent', 'shapeStroke', 'mapPushpin'],
    description: 'Colors for specific visual components'
  },
  'Hierarchy Colors': {
    colors: ['firstLevelElements', 'secondLevelElements', 'thirdLevelElements', 'fourthLevelElements'],
    description: 'Colors for visual hierarchy levels'
  }
};

// Friendly names for structural colors
const STRUCTURAL_COLOR_NAMES: Record<string, string> = {
  accent: 'Accent',
  background: 'Background',
  backgroundDark: 'Background Dark',
  backgroundLight: 'Background Light',
  backgroundNeutral: 'Background Neutral',
  bad: 'Bad (Negative)',
  center: 'Center',
  dataColors: 'Data Colors',
  disabledText: 'Disabled Text',
  firstLevelElements: 'First Level Elements',
  foreground: 'Foreground',
  foregroundButton: 'Foreground Button',
  foregroundDark: 'Foreground Dark',
  foregroundLight: 'Foreground Light',
  foregroundNeutralDark: 'Foreground Neutral Dark',
  foregroundNeutralLight: 'Foreground Neutral Light',
  foregroundNeutralSecondary: 'Foreground Neutral Secondary',
  foregroundNeutralSecondaryAlt: 'Foreground Neutral Secondary Alt',
  foregroundNeutralSecondaryAlt2: 'Foreground Neutral Secondary Alt 2',
  foregroundNeutralTertiary: 'Foreground Neutral Tertiary',
  foregroundNeutralTertiaryAlt: 'Foreground Neutral Tertiary Alt',
  foregroundSelected: 'Foreground Selected',
  fourthLevelElements: 'Fourth Level Elements',
  good: 'Good (Positive)',
  hyperlink: 'Hyperlink',
  mapPushpin: 'Map Pushpin',
  maximum: 'Maximum',
  minimum: 'Minimum',
  neutral: 'Neutral',
  null: 'Null',
  secondLevelElements: 'Second Level Elements',
  secondaryBackground: 'Secondary Background',
  shapeStroke: 'Shape Stroke',
  tableAccent: 'Table Accent',
  thirdLevelElements: 'Third Level Elements',
  visitedHyperlink: 'Visited Hyperlink'
};

export function StructuralColorsTab() {
  const { theme, setStructuralColors, resolved } = useThemeStudioStore();
  const mode = theme.mode || 'light';
  const neutralPalette = resolved.neutralPalette;
  const structuralColors = theme.structuralColors || {};

  const handleColorChange = (colorKey: string, value: any) => {
    // FillControl returns PowerBI format { solid: { color: string } }
    let color: string;
    
    if (value?.solid?.color) {
      color = value.solid.color;
    } else if (typeof value === 'string') {
      color = value;
    } else {
      color = '#000000';
    }
    
    // Update the structural colors object
    const updatedColors = {
      ...structuralColors,
      [colorKey]: color
    };
    setStructuralColors(updatedColors);
  };

  const handleResetGroup = (colors: string[]) => {
    const updatedColors: Record<string, any> = { ...structuralColors };
    colors.forEach(colorKey => {
      delete updatedColors[colorKey];
    });
    setStructuralColors(updatedColors);
  };

  const handleResetAll = () => {
    // Reset all structural colors to empty object
    setStructuralColors({});
  };

  const getColorValue = (colorKey: string): string => {
    const value = (structuralColors as Record<string, any>)[colorKey];
    if (!value) {
      // Provide sensible defaults based on mode
      return mode === 'dark' ? '#FFFFFF' : '#000000';
    }
    return value;
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Configure structural colors that define the overall theme appearance
        </p>
        <p className="text-xs text-gray-500 mt-1">
          These colors are used as base colors throughout your Power BI reports
        </p>
      </div>
      
      <div className="-space-y-px">
        {Object.entries(STRUCTURAL_COLOR_GROUPS).map(([groupName, { colors, description }]) => {
          // Check if any colors in this group have custom values
          const hasCustomColors = colors.some(colorKey => (structuralColors as any)[colorKey] !== undefined);
          
          return (
            <CollapsibleSection
              key={groupName}
              title={groupName}
              tooltip={description}
              defaultOpen={false}
              badge={colors.length}
              hasContent={hasCustomColors}
              onClear={() => {
                // Clear all colors in this group
                const updatedColors = { ...structuralColors } as any;
                colors.forEach(colorKey => {
                  delete updatedColors[colorKey];
                });
                setStructuralColors(updatedColors);
              }}
              clearMessage={`Clear all color customizations in the ${groupName} group?`}
            >
            <div className={`${THEME_STUDIO_SPACING.propertyGap} pt-2`}>
              {colors.map((colorKey, index) => {
                // Skip if this color doesn't exist in the theme
                if (!(STRUCTURAL_COLOR_NAMES as any)[colorKey]) return null;
                
                const isLast = index === colors.length - 1;
                
                return (
                  <ConnectedProperty key={colorKey} isLast={isLast}>
                    <FillControl
                      label={(STRUCTURAL_COLOR_NAMES as any)[colorKey]}
                      value={{ solid: { color: getColorValue(colorKey) } }}
                      onChange={(value) => handleColorChange(colorKey, value)}
                      path={[colorKey]}
                      inline={true}
                      enableThemeColors={false}
                    />
                  </ConnectedProperty>
                );
              })}
            </div>
          </CollapsibleSection>
          );
        })}
      </div>
    </div>
  );
}