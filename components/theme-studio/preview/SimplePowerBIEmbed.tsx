'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report, Page, VisualDescriptor } from 'powerbi-client';
import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';
import { generateFocusedVisualLayout, generateDefaultLayout, VisualInfo } from '@/lib/powerbi/visual-focus-utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Maximize2 } from 'lucide-react';

interface SimplePowerBIEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onExitFocusMode?: () => void;
  onVariantChange?: (variant: string) => void;
  onReportReset?: (resetFn: () => void) => void;
  enterFocusMode?: boolean;
}

declare global {
  interface Window {
    report: Report;
  }
}

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
  const [focusMode, setFocusMode] = useState(false);
  const [visuals, setVisuals] = useState<VisualInfo[]>([]);
  const currentPageRef = useRef<Page | null>(null);
  const [isReportReady, setIsReportReady] = useState(false);
  const isInitialLoad = useRef(true);
  const [isResetting, setIsResetting] = useState(false);

  // Generate theme with selected variant as default
  const variantPreviewTheme = useMemo(() => {
    if (!generatedTheme || selectedVisualType === '*' || selectedVariant === '*') {
      return generatedTheme;
    }

    // Check if the visual type and variant exist in the theme
    const visualStyles = generatedTheme?.visualStyles?.[selectedVisualType];
    if (!visualStyles || !visualStyles[selectedVariant]) {
      return generatedTheme;
    }

    // Create a modified theme where the selected variant becomes the default (*)
    return {
      ...generatedTheme,
      visualStyles: {
        ...generatedTheme.visualStyles,
        [selectedVisualType]: {
          ...visualStyles,
          '*': visualStyles[selectedVariant] // Make selected variant the default
        }
      }
    };
  }, [generatedTheme, selectedVisualType, selectedVariant]);


  // Extract available variants for the selected visual type
  const availableVariants = useMemo(() => {
    if (!generatedTheme || selectedVisualType === '*') {
      return [];
    }

    const visualStyles = generatedTheme?.visualStyles?.[selectedVisualType];
    if (!visualStyles) {
      return [];
    }

    return Object.keys(visualStyles).sort((a, b) => {
      // Put default (*) first
      if (a === '*') return -1;
      if (b === '*') return 1;
      return a.localeCompare(b);
    });
  }, [generatedTheme, selectedVisualType]);

  // Load report only when theme is ready - one time only
  useEffect(() => {
    // Only load once when we first get a valid theme
    if (!variantPreviewTheme || embedConfig) {
      return;
    }

    const loadReport = async () => {
      try {
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
            panes: {
              filters: {
                visible: false
              },
              pageNavigation: {
                visible: false
              }
            },
            layoutType: models.LayoutType.Custom,
            customLayout: {
              displayOption: models.DisplayOption.FitToPage
            },
            bars: {
              actionBar: {
                visible: false
              }
            }
          },
          theme: { themeJson: themeToEmbed }
        };

        setEmbedConfig(embedConfiguration);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error loading Power BI report:', err);
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
  }, [variantPreviewTheme, powerBIService, embedConfig]) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Discover visuals in the report
  const discoverVisuals = useCallback(async () => {
    if (!reportRef.current) return;
    
    try {
      const pages = await reportRef.current.getPages();
      if (pages.length === 0) return;
      
      // Get the active page
      const activePage = pages.find(p => p.isActive) || pages[0];
      if (!activePage) return;
      
      currentPageRef.current = activePage;
      const pageVisuals = await activePage.getVisuals();
      
      const visualInfos: VisualInfo[] = pageVisuals.map((visual: VisualDescriptor) => ({
        name: visual.name,
        title: visual.title || visual.name,
        type: visual.type,
        layout: {
          x: visual.layout.x || 0,
          y: visual.layout.y || 0,
          z: visual.layout.z,
          width: visual.layout.width || 300,
          height: visual.layout.height || 300
        }
      }));
      
      setVisuals(visualInfos);
      
    } catch (error) {
      // console.error('Error discovering visuals:', error);
    }
  }, []);

  // Apply focus mode layout
  const applyFocusMode = useCallback(async () => {
    if (!reportRef.current || !currentPageRef.current) return;
    
    try {
      const pageId = currentPageRef.current.name;
      const pageSize = {
        width: currentPageRef.current.defaultSize?.width || 1280,
        height: currentPageRef.current.defaultSize?.height || 720
      };
      
      if (focusMode && selectedVisualType !== '*') {
        // Apply focused layout
        const focusLayout = generateFocusedVisualLayout(
          visuals,
          selectedVisualType,
          pageId,
          pageSize
        );
        
        await reportRef.current.updateSettings(focusLayout);
        
      } else {
        // Restore default layout
        const defaultLayout = generateDefaultLayout(pageId);
        await reportRef.current.updateSettings(defaultLayout);
        
      }
    } catch (error) {
      // console.error('Error applying focus mode:', error);
    }
  }, [focusMode, selectedVisualType, visuals]);

  // Reset report to original state
  const resetReport = useCallback(async () => {
    if (!reportRef.current || isResetting) return;
    
    setIsResetting(true);
    try {
      // Reset to default layout settings
      const defaultSettings = {
        layoutType: models.LayoutType.Custom,
        customLayout: {
          displayOption: models.DisplayOption.FitToPage
        }
      };
      
      await reportRef.current.updateSettings(defaultSettings);
      
      // Reset focus mode state
      setFocusMode(false);
      
      // Refresh the report to ensure clean state
      await reportRef.current.refresh();
      
    } catch (error) {
      console.error('Error resetting report:', error);
    } finally {
      setIsResetting(false);
    }
  }, [isResetting]);


  // Expose reset function to parent
  useEffect(() => {
    if (onReportReset) {
      onReportReset(resetReport);
    }
  }, [onReportReset, resetReport]);

  // Effect to handle entering focus mode when prop changes
  useEffect(() => {
    if (enterFocusMode && selectedVisualType !== '*' && !focusMode) {
      setFocusMode(true);
    }
  }, [enterFocusMode, selectedVisualType, focusMode]);

  // Effect to prepare visuals when selected visual type changes
  useEffect(() => {
    if (reportRef.current && selectedVisualType !== '*' && isReportReady) {
      // Discover visuals when a specific visual is selected
      discoverVisuals();
    }
  }, [selectedVisualType, isReportReady, discoverVisuals]);

  // Effect to apply/remove focus mode
  useEffect(() => {
    if (reportRef.current && visuals.length > 0) {
      applyFocusMode();
    }
  }, [applyFocusMode]); // applyFocusMode already depends on focusMode, selectedVisualType, visuals


  const eventHandlers = useMemo(() => new Map([
    ['loaded', function () {
      setIsReportReady(true);
      // Discover visuals immediately after report loads
      discoverVisuals();
    }],
    ['rendered', function() {
      // Ensure report is marked as ready on render too
      setIsReportReady(true);
    }],
    ['error', function (event: any) {
      if (event?.detail?.message) {
        setError(event.detail.message);
      }
    }],
    ['pageChanged', function () {
      // Re-discover visuals on page change
      discoverVisuals();
    }]
  ]), [discoverVisuals]);

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
    <div className="w-full h-full relative">
      {/* Focus Mode Controls */}
      {focusMode && selectedVisualType !== '*' && (
        <div className="absolute top-2 left-2 z-50 flex items-center gap-2 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
          {/* Exit Focus Mode Button */}
          <Button
            onClick={() => {
              resetReport();
              if (onExitFocusMode) {
                onExitFocusMode();
              }
            }}
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={isResetting}
          >
            <Maximize2 className="w-3 h-3 mr-1" />
            {isResetting ? 'Resetting...' : 'Exit Focus Mode'}
          </Button>

          {/* Focus mode indicator */}
          <div className="flex items-center gap-2 px-2 text-xs text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{selectedVisualType}</span>
          </div>

          {/* Variant Selector */}
          {availableVariants.length > 0 && (
            <>
              <div className="w-px h-6 bg-gray-300" /> {/* Divider */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Style:</span>
                <Select
                  value={selectedVariant}
                  onValueChange={onVariantChange}
                >
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVariants.map(variant => (
                      <SelectItem key={variant} value={variant}>
                        {variant === '*' ? 'Default' : variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Reload button - appears on hover */}
      <button
        onClick={() => {
          isInitialLoad.current = true;
          setEmbedConfig(null);
          setIsLoading(true);
          setTimeout(() => {
            const loadReport = async () => {
              try {
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
                    panes: {
                      filters: { visible: false },
                      pageNavigation: {
                        visible: false
                      }
                    },
                    layoutType: models.LayoutType.Custom,
                    customLayout: { displayOption: models.DisplayOption.FitToPage },
                    bars: { actionBar: { visible: false } }
                  },
                  theme: variantPreviewTheme ? { themeJson: variantPreviewTheme } : undefined
                };

                setEmbedConfig(embedConfiguration);
                isInitialLoad.current = false;
              } catch (err) {
                // console.error('Error reloading report:', err);
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
  return prevProps.generatedTheme.name !== nextProps.generatedTheme.name;
});