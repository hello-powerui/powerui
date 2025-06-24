'use client';

import { useEffect, useState, useRef } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, service, factories } from 'powerbi-client';
import { PowerBIService } from '@/lib/powerbi/service';
import { powerBIConfig } from '@/lib/powerbi/config';
import { Loader2 } from 'lucide-react';

// Global types are defined in types/global.d.ts

interface PowerBIVisualEmbedProps {
  visualName?: string;
  pageName?: string;
  width?: number;
  height?: number;
  className?: string;
  theme?: any;
}

export function PowerBIVisualEmbed({
  visualName = 'VisualContainer6', // Assuming this is the donut chart
  pageName = 'ReportSection',
  width = 300,
  height = 400,
  className = '',
  theme
}: PowerBIVisualEmbedProps) {
  const [embedConfig, setEmbedConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const powerBIService = PowerBIService.getInstance();

  // Start loading embed config and preload
  useEffect(() => {
    const loadVisual = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get embed token for the report
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          theme
        );

        // Now we can preload with the actual config
        if (typeof window !== 'undefined' && window.powerbi && !isPreloaded) {
          console.log('Preloading Power BI with config...');
          const preloadConfig = {
            type: 'visual',
            embedUrl: config.embedUrl
          };
          window.powerbi.preload(preloadConfig);
          setIsPreloaded(true);
        }

        // Create visual embed configuration
        const visualEmbedConfig: models.IVisualEmbedConfiguration = {
          type: 'visual',
          id: config.id,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken,
          tokenType: models.TokenType.Embed,
          visualName: visualName,
          pageName: pageName,
          settings: {
            background: models.BackgroundType.Transparent,
            visualSettings: {
              visualHeaders: [
                {
                  settings: {
                    visible: false
                  }
                }
              ]
            },
            panes: {
              filters: {
                visible: false
              }
            }
          },
          theme: theme ? { themeJson: theme } : undefined
        };

        setEmbedConfig(visualEmbedConfig);
      } catch (err) {
        console.error('Failed to load Power BI visual:', err);
        setError(err instanceof Error ? err.message : 'Failed to load visual');
      } finally {
        setIsLoading(false);
      }
    };

    loadVisual();
  }, [visualName, pageName, theme, isPreloaded, powerBIService]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`} style={{ width, height }}>
        <div className="text-center px-4">
          <p className="text-gray-500 text-sm mb-2">Unable to load visualization</p>
          <p className="text-gray-400 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  if (!embedConfig) {
    return null;
  }

  return (
    <div className={`powerbi-visual-embed ${className}`} style={{ width, height }}>
      <PowerBIEmbed
        embedConfig={embedConfig}
        cssClassName="powerbi-visual"
        eventHandlers={new Map([
          ['loaded', () => console.log('Visual loaded')],
          ['rendered', () => console.log('Visual rendered')],
          ['error', (event: any) => {
            console.error('Visual error details:', {
              event,
              detail: event?.detail,
              message: event?.detail?.message || 'Unknown error',
              visualName,
              pageName
            });
            if (event?.detail?.message) {
              setError(event.detail.message);
            } else {
              setError('Failed to load visual - it may not exist');
            }
          }]
        ])}
        getEmbeddedComponent={(embeddedVisual) => {
          console.log('Embedded visual:', embeddedVisual);
        }}
      />
      <style jsx global>{`
        .powerbi-visual iframe {
          border: none;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
}