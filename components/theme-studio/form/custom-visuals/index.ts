// Export all custom visual components
export { ActionButtonVisual } from './ActionButtonVisual';
export { PageSettingsVisual } from './PageSettingsVisual';

// Map of visual types to their custom components
export const customVisualComponents: Record<string, any> = {
  actionButton: require('./ActionButtonVisual').ActionButtonVisual,
  page: require('./PageSettingsVisual').PageSettingsVisual,
};