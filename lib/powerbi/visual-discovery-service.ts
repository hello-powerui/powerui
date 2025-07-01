import { Report } from 'powerbi-client';
import { getAllVisualsPage, getPowerBIVisualTypes } from './visual-embed-utils';

export interface DiscoveredVisual {
  name: string;
  type: string;
  title: string;
  pageName: string;
}

export class VisualDiscoveryService {
  private static instance: VisualDiscoveryService;
  private cachedVisuals: Map<string, DiscoveredVisual[]> = new Map();

  private constructor() {}

  static getInstance(): VisualDiscoveryService {
    if (!VisualDiscoveryService.instance) {
      VisualDiscoveryService.instance = new VisualDiscoveryService();
    }
    return VisualDiscoveryService.instance;
  }

  /**
   * Discover all visuals on the AllVisuals page
   */
  async discoverAllVisuals(report: Report): Promise<DiscoveredVisual[]> {
    const pageKey = getAllVisualsPage();
    
    // Return cached results if available
    if (this.cachedVisuals.has(pageKey)) {
      return this.cachedVisuals.get(pageKey)!;
    }

    try {
      const pages = await report.getPages();
      const allVisualsPage = pages.find(p => p.name === getAllVisualsPage());
      
      if (!allVisualsPage) {
        console.error(`Page '${getAllVisualsPage()}' not found in report`);
        return [];
      }

      const pageVisuals = await allVisualsPage.getVisuals();
      
      const discoveredVisuals: DiscoveredVisual[] = pageVisuals.map((visual: any) => ({
        name: visual.name,
        type: visual.type,
        title: visual.title || visual.name,
        pageName: getAllVisualsPage()
      }));

      // Cache the results
      this.cachedVisuals.set(pageKey, discoveredVisuals);
      
      console.log('Discovered visuals:', discoveredVisuals);
      return discoveredVisuals;
    } catch (error) {
      console.error('Error discovering visuals:', error);
      return [];
    }
  }

  /**
   * Find a specific visual by theme visual type
   */
  async findVisualByType(report: Report, visualType: string): Promise<DiscoveredVisual | null> {
    const allVisuals = await this.discoverAllVisuals(report);
    const targetTypes = getPowerBIVisualTypes(visualType);
    
    if (!targetTypes || targetTypes.length === 0) {
      console.error(`Visual type '${visualType}' not found in mapping`);
      return null;
    }

    // Find the first visual that matches any of the target types
    const matchingVisual = allVisuals.find(visual => 
      targetTypes.includes(visual.type)
    );

    if (matchingVisual) {
      console.log(`Found visual for type '${visualType}':`, matchingVisual);
      return matchingVisual;
    }

    console.error(`No visual found for type '${visualType}' on page '${getAllVisualsPage()}'`);
    console.error(`Available visual types:`, allVisuals.map(v => v.type));
    return null;
  }

  /**
   * Clear the cache (useful when report changes)
   */
  clearCache(): void {
    this.cachedVisuals.clear();
  }

  /**
   * Get all available visual types on the AllVisuals page
   */
  async getAvailableVisualTypes(report: Report): Promise<string[]> {
    const allVisuals = await this.discoverAllVisuals(report);
    return Array.from(new Set(allVisuals.map(v => v.type)));
  }
}