export interface StructuralColors {
  firstLevelElements?: string;
  secondLevelElements?: string;
  thirdLevelElements?: string;
  fourthLevelElements?: string;
  background?: string;
  secondaryBackground?: string;
  tableAccent?: string;
}

export interface TextClass {
  fontFace?: string;
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
}

export interface TextClasses {
  callout?: TextClass;
  header?: TextClass;
  title?: TextClass;
  largeTitle?: TextClass;
  label?: TextClass;
  semiboldLabel?: TextClass;
  largeLabel?: TextClass;
  smallLabel?: TextClass;
  lightLabel?: TextClass;
  boldLabel?: TextClass;
  largeLightLabel?: TextClass;
  smallLightLabel?: TextClass;
}

export interface ThemeGenerationInput {
  mode: 'light' | 'dark';
  neutralPalette: string | Record<string, string> | string[]; // Support array format
  fontFamily: string;
  dataColors: string[];
  name: string;
  
  // Extended typography
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  lineHeight?: number;
  
  // Extended colors (using Power BI fill definitions)
  background?: FillDefinition;
  foreground?: FillDefinition;
  border?: FillDefinition;
  
  // Spacing
  padding?: Spacing;
  spacing?: number;
  
  // Shadow
  shadow?: ShadowDefinition;
  
  // Visual-specific overrides
  visualStyles?: VisualStyleOverrides;
  
  // Structural colors
  structuralColors?: StructuralColors;
  
  // Text classes
  textClasses?: TextClasses;
}

export interface FillDefinition {
  solid?: {
    color: string;
  };
}

export interface Spacing {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface ShadowDefinition {
  color?: string;
  blur?: number;
  distance?: number;
  angle?: number;
  transparency?: number;
}

export interface VisualStyle {
  background?: FillDefinition;
  foreground?: FillDefinition;
  border?: FillDefinition;
  borderWidth?: number;
  borderRadius?: number;
  padding?: Spacing;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

export interface VisualStyleOverrides {
  card?: Partial<VisualStyle>;
  slicer?: Partial<VisualStyle>;
  textbox?: Partial<VisualStyle>;
  shape?: Partial<VisualStyle>;
  tableEx?: Partial<VisualStyle>;
  pivotTable?: Partial<VisualStyle>;
  multiRowCard?: Partial<VisualStyle>;
  kpi?: Partial<VisualStyle>;
  gauge?: Partial<VisualStyle>;
  [visualType: string]: Partial<VisualStyle> | undefined;
}

export interface ColorPalette {
  [shade: string]: string;
}

export interface Palettes {
  base: ColorPalette;
  error: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  [key: string]: ColorPalette;
}

export interface ElementMappings {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface FontSizes {
  [key: string]: number;
}

export interface Fonts {
  [family: string]: {
    [style: string]: string;
  };
}

export interface StyleConfig {
  styles: Record<string, string[]>;
}

export interface Styles {
  containerStyles: Record<string, StyleConfig>;
  borderStyles: Record<string, StyleConfig>;
  paddingStyles: Record<string, StyleConfig>;
}

export interface Icons {
  light: any;
  dark: any;
}

export interface ThemeConfigs {
  theme: any;
  elements: ElementMappings;
  palettes: Palettes;
  fonts: Fonts;
  font_sizes: FontSizes;
  styles: Styles;
  icons?: Icons;
}

export interface NeutralPaletteGenerationInput {
  hexColor: string;
}

export interface NeutralPaletteResponse {
  name: string;
  palette: ColorPalette;
}