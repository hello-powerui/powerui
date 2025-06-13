'use client';

import { useState, useEffect, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { getTokenOptions, resolveToken, ColorPalettes } from '@/lib/theme-generation/token-registry';

interface ModernColorPickerProps {
  value: any;
  onChange: (value: any) => void;
  dataColors?: string[];
  mode?: 'light' | 'dark';
  label?: string;
  description?: string;
  neutralPalette?: Record<string, string>;
}

type ColorType = 'token' | 'theme' | 'custom';

interface TokenOption {
  token: string;
  description: string;
  category: string;
}

// Get token options from centralized registry
const TOKEN_OPTIONS: TokenOption[] = getTokenOptions();

const PRESET_COLORS = [
  '#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e5e5e5', '#f5f5f5', '#ffffff',
  '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2',
  '#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5',
  '#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7',
  '#65a30d', '#84cc16', '#a3e635', '#bef264', '#d9f99d', '#ecfccb',
  '#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7',
  '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe',
  '#2563eb', '#3b82f6', '#60a5fa', '#93bbfc', '#c3d9fe', '#dbeafe',
  '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe',
  '#c026d3', '#d946ef', '#e879f9', '#f0abfc', '#f5d0fe', '#fae8ff',
];

export function ModernColorPicker({
  value,
  onChange,
  dataColors = [],
  mode = 'light',
  label,
  description,
  neutralPalette
}: ModernColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ColorType>('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [customColor, setCustomColor] = useState('#000000');

  // Determine current color type and value
  const currentColorInfo = useMemo(() => {
    if (!value || typeof value !== 'object') {
      return { type: 'custom' as ColorType, displayValue: '#000000', color: '#000000' };
    }

    // Check for token
    if (value.solid?.color && typeof value.solid.color === 'string' && value.solid.color.startsWith('@')) {
      return {
        type: 'token' as ColorType,
        displayValue: value.solid.color,
        color: getTokenPreviewColor(value.solid.color, mode, dataColors, neutralPalette)
      };
    }

    // Check for theme color
    if (value.solid?.color?.expr?.ThemeDataColor) {
      const colorId = value.solid.color.expr.ThemeDataColor.ColorId;
      return {
        type: 'theme' as ColorType,
        displayValue: `Theme Color ${colorId + 1}`,
        color: dataColors[colorId] || '#000000'
      };
    }

    // Custom hex color
    if (value.solid?.color && typeof value.solid.color === 'string') {
      return {
        type: 'custom' as ColorType,
        displayValue: value.solid.color,
        color: value.solid.color
      };
    }

    return { type: 'custom' as ColorType, displayValue: '#000000', color: '#000000' };
  }, [value, dataColors, mode, neutralPalette]);

  // Set active tab based on current value
  useEffect(() => {
    setActiveTab(currentColorInfo.type);
    if (currentColorInfo.type === 'custom') {
      setCustomColor(currentColorInfo.color);
    }
  }, [currentColorInfo]);

  // Filter tokens based on search
  const filteredTokens = useMemo(() => {
    if (!searchTerm) return TOKEN_OPTIONS;
    const search = searchTerm.toLowerCase();
    return TOKEN_OPTIONS.filter(
      token => 
        token.token.toLowerCase().includes(search) ||
        token.description.toLowerCase().includes(search) ||
        token.category.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  // Group tokens by category
  const groupedTokens = useMemo(() => {
    const groups: Record<string, TokenOption[]> = {};
    filteredTokens.forEach(token => {
      if (!groups[token.category]) {
        groups[token.category] = [];
      }
      groups[token.category].push(token);
    });
    return groups;
  }, [filteredTokens]);

  const handleTokenSelect = (token: string) => {
    onChange({ solid: { color: token } });
    setOpen(false);
    setSearchTerm('');
  };

  const handleThemeColorSelect = (index: number) => {
    onChange({ 
      solid: { 
        color: { 
          expr: { 
            ThemeDataColor: { 
              ColorId: index 
            } 
          } 
        } 
      } 
    });
    setOpen(false);
  };

  const handleCustomColorSelect = (color: string) => {
    onChange({ solid: { color } });
    setCustomColor(color);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 text-sm",
              "bg-white border border-gray-200 rounded-md",
              "hover:border-gray-300 hover:bg-gray-50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "transition-all duration-200"
            )}
          >
            <div 
              className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: currentColorInfo.color }}
            />
            <span className="flex-1 text-left font-mono text-xs">
              {currentColorInfo.displayValue}
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-80 p-0 border-gray-200"
          align="start"
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-8 h-9 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            {(['token', 'theme', 'custom'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab === 'token' && 'Tokens'}
                {tab === 'theme' && 'Theme Colors'}
                {tab === 'custom' && 'Custom'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-h-80 overflow-y-auto">
            {/* Tokens Tab */}
            {activeTab === 'token' && (
              <div className="p-2">
                {Object.entries(groupedTokens).map(([category, tokens]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 sticky top-0 bg-white">
                      {category}
                    </div>
                    <div className="space-y-0.5">
                      {tokens.map((token) => (
                        <button
                          key={token.token}
                          onClick={() => handleTokenSelect(token.token)}
                          className={cn(
                            "w-full flex items-center gap-2 px-2 py-1.5 rounded text-left",
                            "hover:bg-gray-50 transition-colors",
                            currentColorInfo.displayValue === token.token && "bg-gray-100"
                          )}
                        >
                          <div 
                            className="w-3 h-3 rounded border border-gray-200 flex-shrink-0"
                            style={{ backgroundColor: getTokenPreviewColor(token.token, mode, dataColors, neutralPalette) }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-xs text-gray-900 truncate">
                              {token.token}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {token.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Theme Colors Tab */}
            {activeTab === 'theme' && (
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {dataColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleThemeColorSelect(index)}
                      className={cn(
                        "relative group p-2 rounded-md border transition-all",
                        currentColorInfo.displayValue === `Theme Color ${index + 1}`
                          ? "border-gray-900 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div 
                        className="w-full h-8 rounded border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-600 mt-1 block">
                        #{index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Tab */}
            {activeTab === 'custom' && (
              <div className="p-4 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      handleCustomColorSelect(e.target.value);
                    }}
                    className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                        setCustomColor(color);
                        handleCustomColorSelect(color);
                      }
                    }}
                    placeholder="#000000"
                    className="flex-1 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Preset colors</p>
                  <div className="grid grid-cols-12 gap-1">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setCustomColor(color);
                          handleCustomColorSelect(color);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full aspect-square rounded border transition-all",
                          customColor === color
                            ? "border-gray-900 scale-110"
                            : "border-gray-200 hover:border-gray-400 hover:scale-105"
                        )}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Helper function to get token preview color
function getTokenPreviewColor(
  token: string, 
  mode: 'light' | 'dark',
  dataColors: string[] = [],
  neutralPalette?: Record<string, string>
): string {
  // Create palettes object for token resolution
  const palettes: ColorPalettes = {
    neutral: neutralPalette || null,
    dataColors: dataColors
  };
  
  // Use centralized token resolver
  const resolved = resolveToken(token, mode, palettes);
  return resolved || '#808080';
}