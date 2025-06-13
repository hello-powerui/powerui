'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';

interface StackedColumnChartProps {
  title?: string;
  subtitle?: string;
}

export function StackedColumnChart({ title, subtitle }: StackedColumnChartProps) {
  const { theme } = useThemeBuilderStore();
  
  // Sample data with different heights for visual interest
  const columns = [
    { month: 'Jan', height: 80, series: [20, 15, 15, 20, 10] },
    { month: 'Feb', height: 90, series: [25, 20, 15, 20, 10] },
    { month: 'Mar', height: 80, series: [15, 20, 20, 15, 10] },
    { month: 'Apr', height: 75, series: [20, 15, 15, 15, 10] },
    { month: 'May', height: 80, series: [20, 20, 15, 15, 10] },
    { month: 'Jun', height: 90, series: [25, 20, 20, 15, 10] },
    { month: 'Jul', height: 90, series: [20, 25, 20, 15, 10] },
    { month: 'Aug', height: 100, series: [25, 25, 20, 20, 10] },
  ];
  
  const yAxisLabels = ['$4K', '$3K', '$2K', '$1K', '$0K'];

  return (
    <div className="preview-chart-container">
      <div className="title">
        {title && <div className="preview-visual-title">{title}</div>}
        {subtitle && <div className="preview-visual-subtitle">{subtitle}</div>}
      </div>
      
      <div className="flex-block-22">
        {/* Y-Axis */}
        <div className="y-axis-wrapper">
          {yAxisLabels.map((label) => (
            <div key={label} className="y-axis-value">
              <div>{label}</div>
            </div>
          ))}
        </div>
        
        {/* Chart Area */}
        <div className="axis-chart-container">
          {/* Columns */}
          <div className="chart-columns-container">
            {columns.map((column, idx) => (
              <div 
                key={idx} 
                className={`column-wrapper _${column.height}`}
                style={{ height: `${column.height}%` }}
              >
                {[5, 4, 3, 2, 1].map((seriesNum) => (
                  <div 
                    key={seriesNum}
                    className={`series${seriesNum}`}
                    style={{ 
                      height: `${column.series[seriesNum - 1]}%`,
                      backgroundColor: `var(--theme-color${seriesNum}, var(--primary-${600 - seriesNum * 100}))`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* X-Axis */}
          <div className="x-axis-wrapper">
            {columns.map((column) => (
              <div key={column.month} className="axis-value">
                <div>{column.month}</div>
              </div>
            ))}
          </div>
          
          {/* Grid Lines */}
          <div className="gridline-container">
            {yAxisLabels.map((_, idx) => (
              <div key={idx} className="gridline-wrapper">
                <div className="gridline" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}