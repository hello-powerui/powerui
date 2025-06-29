// Pre-defined state palettes for success, warning, and error states
// Using OKLCH color space for consistency with our neutral palette generator

import { oklchToHex } from './color-utils';

export type StatePaletteColor = Record<string, string>;

export interface StatePalettes {
  error: {
    red: StatePaletteColor;
    scarlet: StatePaletteColor;
  };
  warning: {
    amber: StatePaletteColor;
    orange: StatePaletteColor;
    yellow: StatePaletteColor;
  };
  success: {
    lime: StatePaletteColor;
    green: StatePaletteColor;
    lightGreen: StatePaletteColor;
  };
}

export const STATE_PALETTES: StatePalettes = {
  error: {
    red: {
      '25': 'oklch(0.985 0.006 17.38)',
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
    scarlet: {
      '25': 'oklch(0.985 0.01 22)',
      '50': 'oklch(0.971 0.022 28.528)',
      '100': 'oklch(0.942 0.048 26.909)',
      '200': 'oklch(0.89 0.098 26.192)',
      '300': 'oklch(0.818 0.159 27.169)',
      '400': 'oklch(0.732 0.237 28.832)',
      '500': 'oklch(0.658 0.269 28.21)',
      '600': 'oklch(0.617 0.274 26.642)',
      '700': 'oklch(0.518 0.234 24.801)',
      '800': 'oklch(0.435 0.19 22.717)',
      '900': 'oklch(0.385 0.153 21.298)',
      '950': 'oklch(0.243 0.099 19.443)',
    },
  },
  warning: {
    amber: {
      '25': 'oklch(0.994 0.011 95.277)',
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
      '25': 'oklch(0.99 0.008 73.684)',
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
    yellow: {
      '25': 'oklch(0.993 0.008 103.5)',
      '50': 'oklch(0.985 0.026 104.067)',
      '100': 'oklch(0.969 0.058 103.343)',
      '200': 'oklch(0.942 0.109 100.46)',
      '300': 'oklch(0.885 0.17 95.353)',
      '400': 'oklch(0.839 0.19 91.871)',
      '500': 'oklch(0.773 0.174 88.033)',
      '600': 'oklch(0.649 0.158 81.839)',
      '700': 'oklch(0.538 0.134 73.618)',
      '800': 'oklch(0.46 0.109 69.999)',
      '900': 'oklch(0.404 0.089 67.607)',
      '950': 'oklch(0.285 0.065 61.154)',
    },
  },
  success: {
    lime: {
      '25': 'oklch(0.993 0.015 120.757)',
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
      '25': 'oklch(0.991 0.009 155.826)',
      '50': 'oklch(0.977 0.025 142.526)',
      '100': 'oklch(0.955 0.045 142.235)',
      '200': 'oklch(0.91 0.089 143.331)',
      '300': 'oklch(0.85 0.146 143.908)',
      '400': 'oklch(0.761 0.193 144.924)',
      '500': 'oklch(0.695 0.204 143.896)',
      '600': 'oklch(0.562 0.167 144.871)',
      '700': 'oklch(0.468 0.128 146.077)',
      '800': 'oklch(0.401 0.098 146.795)',
      '900': 'oklch(0.356 0.077 147.885)',
      '950': 'oklch(0.235 0.052 147.713)',
    },
    lightGreen: {
      '25': 'oklch(0.991 0.012 120.757)',
      '50': 'oklch(0.978 0.034 119.843)',
      '100': 'oklch(0.957 0.055 120.571)',
      '200': 'oklch(0.924 0.104 123.3)',
      '300': 'oklch(0.875 0.16 126.007)',
      '400': 'oklch(0.804 0.201 128.237)',
      '500': 'oklch(0.729 0.187 128.998)',
      '600': 'oklch(0.596 0.16 129.672)',
      '700': 'oklch(0.487 0.124 129.874)',
      '800': 'oklch(0.417 0.097 129.311)',
      '900': 'oklch(0.372 0.078 129.735)',
      '950': 'oklch(0.242 0.052 130.522)',
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