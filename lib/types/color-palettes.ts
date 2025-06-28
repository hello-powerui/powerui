export interface ColorPalettes {
  neutral: Record<string, string> | null;
  brand: Record<string, string> | null;
  success: Record<string, string> | null;
  warning: Record<string, string> | null;
  error: Record<string, string> | null;
  dataColors: string[];
}