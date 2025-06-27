#!/usr/bin/env node
import { SchemaProcessor } from '../src/processor/schema-processor.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    console.log('Power BI Schema Processor\n');

    // Path to the original schema file
    const schemaPath = path.join(__dirname, '../../../public/theme-schemas/reportThemeSchema-2.143.json');
    
    // Check if schema exists
    try {
      await fs.access(schemaPath);
    } catch {
      console.error(`Schema file not found at: ${schemaPath}`);
      console.error('Please ensure the schema file exists in the public/theme-schemas directory');
      process.exit(1);
    }

    // Process the schema
    const processor = new SchemaProcessor();
    const processed = await processor.processSchema(schemaPath);

    // Convert Maps to objects for JSON serialization
    const serializable = {
      ...processed,
      properties: Object.fromEntries(processed.properties),
      visuals: Object.fromEntries(processed.visuals),
      searchIndex: {
        ...processed.searchIndex,
        byTitle: Object.fromEntries(
          Array.from(processed.searchIndex.byTitle.entries())
            .map(([k, v]) => [k, Array.from(v)])
        ),
        byType: Object.fromEntries(
          Array.from(processed.searchIndex.byType.entries())
            .map(([k, v]) => [k, Array.from(v)])
        ),
        byCategory: Object.fromEntries(
          Array.from(processed.searchIndex.byCategory.entries())
            .map(([k, v]) => [k, Array.from(v)])
        ),
        byVisual: Object.fromEntries(
          Array.from(processed.searchIndex.byVisual.entries())
            .map(([k, v]) => [k, Array.from(v)])
        ),
        fullTextIndex: undefined // Can't serialize Fuse index
      },
      relationships: {
        ...processed.relationships,
        commonProperties: Object.fromEntries(
          Array.from(processed.relationships.commonProperties.entries())
            .map(([k, v]) => [k, Array.from(v)])
        ),
        inheritance: Object.fromEntries(processed.relationships.inheritance),
        propertyGroups: Object.fromEntries(processed.relationships.propertyGroups),
        stateProperties: Object.fromEntries(processed.relationships.stateProperties)
      }
    };

    // Save processed schema
    const outputPath = path.join(__dirname, '../data/processed-schema.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(serializable, null, 2));

    console.log(`\nProcessed schema saved to: ${outputPath}`);
    console.log('\nSummary:');
    console.log(`- Total properties: ${processed.stats.totalProperties}`);
    console.log(`- Total visuals: ${processed.stats.totalVisuals}`);
    console.log(`- Max depth: ${processed.stats.maxDepth}`);
    console.log(`- Average properties per visual: ${processed.stats.averagePropertiesPerVisual.toFixed(1)}`);

    // Save a summary file
    const summaryPath = path.join(__dirname, '../data/schema-summary.json');
    const summary = {
      processedAt: processed.processedAt,
      version: processed.version,
      stats: processed.stats,
      visuals: Object.fromEntries(
        Array.from(processed.visuals.entries()).map(([k, v]) => [k, {
          propertyCount: v.propertyCount,
          complexity: v.complexity,
          hasStates: v.hasStates
        }])
      )
    };
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));

    console.log(`Summary saved to: ${summaryPath}`);

  } catch (error) {
    console.error('Error processing schema:', error);
    process.exit(1);
  }
}

main();