'use client';

import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      description={schema.description}
      inline={true}
    >
      <Select value={value || 'Segoe UI'} onValueChange={onChange}>
        <SelectTrigger className="w-full h-6 text-[11px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONT_FAMILIES.map(font => (
            <SelectItem key={font} value={font} className="text-xs">
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </PropertyWrapper>
  );
}