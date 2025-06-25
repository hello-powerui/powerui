import { NextResponse } from 'next/server';

// Cache all icons for 7 days
let cachedIcons: Record<string, string> | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET() {
  try {
    // Check if we have a valid cache
    if (cachedIcons && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
      return NextResponse.json({ 
        icons: cachedIcons,
        count: Object.keys(cachedIcons).length,
        source: 'cache'
      });
    }

    // Fetch all icon data from lucide.dev
    const response = await fetch(
      'https://lucide.dev/api/icon-nodes',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PowerUI-Icons'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch icons from Lucide');
    }

    const iconData = await response.json();
    
    // Transform the icon data to include full SVGs
    const icons: Record<string, string> = {};
    
    for (const [name, data] of Object.entries(iconData)) {
      // Create SVG string with the path data
      const svgData = data as any;
      const paths = Array.isArray(svgData) ? svgData : [svgData];
      
      const pathElements = paths.map((element: any) => {
        // Each element is an array like ["path", {d: "..."}] or ["circle", {cx: "...", cy: "...", r: "..."}]
        if (Array.isArray(element) && element.length === 2) {
          const [tag, attrs] = element;
          const attrString = Object.entries(attrs)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
          return `<${tag} ${attrString} />`;
        }
        return '';
      }).join('');
      
      icons[name] = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathElements}</svg>`;
    }

    // Update cache
    cachedIcons = icons;
    cacheTime = Date.now();

    return NextResponse.json({ 
      icons,
      count: Object.keys(icons).length,
      source: 'lucide'
    });
  } catch (error) {
    console.error('Error fetching all icons:', error);
    
    // Return empty object on error
    return NextResponse.json({ 
      icons: {},
      count: 0,
      source: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}