'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/use-user';
import { AZURE_NEUTRAL_PALETTE, DEFAULT_COLOR_PALETTE } from '@/lib/defaults/palettes';

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const loadTheme = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        router.push('/');
        return;
      }

      try {
        // Fetch theme data
        const response = await fetch(`/api/themes/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/themes');
            return;
          }
          throw new Error('Failed to load theme');
        }

        const theme = await response.json();
        
        // If theme has themeData, use that for loading in builder
        const themeData = theme.themeData || {
          name: theme.name,
          // Fix for custom palettes - use stored colors if dataPalette is 'custom'
          dataColors: theme.dataPalette === 'custom' 
            ? (theme.themeData?.dataColors || DEFAULT_COLOR_PALETTE.colors)
            : theme.dataPalette,
          neutralPalette: theme.neutralPalette === 'custom' 
            ? (theme.themeData?.neutralPalette || AZURE_NEUTRAL_PALETTE)
            : theme.neutralPalette,
          mode: theme.colorMode,
          fontFamily: theme.fontFamily,
          fontSize: 14, // Default if not stored
          borderRadius: parseInt(theme.borders),
          bgStyle: theme.bgStyle,
          borderStyle: theme.borderStyle,
          paddingStyle: theme.paddingStyle,
          showBorders: theme.showBorders,
          spacing: 'default', // Default if not stored
          description: theme.description, // Include description
        };

        // Encode theme data in URL params
        const queryParams = new URLSearchParams({
          id: theme.id,
          data: encodeURIComponent(JSON.stringify(themeData)),
          name: encodeURIComponent(theme.name || 'My Theme'),
          description: encodeURIComponent(theme.description || ''),
        });

        // Navigate to builder with theme data
        router.push(`/themes/studio?${queryParams.toString()}`);
      } catch (error) {
        console.error('Error loading theme:', error);
        router.push('/themes');
      }
    };

    loadTheme();
  }, [id, user, isLoaded, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-sm text-gray-600">Loading theme...</p>
      </div>
    </div>
  );
}