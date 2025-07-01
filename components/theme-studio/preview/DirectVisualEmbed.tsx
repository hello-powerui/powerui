'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Visual } from 'powerbi-client';
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { getVisualName, hasVisualMapping } from '@/lib/powerbi/visual-name-mapping';
import { getAllVisualsPage } from '@/lib/powerbi/visual-embed-utils';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface DirectVisualEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onReportReset?: (resetFn: () => void) => void;
  width?: number;
  height?: number;
}

function DirectVisualEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onReportReset,
  width = 800,
  height = 600
}: DirectVisualEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const visualRef = useRef<Visual | null>(null);
  const powerBIService = PowerBIService.getInstance();
  const [currentZoom, setCurrentZoom] = useState(1.0);

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

  // Load visual when theme is ready
  useEffect(() => {
    if (!variantPreviewTheme || selectedVisualType === '*' || !hasVisualMapping(selectedVisualType)) {
      return;
    }

    const loadVisual = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const visualName = getVisualName(selectedVisualType);
        if (!visualName) {
          throw new Error(`No visual mapping found for type '${selectedVisualType}'`);
        }

        console.log(`Embedding visual '${visualName}' for type '${selectedVisualType}'`);
        
        // Get the embed configuration
        const config = await powerBIService.getVisualEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          getAllVisualsPage(),
          visualName,
          variantPreviewTheme
        );
        
        // Clean theme for embedding
        const themeToEmbed = { ...variantPreviewTheme };
        delete themeToEmbed.reportPage;
        
        // Create the visual embed configuration
        const visualEmbedConfig: models.IVisualEmbedConfiguration = {
          type: 'visual',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          pageName: getAllVisualsPage(),
          visualName: visualName,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            background: models.BackgroundType.Transparent
          },
          theme: { themeJson: themeToEmbed }
        };

        setEmbedConfig(visualEmbedConfig);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Failed to load visual:', err);
        setError(err instanceof Error ? err.message : 'Failed to load visual');
        setIsLoading(false);
      }
    };

    loadVisual();
  }, [variantPreviewTheme, selectedVisualType, powerBIService]);

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
    setEmbedConfig(null);
    setIsLoading(true);
    setError(null);
    // Force a re-render by changing state
    setCurrentZoom(1.0);
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
      console.log('Visual loaded successfully');
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
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
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
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
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
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
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
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <p className="text-sm text-gray-600">Preparing visual...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200" style={{ width, height }}>
      {/* Zoom controls */}
      <div className="absolute top-2 left-2 z-50 flex items-center gap-1 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <Button onClick={zoomOut} variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentZoom <= 0.25}>
          <ZoomOut className="w-3 h-3" />
        </Button>
        <Button onClick={resetZoom} variant="outline" size="sm" className="h-8 px-2 text-xs font-medium" disabled={currentZoom === 1.0}>
          {Math.round(currentZoom * 100)}%
        </Button>
        <Button onClick={zoomIn} variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentZoom >= 4.0}>
          <ZoomIn className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Visual embed */}
      <div 
        className="visual-embed-container" 
        style={{ 
          width: '100%', 
          height: '100%',
          transform: `scale(${currentZoom})`,
          transformOrigin: 'top left'
        }}
      >
        <PowerBIEmbed
          embedConfig={embedConfig}
          eventHandlers={eventHandlers}
          cssClassName="direct-visual-container"
          getEmbeddedComponent={(embeddedVisual) => {
            visualRef.current = embeddedVisual as Visual;
          }}
        />
      </div>

      <style jsx global>{`
        .direct-visual-container {
          height: 100%;
          width: 100%;
        }
        .direct-visual-container iframe {
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

export default memo(DirectVisualEmbed);