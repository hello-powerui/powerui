// Creates an empty Power BI theme structure with only required fields
export function createEmptyTheme(name: string, dataColors: string[]): any {
  return {
    "$schema": "https://raw.githubusercontent.com/microsoft/powerbi-desktop-samples/refs/heads/main/Report%20Theme%20JSON%20Schema/reportThemeSchema-2.139.json",
    "name": name,
    "dataColors": dataColors,
    // These are the only required colors for a valid Power BI theme
    // We'll use neutral placeholders that will be replaced by token resolution
    "background": "#FFFFFF",
    "backgroundLight": "#F5F5F5", 
    "backgroundNeutral": "#E5E5E5",
    "foreground": "#000000",
    "foregroundNeutralSecondary": "#666666",
    "foregroundNeutralTertiary": "#999999",
    "tableAccent": "#E5E5E5",
    "good": "#10B981",
    "neutral": "#F59E0B", 
    "bad": "#DC2626",
    "maximum": "#DC2626",
    "center": "#F59E0B",
    "minimum": "#10B981",
    "null": "#999999"
  };
}