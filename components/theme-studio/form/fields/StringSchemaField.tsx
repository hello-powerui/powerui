'use client';

import { PropertyInput } from '../property-input';
import { PropertyWrapper } from '../property-wrapper';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';

interface StringSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  inline?: boolean;
}

export function StringSchemaField({ schema, value, onChange, path, inline = true }: StringSchemaFieldProps) {
  // Check for oneOf pattern (common in Power BI schemas)
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    if (inline) {
      return (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 w-[110px] flex-shrink-0">
            {schema.title || ''}
          </label>
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 h-6 rounded border border-gray-200 bg-white px-2 py-0 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            title={schema.description}
          >
            {schema.oneOf.map(option => (
              <option key={option.const || option.enum?.[0] || ''} value={option.const || option.enum?.[0] || ''}>
                {option.title || option.const || option.enum?.[0] || ''}
              </option>
            ))}
          </select>
        </div>
      );
    }
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
    if (inline) {
      return (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 w-[110px] flex-shrink-0">
            {schema.title || ''}
          </label>
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 h-6 rounded border border-gray-200 bg-white px-2 py-0 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            title={schema.description}
          >
            {schema.enum.map(val => (
              <option key={String(val)} value={String(val)}>
                {String(val)}
              </option>
            ))}
          </select>
        </div>
      );
    }
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
  if (inline) {
    return (
      <PropertyWrapper label={schema.title || ''} path={path} inline={true}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-6 rounded border border-gray-200 bg-white px-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          title={schema.description}
        />
      </PropertyWrapper>
    );
  }
  
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