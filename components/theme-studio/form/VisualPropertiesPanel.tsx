'use client';

import { useState } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { formatGroupTitle, getImportantSections } from '@/lib/theme-studio/utils/schema-form-utils';
import { TAB_TYPES } from '@/lib/theme-studio/utils/schema-form-constants';
import { VisualPropertySection } from './VisualPropertySection';
import { customVisualComponents } from './custom-visuals';
import { THEME_STUDIO_TYPOGRAPHY } from '../constants/typography';
import { VisualStates } from './VisualStates';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

interface VisualPropertiesPanelProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
}

export function VisualPropertiesPanel({ 
  schema, 
  value, 
  onChange, 
  schemaLoader, 
  path, 
  level 
}: VisualPropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'specific' | 'general'>(TAB_TYPES.SPECIFIC);
  const hasChangesInSection = useThemeChanges(state => state.hasChangesInSection);
  const getChangedPropertiesCount = useThemeChanges(state => state.getChangedPropertiesCount);
  const selectedState = useThemeStudioStore(state => state.selectedState);
  const setSelectedState = useThemeStudioStore(state => state.setSelectedState);
  
  // Check if we have a custom component for this visual type
  // The path structure can be:
  // - ['visualStyles', 'actionButton', '*'] when coming from schema-form
  // - ['visualStyles', 'actionButton', '*', '*'] in other cases
  let visualType = '';
  if (path[0] === 'visualStyles' && path.length >= 2) {
    visualType = path[1];
  }
  const CustomVisualComponent = customVisualComponents[visualType];
  
  // Check if this visual has state-driven properties
  const hasStateDrivenProperties = visualType && schemaLoader?.visualHasStateDrivenProperties(visualType);
  
  // If we have a custom component, use it instead of generic rendering
  if (CustomVisualComponent) {
    return (
      <CustomVisualComponent
        schema={schema}
        value={value}
        onChange={onChange}
        schemaLoader={schemaLoader}
        path={path}
        level={level}
      />
    );
  }
  
  // For visual definitions, we want to process both commonCards and visual-specific properties
  let commonProperties: Record<string, SchemaProperty> = {};
  let visualProperties: Record<string, SchemaProperty> = {};
  
  if (schema.allOf && schema.allOf.length > 1) {
    // Get common properties from allOf[0] (commonCards)
    const commonSchema = schema.allOf[0];
    if (commonSchema.$ref === '#/definitions/commonCards') {
      // Resolve the commonCards reference
      const resolvedCommon = schemaLoader.resolveRef(commonSchema.$ref);
      if (resolvedCommon?.properties) {
        commonProperties = resolvedCommon.properties;
      }
    } else if (commonSchema.properties) {
      commonProperties = commonSchema.properties;
    }
    
    // Get visual-specific properties from allOf[1]
    const visualSchema = schema.allOf[1];
    if (visualSchema.properties) {
      visualProperties = visualSchema.properties;
    }
  } else if (schema.properties) {
    // Fallback if not allOf structure
    visualProperties = schema.properties;
  }
  
  const sections: { 
    name: string; 
    schema: SchemaProperty; 
    title: string; 
    isCommon?: boolean 
  }[] = [];
  
  // Collect common property sections (from commonCards)
  Object.entries(commonProperties).forEach(([propName, propSchema]) => {
    // Skip the '*' property - we'll handle it separately
    if (propName === '*') return;
    
    // Each property should be an array with items containing the actual form fields
    if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
      sections.push({
        name: propName,
        schema: propSchema,
        title: propSchema.title || formatGroupTitle(propName),
        isCommon: true
      });
    }
  });
  
  // Collect visual-specific property sections
  Object.entries(visualProperties).forEach(([propName, propSchema]) => {
    // Skip the '*' property (dynamic properties)
    if (propName === '*') return;
    
    // Each property should be an array with items containing the actual form fields
    if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
      sections.push({
        name: propName,
        schema: propSchema,
        title: propSchema.title || formatGroupTitle(propName),
        isCommon: false
      });
    }
  });
  
  // Sort sections by importance for the visual type
  const importantSections = getImportantSections();
  const sortedSections = sections.sort((a, b) => {
    // Common properties go last
    if (a.isCommon && !b.isCommon) return 1;
    if (!a.isCommon && b.isCommon) return -1;
    
    const aIndex = importantSections.indexOf(a.name);
    const bIndex = importantSections.indexOf(b.name);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.title.localeCompare(b.title);
  });
  
  // Split sections by type
  const specificSections = sortedSections.filter(s => !s.isCommon);
  const generalSections = sortedSections.filter(s => s.isCommon);
  
  return (
    <div className="space-y-2">
      {/* Tab navigation */}
      <div className="bg-gray-100 p-0.5 rounded-md">
        <nav className="flex space-x-0.5" aria-label="Tabs">
          <button
            onClick={() => setActiveTab(TAB_TYPES.SPECIFIC)}
            className={`
              flex-1 whitespace-nowrap py-1.5 px-3 rounded ${THEME_STUDIO_TYPOGRAPHY.button.weight} ${THEME_STUDIO_TYPOGRAPHY.button.size} transition-all
              ${activeTab === TAB_TYPES.SPECIFIC
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            Visual Properties
            {specificSections.length > 0 && (
              <span className={`ml-1.5 ${THEME_STUDIO_TYPOGRAPHY.metadata.size} ${activeTab === TAB_TYPES.SPECIFIC ? 'text-gray-300' : 'text-gray-500'}`}>
                ({specificSections.length})
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab(TAB_TYPES.GENERAL)}
            className={`
              flex-1 whitespace-nowrap py-1.5 px-3 rounded ${THEME_STUDIO_TYPOGRAPHY.button.weight} ${THEME_STUDIO_TYPOGRAPHY.button.size} transition-all
              ${activeTab === TAB_TYPES.GENERAL
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            General Properties
            {generalSections.length > 0 && (
              <span className={`ml-1.5 ${THEME_STUDIO_TYPOGRAPHY.metadata.size} ${activeTab === TAB_TYPES.GENERAL ? 'text-gray-300' : 'text-gray-500'}`}>
                ({generalSections.length})
              </span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-2">
        {activeTab === TAB_TYPES.SPECIFIC ? (
          <div>
            {/* Visual States - only shown in Visual Properties tab */}
            <VisualStates
              selectedState={selectedState}
              onSelectedStateChange={setSelectedState}
              hasStateDrivenProperties={hasStateDrivenProperties || false}
            >
              {specificSections.length > 0 && (
                <div className="-space-y-px">
                  {specificSections.map(({ name, schema: sectionSchema, title }) => (
                    <VisualPropertySection
                      key={name}
                      name={name}
                      schema={sectionSchema}
                      title={title}
                      value={value}
                      onChange={onChange}
                      schemaLoader={schemaLoader}
                      path={path}
                      level={level}
                      hasChanges={hasChangesInSection([...path, name])}
                      changedCount={getChangedPropertiesCount([...path, name])}
                    />
                  ))}
                </div>
              )}
            </VisualStates>
            {!hasStateDrivenProperties && specificSections.length > 0 && (
              <div className="-space-y-px">
                {specificSections.map(({ name, schema: sectionSchema, title }) => (
                  <VisualPropertySection
                    key={name}
                    name={name}
                    schema={sectionSchema}
                    title={title}
                    value={value}
                    onChange={onChange}
                    schemaLoader={schemaLoader}
                    path={path}
                    level={level}
                    hasChanges={hasChangesInSection([...path, name])}
                    changedCount={getChangedPropertiesCount([...path, name])}
                  />
                ))}
              </div>
            )}
            {specificSections.length === 0 && (
              <p className={`${THEME_STUDIO_TYPOGRAPHY.label.size} text-gray-500 text-center py-8`}>
                No visual-specific properties available for this visual type.
              </p>
            )}
          </div>
        ) : (
          <div className="-space-y-px">
            {generalSections.length > 0 ? (
              generalSections.map(({ name, schema: sectionSchema, title }) => (
                <VisualPropertySection
                  key={name}
                  name={name}
                  schema={sectionSchema}
                  title={title}
                  value={value}
                  onChange={onChange}
                  schemaLoader={schemaLoader}
                  path={path}
                  level={level}
                  hasChanges={hasChangesInSection([...path, name])}
                  changedCount={getChangedPropertiesCount([...path, name])}
                />
              ))
            ) : (
              <p className={`${THEME_STUDIO_TYPOGRAPHY.label.size} text-gray-500 text-center py-8`}>
                No general properties available for this visual type.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}