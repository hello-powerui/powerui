/**
 * Direct mapping of theme visual types to Power BI visual names on the AllVisuals page
 * This mapping is manually maintained based on the actual visuals in the report
 */
export const VISUAL_NAME_MAPPING: Record<string, string> = {
  // Charts
  'barChart': '0c42bff8585d88872591',
  'clusteredBarChart': '45da91cc51bfdbd0b241',
  'hundredPercentStackedBarChart': '8957f95a5d7eb32bd00e',
  'columnChart': '72eaf7bf5be97a046887',
  'clusteredColumnChart': '6581e6c6e4b12494d4e9',
  'hundredPercentStackedColumnChart': '346ffc43aba74eeda113',
  'lineChart': '9df16772927cb14b740b',
  'areaChart': '53a5636c395dd93d600e',
  'stackedAreaChart': '8593a93f608a43ee637c',
  'hundredPercentStackedAreaChart': '3b6db527a2c31222a208',
  'pieChart': '8d274c20db10a2b70095',
  'donutChart': 'a514429d97b4ca4dc991',
  'scatterChart': '99e1aabb7966cb303a33',
  'waterfallChart': '146a6505020a0e20915c',
  'funnel': 'a5ac24667e85ed3a41e9',
  'ribbonChart': 'fdde62bac13dc781165c',
  'lineClusteredColumnComboChart': '821dae2fc80129508370',
  'lineStackedColumnComboChart': '16d46aec0786b123c92c',
  
  // Tables & Matrix
  'tableEx': '7d512382a74bcf497381',
  'pivotTable': '4f19c7f044133184b117',
  
  // Cards & KPIs
  'cardVisual': '6c51c7e01a5462e95534', // First card visual
  'kpi': 'adada8fecea45593c511', // First KPI
  'gauge': 'ec322361c8a20dc86ba4',
  
  // Maps
  'map': 'f2582bc09cb53735c2f5', // Azure Map
  'filledMap': '8572c49ac022ae502241',
  'shapeMap': '99d36fad54a7d86a0ea0',
  
  // Slicers
  'slicer': '8b6109146375509d1031',
  'textSlicer': 'b3ea7b180a55de0d6de4',
  'listSlicer': '29174ae220bc24d97277',
  
  // Other
  'actionButton': '7177bfb3b020ee4cee1f',
  'textbox': '4d46ddf9bc99f8b363c4',
  'shape': '057aea91daa664c40626',
  'image': 'a7edc34117d9efa7844d',
  
  // Note: Some visual types might not have theme support or might not be included:
  // - decompositionTreeVisual
  // - qnaVisual
  // - advancedSlicerVisual
  // - pageNavigator
  // - bookmarkNavigator
};

/**
 * Get the visual name for a theme visual type
 */
export function getVisualName(visualType: string): string | null {
  return VISUAL_NAME_MAPPING[visualType] || null;
}

/**
 * Check if a visual type has a mapped visual
 */
export function hasVisualMapping(visualType: string): boolean {
  return visualType in VISUAL_NAME_MAPPING;
}

/**
 * Get all mapped visual types
 */
export function getMappedVisualTypes(): string[] {
  return Object.keys(VISUAL_NAME_MAPPING);
}