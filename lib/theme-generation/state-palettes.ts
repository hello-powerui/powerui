// Pre-defined state palettes for success, warning, and error states
// Now using hex colors directly for better clarity and easier customization

export type StatePaletteColor = Record<string, string>;

export interface StatePalettes {
  error: {
    red: StatePaletteColor;
    rose: StatePaletteColor;
    pink: StatePaletteColor;
  };
  warning: {
    amber: StatePaletteColor;
    orange: StatePaletteColor;
    yellow: StatePaletteColor;
  };
  success: {
    green: StatePaletteColor;
    emerald: StatePaletteColor;
    teal: StatePaletteColor;
    blue: StatePaletteColor;
  };
}

export const STATE_PALETTES: StatePalettes = {
  error: {
    red: {
      '25': '#fef2f2',
      '50': '#fee2e2',
      '100': '#fecaca',
      '200': '#fca5a5',
      '300': '#f87171',
      '400': '#ef4444',
      '500': '#dc2626',
      '600': '#b91c1c',
      '700': '#991b1b',
      '800': '#7f1d1d',
      '900': '#450a0a',
      '950': '#220a0a',
    },
    rose: {
      '25': '#fff1f2',
      '50': '#ffe4e6',
      '100': '#fecdd3',
      '200': '#fda4af',
      '300': '#fb7185',
      '400': '#f43f5e',
      '500': '#e11d48',
      '600': '#be123c',
      '700': '#9f1239',
      '800': '#881337',
      '900': '#4c0519',
      '950': '#2d0a1a',
    },
    pink: {
      '25': '#fdf2f8',
      '50': '#fce7f3',
      '100': '#fbcfe8',
      '200': '#f9a8d4',
      '300': '#f472b6',
      '400': '#ec4899',
      '500': '#db2777',
      '600': '#be185d',
      '700': '#9d174d',
      '800': '#831843',
      '900': '#500724',
      '950': '#2e0a18',
    },
  },
  warning: {
    amber: {
      '25': '#fffbeb',
      '50': '#fef3c7',
      '100': '#fde68a',
      '200': '#fcd34d',
      '300': '#fbbf24',
      '400': '#f59e0b',
      '500': '#d97706',
      '600': '#b45309',
      '700': '#92400e',
      '800': '#78350f',
      '900': '#451a03',
      '950': '#281002',
    },
    orange: {
      '25': '#fff7ed',
      '50': '#ffedd5',
      '100': '#fed7aa',
      '200': '#fdba74',
      '300': '#fb923c',
      '400': '#f97316',
      '500': '#ea580c',
      '600': '#c2410c',
      '700': '#9a3412',
      '800': '#7c2d12',
      '900': '#431407',
      '950': '#2a0e05',
    },
    yellow: {
      '25': '#fefce8',
      '50': '#fef9c3',
      '100': '#fef08a',
      '200': '#fde047',
      '300': '#facc15',
      '400': '#eab308',
      '500': '#ca8a04',
      '600': '#a16207',
      '700': '#854d0e',
      '800': '#713f12',
      '900': '#422006',
      '950': '#291a03',
    },
  },
  success: {
    green: {
      '25': '#f0fdf4',
      '50': '#dcfce7',
      '100': '#bbf7d0',
      '200': '#86efac',
      '300': '#4ade80',
      '400': '#22c55e',
      '500': '#16a34a',
      '600': '#15803d',
      '700': '#166534',
      '800': '#14532d',
      '900': '#052e16',
      '950': '#022c16',
    },
    emerald: {
      '25': '#ecfdf5',
      '50': '#d1fae5',
      '100': '#a7f3d0',
      '200': '#6ee7b7',
      '300': '#34d399',
      '400': '#10b981',
      '500': '#059669',
      '600': '#047857',
      '700': '#065f46',
      '800': '#064e3b',
      '900': '#022c22',
      '950': '#012a20',
    },
    teal: {
      '25': '#f0fdfa',
      '50': '#ccfbf1',
      '100': '#99f6e4',
      '200': '#5eead4',
      '300': '#2dd4bf',
      '400': '#14b8a6',
      '500': '#0d9488',
      '600': '#0f766e',
      '700': '#115e59',
      '800': '#134e4a',
      '900': '#042f2e',
      '950': '#012827',
    },
    blue: {
      '25': '#eff6ff',
      '50': '#dbeafe',
      '100': '#bfdbfe',
      '200': '#93c5fd',
      '300': '#60a5fa',
      '400': '#3b82f6',
      '500': '#2563eb',
      '600': '#1d4ed8',
      '700': '#1e40af',
      '800': '#1e3a8a',
      '900': '#172554',
      '950': '#0c1a3b',
    },
  },
};

// Convert state palette to hex (now just returns the palette as-is since we're using hex directly)
export function convertStatePaletteToHex(palette: StatePaletteColor): Record<string, string> {
  // Since we're already using hex values, just return the palette directly
  return palette;
}