'use client';

import { NumberControl } from '../controls';
import { PropertyWrapper } from '../property-wrapper';
import { PropertyWithInheritance } from '../property-with-inheritance';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { isPercentageProperty } from '@/lib/theme-studio/utils/schema-form-utils';

interface NumberSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  hideTitle?: boolean;
}

export function NumberSchemaField({ schema, value, onChange, path, hideTitle }: NumberSchemaFieldProps) {
  const { selectedVisual, selectedVariant } = useThemeStudioStore();
  
  // Check if we're in a visual context (editing visual properties)
  const isVisualContext = path.length > 0 && (path[0] === 'visualStyles' || path.includes('*'));
  const shouldShowInheritance = isVisualContext && selectedVisual && selectedVisual !== '*';
  
  // Check if this is a percentage field
  const isPercentage = isPercentageProperty(schema);
  
  // Use inheritance wrapper in visual context
  if (shouldShowInheritance && path.length > 0) {
    // Extract the property path relative to the visual section
    const propertyPath = path.filter((segment) => {
      // Skip array indices and wildcard segments
      return segment !== '*' && segment !== '0' && !(/^\d+$/.test(segment));
    });
    
    return (
      <PropertyWithInheritance
        propertyName={path[path.length - 1]}
        propertyPath={propertyPath}
        value={value}
        onChange={onChange}
        schema={schema}
        visualType={selectedVisual}
        variant={selectedVariant}
      />
    );
  }
  
  return (
    <PropertyWrapper label="" path={path}>
      <NumberControl
        label={schema.title || ''}
        value={value || 0}
        onChange={onChange}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === 'integer' ? 1 : 0.01}
        description={schema.description}
        path={path}
        isPercentage={isPercentage}
      />
    </PropertyWrapper>
  );
}