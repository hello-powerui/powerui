import { models, Report, Page, VisualDescriptor } from 'powerbi-client';

// Page names in the Power BI report
export const REPORT_PAGES = {
  HOME: 'Home',           // Dashboard page shown by default
  ALL_VISUALS: 'AllVisuals'  // Page with individual visual samples
} as const;

// Visual type mapping from theme studio to Power BI visual types
// This will be used to find visuals on the AllVisuals page by their type
export const VISUAL_TYPE_MAPPING: Record<string, string[]> = {
  'actionButton': ['actionButton', 'button'],
  'shape': ['shape'],
  'textbox': ['textbox'],
  'card': ['card'],
  'cardVisual': ['cardVisual'],
  'multiRowCard': ['multiRowCard'],
  'slicer': ['slicer'],
  'listSlicer': ['listSlicer'],
  'textSlicer': ['textSlicer'],
  'table': ['table'],
  'tableEx': ['tableEx'],
  'pivotTable': ['pivotTable'],
  'barChart': ['barChart'],
  'clusteredBarChart': ['clusteredBarChart'],
  'stackedBarChart': ['stackedBarChart'],
  'hundredPercentStackedBarChart': ['hundredPercentStackedBarChart'],
  'columnChart': ['columnChart'],
  'clusteredColumnChart': ['clusteredColumnChart'],
  'stackedColumnChart': ['stackedColumnChart'],
  'hundredPercentStackedColumnChart': ['hundredPercentStackedColumnChart'],
  'lineChart': ['lineChart'],
  'areaChart': ['areaChart'],
  'stackedAreaChart': ['stackedAreaChart'],
  'pieChart': ['pieChart'],
  'donutChart': ['donutChart'],
  'scatterChart': ['scatterChart'],
  'bubbleChart': ['bubbleChart'],
  'gauge': ['gauge'],
  'funnel': ['funnel'],
  'treemap': ['treemap'],
  'filledMap': ['filledMap'],
  'map': ['map'],
  'ribbonChart': ['ribbonChart'],
  'waterfallChart': ['waterfallChart'],
  'lineClusteredColumnComboChart': ['lineClusteredColumnComboChart'],
  'lineStackedColumnComboChart': ['lineStackedColumnComboChart'],
  'kpi': ['kpi'],
  'hundredPercentStackedAreaChart': ['hundredPercentStackedAreaChart']
};

/**
 * Find a visual on the AllVisuals page by its type
 * @param report - Power BI report instance
 * @param visualType - Theme visual type to find
 * @returns Visual descriptor if found, null otherwise
 */
export async function findVisualByType(
  report: Report, 
  visualType: string
): Promise<{ visualName: string; pageName: string } | null> {
  try {
    const pages = await report.getPages();
    const allVisualsPage = pages.find(p => p.name === REPORT_PAGES.ALL_VISUALS);
    
    if (!allVisualsPage) {
      console.error(`Page '${REPORT_PAGES.ALL_VISUALS}' not found in report`);
      return null;
    }

    const visuals = await allVisualsPage.getVisuals();
    const targetTypes = VISUAL_TYPE_MAPPING[visualType];
    
    if (!targetTypes) {
      console.error(`Visual type '${visualType}' not found in mapping`);
      return null;
    }

    // Find the first visual that matches any of the target types
    const matchingVisual = visuals.find((visual: VisualDescriptor) => 
      targetTypes.includes(visual.type)
    );

    if (matchingVisual) {
      return {
        visualName: matchingVisual.name,
        pageName: REPORT_PAGES.ALL_VISUALS
      };
    }

    console.error(`No visual found for type '${visualType}' on page '${REPORT_PAGES.ALL_VISUALS}'`);
    return null;
  } catch (error) {
    console.error('Error finding visual by type:', error);
    return null;
  }
}

/**
 * Generate visual embed configuration for individual visual embedding
 * @param reportId - Power BI report ID
 * @param embedUrl - Embed URL
 * @param accessToken - Access token
 * @param visualName - Specific visual name to embed
 * @param theme - Optional theme to apply
 */
export function generateVisualEmbedConfig(
  reportId: string,
  embedUrl: string,
  accessToken: string,
  visualName: string,
  theme?: any
): models.IVisualEmbedConfiguration {
  const config: models.IVisualEmbedConfiguration = {
    type: 'visual',
    id: reportId,
    embedUrl: embedUrl,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    pageName: REPORT_PAGES.ALL_VISUALS,
    visualName: visualName,
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
  return visualType in VISUAL_TYPE_MAPPING;
}

/**
 * Get all supported visual types
 */
export function getSupportedVisualTypes(): string[] {
  return Object.keys(VISUAL_TYPE_MAPPING);
}

/**
 * Get the Power BI visual types for a theme visual type
 */
export function getPowerBIVisualTypes(visualType: string): string[] {
  return VISUAL_TYPE_MAPPING[visualType] || [];
}

/**
 * Get the home page name
 */
export function getHomePage(): string {
  return REPORT_PAGES.HOME;
}

/**
 * Get the all visuals page name
 */
export function getAllVisualsPage(): string {
  return REPORT_PAGES.ALL_VISUALS;
}