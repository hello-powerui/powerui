'use client';

import React, { useMemo, useCallback } from 'react';
import { ColorField } from './fields/ColorField';
import { NumberField } from './fields/NumberField';
import { TextField } from './fields/TextField';
import { BooleanField } from './fields/BooleanField';
import { SelectField } from './fields/SelectField';
import { ArrayField } from './fields/ArrayField';
import { ObjectField } from './fields/ObjectField';
import { ThemeEditorService } from '@/lib/services/theme-editor-service';
import { cn } from '@/lib/utils';

interface SchemaFormProps {
  schema: any;
  value: any;
  onChange: (value: any) => void;
  path?: string[];
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
}

export const SchemaForm: React.FC<SchemaFormProps> = ({
  schema,
  value,
  onChange,
  path = [],
  className,
  showLabels = true,
  compact = false,
}) => {
  // Resolve schema references
  const resolvedSchema = useMemo(() => {
    if (schema.$ref) {
      try {
        return ThemeEditorService.resolveReference(schema.$ref, schema);
      } catch (error) {
        console.error('Failed to resolve reference:', error);
        return schema;
      }
    }
    return schema;
  }, [schema]);

  // Get metadata for the field
  const metadata = useMemo(() => 
    ThemeEditorService.getPropertyMetadata(resolvedSchema, path),
    [resolvedSchema, path]
  );

  // Validate value
  const validation = useMemo(() => 
    ThemeEditorService.validateProperty(resolvedSchema, value, path),
    [resolvedSchema, value, path]
  );

  // Handle value changes with validation
  const handleChange = useCallback((newValue: any) => {
    const result = ThemeEditorService.validateProperty(resolvedSchema, newValue, path);
    if (result.valid) {
      onChange(newValue);
    }
  }, [resolvedSchema, path, onChange]);

  // Render based on schema type
  const renderField = () => {
    const fieldProps = {
      name: path.join('.') || 'field',
      value: value ?? ThemeEditorService.generateDefaultValue(resolvedSchema),
      onChange: handleChange,
      error: validation.valid ? undefined : validation.error,
      label: metadata?.label || path[path.length - 1] || 'Field',
      description: metadata?.description,
      required: resolvedSchema.required,
      disabled: resolvedSchema.readOnly,
    };

    // Handle enums
    if (resolvedSchema.enum) {
      return (
        <SelectField
          {...fieldProps}
          options={resolvedSchema.enum.map((val: any) => ({
            value: val,
            label: String(val),
          }))}
        />
      );
    }

    // Handle specific types
    switch (resolvedSchema.type) {
      case 'string':
        // Check for color-related fields
        if (path.some(p => p.toLowerCase().includes('color')) ||
            resolvedSchema.format === 'color') {
          return <ColorField {...fieldProps} />;
        }
        return <TextField {...fieldProps} />;

      case 'number':
      case 'integer':
        return (
          <NumberField
            {...fieldProps}
            min={resolvedSchema.minimum}
            max={resolvedSchema.maximum}
            step={resolvedSchema.multipleOf}
          />
        );

      case 'boolean':
        return <BooleanField {...fieldProps} />;

      case 'array':
        return (
          <ArrayField
            {...fieldProps}
            itemSchema={resolvedSchema.items}
            minItems={resolvedSchema.minItems}
            maxItems={resolvedSchema.maxItems}
          />
        );

      case 'object':
        return (
          <ObjectField
            {...fieldProps}
            properties={resolvedSchema.properties}
            required={resolvedSchema.required}
          />
        );

      default:
        return (
          <div className="text-sm text-muted-foreground">
            Unsupported type: {resolvedSchema.type}
          </div>
        );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {renderField()}
    </div>
  );
};

// Re-export for backward compatibility
export default SchemaForm;