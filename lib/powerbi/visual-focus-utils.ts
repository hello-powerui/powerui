import { models } from 'powerbi-client';

export interface VisualInfo {
  name: string;
  title: string;
  type: string;
  layout: {
    x: number;
    y: number;
    z?: number;
    width: number;
    height: number;
  };
}

export interface FocusLayoutConfig {
  layoutType: models.LayoutType;
  customLayout: {
    pageSize: models.ICustomPageSize;
    displayOption: models.DisplayOption;
    pagesLayout: {
      [pageName: string]: {
        defaultLayout: models.IVisualLayout;
        visualsLayout: {
          [visualName: string]: models.IVisualLayout;
        };
      };
    };
  };
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
}

// Visual type mapping from theme studio to Power BI
// Each visual type maps to its exact Power BI visual type(s)
const VISUAL_TYPE_MAPPING: Record<string, string[]> = {
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
  'lineClusteredColumnComboChart': ['lineClusteredColumnComboChart'],
  'lineStackedColumnComboChart': ['lineStackedColumnComboChart'],
  'areaChart': ['areaChart'],
  'stackedAreaChart': ['stackedAreaChart'],
  'hundredPercentStackedAreaChart': ['hundredPercentStackedAreaChart'],
  'pieChart': ['pieChart'],
  'donutChart': ['donutChart'],
  'scatterChart': ['scatterChart'],
  'waterfallChart': ['waterfallChart'],
  'ribbonChart': ['ribbonChart'],
  'treemap': ['treemap'],
  'funnel': ['funnel'],
  'gauge': ['gauge'],
  'kpi': ['kpi'],
  'scorecard': ['scorecard'],
  'map': ['map'],
  'filledMap': ['filledMap'],
  'shapeMap': ['shapeMap'],
  'azureMap': ['azureMap'],
  'decompositionTreeVisual': ['decompositionTreeVisual'],
  'keyDriversVisual': ['keyDriversVisual'],
  'qnaVisual': ['qnaVisual'],
  'aiNarratives': ['aiNarratives'],
  'pythonVisual': ['pythonVisual'],
  'scriptVisual': ['scriptVisual'],
  'rdlVisual': ['rdlVisual'],
};

export function mapThemeVisualTypeToPowerBI(themeVisualType: string): string[] {
  if (themeVisualType === '*') return ['*']; // All visuals
  return VISUAL_TYPE_MAPPING[themeVisualType] || [themeVisualType];
}

export function generateFocusedVisualLayout(
  visuals: VisualInfo[],
  selectedVisualType: string,
  pageId: string,
  pageSize?: { width: number; height: number }
): FocusLayoutConfig {
  const defaultPageSize = { width: 1200, height: 720 };
  const actualPageSize = pageSize || defaultPageSize;
  
  // Default layout: hidden for all visuals
  const defaultLayout: models.IVisualLayout = {
    displayState: {
      mode: models.VisualContainerDisplayMode.Hidden
    }
  };

  // Get Power BI visual types that match the selected theme visual type
  const targetVisualTypes = mapThemeVisualTypeToPowerBI(selectedVisualType);
  
  // Filter visuals of the selected type
  const selectedVisuals = selectedVisualType === '*' 
    ? visuals 
    : visuals.filter(v => targetVisualTypes.includes(v.type));

  // Calculate layout for selected visuals
  const visualsLayout: { [visualName: string]: models.IVisualLayout } = {};
  
  if (selectedVisuals.length === 0) {
    // No visuals of this type found
    return {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        pageSize: {
          type: models.PageSizeType.Custom,
          width: actualPageSize.width,
          height: actualPageSize.height
        },
        displayOption: models.DisplayOption.ActualSize,
        pagesLayout: {
          [pageId]: {
            defaultLayout,
            visualsLayout: {}
          }
        }
      }
    };
  }

  if (selectedVisuals.length === 1) {
    // Single visual: center at original size
    const visual = selectedVisuals[0];
    
    visualsLayout[visual.name] = {
      x: (actualPageSize.width - visual.layout.width) / 2,
      y: (actualPageSize.height - visual.layout.height) / 2,
      z: visual.layout.z,
      width: visual.layout.width,
      height: visual.layout.height,
      displayState: {
        mode: models.VisualContainerDisplayMode.Visible
      }
    };
  } else {
    // Multiple visuals: arrange in a grid at original sizes
    const cols = Math.ceil(Math.sqrt(selectedVisuals.length));
    const rows = Math.ceil(selectedVisuals.length / cols);
    const padding = 40;
    
    // Calculate total bounds needed for all visuals at original size
    const maxVisualWidth = Math.max(...selectedVisuals.map(v => v.layout.width));
    const maxVisualHeight = Math.max(...selectedVisuals.map(v => v.layout.height));
    
    // Calculate grid cell size based on largest visual
    const cellWidth = maxVisualWidth + padding;
    const cellHeight = maxVisualHeight + padding;
    
    // Calculate total grid size
    const totalGridWidth = cols * cellWidth;
    const totalGridHeight = rows * cellHeight;
    
    // Center the grid on the page
    const gridStartX = (actualPageSize.width - totalGridWidth) / 2;
    const gridStartY = (actualPageSize.height - totalGridHeight) / 2;
    
    selectedVisuals.forEach((visual, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      // Center each visual within its grid cell
      const cellX = gridStartX + col * cellWidth;
      const cellY = gridStartY + row * cellHeight;
      
      const x = cellX + (cellWidth - visual.layout.width) / 2;
      const y = cellY + (cellHeight - visual.layout.height) / 2;
      
      visualsLayout[visual.name] = {
        x,
        y,
        z: visual.layout.z,
        width: visual.layout.width,
        height: visual.layout.height,
        displayState: {
          mode: models.VisualContainerDisplayMode.Visible
        }
      };
    });
  }

  return {
    layoutType: models.LayoutType.Custom,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Custom,
        width: actualPageSize.width,
        height: actualPageSize.height
      },
      displayOption: models.DisplayOption.ActualSize,
      pagesLayout: {
        [pageId]: {
          defaultLayout,
          visualsLayout
        }
      }
    },
    filterPaneEnabled: false,
    navContentPaneEnabled: false
  };
}

export function generateDefaultLayout(pageId: string): FocusLayoutConfig {
  // Reset to original layout by using Master layout type
  // This tells Power BI to use the report's default layout
  return {
    layoutType: models.LayoutType.Master,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Widescreen,
        width: 1280,
        height: 720
      },
      displayOption: models.DisplayOption.ActualSize,
      pagesLayout: {
        [pageId]: {
          defaultLayout: {
            displayState: {
              mode: models.VisualContainerDisplayMode.Visible
            }
          },
          visualsLayout: {}
        }
      }
    },
    filterPaneEnabled: true,
    navContentPaneEnabled: false
  };
}