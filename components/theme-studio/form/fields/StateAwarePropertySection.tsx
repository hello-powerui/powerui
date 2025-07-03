'use client';

import React from 'react';
import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { sortPropertiesWithShowFirst, getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { ConnectedProperty } from '../../ui/connected-property';

interface StateAwarePropertySectionProps {
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

export function StateAwarePropertySection({
  schema,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hideTitle,
  SchemaForm,
  isVisualContext
}: StateAwarePropertySectionProps) {
  const globalSelectedState = useThemeStudioStore(state => state.selectedState) || 'default';
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  const arrayValue = Array.isArray(value) ? value : [{}];

  // Check if this is a fill property for shape or actionButton visuals
  const isFillProperty = path && path.length >= 2 && path[path.length - 1] === 'fill' && 
    (path.includes('shape') || path.includes('actionButton'));
  
  // Check if this is a fillCustom property for advancedSlicerVisual
  // Note: The schema doesn't show $id support for fillCustom, but we're adding it
  // as it may be a Power BI schema bug and the visual might actually support states
  const isFillCustomProperty = path && path.length >= 2 && path[path.length - 1] === 'fillCustom' && 
    path.includes('advancedSlicerVisual');
  
  // Check if this is a text property for actionButton
  const isTextProperty = path && path.length >= 2 && path[path.length - 1] === 'text' && 
    path.includes('actionButton');
  
  // Normalize array to ensure all items have $id and clean up for fill/text properties
  const normalizedArray = (() => {
    let cleanArray = [...arrayValue];
    let needsCleanup = false;
    
    if (isFillProperty || isFillCustomProperty || isTextProperty) {
      // Check if we need cleanup
      const hasShowInStateObjects = cleanArray.some(item => item.$id && 'show' in item);
      const showOnlyObjects = cleanArray.filter(item => !item.$id && Object.keys(item).length === 1 && 'show' in item);
      needsCleanup = hasShowInStateObjects || showOnlyObjects.length > 1;
      
      if (needsCleanup) {
        // Extract show values from state objects
        const showValues = cleanArray
          .filter(item => (item.$id && 'show' in item) || (!item.$id && 'show' in item))
          .map(item => item.show);
        const currentShowValue = showValues.length > 0 ? showValues[0] : true;
        
        // Remove show from all state objects
        cleanArray = cleanArray.map(item => {
          if (item.$id && 'show' in item) {
            const { show, ...rest } = item;
            return rest;
          }
          return item;
        });
        
        // Remove all existing show-only objects
        cleanArray = cleanArray.filter(item => !(!item.$id && Object.keys(item).length === 1 && 'show' in item));
        
        // Add a single show object at the end
        cleanArray.push({ show: currentShowValue });
      }
    }
    
    // Ensure all items with states have $id
    const result = cleanArray.map(item => {
      // Don't add $id to show-only objects
      if (!item.$id && !('show' in item && Object.keys(item).length === 1)) {
        // Only add $id: 'default' if the item has other properties
        if (Object.keys(item).length > 0) {
          return { ...item, $id: 'default' };
        }
      }
      return item;
    });
    
    // If we needed cleanup, trigger the change
    if (needsCleanup && (isFillProperty || isTextProperty)) {
      setTimeout(() => onChange(result), 0);
    }
    
    return result;
  })();
  
  // Get or create the item for the selected state
  let stateItem = normalizedArray.find(item => item.$id === globalSelectedState);
  const isNewItem = !stateItem;
  if (!stateItem) {
    stateItem = { $id: globalSelectedState };
  }

  const handleStateItemChange = (updates: any) => {
    let workingArray = [...arrayValue];

    // For fill/text properties, ensure clean structure
    if (isFillProperty || isFillCustomProperty || isTextProperty) {
      // Remove any duplicate show objects
      const showObjects = workingArray.filter(item => !item.$id && 'show' in item);
      if (showObjects.length > 1) {
        workingArray = workingArray.filter(item => item.$id || item === showObjects[0]);
      }
      
      // Remove show from all state objects
      workingArray = workingArray.map(item => {
        if (item.$id && 'show' in item) {
          const { show, ...rest } = item;
          return rest;
        }
        return item;
      });
    }
    
    // For text properties in actionButton, handle show property separately (similar to fill)
    if (isTextProperty) {
      if ('show' in updates) {
        // Find or create the show object
        let showObjectIndex = workingArray.findIndex(item => !item.$id && 'show' in item);
        
        if (showObjectIndex >= 0) {
          workingArray[showObjectIndex] = { show: updates.show };
        } else {
          workingArray.push({ show: updates.show });
        }
        
        // Remove show from updates to avoid adding it to state objects
        const { show, ...stateUpdates } = updates;
        
        // Only update state object if there are other properties
        if (Object.keys(stateUpdates).length > 0) {
          const existingIndex = workingArray.findIndex(item => item.$id === globalSelectedState);
          
          if (existingIndex >= 0) {
            workingArray[existingIndex] = { 
              ...workingArray[existingIndex], 
              ...stateUpdates, 
              $id: globalSelectedState 
            };
          } else {
            workingArray.push({ ...stateUpdates, $id: globalSelectedState });
          }
        }
      } else {
        // Regular update for text properties (non-show properties)
        const existingIndex = workingArray.findIndex(item => item.$id === globalSelectedState);
        
        if (existingIndex >= 0) {
          workingArray[existingIndex] = { 
            ...workingArray[existingIndex], 
            ...updates, 
            $id: globalSelectedState 
          };
        } else {
          workingArray.push({ ...updates, $id: globalSelectedState });
        }
      }
    } else if (isFillProperty || isFillCustomProperty) {
      // For fill properties in shape/actionButton, handle show property separately
      if ('show' in updates) {
        // Find or create the show object
        let showObjectIndex = workingArray.findIndex(item => !item.$id && 'show' in item);
        
        if (showObjectIndex >= 0) {
          workingArray[showObjectIndex] = { show: updates.show };
        } else {
          workingArray.push({ show: updates.show });
        }
        
        // Remove show from updates to avoid adding it to state objects
        const { show, ...stateUpdates } = updates;
        
        // Only update state object if there are other properties
        if (Object.keys(stateUpdates).length > 0) {
          const existingIndex = workingArray.findIndex(item => item.$id === globalSelectedState);
          
          if (existingIndex >= 0) {
            workingArray[existingIndex] = { 
              ...workingArray[existingIndex], 
              ...stateUpdates, 
              $id: globalSelectedState 
            };
          } else {
            workingArray.push({ ...stateUpdates, $id: globalSelectedState });
          }
        }
      } else {
        // Regular update for fill properties (non-show properties)
        const existingIndex = workingArray.findIndex(item => item.$id === globalSelectedState);
        
        if (existingIndex >= 0) {
          workingArray[existingIndex] = { 
            ...workingArray[existingIndex], 
            ...updates, 
            $id: globalSelectedState 
          };
        } else {
          workingArray.push({ ...updates, $id: globalSelectedState });
        }
      }
    } else {
      // Regular state item update (non-fill properties)
      // For default state, also check for items without $id
      const existingIndex = globalSelectedState === 'default' 
        ? workingArray.findIndex(item => item.$id === 'default' || (!item.$id && !('show' in item && Object.keys(item).length === 1)))
        : workingArray.findIndex(item => item.$id === globalSelectedState);
      
      if (existingIndex >= 0) {
        workingArray[existingIndex] = { 
          ...workingArray[existingIndex], 
          ...updates, 
          $id: globalSelectedState 
        };
      } else {
        workingArray.push({ ...updates, $id: globalSelectedState });
      }
    }
    
    // Debug final result for text properties
    if (isTextProperty) {
      
    }

    onChange(workingArray);
  };
  
  return (
    <div className="space-y-2">
      {!hideTitle && schema.title && (
        <h4 className="text-sm font-medium text-gray-700">{schema.title}</h4>
      )}
      {schema.description && (
        <p className="text-xs text-gray-500">{schema.description}</p>
      )}
      
      <div className="space-y-2">
        {(() => {
          const sorted = sortPropertiesWithShowFirst(schema.items?.properties || {});
          const filtered = sorted.filter(([propName]) => propName !== '$id');

          return filtered
            .map(([propName, propSchema], index) => {
              const fullPath = [...path, globalSelectedState, propName];
              const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
              const isLast = index === filtered.length - 1;

              return (
                <ConnectedProperty key={`${globalSelectedState}-${propName}`} isLast={isLast}>
                  <SchemaForm
                    schema={{ ...propSchema, title: contextualTitle }}
                    value={(() => {
                      // For fill properties and show prop, get value from the separate object
                      if ((isFillProperty || isFillCustomProperty) && propName === 'show') {
                        const showObject = normalizedArray.find(item => !item.$id && 'show' in item);
                        return showObject?.show ?? true;
                      }
                      
                      // For text properties and show prop, get value from the separate object
                      if (isTextProperty && propName === 'show') {
                        const showObject = normalizedArray.find(item => !item.$id && 'show' in item);
                        return showObject?.show ?? true;
                      }
                      
                      return stateItem[propName];
                    })()}
                    onChange={(newValue: any) => {
                      handleStateItemChange({ [propName]: newValue });
                    }}
                    schemaLoader={schemaLoader}
                    path={[...path, globalSelectedState, propName]}
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