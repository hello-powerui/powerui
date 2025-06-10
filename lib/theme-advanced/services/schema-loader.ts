import { SchemaProperty, ThemeSchema } from '../types/schema';

export class SchemaLoader {
  private definitions: Map<string, SchemaProperty> = new Map();
  private properties: Record<string, SchemaProperty> = {};
  private schema: ThemeSchema | null = null;
  private static instance: SchemaLoader | null = null;
  private loaded: boolean = false;

  // Singleton pattern for efficient schema reuse
  static getInstance(): SchemaLoader {
    if (!SchemaLoader.instance) {
      SchemaLoader.instance = new SchemaLoader();
    }
    return SchemaLoader.instance;
  }

  async loadSchema(): Promise<ThemeSchema> {
    // Return cached schema if already loaded
    if (this.loaded && this.schema) {
      return this.schema;
    }

    try {
      // Load properties.json
      const propertiesResponse = await fetch('/theme-schemas/properties.json');
      if (!propertiesResponse.ok) {
        throw new Error(`Failed to load properties.json: ${propertiesResponse.statusText}`);
      }
      const propertiesData = await propertiesResponse.json();
      this.properties = propertiesData;

      // Load definitions summary
      const definitionSummaryResponse = await fetch('/theme-schemas/definitions/definitions_summary.json');
      if (!definitionSummaryResponse.ok) {
        throw new Error(`Failed to load definitions_summary.json: ${definitionSummaryResponse.statusText}`);
      }
      const summary = await definitionSummaryResponse.json();
      
      // Load each definition file in parallel for better performance
      const definitionPromises = summary.definition_files.map(async (defName: string) => {
        const defResponse = await fetch(`/theme-schemas/definitions/${defName}.json`);
        if (!defResponse.ok) {
          console.warn(`Failed to load definition ${defName}: ${defResponse.statusText}`);
          return null;
        }
        const defData = await defResponse.json();
        // Store without .json extension to match references
        return { name: defName, data: defData };
      });

      const definitions = await Promise.all(definitionPromises);
      
      // Store loaded definitions
      definitions.forEach((def) => {
        if (def && def.data) {
          this.definitions.set(def.name, def.data);
        }
      });

      this.schema = {
        type: 'object',
        properties: this.properties,
        required: ['name'],
        additionalProperties: false,
        description: 'Power BI Theme Schema'
      };

      this.loaded = true;
      return this.schema;
    } catch (error) {
      console.error('Error loading schema:', error);
      throw error;
    }
  }

  resolveRef(ref: string): SchemaProperty | undefined {
    // Handle both local and external references
    if (ref.startsWith('#/definitions/')) {
      const defName = ref.replace('#/definitions/', '');
      const resolved = this.definitions.get(defName);
      if (!resolved) {
        console.warn(`Failed to resolve definition: ${defName}. Available definitions:`, Array.from(this.definitions.keys()));
      }
      return resolved;
    }
    
    // Handle property references
    if (ref.startsWith('#/properties/')) {
      const propPath = ref.replace('#/properties/', '').split('/');
      let current: any = this.properties;
      
      for (const segment of propPath) {
        if (current && current[segment]) {
          current = current[segment];
        } else {
          return undefined;
        }
      }
      
      return current as SchemaProperty;
    }
    
    return undefined;
  }

  getDefinition(name: string): SchemaProperty | undefined {
    return this.definitions.get(name);
  }

  getVisualTypes(): string[] {
    if (!this.properties.visualStyles?.properties) return [];
    return Object.keys(this.properties.visualStyles.properties).filter(
      key => !['report', 'page', 'filter', 'group'].includes(key)
    );
  }

  getTopLevelProperties(): string[] {
    return Object.keys(this.properties).filter(
      key => key !== 'visualStyles' && key !== '$schema'
    );
  }

  getPropertySchema(path: string[]): SchemaProperty | undefined {
    let current: any = this.properties;
    
    for (const segment of path) {
      if (current?.properties && current.properties[segment]) {
        current = current.properties[segment];
      } else if (current[segment]) {
        current = current[segment];
      } else {
        return undefined;
      }
    }
    
    return current as SchemaProperty;
  }

  // Clear cache (useful for development)
  clearCache(): void {
    this.definitions.clear();
    this.properties = {};
    this.schema = null;
    this.loaded = false;
  }

  // Get all available definitions
  getAllDefinitions(): Map<string, SchemaProperty> {
    return new Map(this.definitions);
  }

  // Check if a property supports states
  supportsStates(propertySchema: SchemaProperty): boolean {
    // Check if the property is an array with items that have $id
    if (propertySchema.type === 'array' && propertySchema.items) {
      const items = propertySchema.items;
      if (items.properties && items.properties.$id) {
        return true;
      }
    }
    
    // Check in oneOf/anyOf/allOf
    const schemas = [
      ...(propertySchema.oneOf || []),
      ...(propertySchema.anyOf || []),
      ...(propertySchema.allOf || [])
    ];
    
    return schemas.some(schema => this.supportsStates(schema));
  }
}