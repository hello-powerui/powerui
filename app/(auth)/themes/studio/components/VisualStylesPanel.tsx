'use client';

import { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { TypographyTab } from '@/components/theme-studio/typography/TypographyTab';
import { StructuralColorsTab } from '@/components/theme-studio/typography/StructuralColorsTab';
import { VisualsSection } from './VisualsSection';
import { GlobalSection } from './GlobalSection';
import { CanvasSection } from './CanvasSection';
import { getMappedVisualTypes } from '@/lib/powerbi/visual-name-mapping';


interface VisualStylesPanelProps {
  theme: any;
  visualSettings: Record<string, any>;
  selectedVisual: string;
  selectedVariant: string;
  selectedSection: 'typography' | 'structural' | 'visuals' | 'global' | 'canvas';
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onVisualStyleChange: (visual: string, variant: string, value: any) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onSelectedSectionChange: (section: 'typography' | 'structural' | 'visuals' | 'global' | 'canvas') => void;
  onCreateVariant: (visual: string, variantName: string, initialData?: any) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  onRenameVariant: (visual: string, oldName: string, newName: string) => void;
  getVisualVariants: (visual: string) => string[];
  trackChange: (path: string[]) => void;
  hasChanges: (path: string[]) => boolean;
  onEnterFocusMode?: () => void;
}

function VisualStylesPanelComponent({
  theme,
  visualSettings,
  selectedVisual,
  selectedVariant,
  selectedSection,
  onVisualSettingsChange,
  onVisualStyleChange,
  onSelectedVisualChange,
  onSelectedVariantChange,
  onSelectedSectionChange,
  onCreateVariant,
  onDeleteVariant,
  onRenameVariant,
  getVisualVariants,
  trackChange,
  hasChanges,
  onEnterFocusMode,
}: VisualStylesPanelProps) {
  const [schemaLoader, setSchemaLoader] = useState<SchemaLoader | null>(null);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [visualTypes, setVisualTypes] = useState<string[]>([]);
  const [canvasTypes, setCanvasTypes] = useState<string[]>([]);
  
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
        const allTypes = schemaLoader.getVisualTypes();
        const canvas = schemaLoader.getCanvasTypes();
        
        // Filter visual types to only include those with mappings
        const mappedTypes = getMappedVisualTypes();
        const filteredTypes = allTypes.filter(type => mappedTypes.includes(type));
        
        setVisualTypes(filteredTypes);
        setCanvasTypes(canvas);
        setSchemaLoaded(true);
      } catch (error) {
        // Silently fail - schema will be loaded on next attempt
      }
    };
    loadSchema();
  }, [schemaLoader]);
  
  // Render the appropriate section based on selection
  const renderSection = () => {
    switch (selectedSection) {
      case 'typography':
        return (
          <div className="p-4">
            <TypographyTab />
          </div>
        );
      
      case 'structural':
        return (
          <div className="p-4">
            <StructuralColorsTab />
          </div>
        );
      
      case 'visuals':
        return (
          <VisualsSection
            visualSettings={visualSettings}
            selectedVisual={selectedVisual}
            selectedVariant={selectedVariant}
            visualTypes={visualTypes}
            onVisualSettingsChange={onVisualSettingsChange}
            onSelectedVisualChange={onSelectedVisualChange}
            onSelectedVariantChange={onSelectedVariantChange}
            onCreateVariant={onCreateVariant}
            onDeleteVariant={onDeleteVariant}
            onRenameVariant={onRenameVariant}
            getVisualVariants={getVisualVariants}
            trackChange={trackChange}
            onEnterFocusMode={onEnterFocusMode}
            schemaLoader={schemaLoader}
          />
        );
      
      case 'global':
        return (
          <GlobalSection
            visualSettings={visualSettings}
            onVisualSettingsChange={onVisualSettingsChange}
            trackChange={trackChange}
            schemaLoader={schemaLoader}
            schemaLoaded={schemaLoaded}
          />
        );
      
      case 'canvas':
        return (
          <CanvasSection
            visualSettings={visualSettings}
            onVisualSettingsChange={onVisualSettingsChange}
            trackChange={trackChange}
            hasChanges={hasChanges}
            schemaLoader={schemaLoader}
            schemaLoaded={schemaLoaded}
            canvasTypes={canvasTypes}
          />
        );
      
      default:
        return null;
    }
  };

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
            onClick={() => onSelectedSectionChange('global')}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'global'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Global
          </button>
          <button
            onClick={() => onSelectedSectionChange('canvas')}
            className={cn(
              "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
              selectedSection === 'canvas'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Canvas
          </button>
          <div className="flex-1" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="pb-20">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

// Export without memoization to ensure updates work properly
export const VisualStylesPanel = VisualStylesPanelComponent;