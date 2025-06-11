'use client';

import { useEffect, useState } from 'react';

interface PowerBIPreviewProps {
  generatedTheme?: any;
  selectedVisualType?: string;
}

export function PowerBIPreview({ generatedTheme, selectedVisualType = '*' }: PowerBIPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading Power BI preview...</p>
        </div>
      </div>
    );
  }

  // Only import and render the actual PowerBI component on client side
  const SimplePowerBIEmbed = require('./SimplePowerBIEmbed').default;
  return <SimplePowerBIEmbed generatedTheme={generatedTheme} />;
}