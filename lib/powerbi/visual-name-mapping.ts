/**
 * Direct mapping of theme visual types to Power BI visual info on the AllVisuals page
 * This mapping is manually maintained based on the actual visuals in the report
 */
export interface VisualInfo {
  name: string;
  width: number;
  height: number;
}

export const VISUAL_NAME_MAPPING: Record<string, VisualInfo> = {
  // Charts
  'barChart': { name: '0c42bff8585d88872591', width: 401, height: 300 },
  'clusteredBarChart': { name: '45da91cc51bfdbd0b241', width: 399, height: 300 },
  'hundredPercentStackedBarChart': { name: '8957f95a5d7eb32bd00e', width: 399, height: 300 },
  'columnChart': { name: '72eaf7bf5be97a046887', width: 500, height: 300 },
  'clusteredColumnChart': { name: '6581e6c6e4b12494d4e9', width: 399, height: 300 },
  'hundredPercentStackedColumnChart': { name: '346ffc43aba74eeda113', width: 400, height: 300 },
  'lineChart': { name: '9df16772927cb14b740b', width: 399, height: 300 },
  'areaChart': { name: '53a5636c395dd93d600e', width: 399, height: 300 },
  'stackedAreaChart': { name: '8593a93f608a43ee637c', width: 399, height: 300 },
  'hundredPercentStackedAreaChart': { name: '3b6db527a2c31222a208', width: 399, height: 300 },
  'pieChart': { name: '8d274c20db10a2b70095', width: 399, height: 300 },
  'donutChart': { name: 'a514429d97b4ca4dc991', width: 401, height: 301 },
  'scatterChart': { name: '99e1aabb7966cb303a33', width: 401, height: 303 },
  'waterfallChart': { name: '146a6505020a0e20915c', width: 399, height: 300 },
  'funnel': { name: 'a5ac24667e85ed3a41e9', width: 399, height: 300 },
  'ribbonChart': { name: 'fdde62bac13dc781165c', width: 399, height: 300 },
  'lineClusteredColumnComboChart': { name: '821dae2fc80129508370', width: 399, height: 300 },
  'lineStackedColumnComboChart': { name: '16d46aec0786b123c92c', width: 399, height: 300 },
  
  // Tables & Matrix
  'tableEx': { name: '7d512382a74bcf497381', width: 421, height: 300 },
  'pivotTable': { name: '4f19c7f044133184b117', width: 435, height: 366 },
  
  // Cards & KPIs
  'cardVisual': { name: '6c51c7e01a5462e95534', width: 401, height: 171 },
  'kpi': { name: 'adada8fecea45593c511', width: 366, height: 169 },
  'gauge': { name: 'ec322361c8a20dc86ba4', width: 366, height: 169 },
  
  // Maps
  'map': { name: 'f2582bc09cb53735c2f5', width: 399, height: 300 },
  'filledMap': { name: '8572c49ac022ae502241', width: 399, height: 300 },
  'shapeMap': { name: '99d36fad54a7d86a0ea0', width: 399, height: 300 },
  
  // Slicers
  'slicer': { name: '8b6109146375509d1031', width: 264, height: 150 },
  'textSlicer': { name: 'b3ea7b180a55de0d6de4', width: 500, height: 180 },
  'listSlicer': { name: '29174ae220bc24d97277', width: 316, height: 350 },
  
  // Other
  'actionButton': { name: '7177bfb3b020ee4cee1f', width: 100, height: 40 },
  'textbox': { name: '4d46ddf9bc99f8b363c4', width: 205, height: 151 },
  'shape': { name: '057aea91daa664c40626', width: 181, height: 124 },
  'image': { name: 'a7edc34117d9efa7844d', width: 166, height: 158 },
  
  // Additional visuals
  'treemap': { name: 'e379160300035930e00a', width: 400, height: 300 },
  'bookmarkNavigator': { name: 'af77a72ae211a02e07b9', width: 800, height: 40 },
  'pageNavigator': { name: 'b7dd05a01eb081327cd6', width: 800, height: 40 },
  'advancedSlicerVisual': { name: '84aef77d9b597d658376', width: 300, height: 200 },
  'decompositionTreeVisual': { name: '3c362e509150d4be220d', width: 600, height: 400 },
  'qnaVisual': { name: 'd1233b7f604093c253e3', width: 400, height: 300 }
};

/**
 * Get the visual info for a theme visual type
 */
export function getVisualInfo(visualType: string): VisualInfo | null {
  return VISUAL_NAME_MAPPING[visualType] || null;
}

/**
 * Get the visual name for a theme visual type
 */
export function getVisualName(visualType: string): string | null {
  const info = VISUAL_NAME_MAPPING[visualType];
  return info ? info.name : null;
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