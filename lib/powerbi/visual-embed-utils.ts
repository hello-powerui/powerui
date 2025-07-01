import { models } from 'powerbi-client';

// Visual type mapping from theme studio to specific visual names in our samples report
// This maps to specific visual instances in your samples report
export const VISUAL_SAMPLES_MAPPING: Record<string, { visualName: string; pageName: string }> = {
  'actionButton': { visualName: 'ActionButtonSample', pageName: 'VisualSamples' },
  'shape': { visualName: 'ShapeSample', pageName: 'VisualSamples' },
  'textbox': { visualName: 'TextboxSample', pageName: 'VisualSamples' },
  'card': { visualName: 'CardSample', pageName: 'VisualSamples' },
  'cardVisual': { visualName: 'CardVisualSample', pageName: 'VisualSamples' },
  'multiRowCard': { visualName: 'MultiRowCardSample', pageName: 'VisualSamples' },
  'slicer': { visualName: 'SlicerSample', pageName: 'VisualSamples' },
  'listSlicer': { visualName: 'ListSlicerSample', pageName: 'VisualSamples' },
  'textSlicer': { visualName: 'TextSlicerSample', pageName: 'VisualSamples' },
  'table': { visualName: 'TableSample', pageName: 'VisualSamples' },
  'tableEx': { visualName: 'TableExSample', pageName: 'VisualSamples' },
  'pivotTable': { visualName: 'PivotTableSample', pageName: 'VisualSamples' },
  'barChart': { visualName: 'BarChartSample', pageName: 'VisualSamples' },
  'clusteredBarChart': { visualName: 'ClusteredBarChartSample', pageName: 'VisualSamples' },
  'stackedBarChart': { visualName: 'StackedBarChartSample', pageName: 'VisualSamples' },
  'hundredPercentStackedBarChart': { visualName: 'HundredPercentStackedBarChartSample', pageName: 'VisualSamples' },
  'columnChart': { visualName: 'ColumnChartSample', pageName: 'VisualSamples' },
  'clusteredColumnChart': { visualName: 'ClusteredColumnChartSample', pageName: 'VisualSamples' },
  'stackedColumnChart': { visualName: 'StackedColumnChartSample', pageName: 'VisualSamples' },
  'hundredPercentStackedColumnChart': { visualName: 'HundredPercentStackedColumnChartSample', pageName: 'VisualSamples' },
  'lineChart': { visualName: 'LineChartSample', pageName: 'VisualSamples' },
  'areaChart': { visualName: 'AreaChartSample', pageName: 'VisualSamples' },
  'stackedAreaChart': { visualName: 'StackedAreaChartSample', pageName: 'VisualSamples' },
  'pieChart': { visualName: 'PieChartSample', pageName: 'VisualSamples' },
  'donutChart': { visualName: 'DonutChartSample', pageName: 'VisualSamples' },
  'scatterChart': { visualName: 'ScatterChartSample', pageName: 'VisualSamples' },
  'bubbleChart': { visualName: 'BubbleChartSample', pageName: 'VisualSamples' },
  'gauge': { visualName: 'GaugeSample', pageName: 'VisualSamples' },
  'funnel': { visualName: 'FunnelSample', pageName: 'VisualSamples' },
  'treemap': { visualName: 'TreemapSample', pageName: 'VisualSamples' },
  'filledMap': { visualName: 'FilledMapSample', pageName: 'VisualSamples' },
  'map': { visualName: 'MapSample', pageName: 'VisualSamples' },
  'ribbonChart': { visualName: 'RibbonChartSample', pageName: 'VisualSamples' },
  'waterfallChart': { visualName: 'WaterfallChartSample', pageName: 'VisualSamples' },
  'lineClusteredColumnComboChart': { visualName: 'LineClusteredColumnComboChartSample', pageName: 'VisualSamples' },
  'lineStackedColumnComboChart': { visualName: 'LineStackedColumnComboChartSample', pageName: 'VisualSamples' },
  'kpi': { visualName: 'KpiSample', pageName: 'VisualSamples' },
  'hundredPercentStackedAreaChart': { visualName: 'HundredPercentStackedAreaChartSample', pageName: 'VisualSamples' }
};

/**
 * Generate visual embed configuration for individual visual embedding
 */
export function generateVisualEmbedConfig(
  reportId: string,
  embedUrl: string,
  accessToken: string,
  visualType: string,
  theme?: any
): models.IVisualEmbedConfiguration {
  const visualMapping = VISUAL_SAMPLES_MAPPING[visualType];
  
  if (!visualMapping) {
    throw new Error(`Visual type '${visualType}' not found in samples mapping`);
  }

  const config: models.IVisualEmbedConfiguration = {
    type: 'visual',
    id: reportId,
    embedUrl: embedUrl,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    pageName: visualMapping.pageName,
    visualName: visualMapping.visualName,
    settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
      background: models.BackgroundType.Transparent
    }
  };

  // Add theme if provided
  if (theme) {
    config.theme = { themeJson: theme };
  }

  return config;
}

/**
 * Check if a visual type is supported for individual embedding
 */
export function isVisualTypeSupported(visualType: string): boolean {
  return visualType in VISUAL_SAMPLES_MAPPING;
}

/**
 * Get all supported visual types
 */
export function getSupportedVisualTypes(): string[] {
  return Object.keys(VISUAL_SAMPLES_MAPPING);
}

/**
 * Get visual mapping info for a specific visual type
 */
export function getVisualMapping(visualType: string): { visualName: string; pageName: string } | null {
  return VISUAL_SAMPLES_MAPPING[visualType] || null;
}