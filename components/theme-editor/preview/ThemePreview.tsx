'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import with no SSR to avoid server-side rendering errors
const SimplePowerBIEmbed = dynamic(
  () => import('./PowerBIEmbed'),
  { 
    ssr: false
  }
);

interface PowerBIPreviewProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onExitFocusMode?: () => void;
  onVariantChange?: (variant: string) => void;
}

export function ThemePreview({
  generatedTheme,
  selectedVisualType,
  selectedVariant,
  onExitFocusMode,
  onVariantChange
}: PowerBIPreviewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <SimplePowerBIEmbed
      generatedTheme={generatedTheme}
      selectedVisualType={selectedVisualType}
      selectedVariant={selectedVariant}
      onExitFocusMode={onExitFocusMode}
      onVariantChange={onVariantChange}
    />
  );
}

// Also export as default for backward compatibility
export default ThemePreview;