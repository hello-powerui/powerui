import { z } from 'zod';
import { ValidationError } from '@/lib/errors';

export interface PropertyMetadata {
  type: 'color' | 'number' | 'string' | 'boolean' | 'font' | 'array' | 'object';
  label: string;
  description?: string;
  min?: number;
  max?: number;
  enum?: string[];
  default?: any;
  required?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export class ThemeEditorService {
  private static schemaCache = new Map<string, any>();

  /**
   * Validate a property value against its schema
   */
  static validateProperty(
    schema: any,
    value: any,
    path: string[] = []
  ): ValidationResult {
    try {
      // Handle basic types
      switch (schema.type) {
        case 'string':
          if (typeof value !== 'string') {
            return { valid: false, error: 'Value must be a string' };
          }
          if (schema.enum && !schema.enum.includes(value)) {
            return { valid: false, error: `Value must be one of: ${schema.enum.join(', ')}` };
          }
          if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
            return { valid: false, error: 'Value does not match required pattern' };
          }
          break;

        case 'number':
        case 'integer':
          if (typeof value !== 'number') {
            return { valid: false, error: 'Value must be a number' };
          }
          if (schema.minimum !== undefined && value < schema.minimum) {
            return { valid: false, error: `Value must be at least ${schema.minimum}` };
          }
          if (schema.maximum !== undefined && value > schema.maximum) {
            return { valid: false, error: `Value must be at most ${schema.maximum}` };
          }
          break;

        case 'boolean':
          if (typeof value !== 'boolean') {
            return { valid: false, error: 'Value must be a boolean' };
          }
          break;

        case 'array':
          if (!Array.isArray(value)) {
            return { valid: false, error: 'Value must be an array' };
          }
          // Validate array items if schema provided
          if (schema.items) {
            for (let i = 0; i < value.length; i++) {
              const itemResult = this.validateProperty(
                schema.items,
                value[i],
                [...path, String(i)]
              );
              if (!itemResult.valid) {
                return itemResult;
              }
            }
          }
          break;

        case 'object':
          if (typeof value !== 'object' || value === null) {
            return { valid: false, error: 'Value must be an object' };
          }
          // Validate object properties if schema provided
          if (schema.properties) {
            for (const [key, propSchema] of Object.entries(schema.properties)) {
              if (schema.required?.includes(key) && !(key in value)) {
                return { valid: false, error: `Missing required property: ${key}` };
              }
              if (key in value) {
                const propResult = this.validateProperty(
                  propSchema,
                  value[key],
                  [...path, key]
                );
                if (!propResult.valid) {
                  return propResult;
                }
              }
            }
          }
          break;
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Validation error occurred' };
    }
  }

  /**
   * Resolve a JSON schema reference
   */
  static resolveReference(ref: string, schema: any): any {
    if (!ref.startsWith('#/')) {
      throw new Error('Only local references are supported');
    }

    const path = ref.substring(2).split('/');
    let current = schema;

    for (const segment of path) {
      current = current[segment];
      if (!current) {
        throw new Error(`Reference not found: ${ref}`);
      }
    }

    return current;
  }

  /**
   * Get metadata for a property from its schema
   */
  static getPropertyMetadata(
    schema: any,
    path: string[]
  ): PropertyMetadata | null {
    let current = schema;

    // Navigate to the property schema
    for (const segment of path) {
      if (current.properties && current.properties[segment]) {
        current = current.properties[segment];
      } else if (current.items && !isNaN(Number(segment))) {
        current = current.items;
      } else {
        return null;
      }
    }

    // Resolve reference if needed
    if (current.$ref) {
      current = this.resolveReference(current.$ref, schema);
    }

    // Extract metadata
    const metadata: PropertyMetadata = {
      type: this.mapSchemaType(current.type),
      label: current.title || path[path.length - 1],
      description: current.description,
      default: current.default,
      required: false, // Will be set by parent
    };

    // Add type-specific metadata
    if (current.type === 'number' || current.type === 'integer') {
      metadata.min = current.minimum;
      metadata.max = current.maximum;
    }

    if (current.enum) {
      metadata.enum = current.enum;
    }

    return metadata;
  }

  /**
   * Map JSON schema type to our type system
   */
  private static mapSchemaType(schemaType: string): PropertyMetadata['type'] {
    switch (schemaType) {
      case 'string':
        return 'string';
      case 'number':
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return 'array';
      case 'object':
        return 'object';
      default:
        return 'string';
    }
  }

  /**
   * Generate a default value for a schema
   */
  static generateDefaultValue(schema: any): any {
    if (schema.default !== undefined) {
      return schema.default;
    }

    switch (schema.type) {
      case 'string':
        return '';
      case 'number':
      case 'integer':
        return schema.minimum || 0;
      case 'boolean':
        return false;
      case 'array':
        return [];
      case 'object':
        const obj: any = {};
        if (schema.properties) {
          for (const [key, propSchema] of Object.entries(schema.properties)) {
            if (schema.required?.includes(key)) {
              obj[key] = this.generateDefaultValue(propSchema as any);
            }
          }
        }
        return obj;
      default:
        return null;
    }
  }

  /**
   * Flatten a nested object into dot-notation paths
   */
  static flattenObject(
    obj: any,
    prefix = '',
    result: Record<string, any> = {}
  ): Record<string, any> {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        this.flattenObject(value, path, result);
      } else {
        result[path] = value;
      }
    }
    
    return result;
  }

  /**
   * Check if a value is different from the default
   */
  static isModified(value: any, defaultValue: any): boolean {
    if (value === defaultValue) return false;
    if (value == null || defaultValue == null) return value !== defaultValue;
    
    if (typeof value === 'object' && typeof defaultValue === 'object') {
      const flatValue = this.flattenObject(value);
      const flatDefault = this.flattenObject(defaultValue);
      
      const allKeys = new Set([
        ...Object.keys(flatValue),
        ...Object.keys(flatDefault),
      ]);
      
      for (const key of Array.from(allKeys)) {
        if (flatValue[key] !== flatDefault[key]) {
          return true;
        }
      }
      
      return false;
    }
    
    return value !== defaultValue;
  }
}