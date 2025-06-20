'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Layers, Plus, Copy, Trash2, Focus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { GlobalPropertySelector } from '@/components/theme-studio/form/global-property-selector';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { Card } from '@/components/ui/card';
import { TypographyTab } from '@/components/theme-studio/typography/TypographyTab';
import { StructuralColorsTab } from '@/components/theme-studio/typography/StructuralColorsTab';

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
  selectedSection: 'typography' | 'structural' | 'visuals' | 'global';
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onVisualStyleChange: (visual: string, variant: string, value: any) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onSelectedStateChange: (state: string) => void;
  onSelectedSectionChange: (section: 'typography' | 'structural' | 'visuals' | 'global') => void;
  onCreateVariant: (visual: string, variantName: string) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  getVisualVariants: (visual: string) => string[];
  trackChange: (path: string[]) => void;
  onEnterFocusMode?: () => void;
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
  onEnterFocusMode,
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
  
  // Memoize the variants list to avoid calling getVisualVariants multiple times
  const visualVariants = useMemo(() => 
    selectedVisual ? getVisualVariants(selectedVisual) : []
  , [selectedVisual, getVisualVariants]);
  
  // Memoize the SchemaForm onChange handler
  const handleSchemaFormChange = useCallback((value: any) => {
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
  }, [visualSettings, selectedVisual, selectedVariant, onVisualSettingsChange, trackChange]);
  
  // Memoize handlers for canvas sections
  const createCanvasChangeHandler = useCallback((canvasType: string) => (value: any) => {
    const updatedVisualSettings = {
      ...visualSettings,
      [canvasType]: {
        '*': value
      }
    };
    onVisualSettingsChange(updatedVisualSettings);
    trackChange(['visualStyles', canvasType]);
  }, [visualSettings, onVisualSettingsChange, trackChange]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Figma-style Header */}
      <div className="border-b border-gray-200">
        {/* Tabs Row - Figma/Vercel style buttons */}
        <div className="flex items-center gap-1 p-2">
          <button
            onClick={() => onSelectedSectionChange('typography')}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'typography'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Typography
          </button>
          <button
            onClick={() => onSelectedSectionChange('structural')}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'structural'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Color
          </button>
          <button
            onClick={() => onSelectedSectionChange('visuals')}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'visuals'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Visuals
          </button>
          <button
            onClick={() => {
              onSelectedSectionChange('global');
              onSelectedVisualChange('*');
            }}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'global'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Global
          </button>
          <div className="flex-1" />
        </div>
        
        {/* Controls Row - Only for visuals section */}
        {selectedSection === 'visuals' && (
          <div className="flex items-center gap-2 px-3 py-1.5">
            <Select
              value={selectedVisual || ''}
              onValueChange={(value) => {
                onSelectedVisualChange(value);
                onSelectedVariantChange('*');
                onSelectedStateChange('default');
              }}
            >
              <SelectTrigger className="h-6 text-[11px] w-[140px]">
                <SelectValue placeholder="Select visual" />
              </SelectTrigger>
              <SelectContent>
                {visualTypes.map((visual) => (
                  <SelectItem key={visual} value={visual} className="text-xs">
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
                size="sm"
                className="h-6 px-2 text-[11px]"
                title="View this visual in focus mode"
              >
                <Focus className="w-3 h-3 mr-1" />
                Focus Mode
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedSection === 'typography' ? (
          <div className="p-4">
            <TypographyTab />
          </div>
        ) : selectedSection === 'structural' ? (
          <div className="p-4">
            <StructuralColorsTab />
          </div>
        ) : selectedSection === 'visuals' ? (
          selectedVisual ? (
            <div className="p-4">
              {/* Visual Style Variants - Enhanced Section */}
              <Card className="mb-3 p-4 border-gray-200 shadow-sm">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      Visual Style Variants
                      <span className="text-xs font-normal text-gray-500">
                        ({visualVariants.length} {visualVariants.length === 1 ? 'variant' : 'variants'} available)
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Create different style variations of this visual type. Each variant can have its own unique appearance while maintaining the same data representation.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedVariant || '*'}
                        onValueChange={onSelectedVariantChange}
                      >
                        <SelectTrigger className="flex-1 h-8 text-xs font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {visualVariants.map(variant => (
                            <SelectItem key={variant} value={variant} className="text-xs">
                              {variant === '*' ? 'Default Style' : variant}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center gap-1 pl-2 border-l border-gray-200">
                        <button
                          onClick={() => setShowVariantDialog(true)}
                          className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-1"
                          title="Create a new variant"
                        >
                          <Plus className="w-3 h-3" />
                          Create
                        </button>
                        
                        <button
                          onClick={() => {
                            const baseName = selectedVariant === '*' ? 'default' : selectedVariant;
                            let copyNumber = 1;
                            let newName = `${baseName}-copy`;
                            const variants = visualVariants;
                            
                            // Find a unique name
                            while (variants.includes(newName)) {
                              copyNumber++;
                              newName = `${baseName}-copy-${copyNumber}`;
                            }
                            
                            const variantName = prompt('Enter name for the duplicated variant:', newName);
                            if (variantName && !variants.includes(variantName)) {
                              // First create the variant
                              onCreateVariant(selectedVisual, variantName);
                              
                              // Then copy the current variant's settings
                              const currentSettings = visualSettings[selectedVisual]?.[selectedVariant] || {};
                              const updatedVisualSettings = {
                                ...visualSettings,
                                [selectedVisual]: {
                                  ...visualSettings[selectedVisual],
                                  [variantName]: JSON.parse(JSON.stringify(currentSettings))
                                }
                              };
                              onVisualSettingsChange(updatedVisualSettings);
                              onSelectedVariantChange(variantName);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                          title="Duplicate current variant"
                        >
                          <Copy className="w-3 h-3" />
                          Duplicate
                        </button>
                        
                        {selectedVariant !== '*' && (
                          <button
                            onClick={() => {
                              if (confirm(`Delete variant "${selectedVariant}"?`)) {
                                onDeleteVariant(selectedVisual, selectedVariant);
                                onSelectedVariantChange('*');
                              }
                            }}
                            className="p-1.5 text-xs font-medium text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Delete variant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Select a variant to customize its properties. The default variant (*) applies when no specific variant is selected.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Visual State Selector - only show for visuals with state support */}
              {hasStateDrivenProperties && (
                <Card className="mb-3 p-4 border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Visual States</h3>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Configure how this visual appears in different interaction states. Properties with state support will use the selected state.
                      </p>
                    </div>
                    
                    <div className="flex gap-1.5">
                      {['default', 'hover', 'selected', 'disabled'].map(state => (
                        <button
                          key={state}
                          onClick={() => onSelectedStateChange(state)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded transition-all",
                            selectedState === state
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                          )}
                        >
                          {state.charAt(0).toUpperCase() + state.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* SchemaForm renders its own tabs with collapsible sections */}
              {schemaLoader && (
                <SchemaForm
                  schema={
                    schemaLoader?.getPropertySchema(['visualStyles', selectedVisual]) ||
                    { type: 'object' }
                  }
                  value={{ '*': visualSettings[selectedVisual]?.[selectedVariant] || {} }}
                  onChange={handleSchemaFormChange}
                  schemaLoader={schemaLoader!}
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
          )
        ) : selectedSection === 'global' ? (
            <div className="p-4">
              {/* Global Settings Property Selector */}
              {schemaLoader && schemaLoaded ? (
                <GlobalPropertySelector
                  visualStyles={visualSettings}
                  onVisualStylesChange={onVisualSettingsChange}
                  schemaLoader={schemaLoader!}
                />
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Loading schema...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">
                Select a visual from the dropdown above to edit its styles
              </p>
            </div>
          )}

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
                    onChange={createCanvasChangeHandler('report')}
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
                    onChange={createCanvasChangeHandler('page')}
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
                    onChange={createCanvasChangeHandler('filter')}
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