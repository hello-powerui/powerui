'use client';

import { useEffect, useRef, useState } from 'react';
import { PowerBIService } from '@/lib/powerbi/service';
import { powerBIConfig } from '@/lib/powerbi/config';

interface PowerBIEmbeddedClientProps {
  generatedTheme: any;
}

export default function PowerBIEmbeddedClient({ generatedTheme }: PowerBIEmbeddedClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [PowerBIEmbed, setPowerBIEmbed] = useState<any>(null);
  const [embedConfig, setEmbedConfig] = useState<any>(null);
  const reportRef = useRef<any>();
  const powerbiService = PowerBIService.getInstance();

  // Load PowerBI libraries
  useEffect(() => {
    const loadLibraries = async () => {
      try {
        const powerbiReact = await import('powerbi-client-react');
        setPowerBIEmbed(() => powerbiReact.PowerBIEmbed);
      } catch (err) {
        console.error('Failed to load Power BI libraries:', err);
        setError('Failed to load Power BI components');
        setIsLoading(false);
      }
    };
    
    loadLibraries();
  }, []);

  // Initialize report after libraries are loaded
  useEffect(() => {
    if (PowerBIEmbed && !embedConfig) {
      initializeReport();
    }
  }, [PowerBIEmbed]);

  const initializeReport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get embed configuration with theme
      const config = await powerbiService.getEmbedConfigWithTheme(
        powerBIConfig.reportId,
        powerBIConfig.workspaceId,
        generatedTheme
      );

      // Convert to proper embed configuration format
      const embedConfiguration = {
        type: 'report',
        id: config.id,
        embedUrl: config.embedUrl,
        accessToken: config.accessToken,
        tokenType: 1, // TokenType.Embed
        theme: config.theme,
        settings: {
          panes: {
            filters: {
              visible: false,
            },
            pageNavigation: {
              visible: false,
            },
          },
          background: 'transparent',
        },
      };

      setEmbedConfig(embedConfiguration);
    } catch (err: any) {
      console.error('Failed to initialize Power BI report:', err);
      if (err.message.includes('Failed to get embed token')) {
        setError('Unable to access the Power BI report. Please check that the report exists and your app has access to it.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load report');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Apply theme when it changes
  useEffect(() => {
    if (reportRef.current && generatedTheme) {
      const report = reportRef.current;
      if (report && typeof report.applyTheme === 'function') {
        report.applyTheme({ themeJson: generatedTheme })
          .catch((err: any) => console.error('Failed to apply theme:', err));
      }
    }
  }, [generatedTheme]);

  const handleReportLoaded = (report: any) => {
    reportRef.current = report;
    console.log('Power BI report loaded successfully', report);
    
    // Apply initial theme if available
    if (generatedTheme && typeof report.applyTheme === 'function') {
      report.applyTheme({ themeJson: generatedTheme })
        .catch((err: any) => console.error('Failed to apply initial theme:', err));
    }
  };

  const handleError = (event: any) => {
    console.error('Power BI Embed Error:', event.detail);
    setError('Failed to embed report. Please check your configuration.');
  };

  if (isLoading || !PowerBIEmbed) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading Power BI report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-red-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Report</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <p className="text-xs text-gray-500">
            Make sure your Power BI credentials are configured in the environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (!embedConfig || !PowerBIEmbed) {
    return null;
  }

  // Create the component element
  const PowerBIComponent = PowerBIEmbed;
  
  console.log('PowerBIEmbed loaded:', !!PowerBIEmbed, typeof PowerBIEmbed);
  console.log('embedConfig:', embedConfig);

  try {
    return (
      <div className="relative h-[600px] bg-gray-50">
        <PowerBIComponent
          embedConfig={embedConfig}
          eventHandlers={
            new Map([
              ['loaded', handleReportLoaded],
              ['error', handleError],
            ])
          }
          cssClassName="w-full h-full"
          getEmbeddedComponent={(embeddedReport) => {
            if (embeddedReport && embeddedReport.embedtype === 'report') {
              reportRef.current = embeddedReport;
            }
          }}
        />
      </div>
    );
  } catch (err) {
    console.error('Error rendering PowerBI component:', err);
    return (
      <div className="flex items-center justify-center h-[600px] bg-red-50">
        <div className="text-center">
          <p className="text-sm text-red-600">Error loading Power BI component</p>
          <p className="text-xs text-gray-500 mt-2">{String(err)}</p>
        </div>
      </div>
    );
  }
}