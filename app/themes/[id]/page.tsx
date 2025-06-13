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
        // Navigate directly to studio with theme ID - let studio handle loading
        router.push(`/themes/studio?themeId=${id}`);
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