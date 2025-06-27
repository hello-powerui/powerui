'use client';

import React from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaForm } from './schema-form';
import { CollapsibleSection } from '../ui/collapsible-section';
import { hasActualContent } from '@/lib/utils/theme-helpers';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';

interface PageSettingsPanelProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  basePath: string[];
  trackChange: (path: string[]) => void;
}

// Define the page sections with their property mappings
const PAGE_SECTIONS = [
  { 
    key: 'background', 
    title: 'Page Background', 
    propertyKey: 'background',
    tooltip: 'Configure page background color, images, and transparency'
  },
  { 
    key: 'displayArea', 
    title: 'Page Alignment', 
    propertyKey: 'displayArea',
    tooltip: 'Control page alignment and display area settings'
  },
  { 
    key: 'filterCard', 
    title: 'Filter Cards', 
    propertyKey: 'filterCard',
    tooltip: 'Customize filter card appearance for Applied and Available states'
  },
  { 
    key: 'outspace', 
    title: 'Wallpaper', 
    propertyKey: 'outspace',
    tooltip: 'Set wallpaper and outspace styling'
  },
  { 
    key: 'outspacePane', 
    title: 'Filter Pane', 
    propertyKey: 'outspacePane',
    tooltip: 'Configure the filter pane appearance'
  },
  { 
    key: 'pageInformation', 
    title: 'Page Information', 
    propertyKey: 'pageInformation',
    tooltip: 'Manage page information display settings'
  },
  { 
    key: 'pageRefresh', 
    title: 'Page Refresh', 
    propertyKey: 'pageRefresh',
    tooltip: 'Control page refresh behavior and appearance'
  },
  { 
    key: 'pageSize', 
    title: 'Canvas Settings', 
    propertyKey: 'pageSize',
    tooltip: 'Set canvas size and dimensions'
  },
  { 
    key: 'personalizeVisual', 
    title: 'Personalize Visual', 
    propertyKey: 'personalizeVisual',
    tooltip: 'Enable visual personalization features'
  }
];

export function PageSettingsPanel({
  schema,
  value,
  onChange,
  schemaLoader,
  basePath,
  trackChange
}: PageSettingsPanelProps) {
  const getChangedPropertiesCount = useThemeChanges(state => state.getChangedPropertiesCount);
  
  // Get the page properties from the schema
  const starProperty = schema.properties?.['*'];
  if (!starProperty) return null;
  
  let pageProperties = null;
  if (starProperty.allOf?.[0]?.properties) {
    pageProperties = starProperty.allOf[0].properties;
  } else if (starProperty.$ref) {
    const resolved = schemaLoader.resolveRef(starProperty.$ref);
    if (resolved?.allOf?.[0]?.properties) {
      pageProperties = resolved.allOf[0].properties;
    }
  }
  
  if (!pageProperties) return null;
  
  // Get the current value (should be in value.*)
  const starValue = value?.['*'] || {};
  
  // Handler for updating a specific section
  const handleSectionChange = (propertyKey: string, newValue: any) => {
    const updatedValue = {
      ...value,
      '*': {
        ...starValue,
        [propertyKey]: newValue
      }
    };
    onChange(updatedValue);
    trackChange([...basePath, '*', propertyKey]);
  };
  
  // Handler for clearing a section
  const handleClearSection = (propertyKey: string) => {
    const updatedStarValue = { ...starValue };
    delete updatedStarValue[propertyKey];
    
    const updatedValue = {
      ...value,
      '*': updatedStarValue
    };
    onChange(updatedValue);
    trackChange([...basePath, '*', propertyKey]);
  };
  
  return (
    <div className="-space-y-px">
      {/* Default Settings Section - always show first */}
      {pageProperties['*'] && (
        <CollapsibleSection
          title="Default Settings"
          tooltip="Core page configuration and general settings"
          defaultOpen={false}
          onClear={hasActualContent(starValue['*']) ? () => handleClearSection('*') : undefined}
          hasContent={hasActualContent(starValue['*'])}
        >
          <SchemaForm
            schema={pageProperties['*']}
            value={starValue['*']}
            onChange={(newValue) => handleSectionChange('*', newValue)}
            schemaLoader={schemaLoader}
            path={[...basePath, '*', '*']}
            hideTitle={true}
          />
        </CollapsibleSection>
      )}
      
      {/* Other Page Sections */}
      {PAGE_SECTIONS.map((section) => {
        const sectionSchema = pageProperties[section.propertyKey];
        if (!sectionSchema) return null;
        
        const sectionValue = starValue[section.propertyKey];
        const sectionPath = [...basePath, '*', section.propertyKey];
        const changeCount = getChangedPropertiesCount(sectionPath);
        
        return (
          <CollapsibleSection
            key={section.key}
            title={section.title}
            tooltip={section.tooltip}
            defaultOpen={false}
            onClear={hasActualContent(sectionValue) ? () => handleClearSection(section.propertyKey) : undefined}
            hasContent={hasActualContent(sectionValue)}
          >
            <SchemaForm
              schema={sectionSchema}
              value={sectionValue}
              onChange={(newValue) => handleSectionChange(section.propertyKey, newValue)}
              schemaLoader={schemaLoader}
              path={sectionPath}
              hideTitle={true}
            />
          </CollapsibleSection>
        );
      })}
    </div>
  );
}