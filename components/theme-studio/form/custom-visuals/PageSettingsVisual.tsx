'use client';

import React from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaForm } from '../schema-form';

interface PageSettingsVisualProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
}

// Define the sections and their properties
const PAGE_SECTIONS = [
  {
    title: 'Default Settings',
    properties: ['*'],
    description: 'Core page configuration'
  },
  {
    title: 'Layout & Display',
    properties: ['displayArea', 'pageSize'],
    description: 'Page alignment and canvas settings'
  },
  {
    title: 'Visual Elements',
    properties: ['background', 'outspace'],
    description: 'Page background and wallpaper'
  },
  {
    title: 'Interactive Components',
    properties: ['filterCard', 'outspacePane'],
    description: 'Filter cards and filter pane settings'
  },
  {
    title: 'Page Features',
    properties: ['pageInformation', 'pageRefresh', 'personalizeVisual'],
    description: 'Additional page functionality'
  }
];

export function PageSettingsVisual({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level
}: PageSettingsVisualProps) {
  // Get the actual properties from the schema
  const starProperty = schema.properties?.['*'];
  if (!starProperty) {
    return <SchemaForm schema={schema} value={value} onChange={onChange} schemaLoader={schemaLoader} path={path} level={level} />;
  }

  let properties = null;
  if (starProperty.allOf?.[0]?.properties) {
    properties = starProperty.allOf[0].properties;
  } else if (starProperty.$ref) {
    const resolved = schemaLoader.resolveRef(starProperty.$ref);
    if (resolved?.allOf?.[0]?.properties) {
      properties = resolved.allOf[0].properties;
    }
  }

  if (!properties) {
    return <SchemaForm schema={schema} value={value} onChange={onChange} schemaLoader={schemaLoader} path={path} level={level} />;
  }

  const starValue = value?.['*'] || {};

  return (
    <div className="space-y-6">
      {PAGE_SECTIONS.map((section, sectionIndex) => {
        // Check if any properties in this section exist
        const sectionProperties = section.properties.filter(prop => properties[prop]);
        if (sectionProperties.length === 0) return null;

        return (
          <div key={section.title}>
            {sectionIndex > 0 && <hr className="mb-6 border-gray-200" />}
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900">{section.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
            </div>

            <div className="space-y-4">
              {sectionProperties.map(propKey => {
                const propSchema = properties[propKey];
                if (!propSchema) return null;

                return (
                  <div key={propKey} className="pl-4">
                    <SchemaForm
                      schema={propSchema}
                      value={starValue[propKey]}
                      onChange={(newValue: any) => {
                        onChange({
                          ...value,
                          '*': {
                            ...starValue,
                            [propKey]: newValue
                          }
                        });
                      }}
                      schemaLoader={schemaLoader}
                      path={[...path, '*', propKey]}
                      level={level + 1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}