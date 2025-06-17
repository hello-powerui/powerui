'use client';

import { PropertyInput } from '../property-input';
import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';

interface StringSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
}

export function StringSchemaField({ schema, value, onChange, path }: StringSchemaFieldProps) {
  // Check for oneOf pattern (common in Power BI schemas)
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    return (
      <PropertyInput
        type="select"
        label={schema.title || ''}
        value={value || ''}
        onChange={onChange}
        options={schema.oneOf.map(option => ({
          value: option.const || option.enum?.[0] || '',
          label: option.title || option.const || option.enum?.[0] || '',
        }))}
        description={schema.description}
        path={path}
      />
    );
  }
  
  // Enum - render as select
  if (schema.enum) {
    return (
      <PropertyInput
        type="select"
        label={schema.title || ''}
        value={value || ''}
        onChange={onChange}
        options={schema.enum.map(val => ({
          value: String(val),
          label: String(val),
        }))}
        description={schema.description}
        path={path}
      />
    );
  }
  
  // Regular string
  return (
    <PropertyWrapper label={schema.title || ''} path={path}>
      <PropertyInput
        type="text"
        label=""
        value={value || ''}
        onChange={onChange}
        description={schema.description}
        path={path}
      />
    </PropertyWrapper>
  );
}