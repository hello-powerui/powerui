import { ThemeGenerationInput } from './types';

/**
 * Client-side function to generate a theme by calling the API
 */
export async function generateTheme(input: ThemeGenerationInput): Promise<any> {
  const response = await fetch('/api/generate-theme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate theme');
  }

  return response.json();
}