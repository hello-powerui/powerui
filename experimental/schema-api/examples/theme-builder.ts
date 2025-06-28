import { SchemaQueryAPI } from '../src/api/schema-query-api.js';
import { ProcessedSchema } from '../src/types/schema.types.js';

/**
 * Theme Builder using Schema API
 * 
 * This demonstrates how the Schema API helps build valid Power BI themes
 * by providing the correct structure and format for properties.
 */

export class ThemeBuilder {
  constructor(private api: SchemaQueryAPI) {}

  /**
   * Build a theme with proper structure based on schema validation
   */
  async buildTheme(config: {
    name: string;
    dataColors?: string[];
    pageBackground?: string;
    visualConfigs?: Array<{
      visualType: string;
      properties: Record<string, any>;
    }>;
  }) {
    const theme: any = {
      name: config.name,
      dataColors: config.dataColors || []
    };

    // Add visual styles if provided
    if (config.visualConfigs && config.visualConfigs.length > 0) {
      theme.visualStyles = {};
      
      for (const visualConfig of config.visualConfigs) {
        // Get the visual structure to ensure we're using valid properties
        const structure = await this.api.getVisualStructure(visualConfig.visualType);
        
        if (!structure) {
          console.warn(`Visual type '${visualConfig.visualType}' not found`);
          continue;
        }

        // Initialize the visual configuration
        theme.visualStyles[visualConfig.visualType] = {
          "*": {}
        };

        // Process each property
        for (const [propName, value] of Object.entries(visualConfig.properties)) {
          // Find the property in the schema to get its correct format
          const property = await this.findProperty(visualConfig.visualType, propName);
          
          if (property) {
            // Format the value according to the schema
            const formattedValue = this.formatPropertyValue(property, value);
            theme.visualStyles[visualConfig.visualType]["*"][propName] = formattedValue;
          }
        }
      }
    }

    // Handle page background color specifically
    if (config.pageBackground) {
      theme.visualStyles = theme.visualStyles || {};
      theme.visualStyles.page = {
        "*": {
          "outspace": [{
            "color": {
              "solid": {
                "color": config.pageBackground
              }
            }
          }]
        }
      };
    }

    return theme;
  }

  /**
   * Find a property by name in a visual
   */
  private async findProperty(visualType: string, propertyName: string) {
    const results = await this.api.searchProperties({
      visual: visualType,
      text: propertyName,
      limit: 10
    });

    // Try exact match first
    let property = results.results.find(p => 
      p.path.endsWith(propertyName) || p.title.toLowerCase() === propertyName.toLowerCase()
    );

    // If not found, try partial match
    if (!property && results.results.length > 0) {
      property = results.results[0];
    }

    return property;
  }

  /**
   * Format a property value according to its schema definition
   */
  private formatPropertyValue(property: any, value: any): any {
    // Handle color properties
    if (property.category === 'color' || property.path.includes('color') || property.path.includes('Color')) {
      if (typeof value === 'string') {
        // For color properties, Power BI expects this structure
        return [{
          "solid": {
            "color": value
          }
        }];
      }
    }

    // Handle font properties
    if (property.path.includes('font') || property.path.includes('Font')) {
      if (property.type === 'string' && typeof value === 'string') {
        return [{ "value": value }];
      }
      if (property.type === 'number' && typeof value === 'number') {
        return [{ "value": value }];
      }
    }

    // Handle boolean properties
    if (property.type === 'boolean') {
      return [{ "value": value }];
    }

    // Handle array properties (common for state-based properties)
    if (property.type === 'array' && !Array.isArray(value)) {
      return [value];
    }

    // Default: return as-is
    return value;
  }

  /**
   * Example: Create a theme like the one you showed
   */
  async createExampleTheme() {
    return this.buildTheme({
      name: "My Custom Theme",
      dataColors: [
        "#2568E8",
        "#8338EC", 
        "#FF006E",
        "#F95608",
        "#FFBE0C",
        "#2ACF56",
        "#3498DB",
        "#A66999"
      ],
      pageBackground: "#84CC16"
    });
  }

  /**
   * Example: Create a more complex theme with multiple visual configurations
   */
  async createAdvancedTheme() {
    return this.buildTheme({
      name: "Professional Dark",
      dataColors: [
        "#0078D4", // Microsoft Blue
        "#107C10", // Green
        "#FFB900", // Amber
        "#D83B01", // Orange
        "#5C2D91", // Purple
        "#008575", // Teal
      ],
      visualConfigs: [
        {
          visualType: "page",
          properties: {
            "background": "#1E1E1E",
            "outspace": "#2D2D30"
          }
        },
        {
          visualType: "card",
          properties: {
            "background": "#252526",
            "border": "#3E3E42",
            "fontColor": "#CCCCCC",
            "fontSize": 14
          }
        },
        {
          visualType: "slicer",
          properties: {
            "background": "#252526",
            "fontColor": "#CCCCCC",
            "border": "#3E3E42"
          }
        }
      ]
    });
  }

  /**
   * Validate a theme against the schema
   */
  async validateTheme(theme: any): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties
    if (!theme.name) {
      errors.push("Theme must have a 'name' property");
    }

    // Validate visual styles
    if (theme.visualStyles) {
      for (const [visualType, config] of Object.entries(theme.visualStyles)) {
        // Check if visual type exists
        const visual = await this.api.getVisual(visualType);
        if (!visual) {
          warnings.push(`Unknown visual type: ${visualType}`);
          continue;
        }

        // Validate properties
        if (typeof config === 'object' && config !== null) {
          const starConfig = (config as any)['*'];
          if (starConfig) {
            for (const [propName, value] of Object.entries(starConfig)) {
              // Check if property exists for this visual
              const property = await this.findProperty(visualType, propName);
              if (!property) {
                warnings.push(`Unknown property '${propName}' for visual '${visualType}'`);
              }
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// Usage example
export async function demonstrateThemeBuilder(api: SchemaQueryAPI) {
  const builder = new ThemeBuilder(api);

  console.log('=== Creating Your Example Theme ===');
  const exampleTheme = await builder.createExampleTheme();
  console.log(JSON.stringify(exampleTheme, null, 2));

  console.log('\n=== Creating Advanced Theme ===');
  const advancedTheme = await builder.createAdvancedTheme();
  console.log(JSON.stringify(advancedTheme, null, 2));

  console.log('\n=== Validating Theme ===');
  const validation = await builder.validateTheme(exampleTheme);
  console.log('Valid:', validation.valid);
  if (validation.errors.length > 0) {
    console.log('Errors:', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.log('Warnings:', validation.warnings);
  }
}