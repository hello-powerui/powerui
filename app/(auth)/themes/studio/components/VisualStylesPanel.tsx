'use client';

import { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { TypographyTab } from '@/components/theme-studio/typography/TypographyTab';
import { StructuralColorsTab } from '@/components/theme-studio/typography/StructuralColorsTab';
import { VisualsSection } from './VisualsSection';
import { GlobalSection } from './GlobalSection';


interface VisualStylesPanelProps {
  theme: any;
  visualSettings: Record<string, any>;
  selectedVisual: string;
  selectedVariant: string;
  selectedSection: 'typography' | 'structural' | 'visuals' | 'global';
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onVisualStyleChange: (visual: string, variant: string, value: any) => void;
  onSelectedVisualChange: (visual: string) => void;
  onSelectedVariantChange: (variant: string) => void;
  onSelectedSectionChange: (section: 'typography' | 'structural' | 'visuals' | 'global') => void;
  onCreateVariant: (visual: string, variantName: string) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  getVisualVariants: (visual: string) => string[];
  trackChange: (path: string[]) => void;
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
  getVisualVariants,
  trackChange,
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
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const VisualStylesPanel = memo(VisualStylesPanelComponent, (prevProps, nextProps) => {
  // Custom comparison - only re-render if relevant props change
  return (
    prevProps.selectedVisual === nextProps.selectedVisual &&
    prevProps.selectedVariant === nextProps.selectedVariant &&
    prevProps.selectedSection === nextProps.selectedSection &&
    JSON.stringify(prevProps.visualSettings) === JSON.stringify(nextProps.visualSettings) &&
    // Don't re-render for theme name changes
    prevProps.theme.id === nextProps.theme.id &&
    prevProps.theme.colorPaletteId === nextProps.theme.colorPaletteId &&
    prevProps.theme.neutralPaletteId === nextProps.theme.neutralPaletteId &&
    prevProps.theme.mode === nextProps.theme.mode &&
    prevProps.theme.fontFamily === nextProps.theme.fontFamily
  );
});