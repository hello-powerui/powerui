'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Focus } from 'lucide-react';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { VariantManager } from './VariantManager';
import { cleanupVisualStyles } from '@/lib/utils/theme-helpers';
import { VisualIcon } from '@/components/theme-studio/visuals/VisualIcon';

interface VisualsSectionProps {
  visualSettings: Record<string, any>;
  selectedVisual: string;
  selectedVariant: string;
  visualTypes: string[];
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onCreateVariant: (visual: string, variantName: string, initialData?: any) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  onRenameVariant: (visual: string, oldName: string, newName: string) => void;
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
  onRenameVariant,
  getVisualVariants,
  trackChange,
  onEnterFocusMode,
  schemaLoader,
}: VisualsSectionProps) {
  console.log('[VisualsSection] Received visualSettings:', visualSettings);
  console.log('[VisualsSection] Selected visual/variant:', selectedVisual, selectedVariant);
  console.log('[VisualsSection] Visual data:', visualSettings[selectedVisual]?.[selectedVariant]);
  
  const visualVariants = selectedVisual ? getVisualVariants(selectedVisual) : [];

  const formatVisualName = (visual: string) => {
    // First handle the special case of hundredPercent
    let formatted = visual.replace(/^hundredPercent/, '100Percent');
    
    // Then do the standard formatting
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    formatted = formatted.replace(/([A-Z])/g, ' $1').trim();
    
    // Finally replace Percent with %
    formatted = formatted.replace('100 Percent', '100%');
    
    // Rename "Advanced Slicer Visual" to "Button Slicer"
    if (formatted === 'Advanced Slicer Visual') {
      formatted = 'Button Slicer';
    }
    
    return formatted;
  };

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
          <SelectTrigger className="h-9 text-sm w-[220px] font-medium">
            <SelectValue placeholder="Select visual">
              {selectedVisual && (
                <div className="flex items-center gap-2">
                  <VisualIcon visualType={selectedVisual} size={20} />
                  <span>{formatVisualName(selectedVisual)}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {visualTypes.map((visual) => (
              <SelectItem key={visual} value={visual} className="text-sm">
                <div className="flex items-center gap-2">
                  <VisualIcon visualType={visual} size={20} />
                  <span>{formatVisualName(visual)}</span>
                </div>
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
            
            {/* Visual Style Configuration */}
            <VariantManager
              selectedVisual={selectedVisual}
              selectedVariant={selectedVariant}
              visualVariants={visualVariants}
              visualSettings={visualSettings}
              onSelectedVariantChange={onSelectedVariantChange}
              onCreateVariant={onCreateVariant}
              onDeleteVariant={onDeleteVariant}
              onRenameVariant={onRenameVariant}
              onVisualSettingsChange={onVisualSettingsChange}
            />
            
            {/* Properties for the selected variant */}
            {schemaLoader && (
              <SchemaForm
                schema={
                  schemaLoader?.getPropertySchema(['visualStyles', selectedVisual]) ||
                  { type: 'object' }
                }
                value={(() => {
                  const val = { '*': visualSettings[selectedVisual]?.[selectedVariant] || {} };
                  console.log('[VisualsSection] Passing to SchemaForm:', val);
                  return val;
                })()}
                onChange={handleSchemaFormChange}
                schemaLoader={schemaLoader}
                path={['visualStyles', selectedVisual, selectedVariant]}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Select a visual to customize</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}