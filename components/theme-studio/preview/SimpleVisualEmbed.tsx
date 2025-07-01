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

interface SimpleVisualEmbedProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onReportReset?: (resetFn: () => void) => void;
  width?: number;
  height?: number;
}

function SimpleVisualEmbed({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onReportReset,
  width = 800,
  height = 600
}: SimpleVisualEmbedProps) {
  const [reportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration | null>(null);
  const [visualConfig, setVisualConfig] = useState<models.IVisualEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<'discovery' | 'embedding'>('discovery');
  const [discoveredVisual, setDiscoveredVisual] = useState<{name: string, type: string, title: string} | null>(null);
  const reportRef = useRef<Report | null>(null);
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

  // Phase 1: Load report for discovery
  useEffect(() => {
    if (!variantPreviewTheme || 
        selectedVisualType === '*' || 
        !isVisualTypeSupported(selectedVisualType)) {
      return;
    }

    const loadDiscoveryReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setPhase('discovery');
        
        const config = await powerBIService.getEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          variantPreviewTheme
        );
        
        const discoveryConfig: models.IReportEmbedConfiguration = {
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

        setReportConfig(discoveryConfig);
        
      } catch (err) {
        console.error('Failed to load discovery report:', err);
        setError(err instanceof Error ? err.message : 'Failed to load report for discovery');
        setIsLoading(false);
      }
    };

    loadDiscoveryReport();
  }, [variantPreviewTheme, selectedVisualType, powerBIService]);

  // Discover visual when report loads
  const discoverVisual = useCallback(async () => {
    if (!reportRef.current) return;

    try {
      console.log('Starting visual discovery...');
      
      const pages = await reportRef.current.getPages();
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
        
        const discovered = {
          name: matchingVisual.name,
          type: matchingVisual.type,
          title: matchingVisual.title || matchingVisual.name
        };
        
        setDiscoveredVisual(discovered);
        
        // Now create the visual embed config
        const config = await powerBIService.getVisualEmbedConfigWithTheme(
          powerBIConfig.reportId,
          powerBIConfig.workspaceId,
          getAllVisualsPage(),
          discovered.name,
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
          visualName: discovered.name,
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            background: models.BackgroundType.Transparent
          },
          theme: { themeJson: themeToEmbed }
        };

        setVisualConfig(visualEmbedConfig);
        setPhase('embedding');
        setIsLoading(false);
        
      } else {
        throw new Error(`No visual found for type '${selectedVisualType}'. Looking for: ${targetTypes.join(', ')}. Available: ${pageVisuals.map(v => v.type).join(', ')}`);
      }
      
    } catch (err) {
      console.error('Visual discovery failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to discover visual');
      setIsLoading(false);
    }
  }, [selectedVisualType, variantPreviewTheme, powerBIService]);

  // Event handlers for discovery report
  const discoveryEventHandlers = new Map([
    ['loaded', discoverVisual],
    ['error', function (event: any) {
      console.error('Discovery report error:', event);
      setError(event?.detail?.message || 'Discovery report error');
      setIsLoading(false);
    }]
  ]);

  // Event handlers for visual embed
  const visualEventHandlers = new Map([
    ['loaded', function () {
      console.log('Visual loaded successfully');
    }],
    ['error', function (event: any) {
      console.error('Visual error:', event);
      setError(event?.detail?.message || 'Visual loading error');
    }]
  ]);

  // Reset when visual type changes
  useEffect(() => {
    setDiscoveredVisual(null);
    setVisualConfig(null);
    setReportConfig(null);
    setError(null);
    setIsLoading(true);
    setPhase('discovery');
  }, [selectedVisualType]);

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
          <p className="text-sm text-gray-600">
            {phase === 'discovery' && 'Discovering visual...'}
            {phase === 'embedding' && 'Embedding visual...'}
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
              setVisualConfig(null);
              setReportConfig(null);
              setIsLoading(true);
              setPhase('discovery');
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

  // Unsupported visual type
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

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200" style={{ width, height }}>
      {/* Discovery phase - hidden report for finding visuals */}
      {phase === 'discovery' && reportConfig && (
        <div style={{ display: 'none' }}>
          <PowerBIEmbed
            embedConfig={reportConfig}
            eventHandlers={discoveryEventHandlers}
            cssClassName="discovery-report"
            getEmbeddedComponent={(embeddedReport) => {
              reportRef.current = embeddedReport as Report;
            }}
          />
        </div>
      )}

      {/* Embedding phase - actual visual */}
      {phase === 'embedding' && visualConfig && (
        <>
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
              embedConfig={visualConfig}
              eventHandlers={visualEventHandlers}
              cssClassName="simple-visual-container"
              getEmbeddedComponent={(embeddedVisual) => {
                visualRef.current = embeddedVisual as Visual;
              }}
            />
          </div>
        </>
      )}

      <style jsx global>{`
        .simple-visual-container {
          height: 100%;
          width: 100%;
        }
        .simple-visual-container iframe {
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

export default memo(SimpleVisualEmbed);