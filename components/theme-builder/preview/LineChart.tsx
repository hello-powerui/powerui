'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { useChartStyles, useChartColors } from '@/lib/theme-builder/hooks';
import { StyleGenerator } from '@/lib/theme-builder/style-generator';

interface LineChartProps {
  title?: string;
}

export function LineChart({ title }: LineChartProps) {
  const { theme } = useThemeBuilderStore();
  
  // Convert ThemeBuilderTheme to ThemeGenerationInput
  const themeInput = {
    mode: theme.mode,
    neutralPalette: theme.neutralPalette.shades,
    fontFamily: theme.fontFamily,
    borderRadius: theme.borderRadius,
    dataColors: theme.palette.colors,
    name: theme.name,
    bgStyle: theme.bgStyle,
    borderStyle: theme.borderStyle,
    paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default'
  };
  
  const styles = useChartStyles(themeInput);
  const colors = useChartColors(themeInput);
  const baseStyles = StyleGenerator.generateStyleObject(themeInput, 'lineChart');
  
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const series = [
    { name: 'Revenue', data: [280, 320, 310, 380, 420, 465] },
    { name: 'Target', data: [300, 320, 340, 360, 380, 400] },
    { name: 'Last Year', data: [250, 260, 280, 290, 300, 320] },
  ];

  const maxValue = 500;
  const yAxisLabels = ['$500K', '$400K', '$300K', '$200K', '$100K', '$0'];

  const getPointPosition = (value: number, index: number) => {
    const x = (index / (months.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 100;
    return { x, y };
  };

  const createPath = (data: number[]) => {
    return data
      .map((value, index) => {
        const { x, y } = getPointPosition(value, index);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div style={{
      ...baseStyles,
      backgroundColor: 'var(--visual-bg, var(--bg-primary))',
    }}>
      {title && <h3 style={styles.title}>{title}</h3>}
      <div className="h-64 flex" style={styles.container}>
        {/* Y-Axis */}
        <div className="flex flex-col justify-between pr-2" style={styles.axis}>
          {yAxisLabels.map((label) => (
            <div key={label} style={{ fontSize: styles.axis.fontSize }}>{label}</div>
          ))}
        </div>

      {/* Chart Area */}
      <div className="flex-1 relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Grid Lines */}
          {yAxisLabels.map((_, index) => (
            <line
              key={index}
              x1="0"
              y1={`${(index / (yAxisLabels.length - 1)) * 100}`}
              x2="100"
              y2={`${(index / (yAxisLabels.length - 1)) * 100}`}
              stroke={styles.gridLine.stroke}
              strokeWidth={styles.gridLine.strokeWidth}
              strokeDasharray={styles.gridLine.strokeDasharray}
            />
          ))}

          {/* Lines */}
          {series.map((s, seriesIndex) => (
            <g key={s.name}>
              <path
                d={createPath(s.data)}
                fill="none"
                stroke={colors[seriesIndex]}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Points */}
              {s.data.map((value, index) => {
                const { x, y } = getPointPosition(value, index);
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={colors[seriesIndex]}
                  />
                );
              })}
            </g>
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-2">
          {months.map((month) => (
            <div key={month} style={styles.axis}>
              {month}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute top-0 right-0" style={styles.legend}>
          {series.map((s, index) => (
            <div key={s.name} style={styles.legendItem}>
              <div 
                style={{
                  ...styles.legendDot,
                  backgroundColor: colors[index]
                }}
              />
              <span style={styles.legendText}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}