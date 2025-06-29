'use client';

import { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChangeIndicator } from '@/components/theme-studio/ui/change-indicator';
import { HelpTooltip } from '@/components/theme-studio/HelpTooltip';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';
import { THEME_STUDIO_TYPOGRAPHY } from '@/components/theme-studio/constants/typography';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import { CanvasLayoutSection } from './CanvasLayoutSection';
import Link from 'next/link';

interface FoundationPanelProps {
  theme: any;
  colorPalette: any;
  neutralPalette: any;
  visualSettings: Record<string, any>;
  hasChanges: (path: string[]) => boolean;
  onThemeChange: (updates: any) => void;
  onColorPaletteChange: (paletteId: string) => void;
  onNeutralPaletteChange: (paletteId: string) => void;
  onThemeModeChange: (mode: 'light' | 'dark') => void;
  onFontFamilyChange: (fontFamily: string) => void;
  onStructuralColorsChange: (colors: any) => void;
  onTextClassesChange: (textClasses: any) => void;
  onShowPaletteManager: (type: 'color' | 'neutral') => void;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  trackChange: (path: string[]) => void;
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
}

function FoundationPanelComponent({
  theme,
  colorPalette,
  neutralPalette,
  visualSettings,
  hasChanges,
  onThemeChange,
  onColorPaletteChange,
  onNeutralPaletteChange,
  onThemeModeChange,
  onFontFamilyChange,
  onStructuralColorsChange,
  onTextClassesChange,
  onShowPaletteManager,
  onVisualSettingsChange,
  trackChange,
  isVisible,
  onToggleVisibility,
}: FoundationPanelProps) {
  const [schemaLoader, setSchemaLoader] = useState<SchemaLoader | null>(null);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
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
        const canvas = schemaLoader.getCanvasTypes();
        setCanvasTypes(canvas);
        setSchemaLoaded(true);
      } catch (error) {
        // Silently fail - schema will be loaded on next attempt
      }
    };
    loadSchema();
  }, [schemaLoader]);
  
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
          <Palette className="w-5 h-5" />
          <span className={`writing-mode-vertical ${THEME_STUDIO_TYPOGRAPHY.description.size}`}>Theme Foundation</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-700" />
            <h2 className={`${THEME_STUDIO_TYPOGRAPHY.panelHeader.size} ${THEME_STUDIO_TYPOGRAPHY.panelHeader.weight}`}>Theme Foundation</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisibility(false)}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
          
          {/* Data Colors */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>Data Colors</Label>
                  <HelpTooltip 
                    content="Data colors are used for charts, graphs, and other data visualizations in your Power BI reports. Each color in the palette is automatically assigned to different data series."
                  />
                  <ChangeIndicator hasChanged={hasChanges(['colorPaletteId'])} />
                </div>
                <p className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color} mt-0.5`}>{colorPalette?.name || 'Custom'} • {colorPalette?.colors?.length || 0} colors</p>
              </div>
              <button
                onClick={() => onShowPaletteManager('color')}
                className={`${THEME_STUDIO_TYPOGRAPHY.button.size} bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-1.5 rounded-md transition-colors ${THEME_STUDIO_TYPOGRAPHY.button.weight}`}
              >
                Browse & Select
              </button>
            </div>
            
            {/* Overlapping color circles */}
            <div className="flex items-center">
              {(colorPalette?.colors || []).slice(0, 8).map((color: string, i: number) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer relative"
                  style={{ 
                    backgroundColor: color,
                    marginLeft: i === 0 ? 0 : '-8px',
                    zIndex: i
                  }}
                  title={color}
                />
              ))}
              {(colorPalette?.colors || []).length > 8 && (
                <div className="ml-2 text-xs text-gray-500">
                  +{(colorPalette?.colors || []).length - 8}
                </div>
              )}
            </div>
          </div>

          {/* Theme Mode */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>Theme Mode</Label>
              <HelpTooltip 
                content={
                  <div>
                    <p>Theme modes work with token usage to dynamically switch between light and dark color schemes in your reports.</p>
                    <Link href="/blog/building-power-bi-design-system" className="text-primary hover:underline mt-2 inline-block">
                      Learn more about using tokens →
                    </Link>
                  </div>
                }
              />
              <ChangeIndicator hasChanged={hasChanges(['mode'])} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onThemeModeChange('light')}
                className={`px-3 py-2 ${THEME_STUDIO_TYPOGRAPHY.label.size} rounded-md border transition-all ${
                  theme.mode === 'light'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light
              </button>
              <button
                onClick={() => onThemeModeChange('dark')}
                className={`px-3 py-2 ${THEME_STUDIO_TYPOGRAPHY.label.size} rounded-md border transition-all ${
                  theme.mode === 'dark'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
              </button>
            </div>
          </div>

          {/* Neutral Palette */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>Neutral Palette</Label>
                  <ChangeIndicator hasChanged={hasChanges(['neutralPaletteId'])} />
                </div>
                <p className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color} mt-0.5`}>{neutralPalette?.name || 'Azure'}</p>
              </div>
              <button
                onClick={() => onShowPaletteManager('neutral')}
                className={`${THEME_STUDIO_TYPOGRAPHY.button.size} bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-1.5 rounded-md transition-colors ${THEME_STUDIO_TYPOGRAPHY.button.weight}`}
              >
                Browse & Select
              </button>
            </div>
            
            {/* Compact neutral gradient */}
            <div className="h-8 rounded-md overflow-hidden flex border border-gray-200">
              {(neutralPalette?.colors || AZURE_NEUTRAL_PALETTE.colors).map((shade: any, i: number) => (
                <div
                  key={i}
                  className="flex-1 h-full"
                  style={{ backgroundColor: shade }}
                  title={shade}
                />
              ))}
            </div>
          </div>

          {/* Canvas & Layout */}
          <CanvasLayoutSection
            visualSettings={visualSettings}
            onVisualSettingsChange={onVisualSettingsChange}
            trackChange={trackChange}
            hasChanges={hasChanges}
            schemaLoader={schemaLoader}
            schemaLoaded={schemaLoaded}
            canvasTypes={canvasTypes}
            onClearSection={(visual) => {
              // Clear the visual section by removing it from visualSettings
              const updatedSettings = { ...visualSettings };
              delete updatedSettings[visual];
              onVisualSettingsChange(updatedSettings);
              trackChange(['visualStyles', visual]);
            }}
          />

        </div>
      </div>
    </div>
  );
}

// Memoize to prevent re-renders when only unrelated props change
export const FoundationPanel = memo(FoundationPanelComponent, (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.theme.colorPaletteId === nextProps.theme.colorPaletteId &&
    prevProps.theme.neutralPaletteId === nextProps.theme.neutralPaletteId &&
    prevProps.theme.mode === nextProps.theme.mode &&
    prevProps.theme.fontFamily === nextProps.theme.fontFamily &&
    prevProps.colorPalette?.id === nextProps.colorPalette?.id &&
    prevProps.neutralPalette?.id === nextProps.neutralPalette?.id &&
    JSON.stringify(prevProps.visualSettings) === JSON.stringify(nextProps.visualSettings)
  );
});