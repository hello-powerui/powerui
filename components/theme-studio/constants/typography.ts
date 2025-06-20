// Typography constants for theme studio
export const THEME_STUDIO_TYPOGRAPHY = {
  // Main panel headers (e.g., "Theme Foundation", "Visual Styles")
  panelHeader: {
    size: 'text-lg',
    weight: 'font-semibold',
  },
  
  // Section headers (e.g., collapsible sections, property groups)
  sectionHeader: {
    size: 'text-sm',
    weight: 'font-medium',
    weightExpanded: 'font-semibold',
  },
  
  // Form field labels
  label: {
    size: 'text-sm',
    weight: 'font-medium',
  },
  
  // Descriptions and metadata
  description: {
    size: 'text-xs',
    color: 'text-gray-600',
  },
  
  // Small metadata (e.g., change indicators, counts)
  metadata: {
    size: 'text-[10px]',
    color: 'text-gray-500',
  },
  
  // Button text
  button: {
    size: 'text-xs',
    weight: 'font-medium',
  },
} as const;