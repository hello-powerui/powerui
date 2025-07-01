'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Visual } from 'powerbi-client';
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { getVisualName, hasVisualMapping, getVisualInfo } from '@/lib/powerbi/visual-name-mapping';
import { getAllVisualsPage } from '@/lib/powerbi/visual-embed-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ZoomIn, ZoomOut, X, Settings } from 'lucide-react';

interface DirectVisualEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onReportReset?: (resetFn: () => void) => void;
  onExitFocusMode?: () => void;
}

function DirectVisualEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onReportReset,
  onExitFocusMode
}: DirectVisualEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const visualRef = useRef<Visual | null>(null);
  const powerBIService = PowerBIService.getInstance();
  const [currentZoom, setCurrentZoom] = useState(1.0);
  const [visualDimensions, setVisualDimensions] = useState<{ width: number; height: number } | null>(null);
  const [customDimensions, setCustomDimensions] = useState<{ width: number; height: number } | null>(null);
  const [inputDimensions, setInputDimensions] = useState<{ width: number; height: number } | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Generate theme with computed variant styles
  const variantPreviewTheme = useCallback(() => {
    if (!generatedTheme || selectedVisualType === '*' || selectedVariant === '*') {
      return generatedTheme;
    }

    const visualStyles = generatedTheme?.visualStyles?.[selectedVisualType];
    if (!visualStyles || !visualStyles[selectedVariant]) {
      return generatedTheme;
    }

    const { computeVariantStyle } = require('@/lib/theme-generation/variant-merge-utils');
    const computedStyle = computeVariantStyle(generatedTheme.visualStyles, selectedVisualType, selectedVariant);
    
    if (!computedStyle) {
      return generatedTheme;
    }

    return {
      ...generatedTheme,
      visualStyles: {
        ...generatedTheme.visualStyles,
        [selectedVisualType]: {
          ...visualStyles,
          '*': computedStyle
        }
      }
    };
  }, [generatedTheme, selectedVisualType, selectedVariant])();

  // Track if visual has been loaded initially
  const hasLoadedInitially = useRef(false);

  // Load visual only once when component mounts or visual type changes
  useEffect(() => {
    if (!variantPreviewTheme || selectedVisualType === '*' || !hasVisualMapping(selectedVisualType)) {
      return;
    }

    // Reset the loaded flag when visual type changes
    hasLoadedInitially.current = false;

    const loadVisual = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const visualInfo = getVisualInfo(selectedVisualType);
        if (!visualInfo) {
          throw new Error(`No visual mapping found for type '${selectedVisualType}'`);
        }

        setVisualDimensions({ width: visualInfo.width, height: visualInfo.height });
        // Initialize custom and input dimensions if not set
        if (!customDimensions) {
          setCustomDimensions({ width: visualInfo.width, height: visualInfo.height });
          setInputDimensions({ width: visualInfo.width, height: visualInfo.height });
        }
        
        // Get the embed configuration
        const config = await powerBIService.getVisualEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          getAllVisualsPage(),
          visualInfo.name,
          variantPreviewTheme
        );
        
        // Clean theme for embedding
        const themeToEmbed = { ...variantPreviewTheme };
        delete themeToEmbed.reportPage;
        
        // Create the visual embed configuration
        // Use custom dimensions if available, otherwise use default
        const embedWidth = customDimensions?.width || visualInfo.width;
        const embedHeight = customDimensions?.height || visualInfo.height;
        
        const visualEmbedConfig: models.IVisualEmbedConfiguration = {
          type: 'visual',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          pageName: getAllVisualsPage(),
          visualName: visualInfo.name,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            visualSettings: {
              visualHeaders: [
                {
                  settings: {
                    visible: false
                  }
                }
              ]
            }
          },
          theme: { themeJson: themeToEmbed }
        };
        
        setEmbedConfig(visualEmbedConfig);
        setIsLoading(false);
        hasLoadedInitially.current = true;
        
      } catch (err) {
        console.error('Failed to load visual:', err);
        setError(err instanceof Error ? err.message : 'Failed to load visual');
        setIsLoading(false);
      }
    };

    // Only load if we haven't loaded this visual yet
    if (!hasLoadedInitially.current) {
      loadVisual();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVisualType, powerBIService, customDimensions]); // Need to reload when dimensions change

  // Apply theme updates
  useEffect(() => {
    if (visualRef.current && variantPreviewTheme) {
      const timeoutId = setTimeout(async () => {
        try {
          if (!visualRef.current || typeof visualRef.current.applyTheme !== 'function') {
            return;
          }
          
          const themeToApply = { ...variantPreviewTheme };
          delete themeToApply.reportPage;
          await visualRef.current.applyTheme({ themeJson: themeToApply });
        } catch (err) {
          console.error('Error applying theme update:', err);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [variantPreviewTheme]);

  // Reset visual
  const resetVisual = useCallback(() => {
    // Reset zoom only
    setCurrentZoom(1.0);
    // For visual embedding, we don't need to reload - just reset zoom
  }, []);

  // Expose reset function to parent
  useEffect(() => {
    if (onReportReset) {
      onReportReset(resetVisual);
    }
  }, [onReportReset, resetVisual]);

  // Event handlers
  const eventHandlers = new Map([
    ['loaded', function () {
      // Visual loaded successfully
    }],
    ['rendered', function() {
      // Visual rendered
    }],
    ['error', function (event: any) {
      console.error('Visual error:', event);
      setError(event?.detail?.message || 'Visual loading error');
    }]
  ]);

  // Zoom functions
  const zoomIn = useCallback(() => setCurrentZoom(prev => Math.min(prev + 0.25, 4.0)), []);
  const zoomOut = useCallback(() => setCurrentZoom(prev => Math.max(prev - 0.25, 0.25)), []);
  const resetZoom = useCallback(() => setCurrentZoom(1.0), []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading visual...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-2">Unable to load visual</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <Button onClick={resetVisual} variant="outline" size="sm">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Unsupported visual type
  if (selectedVisualType === '*' || !hasVisualMapping(selectedVisualType)) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {selectedVisualType === '*' 
              ? 'Select a visual type to preview' 
              : `Visual type '${selectedVisualType}' is not available for preview`
            }
          </p>
        </div>
      </div>
    );
  }

  // No embed config
  if (!embedConfig) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-600">Preparing visual...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Fixed header controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 flex-shrink-0">
        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
            <Button onClick={zoomOut} variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentZoom <= 0.25}>
              <ZoomOut className="w-3 h-3" />
            </Button>
            <Button onClick={resetZoom} variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium" disabled={currentZoom === 1.0}>
              {Math.round(currentZoom * 100)}%
            </Button>
            <Button onClick={zoomIn} variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentZoom >= 4.0}>
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>
          
          {/* Settings toggle */}
          <Button 
            onClick={() => setShowSettings(!showSettings)} 
            variant="outline" 
            size="sm" 
            className={showSettings ? "bg-gray-100" : ""}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Exit focus mode button */}
        {onExitFocusMode && (
          <Button 
            onClick={onExitFocusMode} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Exit Focus Mode
          </Button>
        )}
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-end gap-4">
            <div>
              <Label htmlFor="width" className="text-xs">Width</Label>
              <Input
                id="width"
                type="number"
                value={inputDimensions?.width || 0}
                onChange={(e) => setInputDimensions(prev => ({ 
                  width: parseInt(e.target.value) || 0, 
                  height: prev?.height || 0 
                }))}
                className="w-24 h-8"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-xs">Height</Label>
              <Input
                id="height"
                type="number"
                value={inputDimensions?.height || 0}
                onChange={(e) => setInputDimensions(prev => ({ 
                  width: prev?.width || 0, 
                  height: parseInt(e.target.value) || 0 
                }))}
                className="w-24 h-8"
              />
            </div>
            <Button 
              onClick={() => {
                // Apply the input dimensions
                if (inputDimensions) {
                  setCustomDimensions(inputDimensions);
                }
              }} 
              size="sm"
            >
              Apply
            </Button>
            <Button 
              onClick={() => {
                if (visualDimensions) {
                  setCustomDimensions(visualDimensions);
                  setInputDimensions(visualDimensions);
                }
              }} 
              variant="outline" 
              size="sm"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
      
      {/* Direct visual embed with minimal wrapper */}
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div 
          className="powerbi-visual-embed-direct"
          style={{ 
            width: customDimensions ? `${customDimensions.width}px` : '400px',
            height: customDimensions ? `${customDimensions.height}px` : '300px',
            flexShrink: 0
          }}
        >
          <PowerBIEmbed
            embedConfig={embedConfig}
            eventHandlers={eventHandlers}
            cssClassName="powerbi-embed-container"
            getEmbeddedComponent={(embeddedVisual) => {
              visualRef.current = embeddedVisual as Visual;
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .powerbi-visual-embed-direct {
          transform: scale(${currentZoom});
          transform-origin: top left;
        }
        .powerbi-embed-container {
          width: 100% !important;
          height: 100% !important;
        }
        .powerbi-embed-container iframe {
          border: none !important;
          display: block;
          width: 100% !important;
          height: 100% !important;
          /* Attempt to fix 1px clipping */
          box-sizing: border-box !important;
          overflow: visible !important;
        }
        /* Target the iframe content if accessible */
        .powerbi-embed-container iframe body {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}

export default memo(DirectVisualEmbed);