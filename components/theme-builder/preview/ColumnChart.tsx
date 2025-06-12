'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { useChartStyles, useChartColors } from '@/lib/theme-builder/hooks';
import { StyleGenerator } from '@/lib/theme-builder/style-generator';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface ColumnChartProps {
  title?: string;
}

export function ColumnChart({ title }: ColumnChartProps) {
  const { theme } = useThemeBuilderStore();
  
  // Convert ThemeBuilderTheme to ThemeGenerationInput
  const themeInput = {
    mode: theme.mode,
    neutralPalette: (theme.neutralPalette?.shades && typeof theme.neutralPalette.shades === 'object' && !Array.isArray(theme.neutralPalette.shades)) ? theme.neutralPalette.shades as Record<string, string> : AZURE_NEUTRAL_PALETTE.shades,
    fontFamily: theme.fontFamily,
    borderRadius: theme.borderRadius,
    dataColors: (Array.isArray(theme.palette.colors)) ? theme.palette.colors as string[] : [],
    name: theme.name,
    bgStyle: theme.bgStyle,
    borderStyle: theme.borderStyle,
    paddingStyle: theme.spacing === 'compact' ? 'default' : theme.spacing === 'relaxed' ? 'large' : 'default'
  };
  
  const styles = useChartStyles(themeInput);
  const colors = useChartColors(themeInput);
  const baseStyles = StyleGenerator.generateStyleObject(themeInput, 'columnChart');
  
  const data = [
    { category: 'Electronics', values: [20, 15, 10, 25, 30] },
    { category: 'Clothing', values: [15, 20, 25, 15, 20] },
    { category: 'Food', values: [30, 25, 20, 30, 25] },
    { category: 'Books', values: [10, 15, 20, 10, 15] },
    { category: 'Sports', values: [25, 25, 25, 20, 10] },
  ];

  const maxValue = 100;
  const yAxisLabels = ['100', '80', '60', '40', '20', '0'];

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
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {data.map((item, categoryIndex) => (
            <div key={item.category} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center gap-0.5 mb-2 h-48">
                {item.values.map((value, seriesIndex) => (
                  <div
                    key={seriesIndex}
                    className="flex-1 transition-all duration-300"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                      backgroundColor: colors[seriesIndex],
                      borderRadius: `${theme.borderRadius / 4}px ${theme.borderRadius / 4}px 0 0`,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
              <div className="text-center" style={styles.axis}>
                {item.category}
              </div>
            </div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {yAxisLabels.map((_, index) => (
            <div key={index} style={{
              borderBottom: `${styles.gridLine.strokeWidth}px solid`,
              borderColor: 'var(--border-tertiary)',
              opacity: 0.5,
            }} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}