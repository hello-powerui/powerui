'use client';

import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { CollapsibleSection } from '../ui/collapsible-section';
import { ConnectedProperty } from '../ui/connected-property';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { THEME_STUDIO_TYPOGRAPHY } from '../constants/typography';
import { hasActualContent } from '@/lib/utils/theme-helpers';

interface VisualPropertySectionProps {
  name: string;
  schema: SchemaProperty;
  title: string;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
}

export function VisualPropertySection({
  name,
  schema: sectionSchema,
  title,
  value,
  onChange,
  schemaLoader,
  path,
  level
}: VisualPropertySectionProps) {
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  // Get the value for this section - it should be an array with one object
  // Don't memoize to ensure updates are detected
  const sectionValue = Array.isArray(value[name]) ? value[name] : [{}];
  const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
  
  
  const handleSectionReset = () => {
    // Check if this is a state-driven property
    const isStateDriven = sectionSchema.items?.properties?.$id || 
      (name === 'fillCustom' && path.includes('advancedSlicerVisual'));
    
    if (isStateDriven) {
      // For state-driven properties, only clear the current state
      const globalSelectedState = useThemeStudioStore.getState().selectedState || 'default';
      const currentArray = Array.isArray(value[name]) ? value[name] : [];
      
      // Remove only the current state
      const newArray = currentArray.filter((item: any) => item.$id !== globalSelectedState);
      
      // If array is now empty, set to undefined to remove the section
      if (newArray.length === 0) {
        onChange({ ...value, [name]: undefined });
      } else {
        onChange({ ...value, [name]: newArray });
      }
    } else {
      // For non-state-driven properties, reset the entire section
      onChange({ ...value, [name]: undefined });
    }
  };
  
  const sectionPath = [...path, name];
  
  // Import SchemaForm here to avoid circular dependency
  const { SchemaForm } = require('./schema-form');
  
  // Check if section has actual content
  const sectionHasContent = hasActualContent(value[name]);
  
  // Check if this is a state-driven property
  const isStateDriven = sectionSchema.items?.properties?.$id || 
    (name === 'fillCustom' && path.includes('advancedSlicerVisual'));
  
  // Get current state for state-driven properties
  const globalSelectedState = useThemeStudioStore(state => state.selectedState) || 'default';
  
  return (
    <CollapsibleSection
      id={`${path.join('-')}-${name}`}
      title={title}
      defaultOpen={false}
      onClear={handleSectionReset}
      hasContent={sectionHasContent}
      clearMessage={
        isStateDriven 
          ? `Clear ${globalSelectedState} state for ${title.toLowerCase()}? This will remove customizations for this state only.`
          : `Clear all ${title.toLowerCase()} settings? This will remove any customizations and use default values.`
      }
    >
      <div className="space-y-2">
        {/* Check if this section has state support */}
        {/* Special case: fillCustom in advancedSlicerVisual should support states even though schema doesn't show it */}
        {(sectionSchema.items?.properties?.$id || 
          (name === 'fillCustom' && path.includes('advancedSlicerVisual'))) ? (
          // This is a state-driven property - pass the entire schema
          <ConnectedProperty isLast={true}>
            <SchemaForm
              schema={sectionSchema}
              value={value[name]}
              onChange={(newValue: any) => {
                onChange({ ...value, [name]: newValue });
              }}
              schemaLoader={schemaLoader}
              path={[...path, name]}
              level={level + 1}
              hideTitle={true}
              isVisualContext={true}
            />
          </ConnectedProperty>
        ) : (
          // Regular properties - render them individually
          sectionSchema.items?.properties && (
            <div className="space-y-2">
              {(() => {
                const entries = Object.entries(sectionSchema.items.properties)
                  .filter(([propName, propSchema]) => {
                    // Filter out properties with complex/mixed types that are confusing
                    if ((propName === 'end' || propName === 'start') && Array.isArray(propSchema.type)) {
                      return false;
                    }
                    // Filter out fillRule (Color saturation) - too complex for users
                    // This property controls gradient color mapping based on data values
                    // but requires understanding of linearGradient2/linearGradient3 configurations
                    if (propName === 'fillRule') {
                      return false;
                    }
                    return true;
                  });
                  
                return entries.map(([propName, propSchema], index) => {
                    const fullPath = [...path, name, '0', propName];
                    const contextualTitle = getContextualTitle(propSchema, propName, fullPath);
                    const isLast = index === entries.length - 1;
                    
                    return (
                      <ConnectedProperty key={propName} isLast={isLast}>
                        <SchemaForm
                          schema={{ ...propSchema, title: contextualTitle }}
                          value={itemValue[propName]}
                          onChange={(newValue: any) => {
                            const newItemValue = { ...itemValue, [propName]: newValue };
                            onChange({ ...value, [name]: [newItemValue] });
                            // Also track this specific change
                            trackChangeRef(fullPath);
                          }}
                          schemaLoader={schemaLoader}
                          path={fullPath}
                          level={level + 2}
                          hideTitle={false}
                          isVisualContext={true}
                        />
                      </ConnectedProperty>
                    );
                  });
              })()}
            </div>
          )
        )}
      </div>
    </CollapsibleSection>
  );
}