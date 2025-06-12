'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { ThemeDataColor } from '@/lib/theme-generation/types';

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

const TEXT_CLASS_NAMES = [
  'title',
  'header',
  'label',
  'callout',
  'largeLabel',
  'smallLabel',
  'largeTitle',
  'largeHeader',
  'banner',
  'hero',
  'footnote',
  'reference'
] as const;

const DEFAULT_TEXT_CLASSES: Record<string, TextClass> = {
  title: { fontSize: 16, bold: true },
  header: { fontSize: 14, bold: true },
  label: { fontSize: 12 },
  callout: { fontSize: 14 },
  largeLabel: { fontSize: 14 },
  smallLabel: { fontSize: 10 },
  largeTitle: { fontSize: 20, bold: true },
  largeHeader: { fontSize: 18, bold: true },
  banner: { fontSize: 24, bold: true },
  hero: { fontSize: 28, bold: true },
  footnote: { fontSize: 10 },
  reference: { fontSize: 11 }
};

export function TextClassesEditor({ open, onOpenChange, onUpdateTextClasses }: TextClassesEditorProps) {
  const { theme, updateTextClasses } = useThemeBuilderStore();
  const [localTextClasses, setLocalTextClasses] = useState<Record<string, TextClass>>({});
  
  const textClasses = theme.textClasses;
  const fontFamily = theme.fontFamily;
  const dataColors = theme.palette.colors;

  useEffect(() => {
    const initialClasses = { ...DEFAULT_TEXT_CLASSES };
    
    // Apply existing text classes
    if (textClasses) {
      Object.entries(textClasses).forEach(([key, value]) => {
        if (key in initialClasses) {
          initialClasses[key] = { ...initialClasses[key], ...value };
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

  const handleFontColorChange = (className: string, value: string) => {
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { 
        ...prev[className], 
        fontColor: { color: value }
      }
    }));
  };

  const handleBoldChange = (className: string, checked: boolean) => {
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { ...prev[className], bold: checked }
    }));
  };

  const handleDataColorSelect = (className: string, colorIndex: string) => {
    const index = parseInt(colorIndex);
    setLocalTextClasses(prev => ({
      ...prev,
      [className]: { 
        ...prev[className], 
        fontColor: { dataColorIndex: index }
      }
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
    
    if ('color' in fontColor) {
      return fontColor.color;
    }
    
    if ('dataColorIndex' in fontColor && fontColor.dataColorIndex !== undefined) {
      return dataColors[fontColor.dataColorIndex] || '#000000';
    }
    
    return '#000000';
  };

  const isDataColor = (fontColor?: ThemeDataColor): boolean => {
    return fontColor ? 'dataColorIndex' in fontColor : false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Text Classes Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Configure text styles for different elements in your reports
            </p>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset to Defaults
            </Button>
          </div>
          
          <div className="grid gap-4">
            {TEXT_CLASS_NAMES.map(className => {
              const textClass = localTextClasses[className] || {};
              const colorValue = getColorValue(textClass.fontColor);
              const useDataColor = isDataColor(textClass.fontColor);
              
              return (
                <div key={className} className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium capitalize">{className}</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${className}-size`}>Font Size</Label>
                      <Input
                        id={`${className}-size`}
                        type="number"
                        min="8"
                        max="48"
                        value={textClass.fontSize || 12}
                        onChange={(e) => handleFontSizeChange(className, e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`${className}-color`}>Color</Label>
                      {useDataColor ? (
                        <Select
                          value={textClass.fontColor?.dataColorIndex?.toString() || '0'}
                          onValueChange={(value) => handleDataColorSelect(className, value)}
                        >
                          <SelectTrigger id={`${className}-color`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom Color</SelectItem>
                            {dataColors.map((color, index) => (
                              <SelectItem key={index} value={index.toString()}>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded" 
                                    style={{ backgroundColor: color }}
                                  />
                                  Data Color {index + 1}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex gap-2">
                          <ColorPicker
                            value={colorValue}
                            onChange={(color) => handleFontColorChange(className, color)}
                          />
                          <Select
                            value="custom"
                            onValueChange={(value) => {
                              if (value !== 'custom') {
                                handleDataColorSelect(className, value);
                              }
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom">Custom</SelectItem>
                              {dataColors.map((_, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                  DC{index + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`${className}-bold`}>Bold</Label>
                      <div className="flex items-center h-10">
                        <Switch
                          id={`${className}-bold`}
                          checked={textClass.bold || false}
                          onCheckedChange={(checked) => handleBoldChange(className, checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div
                        className="h-10 flex items-center px-2 border rounded"
                        style={{
                          fontSize: `${textClass.fontSize || 12}px`,
                          color: colorValue,
                          fontWeight: textClass.bold ? 'bold' : 'normal',
                          fontFamily: fontFamily
                        }}
                      >
                        Sample Text
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}