'use client';

import { GlobalPropertySelector } from '@/components/theme-studio/form/global-property-selector';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';

interface GlobalSectionProps {
  visualSettings: Record<string, any>;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  schemaLoader: SchemaLoader | null;
  schemaLoaded: boolean;
}

export function GlobalSection({
  visualSettings,
  onVisualSettingsChange,
  trackChange,
  schemaLoader,
  schemaLoaded,
}: GlobalSectionProps) {
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

    </div>
  );
}