'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/ui/color-picker';
import { ChevronRight, RotateCcw, Copy, Palette } from 'lucide-react';

interface VisualCustomizerProps {
  visualType: string;
  visualLabel: string;
  currentSettings?: any;
  onSettingsChange: (settings: any) => void;
  generatedTheme?: any;
}

// Common visual properties that most visuals share
const commonProperties = {
  background: {
    label: 'Background',
    type: 'color',
    description: 'Visual background color'
  },
  border: {
    label: 'Border',
    type: 'group',
    properties: {
      show: { label: 'Show Border', type: 'boolean' },
      color: { label: 'Border Color', type: 'color' },
      radius: { label: 'Border Radius', type: 'number', min: 0, max: 20 }
    }
  },
  title: {
    label: 'Title',
    type: 'group',
    properties: {
      show: { label: 'Show Title', type: 'boolean' },
      fontColor: { label: 'Font Color', type: 'color' },
      fontSize: { label: 'Font Size', type: 'number', min: 8, max: 32 },
      fontFamily: { label: 'Font Family', type: 'select', options: ['Segoe UI', 'Arial', 'Calibri'] },
      alignment: { label: 'Alignment', type: 'select', options: ['left', 'center', 'right'] }
    }
  },
  padding: {
    label: 'Padding',
    type: 'number',
    min: 0,
    max: 50,
    description: 'Inner spacing'
  }
};

// Visual-specific properties
const visualProperties: Record<string, any> = {
  columnChart: {
    ...commonProperties,
    dataColors: {
      label: 'Data Colors',
      type: 'colorList',
      description: 'Colors for data series'
    },
    dataLabels: {
      label: 'Data Labels',
      type: 'group',
      properties: {
        show: { label: 'Show Labels', type: 'boolean' },
        color: { label: 'Label Color', type: 'color' },
        fontSize: { label: 'Font Size', type: 'number', min: 8, max: 24 }
      }
    },
    categoryAxis: {
      label: 'X-Axis',
      type: 'group',
      properties: {
        show: { label: 'Show Axis', type: 'boolean' },
        fontSize: { label: 'Label Size', type: 'number', min: 8, max: 16 },
        color: { label: 'Label Color', type: 'color' }
      }
    },
    valueAxis: {
      label: 'Y-Axis',
      type: 'group',
      properties: {
        show: { label: 'Show Axis', type: 'boolean' },
        fontSize: { label: 'Label Size', type: 'number', min: 8, max: 16 },
        color: { label: 'Label Color', type: 'color' },
        gridLines: { label: 'Show Grid Lines', type: 'boolean' }
      }
    }
  },
  card: {
    ...commonProperties,
    calloutValue: {
      label: 'Value',
      type: 'group',
      properties: {
        fontSize: { label: 'Font Size', type: 'number', min: 16, max: 72 },
        color: { label: 'Font Color', type: 'color' },
        fontFamily: { label: 'Font Family', type: 'select', options: ['Segoe UI', 'Arial', 'Calibri'] }
      }
    },
    categoryLabel: {
      label: 'Label',
      type: 'group',
      properties: {
        fontSize: { label: 'Font Size', type: 'number', min: 8, max: 24 },
        color: { label: 'Font Color', type: 'color' }
      }
    }
  },
  slicer: {
    ...commonProperties,
    items: {
      label: 'Items',
      type: 'group',
      properties: {
        fontColor: { label: 'Font Color', type: 'color' },
        background: { label: 'Item Background', type: 'color' },
        fontColorSelected: { label: 'Selected Font Color', type: 'color' },
        backgroundSelected: { label: 'Selected Background', type: 'color' }
      }
    },
    header: {
      label: 'Header',
      type: 'group',
      properties: {
        show: { label: 'Show Header', type: 'boolean' },
        fontColor: { label: 'Font Color', type: 'color' },
        fontSize: { label: 'Font Size', type: 'number', min: 8, max: 24 }
      }
    }
  },
  tableEx: {
    ...commonProperties,
    values: {
      label: 'Values',
      type: 'group',
      properties: {
        fontColorPrimary: { label: 'Font Color', type: 'color' },
        fontSize: { label: 'Font Size', type: 'number', min: 8, max: 16 },
        rowPadding: { label: 'Row Padding', type: 'number', min: 0, max: 20 }
      }
    },
    header: {
      label: 'Header',
      type: 'group',
      properties: {
        fontColor: { label: 'Font Color', type: 'color' },
        fontSize: { label: 'Font Size', type: 'number', min: 8, max: 20 },
        background: { label: 'Background', type: 'color' }
      }
    },
    grid: {
      label: 'Grid',
      type: 'group',
      properties: {
        gridVertical: { label: 'Vertical Lines', type: 'boolean' },
        gridHorizontal: { label: 'Horizontal Lines', type: 'boolean' },
        gridColor: { label: 'Grid Color', type: 'color' },
        rowAlternateColor: { label: 'Alternate Row Color', type: 'color' }
      }
    }
  }
};

export function VisualCustomizer({ 
  visualType, 
  visualLabel,
  currentSettings = {},
  onSettingsChange,
  generatedTheme
}: VisualCustomizerProps) {
  const [activeTab, setActiveTab] = useState('quick');
  const [settings, setSettings] = useState(currentSettings);
  
  // Get properties for the selected visual type
  const properties = visualProperties[visualType] || commonProperties;
  
  const handlePropertyChange = (path: string[], value: any) => {
    const newSettings = { ...settings };
    let current = newSettings;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };
  
  const handleReset = () => {
    setSettings({});
    onSettingsChange({});
  };
  
  const handleCopyFromTheme = () => {
    // Copy relevant settings from the generated theme
    if (generatedTheme?.visualStyles?.[visualType]?.['*']) {
      const themeSettings = generatedTheme.visualStyles[visualType]['*'];
      setSettings(themeSettings);
      onSettingsChange(themeSettings);
    }
  };
  
  const renderProperty = (key: string, property: any, path: string[] = []) => {
    const currentPath = [...path, key];
    const currentValue = currentPath.reduce((obj, k) => obj?.[k], settings);
    
    switch (property.type) {
      case 'boolean':
        return (
          <div key={key} className="flex items-center justify-between py-2">
            <Label htmlFor={key} className="text-sm">{property.label}</Label>
            <Switch
              id={key}
              checked={currentValue || false}
              onCheckedChange={(checked) => handlePropertyChange(currentPath, checked)}
            />
          </div>
        );
        
      case 'color':
        return (
          <div key={key} className="space-y-2 py-2">
            <Label htmlFor={key} className="text-sm">{property.label}</Label>
            <div className="flex gap-2">
              <Input
                id={key}
                type="color"
                value={currentValue || '#000000'}
                onChange={(e) => handlePropertyChange(currentPath, e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={currentValue || '#000000'}
                onChange={(e) => handlePropertyChange(currentPath, e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        );
        
      case 'number':
        return (
          <div key={key} className="space-y-2 py-2">
            <Label htmlFor={key} className="text-sm">{property.label}</Label>
            <Input
              id={key}
              type="number"
              min={property.min}
              max={property.max}
              value={currentValue || property.min || 0}
              onChange={(e) => handlePropertyChange(currentPath, parseInt(e.target.value))}
            />
            {property.description && (
              <p className="text-xs text-muted-foreground">{property.description}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div key={key} className="space-y-2 py-2">
            <Label htmlFor={key} className="text-sm">{property.label}</Label>
            <Select 
              value={currentValue || property.options[0]}
              onValueChange={(value) => handlePropertyChange(currentPath, value)}
            >
              <SelectTrigger id={key}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {property.options.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'group':
        return (
          <div key={key} className="space-y-2 py-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              {property.label}
            </h4>
            <div className="pl-4 space-y-2">
              {Object.entries(property.properties).map(([subKey, subProperty]: [string, any]) => 
                renderProperty(subKey, subProperty, currentPath)
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{visualLabel} Customization</h3>
          <p className="text-sm text-muted-foreground">
            Override foundation settings for this visual type
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyFromTheme}
            disabled={!generatedTheme}
          >
            <Copy className="w-4 h-4 mr-1" />
            From Theme
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Settings</TabsTrigger>
          <TabsTrigger value="advanced">All Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick" className="space-y-4">
          {/* Show most common properties */}
          {['background', 'border', 'title'].map(key => {
            if (properties[key]) {
              return renderProperty(key, properties[key]);
            }
            return null;
          })}
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          {/* Show all properties */}
          {Object.entries(properties).map(([key, property]) => 
            renderProperty(key, property)
          )}
        </TabsContent>
      </Tabs>
      
      <div className="pt-4 border-t">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            // TODO: Open advanced editor for this visual
            console.log('Open advanced editor for', visualType);
          }}
        >
          <Palette className="w-4 h-4 mr-2" />
          Open Advanced Editor
        </Button>
      </div>
    </Card>
  );
}