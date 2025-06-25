import { NextResponse } from 'next/server';

// Cache categories for 7 days
let cachedCategories: Record<string, string[]> | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET() {
  try {
    // Check if we have a valid cache
    if (cachedCategories && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
      return NextResponse.json({ 
        categories: cachedCategories,
        source: 'cache'
      });
    }

    // Fetch categories from lucide.dev
    const response = await fetch(
      'https://lucide.dev/api/categories',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PowerUI-Icons'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories from Lucide');
    }

    const categories = await response.json();
    
    // Update cache
    cachedCategories = categories;
    cacheTime = Date.now();

    return NextResponse.json({ 
      categories,
      source: 'lucide'
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Return empty object on error
    return NextResponse.json({ 
      categories: {},
      source: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}