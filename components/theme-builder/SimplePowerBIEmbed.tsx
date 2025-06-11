'use client';

import { useEffect, useRef, useState } from 'react';
import { PowerBIService } from '@/lib/powerbi/service';
import { powerBIConfig } from '@/lib/powerbi/config';

interface SimplePowerBIEmbedProps {
  generatedTheme: any;
}

export default function SimplePowerBIEmbed({ generatedTheme }: SimplePowerBIEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<any>(null);
  const powerbiService = PowerBIService.getInstance();

  useEffect(() => {
    let isMounted = true;
    let report: any = null;
    let embedAttempted = false;

    const embedReport = async () => {
      try {
        if (!containerRef.current || !isMounted || embedAttempted) return;
        embedAttempted = true;
        
        // Clean up any existing report
        if (containerRef.current.firstChild) {
          containerRef.current.innerHTML = '';
        }

        // Import Power BI dynamically
        const pbi = await import('powerbi-client');
        const powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );
        
        // Get embed configuration
        const config = await powerbiService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          generatedTheme
        );
        
        // Check if we have a valid access token
        if (!config.accessToken) {
          throw new Error('No access token received. Please check your Power BI configuration and permissions.');
        }

        // Create embed configuration
        const embedConfiguration = {
          type: 'report',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: pbi.models.TokenType.Embed,
          settings: {
            panes: {
              filters: { visible: false },
              pageNavigation: { visible: false }
            },
            background: pbi.models.BackgroundType.Transparent
          }
        };

        // Embed the report (without theme initially)
        report = powerbi.embed(containerRef.current, embedConfiguration);
        reportRef.current = report;

        // Handle loaded event
        report.on('loaded', function() {
          console.log('Report loaded successfully');
          setIsLoading(false);
          
          // Apply theme after report is loaded
          if (generatedTheme && typeof report.applyTheme === 'function') {
            report.applyTheme({ themeJson: generatedTheme })
              .catch((err: any) => console.error('Failed to apply theme:', err));
          }
        });

        // Handle error event
        report.on('error', function(event) {
          console.error('Report error:', event.detail);
          setError('Failed to load report');
          setIsLoading(false);
        });

      } catch (err) {
        console.error('Failed to embed report:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load report');
          setIsLoading(false);
        }
      }
    };

    embedReport();

    return () => {
      isMounted = false;
      if (report) {
        report.off('loaded');
        report.off('error');
        report.remove();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Apply theme updates
  useEffect(() => {
    if (reportRef.current && generatedTheme && typeof reportRef.current.applyTheme === 'function') {
      reportRef.current.applyTheme({ themeJson: generatedTheme })
        .catch((err: any) => console.error('Failed to apply theme update:', err));
    }
  }, [generatedTheme]);

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
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading Power BI report...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}