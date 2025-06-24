'use client';

import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { StudioSelect, StudioSelectContent, StudioSelectItem, StudioSelectTrigger, StudioSelectValue } from '@/components/theme-studio/ui/form-controls';
import { FONT_WEIGHTS, getAvailableWeights, getWeightLabel } from '@/lib/theme-studio/font-registry';

interface FontWeightFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  fontFamily?: string; // To filter available weights
}

export function FontWeightField({ schema, value, onChange, path, fontFamily = 'Segoe UI' }: FontWeightFieldProps) {
  const availableWeights = getAvailableWeights(fontFamily);
  
  // Ensure current value is valid for the font family
  const currentValue = String(value || '400');
  const isValidWeight = availableWeights.includes(currentValue);
  
  // If current weight is not available in this font, default to closest
  if (!isValidWeight && value) {
    const numValue = Number(currentValue);
    const closest = availableWeights.reduce((prev, curr) => 
      Math.abs(Number(curr) - numValue) < Math.abs(Number(prev) - numValue) ? curr : prev
    );
    // Trigger onChange to update to valid weight
    setTimeout(() => onChange(closest), 0);
  }

  return (
    <PropertyWrapper 
      label={schema.title || 'Font Weight'} 
      path={path}
      inline={true}
    >
      <StudioSelect 
        value={isValidWeight ? currentValue : availableWeights.includes('400') ? '400' : availableWeights[0]} 
        onValueChange={onChange}
      >
        <StudioSelectTrigger className="w-full">
          <StudioSelectValue />
        </StudioSelectTrigger>
        <StudioSelectContent>
          {FONT_WEIGHTS.filter(weight => 
            availableWeights.includes(weight.value)
          ).map(weight => (
            <StudioSelectItem key={weight.value} value={weight.value} className="text-xs">
              {weight.label} ({weight.value})
            </StudioSelectItem>
          ))}
        </StudioSelectContent>
      </StudioSelect>
    </PropertyWrapper>
  );
}