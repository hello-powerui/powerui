'use client';

import { BooleanControl } from '../controls';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';

interface BooleanSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  hideTitle?: boolean;
  inline?: boolean;
}

export function BooleanSchemaField({ schema, value, onChange, path, hideTitle, inline = true }: BooleanSchemaFieldProps) {
  return (
    <BooleanControl
      label={schema.title || ''}
      value={value || false}
      onChange={onChange}
      description={schema.description}
      path={path}
      inline={inline}
    />
  );
}