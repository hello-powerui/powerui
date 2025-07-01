'use client';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';
import { useEffect, useState, useRef } from 'react';
import { powerBIConfig } from '@/lib/powerbi/config';
import { PowerBIService } from '@/lib/powerbi/service';

interface VisualInfo {
  name: string;
  type: string;
  title: string;
  layout: any;
  pageName: string;
}

interface PageInfo {
  name: string;
  displayName: string;
  isActive: boolean;
  visuals: VisualInfo[];
}

export function VisualDiagnostics() {
  const [embedConfig, setEmbedConfig] = useState<models.IReportEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<PageInfo[]>([]);
  const reportRef = useRef<Report | null>(null);
  const powerBIService = PowerBIService.getInstance();

  useEffect(() => {
    const loadReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId
        );
        
        const embedConfiguration: models.IReportEmbedConfiguration = {
          type: 'report',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            layoutType: models.LayoutType.Custom,
            customLayout: {
              displayOption: models.DisplayOption.ActualSize
            }
          }
        };

        setEmbedConfig(embedConfiguration);
      } catch (err) {
        console.error('Error loading report:', err);
        setError(err instanceof Error ? err.message : 'Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [powerBIService]);

  const discoverAllVisuals = async () => {
    if (!reportRef.current) return;
    
    try {
      console.log('Starting visual discovery...');
      
      // Get all pages
      const pages = await reportRef.current.getPages();
      console.log('Found pages:', pages.map(p => ({ name: p.name, displayName: p.displayName, isActive: p.isActive })));
      
      const pageInfos: PageInfo[] = [];
      
      // For each page, get its visuals
      for (const page of pages) {
        console.log(`Getting visuals for page: ${page.name}`);
        
        try {
          const visuals = await page.getVisuals();
          console.log(`Page ${page.name} visuals:`, visuals.map(v => ({
            name: v.name,
            type: v.type,
            title: v.title
          })));
          
          const visualInfos: VisualInfo[] = visuals.map((visual: any) => ({
            name: visual.name,
            type: visual.type,
            title: visual.title || visual.name,
            layout: visual.layout,
            pageName: page.name
          }));
          
          pageInfos.push({
            name: page.name,
            displayName: page.displayName || page.name,
            isActive: page.isActive,
            visuals: visualInfos
          });
        } catch (pageError) {
          console.error(`Error getting visuals for page ${page.name}:`, pageError);
          pageInfos.push({
            name: page.name,
            displayName: page.displayName || page.name,
            isActive: page.isActive,
            visuals: []
          });
        }
      }
      
      setDiagnostics(pageInfos);
      console.log('Complete diagnostics:', pageInfos);
      
    } catch (error) {
      console.error('Error during visual discovery:', error);
      setError(`Discovery error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const eventHandlers = new Map([
    ['loaded', function () {
      console.log('Report loaded, starting discovery...');
      discoverAllVisuals();
    }],
    ['error', function (event: any) {
      console.error('Report error:', event);
      setError(event?.detail?.message || 'Report error');
    }]
  ]);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Power BI Visual Diagnostics</h2>
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span>Loading report...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Power BI Visual Diagnostics</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">Error:</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Power BI Visual Diagnostics</h2>
      
      {/* Report embed (hidden) */}
      <div style={{ display: 'none' }}>
        {embedConfig && (
          <PowerBIEmbed
            embedConfig={embedConfig}
            eventHandlers={eventHandlers}
            cssClassName="diagnostic-report"
            getEmbeddedComponent={(embeddedReport) => {
              reportRef.current = embeddedReport as Report;
            }}
          />
        )}
      </div>

      {/* Diagnostics results */}
      {diagnostics.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-green-800 font-medium">✅ Discovery Complete!</div>
            <div className="text-green-600 text-sm mt-1">
              Found {diagnostics.length} pages with {diagnostics.reduce((sum, p) => sum + p.visuals.length, 0)} total visuals
            </div>
          </div>

          {diagnostics.map((page) => (
            <div key={page.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold">{page.displayName}</h3>
                <span className="text-sm text-gray-500">({page.name})</span>
                {page.isActive && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Active</span>
                )}
              </div>
              
              {page.visuals.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium">Visual Name</th>
                        <th className="text-left py-2 px-3 font-medium">Type</th>
                        <th className="text-left py-2 px-3 font-medium">Title</th>
                        <th className="text-left py-2 px-3 font-medium">Layout</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.visuals.map((visual, index) => (
                        <tr key={visual.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-2 px-3 font-mono text-xs">{visual.name}</td>
                          <td className="py-2 px-3">{visual.type}</td>
                          <td className="py-2 px-3">{visual.title}</td>
                          <td className="py-2 px-3 text-xs">
                            {visual.layout ? `${visual.layout.width}x${visual.layout.height}` : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No visuals found on this page</div>
              )}
            </div>
          ))}

          {/* Copy-friendly JSON output */}
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">Raw JSON Data (click to expand)</summary>
            <pre className="mt-3 text-xs bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(diagnostics, null, 2)}
            </pre>
          </details>
        </div>
      ) : (
        <div className="text-gray-500">
          Waiting for report to load and discover visuals...
        </div>
      )}
    </div>
  );
}