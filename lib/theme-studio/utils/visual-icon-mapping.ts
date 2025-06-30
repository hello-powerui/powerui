export const visualIconMapping: Record<string, string> = {
  // Area Charts
  'areaChart': 'Area chart.svg',
  'stackedAreaChart': 'Stacked area chart.svg',
  'hundredPercentStackedAreaChart': '100Stacked area chart.svg',
  
  // Bar Charts
  'barChart': 'Clustered bar chart.svg',
  'clusteredBarChart': 'Clustered bar chart.svg',
  'stackedBarChart': 'Stacked bar chart.svg',
  'hundredPercentStackedBarChart': '100Stacked bar chart.svg',
  
  // Column Charts
  'columnChart': 'Clustered column chart.svg',
  'clusteredColumnChart': 'Clustered column chart.svg',
  'stackedColumnChart': 'Stacked column chart.svg',
  'hundredPercentStackedColumnChart': '100Stacked column chart.svg',
  
  // Line Charts
  'lineChart': 'Line chart.svg',
  'lineClusteredColumnComboChart': 'Line and clustered column chart.svg',
  'lineStackedColumnComboChart': 'Line and stacked column chart.svg',
  
  // Other Charts
  'pieChart': 'Pie chart.svg',
  'donutChart': 'Donut chart.svg',
  'scatterChart': 'Scatter chart.svg',
  'waterfallChart': 'Waterfall chart.svg',
  'ribbonChart': 'Ribbon chart.svg',
  'treemap': 'Treemap.svg',
  'funnel': 'Funnel.svg',
  
  // Cards and KPIs
  'card': 'Card.svg',
  'cardVisual': 'Card (new).svg',
  'multiRowCard': 'Multi-row card.svg',
  'kpi': 'KPI.svg',
  'scorecard': 'Metrics.svg',
  
  // Maps
  'map': 'Map.svg',
  'azureMap': 'Azure map.svg',
  'filledMap': 'Filled map.svg',
  'shapeMap': 'Shape map.svg',
  
  // Tables and Matrix
  'tableEx': 'Table.svg',
  'pivotTable': 'Matrix.svg',
  
  // Slicers
  'slicer': 'Slicer.svg',
  'listSlicer': 'listSlicer.svg',
  'textSlicer': 'textSlicer.svg',
  // Note: In Power BI, this is called "Button slicer" not "Advanced slicer visual"
  // We map both names to support different schema versions
  'advancedSlicerVisual': 'buttonslicer.svg',
  'buttonSlicer': 'buttonslicer.svg',
  
  // Analytics
  'keyDriversVisual': 'Key influencers.svg',
  'decompositionTreeVisual': 'Decomposition tree.svg',
  'qnaVisual': 'Q&A.svg',
  'aiNarratives': 'Narrative.svg',
  
  // Other Visuals
  'gauge': 'Gauge.svg',
  'pythonVisual': 'Python visual.svg',
  'scriptVisual': 'R script visual.svg',
  'rdlVisual': 'Paginated report.svg',
  
  // Power Platform
  'powerApps': 'Power Apps for Power BI.svg',
  'powerAutomate': 'Power Automate for Power BI.svg',
  
  // ArcGIS
  'arcGISMapVisual': 'ArcGIS for Power BI.svg',
  
  // Text and Media
  'textbox': 'Textbox.svg',
  'image': 'Image.svg',
  
  // Interactive Elements
  'actionButton': 'Buttons.svg',
  'buttonVisual': 'Buttons.svg',
  
  // Navigation
  'pageNavigator': 'pageNavigator.svg',
  'bookmarkNavigator': 'bookmarkNavigator.svg',
  
  // Shapes
  'basicShape': 'Shapes.svg',
  'shape': 'Shapes.svg'
};

export function getVisualIconPath(visualType: string): string | null {
  const iconFile = visualIconMapping[visualType];
  return iconFile ? `/pbi-visual-icons/${iconFile}` : null;
}

export function getVisualsWithoutIcons(allVisualTypes: string[]): string[] {
  return allVisualTypes.filter(visual => !visualIconMapping[visual]);
}