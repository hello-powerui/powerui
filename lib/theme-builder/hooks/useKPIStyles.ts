import { useMemo } from 'react';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';
import { StyleGenerator } from '@/lib/theme-builder/style-generator';

export interface KPIStyles {
  card: React.CSSProperties;
  title: React.CSSProperties;
  value: React.CSSProperties;
  target: React.CSSProperties;
  progress: React.CSSProperties;
  progressBar: React.CSSProperties;
  progressFill: React.CSSProperties;
  trend: React.CSSProperties;
  trendUp: React.CSSProperties;
  trendDown: React.CSSProperties;
}

/**
 * Generate KPI card styles from theme
 */
export function useKPIStyles(theme: ThemeGenerationInput, colorIndex: number = 0): KPIStyles {
  return useMemo(() => {
    // Get base styles from generator
    const baseStyles = StyleGenerator.generateStyleObject(theme, 'kpi');
    
    // Get theme color for this KPI
    const themeColor = theme.dataColors[colorIndex % theme.dataColors.length];
    
    return {
      card: {
        ...baseStyles,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
        backgroundColor: 'var(--visual-bg, var(--bg-primary))',
        transition: 'all 0.2s ease',
      },
      
      title: {
        fontSize: '0.875em',
        fontWeight: theme.fontWeight || 'normal',
        color: 'var(--text-secondary)',
        margin: 0,
      },
      
      value: {
        fontSize: '1.75em',
        fontWeight: 'bold',
        color: themeColor,
        margin: 0,
        lineHeight: 1.2,
      },
      
      target: {
        fontSize: '0.875em',
        color: 'var(--text-tertiary)',
        margin: 0,
      },
      
      progress: {
        position: 'relative',
        height: '6px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '3px',
        overflow: 'hidden',
      },
      
      progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: themeColor,
        transition: 'width 0.3s ease',
        borderRadius: '3px',
      },
      
      progressFill: {
        width: '100%',
        height: '100%',
        backgroundColor: themeColor,
      },
      
      trend: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.875em',
      },
      
      trendUp: {
        color: theme.dataColors[5] || '#2ACF56', // Success color
      },
      
      trendDown: {
        color: theme.dataColors[2] || '#FF006E', // Error color
      },
    };
  }, [theme, colorIndex]);
}