// Core schema types
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
  additionalProperties?: boolean | SchemaProperty;
  required?: string[];
}

// Processed schema types
export interface PropertyMetadata {
  id: string;
  path: string;
  title: string;
  description?: string;
  type: string | string[];
  category: PropertyCategory;
  visuals: string[];
  constraints?: PropertyConstraints;
  examples?: any[];
  relatedProperties?: string[];
  depth: number;
  isStateEnabled?: boolean;
  defaultValue?: any;
}

export interface PropertyConstraints {
  minimum?: number;
  maximum?: number;
  enum?: any[];
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  required?: boolean;
}

export enum PropertyCategory {
  Color = 'color',
  Typography = 'typography',
  Spacing = 'spacing',
  Border = 'border',
  Layout = 'layout',
  Data = 'data',
  Interaction = 'interaction',
  Visual = 'visual',
  Effect = 'effect',
  Other = 'other'
}

export interface VisualMetadata {
  type: string;
  title: string;
  description?: string;
  propertyCount: number;
  maxDepth: number;
  categories: Record<PropertyCategory, string[]>;
  inheritance: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  hasStates: boolean;
  commonProperties: string[];
  specificProperties: string[];
}

export interface ProcessedSchema {
  version: string;
  processedAt: Date;
  properties: Map<string, PropertyMetadata>;
  visuals: Map<string, VisualMetadata>;
  searchIndex: SearchIndex;
  relationships: SchemaRelationships;
  stats: SchemaStats;
}

export interface SearchIndex {
  byTitle: Map<string, Set<string>>;
  byType: Map<string, Set<string>>;
  byCategory: Map<PropertyCategory, Set<string>>;
  byVisual: Map<string, Set<string>>;
  fullTextIndex: any; // Fuse.js index
}

export interface SchemaRelationships {
  commonProperties: Map<string, Set<string>>;
  inheritance: Map<string, string[]>;
  propertyGroups: Map<string, string[]>;
  stateProperties: Map<string, string[]>;
}

export interface SchemaStats {
  totalProperties: number;
  totalVisuals: number;
  maxDepth: number;
  totalDefinitions: number;
  averagePropertiesPerVisual: number;
  mostCommonProperties: Array<{ property: string; count: number }>;
}

// Query types
export interface PropertyQuery {
  text?: string;
  type?: string | string[];
  category?: PropertyCategory | PropertyCategory[];
  visual?: string | string[];
  hasStates?: boolean;
  maxDepth?: number;
  limit?: number;
  offset?: number;
}

export interface VisualQuery {
  type?: string;
  complexity?: 'simple' | 'moderate' | 'complex';
  hasStates?: boolean;
  minProperties?: number;
  maxProperties?: number;
}

// AI-friendly types
export interface NaturalLanguageQuery {
  query: string;
  context?: {
    currentVisual?: string;
    currentProperty?: string;
    previousQueries?: string[];
  };
}

export interface ThemeGenerationRequest {
  description: string;
  baseTheme?: 'light' | 'dark' | 'colorful' | 'minimal';
  visuals?: string[];
  constraints?: {
    colors?: string[];
    fonts?: string[];
    allowGradients?: boolean;
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: SchemaSuggestion[];
}

export interface ValidationError {
  path: string;
  message: string;
  expected: any;
  actual: any;
}

export interface ValidationWarning {
  path: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SchemaSuggestion {
  path: string;
  message: string;
  suggestedValue: any;
  confidence: number;
}