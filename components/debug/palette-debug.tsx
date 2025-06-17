'use client';

import { useEffect } from 'react';
import { usePaletteStore } from '@/lib/stores/palette-store';

export function PaletteDebug() {
  const store = usePaletteStore();
  
  useEffect(() => {
    console.log('=== Palette Store Debug ===');
    console.log('Color Palettes:', store.colorPalettes);
    console.log('Neutral Palettes:', store.neutralPalettes);
    console.log('Is Loading:', store.isLoading);
    console.log('Error:', store.error);
    console.log('Selected Color Palette ID:', store.selectedColorPaletteId);
    console.log('Selected Neutral Palette ID:', store.selectedNeutralPaletteId);
    console.log('=========================');
  }, [store]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Palette Store Debug</h3>
      <div>Color Palettes: {store.colorPalettes.length}</div>
      <div>Neutral Palettes: {store.neutralPalettes.length}</div>
      <div>Loading: {store.isLoading ? 'Yes' : 'No'}</div>
      <div>Error: {store.error || 'None'}</div>
      <button
        onClick={() => store.loadPalettes()}
        className="mt-2 bg-blue-500 px-2 py-1 rounded"
      >
        Load Palettes
      </button>
    </div>
  );
}