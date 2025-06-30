'use client';

import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { StudioSelect, StudioSelectContent, StudioSelectItem, StudioSelectTrigger, StudioSelectValue } from '@/components/theme-studio/ui/form-controls';
import { FONT_AVAILABLE_WEIGHTS, getWeightLabel } from '@/lib/theme-studio/font-registry';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

interface VisualFontFamilyFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
}

// Map of font weights to their Power BI names
const WEIGHT_TO_POWERBI_NAME: Record<string, string> = {
  '100': 'Thin',
  '200': 'Extra Light',
  '300': 'Light',
  '400': '', // Regular - no suffix
  '500': 'Medium',
  '600': 'Semibold',
  '700': 'Bold',
  '800': 'Extra Bold',
  '900': 'Black'
};

export function VisualFontFamilyField({ schema, value, onChange, path }: VisualFontFamilyFieldProps) {
  // Get the global font family from the theme store
  const globalFontFamily = useThemeStudioStore(state => state.theme.fontFamily);
  
  // Get available weights for the global font family
  const availableWeights = FONT_AVAILABLE_WEIGHTS[globalFontFamily] || ['400', '700'];
  
  // Parse the current value to extract weight if it exists
  const currentFontFamily = value || globalFontFamily;
  
  // Build font options based on available weights
  const fontOptions = availableWeights.map(weight => {
    const weightName = WEIGHT_TO_POWERBI_NAME[weight];
    const fontName = weight === '400' 
      ? globalFontFamily // Regular weight has no suffix
      : `${globalFontFamily} ${weightName}`;
    
    return {
      value: fontName,
      label: weight === '400' ? `${globalFontFamily} (Regular)` : fontName,
      weight
    };
  });

  return (
    <PropertyWrapper 
      label={schema.title || 'Font Weight'} 
      path={path}
      inline={true}
    >
      <StudioSelect value={currentFontFamily} onValueChange={onChange}>
        <StudioSelectTrigger className="w-full">
          <StudioSelectValue />
        </StudioSelectTrigger>
        <StudioSelectContent>
          {fontOptions.map(option => (
            <StudioSelectItem key={option.value} value={option.value} className="text-xs">
              {option.label}
            </StudioSelectItem>
          ))}
        </StudioSelectContent>
      </StudioSelect>
    </PropertyWrapper>
  );
}