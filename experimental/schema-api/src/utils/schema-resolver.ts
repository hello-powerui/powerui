/**
 * Schema resolver that handles $ref resolution and type definitions
 */

interface SchemaNode {
  type?: string | string[];
  properties?: Record<string, any>;
  items?: any;
  oneOf?: any[];
  allOf?: any[];
  anyOf?: any[];
  enum?: any[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
  required?: string[];
  title?: string;
  description?: string;
  $ref?: string;
  additionalProperties?: boolean | object;
}

interface ResolvedSchema extends SchemaNode {
  resolvedType: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'oneOf' | 'enum' | 'ref';
  children?: Record<string, ResolvedSchema>;
  options?: ResolvedSchema[];
  enumValues?: any[];
  refPath?: string;
}

export class SchemaResolver {
  private definitions: Record<string, any>;
  private cache: Map<string, ResolvedSchema> = new Map();

  constructor(private schema: any) {
    this.definitions = schema.definitions || {};
  }

  /**
   * Resolve a schema node, following $refs and expanding definitions
   */
  resolve(node: SchemaNode, path: string = ''): ResolvedSchema {
    // Check cache
    const cacheKey = JSON.stringify(node) + path;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let resolved: ResolvedSchema;

    // Handle $ref
    if (node.$ref) {
      const refPath = node.$ref;
      const definition = this.getDefinition(refPath);
      if (definition) {
        resolved = {
          ...this.resolve(definition, refPath),
          refPath,
          title: node.title || definition.title,
          description: node.description || definition.description
        };
      } else {
        resolved = { ...node, resolvedType: 'ref', refPath };
      }
    }
    // Handle oneOf
    else if (node.oneOf) {
      resolved = {
        ...node,
        resolvedType: 'oneOf',
        options: node.oneOf.map((option, i) => 
          this.resolve(option, `${path}/oneOf[${i}]`)
        )
      };
    }
    // Handle allOf
    else if (node.allOf) {
      // Merge all schemas
      const merged = this.mergeAllOf(node.allOf);
      resolved = this.resolve(merged, path);
    }
    // Handle enum
    else if (node.enum) {
      resolved = {
        ...node,
        resolvedType: 'enum',
        enumValues: node.enum
      };
    }
    // Handle object type
    else if (node.type === 'object' || node.properties) {
      resolved = {
        ...node,
        resolvedType: 'object',
        children: {}
      };

      if (node.properties) {
        for (const [key, value] of Object.entries(node.properties)) {
          resolved.children![key] = this.resolve(value, `${path}/properties/${key}`);
        }
      }
    }
    // Handle array type
    else if (node.type === 'array') {
      resolved = {
        ...node,
        resolvedType: 'array',
        items: node.items ? this.resolve(node.items, `${path}/items`) : undefined
      };
    }
    // Handle primitive types
    else {
      const type = Array.isArray(node.type) ? node.type[0] : node.type;
      resolved = {
        ...node,
        resolvedType: type as any || 'string'
      };
    }

    this.cache.set(cacheKey, resolved);
    return resolved;
  }

  /**
   * Get a definition by $ref path
   */
  private getDefinition(ref: string): any {
    if (!ref.startsWith('#/definitions/')) {
      return null;
    }
    const defName = ref.replace('#/definitions/', '');
    return this.definitions[defName];
  }

  /**
   * Merge allOf schemas
   */
  private mergeAllOf(schemas: any[]): any {
    const merged: any = {
      type: 'object',
      properties: {},
      required: []
    };

    for (const schema of schemas) {
      const resolved = schema.$ref ? this.getDefinition(schema.$ref) : schema;
      if (!resolved) continue;

      if (resolved.properties) {
        Object.assign(merged.properties, resolved.properties);
      }
      if (resolved.required) {
        merged.required.push(...resolved.required);
      }
      if (resolved.type && !merged.type) {
        merged.type = resolved.type;
      }
    }

    return merged;
  }

  /**
   * Get all available visual types from the schema
   */
  getVisualTypes(): string[] {
    const visualStyles = this.schema.properties?.visualStyles;
    if (!visualStyles?.properties) return [];
    
    return Object.keys(visualStyles.properties).filter(
      key => key !== '*' && !key.startsWith('$')
    );
  }

  /**
   * Get the schema for a specific visual
   */
  getVisualSchema(visualType: string): ResolvedSchema | null {
    const visualStyles = this.schema.properties?.visualStyles;
    if (!visualStyles?.properties?.[visualType]) return null;

    return this.resolve(
      visualStyles.properties[visualType],
      `visualStyles/${visualType}`
    );
  }

  /**
   * Get formatted property path for theme JSON
   */
  getPropertyPath(visualType: string, propertyPath: string[]): string {
    return `visualStyles.${visualType}.*.${propertyPath.join('.')}`;
  }

  /**
   * Build value based on schema structure
   */
  buildValue(schema: ResolvedSchema, value: any): any {
    if (schema.resolvedType === 'oneOf' && schema.options) {
      // For now, assume first option (solid color)
      const firstOption = schema.options[0];
      if (firstOption.properties?.solid) {
        return {
          solid: {
            color: value
          }
        };
      }
    }

    if (schema.resolvedType === 'array') {
      return [{ value }];
    }

    if (schema.resolvedType === 'object' && schema.children) {
      // Build object based on required fields
      const obj: any = {};
      for (const [key, childSchema] of Object.entries(schema.children)) {
        if (childSchema.required?.includes(key)) {
          obj[key] = this.buildValue(childSchema, value);
        }
      }
      return obj;
    }

    return value;
  }
}