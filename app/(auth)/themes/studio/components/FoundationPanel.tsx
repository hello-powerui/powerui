'use client';

import { useState } from 'react';
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
import { getNeutralPalettePreview } from '@/lib/theme-generation';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface FoundationPanelProps {
  theme: any;
  colorPalette: any;
  neutralPalette: any;
  hasChanges: (path: string[]) => boolean;
  onThemeChange: (updates: any) => void;
  onColorPaletteChange: (paletteId: string) => void;
  onNeutralPaletteChange: (paletteId: string) => void;
  onThemeModeChange: (mode: 'light' | 'dark') => void;
  onFontFamilyChange: (fontFamily: string) => void;
  onStructuralColorsChange: (colors: any) => void;
  onStructuralColorsModeChange: (mode: 'auto' | 'custom') => void;
  onTextClassesChange: (textClasses: any) => void;
  onShowPaletteManager: (type: 'color' | 'neutral') => void;
  onShowTextClassesEditor: () => void;
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
}

export function FoundationPanel({
  theme,
  colorPalette,
  neutralPalette,
  hasChanges,
  onThemeChange,
  onColorPaletteChange,
  onNeutralPaletteChange,
  onThemeModeChange,
  onFontFamilyChange,
  onStructuralColorsChange,
  onStructuralColorsModeChange,
  onTextClassesChange,
  onShowPaletteManager,
  onShowTextClassesEditor,
  isVisible,
  onToggleVisibility,
}: FoundationPanelProps) {
  const [showNeutralPreview, setShowNeutralPreview] = useState(false);
  
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
          <span className="writing-mode-vertical text-xs">Theme Foundation</span>
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
            <h2 className="text-lg font-semibold">Theme Foundation</h2>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Theme Description */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <Label className="text-sm font-medium mb-2 block">Description</Label>
            <textarea
              value={theme.description || ''}
              onChange={(e) => onThemeChange({ description: e.target.value })}
              placeholder="Add a description for your theme..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md resize-none h-16 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>
          
          {/* Data Colors */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Label className="text-sm font-medium">Data Colors</Label>
                  <ChangeIndicator hasChanged={hasChanges(['colorPaletteId'])} />
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{colorPalette?.name || 'Custom'} • {colorPalette?.colors?.length || 0} colors</p>
              </div>
              <button
                onClick={() => onShowPaletteManager('color')}
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-1.5 rounded-md transition-colors font-medium"
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
              <Label className="text-sm font-medium">Theme Mode</Label>
              <ChangeIndicator hasChanged={hasChanges(['mode'])} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onThemeModeChange('light')}
                className={`px-3 py-2 text-sm rounded-md border transition-all ${
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
                className={`px-3 py-2 text-sm rounded-md border transition-all ${
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
                  <Label className="text-sm font-medium">Neutral Palette</Label>
                  <ChangeIndicator hasChanged={hasChanges(['neutralPaletteId'])} />
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{neutralPalette?.name || 'Azure'}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowNeutralPreview(!showNeutralPreview)}
                  className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  {showNeutralPreview ? 'Hide' : 'Show'} Details
                </button>
                <button
                  onClick={() => onShowPaletteManager('neutral')}
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-1.5 rounded-md transition-colors font-medium"
                >
                  Browse & Select
                </button>
              </div>
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
            
            {/* Neutral Palette Details */}
            {showNeutralPreview && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                <p className="text-xs font-medium text-gray-700 mb-2">Auto-mapped to:</p>
                {getNeutralPalettePreview(neutralPalette || AZURE_NEUTRAL_PALETTE, theme.mode).slice(0, 4).map((mapping) => (
                  <div key={mapping.property} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded border border-gray-200"
                      style={{ backgroundColor: mapping.value }}
                    />
                    <span className="text-xs text-gray-600">
                      {mapping.property.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Structural Colors Section */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm font-medium">Structural Colors</Label>
                <ChangeIndicator hasChanged={hasChanges(['structuralColors']) || hasChanges(['structuralColorsMode'])} />
              </div>
              <div className="flex rounded-md border border-gray-200 overflow-hidden">
                <button
                  onClick={() => onStructuralColorsModeChange('auto')}
                  className={`px-3 py-1 text-xs transition-colors ${
                    theme.structuralColorsMode === 'auto' || !theme.structuralColorsMode
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Auto
                </button>
                <button
                  onClick={() => onStructuralColorsModeChange('custom')}
                  className={`px-3 py-1 text-xs transition-colors border-l border-gray-200 ${
                    theme.structuralColorsMode === 'custom'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>
            
            {theme.structuralColorsMode === 'auto' || !theme.structuralColorsMode ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Automatically derived from your neutral palette
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {getNeutralPalettePreview(neutralPalette || AZURE_NEUTRAL_PALETTE, theme.mode)
                    .filter(m => ['firstLevelElements', 'secondLevelElements', 'thirdLevelElements', 'fourthLevelElements'].includes(m.property))
                    .map((mapping) => (
                    <div key={mapping.property} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded border border-gray-200"
                        style={{ backgroundColor: mapping.value }}
                      />
                      <span className="text-xs text-gray-600">
                        {mapping.property.replace(/([A-Z])/g, ' $1').replace('Elements', '').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { key: 'firstLevelElements', label: 'First Level', default: '#252526' },
                  { key: 'secondLevelElements', label: 'Second Level', default: '#2D2D30' },
                  { key: 'thirdLevelElements', label: 'Third Level', default: '#3E3E42' },
                  { key: 'fourthLevelElements', label: 'Fourth Level', default: '#4D4D4D' },
                  { key: 'background', label: 'Background', default: '#1E1E1E' },
                  { key: 'secondaryBackground', label: 'Secondary BG', default: '#181818' },
                  { key: 'tableAccent', label: 'Table Accent', default: '#0E639C' }
                ].map(({ key, label, default: defaultColor }) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="text-xs text-gray-600">{label}</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.structuralColors?.[key as keyof typeof theme.structuralColors] || defaultColor}
                        onChange={(e) => {
                          const updatedColors = {
                            ...theme.structuralColors,
                            [key]: e.target.value
                          };
                          onStructuralColorsChange(updatedColors);
                        }}
                        className="w-6 h-6 rounded border border-gray-200 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-gray-500">
                        {(theme.structuralColors?.[key as keyof typeof theme.structuralColors] || defaultColor).substring(0, 7)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Typography & Text Classes */}
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm font-medium">Typography</Label>
                <ChangeIndicator hasChanged={hasChanges(['fontFamily'])} />
              </div>
              <button
                onClick={onShowTextClassesEditor}
                className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
              >
                Text Classes
              </button>
            </div>
            <Select value={theme.fontFamily} onValueChange={onFontFamilyChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Segoe UI">Segoe UI (Default)</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Calibri">Calibri</SelectItem>
                <SelectItem value="Helvetica Neue">Helvetica Neue</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>
    </div>
  );
}