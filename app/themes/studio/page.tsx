'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  ChevronLeft, 
  ChevronRight,
  Palette,
  Layers,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { SchemaForm } from '@/components/theme-advanced/form/schema-form';
import { GlobalPropertySelector } from '@/components/theme-advanced/form/global-property-selector';
import { ImportThemeModal } from '@/components/theme-advanced/ui/import-theme-modal';
import { CollapsibleSection } from '@/components/theme-advanced/ui/collapsible-section';
import { useThemeChanges } from '@/lib/hooks/use-theme-changes';
import { ChangeIndicator } from '@/components/theme-advanced/ui/change-indicator';

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
  const searchParams = useSearchParams();
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
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
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
  
  // Use individual selectors to avoid creating new objects on every render
  const clearChanges = useThemeChanges(state => state.clearChanges);
  const setOriginalTheme = useThemeChanges(state => state.setOriginalTheme);
  const trackChange = useThemeChanges(state => state.trackChange);
  const hasChanges = useThemeChanges(state => state.hasChanges);
  const changedPaths = useThemeChanges(state => state.changedPaths);
  
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
    updateTextClasses,
    generateAndSaveTheme
  } = useThemeBuilderStore();
  
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
  
  // Sync theme mode to advanced store
  useEffect(() => {
    setAdvancedTheme((prev) => {
      if (prev.mode !== theme.mode) {
        return { ...prev, mode: theme.mode };
      }
      return prev;
    });
  }, [theme.mode, setAdvancedTheme]);
  
  // Load schema on mount
  useEffect(() => {
    const loadSchema = async () => {
      try {
      await schemaLoader.loadSchema();
      const types = schemaLoader.getVisualTypes();
      const canvas = schemaLoader.getCanvasTypes();
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

  // Load theme from URL parameters
  useEffect(() => {
    if (schemaLoaded && !isThemeLoaded) {
      const themeDataParam = searchParams.get('themeData') || searchParams.get('data');
      const name = searchParams.get('name');
      const description = searchParams.get('description');
      
      if (themeDataParam) {
        try {
          const decodedTheme = JSON.parse(decodeURIComponent(themeDataParam));
          
          // Load foundation settings (handle both old and new field names)
          if (decodedTheme.palette || decodedTheme.dataColors) {
            setPalette(decodedTheme.palette || decodedTheme.dataColors);
          }
          if (decodedTheme.neutralPalette) setNeutralPalette(decodedTheme.neutralPalette);
          if (decodedTheme.mode || decodedTheme.colorMode) {
            setThemeMode(decodedTheme.mode || decodedTheme.colorMode);
          }
          if (decodedTheme.fontFamily) setFontFamily(decodedTheme.fontFamily);
          if (decodedTheme.borderRadius !== undefined) setBorderRadius(decodedTheme.borderRadius);
          if (decodedTheme.spacing !== undefined) setSpacing(decodedTheme.spacing);
          if (decodedTheme.bgStyle) setBgStyle(decodedTheme.bgStyle);
          if (decodedTheme.borderStyle) setBorderStyle(decodedTheme.borderStyle);
          if (decodedTheme.structuralColors) {
            setStructuralColors(decodedTheme.structuralColors);
            if (decodedTheme.structuralColorsMode) {
              setStructuralColorsMode(decodedTheme.structuralColorsMode);
            }
          }
          if (decodedTheme.textClasses) updateTextClasses(decodedTheme.textClasses);
          
          // Load visual styles
          if (decodedTheme.visualStyles) {
            setVisualSettings(decodedTheme.visualStyles);
            setAdvancedTheme((prev) => ({ ...prev, visualStyles: decodedTheme.visualStyles }));
            
            // Update sidebar visibility based on content
            const hasVisualContent = Object.keys(decodedTheme.visualStyles).length > 0;
            if (hasVisualContent) {
              setShowVisualStyles(true);
              // If there's visual content but no foundation content, hide foundation
              const hasFoundationContent = decodedTheme.palette || decodedTheme.neutralPalette || 
                decodedTheme.fontFamily || decodedTheme.textClasses;
              if (!hasFoundationContent) {
                setShowFoundation(false);
              }
            }
          }
          
          // Set theme name
          if (name) setThemeName(decodeURIComponent(name));
          
          // Initialize change tracking with loaded theme
          const loadedThemeState = {
            ...decodedTheme,
            visualStyles: decodedTheme.visualStyles || {}
          };
          setOriginalTheme(loadedThemeState);
          setIsThemeLoaded(true);
          
          toast.success('Theme loaded successfully');
        } catch (error) {
          console.error('Failed to load theme from URL:', error);
          toast.error('Failed to load theme');
        }
      } else {
        // No theme data in URL, initialize with current state after a short delay
        // to ensure stores are properly initialized
        setTimeout(() => {
          const currentThemeState = {
            ...theme,
            visualStyles: {
              ...visualSettings,
              ...advancedTheme?.visualStyles
            }
          };
          setOriginalTheme(currentThemeState);
          setIsThemeLoaded(true);
        }, 0);
      }
    }
  }, [schemaLoaded, isThemeLoaded, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wrapper functions that track changes for foundation settings
  const setPaletteWithTracking = (palette: any) => {
    setPalette(palette);
    trackChange(['palette']);
  };

  const setNeutralPaletteWithTracking = (palette: any) => {
    setNeutralPalette(palette);
    trackChange(['neutralPalette']);
  };

  const setThemeModeWithTracking = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    trackChange(['mode']);
  };

  const setFontFamilyWithTracking = (fontFamily: string) => {
    setFontFamily(fontFamily);
    trackChange(['fontFamily']);
  };

  const setBorderRadiusWithTracking = (radius: number) => {
    setBorderRadius(radius);
    trackChange(['borderRadius']);
  };

  const setSpacingWithTracking = (spacing: 'compact' | 'normal' | 'relaxed') => {
    setSpacing(spacing);
    trackChange(['spacing']);
  };

  const setBgStyleWithTracking = (style: string) => {
    setBgStyle(style);
    trackChange(['bgStyle']);
  };

  const setBorderStyleWithTracking = (style: string) => {
    setBorderStyle(style);
    trackChange(['borderStyle']);
  };

  const setStructuralColorsWithTracking = (colors: any) => {
    setStructuralColors(colors);
    trackChange(['structuralColors']);
  };

  const setStructuralColorsModeWithTracking = (mode: 'auto' | 'custom') => {
    setStructuralColorsMode(mode);
    trackChange(['structuralColorsMode']);
  };

  const updateTextClassesWithTracking = (textClasses: any) => {
    updateTextClasses(textClasses);
    trackChange(['textClasses']);
  };

  // Generate theme whenever foundation or visual settings change
  useEffect(() => {
    // Merge visual settings with canvas properties from advancedTheme
    const mergedVisualStyles = {
      ...visualSettings,
      // Include global visual settings
      ...(advancedTheme?.visualStyles?.['*'] && { '*': advancedTheme.visualStyles['*'] }),
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
  }, [theme, visualSettings, advancedTheme?.visualStyles]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Merge visual settings with canvas properties from advancedTheme
      const mergedVisualStyles = {
        ...visualSettings,
        // Include global visual settings
        ...(advancedTheme?.visualStyles?.['*'] && { '*': advancedTheme.visualStyles['*'] }),
        // Include canvas properties if they exist
        ...(advancedTheme?.visualStyles?.report && { report: advancedTheme.visualStyles.report }),
        ...(advancedTheme?.visualStyles?.page && { page: advancedTheme.visualStyles.page }),
        ...(advancedTheme?.visualStyles?.filter && { filter: advancedTheme.visualStyles.filter })
      };
      
      // Save the theme with visual customizations
      const themeData = {
      ...theme,
      name: themeName,
      visualStyles: mergedVisualStyles
      };
      
      await generateAndSaveTheme(themeName, mergedVisualStyles);
      toast.success('Theme saved successfully');
      // Clear change indicators after successful save
      clearChanges();
      // Reset the original theme to the newly saved state
      setOriginalTheme(themeData);
    } catch (error) {
      toast.error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const { originalTheme } = useThemeChanges.getState();
    
    if (!originalTheme) {
      toast.error('No original theme state to reset to');
      return;
    }
    
    // Reset foundation settings
    if (originalTheme.palette) setPalette(originalTheme.palette);
    if (originalTheme.neutralPalette) setNeutralPalette(originalTheme.neutralPalette);
    if (originalTheme.mode) setThemeMode(originalTheme.mode);
    if (originalTheme.fontFamily) setFontFamily(originalTheme.fontFamily);
    if (originalTheme.borderRadius !== undefined) setBorderRadius(originalTheme.borderRadius);
    if (originalTheme.spacing !== undefined) setSpacing(originalTheme.spacing);
    if (originalTheme.bgStyle) setBgStyle(originalTheme.bgStyle);
    if (originalTheme.borderStyle) setBorderStyle(originalTheme.borderStyle);
    if (originalTheme.structuralColors) {
      setStructuralColors(originalTheme.structuralColors);
      if (originalTheme.structuralColorsMode) {
        setStructuralColorsMode(originalTheme.structuralColorsMode);
      }
    }
    if (originalTheme.textClasses) updateTextClasses(originalTheme.textClasses);
    
    // Reset visual styles
    if (originalTheme.visualStyles) {
      setVisualSettings(originalTheme.visualStyles);
      setAdvancedTheme((prev) => ({ ...prev, visualStyles: originalTheme.visualStyles }));
    }
    
    // Clear all change tracking
    clearChanges();
    
    toast.success('Theme reset to last saved state');
  };

  const handleExport = async () => {
    try {
      // Merge visual settings with canvas properties from advancedTheme
      const mergedVisualStyles = {
        ...visualSettings,
        // Include global visual settings
        ...(advancedTheme?.visualStyles?.['*'] && { '*': advancedTheme.visualStyles['*'] }),
        // Include canvas properties if they exist
        ...(advancedTheme?.visualStyles?.report && { report: advancedTheme.visualStyles.report }),
        ...(advancedTheme?.visualStyles?.page && { page: advancedTheme.visualStyles.page }),
        ...(advancedTheme?.visualStyles?.filter && { filter: advancedTheme.visualStyles.filter })
      };
      
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
      visualStyles: mergedVisualStyles,
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - similar to theme builder */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
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
              {changedPaths.size > 0 && (
                <div className="ml-3 flex items-center gap-1.5 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>{changedPaths.size} unsaved {changedPaths.size === 1 ? 'change' : 'changes'}</span>
                </div>
              )}
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
              {changedPaths.size > 0 && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 text-sm font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              )}
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
          "border-r bg-gray-50 transition-all duration-300",
          showFoundation ? "w-96" : "w-12"
        )}>
          {showFoundation ? (
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
                onClick={() => setShowFoundation(false)}
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
                onChange={(e) => useThemeBuilderStore.getState().setTheme({ description: e.target.value })}
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
                    <ChangeIndicator hasChanged={hasChanges(['palette'])} />
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{theme.palette.name || 'Custom'} • {theme.palette.colors.length} colors</p>
                </div>
                <button
                  onClick={() => setShowPaletteManager(true)}
                  className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Edit
                </button>
              </div>
              
              {/* Compact color grid */}
              <div className="grid grid-cols-8 gap-1">
                {theme.palette.colors.map((color: string, i: number) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
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
                  onClick={() => setThemeModeWithTracking('light')}
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
                  onClick={() => setThemeModeWithTracking('dark')}
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
                    <ChangeIndicator hasChanged={hasChanges(['neutralPalette'])} />
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{theme.neutralPalette.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowNeutralPreview(!showNeutralPreview)}
                    className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                  >
                    {showNeutralPreview ? 'Hide' : 'Show'} Details
                  </button>
                  <button
                    onClick={() => setShowNeutralPaletteManager(true)}
                    className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
              
              {/* Compact neutral gradient */}
              <div className="h-8 rounded-md overflow-hidden flex border border-gray-200">
                {Object.values(theme.neutralPalette.shades).map((shade: any, i: number) => (
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
                  {getNeutralPalettePreview(theme.neutralPalette, theme.mode).slice(0, 4).map((mapping) => (
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
                    onClick={() => setStructuralColorsModeWithTracking('auto')}
                    className={`px-3 py-1 text-xs transition-colors ${
                      theme.structuralColorsMode === 'auto' || !theme.structuralColorsMode
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Auto
                  </button>
                  <button
                    onClick={() => setStructuralColorsModeWithTracking('custom')}
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
                    {getNeutralPalettePreview(theme.neutralPalette, theme.mode)
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
                            setStructuralColorsWithTracking(updatedColors);
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

            {/* Canvas & Layout Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900">Canvas & Layout</h3>
              </div>
              
              {/* Debug info */}
              {schemaLoaded && canvasTypes.length === 0 && (
                <p className="text-xs text-gray-600">No canvas properties available in schema</p>
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
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Label className="text-sm font-medium">Typography</Label>
                  <ChangeIndicator hasChanged={hasChanges(['fontFamily'])} />
                </div>
                <button
                  onClick={() => setShowTextClassesEditor(true)}
                  className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Text Classes
                </button>
              </div>
              <Select value={theme.fontFamily} onValueChange={setFontFamilyWithTracking}>
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

            {/* Visual Style Properties */}
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <h3 className="text-sm font-medium text-gray-900">Visual Style</h3>
                <ChangeIndicator hasChanged={hasChanges(['borderRadius']) || hasChanges(['spacing']) || hasChanges(['bgStyle']) || hasChanges(['borderStyle'])} />
              </div>
              
              <div className="space-y-3">
                {/* Border Radius */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Border Radius</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { value: 0, label: 'Sharp' },
                      { value: 4, label: 'Default' },
                      { value: 8, label: 'Rounded' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setBorderRadiusWithTracking(value)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                          theme.borderRadius === value
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Spacing</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { value: 'compact', label: 'Compact' },
                      { value: 'normal', label: 'Normal' },
                      { value: 'relaxed', label: 'Relaxed' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setSpacingWithTracking(value as 'compact' | 'normal' | 'relaxed')}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                          theme.spacing === value
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Container Style */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Container Style</Label>
                  <Select 
                    value={theme.bgStyle} 
                    onValueChange={setBgStyleWithTracking}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="subtle-contrast">Subtle Contrast</SelectItem>
                      <SelectItem value="inversed-contrast">Inversed Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Border Style */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Border Style</Label>
                  <Select 
                    value={theme.borderStyle} 
                    onValueChange={setBorderStyleWithTracking}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Borders</SelectItem>
                      <SelectItem value="subtle">Subtle Borders</SelectItem>
                      <SelectItem value="none">No Borders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <Palette className="w-5 h-5" />
            <span className="writing-mode-vertical text-xs">Theme Foundation</span>
          </div>
        </div>
      )}
        </div>

        {/* Visual Styles Sidebar */}
        <div className={cn(
      "border-r bg-gray-50 transition-all duration-300",
      showVisualStyles ? "w-[400px]" : "w-12"
      )}>
      {showVisualStyles ? (
        <div className="h-full flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Visual Styles</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVisualStyles(false)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Section Tabs */}
          <div className="flex bg-white border-b border-gray-200">
            <button
              onClick={() => {
                setSelectedSection('global');
                setSelectedProperty('allVisuals');
                setSelectedVisual('*');
              }}
              className={cn(
                "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
                selectedSection === 'global'
                  ? 'bg-gray-50 text-gray-900 border-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 border-transparent'
              )}
            >
              <GlobalIcon />
              Global
            </button>
            <button
              onClick={() => setSelectedSection('visuals')}
              className={cn(
                "flex-1 px-3 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
                selectedSection === 'visuals'
                  ? 'bg-gray-50 text-gray-900 border-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 border-transparent'
              )}
            >
              <VisualIcon />
              Visuals
            </button>
          </div>
          
          {/* Content based on selected section */}
          <div className="flex-1 overflow-y-auto bg-white">
            {/* Navigation Section */}
            {selectedSection === 'visuals' && (
              <div className="p-4 border-b border-gray-200">
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
              </div>
            )}

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
                  <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
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
                        className="px-3 py-1.5 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        + New Style Variant
                      </button>
                      <div className="flex-1 flex gap-2">
                        <select
                          value={selectedVariant}
                          onChange={(e) => setSelectedVariant(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md"
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
                            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors border border-red-200"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual State Selector - only show for visuals with state-driven properties */}
                  {hasStateDrivenProperties && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
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
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
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
                    path={[]}
                  />
                </>
              ) : selectedSection === 'global' ? (
                <>
                  {/* Property Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-semibold">Global Visual Settings</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Select properties to configure default settings for all visuals
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Global Settings Property Selector */}
                  <GlobalPropertySelector
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
                      // Update visual settings for theme generation
                      if (newTheme.visualStyles) {
                        setVisualSettings(newTheme.visualStyles);
                      }
                    }}
                    visualStyles={advancedTheme.visualStyles}
                    onVisualStylesChange={(newVisualStyles) => {
                      const newTheme = {
                        ...advancedTheme,
                        visualStyles: newVisualStyles
                      };
                      setAdvancedTheme(newTheme);
                      // Update visual settings for theme generation
                      if (newVisualStyles) {
                        setVisualSettings(newVisualStyles);
                      }
                    }}
                    schemaLoader={schemaLoader}
                  />
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-2">
                    Select a visual from the dropdown above to edit its styles
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
          <div className="flex flex-col items-center gap-2 text-gray-600">
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
              setPaletteWithTracking(palette);
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
            setNeutralPaletteWithTracking({ 
              id: palette, 
              name: palette.charAt(0).toUpperCase() + palette.slice(1), 
              shades: {} // Will be loaded from theme data
            });
          } else {
            // Custom palette with shades
            setNeutralPaletteWithTracking({
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
        onImport={(importedTheme) => {
          // Load foundation settings from imported theme
          if (importedTheme.dataColors) {
            setPalette(importedTheme.dataColors);
          }
          
          // Extract foundation settings from visualStyles if present
          const foundationFromVisuals = importedTheme.visualStyles?.['*']?.['*']?.['*']?.[0] || {};
          
          // Load neutral palette if available
          if (foundationFromVisuals.general?.colors?.neutralColors) {
            setNeutralPalette(foundationFromVisuals.general.colors.neutralColors);
          }
          
          // Load font family if available
          if (foundationFromVisuals.general?.properties?.fontFamily) {
            setFontFamily(foundationFromVisuals.general.properties.fontFamily);
          }
          
          // Load text classes if available
          if (foundationFromVisuals.textClasses) {
            updateTextClasses(foundationFromVisuals.textClasses);
          }
          
          // Load visual styles
          if (importedTheme.visualStyles) {
            setVisualSettings(importedTheme.visualStyles);
            setAdvancedTheme((prev) => ({ ...prev, visualStyles: importedTheme.visualStyles }));
            
            // Update sidebar visibility based on content
            const hasVisualContent = Object.keys(importedTheme.visualStyles).length > 0;
            if (hasVisualContent) {
              setShowVisualStyles(true);
            }
          }
          
          // Set theme name if available
          if (importedTheme.name) {
            setThemeName(importedTheme.name);
          }
          
          // Update the original theme for change tracking
          const importedThemeState = {
            ...theme,
            palette: importedTheme.dataColors || theme.palette,
            visualStyles: importedTheme.visualStyles || {}
          };
          setOriginalTheme(importedThemeState);
          clearChanges();
          
          toast.success('Theme imported successfully');
        }}
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
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
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
        onUpdateTextClasses={updateTextClassesWithTracking}
      />
      </div>
  );
}
