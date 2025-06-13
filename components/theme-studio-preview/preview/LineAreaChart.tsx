'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';

interface LineAreaChartProps {
  title?: string;
  subtitle?: string;
}

export function LineAreaChart({ title, subtitle }: LineAreaChartProps) {
  const { theme } = useThemeBuilderStore();
  
  const yAxisLabels = ['$4K', '$3K', '$2K', '$1K', '$0K'];
  const xAxisLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

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
          <div className="line-chart-container">
            <div className="line-chart">
              <svg width="100%" height="100%" viewBox="0 0 393 213" preserveAspectRatio="none" fill="none">
                <path 
                  className="shape-fill" 
                  opacity="0.4"
                  d="M36.6697 30.8675L1 18.8313L1.41476 213.193H392.123V1H354.794L319.539 15.7108L283.869 19.7229L248.614 81.6867L212.53 94.6145L178.934 109.771L142.849 165.494L106.765 161.036L72.3395 94.6145L36.6697 30.8675Z"
                  fill="currentColor"
                  style={{ fill: `var(--theme-color1, var(--primary-500))` }}
                />
                <path 
                  className="shape-stroke"
                  d="M1 18.8313L36.6697 30.8675L72.3395 94.6145L106.765 161.036L142.849 165.494L178.934 109.771L212.53 94.6145L248.614 81.6867L283.869 19.7229L319.539 15.7108L354.794 1H392.123"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ stroke: `var(--theme-color1, var(--primary-500))` }}
                />
              </svg>
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
          
          {/* X-Axis */}
          <div className="x-axis-wrapper">
            {xAxisLabels.map((label, index) => (
              <div key={`x-label-${index}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}