import { useMemo } from 'react';
import { ThemeGenerationInput } from '@/lib/theme-generation/types';
import { StyleGenerator } from '@/lib/theme-builder/style-generator';

export interface TableStyles {
  container: React.CSSProperties;
  table: React.CSSProperties;
  header: React.CSSProperties;
  headerCell: React.CSSProperties;
  body: React.CSSProperties;
  row: React.CSSProperties;
  rowHover: React.CSSProperties;
  cell: React.CSSProperties;
  sortIcon: React.CSSProperties;
}

/**
 * Generate table styles from theme
 */
export function useTableStyles(theme: ThemeGenerationInput): TableStyles {
  return useMemo(() => {
    // Get base styles from generator
    const baseStyles = StyleGenerator.generateStyleObject(theme, 'tableEx');
    
    return {
      container: {
        ...baseStyles,
        overflow: 'auto',
        backgroundColor: 'var(--visual-bg, var(--bg-primary))',
      },
      
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-family)',
        fontSize: `${theme.fontSize || 14}px`,
      },
      
      header: {
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: theme.showBorders ? '1px solid var(--border-primary)' : 'none',
      },
      
      headerCell: {
        padding: 'calc(var(--padding) * 0.75) var(--padding)',
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'var(--text-primary)',
        fontSize: '0.875em',
        whiteSpace: 'nowrap',
        position: 'relative',
      },
      
      body: {
        backgroundColor: 'transparent',
      },
      
      row: {
        borderBottom: theme.showBorders ? '1px solid var(--border-tertiary)' : 'none',
        transition: 'background-color 0.15s ease',
      },
      
      rowHover: {
        backgroundColor: 'var(--bg-secondary)',
        opacity: 0.5,
      },
      
      cell: {
        padding: 'calc(var(--padding) * 0.75) var(--padding)',
        color: 'var(--text-primary)',
        fontSize: '0.875em',
      },
      
      sortIcon: {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '0.75em',
        color: 'var(--text-tertiary)',
      },
    };
  }, [theme]);
}