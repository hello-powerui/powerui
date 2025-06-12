'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { useEffect, useState, useRef } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';

interface SimplePowerBIEmbedProps {
  generatedTheme?: any;
}

declare global {
  interface Window {
    report: Report;
  }
}

export default function SimplePowerBIEmbed({ generatedTheme }: SimplePowerBIEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IReportEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<Report | null>(null);
  const powerBIService = PowerBIService.getInstance();
  const isInitialLoad = useRef(true);
  const isReportLoaded = useRef(false);

  // Load report only once on mount
  useEffect(() => {
    const loadReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get embed configuration with theme
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          generatedTheme
        );
        
        // Convert to Power BI embed configuration
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
                visible: true,
                position: models.PageNavigationPosition.Bottom
              }
            },
            // Let the theme control the background
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
          theme: generatedTheme ? { themeJson: generatedTheme } : undefined
        };

        setEmbedConfig(embedConfiguration);
        isInitialLoad.current = false;
      } catch (err) {
        console.error('Error loading Power BI report:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Power BI report');
      } finally {
        setIsLoading(false);
      }
    };

    // Only load the report once on initial mount
    if (isInitialLoad.current) {
      loadReport();
    }
  }, []); // Empty dependency array - only run on mount

  // Apply theme when it changes (with debounce to prevent rapid updates)
  useEffect(() => {
    if (reportRef.current && generatedTheme && !isInitialLoad.current && isReportLoaded.current) {
      const timeoutId = setTimeout(async () => {
        try {
          console.log('Applying theme update...');
          
          // Ensure the theme is valid JSON
          if (typeof generatedTheme !== 'object' || generatedTheme === null) {
            console.error('Invalid theme format - must be an object');
            return;
          }
          
          // Create a clean theme object without reportPage for now
          // as it might be causing issues with applyTheme
          const themeToApply = { ...generatedTheme };
          delete themeToApply.reportPage;
          
          console.log('Theme being applied (without reportPage):', JSON.stringify(themeToApply, null, 2));
          
          // Apply the theme
          await reportRef.current.applyTheme({ themeJson: themeToApply });
          console.log('Theme applied successfully');
        } catch (err: any) {
          console.error('Error applying theme:', err);
          console.error('Error details:', {
            message: err?.message,
            stack: err?.stack,
            detail: err?.detail,
            body: err?.body,
            toString: err?.toString()
          });
          
          // Check if it's a specific Power BI error
          if (err?.body?.error) {
            console.error('Power BI error:', err.body.error);
          }
          
          // Don't throw - just log the error
        }
      }, 500); // Increased debounce to 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [generatedTheme]);

  const eventHandlers = new Map([
    ['loaded', function () {
      console.log('Report loaded');
      isReportLoaded.current = true;
    }],
    ['rendered', function () {
      console.log('Report rendered');
      isReportLoaded.current = true;
    }],
    ['error', function (event: any) {
      console.error('Power BI Error:', event?.detail);
      if (event?.detail?.message) {
        setError(event.detail.message);
      }
    }]
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading Power BI preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-6">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-2">Unable to load Power BI preview</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
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
                  generatedTheme
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
                        visible: true,
                        position: models.PageNavigationPosition.Bottom
                      }
                    },
                    layoutType: models.LayoutType.Custom,
                    customLayout: { displayOption: models.DisplayOption.FitToPage },
                    bars: { actionBar: { visible: false } }
                  },
                  theme: generatedTheme ? { themeJson: generatedTheme } : undefined
                };

                setEmbedConfig(embedConfiguration);
                isInitialLoad.current = false;
              } catch (err) {
                console.error('Error reloading report:', err);
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
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}