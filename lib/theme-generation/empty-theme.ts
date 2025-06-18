// Creates an empty Power BI theme structure with only required fields
export function createEmptyTheme(name: string, dataColors: string[]): any {
  return {
    "$schema": "https://raw.githubusercontent.com/microsoft/powerbi-desktop-samples/refs/heads/main/Report%20Theme%20JSON%20Schema/reportThemeSchema-2.139.json",
    "name": name,
    "dataColors": dataColors
  };
}