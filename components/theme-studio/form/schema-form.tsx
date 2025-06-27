'use client';

import { useCallback } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { PropertyInput } from './property-input';
import { PropertyWrapper } from './property-wrapper';
import { Card } from '@/components/ui/card';
import { FieldGroupCard } from '@/components/theme-studio/ui/field-group-card';
import { FillControl } from './controls';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { VisualPropertiesPanel } from './VisualPropertiesPanel';
import {
  StringSchemaField,
  NumberSchemaField,
  BooleanSchemaField,
  ColorSchemaField,
  ArraySchemaField,
  ObjectSchemaField,
  FontFamilyField,
  FontSizeField,
  FontWeightField
} from './fields';
import { 
  isColorProperty, 
  formatPropertyName,
  getContextualTitle 
} from '@/lib/theme-studio/utils/schema-form-utils';
import { COMMON_REFS } from '@/lib/theme-studio/utils/schema-form-constants';

interface SchemaFormProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path?: string[];
  level?: number;
  hideTitle?: boolean;
}

export function SchemaForm({
  schema,
  value,
  onChange,
  schemaLoader,
  path = [],
  level = 0,
  hideTitle = false,
}: SchemaFormProps) {
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  // Handle value updates
  const handleChange = useCallback((newValue: any) => {
    onChange(newValue);
    // Track the change
    if (path.length > 0) {
      trackChangeRef(path);
    }
  }, [onChange, path, trackChangeRef]);
  
  // Memoize the star property change handler
  const handleStarPropertyChange = useCallback((newValue: any) => {
    // When updating, wrap in the * property if needed
    if (path.length >= 2 && path[0] === 'visualStyles') {
      handleChange({ '*': newValue });
    } else {
      handleChange(newValue);
    }
  }, [path, handleChange]);

  // Handle visual style wrapper (e.g., { properties: { "*": { "$ref": "#/definitions/visual-lineChart" } } })
  if (schema.type === 'object' && schema.properties?.['*'] && Object.keys(schema.properties).length === 1) {
    const starProperty = schema.properties['*'];
    if (starProperty.$ref) {
      const resolvedSchema = schemaLoader.resolveRef(starProperty.$ref);
      if (resolvedSchema) {
        // Check if this is a visual definition with allOf or a page/report/filter schema
        if (resolvedSchema.allOf && resolvedSchema.allOf.length >= 1) {
          // Check if this is a page/report/filter type (which have allOf with single element)
          // or a visual type (which have allOf with multiple elements)
          const isCanvasType = path.length >= 2 && ['page', 'report', 'filter'].includes(path[1]);
          
          if (resolvedSchema.allOf.length > 1 || isCanvasType) {
            // Render visual properties directly
            return (
              <VisualPropertiesPanel
                schema={resolvedSchema}
                value={value['*'] || value || {}}
                onChange={handleStarPropertyChange}
                schemaLoader={schemaLoader}
                path={[...path, '*']}
                level={level}
              />
            );
          }
        }
        
        // Not a visual definition, render normally
        return (
          <SchemaForm
            schema={resolvedSchema}
            value={value['*'] || value || {}}
            onChange={handleStarPropertyChange}
            schemaLoader={schemaLoader}
            path={[...path, '*']}
            level={level}
            hideTitle={hideTitle}
          />
        );
      } else {
        // console.error('Failed to resolve visual schema:', starProperty.$ref);
      }
    }
  }

  // Handle $ref resolution
  if (schema.$ref) {
    // Check if this is a fill reference
    if (schema.$ref === COMMON_REFS.FILL) {
      return (
        <FillControl
          label={schema.title || 'Color'}
          value={value}
          onChange={handleChange}
          description={schema.description}
          required={schema.required?.includes(path[path.length - 1])}
          path={path}
          inline={true}
        />
      );
    }
    
    const resolvedSchema = schemaLoader.resolveRef(schema.$ref);
    if (!resolvedSchema) {
      return <div className="text-red-500 text-sm">Unable to resolve reference: {schema.$ref}</div>;
    }
    
    // Check if this is an image reference that needs special handling
    const refName = schema.$ref.split('/').pop();
    const isImageRef = refName === 'image';
    
    // Merge title and description from the reference
    const mergedSchema = {
      ...resolvedSchema,
      title: schema.title || (isImageRef && !schema.title ? 'Image Settings' : resolvedSchema.title),
      description: schema.description || resolvedSchema.description,
    };
    
    // If this is an image object, wrap it in a field group card for better visual grouping
    if (isImageRef && resolvedSchema.properties?.name && resolvedSchema.properties?.url) {
      return (
        <FieldGroupCard
          title="Image Settings"
          accentColor="text-blue-600"
        >
          <SchemaForm
            schema={mergedSchema}
            value={value}
            onChange={handleChange}
            schemaLoader={schemaLoader}
            path={path}
            level={level}
            hideTitle={true}
          />
        </FieldGroupCard>
      );
    }
    
    return (
      <SchemaForm
        schema={mergedSchema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
      />
    );
  }

  // Handle allOf
  if (schema.allOf) {
    const mergedProperties: Record<string, SchemaProperty> = {};
    
    for (const subSchema of schema.allOf) {
      let resolvedSubSchema = subSchema;
      
      if (subSchema.$ref) {
        const resolved = schemaLoader.resolveRef(subSchema.$ref);
        if (resolved) {
          resolvedSubSchema = resolved;
        }
      }
      
      if (resolvedSubSchema.properties) {
        Object.assign(mergedProperties, resolvedSubSchema.properties);
      }
    }
    
    const mergedSchema: SchemaProperty = {
      type: 'object',
      properties: mergedProperties,
      required: schema.required,
    };
    
    return (
      <SchemaForm
        schema={mergedSchema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
      />
    );
  }

  // Handle oneOf with const values (enum-like pattern for non-string types)
  if (schema.oneOf && schema.type && schema.type !== 'string') {
    // Check if all options have const values (enum-like behavior)
    const allHaveConst = schema.oneOf.every(option => 'const' in option);
    
    if (allHaveConst) {
      // This is an enum-like oneOf, render as a select
      if (schema.type === 'integer' || schema.type === 'number') {
        // Render inline select for numeric enums
        return (
          <PropertyWrapper label={schema.title || ''} path={path} inline={true}>
            <select
              value={value !== null && value !== undefined ? value : ''}
              onChange={(e) => {
                const newValue = e.target.value;
                // Convert to number for integer/number types
                handleChange(newValue === '' ? null : Number(newValue));
              }}
              className="w-full h-6 rounded border border-gray-200 bg-white px-2 py-0 text-[11px] focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              title={schema.description}
            >
              {!schema.required?.includes(path[path.length - 1]) && (
                <option value="">Select...</option>
              )}
              {schema.oneOf.map((option: any) => (
                <option key={option.const} value={option.const}>
                  {option.title || option.const}
                </option>
              ))}
            </select>
          </PropertyWrapper>
        );
      }
    }
  }

  // Handle oneOf - but not for simple string enums (those are handled in the string type section)
  if (schema.oneOf && schema.type !== 'string') {
    // Determine which schema to use based on the current value
    let selectedIndex = 0;
    let selectedSchema = schema.oneOf[0];
    
    // Try to match the value to the appropriate schema
    schema.oneOf?.forEach((option, index) => {
      if (option.type === 'array' && Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === typeof value) {
        selectedIndex = index;
        selectedSchema = option;
      }
    });
    
    // Show a selector for oneOf options
    return (
      <div className="space-y-1">
        {!hideTitle && schema.title && (
          <h4 className="text-xs font-semibold text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-[10px] text-gray-500 leading-relaxed">{schema.description}</p>
        )}
        <PropertyInput
          type="select"
          label="Option"
          value={String(selectedIndex)}
          onChange={(newIndex) => {
            const index = parseInt(newIndex as string);
            const newSchema = schema.oneOf?.[index];
            if (!newSchema) return;
            // Reset value when switching options
            if (newSchema.type === 'array') {
              handleChange([]);
            } else if (newSchema.type === 'object') {
              handleChange({});
            } else if (newSchema.type === 'string') {
              handleChange('');
            } else if (newSchema.type === 'number') {
              handleChange(0);
            } else if (newSchema.type === 'boolean') {
              handleChange(false);
            }
          }}
          options={schema.oneOf?.map((option, index) => ({
            value: String(index),
            label: option.title || (option.type ? formatPropertyName(Array.isArray(option.type) ? option.type[0] : option.type) : `Option ${index + 1}`),
          })) || []}
          path={[...path, '_option']}
        />
        <SchemaForm
          schema={selectedSchema}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={true}
        />
      </div>
    );
  }

  // Handle anyOf
  if (schema.anyOf) {
    // Determine which schema to use based on the current value
    let selectedIndex = 0;
    let selectedSchema = schema.anyOf[0];
    
    // Try to match the value to the appropriate schema
    schema.anyOf?.forEach((option, index) => {
      if (option.type === 'array' && Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
        selectedIndex = index;
        selectedSchema = option;
      } else if (option.type === typeof value) {
        selectedIndex = index;
        selectedSchema = option;
      }
    });
    
    // If we have multiple options with different types, show a selector
    const hasMultipleTypes = schema.anyOf.length > 1 && 
      new Set(schema.anyOf.map(s => s.type)).size > 1;
    
    return (
      <div className="space-y-1">
        {!hideTitle && schema.title && (
          <h4 className="text-xs font-semibold text-gray-700">{schema.title}</h4>
        )}
        {schema.description && (
          <p className="text-[10px] text-gray-500 leading-relaxed">{schema.description}</p>
        )}
        {hasMultipleTypes && (
          <PropertyInput
            type="select"
            label="Type"
            value={String(selectedIndex)}
            onChange={(newIndex) => {
              const index = parseInt(newIndex as string);
              const newSchema = schema.anyOf?.[index];
              if (!newSchema) return;
              // Reset value when switching types
              if (newSchema.type === 'array') {
                handleChange([]);
              } else if (newSchema.type === 'object') {
                handleChange({});
              } else if (newSchema.type === 'string') {
                handleChange('');
              } else if (newSchema.type === 'number') {
                handleChange(0);
              } else if (newSchema.type === 'boolean') {
                handleChange(false);
              }
            }}
            options={schema.anyOf?.map((option, index) => ({
              value: String(index),
              label: option.type ? formatPropertyName(Array.isArray(option.type) ? option.type[0] : option.type) : `Option ${index + 1}`,
            })) || []}
            path={[...path, '_type']}
          />
        )}
        <SchemaForm
          schema={selectedSchema}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={true}
        />
      </div>
    );
  }

  // Handle array types
  if (schema.type === 'array') {
    return (
      <ArraySchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
        SchemaForm={SchemaForm}
      />
    );
  }

  // Handle objects
  if (schema.type === 'object') {
    return (
      <ObjectSchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
        hideTitle={hideTitle}
        SchemaForm={SchemaForm}
        VisualPropertiesRenderer={VisualPropertiesPanel}
      />
    );
  }

  // Handle color properties
  if (isColorProperty(schema, path[path.length - 1])) {
    return (
      <ColorSchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        path={path}
        inline={true}
      />
    );
  }

  // Handle font properties
  const propertyName = path[path.length - 1];
  if (propertyName && (schema.type === 'string' || schema.type === 'number')) {
    // Font family detection
    if (propertyName === 'fontFamily' || propertyName.endsWith('FontFamily')) {
      return (
        <FontFamilyField
          schema={schema}
          value={value}
          onChange={handleChange}
          path={path}
        />
      );
    }
    
    // Font size detection
    if ((propertyName === 'fontSize' || propertyName.endsWith('FontSize')) && schema.type === 'number') {
      return (
        <FontSizeField
          schema={schema}
          value={value}
          onChange={handleChange}
          path={path}
        />
      );
    }
    
    // Font weight detection
    if (propertyName === 'fontWeight' || propertyName.endsWith('FontWeight')) {
      // Get the parent object to find fontFamily
      // The value here is the fontWeight value itself, we need to look at the parent
      // We'll need to pass this through props or context in a real implementation
      // For now, default to Segoe UI
      return (
        <FontWeightField
          schema={schema}
          value={value}
          onChange={handleChange}
          path={path}
          fontFamily={'Segoe UI'} // TODO: Get from parent context
        />
      );
    }
  }

  // Handle primitive types
  if (schema.type === 'string') {
    return (
      <StringSchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        path={path}
        inline={true}
      />
    );
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    return (
      <NumberSchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        path={path}
        hideTitle={hideTitle}
        inline={true}
      />
    );
  }

  if (schema.type === 'boolean') {
    return (
      <BooleanSchemaField
        schema={schema}
        value={value}
        onChange={handleChange}
        path={path}
        hideTitle={hideTitle}
        inline={true}
      />
    );
  }

  // Handle mixed type arrays (e.g., ["number", "string"])
  if (Array.isArray(schema.type)) {
    // For mixed types, default to string input
    // This handles cases like "end" which can be number or string
    return (
      <PropertyInput
        type="text"
        label={schema.title || ''}
        value={value?.toString() || ''}
        onChange={(newValue) => {
          // Try to parse as number first
          const numValue = parseFloat(newValue);
          if (!isNaN(numValue) && schema.type?.includes('number')) {
            handleChange(numValue);
          } else {
            handleChange(newValue);
          }
        }}
        description={schema.description}
        path={path}
      />
    );
  }

  // Try to infer type from schema structure if no explicit type
  if (!schema.type) {
    // Check if it has properties (object-like)
    if (schema.properties) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'object' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
    
    // Check if it has items (array-like)
    if (schema.items) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'array' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
    
    // Check if it has enum (likely string)
    if (schema.enum) {
      return (
        <SchemaForm
          schema={{ ...schema, type: 'string' }}
          value={value}
          onChange={handleChange}
          schemaLoader={schemaLoader}
          path={path}
          level={level}
          hideTitle={hideTitle}
        />
      );
    }
  }

  // Unsupported type
  return (
    <div className="text-gray-500 text-sm">
      Unsupported schema type: {JSON.stringify(schema.type || 'undefined')}
      {schema.title && <div className="text-xs">Property: {schema.title}</div>}
    </div>
  );
}