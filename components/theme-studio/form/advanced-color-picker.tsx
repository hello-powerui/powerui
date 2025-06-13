'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ColorValue, 
  SolidColor, 
  ThemeColorReference 
} from '@/lib/theme-studio/types';

interface AdvancedColorPickerProps {
  label: string;
  value: ColorValue | undefined;
  onChange: (value: ColorValue) => void;
  description?: string;
  required?: boolean;
  path: string[];
}

type ColorMode = 'solid' | 'theme';

const themeColors = [
  { id: 0, name: 'Primary', preview: '#2568E8' },
  { id: 1, name: 'Secondary', preview: '#8338EC' },
  { id: 2, name: 'Tertiary', preview: '#FF006E' },
  { id: 3, name: 'Color 4', preview: '#F95608' },
  { id: 4, name: 'Color 5', preview: '#FFBE0C' },
  { id: 5, name: 'Color 6', preview: '#2ACF56' },
  { id: 6, name: 'Color 7', preview: '#3498DB' },
  { id: 7, name: 'Color 8', preview: '#A66999' },
];

const shadeOptions = [
  { value: 0, label: '0% (Original)' },
  { value: 10, label: '10% Lighter' },
  { value: 20, label: '20% Lighter' },
  { value: 30, label: '30% Lighter' },
  { value: 40, label: '40% Lighter' },
  { value: 50, label: '50% Lighter' },
  { value: -10, label: '10% Darker' },
  { value: -20, label: '20% Darker' },
  { value: -30, label: '30% Darker' },
  { value: -40, label: '40% Darker' },
  { value: -50, label: '50% Darker' },
];

export function AdvancedColorPicker({
  label,
  value,
  onChange,
  description,
  required,
  path,
}: AdvancedColorPickerProps) {
  const getCurrentMode = (): ColorMode => {
    if (!value) return 'solid';
    if ('color' in value) return 'solid';
    if ('themeColor' in value) return 'theme';
    return 'solid';
  };

  const [mode, setMode] = useState<ColorMode>(getCurrentMode());

  const getSolidColor = (): string => {
    if (value && 'color' in value) {
      return value.color;
    }
    return '#000000';
  };

  const getThemeColorId = (): number => {
    if (value && 'themeColor' in value) {
      return value.themeColor.id;
    }
    return 0;
  };

  const getThemeColorShade = (): number => {
    if (value && 'themeColor' in value) {
      return value.themeColor.shade;
    }
    return 0;
  };

  const handleModeChange = (newMode: ColorMode) => {
    setMode(newMode);
    
    if (newMode === 'solid') {
      onChange({ color: '#000000' });
    } else {
      onChange({ themeColor: { id: 0, shade: 0 } });
    }
  };

  const handleSolidColorChange = (color: string) => {
    onChange({ color });
  };

  const handleThemeColorChange = (id: number, shade: number) => {
    onChange({ themeColor: { id, shade } });
  };

  const inputId = path.join('-');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {required && (
          <Badge variant="secondary" className="text-xs px-1 py-0">
            Required
          </Badge>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {/* Mode selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleModeChange('solid')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'solid'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Solid Color
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('theme')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'theme'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Theme Reference
        </button>
      </div>

      {/* Color input based on mode */}
      {mode === 'solid' ? (
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Input
              id={inputId}
              type="text"
              value={getSolidColor()}
              onChange={(e) => handleSolidColorChange(e.target.value)}
              placeholder="#000000"
              className="font-mono text-sm"
            />
          </div>
          <input
            type="color"
            value={getSolidColor()}
            onChange={(e) => handleSolidColorChange(e.target.value)}
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Theme color selector */}
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">Theme Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {themeColors.map((themeColor) => (
                <button
                  key={themeColor.id}
                  type="button"
                  onClick={() => handleThemeColorChange(themeColor.id, getThemeColorShade())}
                  className={`relative p-3 rounded-md border-2 transition-all ${
                    getThemeColorId() === themeColor.id
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  title={themeColor.name}
                >
                  <div
                    className="w-full h-6 rounded"
                    style={{ backgroundColor: themeColor.preview }}
                  />
                  <span className="text-xs text-gray-600 mt-1 block">
                    {themeColor.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Shade selector */}
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">Shade Adjustment</Label>
            <select
              value={getThemeColorShade()}
              onChange={(e) => handleThemeColorChange(getThemeColorId(), parseInt(e.target.value))}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {shadeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600 mb-1">Current selection:</p>
            <code className="text-xs font-mono text-gray-800">
              themeColor: {`{ id: ${getThemeColorId()}, shade: ${getThemeColorShade()} }`}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}