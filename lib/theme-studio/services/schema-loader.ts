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
      // Load the single consolidated schema file
      const schemaResponse = await fetch('/theme-schemas/reportThemeSchema-2.143.json');
      if (!schemaResponse.ok) {
        throw new Error(`Failed to load schema: ${schemaResponse.statusText}`);
      }
      const schemaData = await schemaResponse.json();

      // Extract properties and definitions from the consolidated schema
      this.properties = schemaData.properties || {};
      
      // Store definitions in our map for efficient lookup
      const definitions = schemaData.definitions || {};
      Object.entries(definitions).forEach(([key, value]) => {
        this.definitions.set(key, value as SchemaProperty);
      });

      // Create our schema object
      this.schema = {
        type: schemaData.type || 'object',
        properties: this.properties,
        required: schemaData.required || ['name'],
        additionalProperties: schemaData.additionalProperties ?? false,
        description: schemaData.description || 'Power BI Theme Schema',
        definitions: definitions
      };

      this.loaded = true;
      return this.schema;
    } catch (error) {
      throw error;
    }
  }

  resolveRef(ref: string): SchemaProperty | undefined {
    // Handle both local and external references
    if (ref.startsWith('#/definitions/')) {
      const defName = ref.replace('#/definitions/', '');
      const resolved = this.definitions.get(defName);
      if (!resolved) {
        return null;
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

  getAllVisualTypes(): string[] {
    if (!this.properties.visualStyles?.properties) return [];
    return Object.keys(this.properties.visualStyles.properties);
  }

  getCanvasTypes(): string[] {
    if (!this.properties.visualStyles?.properties) {
      return [];
    }
    
    const allTypes = Object.keys(this.properties.visualStyles.properties);
    
    const canvasTypes = ['report', 'page', 'filter'].filter(type => allTypes.includes(type));
    
    return canvasTypes;
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

  getVisualSchema(visualType: string): SchemaProperty | undefined {
    // Get schema for any visual type, including report/page/filter
    if (!this.properties.visualStyles?.properties) return undefined;
    return this.properties.visualStyles.properties[visualType];
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

  // Get global property value from theme
  getGlobalPropertyValue(theme: any, propertyPath: string[]): any {
    try {
      // Global values are stored at visualStyles.*.*.*
      const globalArray = theme?.visualStyles?.['*']?.['*']?.['*'];
      if (!Array.isArray(globalArray) || globalArray.length === 0) {
        return undefined;
      }
      
      // Get the first object in the array (combined properties)
      const globalProps = globalArray[0];
      
      // Navigate to the specific property
      let value = globalProps;
      for (const key of propertyPath) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          return undefined;
        }
      }
      
      return value;
    } catch (error) {
      return undefined;
    }
  }

  // Check if a property value is inherited from global
  isInheritedFromGlobal(theme: any, visualType: string, variant: string, propertyPath: string[], currentValue: any): boolean {
    const globalValue = this.getGlobalPropertyValue(theme, propertyPath);
    if (globalValue === undefined) return false;
    
    return JSON.stringify(currentValue) === JSON.stringify(globalValue);
  }
  
  // Check if a visual has any state-driven properties
  visualHasStateDrivenProperties(visualType: string): boolean {
    try {
      const visualDef = this.definitions.get(`visual-${visualType}`);
      if (!visualDef || !visualDef.allOf || visualDef.allOf.length < 2) {
        return false;
      }
      
      // Check visual-specific properties (allOf[1])
      const visualProps = visualDef.allOf[1].properties || {};
      
      // Check each property for state support
      for (const [propName, propSchema] of Object.entries(visualProps)) {
        if (propSchema.type === 'array' && 
            propSchema.items?.type === 'object' && 
            propSchema.items.properties?.$id) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      // console.error('Error checking state-driven properties:', error);
      return false;
    }
  }

  // Get general properties schema for a visual (non-styling properties)
  getGeneralPropertiesSchema(visualType: string): SchemaProperty | undefined {
    try {
      const visualDef = this.definitions.get(`visual-${visualType}`);
      if (!visualDef || !visualDef.allOf || visualDef.allOf.length < 2) {
        return undefined;
      }
      
      // General properties are typically in allOf[1].properties
      const visualProps = visualDef.allOf[1].properties || {};
      
      // Filter out styling-related properties
      const generalProps: Record<string, any> = {};
      const stylingKeywords = ['color', 'fill', 'border', 'background', 'font', 'text', 'padding', 'margin', 'spacing'];
      
      for (const [key, value] of Object.entries(visualProps)) {
        const isStylingSProperty = stylingKeywords.some(keyword => 
          key.toLowerCase().includes(keyword)
        );
        
        if (!isStylingSProperty) {
          generalProps[key] = value;
        }
      }
      
      return {
        type: 'object',
        properties: generalProps
      };
    } catch (error) {
      // console.error('Error getting general properties schema:', error);
      return undefined;
    }
  }
}

// Export a function to load visual schema
export async function loadVisualSchema(visualType: string): Promise<any> {
  const loader = SchemaLoader.getInstance();
  
  // Ensure schema is loaded (this will return cached schema if already loaded)
  await loader.loadSchema();
  
  // Get the visual definition
  const visualDef = loader.getDefinition(`visual-${visualType}`);
  if (!visualDef) {
    
    return null;
  }
  
  return visualDef;
}