'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { FONT_WEIGHTS, FONT_AVAILABLE_WEIGHTS, pointsToPixels, getAvailableWeights, getWeightLabel } from '@/lib/theme-studio/font-registry';

type ThemeDataColor = string | { color: string } | { dataColorIndex: number };

interface TextClass {
  fontFace?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: ThemeDataColor;
}

interface TextClassesEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTextClasses?: (textClasses: Record<string, TextClass>) => void;
}

interface TextClassInfo {
  name: string;
  description: string;
  usage: string;
}

const TEXT_CLASS_INFO: TextClassInfo[] = [
  {
    name: 'title',
    description: 'Main titles for sections and axes',
    usage: 'Category axis title, Value axis title, Multi-row card title, Slicer header'
  },
  {
    name: 'label',
    description: 'Standard text for data and headers',
    usage: 'Table and matrix column/row headers, grid values'
  },
  {
    name: 'callout',
    description: 'Large, prominent text for emphasis',
    usage: 'Card data labels, KPI indicators'
  },
  {
    name: 'header',
    description: 'Section headers and important text',
    usage: 'Key influencers headers'
  },
  {
    name: 'largeTitle',
    description: 'Extra large titles for major sections',
    usage: 'Report titles, Dashboard headers'
  },
  {
    name: 'dataTitle',
    description: 'Titles for data-focused elements',
    usage: 'Data card titles, Metric headers'
  },
  {
    name: 'boldLabel',
    description: 'Bold version of standard labels',
    usage: 'Matrix subtotals, Table totals, Important values'
  },
  {
    name: 'largeLabel',
    description: 'Larger version of standard labels',
    usage: 'Multi-row card data labels'
  },
  {
    name: 'largeLightLabel',
    description: 'Large, light-weight text',
    usage: 'Secondary large text, Subtitle elements'
  },
  {
    name: 'lightLabel',
    description: 'Light-weight version of standard labels',
    usage: 'Legend text, Button text, Category axis labels'
  },
  {
    name: 'semiboldLabel',
    description: 'Semi-bold text for moderate emphasis',
    usage: 'Key influencers profile text'
  },
  {
    name: 'smallLabel',
    description: 'Smaller text for secondary information',
    usage: 'Reference line labels, Slicer date range labels'
  },
  {
    name: 'smallLightLabel',
    description: 'Small, light-weight text',
    usage: 'Tertiary information, Subtle labels'
  },
  {
    name: 'smallDataLabel',
    description: 'Small text for data values',
    usage: 'Compact data displays, Small metrics'
  }
];

const DEFAULT_TEXT_CLASSES: Record<string, TextClass> = {
  title: { fontSize: 12, fontWeight: "600" },
  label: { fontSize: 10, fontWeight: "400" },
  callout: { fontSize: 45, fontWeight: "700" },
  header: { fontSize: 12, fontWeight: "600" },
  largeTitle: { fontSize: 20, fontWeight: "700" },
  dataTitle: { fontSize: 14, fontWeight: "600" },
  boldLabel: { fontSize: 10, fontWeight: "700" },
  largeLabel: { fontSize: 12, fontWeight: "400" },
  largeLightLabel: { fontSize: 12, fontWeight: "300" },
  lightLabel: { fontSize: 10, fontWeight: "300" },
  semiboldLabel: { fontSize: 10, fontWeight: "600" },
  smallLabel: { fontSize: 9, fontWeight: "400" },
  smallLightLabel: { fontSize: 9, fontWeight: "300" },
  smallDataLabel: { fontSize: 9, fontWeight: "400" }
};

export function TextClassesEditor({ open, onOpenChange, onUpdateTextClasses }: TextClassesEditorProps) {
  const { theme, setTextClasses } = useThemeStudioStore();
  const [localTextClasses, setLocalTextClasses] = useState<Record<string, TextClass>>({});
  
  const textClasses = theme.textClasses;
  const fontFamily = theme.fontFamily;
  // TODO: Get colors from resolved palette instead of theme
  const dataColors = ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'];

  useEffect(() => {
    const initialClasses = { ...DEFAULT_TEXT_CLASSES };
    
    // Apply existing text classes
    if (textClasses) {
      Object.entries(textClasses).forEach(([key, value]) => {
        if (key in initialClasses) {
          initialClasses[key] = { ...initialClasses[key], ...(value as TextClass) };
        }
      });
    }
    
    // Set font family for all classes
    Object.keys(initialClasses).forEach(key => {
      initialClasses[key].fontFace = fontFamily;
    });
    
    setLocalTextClasses(initialClasses);
  }, [textClasses, fontFamily, open]);

  const handleFontSizeChange = (className: string, value: string) => {
    const fontSize = parseInt(value);
    if (!isNaN(fontSize) && fontSize > 0) {
      setLocalTextClasses(prev => ({
        ...prev,
        [className]: { ...prev[className], fontSize }
      }));
    }
  };

  const handleColorChange = (className: string, value: any) => {
    // Handle the different formats that UnifiedColorPicker might return
    let color: ThemeDataColor;
    
    if (typeof value === 'string') {
      // Simple color string
      color = value;
    } else if (value?.solid?.color) {
      // PowerBI format - extract the color
      const solidColor = value.solid.color;
      if (typeof solidColor === 'string') {
        color = solidColor;
      } else if (solidColor?.expr?.ThemeDataColor?.ColorId !== undefined) {
        // Theme color reference
        color = { dataColorIndex: solidColor.expr.ThemeDataColor.ColorId };
      } else {
        color = '#000000';
      }
    } else if (value?.color) {
      // Theme studio format
      color = value.color;
    } else if (value?.themeColor?.id !== undefined) {
      // Theme color with id
      color = { dataColorIndex: value.themeColor.id };
    } else {
      color = value || '#000000';
    }
    
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { 
        ...prev[className], 
        color
      }
    }));
  };

  const handleFontWeightChange = (className: string, weight: string) => {
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { ...prev[className], fontWeight: weight }
    }));
  };

  const handleSave = () => {
    if (onUpdateTextClasses) {
      onUpdateTextClasses(localTextClasses);
    } else {
      setTextClasses(localTextClasses);
    }
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetClasses = { ...DEFAULT_TEXT_CLASSES };
    Object.keys(resetClasses).forEach(key => {
      resetClasses[key].fontFace = fontFamily;
    });
    setLocalTextClasses(resetClasses);
  };

  const getColorValue = (color?: ThemeDataColor): string => {
    if (!color) return '#000000';
    
    // If it's a string, return it directly
    if (typeof color === 'string') {
      // Check if it's a token (starts with @)
      if (color.startsWith('@')) {
        // For now, return a default color for tokens
        // In a real implementation, this would resolve the token
        return '#666666';
      }
      return color;
    }
    
    // If it's an object with color property
    if (typeof color === 'object' && 'color' in color) {
      return color.color;
    }
    
    // If it's an object with dataColorIndex property (theme color reference)
    if (typeof color === 'object' && 'dataColorIndex' in color && color.dataColorIndex !== undefined) {
      return (dataColors && Array.isArray(dataColors)) ? (dataColors[color.dataColorIndex] as string) || '#000000' : '#000000';
    }
    
    return '#000000';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Typography & Text Classes</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Configure text styles for different elements in your Power BI reports
              </p>
              <p className="text-xs text-gray-500 mt-1">
                These styles will be applied consistently across all visuals that use text classes
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-900"
            >
              Reset All
            </Button>
          </div>
          
          <div className="space-y-3">
            {TEXT_CLASS_INFO.map(({ name, description, usage }) => {
              const textClass = localTextClasses[name] || {};
              const colorValue = getColorValue(textClass.color);
              const availableWeights = getAvailableWeights(fontFamily || 'Segoe UI');
              
              return (
                <div key={name} className="bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 capitalize">{name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                        <p className="text-xs text-gray-400 mt-1">Used in: {usage}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-md border border-gray-200 bg-gray-50"
                        style={{
                          fontSize: `${Math.min(textClass.fontSize || 12, 16)}px`,
                          color: colorValue,
                          fontWeight: textClass.fontWeight || '400',
                          fontFamily: fontFamily
                        }}
                      >
                        Aa
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${name}-size`} className="text-sm font-medium text-gray-700">
                          Font Size
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`${name}-size`}
                            type="number"
                            min="8"
                            max="72"
                            value={textClass.fontSize || 12}
                            onChange={(e) => handleFontSizeChange(name, e.target.value)}
                            className="w-20"
                          />
                          <span className="text-xs text-gray-500">pt</span>
                          <span className="text-xs text-gray-400">({pointsToPixels(textClass.fontSize || 12)}px)</span>
                        </div>
                      </div>
                    
                      <div className="space-y-2">
                        <UnifiedColorPicker
                          label="Color"
                          value={textClass.color || '#000000'}
                          onChange={(value) => handleColorChange(name, value)}
                          format="simple"
                          enableTokens={true}
                          enableThemeColors={true}
                          enableShades={false}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${name}-weight`} className="text-sm font-medium text-gray-700">
                          Font Weight
                        </Label>
                        <Select 
                          value={textClass.fontWeight || "400"} 
                          onValueChange={(value) => handleFontWeightChange(name, value)}
                        >
                          <SelectTrigger id={`${name}-weight`} className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FONT_WEIGHTS.filter(weight => 
                              availableWeights.includes(weight.value)
                            ).map(weight => (
                              <SelectItem key={weight.value} value={weight.value}>
                                {weight.label} ({weight.value})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Font family is inherited from theme settings: <span className="font-medium">{fontFamily || 'Default'}</span>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}