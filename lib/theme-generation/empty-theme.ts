// Creates an empty Power BI theme structure with only required fields
export function createEmptyTheme(name: string, dataColors: string[]): any {
  return {
    "name": name,
    "dataColors": dataColors
  };
}