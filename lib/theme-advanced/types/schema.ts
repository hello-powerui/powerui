// Power BI Theme Schema Types
export interface SchemaProperty {
  type?: string | string[];
  $ref?: string;
  properties?: Record<string, SchemaProperty>;
  items?: SchemaProperty;
  enum?: any[];
  const?: any;
  oneOf?: SchemaProperty[];
  allOf?: SchemaProperty[];
  anyOf?: SchemaProperty[];
  title?: string;
  description?: string;
  default?: any;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  patternProperties?: Record<string, SchemaProperty>;
  additionalProperties?: boolean | SchemaProperty;
  required?: string[];
}

export interface ThemeSchema {
  type: string;
  properties: Record<string, SchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
  description?: string;
}

export interface PowerBITheme {
  $schema?: string;
  name: string;
  visualStyles?: Record<string, any>;
  foreground?: any;
  background?: any;
  dataColors?: string[];
  tableAccent?: any;
  foregroundNeutralSecondary?: any;
  foregroundNeutralTertiary?: any;
  backgroundLight?: any;
  backgroundNeutral?: any;
  [key: string]: any;
}

// Visual state types
export interface VisualState {
  $id: 'default' | 'hover' | 'selected' | 'disabled';
  [key: string]: any;
}

// Color types
export interface SolidColor {
  color: string;
}

export interface ThemeColorReference {
  themeColor: {
    id: number;
    shade: number;
  };
}

export interface GradientStop {
  color: string | ThemeColorReference;
  position: number;
}

export interface LinearGradient {
  linearGradient: {
    startPoint: { x: number; y: number };
    endPoint: { x: number; y: number };
    stops: GradientStop[];
  };
}

export type ColorValue = SolidColor | ThemeColorReference | LinearGradient;

// Fill types
export interface SolidFill {
  solid: SolidColor | ThemeColorReference;
}

export interface GradientFill {
  gradient: LinearGradient;
}

export interface PatternFill {
  pattern: {
    patternKind: string;
    color: string | ThemeColorReference;
  };
}

export type FillValue = SolidFill | GradientFill | PatternFill;

// Common visual properties
export interface CommonVisualProperties {
  background?: FillValue[];
  border?: FillValue[];
  title?: {
    fontColor?: ColorValue[];
    fontSize?: number[];
    fontFamily?: string[];
    bold?: boolean[];
    italic?: boolean[];
    underline?: boolean[];
  }[];
  visualHeader?: any[];
  padding?: number[];
}

// Advanced theme store types
export interface AdvancedThemeData {
  id?: string;
  name: string;
  description?: string;
  theme: PowerBITheme;
  schemaVersion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SchemaValidationError {
  path: string;
  message: string;
  value?: any;
}