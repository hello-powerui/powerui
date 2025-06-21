'use client';

import { useCallback } from 'react';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';

interface CanvasLayoutSectionProps {
  visualSettings: Record<string, any>;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  hasChanges: (path: string[]) => boolean;
  schemaLoader: SchemaLoader | null;
  schemaLoaded: boolean;
  canvasTypes: string[];
}

export function CanvasLayoutSection({
  visualSettings,
  onVisualSettingsChange,
  trackChange,
  hasChanges,
  schemaLoader,
  schemaLoaded,
  canvasTypes,
}: CanvasLayoutSectionProps) {
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
    <>
      {!schemaLoaded ? (
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Loading schema...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="-space-y-px">
          {/* Debug info */}
          {schemaLoaded && canvasTypes.length === 0 && (
            <p className="text-xs text-gray-600 mb-2">No canvas properties available in schema</p>
          )}
          
          {/* Report Canvas */}
          {schemaLoaded && schemaLoader && canvasTypes.includes('report') && (
            <CollapsibleSection
              title="Report Canvas"
              tooltip="Controls the overall report appearance and behavior"
              defaultOpen={false}
              hasChanges={hasChanges(['visualStyles', 'report'])}
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
              hasChanges={hasChanges(['visualStyles', 'page'])}
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
              hasChanges={hasChanges(['visualStyles', 'filter'])}
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
      )}
    </>
  );
}