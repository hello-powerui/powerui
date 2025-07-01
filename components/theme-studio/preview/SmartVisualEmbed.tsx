'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report, Visual } from 'powerbi-client';
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { 
  isVisualTypeSupported,
  getAllVisualsPage,
  getPowerBIVisualTypes
} from '@/lib/powerbi/visual-embed-utils';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface SmartVisualEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onReportReset?: (resetFn: () => void) => void;
  width?: number;
  height?: number;
}

interface DiscoveredVisual {
  name: string;
  type: string;
  title: string;
}

function SmartVisualEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onReportReset,
  width = 800,
  height = 600
}: SmartVisualEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discoveredVisual, setDiscoveredVisual] = useState<DiscoveredVisual | null>(null);
  const [discoveryPhase, setDiscoveryPhase] = useState<'loading' | 'discovering' | 'embedding' | 'complete'>('loading');
  const visualRef = useRef<Visual | null>(null);
  const discoveryReportRef = useRef<Report | null>(null);
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

  // Phase 1: Discover visual by loading report and finding the right visual
  useEffect(() => {
    if (!variantPreviewTheme || 
        selectedVisualType === '*' || 
        !isVisualTypeSupported(selectedVisualType)) {
      return;
    }

    const discoverVisual = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setDiscoveryPhase('discovering');
        
        // Load the report for discovery
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          variantPreviewTheme
        );
        
        const discoveryEmbedConfig: models.IReportEmbedConfiguration = {
          type: 'report',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            layoutType: models.LayoutType.Custom,
            customLayout: { displayOption: models.DisplayOption.ActualSize }
          }
        };

        // Use PowerBIEmbed component for discovery instead of direct embedding
        let discoveryReport: Report | null = null;
        
        // We'll use a promise to handle the discovery report loading
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Discovery timeout - report took too long to load'));
          }, 15000);

          // Create a temporary container
          const tempContainer = document.createElement('div');
          tempContainer.style.position = 'fixed';
          tempContainer.style.top = '-9999px';
          tempContainer.style.left = '-9999px';
          tempContainer.style.width = '1px';
          tempContainer.style.height = '1px';
          tempContainer.style.overflow = 'hidden';
          document.body.appendChild(tempContainer);

          // Import PowerBIEmbed and embed the discovery report
          import('powerbi-client-react').then(({ PowerBIEmbed }) => {
            const React = require('react');
            const ReactDOM = require('react-dom/client');
            
            const discoveryEventHandlers = new Map([
              ['loaded', async () => {
                try {
                  clearTimeout(timeout);
                  console.log('Discovery report loaded, finding visual...');
                  
                  if (!discoveryReport) {
                    throw new Error('Discovery report not available');
                  }
                  
                  const pages = await discoveryReport.getPages();
                  const allVisualsPage = pages.find(p => p.name === getAllVisualsPage());
                  
                  if (!allVisualsPage) {
                    throw new Error(`Page '${getAllVisualsPage()}' not found. Available pages: ${pages.map(p => p.name).join(', ')}`);
                  }

                  const pageVisuals = await allVisualsPage.getVisuals();
                  const targetTypes = getPowerBIVisualTypes(selectedVisualType);
                  
                  console.log(`Looking for visual types: ${targetTypes.join(', ')}`);
                  console.log(`Available visuals:`, pageVisuals.map(v => ({ name: v.name, type: v.type, title: v.title })));

                  const matchingVisual = pageVisuals.find((visual: any) => 
                    targetTypes.includes(visual.type)
                  );

                  if (matchingVisual) {
                    console.log(`Found matching visual:`, { name: matchingVisual.name, type: matchingVisual.type });
                    setDiscoveredVisual({
                      name: matchingVisual.name,
                      type: matchingVisual.type,
                      title: matchingVisual.title || matchingVisual.name
                    });
                    
                    // Clean up
                    document.body.removeChild(tempContainer);
                    resolve();
                  } else {
                    throw new Error(`No visual found for type '${selectedVisualType}'. Looking for: ${targetTypes.join(', ')}. Available: ${pageVisuals.map(v => v.type).join(', ')}`);
                  }
                } catch (err) {
                  clearTimeout(timeout);
                  document.body.removeChild(tempContainer);
                  reject(err);
                }
              }],
              ['error', (error: any) => {
                clearTimeout(timeout);
                document.body.removeChild(tempContainer);
                reject(new Error(`Discovery report error: ${error?.detail?.message || 'Unknown error'}`));
              }]
            ]);

            // Create discovery embed element
            const discoveryElement = React.createElement(PowerBIEmbed, {
              embedConfig: discoveryEmbedConfig,
              eventHandlers: discoveryEventHandlers,
              cssClassName: 'discovery-embed',
              getEmbeddedComponent: (embeddedReport: Report) => {
                discoveryReport = embeddedReport;
              }
            });

            // Render the discovery embed
            const root = ReactDOM.createRoot(tempContainer);
            root.render(discoveryElement);
            
          }).catch((importError) => {
            clearTimeout(timeout);
            reject(new Error(`Failed to import PowerBIEmbed: ${importError.message}`));
          });
        });

      } catch (err) {
        console.error('Visual discovery failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to discover visual');
        setIsLoading(false);
      }
    };

    discoverVisual();
  }, [variantPreviewTheme, selectedVisualType, powerBIService]);

  // Phase 2: Embed the discovered visual
  useEffect(() => {
    if (!discoveredVisual || !variantPreviewTheme) return;

    const embedVisual = async () => {
      try {
        setDiscoveryPhase('embedding');
        console.log(`Embedding visual: ${discoveredVisual.name}`);
        
        const config = await powerBIService.getVisualEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          getAllVisualsPage(),
          discoveredVisual.name,
          variantPreviewTheme
        );
        
        const themeToEmbed = { ...variantPreviewTheme };
        delete themeToEmbed.reportPage;
        
        const visualEmbedConfig: models.IVisualEmbedConfiguration = {
          type: 'visual',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          pageName: getAllVisualsPage(),
          visualName: discoveredVisual.name,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            background: models.BackgroundType.Transparent
          },
          theme: { themeJson: themeToEmbed }
        };

        setEmbedConfig(visualEmbedConfig);
        setDiscoveryPhase('complete');
        setIsLoading(false);
        
      } catch (err) {
        console.error('Visual embedding failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to embed visual');
        setIsLoading(false);
      }
    };

    embedVisual();
  }, [discoveredVisual, variantPreviewTheme, powerBIService]);

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

  // Reset when visual type changes
  useEffect(() => {
    setDiscoveredVisual(null);
    setEmbedConfig(null);
    setError(null);
    setIsLoading(true);
    setDiscoveryPhase('loading');
  }, [selectedVisualType]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setCurrentZoom(prev => Math.min(prev + 0.25, 4.0));
  }, []);

  const zoomOut = useCallback(() => {
    setCurrentZoom(prev => Math.max(prev - 0.25, 0.25));
  }, []);

  const resetZoom = useCallback(() => {
    setCurrentZoom(1.0);
  }, []);

  const eventHandlers = new Map([
    ['loaded', function () {
      console.log('Visual loaded successfully');
    }],
    ['error', function (event: any) {
      console.error('Visual error:', event);
      setError(event?.detail?.message || 'Visual loading error');
    }]
  ]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">
            {discoveryPhase === 'discovering' && 'Discovering visual...'}
            {discoveryPhase === 'embedding' && 'Embedding visual...'}
            {discoveryPhase === 'loading' && 'Loading...'}
          </p>
          {discoveredVisual && (
            <p className="text-xs text-gray-500 mt-1">
              Found: {discoveredVisual.title} ({discoveredVisual.type})
            </p>
          )}
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
          <p className="text-sm font-medium text-gray-900 mb-2">Visual Discovery Failed</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              setDiscoveredVisual(null);
              setEmbedConfig(null);
              setIsLoading(true);
              setDiscoveryPhase('loading');
            }}
            variant="outline"
            size="sm"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // No supported visual
  if (selectedVisualType === '*' || !isVisualTypeSupported(selectedVisualType)) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg" style={{ width, height }}>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {selectedVisualType === '*' 
              ? 'Select a visual type to preview' 
              : `Visual type '${selectedVisualType}' is not supported`
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
        <p className="text-sm text-gray-600">Preparing visual embed...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200" style={{ width, height }}>
      {/* Controls */}
      <div className="absolute top-2 left-2 z-50 flex items-center gap-1 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <Button onClick={zoomOut} variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentZoom <= 0.25} title="Zoom out">
          <ZoomOut className="w-3 h-3" />
        </Button>
        <Button onClick={resetZoom} variant="outline" size="sm" className="h-8 px-2 text-xs font-medium" disabled={currentZoom === 1.0} title="Reset zoom">
          {Math.round(currentZoom * 100)}%
        </Button>
        <Button onClick={zoomIn} variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentZoom >= 4.0} title="Zoom in">
          <ZoomIn className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Visual info */}
      {discoveredVisual && (
        <div className="absolute top-2 right-2 z-50 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
          <div className="text-xs text-gray-600">
            {discoveredVisual.title} <span className="text-gray-400">({discoveredVisual.type})</span>
          </div>
        </div>
      )}

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
          cssClassName="smart-visual-container"
          getEmbeddedComponent={(embeddedVisual) => {
            visualRef.current = embeddedVisual as Visual;
          }}
        />
      </div>

      <style jsx global>{`
        .smart-visual-container {
          height: 100%;
          width: 100%;
        }
        .smart-visual-container iframe {
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

export default memo(SmartVisualEmbed);