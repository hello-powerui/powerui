'use client';

import { useState } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { CollapsibleSection } from '../../ui/collapsible-section';
import { StateAwarePropertySection } from '../fields/StateAwarePropertySection';
import { formatGroupTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { TAB_TYPES } from '@/lib/theme-studio/utils/schema-form-constants';
import { VisualStates } from '../VisualStates';

interface ActionButtonVisualProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
}

export function ActionButtonVisual({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level
}: ActionButtonVisualProps) {
  const [activeTab, setActiveTab] = useState<'specific' | 'general'>(TAB_TYPES.SPECIFIC);
  const hasChangesInSection = useThemeChanges(state => state.hasChangesInSection);
  const getChangedPropertiesCount = useThemeChanges(state => state.getChangedPropertiesCount);
  const globalSelectedState = useThemeStudioStore(state => state.selectedState) || 'default';
  const setSelectedState = useThemeStudioStore(state => state.setSelectedState);
  
  // Import SchemaForm here to avoid circular dependency
  const { SchemaForm } = require('../schema-form');
  
  // Extract properties from the schema
  let fillSchema: SchemaProperty | undefined;
  let textSchema: SchemaProperty | undefined;
  let visualSpecificProperties: Record<string, SchemaProperty> = {};
  let stateAwareProperties: Record<string, SchemaProperty> = {};
  let commonProperties: Record<string, SchemaProperty> = {};
  
  if (schema.allOf && schema.allOf.length > 0) {
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
    if (schema.allOf.length > 1) {
      const visualSchema = schema.allOf[1];
      if (visualSchema.properties) {
        fillSchema = visualSchema.properties.fill;
        textSchema = visualSchema.properties.text;
        
        // Categorize other visual-specific properties
        Object.entries(visualSchema.properties).forEach(([propName, propSchema]) => {
          if (propName !== 'fill' && propName !== 'text' && propName !== '*') {
            // Check if this property has state support (has $id in items.properties)
            const hasStateSupport = propSchema.type === 'array' && 
              propSchema.items?.type === 'object' && 
              propSchema.items?.properties?.$id !== undefined;
            
            if (hasStateSupport || 
                propName === 'glow' || 
                propName === 'icon' || 
                propName === 'outline' || 
                propName === 'shadow' ||
                propName === 'shape') {
              stateAwareProperties[propName] = propSchema;
            } else {
              visualSpecificProperties[propName] = propSchema;
            }
          }
        });
      }
    }
  }
  
  // Get fill show value - look for the show property in the fill array
  const fillShowValue = (() => {
    if (!value?.fill || !Array.isArray(value.fill)) return true;
    const showObject = value.fill.find((item: any) => !item.$id && 'show' in item);
    return showObject?.show ?? true;
  })();
  
  const handleFillShowChange = (newShow: boolean) => {
    let fillArray = Array.isArray(value?.fill) ? [...value.fill] : [];
    
    // Remove any existing show objects
    fillArray = fillArray.filter(item => !(item && !item.$id && 'show' in item));
    
    // Add the new show object
    fillArray.push({ show: newShow });
    
    onChange({ ...value, fill: fillArray });
  };
  
  // Get text show value - look for the show property in the text array
  const textShowValue = (() => {
    if (!value?.text || !Array.isArray(value.text)) return true;
    const showObject = value.text.find((item: any) => !item.$id && 'show' in item);
    return showObject?.show ?? true;
  })();
  
  const handleTextShowChange = (newShow: boolean) => {
    let textArray = Array.isArray(value?.text) ? [...value.text] : [];
    
    // Remove any existing show objects
    textArray = textArray.filter(item => !(item && !item.$id && 'show' in item));
    
    // Add the new show object
    textArray.push({ show: newShow });
    
    onChange({ ...value, text: textArray });
  };

  // Remove 'show' from fill schema to avoid duplication since we handle it separately
  const fillSchemaWithoutShow = fillSchema ? {
    ...fillSchema,
    items: fillSchema.items ? {
      ...fillSchema.items,
      properties: fillSchema.items.properties ? Object.fromEntries(
        Object.entries(fillSchema.items.properties).filter(([key]) => key !== 'show')
      ) : {}
    } : undefined
  } : undefined;
  
  // Remove 'show' from text schema to avoid duplication since we handle it separately
  const textSchemaWithoutShow = textSchema ? {
    ...textSchema,
    items: textSchema.items ? {
      ...textSchema.items,
      properties: textSchema.items.properties ? Object.fromEntries(
        Object.entries(textSchema.items.properties).filter(([key]) => key !== 'show')
      ) : {}
    } : undefined
  } : undefined;

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="bg-gray-100 p-1 rounded-md">
        <nav className="flex space-x-1" aria-label="Tabs">
          <button
            onClick={() => setActiveTab(TAB_TYPES.SPECIFIC)}
            className={`
              flex-1 whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all
              ${activeTab === TAB_TYPES.SPECIFIC
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            Visual Properties
          </button>
          <button
            onClick={() => setActiveTab(TAB_TYPES.GENERAL)}
            className={`
              flex-1 whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all
              ${activeTab === TAB_TYPES.GENERAL
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }
            `}
          >
            General Properties
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-4">
        {activeTab === TAB_TYPES.SPECIFIC ? (
          <div className="space-y-4">
            {/* Fill and Text toggles - separated from Visual State controls 
                Note: Both fill and text toggles are placed at the top level because in Power BI's action button,
                the "show" property for both is not state-dependent (unlike other properties).
                This means the button either has a fill/text or doesn't, regardless of state.
                The appearance (color, size, etc.) is what changes per state. */}
            
            {/* Compact toggles for fill and text */}
            <div className="space-y-2">
              {/* Fill toggle */}
              {fillSchema && (
                <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Button Fill</span>
                  <SchemaForm
                    schema={{ type: 'boolean', title: '' }}
                    value={fillShowValue}
                    onChange={handleFillShowChange}
                    schemaLoader={schemaLoader}
                    path={[...path, 'fill', 'show']}
                    level={level + 1}
                    hideTitle={true}
                  />
                </div>
              )}
              
              {/* Text toggle */}
              {textSchema && (
                <div className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Button Text</span>
                  <SchemaForm
                    schema={{ type: 'boolean', title: '' }}
                    value={textShowValue}
                    onChange={handleTextShowChange}
                    schemaLoader={schemaLoader}
                    path={[...path, 'text', 'show']}
                    level={level + 1}
                    hideTitle={true}
                  />
                </div>
              )}
            </div>
            
            {/* Visual States selector with state-aware properties */}
            <VisualStates
              selectedState={globalSelectedState}
              onSelectedStateChange={setSelectedState}
              hasStateDrivenProperties={true}
            >
              <div className="-space-y-px">
            
                {/* Fill Properties (state-aware) - using schema without show */}
                {fillSchemaWithoutShow && fillShowValue && (
                  <CollapsibleSection
                    id={`${path.join('-')}-fill`}
                    title="Fill Properties"
                    defaultOpen={false}
                    hasChanges={hasChangesInSection([...path, 'fill'])}
                    changedCount={getChangedPropertiesCount([...path, 'fill'])}
                  >
                <StateAwarePropertySection
                  schema={fillSchemaWithoutShow}
                  value={value?.fill}
                  onChange={(newValue: any) => onChange({ ...value, fill: newValue })}
                  schemaLoader={schemaLoader}
                  path={[...path, 'fill']}
                  level={level + 1}
                  hideTitle={true}
                  SchemaForm={SchemaForm}
                />
                  </CollapsibleSection>
                )}
                
                {/* Text Properties (state-aware) - using schema without show */}
                {textSchemaWithoutShow && textShowValue && (
                  <CollapsibleSection
                    id={`${path.join('-')}-text`}
                    title="Text Properties"
                    defaultOpen={false}
                    hasChanges={hasChangesInSection([...path, 'text'])}
                    changedCount={getChangedPropertiesCount([...path, 'text'])}
                  >
                <StateAwarePropertySection
                  schema={textSchemaWithoutShow}
                  value={value?.text}
                  onChange={(newValue: any) => onChange({ ...value, text: newValue })}
                  schemaLoader={schemaLoader}
                  path={[...path, 'text']}
                  level={level + 1}
                  hideTitle={true}
                  SchemaForm={SchemaForm}
                />
                  </CollapsibleSection>
                )}
                
                {/* Other State-Aware Properties */}
                {Object.entries(stateAwareProperties).map(([propName, propSchema]) => {
              // For shape property, we need to add $id support to the schema
              let modifiedSchema = propSchema;
              if (propName === 'shape' && propSchema.items?.properties) {
                modifiedSchema = {
                  ...propSchema,
                  items: {
                    ...propSchema.items,
                    properties: {
                      $id: {
                        type: 'string',
                        anyOf: [
                          {
                            enum: ['default', 'hover', 'selected', 'disabled']
                          },
                          {
                            pattern: '^[A-Za-z0-9]+$'
                          }
                        ]
                      },
                      ...propSchema.items.properties
                    }
                  }
                };
              }
              
                  return (
                    <CollapsibleSection
                      key={propName}
                      id={`${path.join('-')}-${propName}`}
                      title={propSchema.title || formatGroupTitle(propName)}
                      defaultOpen={false}
                      hasChanges={hasChangesInSection([...path, propName])}
                      changedCount={getChangedPropertiesCount([...path, propName])}
                    >
                  <StateAwarePropertySection
                    schema={modifiedSchema}
                    value={value?.[propName]}
                    onChange={(newValue: any) => onChange({ ...value, [propName]: newValue })}
                    schemaLoader={schemaLoader}
                    path={[...path, propName]}
                    level={level + 1}
                    hideTitle={true}
                    SchemaForm={SchemaForm}
                  />
                    </CollapsibleSection>
                  );
                })}
              </div>
            </VisualStates>
            
            {/* Visual-Specific Properties (non-state-aware) */}
            {Object.keys(visualSpecificProperties).length > 0 && (
              <div className="space-y-1 mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Other Button Properties</h4>
                {Object.entries(visualSpecificProperties).map(([propName, propSchema]) => {
                  const sectionValue = Array.isArray(value[propName]) ? value[propName] : [{}];
                  const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
                  
                  return (
                    <CollapsibleSection
                      key={propName}
                      id={`${path.join('-')}-${propName}`}
                      title={propSchema.title || formatGroupTitle(propName)}
                      defaultOpen={false}
                      hasChanges={hasChangesInSection([...path, propName])}
                      changedCount={getChangedPropertiesCount([...path, propName])}
                    >
                      <div className="space-y-4">
                        {propSchema.items?.properties && (
                          Object.entries(propSchema.items.properties).map(([itemPropName, itemPropSchema]) => (
                            <SchemaForm
                              key={itemPropName}
                              schema={itemPropSchema}
                              value={itemValue[itemPropName]}
                              onChange={(newValue: any) => {
                                const newItemValue = { ...itemValue, [itemPropName]: newValue };
                                onChange({ ...value, [propName]: [newItemValue] });
                              }}
                              schemaLoader={schemaLoader}
                              path={[...path, propName, '0', itemPropName]}
                              level={level + 2}
                              hideTitle={false}
                            />
                          ))
                        )}
                      </div>
                    </CollapsibleSection>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {/* General Properties */}
            {Object.entries(commonProperties)
              .filter(([propName]) => propName !== '*')
              .map(([propName, propSchema]) => {
                if (propSchema.type === 'array' && propSchema.items?.type === 'object') {
                  const sectionValue = Array.isArray(value[propName]) ? value[propName] : [{}];
                  const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
                  
                  return (
                    <CollapsibleSection
                      key={propName}
                      id={`${path.join('-')}-${propName}`}
                      title={propSchema.title || formatGroupTitle(propName)}
                      defaultOpen={false}
                      hasChanges={hasChangesInSection([...path, propName])}
                      changedCount={getChangedPropertiesCount([...path, propName])}
                    >
                      <div className="space-y-4">
                        {propSchema.items?.properties && (
                          Object.entries(propSchema.items.properties).map(([itemPropName, itemPropSchema]) => (
                            <SchemaForm
                              key={itemPropName}
                              schema={itemPropSchema}
                              value={itemValue[itemPropName]}
                              onChange={(newValue: any) => {
                                const newItemValue = { ...itemValue, [itemPropName]: newValue };
                                onChange({ ...value, [propName]: [newItemValue] });
                              }}
                              schemaLoader={schemaLoader}
                              path={[...path, propName, '0', itemPropName]}
                              level={level + 2}
                              hideTitle={false}
                            />
                          ))
                        )}
                      </div>
                    </CollapsibleSection>
                  );
                }
                return null;
              })}
          </div>
        )}
      </div>
    </div>
  );
}