'use client';

import { BooleanControl } from '../controls';
import { PropertyWrapper } from '../property-wrapper';
import { PropertyWithInheritance } from '../property-with-inheritance';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

interface BooleanSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  path: string[];
  hideTitle?: boolean;
}

export function BooleanSchemaField({ schema, value, onChange, path, hideTitle }: BooleanSchemaFieldProps) {
  const { selectedVisual, selectedVariant } = useThemeStudioStore();
  
  // Check if we're in a visual context (editing visual properties)
  const isVisualContext = path.length > 0 && (path[0] === 'visualStyles' || path.includes('*'));
  const shouldShowInheritance = isVisualContext && selectedVisual && selectedVisual !== '*';
  
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
      <BooleanControl
        label={schema.title || ''}
        value={value || false}
        onChange={onChange}
        description={schema.description}
        path={path}
      />
    </PropertyWrapper>
  );
}