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

  const { loadTheme: setThemeData } = useThemeDataStore();
  const { 
    setThemeName, 
    setDescription, 
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
        console.log('Loaded theme from API:', JSON.stringify(loadedTheme, null, 2));
        setTheme(loadedTheme);

        // Initialize stores with theme data
        const themeData = loadedTheme.themeData || loadedTheme.theme;
        console.log('Theme data to set:', JSON.stringify(themeData, null, 2));
        
        // The loadTheme function expects a StudioThemeData object
        setThemeData({
          id: loadedTheme.id,
          name: loadedTheme.name,
          description: loadedTheme.description,
          theme: themeData,
          schemaVersion: '2.143'
        });
        
        setThemeName(loadedTheme.name);
        setDescription(loadedTheme.description || '');
        setOriginalTheme(themeData);

        // Don't set palettes here - let the main page handle palette loading
        // The main page has logic to load palettes by ID and handle fallbacks properly
        
        // Just log what we found for debugging
        if (themeData?.general?.palette?.dataColors) {
          console.log('Found data colors in theme:', themeData.general.palette.dataColors);
        }
        if (themeData?.general?.palette?.neutralColors) {
          console.log('Found neutral colors in theme:', themeData.general.palette.neutralColors);
        }

        if (themeData?.general?.textClasses) {
          setTextClasses(themeData.general.textClasses);
        }

        // Initialize visual variants
        if (themeData?.visualTypes) {
          setVariantsFromTheme(themeData.visualTypes);
        }

      } catch (err) {
        console.error('Error loading theme:', err);
        setError(err instanceof Error ? err.message : 'Failed to load theme');
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [themeId, setThemeData, setThemeName, setDescription, 
      setTextClasses, setVariantsFromTheme, setOriginalTheme]);

  return { isLoading, error, theme };
}