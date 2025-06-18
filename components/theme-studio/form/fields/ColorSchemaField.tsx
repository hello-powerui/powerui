'use client';

import { FillControl } from '../controls';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { formatPropertyName } from '@/lib/theme-studio/utils/schema-form-utils';

interface ColorSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  inline?: boolean;
}

export function ColorSchemaField({ schema, value, onChange, path, inline = true }: ColorSchemaFieldProps) {
  // Convert simple color string to PowerBI format if needed
  const colorValue = typeof value === 'string' ? { solid: { color: value } } : value;
  
  return (
    <FillControl
      label={schema.title || formatPropertyName(path[path.length - 1])}
      value={colorValue}
      onChange={onChange}
      description={schema.description}
      required={schema.required?.includes(path[path.length - 1])}
      path={path}
      inline={inline}
    />
  );
}