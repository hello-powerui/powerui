import { 
  ProcessedSchema, 
  PropertyMetadata, 
  PropertyQuery, 
  VisualMetadata,
  VisualQuery,
  NaturalLanguageQuery,
  PropertyCategory
} from '../types/schema.types.js';
import { LRUCache } from 'lru-cache';
import { findRelatedProperties } from '../utils/property-utils.js';

export class SchemaQueryAPI {
  private schema: ProcessedSchema;
  private cache: LRUCache<string, any>;

  constructor(processedSchema: ProcessedSchema) {
    this.schema = processedSchema;
    this.cache = new LRUCache<string, any>({
      max: 1000,
      ttl: 1000 * 60 * 5 // 5 minutes
    });
  }

  // Get property by ID
  getPropertyById(id: string): PropertyMetadata | null {
    return this.schema.properties.get(id) || null;
  }

  // Get property by path
  getPropertyByPath(path: string): PropertyMetadata | null {
    for (const [id, prop] of this.schema.properties) {
      if (prop.path === path) {
        return prop;
      }
    }
    return null;
  }

  // Search properties
  searchProperties(query: PropertyQuery): PropertyMetadata[] {
    const cacheKey = JSON.stringify(query);
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    let results = Array.from(this.schema.properties.values());

    // Filter by text search
    if (query.text) {
      const searchResults = this.schema.searchIndex.fullTextIndex.search(query.text);
      const matchingIds = new Set(searchResults.map(r => r.item.id));
      results = results.filter(p => matchingIds.has(p.id));
    }

    // Filter by type
    if (query.type) {
      const types = Array.isArray(query.type) ? query.type : [query.type];
      results = results.filter(p => {
        const propTypes = Array.isArray(p.type) ? p.type : [p.type];
        return types.some(t => propTypes.includes(t));
      });
    }

    // Filter by category
    if (query.category) {
      const categories = Array.isArray(query.category) ? query.category : [query.category];
      results = results.filter(p => categories.includes(p.category));
    }

    // Filter by visual
    if (query.visual) {
      const visuals = Array.isArray(query.visual) ? query.visual : [query.visual];
      results = results.filter(p => 
        p.visuals.some(v => visuals.includes(v))
      );
    }

    // Filter by state support
    if (query.hasStates !== undefined) {
      results = results.filter(p => p.isStateEnabled === query.hasStates);
    }

    // Filter by depth
    if (query.maxDepth !== undefined) {
      results = results.filter(p => p.depth <= query.maxDepth);
    }

    // Apply pagination
    const limit = query.limit || 100;
    const offset = query.offset || 0;
    results = results.slice(offset, offset + limit);

    this.cache.set(cacheKey, results);
    return results;
  }

  // Get visual metadata
  getVisual(type: string): VisualMetadata | null {
    return this.schema.visuals.get(type) || null;
  }

  // Search visuals
  searchVisuals(query: VisualQuery): VisualMetadata[] {
    let results = Array.from(this.schema.visuals.values());

    if (query.type) {
      results = results.filter(v => v.type === query.type);
    }

    if (query.complexity) {
      results = results.filter(v => v.complexity === query.complexity);
    }

    if (query.hasStates !== undefined) {
      results = results.filter(v => v.hasStates === query.hasStates);
    }

    if (query.minProperties !== undefined) {
      results = results.filter(v => v.propertyCount >= query.minProperties);
    }

    if (query.maxProperties !== undefined) {
      results = results.filter(v => v.propertyCount <= query.maxProperties);
    }

    return results;
  }

  // Get visual structure with categories
  getVisualStructure(visualType: string): {
    visual: VisualMetadata;
    properties: Map<PropertyCategory, PropertyMetadata[]>;
  } | null {
    const visual = this.getVisual(visualType);
    if (!visual) return null;

    const properties = new Map<PropertyCategory, PropertyMetadata[]>();

    // Group properties by category
    Object.entries(visual.categories).forEach(([category, propIds]) => {
      const props = propIds
        .map(id => this.getPropertyById(id))
        .filter(p => p !== null) as PropertyMetadata[];
      
      if (props.length > 0) {
        properties.set(category as PropertyCategory, props);
      }
    });

    return { visual, properties };
  }

  // Get related properties
  getRelatedProperties(propertyId: string, limit: number = 5): PropertyMetadata[] {
    const relatedIds = findRelatedProperties(propertyId, this.schema.properties, limit);
    return relatedIds
      .map(id => this.getPropertyById(id))
      .filter(p => p !== null) as PropertyMetadata[];
  }

  // Get common properties across visuals
  getCommonProperties(visuals?: string[]): PropertyMetadata[] {
    const targetVisuals = visuals || Array.from(this.schema.visuals.keys());
    
    return Array.from(this.schema.properties.values())
      .filter(prop => {
        if (targetVisuals.length === 0) return false;
        
        // Property must exist in all target visuals
        return targetVisuals.every(visual => prop.visuals.includes(visual));
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  // Natural language query
  queryByNaturalLanguage(query: NaturalLanguageQuery): {
    properties: PropertyMetadata[];
    suggestions: string[];
    confidence: number;
  } {
    const { query: text, context } = query;
    
    // Extract key terms
    const colorTerms = /color|colour|fill|background|foreground/i;
    const fontTerms = /font|text|typography|size/i;
    const spacingTerms = /padding|margin|spacing|gap/i;
    const visualTerms = new RegExp(`(${Array.from(this.schema.visuals.keys()).join('|')})`, 'i');

    let searchQuery: PropertyQuery = {};

    // Detect categories
    if (colorTerms.test(text)) {
      searchQuery.category = PropertyCategory.Color;
    } else if (fontTerms.test(text)) {
      searchQuery.category = PropertyCategory.Typography;
    } else if (spacingTerms.test(text)) {
      searchQuery.category = PropertyCategory.Spacing;
    }

    // Detect visual type
    const visualMatch = text.match(visualTerms);
    if (visualMatch) {
      searchQuery.visual = visualMatch[1].toLowerCase();
    } else if (context?.currentVisual) {
      searchQuery.visual = context.currentVisual;
    }

    // Perform search
    const properties = this.searchProperties({
      ...searchQuery,
      text: text,
      limit: 10
    });

    // Generate suggestions
    const suggestions = this.generateSuggestions(text, properties);

    // Calculate confidence
    const confidence = properties.length > 0 ? 
      Math.min(1, properties.length / 5) : 0;

    return { properties, suggestions, confidence };
  }

  // Get property examples
  getPropertyExamples(propertyId: string): any[] {
    const property = this.getPropertyById(propertyId);
    if (!property) return [];

    // Generate examples based on property type and constraints
    const examples: any[] = [];

    if (property.constraints?.enum) {
      examples.push(...property.constraints.enum);
    } else if (property.type === 'string') {
      if (property.category === PropertyCategory.Color) {
        examples.push('#FF0000', '#00FF00', '#0000FF', 'rgba(255,0,0,0.5)');
      } else if (property.path.includes('fontFamily')) {
        examples.push('Segoe UI', 'Arial', 'Helvetica', 'Times New Roman');
      }
    } else if (property.type === 'number' || property.type === 'integer') {
      const min = property.constraints?.minimum || 0;
      const max = property.constraints?.maximum || 100;
      examples.push(min, Math.floor((min + max) / 2), max);
    } else if (property.type === 'boolean') {
      examples.push(true, false);
    }

    return examples.slice(0, 5);
  }

  // Get schema statistics
  getStats(): ProcessedSchema['stats'] {
    return this.schema.stats;
  }

  // Private helper methods
  private generateSuggestions(query: string, results: PropertyMetadata[]): string[] {
    const suggestions: string[] = [];

    if (results.length === 0) {
      suggestions.push('Try searching for: color, font, padding, border');
      suggestions.push('Specify a visual type: card, chart, slicer');
    } else if (results.length > 20) {
      suggestions.push('Try being more specific');
      suggestions.push(`Add a visual type: ${Array.from(this.schema.visuals.keys()).slice(0, 5).join(', ')}`);
    }

    // Suggest related properties
    if (results.length > 0 && results.length < 5) {
      const related = this.getRelatedProperties(results[0].id, 3);
      if (related.length > 0) {
        suggestions.push(`Related: ${related.map(p => p.title).join(', ')}`);
      }
    }

    return suggestions;
  }
}