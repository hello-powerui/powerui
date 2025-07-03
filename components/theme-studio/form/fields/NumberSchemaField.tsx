'use client';

import { NumberControl } from '../controls';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { isPercentageProperty } from '@/lib/theme-studio/utils/schema-form-utils';

interface NumberSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  hideTitle?: boolean;
  inline?: boolean;
}

export function NumberSchemaField({ schema, value, onChange, path, hideTitle, inline = true }: NumberSchemaFieldProps) {
  // Check if this is a percentage field
  const isPercentage = isPercentageProperty(schema);
  
  return (
    <NumberControl
      label={schema.title || ''}
      value={value || 0}
      onChange={onChange}
      min={schema.minimum}
      max={schema.maximum}
      step={1}
      description={schema.description}
      path={path}
      isPercentage={isPercentage}
      inline={inline}
    />
  );
}