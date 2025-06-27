#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixVisualProperties() {
  try {
    // Load the schema
    const schemaPath = path.join(__dirname, '../../../public/theme-schemas/reportThemeSchema-2.143.json');
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);
    
    // Load the processed schema
    const processedPath = path.join(__dirname, '../data/processed-schema.json');
    const processedContent = await fs.readFile(processedPath, 'utf-8');
    const processed = JSON.parse(processedContent);
    
    console.log('Fixing visual properties...');
    
    // For each visual in visualStyles.properties
    if (schema.properties?.visualStyles?.properties) {
      for (const [visualType, visualSchema] of Object.entries(schema.properties.visualStyles.properties)) {
        console.log(`\nProcessing ${visualType}...`);
        
        // Get the reference
        const ref = visualSchema.properties?.['*']?.['$ref'];
        if (!ref) continue;
        
        // Resolve the visual definition
        const defName = ref.replace('#/definitions/', '');
        const visualDef = schema.definitions[defName];
        if (!visualDef) continue;
        
        // Process allOf to get all properties
        const allProperties = [];
        if (visualDef.allOf) {
          for (const item of visualDef.allOf) {
            if (item.$ref) {
              // Resolve this reference too
              const subDefName = item.$ref.replace('#/definitions/', '');
              const subDef = schema.definitions[subDefName];
              if (subDef?.properties) {
                for (const [propName, propSchema] of Object.entries(subDef.properties)) {
                  allProperties.push({
                    name: propName,
                    schema: propSchema,
                    path: `visualStyles.${visualType}.*.${propName}`
                  });
                }
              }
            } else if (item.properties) {
              for (const [propName, propSchema] of Object.entries(item.properties)) {
                allProperties.push({
                  name: propName,
                  schema: propSchema,
                  path: `visualStyles.${visualType}.*.${propName}`
                });
              }
            }
          }
        }
        
        console.log(`Found ${allProperties.length} properties for ${visualType}`);
        
        // Update the processed schema
        if (!processed.properties) processed.properties = {};
        
        // Add these properties to the processed schema
        for (const prop of allProperties) {
          const id = `${visualType}_${prop.name}`;
          processed.properties[id] = {
            id,
            path: prop.path,
            title: prop.schema.title || prop.name,
            description: prop.schema.description,
            type: prop.schema.type || 'unknown',
            category: categorizeProperty(prop.name),
            visuals: [visualType],
            depth: 4,
            constraints: {},
            isStateEnabled: false
          };
        }
        
        // Update visual metadata
        if (!processed.visuals) processed.visuals = {};
        processed.visuals[visualType] = {
          type: visualType,
          title: formatName(visualType),
          propertyCount: allProperties.length,
          maxDepth: 4,
          categories: {},
          inheritance: [],
          complexity: allProperties.length < 10 ? 'simple' : allProperties.length < 50 ? 'moderate' : 'complex',
          hasStates: false,
          commonProperties: [],
          specificProperties: allProperties.map(p => p.name)
        };
      }
    }
    
    // Save the fixed processed schema
    await fs.writeFile(processedPath, JSON.stringify(processed, null, 2));
    console.log('\nFixed processed schema saved!');
    
    // Update summary
    const summaryPath = path.join(__dirname, '../data/schema-summary.json');
    const summary = {
      processedAt: new Date().toISOString(),
      version: schema.description || '2.143',
      stats: {
        totalProperties: Object.keys(processed.properties).length,
        totalVisuals: Object.keys(processed.visuals).length,
        maxDepth: 4,
        totalDefinitions: Object.keys(schema.definitions || {}).length,
        averagePropertiesPerVisual: 0,
        mostCommonProperties: []
      },
      visuals: {}
    };
    
    for (const [visualType, visual] of Object.entries(processed.visuals)) {
      summary.visuals[visualType] = {
        propertyCount: visual.propertyCount,
        complexity: visual.complexity,
        hasStates: visual.hasStates
      };
    }
    
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
    console.log('Summary updated!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

function categorizeProperty(name) {
  const lower = name.toLowerCase();
  if (lower.includes('color') || lower.includes('background') || lower.includes('fill')) return 'color';
  if (lower.includes('font') || lower.includes('text')) return 'typography';
  if (lower.includes('padding') || lower.includes('margin') || lower.includes('spacing')) return 'spacing';
  if (lower.includes('border') || lower.includes('stroke')) return 'border';
  if (lower.includes('width') || lower.includes('height') || lower.includes('size')) return 'layout';
  return 'other';
}

function formatName(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

fixVisualProperties();