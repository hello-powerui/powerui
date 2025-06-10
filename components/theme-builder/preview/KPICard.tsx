'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';

interface KPICardProps {
  title: string;
  value: string;
  target: string;
  progress: number;
  comparison: string;
  colorIndex?: number;
}

export function KPICard({ 
  title, 
  value, 
  target, 
  progress, 
  comparison,
  colorIndex = 0 
}: KPICardProps) {
  const { theme } = useThemeBuilderStore();
  
  // Determine comparison color based on positive/negative
  const isPositive = !comparison.startsWith('-');
  const comparisonColor = isPositive ? '#84cc16' : '#ef4444';

  return (
    <div className="kpi-card typeimage-below-value">
      <div className="kpi-card-content-wrapper">
        <div className="kpi-card-text-wrapper">
          <div className="kpi-value-title">{title}</div>
          <div className="kpi-value">{value}</div>
        </div>
        
        <div className="progress-bar-bg">
          <div 
            className="progress-bar"
            style={{ 
              width: `${progress}%`,
              backgroundColor: `var(--theme-color${colorIndex + 1}, var(--primary-500))` 
            }}
          />
        </div>
        
        <div className="kpi-details-wrapper">
          <div className="detail-text">Target: {target}</div>
          <div className="comparison-text" style={{ color: comparisonColor }}>
            {comparison}
          </div>
        </div>
      </div>
    </div>
  );
}