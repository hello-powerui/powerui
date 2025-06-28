// Pre-defined state palettes for success, warning, and error states
// Using OKLCH color space for consistency with our neutral palette generator

import { oklchToHex } from './color-utils';

export type StatePaletteColor = Record<string, string>;

export interface StatePalettes {
  error: {
    red: StatePaletteColor;
  };
  warning: {
    amber: StatePaletteColor;
    orange: StatePaletteColor;
  };
  success: {
    lime: StatePaletteColor;
    green: StatePaletteColor;
  };
}

export const STATE_PALETTES: StatePalettes = {
  error: {
    red: {
      '50': 'oklch(0.971 0.013 17.38)',
      '100': 'oklch(0.936 0.032 17.717)',
      '200': 'oklch(0.885 0.062 18.334)',
      '300': 'oklch(0.808 0.114 19.571)',
      '400': 'oklch(0.704 0.191 22.216)',
      '500': 'oklch(0.637 0.237 25.331)',
      '600': 'oklch(0.577 0.245 27.325)',
      '700': 'oklch(0.505 0.213 27.518)',
      '800': 'oklch(0.444 0.177 26.899)',
      '900': 'oklch(0.396 0.141 25.723)',
      '950': 'oklch(0.258 0.092 26.042)',
    },
  },
  warning: {
    amber: {
      '50': 'oklch(0.987 0.022 95.277)',
      '100': 'oklch(0.962 0.059 95.617)',
      '200': 'oklch(0.924 0.12 95.746)',
      '300': 'oklch(0.879 0.169 91.605)',
      '400': 'oklch(0.828 0.189 84.429)',
      '500': 'oklch(0.769 0.188 70.08)',
      '600': 'oklch(0.666 0.179 58.318)',
      '700': 'oklch(0.555 0.163 48.998)',
      '800': 'oklch(0.473 0.137 46.201)',
      '900': 'oklch(0.414 0.112 45.904)',
      '950': 'oklch(0.279 0.077 45.635)',
    },
    orange: {
      '50': 'oklch(0.98 0.016 73.684)',
      '100': 'oklch(0.954 0.038 75.164)',
      '200': 'oklch(0.901 0.076 70.697)',
      '300': 'oklch(0.837 0.128 66.29)',
      '400': 'oklch(0.75 0.183 55.934)',
      '500': 'oklch(0.705 0.213 47.604)',
      '600': 'oklch(0.646 0.222 41.116)',
      '700': 'oklch(0.553 0.195 38.402)',
      '800': 'oklch(0.47 0.157 37.304)',
      '900': 'oklch(0.408 0.123 38.172)',
      '950': 'oklch(0.266 0.079 36.259)',
    },
  },
  success: {
    lime: {
      '50': 'oklch(0.986 0.031 120.757)',
      '100': 'oklch(0.967 0.067 122.328)',
      '200': 'oklch(0.938 0.127 124.321)',
      '300': 'oklch(0.897 0.196 126.665)',
      '400': 'oklch(0.841 0.238 128.85)',
      '500': 'oklch(0.768 0.233 130.85)',
      '600': 'oklch(0.648 0.2 131.684)',
      '700': 'oklch(0.532 0.157 131.589)',
      '800': 'oklch(0.453 0.124 130.933)',
      '900': 'oklch(0.405 0.101 131.063)',
      '950': 'oklch(0.274 0.072 132.109)',
    },
    green: {
      '50': 'oklch(0.982 0.018 155.826)',
      '100': 'oklch(0.962 0.044 156.743)',
      '200': 'oklch(0.925 0.084 155.995)',
      '300': 'oklch(0.871 0.15 154.449)',
      '400': 'oklch(0.792 0.209 151.711)',
      '500': 'oklch(0.723 0.219 149.579)',
      '600': 'oklch(0.627 0.194 149.214)',
      '700': 'oklch(0.527 0.154 150.069)',
      '800': 'oklch(0.448 0.119 151.328)',
      '900': 'oklch(0.393 0.095 152.535)',
      '950': 'oklch(0.266 0.065 152.934)',
    },
  },
};

// Convert OKLCH strings to hex
export function convertStatePaletteToHex(palette: StatePaletteColor): Record<string, string> {
  const hexPalette: Record<string, string> = {};
  
  for (const [shade, oklchValue] of Object.entries(palette)) {
    // Parse OKLCH string
    const match = oklchValue.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (match) {
      const l = parseFloat(match[1]);
      const c = parseFloat(match[2]);
      const h = parseFloat(match[3]);
      
      hexPalette[shade] = oklchToHex(l, c, h);
    }
  }
  
  return hexPalette;
}