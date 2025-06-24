import { PowerBITheme } from '@/lib/theme-studio/types';

export function downloadThemeJson(theme: PowerBITheme, filename?: string) {
  const jsonString = JSON.stringify(theme, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'theme.json';
  a.click();
  URL.revokeObjectURL(url);
}