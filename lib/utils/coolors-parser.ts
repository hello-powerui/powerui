/**
 * Parse Coolors.co palette URL and extract colors
 * Example: https://coolors.co/palette/780000-c1121f-fdf0d5-003049-669bbc
 */
export function parseCoolorsUrl(url: string): string[] | null {
  try {
    // Handle various Coolors.co URL formats
    const patterns = [
      /coolors\.co\/palette\/([a-fA-F0-9-]+)$/,
      /coolors\.co\/([a-fA-F0-9-]+)$/,
      /coolors\.co\/.*[?&]palette=([a-fA-F0-9-]+)/
    ];

    let colorsString: string | null = null;
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        colorsString = match[1];
        break;
      }
    }

    if (!colorsString) {
      return null;
    }

    // Split by hyphen and validate each color
    const colors = colorsString.split('-')
      .map(color => `#${color.toUpperCase()}`)
      .filter(color => isValidHexColor(color));

    return colors.length > 0 ? colors : null;
  } catch (error) {
    // console.error('Error parsing Coolors URL:', error);
    return null;
  }
}

/**
 * Validate hex color format
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Generate a Coolors.co URL from an array of colors
 */
export function generateCoolorsUrl(colors: string[]): string {
  const colorString = colors
    .map(color => color.replace('#', '').toLowerCase())
    .join('-');
  return `https://coolors.co/palette/${colorString}`;
}