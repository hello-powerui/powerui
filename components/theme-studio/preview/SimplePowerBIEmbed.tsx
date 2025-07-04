'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report, Page } from 'powerbi-client';
import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { getHomePage } from '@/lib/powerbi/visual-embed-utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface SimplePowerBIEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onExitFocusMode?: () => void;
  onVariantChange?: (variant: string) => void;
  onReportReset?: (resetFn: () => void) => void;
  enterFocusMode?: boolean; // Kept for compatibility but ignored
}

// Global types are defined in types/global.d.ts

function SimplePowerBIEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onExitFocusMode,
  onVariantChange,
  onReportReset,
  enterFocusMode = false
}: SimplePowerBIEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IReportEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const reportRef = useRef<Report | null>(null);
  const powerBIService = PowerBIService.getInstance();
  const currentPageRef = useRef<Page | null>(null);
  const [isReportReady, setIsReportReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(1.0);
  const isInitialLoad = useRef(true);
  const [isResetting, setIsResetting] = useState(false);
  const hasLoadedReport = useRef(false);

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



  // Load report only when theme is ready - one time only
  useEffect(() => {
    // Only load once when we first get a valid theme
    if (!variantPreviewTheme || hasLoadedReport.current) {
      return;
    }

    const loadReport = async () => {
      try {
        hasLoadedReport.current = true; // Mark as loaded immediately to prevent double execution
        setIsLoading(true);
        setError(null);
        
        // Get embed configuration
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          variantPreviewTheme
        );
        
        // Clean theme for embedding
        const themeToEmbed = { ...variantPreviewTheme };
        delete themeToEmbed.reportPage;
        
        console.log('Initial theme being embedded:', themeToEmbed);
        
        const embedConfiguration: models.IReportEmbedConfiguration = {
          type: 'report',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: false,
            layoutType: models.LayoutType.Custom,
            customLayout: {
              displayOption: models.DisplayOption.ActualSize
            },
            bars: {
              actionBar: {
                visible: false
              }
            },
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

        setEmbedConfig(embedConfiguration);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error loading Power BI report:', err);
        hasLoadedReport.current = false; // Reset on error to allow retry
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Power BI report';
        
        // Check if we should retry
        if (retryCount < maxRetries) {
          console.log(`Retrying... (attempt ${retryCount + 1} of ${maxRetries})`);
          setRetryCount(prev => prev + 1);
          // Retry after a delay
          setTimeout(() => {
            loadReport();
          }, 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [variantPreviewTheme, retryCount, powerBIService])

  // Apply theme when it changes after initial load
  useEffect(() => {
    if (isReportReady && reportRef.current && variantPreviewTheme) {
      const timeoutId = setTimeout(async () => {
        try {
          // Verify report is still valid and has applyTheme method
          if (!reportRef.current || typeof reportRef.current.applyTheme !== 'function') {
            return;
          }
          
          const themeToApply = { ...variantPreviewTheme };
          delete themeToApply.reportPage;
          console.log('Applying theme update to report:', themeToApply);
          await reportRef.current.applyTheme({ themeJson: themeToApply });
        } catch (err) {
          // Only log if it's not a "report not ready" error
          if (err instanceof Error && !err.message.includes('not ready')) {
            console.error('Error applying theme update:', err.message);
          }
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [variantPreviewTheme, isReportReady]);

  // Ensure report shows Home page by default
  const ensureHomePage = useCallback(async () => {
    if (!reportRef.current) return;
    
    try {
      const pages = await reportRef.current.getPages();
      const homePage = pages.find(p => p.name === getHomePage());
      
      if (homePage && !homePage.isActive) {
        await homePage.setActive();
        console.log('Navigated to Home page');
      }
    } catch (error) {
      console.error('Error navigating to Home page:', error);
    }
  }, []);


  // Zoom functions
  const handleZoom = useCallback(async (zoomLevel: number) => {
    if (!reportRef.current) return;
    
    try {
      await reportRef.current.setZoom(zoomLevel);
      setCurrentZoom(zoomLevel);
    } catch (error) {
      console.error('Error setting zoom:', error);
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

  // Reset report to original state
  const resetReport = useCallback(async () => {
    if (isResetting) return;
    
    setIsResetting(true);
    
    // Reset zoom to default
    setCurrentZoom(1.0);
    
    // Force a complete reload of the report (like the reload button does)
    // This ensures the layout is properly reset
    isInitialLoad.current = true;
    hasLoadedReport.current = false; // Reset the loaded flag to allow reload
    setEmbedConfig(null);
    setIsLoading(true);
    
    setTimeout(() => {
      const loadReport = async () => {
        try {
          hasLoadedReport.current = true; // Mark as loaded immediately
          const config = await powerBIService.getEmbedConfigWithTheme(
            powerBIConfig.reportId,
            powerBIConfig.workspaceId,
            variantPreviewTheme
          );
          
          const embedConfiguration: models.IReportEmbedConfiguration = {
            type: 'report',
            id: config.id,
            embedUrl: config.embedUrl,
            accessToken: config.accessToken,
            tokenType: models.TokenType.Embed,
            settings: {
              filterPaneEnabled: true,
              navContentPaneEnabled: false,
              layoutType: models.LayoutType.Custom,
              customLayout: { displayOption: models.DisplayOption.ActualSize },
              bars: { actionBar: { visible: false } },
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
            theme: variantPreviewTheme ? { themeJson: variantPreviewTheme } : undefined
          };

          setEmbedConfig(embedConfiguration);
          isInitialLoad.current = false;
        } catch (err) {
          console.error('Error reloading report:', err);
          hasLoadedReport.current = false; // Reset on error
          setError(err instanceof Error ? err.message : 'Failed to reload report');
        } finally {
          setIsLoading(false);
          setIsResetting(false);
        }
      };
      loadReport();
    }, 100);
  }, [isResetting, variantPreviewTheme, powerBIService]);


  // Expose reset function to parent
  useEffect(() => {
    if (onReportReset) {
      onReportReset(resetReport);
    }
  }, [onReportReset, resetReport]);


  // Effect to restore zoom level when report is ready
  useEffect(() => {
    if (reportRef.current && isReportReady) {
      // Apply current zoom level when report is ready
      handleZoom(currentZoom);
    }
  }, [isReportReady, currentZoom, handleZoom]);


  const eventHandlers = useMemo(() => new Map([
    ['loaded', function () {
      setIsReportReady(true);
      // Ensure Home page is active
      ensureHomePage();
    }],
    ['rendered', function() {
      // Ensure report is marked as ready on render too
      setIsReportReady(true);
    }],
    ['error', function (event: any) {
      if (event?.detail?.message) {
        setError(event.detail.message);
      }
    }]
  ]), [ensureHomePage]);

  if (!variantPreviewTheme || isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">
            {!variantPreviewTheme ? 'Preparing theme...' : 'Loading Power BI preview...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-2">Unable to load Power BI preview</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              setRetryCount(0);
              setEmbedConfig(null);
              setIsLoading(true);
              // Force component remount
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
            variant="outline"
            size="sm"
            className="mb-4"
          >
            Retry
          </Button>
          <div className="text-xs text-gray-400">
            <p>Please check:</p>
            <ul className="mt-2 text-left list-disc list-inside">
              <li>Power BI credentials are configured in environment variables</li>
              <li>The report ID and workspace ID are correct</li>
              <li>Your service principal has access to the workspace</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!embedConfig) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">No report configuration available</p>
      </div>
    );
  }


  return (
    <div className="w-full h-full relative overflow-visible">
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
        onClick={() => {
          isInitialLoad.current = true;
          hasLoadedReport.current = false; // Reset the loaded flag to allow reload
          setEmbedConfig(null);
          setIsLoading(true);
          setTimeout(() => {
            const loadReport = async () => {
              try {
                hasLoadedReport.current = true; // Mark as loaded immediately
                const config = await powerBIService.getEmbedConfigWithTheme(
                  powerBIConfig.reportId,
                  powerBIConfig.workspaceId,
                  variantPreviewTheme
                );
                
                const embedConfiguration: models.IReportEmbedConfiguration = {
                  type: 'report',
                  id: config.id,
                  embedUrl: config.embedUrl,
                  accessToken: config.accessToken,
                  tokenType: models.TokenType.Embed,
                  settings: {
                    filterPaneEnabled: true,
                    navContentPaneEnabled: false,
                    layoutType: models.LayoutType.Custom,
                    customLayout: { displayOption: models.DisplayOption.ActualSize },
                    bars: { actionBar: { visible: false } },
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
                  theme: variantPreviewTheme ? { themeJson: variantPreviewTheme } : undefined
                };

                setEmbedConfig(embedConfiguration);
                isInitialLoad.current = false;
              } catch (err) {
                // console.error('Error reloading report:', err);
                hasLoadedReport.current = false; // Reset on error
                setError(err instanceof Error ? err.message : 'Failed to reload report');
              } finally {
                setIsLoading(false);
              }
            };
            loadReport();
          }, 100);
        }}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-md shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200"
        title="Reload report"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <PowerBIEmbed
        embedConfig={embedConfig}
        eventHandlers={eventHandlers}
        cssClassName="report-container"
        getEmbeddedComponent={(embeddedReport) => {
          reportRef.current = embeddedReport as Report;
          window.report = embeddedReport as Report;
        }}
      />
      <style jsx global>{`
        .report-container {
          height: 100%;
          width: 100%;
        }
        .report-container iframe {
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

// Memoize the component with custom comparison
export default memo(SimplePowerBIEmbed, (prevProps, nextProps) => {
  // Compare non-theme props first (faster)
  if (
    prevProps.selectedVisualType !== nextProps.selectedVisualType ||
    prevProps.selectedVariant !== nextProps.selectedVariant ||
    prevProps.enterFocusMode !== nextProps.enterFocusMode ||
    prevProps.onExitFocusMode !== nextProps.onExitFocusMode ||
    prevProps.onVariantChange !== nextProps.onVariantChange ||
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