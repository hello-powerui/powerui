'use client';

import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { StudioSelect, StudioSelectContent, StudioSelectItem, StudioSelectTrigger, StudioSelectValue } from '@/components/theme-studio/ui/form-controls';
import { FONT_AVAILABLE_WEIGHTS } from '@/lib/theme-studio/font-registry';

interface FontFamilyFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
}

const FONT_FAMILIES = Object.keys(FONT_AVAILABLE_WEIGHTS);

export function FontFamilyField({ schema, value, onChange, path }: FontFamilyFieldProps) {
  return (
    <PropertyWrapper 
      label={schema.title || 'Font Family'} 
      path={path}
      inline={true}
    >
      <StudioSelect value={value || 'Segoe UI'} onValueChange={onChange}>
        <StudioSelectTrigger className="w-full">
          <StudioSelectValue />
        </StudioSelectTrigger>
        <StudioSelectContent>
          {FONT_FAMILIES.map(font => (
            <StudioSelectItem key={font} value={font} className="text-xs">
              {font}
            </StudioSelectItem>
          ))}
        </StudioSelectContent>
      </StudioSelect>
    </PropertyWrapper>
  );
}