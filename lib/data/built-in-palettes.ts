export interface BuiltInPalette {
  id: string;
  name: string;
  colors: string[];
  description: string;
  isBuiltIn: boolean;
  userId: string;
}

export const BUILT_IN_COLOR_PALETTES: BuiltInPalette[] = [
  {
    id: 'power-ui',
    name: 'Power UI',
    colors: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Default Power UI color palette with vibrant, modern colors',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#DDA0DD', '#FF8B94', '#B4A7D6'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Bright and energetic colors for dynamic visualizations',
  },
  {
    id: 'pastel',
    name: 'Pastel Dreams',
    colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E8D5FF', '#FFC9DE', '#D4A5A5'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Soft pastel colors for a gentle, calming effect',
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    colors: ['#003F5C', '#2F4B7C', '#665191', '#A05195', '#D45087', '#F95D6A', '#FF7C43', '#FFA600'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Professional palette transitioning from deep blues to warm accents',
  },
  {
    id: 'nature',
    name: 'Natural Earth',
    colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#84A98C', '#52796F', '#354F52'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Earth-inspired tones for organic, natural visualizations',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: ['#780116', '#C32F27', '#D8572A', '#F7B538', '#DB7C26', '#D8B863', '#C17767', '#B55239'],
    isBuiltIn: true,
    userId: 'system',
    description: 'Warm sunset colors from deep reds to golden yellows',
  }
];

export const BUILT_IN_NEUTRAL_PALETTES = [
  {
    id: 'default-neutral',
    name: 'Default Neutral',
    baseColor: '#606060',
    isBuiltIn: true,
    userId: 'system',
    description: 'Standard neutral palette for balanced visualizations',
  },
  {
    id: 'cool-gray',
    name: 'Cool Gray',
    baseColor: '#6B7280',
    isBuiltIn: true,
    userId: 'system',
    description: 'Modern cool gray tones',
  },
  {
    id: 'warm-gray',
    name: 'Warm Gray',
    baseColor: '#78716C',
    isBuiltIn: true,
    userId: 'system',
    description: 'Soft warm gray tones',
  },
  {
    id: 'blue-gray',
    name: 'Blue Gray',
    baseColor: '#64748B',
    isBuiltIn: true,
    userId: 'system',
    description: 'Professional blue-tinted grays',
  },
];