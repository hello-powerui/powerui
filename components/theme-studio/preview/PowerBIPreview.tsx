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

const VisualPowerBIEmbed = dynamic(
  () => import('./VisualPowerBIEmbed'),
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
  visualWidth?: number;
  visualHeight?: number;
}

export function PowerBIPreview({ 
  generatedTheme, 
  selectedVisualType = '*',
  selectedVariant = '*',
  onExitFocusMode,
  onVariantChange,
  onReportReset,
  enterFocusMode,
  useVisualEmbedding = false,
  visualWidth = 800,
  visualHeight = 600
}: PowerBIPreviewProps) {
  // Convert empty string to '*' for consistency with focus mode logic
  const normalizedVisualType = selectedVisualType || '*';
  
  // Use visual embedding if enabled and a specific visual type is selected
  if (useVisualEmbedding && normalizedVisualType !== '*') {
    return (
      <VisualPowerBIEmbed 
        generatedTheme={generatedTheme} 
        selectedVisualType={normalizedVisualType}
        selectedVariant={selectedVariant}
        onReportReset={onReportReset}
        width={visualWidth}
        height={visualHeight}
      />
    );
  }
  
  // Fall back to full report embedding with focus mode
  return (
    <SimplePowerBIEmbed 
      generatedTheme={generatedTheme} 
      selectedVisualType={normalizedVisualType}
      selectedVariant={selectedVariant}
      onExitFocusMode={onExitFocusMode}
      onVariantChange={onVariantChange}
      onReportReset={onReportReset}
      enterFocusMode={enterFocusMode}
    />
  );
}