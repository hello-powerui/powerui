'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';
import { PowerBIPreview } from '@/components/theme-studio/PowerBIPreview';
import { PaletteManager } from '@/components/palette/PaletteManager';
import { NeutralPaletteManager } from '@/components/palette/NeutralPaletteManager';
import { TextClassesEditor } from '@/components/theme-studio/TextClassesEditor';
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
import { SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { SchemaForm } from '@/components/theme-advanced/form/schema-form';
import { ImportThemeModal } from '@/components/theme-advanced/ui/import-theme-modal';
import { CollapsibleSection } from '@/components/theme-advanced/ui/collapsible-section';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Icons
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PropertyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const VisualIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const GlobalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function UnifiedThemeStudio() {
  const router = useRouter();
  const [selectedVisual, setSelectedVisual] = useState<string>('');
  const [showPaletteManager, setShowPaletteManager] = useState(false);
  const [showNeutralPaletteManager, setShowNeutralPaletteManager] = useState(false);
  const [showNeutralPreview, setShowNeutralPreview] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showTextClassesEditor, setShowTextClassesEditor] = useState(false);
  const [visualSettings, setVisualSettings] = useState<Record<string, any>>({});
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  const [themeName, setThemeName] = useState('My Power BI Theme');
  const [isSaving, setIsSaving] = useState(false);
  
  // Advanced editor states
  const [selectedSection, setSelectedSection] = useState<'global' | 'properties' | 'visuals'>('visuals');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [schemaLoader] = useState(() => SchemaLoader.getInstance());
  const hasStateDrivenProperties = selectedVisual && schemaLoader.visualHasStateDrivenProperties(selectedVisual);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [visualTypes, setVisualTypes] = useState<string[]>([]);
  const [canvasTypes, setCanvasTypes] = useState<string[]>([]);
  const [topLevelProperties, setTopLevelProperties] = useState<string[]>([]);
  const [showVariantDialog, setShowVariantDialog] = useState(false);
  const [newVariantName, setNewVariantName] = useState('');
  
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
    setStructuralColors,
    setStructuralColorsMode,
    generateAndSaveTheme
  } = useThemeBuilderStore();
  
  // Sync theme mode to advanced store
  useEffect(() => {
    setAdvancedTheme({ ...advancedTheme, mode: theme.mode });
  }, [theme.mode]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // const { palettes, neutralPalettes } = usePaletteStore();
  const { 
    currentTheme: advancedTheme, 
    setTheme: setAdvancedTheme,
    selectedState,
    setSelectedState,
    selectedVariant,
    setSelectedVariant,
    updateThemeProperty,
    getVisualVariants,
    createVariant,
    deleteVariant
  } = useThemeAdvancedStore();
  
  // Load schema on mount
  useEffect(() => {
    const loadSchema = async () => {
      try {
        await schemaLoader.loadSchema();
        const types = schemaLoader.getVisualTypes();
        const canvas = schemaLoader.getCanvasTypes();
        console.log('Loaded visual types:', types);
        console.log('Loaded canvas types:', canvas);
        setVisualTypes(types);
        setCanvasTypes(canvas);
        setTopLevelProperties(schemaLoader.getTopLevelProperties());
        setSchemaLoaded(true);
      } catch (error) {
        console.error('Failed to load schema:', error);
      }
    };
    loadSchema();
  }, [schemaLoader]);

  // Generate theme whenever foundation or visual settings change
  useEffect(() => {
    // Merge visual settings with canvas properties from advancedTheme
    const mergedVisualStyles = {
      ...visualSettings,
      // Include canvas properties if they exist
      ...(advancedTheme?.visualStyles?.report && { report: advancedTheme.visualStyles.report }),
      ...(advancedTheme?.visualStyles?.page && { page: advancedTheme.visualStyles.page }),
      ...(advancedTheme?.visualStyles?.filter && { filter: advancedTheme.visualStyles.filter })
    };
    
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
      visualStyles: mergedVisualStyles,
      structuralColors: theme.structuralColorsMode === 'custom' ? theme.structuralColors : undefined,
      textClasses: theme.textClasses && Object.keys(theme.textClasses).length > 0 ? theme.textClasses : undefined
    };
    generateTheme(themeInput).then(setGeneratedTheme);
  }, [theme, visualSettings, advancedTheme]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save the theme with visual customizations
      const themeData = {
        ...theme,
        name: themeName,
        visualStyles: visualSettings
      };
      
      await generateAndSaveTheme(themeName, visualSettings);
      toast.success('Theme saved successfully');
    } catch (error) {
      toast.error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      const themeInput = {
        name: themeName,
        mode: theme.mode,
        dataColors: theme.palette.colors,
        neutralPalette: theme.neutralPalette.shades,
        fontFamily: theme.fontFamily.toLowerCase().replace(/\s+/g, '-'),
        borderRadius: theme.borderRadius,
        bgStyle: theme.bgStyle || 'default',
        borderStyle: theme.borderStyle || 'default',
        paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default',
        visualStyles: visualSettings,
        structuralColors: theme.structuralColorsMode === 'custom' ? theme.structuralColors : undefined,
        textClasses: theme.textClasses && Object.keys(theme.textClasses).length > 0 ? theme.textClasses : undefined
      };
      const exportedTheme = await generateTheme(themeInput);
      const blob = new Blob([JSON.stringify(exportedTheme, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${themeName.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Theme exported successfully');
    } catch (error) {
      toast.error('Failed to export theme');
    }
  };

  return (
    <TooltipProvider>
    <div className="flex flex-col h-screen">
      {/* Header - similar to theme builder */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Back button and theme name */}
            <div className="flex items-center">
              <button
                onClick={() => router.push('/themes')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Back to themes"
              >
                <BackIcon />
              </button>
              <div className="ml-3 pl-3 border-l border-gray-200">
                <input
                  type="text"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="text-lg font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-2 py-1 rounded"
                  placeholder="Untitled Theme"
                />
              </div>
            </div>
            
            {/* Right side: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import
              </button>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-sm font-medium disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Foundation Sidebar - Combined Foundation & Properties */}
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
                  <h2 className="text-xl font-semibold">Theme Foundation</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFoundation(false)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Theme Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  value={theme.description || ''}
                  onChange={(e) => useThemeBuilderStore.getState().setTheme({ description: e.target.value })}
                  placeholder="Describe your theme..."
                  className="w-full px-3 py-2 text-sm border rounded-md resize-none h-20"
                />
              </div>
              
              {/* Data Colors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Data Colors</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowPaletteManager(true)}
                      className="h-auto py-1 px-2 text-xs font-medium"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
                
                {/* Display current palette colors */}
                <div className="space-y-2">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {theme.palette.colors.map((color: string, i: number) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {theme.palette.name || 'Custom Palette'} ({theme.palette.colors.length} colors)
                    </p>
                  </div>
                </div>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Neutral Palette</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowNeutralPreview(!showNeutralPreview)}
                      className="h-auto py-1 px-2 text-xs font-medium"
                    >
                      <Info className="h-3 w-3 mr-1" />
                      {showNeutralPreview ? 'Hide' : 'Show'} Mapping
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowNeutralPaletteManager(true)}
                      className="h-auto py-1 px-2 text-xs font-medium"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
                
                {/* Display current neutral palette */}
                <div className="space-y-2">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex gap-1 mb-2">
                      {Object.values(theme.neutralPalette.shades).map((shade: any, i: number) => (
                        <div
                          key={i}
                          className="flex-1 h-8 first:rounded-l last:rounded-r border-r last:border-r-0 border-gray-200"
                          style={{ backgroundColor: shade }}
                          title={shade}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {theme.neutralPalette.name}
                    </p>
                  </div>
                </div>
                
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

              {/* Structural Colors Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Structural Colors</Label>
                  <Select
                    value={theme.structuralColorsMode || 'auto'}
                    onValueChange={(value: 'auto' | 'custom') => setStructuralColorsMode(value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {theme.structuralColorsMode === 'auto' ? (
                  <div className="p-3 bg-muted/20 rounded-lg space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Structural colors are automatically derived from your neutral palette.
                    </p>
                    {/* Preview of auto-mapped colors */}
                    <div className="space-y-1">
                      {getNeutralPalettePreview(theme.neutralPalette, theme.mode)
                        .filter(m => ['firstLevelElements', 'secondLevelElements', 'thirdLevelElements', 'fourthLevelElements'].includes(m.property))
                        .map((mapping) => (
                        <div key={mapping.property} className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: mapping.value }}
                          />
                          <span className="text-xs font-mono">{mapping.property}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground mb-2">
                      Define custom structural colors for UI elements.
                    </p>
                    {[
                      { key: 'firstLevelElements', label: 'First Level Elements', default: '#252526' },
                      { key: 'secondLevelElements', label: 'Second Level Elements', default: '#2D2D30' },
                      { key: 'thirdLevelElements', label: 'Third Level Elements', default: '#3E3E42' },
                      { key: 'fourthLevelElements', label: 'Fourth Level Elements', default: '#4D4D4D' },
                      { key: 'background', label: 'Background', default: '#1E1E1E' },
                      { key: 'secondaryBackground', label: 'Secondary Background', default: '#181818' },
                      { key: 'tableAccent', label: 'Table Accent', default: '#0E639C' }
                    ].map(({ key, label, default: defaultColor }) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label className="text-xs">{label}</Label>
                        <ColorPicker
                          value={theme.structuralColors?.[key as keyof typeof theme.structuralColors] || defaultColor}
                          onChange={(color) => {
                            const updatedColors = {
                              ...theme.structuralColors,
                              [key]: color
                            };
                            setStructuralColors(updatedColors);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Canvas & Layout Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Canvas & Layout
                </h3>
                
                {/* Debug info */}
                {schemaLoaded && canvasTypes.length === 0 && (
                  <p className="text-xs text-muted-foreground">No canvas properties available in schema</p>
                )}
                
                {/* Report Canvas */}
                {schemaLoaded && canvasTypes.includes('report') && (
                  <CollapsibleSection
                    title="Report Canvas"
                    tooltip="Controls the overall report appearance and behavior"
                    defaultOpen={false}
                  >
                    <SchemaForm
                      schema={schemaLoader.getVisualSchema('report')?.properties?.['*'] || {}}
                      value={advancedTheme?.visualStyles?.report?.['*'] || {}}
                      onChange={(value) => {
                        const newTheme = {
                          ...advancedTheme,
                          visualStyles: {
                            ...advancedTheme.visualStyles,
                            report: {
                              '*': value
                            }
                          }
                        };
                        setAdvancedTheme(newTheme);
                      }}
                      schemaLoader={schemaLoader}
                      path={['visualStyles', 'report', '*']}
                    />
                  </CollapsibleSection>
                )}
                
                {/* Page Settings */}
                {schemaLoaded && canvasTypes.includes('page') && (
                  <CollapsibleSection
                    title="Page Settings"
                    tooltip="Configure page backgrounds, size, and layout options"
                    defaultOpen={false}
                  >
                    <SchemaForm
                      schema={schemaLoader.getVisualSchema('page')?.properties?.['*'] || {}}
                      value={advancedTheme?.visualStyles?.page?.['*'] || {}}
                      onChange={(value) => {
                        const newTheme = {
                          ...advancedTheme,
                          visualStyles: {
                            ...advancedTheme.visualStyles,
                            page: {
                              '*': value
                            }
                          }
                        };
                        setAdvancedTheme(newTheme);
                      }}
                      schemaLoader={schemaLoader}
                      path={['visualStyles', 'page', '*']}
                    />
                  </CollapsibleSection>
                )}
                
                {/* Filter Pane */}
                {schemaLoaded && canvasTypes.includes('filter') && (
                  <CollapsibleSection
                    title="Filter Pane"
                    tooltip="Customize the appearance of filter panes and cards"
                    defaultOpen={false}
                  >
                    <SchemaForm
                      schema={schemaLoader.getVisualSchema('filter')?.properties?.['*'] || {}}
                      value={advancedTheme?.visualStyles?.filter?.['*'] || {}}
                      onChange={(value) => {
                        const newTheme = {
                          ...advancedTheme,
                          visualStyles: {
                            ...advancedTheme.visualStyles,
                            filter: {
                              '*': value
                            }
                          }
                        };
                        setAdvancedTheme(newTheme);
                      }}
                      schemaLoader={schemaLoader}
                      path={['visualStyles', 'filter', '*']}
                    />
                  </CollapsibleSection>
                )}
              </div>

              {/* Typography & Text Classes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Typography</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowTextClassesEditor(true)}
                    className="h-auto py-1 px-2 text-xs font-medium"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Text Classes
                  </Button>
                </div>
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

              {/* Visual Style Properties */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Visual Style</h3>
                
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
                <div className="text-sm text-muted-foreground text-center">
                  Use the buttons in the header to save or export your theme.
                </div>
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
        showVisualStyles ? "w-[400px]" : "w-12"
      )}>
        {showVisualStyles ? (
          <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Theme Editor</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVisualStyles(false)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Section Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setSelectedSection('global')}
                className={cn(
                  "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                  selectedSection === 'global'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <GlobalIcon />
                Global
              </button>
              <button
                onClick={() => setSelectedSection('visuals')}
                className={cn(
                  "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                  selectedSection === 'visuals'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <VisualIcon />
                Visuals
              </button>
            </div>
            
            {/* Content based on selected section */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Section */}
              <div className="p-4 border-b">
                {selectedSection === 'global' ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Global Visual Settings</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      These settings apply to all visuals by default and can be overridden per visual type.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedVisual('*');
                        setSelectedProperty('allVisuals');
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded border transition-colors",
                        selectedVisual === '*' && selectedProperty === 'allVisuals'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <GlobalIcon />
                        <span>All Visuals Settings</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Spacing, padding, borders for all visuals</p>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Visual Styles</h3>
                    {/* Visual Type Dropdown */}
                    <Select
                      value={selectedVisual || ''}
                      onValueChange={(value) => {
                        setSelectedVisual(value);
                        setSelectedVariant('*');
                        setSelectedState('default');
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a visual type" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualTypes.map((visual) => (
                          <SelectItem key={visual} value={visual}>
                            {visual.charAt(0).toUpperCase() + visual.slice(1).replace(/([A-Z])/g, ' $1')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Form Section */}
              <div className="p-4">
                {selectedSection === 'visuals' && selectedVisual ? (
                  <>
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold">
                        {selectedVisual.charAt(0).toUpperCase() + selectedVisual.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h2>
                    </div>
                    
                    {/* Visual Style Variants */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Visual Style Variants</h3>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        Create multiple style variations for this visual type. Users can select different styles 
                        to apply varied looks to their visuals.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowVariantDialog(true)}
                          className="px-3 py-1.5 text-xs bg-primary text-white rounded hover:bg-primary/90"
                        >
                          + New Style Variant
                        </button>
                        <div className="flex-1 flex gap-2">
                          <select
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded"
                          >
                            {getVisualVariants(selectedVisual).map(variant => (
                              <option key={variant} value={variant}>
                                {variant === '*' ? 'Default Style' : variant}
                              </option>
                            ))}
                          </select>
                          {selectedVariant !== '*' && (
                            <button
                              onClick={() => {
                                if (confirm(`Delete variant "${selectedVariant}"?`)) {
                                  deleteVariant(selectedVisual, selectedVariant);
                                  setSelectedVariant('*');
                                }
                              }}
                              className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual State Selector - only show for visuals with state-driven properties */}
                    {hasStateDrivenProperties && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-700">Visual State</h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Edit properties for different interaction states
                        </p>
                        <div className="flex gap-2">
                          {['default', 'hover', 'selected', 'disabled'].map(state => (
                            <button
                              key={state}
                              onClick={() => setSelectedState(state)}
                              className={cn(
                                "px-3 py-1.5 text-sm rounded-md border transition-colors",
                                selectedState === state
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                              )}
                            >
                              {state.charAt(0).toUpperCase() + state.slice(1)}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Properties with state support will use the selected state. Properties without state support apply to all states.
                        </p>
                      </div>
                    )}
                    
                    {/* SchemaForm renders its own tabs with collapsible sections */}
                    <SchemaForm
                      schema={
                        schemaLoader.getPropertySchema(['visualStyles', selectedVisual]) ||
                        { type: 'object' }
                      }
                      value={{ '*': advancedTheme.visualStyles?.[selectedVisual]?.[selectedVariant] || {} }}
                      onChange={(value) => {
                        // Extract the value from the * wrapper
                        const variantValue = value['*'] || value;
                        
                        // Update the specific variant
                        const newTheme = {
                          ...advancedTheme,
                          visualStyles: {
                            ...advancedTheme.visualStyles,
                            [selectedVisual]: {
                              ...advancedTheme.visualStyles?.[selectedVisual],
                              [selectedVariant]: variantValue
                            }
                          }
                        };
                        setAdvancedTheme(newTheme);
                        // Update visual settings for theme generation
                        if (newTheme.visualStyles) {
                          setVisualSettings(newTheme.visualStyles);
                        }
                      }}
                      schemaLoader={schemaLoader}
                    />
                  </>
                ) : selectedSection === 'global' && selectedProperty === 'allVisuals' ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold">Global Visual Settings</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Configure default settings that apply to all visuals. Individual visuals can override these settings.
                      </p>
                    </div>
                    
                    {/* Global Settings Form */}
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-blue-800 font-medium">How Global Settings Work</p>
                            <p className="text-xs text-blue-700 mt-1">
                              These settings apply to all visuals using the pattern <code className="bg-blue-100 px-1 rounded">visualStyles.*.*.*</code>. 
                              They can be overridden at the visual type or variant level.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Use the actual commonCards.*.items schema for proper properties */}
                      <SchemaForm
                        schema={(() => {
                          // Get the commonCards definition
                          const commonCardsSchema = schemaLoader.resolveRef('#/definitions/commonCards');
                          if (commonCardsSchema?.properties?.['*']) {
                            // Return the * property schema which contains all global properties
                            return commonCardsSchema.properties['*'];
                          }
                          // Fallback schema
                          return {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                // Spacing properties
                                customizeSpacing: { type: 'boolean', title: 'Customize Spacing' },
                                spaceBelowTitle: { type: 'number', title: 'Space Below Title', minimum: 0, maximum: 50 },
                                spaceBelowSubTitle: { type: 'number', title: 'Space Below Subtitle', minimum: 0, maximum: 50 },
                                spaceBelowTitleArea: { type: 'number', title: 'Space Below Title Area', minimum: 0, maximum: 50 },
                                // Padding properties
                                top: { type: 'number', title: 'Padding Top', minimum: 0, maximum: 100 },
                                bottom: { type: 'number', title: 'Padding Bottom', minimum: 0, maximum: 100 },
                                left: { type: 'number', title: 'Padding Left', minimum: 0, maximum: 100 },
                                right: { type: 'number', title: 'Padding Right', minimum: 0, maximum: 100 },
                              }
                            }
                          };
                        })()}
                        value={advancedTheme.visualStyles?.['*']?.['*']?.['*'] || [{}]}
                        onChange={(value) => {
                          const newTheme = {
                            ...advancedTheme,
                            visualStyles: {
                              ...advancedTheme.visualStyles,
                              '*': {
                                ...advancedTheme.visualStyles?.['*'],
                                '*': {
                                  ...advancedTheme.visualStyles?.['*']?.['*'],
                                  '*': value
                                }
                              }
                            }
                          };
                          setAdvancedTheme(newTheme);
                        }}
                        schemaLoader={schemaLoader}
                        path={['visualStyles', '*', '*', '*']}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="mb-2">
                      {selectedSection === 'global'
                        ? 'Select a global setting from above to edit'
                        : 'Select a visual from the dropdown above to edit its styles'}
                    </p>
                  </div>
                )}
              </div>
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
      <div className="flex-1 overflow-hidden h-full">
        <PowerBIPreview 
          generatedTheme={generatedTheme}
          selectedVisualType={selectedVisual} 
        />
      </div>
    </div>

    {/* Modals */}
    <Dialog open={showPaletteManager} onOpenChange={setShowPaletteManager}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Color Palettes</DialogTitle>
        </DialogHeader>
        <PaletteManager 
          selectedPaletteId={theme.palette.id}
          onSelect={(palette) => {
            setPalette(palette);
            setShowPaletteManager(false);
          }}
        />
      </DialogContent>
    </Dialog>

    <NeutralPaletteManager 
      isOpen={showNeutralPaletteManager}
      onOpenChange={setShowNeutralPaletteManager}
      onSelectPalette={(palette) => {
        // Handle palette selection
        if (typeof palette === 'string') {
          // Built-in palette ID
          setNeutralPalette({ 
            id: palette, 
            name: palette.charAt(0).toUpperCase() + palette.slice(1), 
            shades: {} // Will be loaded from theme data
          });
        } else {
          // Custom palette with shades
          setNeutralPalette({
            id: 'custom',
            name: 'Custom',
            shades: palette
          });
        }
      }}
    />

    {/* Import Modal */}
    <ImportThemeModal
      isOpen={showImportModal}
      onClose={() => setShowImportModal(false)}
    />
    
    {/* Create Variant Dialog */}
    {showVariantDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Create New Style Variant</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter a name for the new style variant. This will create a new set of styling options 
            for {selectedVisual} visuals.
          </p>
          <input
            type="text"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
            placeholder="e.g. minimal, detailed, corporate"
            className="w-full px-3 py-2 border rounded-md mb-4"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (newVariantName && newVariantName !== '*') {
                  createVariant(selectedVisual, newVariantName);
                  setSelectedVariant(newVariantName);
                  setNewVariantName('');
                  setShowVariantDialog(false);
                }
              }
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setNewVariantName('');
                setShowVariantDialog(false);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (newVariantName && newVariantName !== '*') {
                  createVariant(selectedVisual, newVariantName);
                  setSelectedVariant(newVariantName);
                  setNewVariantName('');
                  setShowVariantDialog(false);
                }
              }}
              disabled={!newVariantName || newVariantName === '*'}
              className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              Create Variant
            </button>
          </div>
        </div>
      </div>
    )}
    
    {/* Text Classes Editor Modal */}
    <TextClassesEditor 
      open={showTextClassesEditor}
      onOpenChange={setShowTextClassesEditor}
    />
    </div>
    </TooltipProvider>
  );
}