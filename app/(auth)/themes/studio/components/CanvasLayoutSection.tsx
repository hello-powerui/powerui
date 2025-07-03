'use client';

import { useCallback } from 'react';
import { CollapsibleSection } from '@/components/theme-studio/ui/collapsible-section';
import { SchemaForm } from '@/components/theme-studio/form/schema-form';
import { PageSettingsPanel } from '@/components/theme-studio/form/PageSettingsPanel';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { hasActualContent } from '@/lib/utils/theme-helpers';

interface CanvasLayoutSectionProps {
  visualSettings: Record<string, any>;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  hasChanges: (path: string[]) => boolean;
  schemaLoader: SchemaLoader | null;
  schemaLoaded: boolean;
  canvasTypes: string[];
  onClearSection?: (visual: string) => void;
}

export function CanvasLayoutSection({
  visualSettings,
  onVisualSettingsChange,
  trackChange,
  hasChanges,
  schemaLoader,
  schemaLoaded,
  canvasTypes,
  onClearSection,
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
        <div className="space-y-2">
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
              onClear={onClearSection ? () => onClearSection('report') : undefined}
              hasContent={hasActualContent(visualSettings.report?.['*'])}
            >
              <SchemaForm
                schema={schemaLoader?.getVisualSchema('report') || {}}
                value={visualSettings.report || {}}
                onChange={(value: any) => {
                  onVisualSettingsChange({
                    ...visualSettings,
                    report: value
                  });
                  trackChange(['visualStyles', 'report']);
                }}
                schemaLoader={schemaLoader}
                path={['visualStyles', 'report']}
              />
            </CollapsibleSection>
          )}
          
          {/* Page Settings - Now with multiple collapsible sections */}
          {schemaLoaded && schemaLoader && canvasTypes.includes('page') && (
            <PageSettingsPanel
              schema={schemaLoader?.getVisualSchema('page') || {}}
              value={visualSettings.page || {}}
              onChange={(value: any) => {
                onVisualSettingsChange({
                  ...visualSettings,
                  page: value
                });
              }}
              schemaLoader={schemaLoader}
              basePath={['visualStyles', 'page']}
              trackChange={trackChange}
            />
          )}
          
          {/* Filter Pane */}
          {schemaLoaded && schemaLoader && canvasTypes.includes('filter') && (
            <CollapsibleSection
              title="Filter Pane"
              tooltip="Customize the appearance of filter panes and cards"
              defaultOpen={false}
              onClear={onClearSection ? () => onClearSection('filter') : undefined}
              hasContent={hasActualContent(visualSettings.filter?.['*'])}
            >
              <SchemaForm
                schema={schemaLoader?.getVisualSchema('filter') || {}}
                value={visualSettings.filter || {}}
                onChange={(value: any) => {
                  onVisualSettingsChange({
                    ...visualSettings,
                    filter: value
                  });
                  trackChange(['visualStyles', 'filter']);
                }}
                schemaLoader={schemaLoader}
                path={['visualStyles', 'filter']}
              />
            </CollapsibleSection>
          )}
        </div>
      )}
    </>
  );
}