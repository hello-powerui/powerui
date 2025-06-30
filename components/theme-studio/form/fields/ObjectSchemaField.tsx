'use client';

import { useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { FieldGroupCard } from '@/components/theme-studio/ui/field-group-card';
import { ConnectedProperty } from '@/components/theme-studio/ui/connected-property';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';

interface ObjectSchemaFieldProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hideTitle?: boolean;
  SchemaForm: React.ComponentType<any>;
  VisualPropertiesRenderer?: React.ComponentType<any>;
  isVisualContext?: boolean;
}

export function ObjectSchemaField({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hideTitle,
  SchemaForm,
  VisualPropertiesRenderer,
  isVisualContext
}: ObjectSchemaFieldProps) {
  const objectValue = useMemo(() => {
    const val = typeof value === 'object' && value !== null ? value : {};
    // For image objects, ensure name is always set
    if (schema.properties?.name && schema.properties?.url && !val.name) {
      return { ...val, name: 'image' };
    }
    return val;
  }, [value, schema.properties]);
  
  // Check if this is an image object
  const isImageObject = schema.properties && 
    schema.properties.name && 
    schema.properties.url;
  
  // Memoize the property change handler
  const handlePropertyChange = useCallback((propName: string, newValue: any) => {
    // For image objects, when URL is set, automatically set name to "image"
    if (isImageObject && propName === 'url' && newValue) {
      onChange({ 
        ...objectValue, 
        [propName]: newValue,
        name: objectValue.name || 'image'
      });
    } else {
      onChange({ ...objectValue, [propName]: newValue });
    }
  }, [objectValue, onChange, isImageObject]);
  
  // Check if this is a visual style object with a "*" property that has a $ref
  const starProperty = schema.properties?.['*'];
  if (starProperty && starProperty.$ref) {
    // This is likely a visual style wrapper - resolve the reference and render the actual visual
    const resolvedVisualSchema = schemaLoader.resolveRef(starProperty.$ref);
    if (resolvedVisualSchema) {
      // The value should be under the "*" key
      const starValue = objectValue['*'] || {};
      
      // Check if the resolved schema has allOf with visual properties
      if (resolvedVisualSchema.allOf && resolvedVisualSchema.allOf.length > 1 && VisualPropertiesRenderer) {
        // This is a visual definition - render the visual properties
        return (
          <VisualPropertiesRenderer
            schema={resolvedVisualSchema}
            value={starValue}
            onChange={(newValue: any) => onChange({ ...objectValue, '*': newValue })}
            schemaLoader={schemaLoader}
            path={[...path, '*']}
            level={level + 1}
          />
        );
      } else {
        return (
          <SchemaForm
            schema={resolvedVisualSchema}
            value={starValue}
            onChange={(newValue: any) => onChange({ ...objectValue, '*': newValue })}
            schemaLoader={schemaLoader}
            path={[...path, '*']}
            level={level + 1}
            hideTitle={hideTitle}
            isVisualContext={isVisualContext}
          />
        );
      }
    } else {
      // console.error('Failed to resolve visual schema:', starProperty.$ref);
    }
  }
  
  // Check if this is a visual definition (has allOf with visual-specific properties)
  const hasVisualAllOf = schema.allOf && 
                        Array.isArray(schema.allOf) && 
                        schema.allOf.length > 1 && 
                        schema.allOf[1] &&
                        'properties' in schema.allOf[1] &&
                        schema.allOf[1].properties &&
                        !schema.allOf[1].properties['*'];
  
  if (hasVisualAllOf && VisualPropertiesRenderer) {
    // Render visual properties using schema-defined sections
    return (
      <VisualPropertiesRenderer
        schema={schema}
        value={objectValue}
        onChange={onChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
      />
    );
  }
  
  // Check if this is a property section (array items with properties)
  const isPropertySection = path.length >= 2 && level >= 2;
  
  // Check if this object needs special visual grouping (like image properties)
  const needsVisualGrouping = schema.properties && (
    (schema.properties.name && schema.properties.url) || // Image object
    (schema.required?.includes('name') && schema.required?.includes('url'))
  );
  
  // Render fields function
  const renderFields = () => {
    let entries = Object.entries(schema.properties || {});
    
    // For image objects, filter out the name field
    if (isImageObject) {
      entries = entries.filter(([propName]) => propName !== 'name');
    }
    
    // If this needs visual grouping, wrap each property with ConnectedProperty
    if (needsVisualGrouping && !hideTitle) {
      return (
        <div className="relative">
          {entries.map(([propName, propSchema], index) => {
            const fullPath = [...path, propName];
            const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
            
            return (
              <ConnectedProperty
                key={propName}
                isLast={index === entries.length - 1}
                isNested={true}
              >
                <SchemaForm
                  schema={{ ...propSchema, title: contextualTitle }}
                  value={objectValue[propName]}
                  onChange={(newValue: any) => handlePropertyChange(propName, newValue)}
                  schemaLoader={schemaLoader}
                  path={fullPath}
                  level={level + 1}
                  hideTitle={false}
                  isVisualContext={isVisualContext}
                />
              </ConnectedProperty>
            );
          })}
        </div>
      );
    }
    
    // Regular rendering without ConnectedProperty
    return (
      <div className="space-y-3">
        {entries.map(([propName, propSchema]) => {
          const fullPath = [...path, propName];
          const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
          
          return (
            <SchemaForm
              key={propName}
              schema={{ ...propSchema, title: contextualTitle }}
              value={objectValue[propName]}
              onChange={(newValue: any) => handlePropertyChange(propName, newValue)}
              schemaLoader={schemaLoader}
              path={fullPath}
              level={level + 1}
              hideTitle={false}
              isVisualContext={isVisualContext}
            />
          );
        })}
      </div>
    );
  };
  
  if (isPropertySection) {
    // Render individual property fields inline
    return renderFields();
  }
  
  // If this needs visual grouping, wrap in a field group card
  if (needsVisualGrouping && !hideTitle) {
    return (
      <FieldGroupCard
        title={schema.title || "Image Settings"}
        accentColor="text-blue-600"
      >
        {renderFields()}
      </FieldGroupCard>
    );
  }
  
  // Default object rendering for other cases
  return renderFields();
}