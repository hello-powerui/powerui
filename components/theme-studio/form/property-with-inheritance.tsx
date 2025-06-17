'use client';

import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { InheritanceIndicator, usePropertySource } from '../ui/inheritance-indicator';
import { NumberControl } from './controls/number-control';
import { BooleanControl } from './controls/boolean-control';

interface PropertyWithInheritanceProps {
  propertyName: string;
  propertyPath: string[];
  value: any;
  onChange: (value: any) => void;
  schema: any;
  visualType?: string;
  variant?: string;
}

export function PropertyWithInheritance({
  propertyName,
  propertyPath,
  value,
  onChange,
  schema,
  visualType,
  variant,
}: PropertyWithInheritanceProps) {
  const theme = useThemeStudioStore((state) => state.theme);
  const schemaLoader = SchemaLoader.getInstance();

  // Get values from different inheritance levels
  // For global values, we need just the property name since they're stored flat
  const globalValue = schemaLoader.getGlobalPropertyValue(theme, [propertyName]);
  
  // Navigate through the visual structure to find values
  const getValueFromVisualSection = (section: any) => {
    if (!section || !Array.isArray(section)) return undefined;
    
    // Navigate through nested structure if needed
    let current = section[0];
    for (let i = 0; i < propertyPath.length - 1; i++) {
      if (current && typeof current === 'object' && propertyPath[i] in current) {
        current = current[propertyPath[i]];
        // If we hit an array, get the first item
        if (Array.isArray(current) && current.length > 0) {
          current = current[0];
        }
      } else {
        return undefined;
      }
    }
    
    return current?.[propertyName];
  };
  
  const visualDefaultValue = visualType && visualType !== '*' 
    ? getValueFromVisualSection(theme.visualStyles?.[visualType]?.['*'])
    : undefined;
    
  const variantValue = visualType && variant && variant !== '*'
    ? getValueFromVisualSection(theme.visualStyles?.[visualType]?.[variant])
    : undefined;

  // Determine where the current value is coming from
  const source = usePropertySource(
    propertyPath,
    value,
    globalValue,
    visualDefaultValue,
    variantValue
  );

  // Determine what value would be inherited if we reset
  const getInheritedValue = () => {
    if (variant && variant !== '*' && visualDefaultValue !== undefined) {
      return visualDefaultValue;
    }
    if (visualType && visualType !== '*' && globalValue !== undefined) {
      return globalValue;
    }
    return undefined;
  };

  const handleReset = () => {
    // In visual context, undefined means inherit
    onChange(undefined);
  };

  const showReset = source !== 'global' && source !== 'default' && getInheritedValue() !== undefined;

  const inheritanceActions = [];
  
  // Add actions based on the source
  if (source === 'custom' || source === 'variant') {
    if (showReset) {
      inheritanceActions.push({
        label: 'Reset to inherited value',
        onClick: handleReset
      });
    }
  }
  
  const inheritanceIndicator = (
    <InheritanceIndicator 
      source={source} 
      overriddenValue={source === 'custom' || source === 'variant' ? getInheritedValue() : undefined}
      actions={inheritanceActions}
    />
  );

  // Render the appropriate control based on schema type
  if (schema.type === 'boolean') {
    return (
      <BooleanControl
        label={schema.title || propertyName}
        value={value ?? false}
        onChange={onChange}
        description={schema.description}
        path={propertyPath}
        inheritanceIndicator={inheritanceIndicator}
        onReset={showReset ? handleReset : undefined}
      />
    );
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    const isPercentage = propertyName.toLowerCase().includes('transparency') ||
                        (schema.minimum === 0 && schema.maximum === 1);
    
    return (
      <NumberControl
        label={schema.title || propertyName}
        value={value ?? 0}
        onChange={onChange}
        description={schema.description}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === 'integer' ? 1 : 0.01}
        path={propertyPath}
        isPercentage={isPercentage}
        inheritanceIndicator={inheritanceIndicator}
        onReset={showReset ? handleReset : undefined}
      />
    );
  }

  // For other types, just show the indicator
  return (
    <div className="mb-2">
      {inheritanceIndicator}
    </div>
  );
}