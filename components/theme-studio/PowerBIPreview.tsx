'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Power BI component with no SSR
const SimplePowerBIEmbed = dynamic(
  () => import('./SimplePowerBIEmbed'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading Power BI preview...</p>
        </div>
      </div>
    )
  }
);

interface PowerBIPreviewProps {
  generatedTheme?: any;
  selectedVisualType?: string;
}

export function PowerBIPreview({ generatedTheme, selectedVisualType = '*' }: PowerBIPreviewProps) {
  return <SimplePowerBIEmbed generatedTheme={generatedTheme} />;
}