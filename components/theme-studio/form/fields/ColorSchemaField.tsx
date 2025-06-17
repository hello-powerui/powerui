'use client';

import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { formatPropertyName } from '@/lib/theme-studio/utils/schema-form-utils';

interface ColorSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
}

export function ColorSchemaField({ schema, value, onChange, path }: ColorSchemaFieldProps) {
  
  return (
    <UnifiedColorPicker
      label={schema.title || formatPropertyName(path[path.length - 1])}
      value={value}
      onChange={onChange}
      description={schema.description}
      required={schema.required?.includes(path[path.length - 1])}
      format="powerbi"
      enableTokens={false}
      enableThemeColors={true}
      enableShades={true}
    />
  );
}