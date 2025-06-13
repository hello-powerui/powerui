import { useMemo } from 'react';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';

export interface ChartStyles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  legend: React.CSSProperties;
  legendItem: React.CSSProperties;
  legendDot: React.CSSProperties;
  legendText: React.CSSProperties;
  axis: React.CSSProperties;
  gridLine: React.CSSProperties;
  dataLabel: React.CSSProperties;
}

/**
 * Generate chart styles from theme
 */
export function useChartStyles(theme: ThemeGenerationInput): ChartStyles {
  return useMemo(() => {
    return {
      container: {
        fontFamily: 'var(--font-family)',
        color: 'var(--text-primary)',
        backgroundColor: 'transparent',
      },
      
      title: {
        fontSize: '1em',
        fontWeight: theme.fontWeight || 'normal',
        color: 'var(--text-primary)',
        marginBottom: 'var(--spacing)',
      },
      
      legend: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'calc(var(--spacing) * 1.5)',
        marginTop: 'var(--spacing)',
        fontSize: '0.875em',
      },
      
      legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      },
      
      legendDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        flexShrink: 0,
      },
      
      legendText: {
        color: 'var(--text-secondary)',
        fontSize: '0.875em',
      },
      
      axis: {
        stroke: 'var(--text-tertiary)',
        strokeWidth: 1,
        fontSize: '0.75em',
        fill: 'var(--text-tertiary)',
      },
      
      gridLine: {
        stroke: 'var(--border-tertiary)',
        strokeWidth: 1,
        strokeDasharray: '3 3',
      },
      
      dataLabel: {
        fontSize: '0.75em',
        fill: 'var(--text-secondary)',
        fontWeight: theme.fontWeight || 'normal',
      },
    };
  }, [theme]);
}

/**
 * Get chart colors from theme
 */
export function useChartColors(theme: ThemeGenerationInput): string[] {
  return useMemo(() => {
    return theme.dataColors.length > 0 
      ? theme.dataColors 
      : ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'];
  }, [theme.dataColors]);
}