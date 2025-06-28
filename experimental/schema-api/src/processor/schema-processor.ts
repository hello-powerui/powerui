import fs from 'fs/promises';
import path from 'path';
import { 
  SchemaProperty, 
  PropertyMetadata, 
  ProcessedSchema, 
  PropertyCategory,
  VisualMetadata,
  SearchIndex,
  SchemaRelationships,
  SchemaStats
} from '../types/schema.types.js';
import { categorizeProperty, generatePropertyId } from '../utils/property-utils.js';
import Fuse from 'fuse.js';

export class SchemaProcessor {
  private schema: any;
  private properties: Map<string, PropertyMetadata> = new Map();
  private visuals: Map<string, VisualMetadata> = new Map();
  private pathToId: Map<string, string> = new Map();
  private resolvedRefs: Set<string> = new Set();

  async processSchema(schemaPath: string): Promise<ProcessedSchema> {
    console.log('Loading schema from:', schemaPath);
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    this.schema = JSON.parse(schemaContent);

    console.log('Processing schema...');
    
    // Extract all properties
    this.extractProperties();
    
    // Process visual types
    this.processVisuals();
    
    // Build search indices
    const searchIndex = this.buildSearchIndex();
    
    // Analyze relationships
    const relationships = this.analyzeRelationships();
    
    // Calculate statistics
    const stats = this.calculateStats();

    const processed: ProcessedSchema = {
      version: this.schema.description || '2.143',
      processedAt: new Date(),
      properties: this.properties,
      visuals: this.visuals,
      searchIndex,
      relationships,
      stats
    };

    console.log(`Processing complete. Found ${this.properties.size} properties and ${this.visuals.size} visuals.`);
    
    return processed;
  }

  private extractProperties(): void {
    // Process top-level properties
    if (this.schema.properties) {
      Object.entries(this.schema.properties).forEach(([key, value]) => {
        this.processProperty(key, value as SchemaProperty, [key], 0);
      });
    }

    // Process definitions
    if (this.schema.definitions) {
      Object.entries(this.schema.definitions).forEach(([key, value]) => {
        this.processProperty(key, value as SchemaProperty, ['definitions', key], 0);
      });
    }
  }

  private processProperty(
    name: string, 
    schema: SchemaProperty, 
    path: string[], 
    depth: number,
    parentVisuals: Set<string> = new Set()
  ): void {
    const pathStr = path.join('.');
    
    // Skip if already processed or too deep
    if (this.pathToId.has(pathStr) || depth > 10) {
      return;
    }

    // Handle $ref resolution first
    if (schema.$ref) {
      // Check for circular reference
      const refKey = `${pathStr}:${schema.$ref}`;
      if (this.resolvedRefs.has(refKey)) {
        return; // Skip circular references
      }
      this.resolvedRefs.add(refKey);
      
      const resolved = this.resolveRef(schema.$ref);
      if (resolved) {
        // Merge the resolved schema with any local overrides
        schema = { ...resolved, ...schema, $ref: undefined };
      }
    }

    // Generate unique ID
    const id = generatePropertyId(pathStr);
    this.pathToId.set(pathStr, id);

    // Determine which visuals this property belongs to
    const visuals = new Set(parentVisuals);
    if (path[0] === 'visualStyles' && path[1] === 'properties' && path[2]) {
      visuals.add(path[2]);
    }

    // Create metadata
    const metadata: PropertyMetadata = {
      id,
      path: pathStr,
      title: schema.title || this.formatPropertyName(name),
      description: schema.description,
      type: schema.type || 'unknown',
      category: categorizeProperty(name, pathStr),
      visuals: Array.from(visuals),
      depth,
      constraints: this.extractConstraints(schema),
      defaultValue: schema.default,
      isStateEnabled: this.checkStateEnabled(schema)
    };

    this.properties.set(id, metadata);

    // Process nested properties
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([key, value]) => {
        this.processProperty(key, value as SchemaProperty, [...path, key], depth + 1, visuals);
      });
    }

    // Process array items
    if (schema.items) {
      this.processProperty('items', schema.items, [...path, 'items'], depth + 1, visuals);
    }

    // Process allOf/oneOf/anyOf
    ['allOf', 'oneOf', 'anyOf'].forEach(key => {
      if (schema[key as keyof SchemaProperty] && Array.isArray(schema[key as keyof SchemaProperty])) {
        (schema[key as keyof SchemaProperty] as SchemaProperty[]).forEach((item, index) => {
          this.processProperty(`${key}[${index}]`, item, [...path, `${key}[${index}]`], depth + 1, visuals);
        });
      }
    });
  }

  private processVisuals(): void {
    if (!this.schema.properties?.visualStyles?.properties) {
      return;
    }

    const visualStyles = this.schema.properties.visualStyles.properties;
    
    Object.entries(visualStyles).forEach(([visualType, visualSchema]) => {
      const properties = Array.from(this.properties.values())
        .filter(p => p.visuals.includes(visualType));
      
      const categories: Record<PropertyCategory, string[]> = {
        [PropertyCategory.Color]: [],
        [PropertyCategory.Typography]: [],
        [PropertyCategory.Spacing]: [],
        [PropertyCategory.Border]: [],
        [PropertyCategory.Layout]: [],
        [PropertyCategory.Data]: [],
        [PropertyCategory.Interaction]: [],
        [PropertyCategory.Visual]: [],
        [PropertyCategory.Effect]: [],
        [PropertyCategory.Other]: []
      };

      properties.forEach(prop => {
        categories[prop.category].push(prop.id);
      });

      const metadata: VisualMetadata = {
        type: visualType,
        title: this.formatPropertyName(visualType),
        propertyCount: properties.length,
        maxDepth: Math.max(...properties.map(p => p.depth)),
        categories,
        inheritance: this.getVisualInheritance(visualType),
        complexity: this.determineComplexity(properties.length),
        hasStates: properties.some(p => p.isStateEnabled === true),
        commonProperties: this.getCommonProperties(visualType),
        specificProperties: this.getSpecificProperties(visualType)
      };

      this.visuals.set(visualType, metadata);
    });
  }

  private buildSearchIndex(): SearchIndex {
    const byTitle = new Map<string, Set<string>>();
    const byType = new Map<string, Set<string>>();
    const byCategory = new Map<PropertyCategory, Set<string>>();
    const byVisual = new Map<string, Set<string>>();

    // Build indices
    this.properties.forEach((prop, id) => {
      // Title index
      const titleWords = prop.title.toLowerCase().split(/\s+/);
      titleWords.forEach(word => {
        if (!byTitle.has(word)) {
          byTitle.set(word, new Set());
        }
        byTitle.get(word)!.add(id);
      });

      // Type index
      const types = Array.isArray(prop.type) ? prop.type : [prop.type];
      types.forEach(type => {
        if (!byType.has(type)) {
          byType.set(type, new Set());
        }
        byType.get(type)!.add(id);
      });

      // Category index
      if (!byCategory.has(prop.category)) {
        byCategory.set(prop.category, new Set());
      }
      byCategory.get(prop.category)!.add(id);

      // Visual index
      prop.visuals.forEach(visual => {
        if (!byVisual.has(visual)) {
          byVisual.set(visual, new Set());
        }
        byVisual.get(visual)!.add(id);
      });
    });

    // Create Fuse.js index for fuzzy search
    const fuseData = Array.from(this.properties.values()).map(prop => ({
      id: prop.id,
      title: prop.title,
      description: prop.description || '',
      path: prop.path
    }));

    const fullTextIndex = new Fuse(fuseData, {
      keys: ['title', 'description', 'path'],
      threshold: 0.3,
      includeScore: true
    });

    return {
      byTitle,
      byType,
      byCategory,
      byVisual,
      fullTextIndex
    };
  }

  private analyzeRelationships(): SchemaRelationships {
    const commonProperties = new Map<string, Set<string>>();
    const propertyGroups = new Map<string, string[]>();
    const stateProperties = new Map<string, string[]>();

    // Find common properties across visuals
    const propertyVisualMap = new Map<string, Set<string>>();
    
    this.properties.forEach((prop, id) => {
      const propName = prop.path.split('.').pop() || '';
      
      if (!propertyVisualMap.has(propName)) {
        propertyVisualMap.set(propName, new Set());
      }
      
      prop.visuals.forEach(visual => {
        propertyVisualMap.get(propName)!.add(visual);
      });

      // Track state properties
      if (prop.isStateEnabled) {
        prop.visuals.forEach(visual => {
          if (!stateProperties.has(visual)) {
            stateProperties.set(visual, []);
          }
          stateProperties.get(visual)!.push(id);
        });
      }
    });

    // Convert to final format
    propertyVisualMap.forEach((visuals, propName) => {
      if (visuals.size > 1) {
        commonProperties.set(propName, visuals);
      }
    });

    // Group related properties
    this.groupRelatedProperties(propertyGroups);

    return {
      commonProperties,
      inheritance: this.getInheritanceMap(),
      propertyGroups,
      stateProperties
    };
  }

  private calculateStats(): SchemaStats {
    const visualProperties = new Map<string, number>();
    
    this.visuals.forEach((visual, type) => {
      visualProperties.set(type, visual.propertyCount);
    });

    const propertyFrequency = new Map<string, number>();
    this.properties.forEach(prop => {
      const name = prop.path.split('.').pop() || '';
      propertyFrequency.set(name, (propertyFrequency.get(name) || 0) + 1);
    });

    const mostCommonProperties = Array.from(propertyFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([property, count]) => ({ property, count }));

    const depths = Array.from(this.properties.values()).map(p => p.depth);
    const propertySum = Array.from(visualProperties.values()).reduce((a, b) => a + b, 0);
    
    return {
      totalProperties: this.properties.size,
      totalVisuals: this.visuals.size,
      maxDepth: depths.length > 0 ? Math.max(...depths) : 0,
      totalDefinitions: Object.keys(this.schema.definitions || {}).length,
      averagePropertiesPerVisual: visualProperties.size > 0 ? propertySum / visualProperties.size : 0,
      mostCommonProperties
    };
  }

  // Helper methods
  private resolveRef(ref: string): SchemaProperty | undefined {
    if (ref.startsWith('#/definitions/')) {
      const defName = ref.replace('#/definitions/', '');
      return this.schema.definitions?.[defName];
    }
    if (ref.startsWith('#/properties/')) {
      const propPath = ref.replace('#/properties/', '').split('/');
      let current: any = this.schema.properties;
      for (const segment of propPath) {
        if (current && current[segment]) {
          current = current[segment];
        } else {
          return undefined;
        }
      }
      return current;
    }
    return undefined;
  }

  private formatPropertyName(name: string): string {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private extractConstraints(schema: SchemaProperty): PropertyMetadata['constraints'] {
    return {
      minimum: schema.minimum,
      maximum: schema.maximum,
      enum: schema.enum,
      pattern: schema.pattern,
      minItems: schema.minItems,
      maxItems: schema.maxItems,
      required: schema.required?.includes(schema.title || '') || false
    };
  }

  private checkStateEnabled(schema: SchemaProperty): boolean {
    if (schema.type === 'array' && schema.items) {
      const items = schema.items as SchemaProperty;
      if (items.properties && items.properties.$id) {
        return true;
      }
    }
    return false;
  }

  private determineComplexity(propertyCount: number): 'simple' | 'moderate' | 'complex' {
    if (propertyCount < 10) return 'simple';
    if (propertyCount < 50) return 'moderate';
    return 'complex';
  }

  private getVisualInheritance(visualType: string): string[] {
    // This would analyze the allOf patterns in the schema
    // For now, return empty array
    return [];
  }

  private getCommonProperties(visualType: string): string[] {
    // Properties that are shared with other visuals
    return [];
  }

  private getSpecificProperties(visualType: string): string[] {
    // Properties unique to this visual
    return [];
  }

  private getInheritanceMap(): Map<string, string[]> {
    // Build inheritance relationships from definitions
    return new Map();
  }

  private groupRelatedProperties(groups: Map<string, string[]>): void {
    // Group properties by patterns (e.g., all font-related, all color-related)
    const patterns = {
      font: /font|text/i,
      color: /color|fill|background/i,
      spacing: /padding|margin|spacing/i,
      border: /border|stroke|outline/i,
      size: /size|width|height|radius/i
    };

    Object.entries(patterns).forEach(([group, pattern]) => {
      const matching = Array.from(this.properties.entries())
        .filter(([_, prop]) => pattern.test(prop.path))
        .map(([id, _]) => id);
      
      if (matching.length > 0) {
        groups.set(group, matching);
      }
    });
  }
}