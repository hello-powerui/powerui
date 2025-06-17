'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { UnifiedColorPicker } from '@/components/ui/unified-color-picker';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';

type ThemeDataColor = string | { color: string } | { dataColorIndex: number };

interface TextClass {
  fontFace?: string;
  fontSize?: number;
  fontColor?: ThemeDataColor;
  bold?: boolean;
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
  title: { fontSize: 12, bold: true },
  label: { fontSize: 10 },
  callout: { fontSize: 45, bold: true },
  header: { fontSize: 12, bold: true },
  largeTitle: { fontSize: 20, bold: true },
  dataTitle: { fontSize: 14, bold: true },
  boldLabel: { fontSize: 10, bold: true },
  largeLabel: { fontSize: 12 },
  largeLightLabel: { fontSize: 12 },
  lightLabel: { fontSize: 10 },
  semiboldLabel: { fontSize: 10, bold: true },
  smallLabel: { fontSize: 9 },
  smallLightLabel: { fontSize: 9 },
  smallDataLabel: { fontSize: 9 }
};

export function TextClassesEditor({ open, onOpenChange, onUpdateTextClasses }: TextClassesEditorProps) {
  const { theme, updateTextClasses } = useThemeStudioStore();
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

  const handleFontColorChange = (className: string, value: any) => {
    // Handle the different formats that UnifiedColorPicker might return
    let fontColor: ThemeDataColor;
    
    if (typeof value === 'string') {
      // Simple color string
      fontColor = value;
    } else if (value?.solid?.color) {
      // PowerBI format - extract the color
      const solidColor = value.solid.color;
      if (typeof solidColor === 'string') {
        fontColor = solidColor;
      } else if (solidColor?.expr?.ThemeDataColor?.ColorId !== undefined) {
        // Theme color reference
        fontColor = { dataColorIndex: solidColor.expr.ThemeDataColor.ColorId };
      } else {
        fontColor = '#000000';
      }
    } else if (value?.color) {
      // Theme studio format
      fontColor = value.color;
    } else if (value?.themeColor?.id !== undefined) {
      // Theme color with id
      fontColor = { dataColorIndex: value.themeColor.id };
    } else {
      fontColor = value || '#000000';
    }
    
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { 
        ...prev[className], 
        fontColor
      }
    }));
  };

  const handleBoldChange = (className: string, checked: boolean) => {
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { ...prev[className], bold: checked }
    }));
  };

  const handleSave = () => {
    if (onUpdateTextClasses) {
      onUpdateTextClasses(localTextClasses);
    } else {
      updateTextClasses(localTextClasses);
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

  const getColorValue = (fontColor?: ThemeDataColor): string => {
    if (!fontColor) return '#000000';
    
    // If it's a string, return it directly
    if (typeof fontColor === 'string') {
      // Check if it's a token (starts with @)
      if (fontColor.startsWith('@')) {
        // For now, return a default color for tokens
        // In a real implementation, this would resolve the token
        return '#666666';
      }
      return fontColor;
    }
    
    // If it's an object with color property
    if (typeof fontColor === 'object' && 'color' in fontColor) {
      return fontColor.color;
    }
    
    // If it's an object with dataColorIndex property (theme color reference)
    if (typeof fontColor === 'object' && 'dataColorIndex' in fontColor && fontColor.dataColorIndex !== undefined) {
      return (dataColors && Array.isArray(dataColors)) ? (dataColors[fontColor.dataColorIndex] as string) || '#000000' : '#000000';
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
              const colorValue = getColorValue(textClass.fontColor);
              
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
                          fontWeight: textClass.bold ? 'bold' : 'normal',
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
                        </div>
                      </div>
                    
                      <div className="space-y-2">
                        <UnifiedColorPicker
                          label="Color"
                          value={textClass.fontColor || '#000000'}
                          onChange={(value) => handleFontColorChange(name, value)}
                          format="simple"
                          enableTokens={true}
                          enableThemeColors={true}
                          enableShades={false}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Style</Label>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`${name}-bold`}
                              checked={textClass.bold || false}
                              onCheckedChange={(checked) => handleBoldChange(name, checked)}
                            />
                            <Label htmlFor={`${name}-bold`} className="text-sm text-gray-600 cursor-pointer">
                              Bold
                            </Label>
                          </div>
                        </div>
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