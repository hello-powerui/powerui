'use client';

import { useCallback } from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { ConnectedProperty } from '../../ui/connected-property';
import { THEME_STUDIO_TYPOGRAPHY } from '../../constants/typography';

interface OutlinePropertySectionProps {
  schema: SchemaProperty;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hideTitle?: boolean;
  SchemaForm: React.ComponentType<any>;
  isVisualContext?: boolean;
}

export function OutlinePropertySection({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hideTitle,
  SchemaForm,
  isVisualContext
}: OutlinePropertySectionProps) {
  const arrayValue = Array.isArray(value) ? value : [];
  
  // Find the show object (must be show-only object)
  const showObject = arrayValue.find(item => 
    !item.$id && 'show' in item && Object.keys(item).length === 1
  );
  
  // Find the main properties object (either has $id or has properties other than show)
  const propertiesObject = arrayValue.find(item => 
    item.$id === 'default' || 
    (item.$id && item.$id !== 'default') ||
    (!item.$id && (!('show' in item) || Object.keys(item).length > 1))
  );
  
  const showValue = showObject?.show ?? true;
  const itemValue = (() => {
    if (!propertiesObject) return { $id: 'default' };
    // If properties object has 'show', we need to extract other properties
    if ('show' in propertiesObject && !propertiesObject.$id) {
      const { show, ...rest } = propertiesObject;
      return { $id: 'default', ...rest };
    }
    // Ensure it has $id
    if (!propertiesObject.$id) {
      return { $id: 'default', ...propertiesObject };
    }
    return propertiesObject;
  })();
  
  // Handle property changes
  const handlePropertyChange = useCallback((propName: string, newValue: any) => {
    let currentArrayValue = Array.isArray(value) ? [...value] : [];
    
    if (propName === 'show') {
      // Handle show separately - ensure it's in its own object
      // Remove any existing show objects or show properties from other objects
      const newArray = currentArrayValue.map(item => {
        if (!item.$id && 'show' in item && Object.keys(item).length === 1) {
          // This is a show-only object, remove it
          return null;
        } else if ('show' in item) {
          // Remove show from this object
          const { show, ...rest } = item;
          return rest;
        }
        return item;
      }).filter(Boolean);
      
      // Add the new show object at the beginning
      newArray.unshift({ show: newValue });
      onChange(newArray);
    } else {
      // Handle other properties
      // First, preserve any show-only objects
      const showOnlyObjects = currentArrayValue.filter(item => 
        !item.$id && 'show' in item && Object.keys(item).length === 1
      );
      
      // Get non-show objects
      let mainArray = currentArrayValue.filter(item => 
        !(item && !item.$id && 'show' in item && Object.keys(item).length === 1)
      );
      
      // Find or create the main properties object
      let mainObject = mainArray.find(item => item.$id === 'default') || 
                       mainArray.find(item => !item.$id && !('show' in item)) ||
                       mainArray[0];
      
      if (!mainObject) {
        mainObject = { $id: 'default' };
        mainArray = [mainObject];
      } else {
        // Ensure we don't have 'show' in the main object
        if ('show' in mainObject) {
          const { show, ...rest } = mainObject;
          mainObject = rest;
        }
        // Ensure main object has $id: "default"
        if (!mainObject.$id) {
          mainObject = { $id: 'default', ...mainObject };
        }
      }
      
      // Update the property
      const updatedObject = { ...mainObject, [propName]: newValue };
      const mainIndex = mainArray.indexOf(mainObject);
      mainArray[mainIndex] = updatedObject;
      
      // Combine show objects and main array
      const finalArray = [...showOnlyObjects, ...mainArray];
      onChange(finalArray);
    }
  }, [value, onChange]);
  
  return (
    <div className="space-y-2">
      {!hideTitle && schema.title && (
        <h4 className={`${THEME_STUDIO_TYPOGRAPHY.sectionHeader.size} font-semibold text-gray-700`}>{schema.title}</h4>
      )}
      {schema.description && (
        <p className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color}`}>{schema.description}</p>
      )}
      
      {/* Render the properties from the items schema */}
      <div className="space-y-3">
        {(() => {
          const entries = Object.entries(schema.items?.properties || {})
            .filter(([propName]) => propName !== '$id'); // Don't show $id in UI
          return entries.map(([propName, propSchema], index) => {
            const fullPath = [...path, propName === 'show' ? '0' : '1', propName];
            const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
            const isLast = index === entries.length - 1;
            const currentValue = propName === 'show' ? showValue : itemValue[propName];
            
            return (
              <ConnectedProperty key={propName} isLast={isLast}>
                <SchemaForm
                  schema={{ ...propSchema, title: contextualTitle }}
                  value={currentValue}
                  onChange={(newValue: any) => handlePropertyChange(propName, newValue)}
                  schemaLoader={schemaLoader}
                  path={fullPath}
                  level={level + 1}
                  hideTitle={false}
                  isVisualContext={isVisualContext}
                />
              </ConnectedProperty>
            );
          });
        })()}
      </div>
    </div>
  );
}