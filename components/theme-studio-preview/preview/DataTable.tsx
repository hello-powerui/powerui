'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';
import { useTableStyles } from '@/lib/theme-studio-preview/hooks';
import { StyleGenerator } from '@/lib/theme-studio-preview/style-generator';
import { useState } from 'react';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface DataTableProps {
  title?: string;
}

export function DataTable({ title }: DataTableProps) {
  const { theme } = useThemeBuilderStore();
  
  // Convert ThemeBuilderTheme to ThemeGenerationInput
  const themeInput = {
    mode: theme.mode,
    neutralPalette: (theme.neutralPalette?.shades && typeof theme.neutralPalette.shades === 'object' && !Array.isArray(theme.neutralPalette.shades)) ? theme.neutralPalette.shades as Record<string, string> : AZURE_NEUTRAL_PALETTE.shades,
    fontFamily: theme.fontFamily,
    borderRadius: 4,
    dataColors: (Array.isArray(theme.palette.colors)) ? theme.palette.colors as string[] : [],
    name: theme.name,
    bgStyle: 'default',
    borderStyle: 'default',
    paddingStyle: 'default'
  };
  
  const styles = useTableStyles(themeInput);
  const baseStyles = StyleGenerator.generateStyleObject(themeInput, 'tableEx');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  const data = [
    { product: 'Surface Pro 9', category: 'Computers', revenue: '$125,450', units: '234', margin: '42%', growth: '+18%' },
    { product: 'Office 365', category: 'Software', revenue: '$98,320', units: '1,245', margin: '78%', growth: '+22%' },
    { product: 'Xbox Series X', category: 'Gaming', revenue: '$87,600', units: '156', margin: '35%', growth: '+15%' },
    { product: 'Surface Laptop', category: 'Computers', revenue: '$76,890', units: '98', margin: '38%', growth: '-5%' },
    { product: 'Azure Credits', category: 'Cloud', revenue: '$65,200', units: '432', margin: '82%', growth: '+45%' },
    { product: 'Teams Premium', category: 'Software', revenue: '$54,100', units: '876', margin: '75%', growth: '+12%' },
  ];

  return (
    <div style={baseStyles}>
      {title && <h3 style={styles.headerCell}>{title}</h3>}
      <div style={styles.container}>
        <table style={styles.table}>
          <thead style={styles.header}>
            <tr>
              <th style={styles.headerCell}>Product</th>
              <th style={styles.headerCell}>Category</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>Revenue</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>Units</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>Margin</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>Growth</th>
            </tr>
          </thead>
          <tbody style={styles.body}>
            {data.map((row, index) => (
              <tr 
                key={index} 
                style={{
                  ...styles.row,
                  ...(hoveredRow === index ? styles.rowHover : {})
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.cell}>{row.product}</td>
                <td style={styles.cell}>{row.category}</td>
                <td style={{ 
                  ...styles.cell, 
                  textAlign: 'right',
                  color: (Array.isArray(theme.palette.colors) && theme.palette.colors.length > 0) ? theme.palette.colors[0] as string : '#000',
                  fontWeight: 'bold'
                }}>
                  {row.revenue}
                </td>
                <td style={{ 
                  ...styles.cell, 
                  textAlign: 'right'
                }}>
                  {row.units}
                </td>
                <td style={{ 
                  ...styles.cell, 
                  textAlign: 'right'
                }}>
                  {row.margin}
                </td>
                <td style={{ 
                  ...styles.cell, 
                  textAlign: 'right',
                  color: row.growth.startsWith('+') 
                    ? (Array.isArray(theme.palette.colors) && theme.palette.colors.length > 5) ? theme.palette.colors[5] as string : '#2ACF56'
                    : (Array.isArray(theme.palette.colors) && theme.palette.colors.length > 2) ? theme.palette.colors[2] as string : '#FF006E',
                  fontWeight: 'bold'
                }}>
                  {row.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}