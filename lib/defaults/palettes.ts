/**
 * Default palette constants for fallback and cascade updates
 */

import { ColorPalette, NeutralPalette } from '@/lib/types/unified-palette';

export const AZURE_NEUTRAL_PALETTE: NeutralPalette = {
  id: 'azure-default',
  name: 'Azure',
  colors: [
    "#FFFFFF", // 0 - white
    "#F7F8F8", // 25
    "#F1F3F4", // 50
    "#E4E7E9", // 75
    "#E4E7E9", // 100
    "#C9D0D3", // 200
    "#AEB8BD", // 300
    "#93A1A7", // 400
    "#788991", // 500
    "#606E74", // 600
    "#485257", // 700
    "#30373A", // 800
    "#181B1D", // 900
    "#000000"  // 1000 - black
  ],
  userId: 'system',
  isBuiltIn: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
};

export const DEFAULT_COLOR_PALETTE: ColorPalette = {
  id: 'powerui-default',
  name: 'PowerUI Default',
  description: 'Default PowerUI color palette',
  colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'],
  userId: 'system',
  isBuiltIn: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
};