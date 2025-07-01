'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Power BI components with no SSR
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

const DirectVisualEmbed = dynamic(
  () => import('./DirectVisualEmbed'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading Power BI visual...</p>
        </div>
      </div>
    )
  }
);

interface PowerBIPreviewProps {
  generatedTheme?: any;
  selectedVisualType?: string;
  selectedVariant?: string;
  onExitFocusMode?: () => void;
  onVariantChange?: (variant: string) => void;
  onReportReset?: (resetFn: () => void) => void;
  enterFocusMode?: boolean;
  useVisualEmbedding?: boolean;
}

export function PowerBIPreview({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onExitFocusMode,
  onVariantChange,
  onReportReset,
  enterFocusMode,
  useVisualEmbedding = false
}: PowerBIPreviewProps) {
  // Convert empty string to '*' for consistency with focus mode logic
  const normalizedVisualType = selectedVisualType || '*';
  
  // Use visual embedding when in focus mode with a specific visual type
  if (useVisualEmbedding && enterFocusMode && normalizedVisualType !== '*') {
    return (
      <DirectVisualEmbed 
        generatedTheme={generatedTheme} 
        selectedVisualType={normalizedVisualType}
        selectedVariant={selectedVariant}
        onReportReset={onReportReset}
        onExitFocusMode={onExitFocusMode}
      />
    );
  }
  
  // Default: show full report (Home page)
  return (
    <SimplePowerBIEmbed 
      generatedTheme={generatedTheme} 
      selectedVisualType={normalizedVisualType}
      selectedVariant={selectedVariant}
      onExitFocusMode={onExitFocusMode}
      onVariantChange={onVariantChange}
      onReportReset={onReportReset}
      enterFocusMode={false} // Never use old focus mode
    />
  );
}