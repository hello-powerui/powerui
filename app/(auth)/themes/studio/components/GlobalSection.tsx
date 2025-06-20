'use client';

import { useCallback } from 'react';
import { GlobalPropertySelector } from '@/components/theme-studio/form/global-property-selector';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';

interface GlobalSectionProps {
  visualSettings: Record<string, any>;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  schemaLoader: SchemaLoader | null;
  schemaLoaded: boolean;
  canvasTypes: string[];
}

export function GlobalSection({
  visualSettings,
  onVisualSettingsChange,
  trackChange,
  schemaLoader,
  schemaLoaded,
  canvasTypes,
}: GlobalSectionProps) {
  // Memoize handlers for canvas sections
  const createCanvasChangeHandler = useCallback((canvasType: string) => {
    return (value: any) => {
      const updatedVisualSettings = {
        ...visualSettings,
        [canvasType]: {
          '*': value
        }
      };
      onVisualSettingsChange(updatedVisualSettings);
      trackChange(['visualStyles', canvasType]);
    };
  }, [visualSettings, onVisualSettingsChange, trackChange]);

  return (
    <div className="p-4">
      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Define global visual properties that apply across all visuals in your Power BI reports
        </p>
      </div>
      
      {/* Global Settings Property Selector */}
      {schemaLoader && schemaLoaded ? (
        <GlobalPropertySelector
          visualStyles={visualSettings}
          onVisualStylesChange={onVisualSettingsChange}
          schemaLoader={schemaLoader}
        />
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading schema...</p>
          </div>
        </div>
      )}

      {/* Canvas & Layout Section */}
      <div className="mt-6">
        <div className="flex items-center gap-2 px-1 mb-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <h3 className="text-sm font-medium text-gray-900">Canvas & Layout</h3>
        </div>
        <div className="-space-y-px">
          
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
                schemaLoader={schemaLoader}
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
                schemaLoader={schemaLoader}
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
                schemaLoader={schemaLoader}
                path={['visualStyles', 'filter', '*']}
              />
            </CollapsibleSection>
          )}
        </div>
      </div>
    </div>
  );
}