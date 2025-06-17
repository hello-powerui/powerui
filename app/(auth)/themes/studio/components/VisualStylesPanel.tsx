'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { GlobalPropertySelector } from '@/components/theme-studio/form/global-property-selector';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';

const GlobalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const VisualIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

interface VisualStylesPanelProps {
  theme: any;
  visualSettings: Record<string, any>;
  selectedVisual: string;
  selectedVariant: string;
  selectedState: string;
  selectedSection: 'properties' | 'visuals' | 'global';
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onVisualStyleChange: (visual: string, variant: string, value: any) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onSelectedStateChange: (state: string) => void;
  onSelectedSectionChange: (section: 'properties' | 'visuals' | 'global') => void;
  onCreateVariant: (visual: string, variantName: string) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  getVisualVariants: (visual: string) => string[];
  trackChange: (path: string[]) => void;
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
}

export function VisualStylesPanel({
  theme,
  visualSettings,
  selectedVisual,
  selectedVariant,
  selectedState,
  selectedSection,
  onVisualSettingsChange,
  onVisualStyleChange,
  onSelectedVisualChange,
  onSelectedVariantChange,
  onSelectedStateChange,
  onSelectedSectionChange,
  onCreateVariant,
  onDeleteVariant,
  getVisualVariants,
  trackChange,
  isVisible,
  onToggleVisibility,
}: VisualStylesPanelProps) {
  const [schemaLoader, setSchemaLoader] = useState<SchemaLoader | null>(null);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [visualTypes, setVisualTypes] = useState<string[]>([]);
  const [canvasTypes, setCanvasTypes] = useState<string[]>([]);
  const [showVariantDialog, setShowVariantDialog] = useState(false);
  const [newVariantName, setNewVariantName] = useState('');
  
  // Initialize SchemaLoader
  useEffect(() => {
    setSchemaLoader(SchemaLoader.getInstance());
  }, []);
  
  // Load schema on mount
  useEffect(() => {
    if (!schemaLoader) return;
    
    const loadSchema = async () => {
      try {
        await schemaLoader.loadSchema();
        const types = schemaLoader.getVisualTypes();
        const canvas = schemaLoader.getCanvasTypes();
        setVisualTypes(types);
        setCanvasTypes(canvas);
        setSchemaLoaded(true);
      } catch (error) {
        // Silently fail - schema will be loaded on next attempt
      }
    };
    loadSchema();
  }, [schemaLoader]);

  const hasStateDrivenProperties = selectedVisual && schemaLoader?.visualHasStateDrivenProperties(selectedVisual);

  if (!isVisible) {
    return (
      <div className="h-full flex flex-col items-center py-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleVisibility(true)}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Layers className="w-5 h-5" />
          <span className="writing-mode-vertical text-xs">Visual Styles</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Visual Styles</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleVisibility(false)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Section Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => {
            onSelectedSectionChange('global');
            onSelectedVisualChange('*');
          }}
          className={cn(
            "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
            selectedSection === 'global'
              ? 'bg-gray-50 text-gray-900 border-gray-900'
              : 'text-gray-600 hover:bg-gray-50 border-transparent'
          )}
        >
          <GlobalIcon />
          Global
        </button>
        <button
          onClick={() => onSelectedSectionChange('visuals')}
          className={cn(
            "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
            selectedSection === 'visuals'
              ? 'bg-gray-50 text-gray-900 border-gray-900'
              : 'text-gray-600 hover:bg-gray-50 border-transparent'
          )}
        >
          <VisualIcon />
          Visuals
        </button>
      </div>
      
      {/* Content based on selected section */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Navigation Section */}
        {selectedSection === 'visuals' && (
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Visual Styles</h3>
              {/* Visual Type Dropdown */}
              <Select
                value={selectedVisual || ''}
                onValueChange={(value) => {
                  onSelectedVisualChange(value);
                  onSelectedVariantChange('*');
                  onSelectedStateChange('default');
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a visual type" />
                </SelectTrigger>
                <SelectContent>
                  {visualTypes.map((visual) => (
                    <SelectItem key={visual} value={visual}>
                      {visual.charAt(0).toUpperCase() + visual.slice(1).replace(/([A-Z])/g, ' $1')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Focus Mode Info and Reset Button */}
            {selectedVisual && selectedVisual !== '*' && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xs text-gray-600">
                    Focus mode automatically activates to highlight {selectedVisual} visuals
                  </span>
                </div>
                <button
                  onClick={() => onSelectedVisualChange('')}
                  className="w-full px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  ← Back to All Visuals
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form Section */}
        <div className="p-4">
          {selectedSection === 'visuals' && !selectedVisual ? (
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
          ) : selectedSection === 'visuals' && selectedVisual ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedVisual.charAt(0).toUpperCase() + selectedVisual.slice(1).replace(/([A-Z])/g, ' $1')}
                </h2>
              </div>
              
              {/* Visual Style Variants */}
              <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Visual Style Variants</h3>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Create multiple style variations for this visual type. Users can select different styles 
                  to apply varied looks to their visuals.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowVariantDialog(true)}
                    className="px-3 py-1.5 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    + New Style Variant
                  </button>
                  <div className="flex-1 flex gap-2">
                    <select
                      value={selectedVariant}
                      onChange={(e) => onSelectedVariantChange(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md"
                    >
                      {getVisualVariants(selectedVisual).map(variant => (
                        <option key={variant} value={variant}>
                          {variant === '*' ? 'Default Style' : variant}
                        </option>
                      ))}
                    </select>
                    {selectedVariant !== '*' && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete variant "${selectedVariant}"?`)) {
                            onDeleteVariant(selectedVisual, selectedVariant);
                            onSelectedVariantChange('*');
                          }
                        }}
                        className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors border border-red-200"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Visual State Selector - only show for visuals with state-driven properties */}
              {hasStateDrivenProperties && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Visual State</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Edit properties for different interaction states
                  </p>
                  <div className="flex gap-2">
                    {['default', 'hover', 'selected', 'disabled'].map(state => (
                      <button
                        key={state}
                        onClick={() => onSelectedStateChange(state)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-md border transition-colors",
                          selectedState === state
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Properties with state support will use the selected state. Properties without state support apply to all states.
                  </p>
                </div>
              )}
              
              {/* SchemaForm renders its own tabs with collapsible sections */}
              {schemaLoader && (
                <SchemaForm
                  schema={
                    schemaLoader?.getPropertySchema(['visualStyles', selectedVisual]) ||
                    { type: 'object' }
                  }
                  value={{ '*': visualSettings[selectedVisual]?.[selectedVariant] || {} }}
                  onChange={(value) => {
                    // Extract the value from the * wrapper
                    const variantValue = value['*'] || value;
                    
                    // Update visual settings directly
                    const updatedVisualSettings = {
                      ...visualSettings,
                      [selectedVisual]: {
                        ...visualSettings[selectedVisual],
                        [selectedVariant]: variantValue
                      }
                    };
                    onVisualSettingsChange(updatedVisualSettings);
                    trackChange(['visualStyles', selectedVisual, selectedVariant]);
                  }}
                  schemaLoader={schemaLoader!}
                  path={['visualStyles', selectedVisual, selectedVariant]}
                />
              )}
            </>
          ) : selectedSection === 'global' ? (
            <>
              {/* Property Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Global Visual Settings</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Select properties to configure default settings for all visuals
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Global Settings Property Selector */}
              {schemaLoader && (
                <GlobalPropertySelector
                  visualStyles={visualSettings}
                  onVisualStylesChange={(newVisualStyles) => {
                    onVisualSettingsChange(newVisualStyles);
                    trackChange(['visualStyles']);
                  }}
                  schemaLoader={schemaLoader!}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">
                Select a visual from the dropdown above to edit its styles
              </p>
            </div>
          )}
        </div>

        {/* Canvas & Layout Section */}
        {selectedSection === 'global' && (
          <div className="px-4 pb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900">Canvas & Layout</h3>
              </div>
              
              {/* Debug info */}
              {schemaLoaded && canvasTypes.length === 0 && (
                <p className="text-xs text-gray-600">No canvas properties available in schema</p>
              )}
              
              {/* Report Canvas */}
              {schemaLoaded && schemaLoader && canvasTypes.includes('report') && (
                <CollapsibleSection
                  title="Report Canvas"
                  tooltip="Controls the overall report appearance and behavior"
                  defaultOpen={false}
                >
                  <SchemaForm
                    schema={schemaLoader?.getVisualSchema('report')?.properties?.['*'] || {}}
                    value={visualSettings.report?.['*'] || {}}
                    onChange={(value) => {
                      const updatedVisualSettings = {
                        ...visualSettings,
                        report: {
                          '*': value
                        }
                      };
                      onVisualSettingsChange(updatedVisualSettings);
                      trackChange(['visualStyles', 'report']);
                    }}
                    schemaLoader={schemaLoader!}
                    path={['visualStyles', 'report', '*']}
                  />
                </CollapsibleSection>
              )}
              
              {/* Page Settings */}
              {schemaLoaded && schemaLoader && canvasTypes.includes('page') && (
                <CollapsibleSection
                  title="Page Settings"
                  tooltip="Configure page backgrounds, size, and layout options"
                  defaultOpen={false}
                >
                  <SchemaForm
                    schema={schemaLoader?.getVisualSchema('page')?.properties?.['*'] || {}}
                    value={visualSettings.page?.['*'] || {}}
                    onChange={(value) => {
                      const updatedVisualSettings = {
                        ...visualSettings,
                        page: {
                          '*': value
                        }
                      };
                      onVisualSettingsChange(updatedVisualSettings);
                      trackChange(['visualStyles', 'page']);
                    }}
                    schemaLoader={schemaLoader!}
                    path={['visualStyles', 'page', '*']}
                  />
                </CollapsibleSection>
              )}
              
              {/* Filter Pane */}
              {schemaLoaded && schemaLoader && canvasTypes.includes('filter') && (
                <CollapsibleSection
                  title="Filter Pane"
                  tooltip="Customize the appearance of filter panes and cards"
                  defaultOpen={false}
                >
                  <SchemaForm
                    schema={schemaLoader?.getVisualSchema('filter')?.properties?.['*'] || {}}
                    value={visualSettings.filter?.['*'] || {}}
                    onChange={(value) => {
                      const updatedVisualSettings = {
                        ...visualSettings,
                        filter: {
                          '*': value
                        }
                      };
                      onVisualSettingsChange(updatedVisualSettings);
                      trackChange(['visualStyles', 'filter']);
                    }}
                    schemaLoader={schemaLoader!}
                    path={['visualStyles', 'filter', '*']}
                  />
                </CollapsibleSection>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Variant Dialog */}
      {showVariantDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Create New Style Variant</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter a name for the new style variant. This will create a new set of styling options 
              for {selectedVisual} visuals.
            </p>
            <input
              type="text"
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
              placeholder="e.g. minimal, detailed, corporate"
              className="w-full px-3 py-2 border rounded-md mb-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (newVariantName && newVariantName !== '*') {
                    onCreateVariant(selectedVisual, newVariantName);
                    onSelectedVariantChange(newVariantName);
                    setNewVariantName('');
                    setShowVariantDialog(false);
                  }
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setNewVariantName('');
                  setShowVariantDialog(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newVariantName && newVariantName !== '*') {
                    onCreateVariant(selectedVisual, newVariantName);
                    onSelectedVariantChange(newVariantName);
                    setNewVariantName('');
                    setShowVariantDialog(false);
                  }
                }}
                disabled={!newVariantName || newVariantName === '*'}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                Create Variant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}