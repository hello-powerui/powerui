'use client';

import { CanvasLayoutSection } from './CanvasLayoutSection';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';

interface CanvasSectionProps {
  visualSettings: Record<string, any>;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  hasChanges: (path: string[]) => boolean;
  schemaLoader: SchemaLoader | null;
  schemaLoaded: boolean;
  canvasTypes: string[];
}

export function CanvasSection({
  visualSettings,
  onVisualSettingsChange,
  trackChange,
  hasChanges,
  schemaLoader,
  schemaLoaded,
  canvasTypes,
}: CanvasSectionProps) {
  const handleClearSection = (visual: string) => {
    const updatedVisualSettings = { ...visualSettings };
    delete updatedVisualSettings[visual];
    onVisualSettingsChange(updatedVisualSettings);
    trackChange(['visualStyles', visual]);
  };

  return (
    <div className="p-4">
      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Configure canvas-level settings for your Power BI report including page layout, report behavior, and filter pane appearance
        </p>
      </div>

      {/* Canvas Layout Section */}
      <CanvasLayoutSection
        visualSettings={visualSettings}
        onVisualSettingsChange={onVisualSettingsChange}
        trackChange={trackChange}
        hasChanges={hasChanges}
        schemaLoader={schemaLoader}
        schemaLoaded={schemaLoaded}
        canvasTypes={canvasTypes}
        onClearSection={handleClearSection}
      />
    </div>
  );
}