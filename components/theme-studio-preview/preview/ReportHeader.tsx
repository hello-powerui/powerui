'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';
import { StyleGenerator } from '@/lib/theme-studio-preview/style-generator';
import { AZURE_NEUTRAL_PALETTE } from '@/lib/defaults/palettes';

interface ReportHeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export function ReportHeader({ title, subtitle, lastUpdated }: ReportHeaderProps) {
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
  
  const baseStyles = StyleGenerator.generateStyleObject(themeInput);
  
  const headerStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: 'var(--visual-bg, var(--bg-primary))',
    marginBottom: 'var(--spacing)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: 'none', // Remove border for header
  };
  
  const titleStyles: React.CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.2,
  };
  
  const subtitleStyles: React.CSSProperties = {
    fontSize: '1em',
    fontWeight: 'normal',
    color: 'var(--text-secondary)',
    marginTop: '0.25em',
  };
  
  const metaStyles: React.CSSProperties = {
    fontSize: '0.875em',
    color: 'var(--text-tertiary)',
    textAlign: 'right',
  };
  
  return (
    <div style={headerStyles}>
      <div>
        <h1 style={titleStyles}>{title}</h1>
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
      </div>
      {lastUpdated && (
        <div style={metaStyles}>
          <div>Last updated</div>
          <div style={{ fontWeight: 500, marginTop: '0.25em' }}>{lastUpdated}</div>
        </div>
      )}
    </div>
  );
}