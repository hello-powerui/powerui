'use client';

import { useState, useEffect, memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Palette, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChangeIndicator } from '@/components/theme-studio/ui/change-indicator';
import { HelpTooltip } from '@/components/theme-studio/HelpTooltip';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';
import { THEME_STUDIO_TYPOGRAPHY } from '@/components/theme-studio/constants/typography';
import { SchemaLoader } from '@/lib/theme-studio/services/schema-loader';
import Link from 'next/link';
import { STATE_PALETTES, convertStatePaletteToHex } from '@/lib/theme-generation/state-palettes';
import { QuickCustomizations } from '@/components/theme-studio/foundation/QuickCustomizations';

interface FoundationPanelProps {
  theme: any;
  colorPalette: any;
  neutralPalette: any;
  brandPalette?: any;
  visualSettings: Record<string, any>;
  hasChanges: (path: string[]) => boolean;
  onThemeChange: (updates: any) => void;
  onColorPaletteChange: (paletteId: string) => void;
  onNeutralPaletteChange: (paletteId: string) => void;
  onBrandPaletteChange?: (palette: Record<string, string>) => void;
  onStatePaletteChange?: (type: 'success' | 'warning' | 'error', paletteName: string) => void;
  onThemeModeChange: (mode: 'light' | 'dark') => void;
  onFontFamilyChange: (fontFamily: string) => void;
  onStructuralColorsChange: (colors: any) => void;
  onTextClassesChange: (textClasses: any) => void;
  onShowPaletteManager: (type: 'color' | 'neutral') => void;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
  onQuickCustomizationChange?: (key: string, value: string) => void;
  trackChange: (path: string[]) => void;
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
}

function FoundationPanelComponent({
  theme,
  colorPalette,
  neutralPalette,
  brandPalette,
  visualSettings,
  hasChanges,
  onThemeChange,
  onColorPaletteChange,
  onNeutralPaletteChange,
  onBrandPaletteChange,
  onStatePaletteChange,
  onThemeModeChange,
  onFontFamilyChange,
  onStructuralColorsChange,
  onTextClassesChange,
  onShowPaletteManager,
  onVisualSettingsChange,
  onQuickCustomizationChange,
  trackChange,
  isVisible,
  onToggleVisibility,
}: FoundationPanelProps) {
  const [schemaLoader, setSchemaLoader] = useState<SchemaLoader | null>(null);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [canvasTypes, setCanvasTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'foundation' | 'quick'>('foundation');
  const [brandColor, setBrandColor] = useState(theme.brandColor || '#2568E8');
  
  // Always sync brand color with theme
  useEffect(() => {
    setBrandColor(theme.brandColor || '#2568E8');
  }, [theme.brandColor]);
  const [isGeneratingBrand, setIsGeneratingBrand] = useState(false);
  
  // Convert state palettes to hex for display
  const statePalettesHex = useMemo(() => ({
    success: {
      green: convertStatePaletteToHex(STATE_PALETTES.success.green),
      emerald: convertStatePaletteToHex(STATE_PALETTES.success.emerald),
      teal: convertStatePaletteToHex(STATE_PALETTES.success.teal),
      blue: convertStatePaletteToHex(STATE_PALETTES.success.blue),
    },
    warning: {
      amber: convertStatePaletteToHex(STATE_PALETTES.warning.amber),
      orange: convertStatePaletteToHex(STATE_PALETTES.warning.orange),
      yellow: convertStatePaletteToHex(STATE_PALETTES.warning.yellow),
    },
    error: {
      red: convertStatePaletteToHex(STATE_PALETTES.error.red),
      rose: convertStatePaletteToHex(STATE_PALETTES.error.rose),
      pink: convertStatePaletteToHex(STATE_PALETTES.error.pink),
    }
  }), []);
  
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
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between p-4">
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
          {/* Tabs Row - Figma/Vercel style buttons */}
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={() => setActiveTab('foundation')}
              className={cn(
                "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
                activeTab === 'foundation'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              Foundation
            </button>
            <button
              onClick={() => setActiveTab('quick')}
              className={cn(
                "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all",
                activeTab === 'quick'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              Quick Styles
            </button>
            <div className="flex-1" />
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0, 0, 0, 0.015) 10px,
              rgba(0, 0, 0, 0.015) 20px
            )`
          }}
        >
          {activeTab === 'foundation' ? (
            <div className="p-4 pb-20 space-y-4">
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

          {/* Brand Palette */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>Brand Palette</Label>
                  <HelpTooltip 
                    content="Brand colors are used throughout your theme for interactive elements, accents, and emphasis. Enter your brand color to generate a complete palette."
                  />
                  <ChangeIndicator hasChanged={hasChanges(['brandPalette'])} />
                </div>
                <p className={`${THEME_STUDIO_TYPOGRAPHY.description.size} ${THEME_STUDIO_TYPOGRAPHY.description.color} mt-0.5`}>Generate from your brand color</p>
              </div>
            </div>
            
            {/* Brand color input and generator */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors flex-shrink-0"
                    style={{ backgroundColor: brandColor }}
                    onClick={() => {
                      const input = document.getElementById('brand-color-input') as HTMLInputElement;
                      input?.click();
                    }}
                  />
                  <input
                    id="brand-color-input"
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="sr-only"
                  />
                  <Input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    placeholder="#2568E8"
                    className="flex-1 h-8 text-sm"
                  />
                </div>
                <Button
                  onClick={async () => {
                    setIsGeneratingBrand(true);
                    try {
                      const response = await fetch('/api/generate-brand-palette', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ hexColor: brandColor }),
                      });
                      
                      if (response.ok) {
                        const data = await response.json();
                        onBrandPaletteChange?.(data.palette);
                        onThemeChange({ brandColor, brandPalette: data.palette });
                        trackChange(['brandPalette', 'brandColor']);
                      }
                    } catch (error) {
                      console.error('Failed to generate brand palette:', error);
                    } finally {
                      setIsGeneratingBrand(false);
                    }
                  }}
                  disabled={isGeneratingBrand}
                  size="sm"
                  className="bg-gray-900 text-white hover:bg-gray-800 h-8 px-3 text-sm"
                >
                  {isGeneratingBrand ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              
              {/* Brand palette preview */}
              {brandPalette && (
                <div className="h-6 rounded overflow-hidden flex border border-gray-200">
                  {Object.entries(brandPalette).map(([shade, color]) => (
                    <div
                      key={shade}
                      className="flex-1 h-full"
                      style={{ backgroundColor: color as string }}
                      title={`${shade}: ${color}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* State Palettes */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Label className={`${THEME_STUDIO_TYPOGRAPHY.label.size} ${THEME_STUDIO_TYPOGRAPHY.label.weight}`}>State Palettes</Label>
              <HelpTooltip 
                content="State palettes provide consistent colors for success, warning, and error states throughout your reports. Choose from pre-defined options optimized for accessibility."
              />
            </div>
            
            <div className="space-y-3">
              {/* Success Palette */}
              <div>
                <Label className="text-xs text-gray-600 mb-1.5 block">Success</Label>
                <Select
                  value={theme.successPalette || 'green'}
                  onValueChange={(value) => {
                    onStatePaletteChange?.('success', value);
                    trackChange(['successPalette']);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.green['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.green['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.green['700'] }} />
                        </div>
                        <span>Green</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="emerald">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.emerald['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.emerald['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.emerald['700'] }} />
                        </div>
                        <span>Emerald</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="teal">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.teal['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.teal['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.teal['700'] }} />
                        </div>
                        <span>Teal</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="blue">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.blue['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.blue['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.success.blue['700'] }} />
                        </div>
                        <span>Blue</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Warning Palette */}
              <div>
                <Label className="text-xs text-gray-600 mb-1.5 block">Warning</Label>
                <Select
                  value={theme.warningPalette || 'amber'}
                  onValueChange={(value) => {
                    onStatePaletteChange?.('warning', value);
                    trackChange(['warningPalette']);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amber">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.amber['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.amber['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.amber['700'] }} />
                        </div>
                        <span>Amber</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="orange">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.orange['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.orange['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.orange['700'] }} />
                        </div>
                        <span>Orange</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="yellow">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.yellow['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.yellow['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.warning.yellow['700'] }} />
                        </div>
                        <span>Yellow</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Error Palette */}
              <div>
                <Label className="text-xs text-gray-600 mb-1.5 block">Error</Label>
                <Select
                  value={theme.errorPalette || 'red'}
                  onValueChange={(value) => {
                    onStatePaletteChange?.('error', value);
                    trackChange(['errorPalette']);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.red['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.red['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.red['700'] }} />
                        </div>
                        <span>Red</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="rose">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.rose['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.rose['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.rose['700'] }} />
                        </div>
                        <span>Rose</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pink">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.pink['300'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.pink['500'] }} />
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statePalettesHex.error.pink['700'] }} />
                        </div>
                        <span>Pink</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
            </div>
          ) : (
            <div className="p-4 pb-20">
              <QuickCustomizations 
                hasChanges={hasChanges} 
                trackChange={trackChange}
              />
            </div>
          )}
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
    prevProps.theme.successPalette === nextProps.theme.successPalette &&
    prevProps.theme.warningPalette === nextProps.theme.warningPalette &&
    prevProps.theme.errorPalette === nextProps.theme.errorPalette &&
    prevProps.theme.brandColor === nextProps.theme.brandColor &&
    prevProps.colorPalette?.id === nextProps.colorPalette?.id &&
    prevProps.neutralPalette?.id === nextProps.neutralPalette?.id &&
    JSON.stringify(prevProps.brandPalette) === JSON.stringify(nextProps.brandPalette) &&
    JSON.stringify(prevProps.visualSettings) === JSON.stringify(nextProps.visualSettings)
  );
});