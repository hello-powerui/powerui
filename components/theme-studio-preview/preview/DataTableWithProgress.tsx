'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';

interface DataTableWithProgressProps {
  title?: string;
  subtitle?: string;
}

export function DataTableWithProgress({ title, subtitle }: DataTableWithProgressProps) {
  const { theme } = useThemeBuilderStore();
  
  const data = [
    { continent: 'North America', sales: '$195,284', target: '$107,250', percent: 182, progress: 100 },
    { continent: 'Europe', sales: '$173,742', target: '$241,869', percent: 72, progress: 72 },
    { continent: 'South America', sales: '$154,223', target: '$205,576', percent: 75, progress: 75 },
    { continent: 'Asia', sales: '$56,900', target: '$133,523', percent: 43, progress: 43 },
    { continent: 'Africa', sales: '$54,026', target: '$95,440', percent: 56, progress: 56 },
  ];

  return (
    <div className="preview-visual-container">
      <div className="title">
        {title && <div className="preview-visual-title">{title}</div>}
        {subtitle && <div className="preview-visual-subtitle">{subtitle}</div>}
      </div>
      
      <div className="preview-table-container">
        {/* Continent Column */}
        <div className="column-container fill">
          <div className="preview-column-header">
            <div>Continent</div>
          </div>
          {data.map((row, idx) => (
            <div 
              key={row.continent}
              className={`preview-row-header ${idx % 2 === 1 ? 'preview-alt-bg' : ''}`}
            >
              <div>{row.continent}</div>
            </div>
          ))}
        </div>
        
        {/* Total Sales Column */}
        <div className="column-container fill">
          <div className="preview-column-header">
            <div>Total Sales</div>
          </div>
          {data.map((row, idx) => (
            <div 
              key={`${row.continent}-sales`}
              className={`preview-row-header number ${idx % 2 === 1 ? 'preview-alt-bg' : ''}`}
            >
              <div>{row.sales}</div>
            </div>
          ))}
        </div>
        
        {/* Target Column */}
        <div className="column-container fill">
          <div className="preview-column-header">
            <div>Target</div>
          </div>
          {data.map((row, idx) => (
            <div 
              key={`${row.continent}-target`}
              className={`preview-row-header number ${idx % 2 === 1 ? 'preview-alt-bg' : ''}`}
            >
              <div>{row.target}</div>
            </div>
          ))}
        </div>
        
        {/* Progress Bar Column */}
        <div className="column-container fill">
          <div className="preview-column-header">
            <div>% to Target</div>
          </div>
          {data.map((row, idx) => (
            <div 
              key={`${row.continent}-progress`}
              className={`preview-row-header padding-sm ${idx % 2 === 1 ? 'preview-alt-bg' : ''}`}
            >
              <div className="progress-bar-bg small">
                <div 
                  className={`progress-bar ${row.progress === 72 ? '_72' : row.progress === 75 ? 'image-75' : row.progress === 43 ? '_43' : row.progress === 56 ? '_56' : ''}`}
                  style={{ 
                    width: `${Math.min(row.progress, 100)}%`,
                    backgroundColor: row.percent >= 100 
                      ? `var(--theme-color1, var(--primary-500))` 
                      : `var(--theme-color2, var(--primary-400))`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Percentage Column */}
        <div className="column-container">
          <div className="preview-column-header">
            <div>&nbsp;</div>
          </div>
          {data.map((row, idx) => (
            <div 
              key={`${row.continent}-percent`}
              className={`preview-row-header number ${idx % 2 === 1 ? 'preview-alt-bg' : ''}`}
            >
              <div>{row.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}