import { useEffect, useState } from 'react';
import { useThemeDataStore } from '@/lib/stores/theme-data-store';
import { useFoundationStore } from '@/lib/stores/foundation-store';
import { useThemeVisualStore } from '@/lib/stores/theme-visual-store';
import { useThemeExportStore } from '@/lib/stores/theme-export-store';

interface Theme {
  id: string;
  name: string;
  description?: string;
  theme: any;
}

export function useThemeLoader(themeId: string | null) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  const { setThemeData } = useThemeDataStore();
  const { 
    setThemeName, 
    setDescription, 
    setDataColors, 
    setNeutralColors,
    setTextClasses 
  } = useFoundationStore();
  const { setVariantsFromTheme } = useThemeVisualStore();
  const { setOriginalTheme } = useThemeExportStore();

  useEffect(() => {
    if (!themeId) {
      setIsLoading(false);
      return;
    }

    const loadTheme = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/themes/${themeId}`);
        if (!response.ok) {
          throw new Error('Failed to load theme');
        }

        const result = await response.json();
        // Handle the API response structure { data: theme }
        const loadedTheme = result.data || result;
        setTheme(loadedTheme);

        // Initialize stores with theme data
        setThemeData(loadedTheme.theme);
        setThemeName(loadedTheme.name);
        setDescription(loadedTheme.description || '');
        setOriginalTheme(loadedTheme.theme);

        // Extract and set foundation data
        if (loadedTheme.theme?.general?.palette?.dataColors) {
          const colors = loadedTheme.theme.general.palette.dataColors;
          const colorArray = Array.isArray(colors) 
            ? colors 
            : Object.values(colors).filter((v): v is string => typeof v === 'string');
          setDataColors(colorArray);
        }

        if (loadedTheme.theme?.general?.palette?.neutralColors) {
          setNeutralColors(loadedTheme.theme.general.palette.neutralColors);
        }

        if (loadedTheme.theme?.general?.textClasses) {
          setTextClasses(loadedTheme.theme.general.textClasses);
        }

        // Initialize visual variants
        if (loadedTheme.theme?.visualTypes) {
          setVariantsFromTheme(loadedTheme.theme.visualTypes);
        }

      } catch (err) {
        console.error('Error loading theme:', err);
        setError(err instanceof Error ? err.message : 'Failed to load theme');
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [themeId, setThemeData, setThemeName, setDescription, setDataColors, 
      setNeutralColors, setTextClasses, setVariantsFromTheme, setOriginalTheme]);

  return { isLoading, error, theme };
}