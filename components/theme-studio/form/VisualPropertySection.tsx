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
  
  // Debug logging for padding section
  if (name === 'padding') {
    console.log('[VisualPropertySection] Padding section value:', value[name]);
    console.log('[VisualPropertySection] Padding itemValue:', itemValue);
  }
  
  const handleSectionReset = () => {
    // Reset the entire section to inherit from global/defaults
    onChange({ ...value, [name]: undefined });
  };
  
  const sectionPath = [...path, name];
  
  // Import SchemaForm here to avoid circular dependency
  const { SchemaForm } = require('./schema-form');
  
  // Check if section has actual content
  const sectionHasContent = hasActualContent(value[name]);
  
  return (
    <CollapsibleSection
      id={`${path.join('-')}-${name}`}
      title={title}
      defaultOpen={false}
      onClear={handleSectionReset}
      hasContent={sectionHasContent}
      clearMessage={`Clear all ${title.toLowerCase()} settings? This will remove any customizations and use default values.`}
    >
      <div className="space-y-2">
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