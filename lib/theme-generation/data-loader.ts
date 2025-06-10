import { ThemeConfigs } from './types';
import path from 'path';
import { promises as fs } from 'fs';

let cachedConfigs: ThemeConfigs | null = null;

export async function loadThemeConfigs(): Promise<ThemeConfigs> {
  if (cachedConfigs) {
    return cachedConfigs;
  }

  const dataDir = path.join(process.cwd(), 'public', 'theme-data');

  const configFiles = {
    theme: 'base-theme.json',
    elements: 'elements.json',
    palettes: 'palettes.json',
    fonts: 'fonts.json',
    font_sizes: 'font_sizes.json',
    styles: 'styles.json',
    icons: 'icons.json'
  };

  const configs: any = {};

  for (const [key, filename] of Object.entries(configFiles)) {
    try {
      const filePath = path.join(dataDir, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      configs[key] = JSON.parse(content);
    } catch (error) {
      // Icons are optional
      if (key === 'icons') {
        console.warn(`Failed to load ${filename}, continuing without icons`);
        continue;
      }
      throw new Error(`Failed to load ${filename}: ${error}`);
    }
  }

  cachedConfigs = configs as ThemeConfigs;
  return cachedConfigs;
}

// For client-side usage
export async function loadThemeConfigsClient(): Promise<ThemeConfigs> {
  if (cachedConfigs) {
    return cachedConfigs;
  }

  const configFiles = {
    theme: 'base-theme.json',
    elements: 'elements.json',
    palettes: 'palettes.json',
    fonts: 'fonts.json',
    font_sizes: 'font_sizes.json',
    styles: 'styles.json',
    icons: 'icons.json'
  };

  const configs: any = {};

  for (const [key, filename] of Object.entries(configFiles)) {
    try {
      const response = await fetch(`/theme-data/${filename}`);
      if (!response.ok) {
        if (key === 'icons') {
          console.warn(`Failed to load ${filename}, continuing without icons`);
          continue;
        }
        throw new Error(`Failed to load ${filename}`);
      }
      configs[key] = await response.json();
    } catch (error) {
      if (key === 'icons') {
        console.warn(`Failed to load ${filename}, continuing without icons`);
        continue;
      }
      throw new Error(`Failed to load ${filename}: ${error}`);
    }
  }

  cachedConfigs = configs as ThemeConfigs;
  return cachedConfigs;
}

// Clear cache when needed
export function clearConfigCache(): void {
  cachedConfigs = null;
}