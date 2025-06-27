// Export all custom visual components
export { ActionButtonVisual } from './ActionButtonVisual';

// Map of visual types to their custom components
export const customVisualComponents: Record<string, any> = {
  actionButton: require('./ActionButtonVisual').ActionButtonVisual,
};