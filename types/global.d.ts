import { Report, models } from 'powerbi-client';

declare global {
  interface Window {
    powerbi?: {
      preloadResource?: (resourceType: string) => void;
      preload?: (config: { type: string; embedUrl: string }) => void;
      embed?: (element: HTMLElement, config: any) => any;
      models?: typeof models;
      visuals?: any;
    };
    report?: Report;
  }
}

export {};