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
  panes?: {
    filters?: {
      visible?: boolean;
    };
    pageNavigation?: {
      visible?: boolean;
      position?: models.PageNavigationPosition;
    };
  };
}

// Visual type mapping from theme studio to Power BI
const VISUAL_TYPE_MAPPING: Record<string, string[]> = {
  'actionButton': ['actionButton', 'button'],
  'shape': ['shape'],
  'textbox': ['textbox'],
  'card': ['card'],
  'slicer': ['slicer'],
  'table': ['table', 'tableEx'],
  'barChart': ['barChart', 'clusteredBarChart', 'stackedBarChart'],
  'columnChart': ['columnChart', 'clusteredColumnChart', 'stackedColumnChart'],
  'lineChart': ['lineChart'],
  'pieChart': ['pieChart', 'donutChart'],
  'gauge': ['gauge'],
  'kpi': ['kpi'],
  'map': ['map', 'filledMap', 'shapeMap'],
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
        displayOption: models.DisplayOption.FitToPage,
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
    // Single visual: center and enlarge
    const visual = selectedVisuals[0];
    const enlargeFactor = 1.5;
    const newWidth = Math.min(visual.layout.width * enlargeFactor, actualPageSize.width * 0.8);
    const newHeight = Math.min(visual.layout.height * enlargeFactor, actualPageSize.height * 0.8);
    
    visualsLayout[visual.name] = {
      x: (actualPageSize.width - newWidth) / 2,
      y: (actualPageSize.height - newHeight) / 2,
      z: visual.layout.z,
      width: newWidth,
      height: newHeight,
      displayState: {
        mode: models.VisualContainerDisplayMode.Visible
      }
    };
  } else {
    // Multiple visuals: arrange in a grid
    const cols = Math.ceil(Math.sqrt(selectedVisuals.length));
    const rows = Math.ceil(selectedVisuals.length / cols);
    const padding = 20;
    const cellWidth = (actualPageSize.width - padding * (cols + 1)) / cols;
    const cellHeight = (actualPageSize.height - padding * (rows + 1)) / rows;
    
    selectedVisuals.forEach((visual, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      // Maintain aspect ratio
      const aspectRatio = visual.layout.width / visual.layout.height;
      let width = cellWidth - padding;
      let height = cellHeight - padding;
      
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
      
      const x = padding + col * cellWidth + (cellWidth - width) / 2;
      const y = padding + row * cellHeight + (cellHeight - height) / 2;
      
      visualsLayout[visual.name] = {
        x,
        y,
        z: visual.layout.z,
        width,
        height,
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
      displayOption: models.DisplayOption.FitToPage,
      pagesLayout: {
        [pageId]: {
          defaultLayout,
          visualsLayout
        }
      }
    },
    panes: {
      filters: {
        visible: false
      },
      pageNavigation: {
        visible: true,
        position: models.PageNavigationPosition.Bottom
      }
    }
  };
}

export function generateDefaultLayout(pageId: string): FocusLayoutConfig {
  return {
    layoutType: models.LayoutType.Master,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Widescreen,
        width: 1280,
        height: 720
      },
      displayOption: models.DisplayOption.FitToPage,
      pagesLayout: {}
    },
    panes: {
      filters: {
        visible: false
      },
      pageNavigation: {
        visible: true,
        position: models.PageNavigationPosition.Bottom
      }
    }
  };
}