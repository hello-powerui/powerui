'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Focus } from 'lucide-react';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { VariantManager } from './VariantManager';
import { cleanupVisualStyles } from '@/lib/utils/theme-helpers';

interface VisualsSectionProps {
  visualSettings: Record<string, any>;
  selectedVisual: string;
  selectedVariant: string;
  visualTypes: string[];
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onCreateVariant: (visual: string, variantName: string) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  getVisualVariants: (visual: string) => string[];
  trackChange: (path: string[]) => void;
  onEnterFocusMode?: () => void;
  schemaLoader: SchemaLoader | null;
}

export function VisualsSection({
  visualSettings,
  selectedVisual,
  selectedVariant,
  visualTypes,
  onVisualSettingsChange,
  onSelectedVisualChange,
  onSelectedVariantChange,
  onCreateVariant,
  onDeleteVariant,
  getVisualVariants,
  trackChange,
  onEnterFocusMode,
  schemaLoader,
}: VisualsSectionProps) {
  const visualVariants = selectedVisual ? getVisualVariants(selectedVisual) : [];

  const handleSchemaFormChange = (value: any) => {
    // Extract the value from the * wrapper
    const variantValue = value['*'] || value;
    
    // Check if the variant value is empty
    const isEmpty = !variantValue || (typeof variantValue === 'object' && Object.keys(variantValue).length === 0);
    
    if (isEmpty) {
      // Remove the variant entirely if empty
      const updatedVisualSettings = { ...visualSettings };
      if (updatedVisualSettings[selectedVisual]) {
        const updatedVisual = { ...updatedVisualSettings[selectedVisual] };
        delete updatedVisual[selectedVariant];
        
        // If no variants left, remove the visual entirely
        if (Object.keys(updatedVisual).length === 0) {
          delete updatedVisualSettings[selectedVisual];
        } else {
          updatedVisualSettings[selectedVisual] = updatedVisual;
        }
      }
      onVisualSettingsChange(cleanupVisualStyles(updatedVisualSettings));
    } else {
      // Update visual settings with non-empty value
      const updatedVisualSettings = {
        ...visualSettings,
        [selectedVisual]: {
          ...visualSettings[selectedVisual],
          [selectedVariant]: variantValue
        }
      };
      onVisualSettingsChange(cleanupVisualStyles(updatedVisualSettings));
    }
    
    trackChange(['visualStyles', selectedVisual, selectedVariant]);
  };

  return (
    <>
      {/* Controls Row */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
        <Select
          value={selectedVisual || ''}
          onValueChange={(value) => {
            onSelectedVisualChange(value);
            onSelectedVariantChange('*');
          }}
        >
          <SelectTrigger className="h-9 text-sm w-[180px] font-medium">
            <SelectValue placeholder="Select visual" />
          </SelectTrigger>
          <SelectContent>
            {visualTypes.map((visual) => (
              <SelectItem key={visual} value={visual} className="text-sm">
                {visual.charAt(0).toUpperCase() + visual.slice(1).replace(/([A-Z])/g, ' $1')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Enter Focus Mode Button - show when visual is selected */}
        {selectedVisual && (
          <Button
            onClick={onEnterFocusMode}
            variant="outline"
            size="default"
            className="h-9 px-4 text-sm font-medium"
            title="View this visual in focus mode"
          >
            <Focus className="w-4 h-4 mr-2" />
            Focus Mode
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedVisual ? (
          <div className="p-4">
            {/* Description */}
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                Customize the appearance of {selectedVisual} visuals with style variants and state-specific properties
              </p>
            </div>
            
            {/* Visual Style Configuration */}
            <VariantManager
              selectedVisual={selectedVisual}
              selectedVariant={selectedVariant}
              visualVariants={visualVariants}
              visualSettings={visualSettings}
              onSelectedVariantChange={onSelectedVariantChange}
              onCreateVariant={onCreateVariant}
              onDeleteVariant={onDeleteVariant}
              onVisualSettingsChange={onVisualSettingsChange}
            />
            
            {/* Properties for the selected variant */}
            {schemaLoader && (
              <SchemaForm
                schema={
                  schemaLoader?.getPropertySchema(['visualStyles', selectedVisual]) ||
                  { type: 'object' }
                }
                value={{ '*': visualSettings[selectedVisual]?.[selectedVariant] || {} }}
                onChange={handleSchemaFormChange}
                schemaLoader={schemaLoader}
                path={['visualStyles', selectedVisual, selectedVariant]}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Visual to Customize</h3>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              Choose a visual type from the dropdown above to customize its styling, create variants, and configure state-specific properties.
            </p>
            <p className="text-xs text-gray-500 text-center max-w-sm mt-2">
              Visual styles allow you to define how different types of charts, cards, and other elements appear in your reports.
            </p>
          </div>
        )}
      </div>
    </>
  );
}