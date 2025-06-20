'use client';

import { SchemaProperty } from '@/lib/theme-studio/types/schema';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { CollapsibleSection } from '../ui/collapsible-section';
import { ConnectedProperty } from '../ui/connected-property';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { getContextualTitle } from '@/lib/theme-studio/utils/schema-form-utils';
import { THEME_STUDIO_TYPOGRAPHY } from '../constants/typography';

interface VisualPropertySectionProps {
  name: string;
  schema: SchemaProperty;
  title: string;
  value: any;
  onChange: (value: any) => void;
  schemaLoader: SchemaLoader;
  path: string[];
  level: number;
  hasChanges: boolean;
  changedCount: number;
}

export function VisualPropertySection({
  name,
  schema: sectionSchema,
  title,
  value,
  onChange,
  schemaLoader,
  path,
  level,
  hasChanges,
  changedCount
}: VisualPropertySectionProps) {
  const trackChangeRef = useThemeChanges(state => state.trackChange);
  
  // Get the value for this section - it should be an array with one object
  const sectionValue = Array.isArray(value[name]) ? value[name] : [{}];
  const itemValue = sectionValue.length > 0 ? sectionValue[0] : {};
  
  const handleSectionReset = () => {
    // Reset the entire section to inherit from global/defaults
    onChange({ ...value, [name]: undefined });
  };
  
  const sectionPath = [...path, name];
  
  // Import SchemaForm here to avoid circular dependency
  const { SchemaForm } = require('./schema-form');
  
  return (
    <CollapsibleSection
      id={`${path.join('-')}-${name}`}
      title={title}
      defaultOpen={false}
      hasChanges={hasChanges}
      changedCount={changedCount}
      headerAction={
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionReset();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              handleSectionReset();
            }
          }}
          className={`${THEME_STUDIO_TYPOGRAPHY.button.size} text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer`}
        >
          Reset Section
        </div>
      }
    >
      <div className="space-y-2">
        {/* Show state indicator if this section has state support */}
        {sectionSchema.items?.properties?.$id && (
          <div className="flex items-center gap-2 mb-2">
            <span className={`${THEME_STUDIO_TYPOGRAPHY.description.size} text-gray-700 bg-gray-100 px-2 py-1 rounded flex items-center gap-1`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              State: {useThemeStudioStore.getState().selectedState || 'default'}
            </span>
            <span className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color}`}>This section uses the visual state selector</span>
          </div>
        )}
        
        {/* Check if this section has state support */}
        {sectionSchema.items?.properties?.$id ? (
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