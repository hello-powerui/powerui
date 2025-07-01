'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Visual } from 'powerbi-client';
import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { 
  generateVisualEmbedConfig, 
  isVisualTypeSupported,
  findVisualByType,
  getAllVisualsPage
} from '@/lib/powerbi/visual-embed-utils';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface VisualPowerBIEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onReportReset?: (resetFn: () => void) => void;
  width?: number;
  height?: number;
}

function VisualPowerBIEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onReportReset,
  width = 800,
  height = 600
}: VisualPowerBIEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const visualRef = useRef<Visual | null>(null);
  const powerBIService = PowerBIService.getInstance();
  const [isVisualReady, setIsVisualReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(1.0);
  const isInitialLoad = useRef(true);
  const [isResetting, setIsResetting] = useState(false);
  const hasLoadedVisual = useRef(false);

  // Generate theme with computed variant styles (merged with default)
  const variantPreviewTheme = useMemo(() => {
    if (!generatedTheme || selectedVisualType === '*' || selectedVariant === '*') {
      return generatedTheme;
    }

    // Check if the visual type and variant exist in the theme
    const visualStyles = generatedTheme?.visualStyles?.[selectedVisualType];
    if (!visualStyles || !visualStyles[selectedVariant]) {
      return generatedTheme;
    }

    // Import the merge utility
    const { computeVariantStyle } = require('@/lib/theme-generation/variant-merge-utils');
    
    // Get the computed style (base merged with variant)
    const computedStyle = computeVariantStyle(generatedTheme.visualStyles, selectedVisualType, selectedVariant);
    
    if (!computedStyle) {
      return generatedTheme;
    }

    // Create a modified theme where the default (*) shows the computed result
    return {
      ...generatedTheme,
      visualStyles: {
        ...generatedTheme.visualStyles,
        [selectedVisualType]: {
          ...visualStyles,
          '*': computedStyle // Show computed style as default
        }
      }
    };
  }, [generatedTheme, selectedVisualType, selectedVariant]);

  // Load visual only when theme is ready and visual type is supported
  useEffect(() => {
    // Only load if we have a supported visual type and haven't loaded yet
    if (!variantPreviewTheme || 
        selectedVisualType === '*' || 
        !isVisualTypeSupported(selectedVisualType) ||
        hasLoadedVisual.current) {
      return;
    }

    const loadVisual = async () => {
      try {
        hasLoadedVisual.current = true; // Mark as loaded immediately to prevent double execution
        setIsLoading(true);
        setError(null);
        
        // First, get a temporary report connection to discover the visual
        const tempConfig = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          variantPreviewTheme
        );

        // Create a temporary report instance to find the visual
        const tempReportConfig: models.IReportEmbedConfiguration = {
          type: 'report',
          id: tempConfig.id,
          embedUrl: tempConfig.embedUrl,
          accessToken: tempConfig.accessToken,
          tokenType: models.TokenType.Embed,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
          }
        };

        // We need to wait for the report to load before we can discover visuals
        // For now, we'll use a placeholder approach and rely on the dynamic discovery
        // This will be updated once we have the actual visual names in the report
        
        // For immediate testing, let's use a fallback visual name pattern
        const visualName = `${selectedVisualType}Sample`; // Assuming naming convention
        
        // Get visual embed configuration
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
        
        console.log('Initial theme being embedded for visual:', themeToEmbed);
        
        const embedConfiguration: models.IVisualEmbedConfiguration = {
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

        setEmbedConfig(embedConfiguration);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error loading Power BI visual:', err);
        hasLoadedVisual.current = false; // Reset on error to allow retry
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Power BI visual';
        
        // Check if we should retry
        if (retryCount < maxRetries) {
          console.log(`Retrying... (attempt ${retryCount + 1} of ${maxRetries})`);
          setRetryCount(prev => prev + 1);
          // Retry after a delay
          setTimeout(() => {
            loadVisual();
          }, 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadVisual();
  }, [variantPreviewTheme, selectedVisualType, retryCount, powerBIService]);

  // Apply theme when it changes after initial load
  useEffect(() => {
    if (isVisualReady && visualRef.current && variantPreviewTheme) {
      const timeoutId = setTimeout(async () => {
        try {
          // Verify visual is still valid and has applyTheme method
          if (!visualRef.current || typeof visualRef.current.applyTheme !== 'function') {
            return;
          }
          
          const themeToApply = { ...variantPreviewTheme };
          delete themeToApply.reportPage;
          console.log('Applying theme update to visual:', themeToApply);
          await visualRef.current.applyTheme({ themeJson: themeToApply });
        } catch (err) {
          // Only log if it's not a "visual not ready" error
          if (err instanceof Error && !err.message.includes('not ready')) {
            console.error('Error applying theme update to visual:', err.message);
          }
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [variantPreviewTheme, isVisualReady]);

  // Zoom functions
  const handleZoom = useCallback(async (zoomLevel: number) => {
    if (!visualRef.current) return;
    
    try {
      // Note: Individual visuals may not support zoom the same way as reports
      // This might need to be handled differently
      setCurrentZoom(zoomLevel);
    } catch (error) {
      console.error('Error setting zoom on visual:', error);
    }
  }, []);

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(currentZoom + 0.25, 4.0);
    handleZoom(newZoom);
  }, [currentZoom, handleZoom]);

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(currentZoom - 0.25, 0.25);
    handleZoom(newZoom);
  }, [currentZoom, handleZoom]);

  const resetZoom = useCallback(() => {
    handleZoom(1.0);
  }, [handleZoom]);

  // Reset visual to original state
  const resetVisual = useCallback(async () => {
    if (isResetting) return;
    
    setIsResetting(true);
    
    // Reset zoom to default
    setCurrentZoom(1.0);
    
    // Force a complete reload of the visual
    isInitialLoad.current = true;
    hasLoadedVisual.current = false; // Reset the loaded flag to allow reload
    setEmbedConfig(null);
    setIsLoading(true);
    
    setTimeout(() => {
      const loadVisual = async () => {
        try {
          hasLoadedVisual.current = true; // Mark as loaded immediately
          
          // Use the same visual name pattern as in the main load function
          const visualName = `${selectedVisualType}Sample`;

          const config = await powerBIService.getVisualEmbedConfigWithTheme(
            powerBIConfig.reportId,
            powerBIConfig.workspaceId,
            getAllVisualsPage(),
            visualName,
            variantPreviewTheme
          );
          
          const embedConfiguration: models.IVisualEmbedConfiguration = {
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
            theme: variantPreviewTheme ? { themeJson: variantPreviewTheme } : undefined
          };

          setEmbedConfig(embedConfiguration);
          isInitialLoad.current = false;
        } catch (err) {
          console.error('Error reloading visual:', err);
          hasLoadedVisual.current = false; // Reset on error
          setError(err instanceof Error ? err.message : 'Failed to reload visual');
        } finally {
          setIsLoading(false);
          setIsResetting(false);
        }
      };
      loadVisual();
    }, 100);
  }, [isResetting, variantPreviewTheme, selectedVisualType, powerBIService]);

  // Expose reset function to parent
  useEffect(() => {
    if (onReportReset) {
      onReportReset(resetVisual);
    }
  }, [onReportReset, resetVisual]);

  // Reset when visual type changes
  useEffect(() => {
    if (selectedVisualType !== '*' && isVisualTypeSupported(selectedVisualType)) {
      hasLoadedVisual.current = false;
      setEmbedConfig(null);
      setIsLoading(true);
      setError(null);
    }
  }, [selectedVisualType]);

  const eventHandlers = useMemo(() => new Map([
    ['loaded', function () {
      setIsVisualReady(true);
      console.log('Visual loaded successfully');
    }],
    ['rendered', function() {
      // Ensure visual is marked as ready on render too
      setIsVisualReady(true);
    }],
    ['error', function (event: any) {
      if (event?.detail?.message) {
        setError(event.detail.message);
      }
    }]
  ]), []);

  // Show loading state
  if (!variantPreviewTheme || isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">
            {!variantPreviewTheme ? 'Preparing theme...' : 'Loading Power BI visual...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-2">Unable to load Power BI visual</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <Button
            onClick={resetVisual}
            variant="outline"
            size="sm"
            className="mb-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Show unsupported visual type
  if (selectedVisualType === '*' || !isVisualTypeSupported(selectedVisualType)) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {selectedVisualType === '*' 
              ? 'Select a visual type to preview' 
              : `Visual type '${selectedVisualType}' is not supported for individual embedding`
            }
          </p>
        </div>
      </div>
    );
  }

  // Show no config state
  if (!embedConfig) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <p className="text-sm text-gray-600">No visual configuration available</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200" style={{ width, height }}>
      {/* Zoom Controls */}
      <div className="absolute top-2 left-2 z-50 flex items-center gap-1 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <Button
          onClick={zoomOut}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={currentZoom <= 0.25}
          title="Zoom out"
        >
          <ZoomOut className="w-3 h-3" />
        </Button>
        <Button
          onClick={resetZoom}
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-medium"
          disabled={currentZoom === 1.0}
          title="Reset zoom"
        >
          {Math.round(currentZoom * 100)}%
        </Button>
        <Button
          onClick={zoomIn}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={currentZoom >= 4.0}
          title="Zoom in"
        >
          <ZoomIn className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Reload button - appears on hover */}
      <button
        onClick={resetVisual}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-md shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200"
        title="Reload visual"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Visual embed container */}
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
          cssClassName="visual-container"
          getEmbeddedComponent={(embeddedVisual) => {
            visualRef.current = embeddedVisual as Visual;
            window.visual = embeddedVisual as Visual;
          }}
        />
      </div>

      <style jsx global>{`
        .visual-container {
          height: 100%;
          width: 100%;
        }
        .visual-container iframe {
          border: none;
          border-radius: 0;
        }
        .visual-embed-container {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// Memoize the component with custom comparison
export default memo(VisualPowerBIEmbed, (prevProps, nextProps) => {
  // Compare non-theme props first (faster)
  if (
    prevProps.selectedVisualType !== nextProps.selectedVisualType ||
    prevProps.selectedVariant !== nextProps.selectedVariant ||
    prevProps.width !== nextProps.width ||
    prevProps.height !== nextProps.height ||
    prevProps.onReportReset !== nextProps.onReportReset
  ) {
    return false;
  }
  
  // If both themes are undefined or the same reference, they're equal
  if (prevProps.generatedTheme === nextProps.generatedTheme) {
    return true;
  }
  
  // If one is undefined and the other isn't, they're different
  if (!prevProps.generatedTheme || !nextProps.generatedTheme) {
    return false;
  }
  
  // For theme comparison, we only care about properties that affect visual rendering
  // Name changes don't require re-render
  // Compare themes without the name property
  const prevThemeWithoutName = { ...prevProps.generatedTheme };
  const nextThemeWithoutName = { ...nextProps.generatedTheme };
  delete prevThemeWithoutName.name;
  delete nextThemeWithoutName.name;
  
  // Deep compare the visual properties
  return JSON.stringify(prevThemeWithoutName) === JSON.stringify(nextThemeWithoutName);
});