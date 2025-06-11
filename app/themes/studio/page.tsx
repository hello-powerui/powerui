'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';
import { PowerBIPreview } from '@/components/theme-builder/PowerBIPreview';
import { PaletteManager } from '@/components/palette/PaletteManager';
import { NeutralPaletteManager } from '@/components/palette/NeutralPaletteManager';
import { generateTheme, getNeutralPalettePreview } from '@/lib/theme-generation';
import { toast } from 'sonner';
import { 
  Save, 
  Download, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Palette,
  Layers,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisualStylesPanel } from '@/components/theme-studio/VisualStylesPanel';

export default function UnifiedThemeStudio() {
  const router = useRouter();
  const [selectedVisual, setSelectedVisual] = useState<string>('*');
  const [showPaletteManager, setShowPaletteManager] = useState(false);
  const [showNeutralPaletteManager, setShowNeutralPaletteManager] = useState(false);
  const [showNeutralPreview, setShowNeutralPreview] = useState(false);
  const [visualSettings, setVisualSettings] = useState<Record<string, any>>({});
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  
  // Sidebar states
  const [showFoundation, setShowFoundation] = useState(true);
  const [showVisualStyles, setShowVisualStyles] = useState(false);
  
  const { 
    theme, 
    setPalette, 
    setNeutralPalette,
    setThemeMode,
    setFontFamily,
    setBorderRadius,
    setSpacing,
    setBgStyle,
    setBorderStyle,
    generateAndSaveTheme
  } = useThemeBuilderStore();
  
  const { palettes, neutralPalettes } = usePaletteStore();
  const { 
    theme: advancedTheme, 
    setTheme: setAdvancedTheme,
    selectedState,
    setSelectedState,
    selectedVariant,
    setSelectedVariant
  } = useThemeAdvancedStore();

  // Generate theme whenever foundation or visual settings change
  useEffect(() => {
    const themeInput = {
      name: theme.name,
      mode: theme.mode,
      dataColors: theme.palette.colors,
      neutralPalette: theme.neutralPalette.shades,
      fontFamily: theme.fontFamily.toLowerCase().replace(/\s+/g, '-'),
      borderRadius: theme.borderRadius,
      bgStyle: theme.bgStyle || 'default',
      borderStyle: theme.borderStyle || 'default',
      paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default',
      visualStyles: visualSettings
    };
    generateTheme(themeInput).then(setGeneratedTheme);
  }, [theme, visualSettings]);

  // Visual types available in Power BI
  const visualTypes = [
    { value: '*', label: 'All Visuals' },
    { value: 'barChart', label: 'Bar Chart' },
    { value: 'columnChart', label: 'Column Chart' },
    { value: 'lineChart', label: 'Line Chart' },
    { value: 'pieChart', label: 'Pie Chart' },
    { value: 'donutChart', label: 'Donut Chart' },
    { value: 'areaChart', label: 'Area Chart' },
    { value: 'scatterChart', label: 'Scatter Chart' },
    { value: 'waterfallChart', label: 'Waterfall Chart' },
    { value: 'treemap', label: 'Treemap' },
    { value: 'map', label: 'Map' },
    { value: 'filledMap', label: 'Filled Map' },
    { value: 'card', label: 'Card' },
    { value: 'multiRowCard', label: 'Multi-Row Card' },
    { value: 'kpi', label: 'KPI' },
    { value: 'gauge', label: 'Gauge' },
    { value: 'slicer', label: 'Slicer' },
    { value: 'tableEx', label: 'Table' },
    { value: 'pivotTable', label: 'Pivot Table' },
    { value: 'matrix', label: 'Matrix' },
  ];

  const handleSave = async () => {
    try {
      // Save the theme with visual customizations
      const themeData = {
        ...theme,
        visualStyles: visualSettings
      };
      
      // TODO: Implement save functionality that includes visual settings
      await generateAndSaveTheme('Unified Theme');
      toast.success('Theme saved successfully');
    } catch (error) {
      toast.error('Failed to save theme');
    }
  };

  const handleExport = async () => {
    try {
      const themeInput = {
        name: theme.name,
        mode: theme.mode,
        dataColors: theme.palette.colors,
        neutralPalette: theme.neutralPalette.shades,
        fontFamily: theme.fontFamily.toLowerCase().replace(/\s+/g, '-'),
        borderRadius: theme.borderRadius,
        bgStyle: theme.bgStyle || 'default',
        borderStyle: theme.borderStyle || 'default',
        paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default',
        visualStyles: visualSettings
      };
      const exportedTheme = await generateTheme(themeInput);
      const blob = new Blob([JSON.stringify(exportedTheme, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'power-bi-theme.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Theme exported successfully');
    } catch (error) {
      toast.error('Failed to export theme');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Foundation Sidebar */}
      <div className={cn(
        "border-r bg-muted/10 transition-all duration-300",
        showFoundation ? "w-96" : "w-12"
      )}>
        {showFoundation ? (
          <div className="h-full overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Foundation</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFoundation(false)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Data Colors */}
              <div className="space-y-2">
                <Label>Data Colors</Label>
                <Card 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setShowPaletteManager(true)}
                >
                  <div className="flex gap-2">
                    {theme.palette.colors.slice(0, 8).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {theme.palette.colors.length > 8 && (
                      <span className="text-sm text-muted-foreground">
                        +{theme.palette.colors.length - 8}
                      </span>
                    )}
                  </div>
                </Card>
              </div>

              {/* Theme Mode */}
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <Select 
                  value={theme.mode} 
                  onValueChange={(value: 'light' | 'dark') => setThemeMode(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Neutral Palette */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Neutral Palette</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowNeutralPreview(!showNeutralPreview)}
                    className="h-6 px-2 text-xs"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    {showNeutralPreview ? 'Hide' : 'Show'} Mapping
                  </Button>
                </div>
                <Card 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setShowNeutralPaletteManager(true)}
                >
                  <div className="flex gap-1">
                    {Object.values(theme.neutralPalette.shades).map((shade, i) => (
                      <div
                        key={i}
                        className="flex-1 h-6 first:rounded-l last:rounded-r"
                        style={{ backgroundColor: shade }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {theme.neutralPalette.name}
                  </p>
                </Card>
                
                {/* Neutral Palette Mapping Preview */}
                {showNeutralPreview && (
                  <Card className="p-3 space-y-2 text-xs bg-muted/20">
                    <p className="font-medium text-sm mb-2">Automatic Mapping ({theme.mode} mode):</p>
                    {getNeutralPalettePreview(theme.neutralPalette, theme.mode).slice(0, 5).map((mapping) => (
                      <div key={mapping.property} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: mapping.value }}
                        />
                        <span className="font-mono text-muted-foreground">
                          {mapping.property}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          - {mapping.description}
                        </span>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground pt-1">
                      These colors are automatically applied based on your neutral palette and theme mode.
                    </p>
                  </Card>
                )}
              </div>

              {/* Typography */}
              <div className="space-y-2">
                <Label>Typography</Label>
                <Select value={theme.fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
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

              {/* Base Properties */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Base Properties</h3>
                
                {/* Border Radius */}
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Select 
                    value={theme.borderRadius.toString()} 
                    onValueChange={(value) => setBorderRadius(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0px - Sharp</SelectItem>
                      <SelectItem value="2">2px</SelectItem>
                      <SelectItem value="4">4px - Default</SelectItem>
                      <SelectItem value="6">6px</SelectItem>
                      <SelectItem value="8">8px - Rounded</SelectItem>
                      <SelectItem value="12">12px - Very Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spacing */}
                <div className="space-y-2">
                  <Label>Spacing</Label>
                  <Select 
                    value={theme.spacing} 
                    onValueChange={(value: 'compact' | 'normal' | 'relaxed') => setSpacing(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Background Style */}
                <div className="space-y-2">
                  <Label>Container Style</Label>
                  <Select 
                    value={theme.bgStyle} 
                    onValueChange={setBgStyle}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="subtle-contrast">Subtle Contrast</SelectItem>
                      <SelectItem value="inversed-contrast">Inversed Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls visual container backgrounds
                  </p>
                </div>

                {/* Border Style */}
                <div className="space-y-2">
                  <Label>Border Style</Label>
                  <Select 
                    value={theme.borderStyle} 
                    onValueChange={setBorderStyle}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Borders</SelectItem>
                      <SelectItem value="subtle">Subtle Borders</SelectItem>
                      <SelectItem value="none">No Borders</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls visual border appearance
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-6 space-y-2">
                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Theme
                </Button>
                <Button onClick={handleExport} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center py-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFoundation(true)}
              className="mb-4"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Palette className="w-5 h-5" />
              <span className="writing-mode-vertical text-xs">Foundation</span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Styles Sidebar */}
      <div className={cn(
        "border-r bg-muted/10 transition-all duration-300",
        showVisualStyles ? "w-96" : "w-12"
      )}>
        {showVisualStyles ? (
          <div className="h-full overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Visual Styles</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVisualStyles(false)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>

              {/* Visual Selector */}
              <div className="space-y-2">
                <Label>Select Visual</Label>
                <Select value={selectedVisual} onValueChange={setSelectedVisual}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visualTypes.map((visual) => (
                      <SelectItem key={visual.value} value={visual.value}>
                        {visual.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Visual Styles Panel */}
              <VisualStylesPanel
                selectedVisual={selectedVisual}
                visualLabel={visualTypes.find(v => v.value === selectedVisual)?.label || selectedVisual}
                onThemeChange={(newTheme) => {
                  // Update visual settings from advanced theme
                  if (newTheme.visualStyles) {
                    setVisualSettings(newTheme.visualStyles);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center py-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVisualStyles(true)}
              className="mb-4"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Layers className="w-5 h-5" />
              <span className="writing-mode-vertical text-xs">Visual Styles</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="flex-1 overflow-hidden">
        <PowerBIPreview 
          generatedTheme={generatedTheme}
          selectedVisualType={selectedVisual} 
        />
      </div>

      {/* Modals */}
      {showPaletteManager && (
        <PaletteManager
          isOpen={showPaletteManager}
          onClose={() => setShowPaletteManager(false)}
          selectedPaletteId={theme.palette.id}
          onSelect={(palette) => {
            setPalette(palette);
            setShowPaletteManager(false);
          }}
        />
      )}

      {showNeutralPaletteManager && (
        <NeutralPaletteManager
          isOpen={showNeutralPaletteManager}
          onClose={() => setShowNeutralPaletteManager(false)}
          selectedPaletteId={theme.neutralPalette.id}
          onSelect={(palette) => {
            setNeutralPalette(palette);
            setShowNeutralPaletteManager(false);
          }}
        />
      )}
    </div>
  );
}