import { SchemaQueryAPI } from '../src/api/schema-query-api.js';
import { ProcessedSchema, PropertyCategory } from '../src/types/schema.types.js';

// Example usage of the Schema Query API

async function demonstrateAPI(api: SchemaQueryAPI) {
  console.log('=== Schema Query API Examples ===\n');

  // 1. Search for color properties in card visual
  console.log('1. Finding color properties for card visual:');
  const colorProps = api.searchProperties({
    category: PropertyCategory.Color,
    visual: 'card',
    limit: 5
  });
  colorProps.forEach(prop => {
    console.log(`  - ${prop.title} (${prop.path})`);
  });

  // 2. Get visual structure
  console.log('\n2. Card visual structure:');
  const cardStructure = api.getVisualStructure('card');
  if (cardStructure) {
    console.log(`  Total properties: ${cardStructure.visual.propertyCount}`);
    console.log(`  Complexity: ${cardStructure.visual.complexity}`);
    console.log('  Categories:');
    cardStructure.properties.forEach((props, category) => {
      console.log(`    - ${category}: ${props.length} properties`);
    });
  }

  // 3. Natural language query
  console.log('\n3. Natural language query:');
  const nlQuery = api.queryByNaturalLanguage({
    query: 'change the background color of cards',
    context: { currentVisual: 'card' }
  });
  console.log(`  Found ${nlQuery.properties.length} properties (confidence: ${nlQuery.confidence})`);
  nlQuery.properties.slice(0, 3).forEach(prop => {
    console.log(`  - ${prop.title}`);
  });
  if (nlQuery.suggestions.length > 0) {
    console.log('  Suggestions:', nlQuery.suggestions);
  }

  // 4. Get related properties
  console.log('\n4. Related properties:');
  if (colorProps.length > 0) {
    const related = api.getRelatedProperties(colorProps[0].id, 3);
    console.log(`  Properties related to "${colorProps[0].title}":`);
    related.forEach(prop => {
      console.log(`  - ${prop.title}`);
    });
  }

  // 5. Get common properties across visuals
  console.log('\n5. Common properties across card and slicer:');
  const commonProps = api.getCommonProperties(['card', 'slicer']);
  console.log(`  Found ${commonProps.length} common properties`);
  commonProps.slice(0, 5).forEach(prop => {
    console.log(`  - ${prop.title}`);
  });

  // 6. Get property examples
  console.log('\n6. Property examples:');
  if (colorProps.length > 0) {
    const examples = api.getPropertyExamples(colorProps[0].id);
    console.log(`  Examples for "${colorProps[0].title}":`);
    examples.forEach(ex => {
      console.log(`  - ${JSON.stringify(ex)}`);
    });
  }

  // 7. Search for state-enabled properties
  console.log('\n7. State-enabled properties:');
  const stateProps = api.searchProperties({
    hasStates: true,
    limit: 5
  });
  console.log(`  Found ${stateProps.length} properties with state support`);
  stateProps.forEach(prop => {
    console.log(`  - ${prop.title} in ${prop.visuals.join(', ')}`);
  });

  // 8. Get statistics
  console.log('\n8. Schema statistics:');
  const stats = api.getStats();
  console.log(`  - Total properties: ${stats.totalProperties}`);
  console.log(`  - Total visuals: ${stats.totalVisuals}`);
  console.log(`  - Max nesting depth: ${stats.maxDepth}`);
  console.log(`  - Most common properties:`);
  stats.mostCommonProperties.slice(0, 5).forEach(({ property, count }) => {
    console.log(`    - ${property}: appears ${count} times`);
  });
}

// Example of how an AI model could use the API
async function aiModelExample(api: SchemaQueryAPI) {
  console.log('\n\n=== AI Model Usage Example ===\n');

  // User request: "Make the card headers blue with larger text"
  const userRequest = "Make the card headers blue with larger text";
  console.log(`User request: "${userRequest}"\n`);

  // Step 1: Parse intent
  console.log('Step 1: Understanding the request...');
  const colorQuery = api.queryByNaturalLanguage({
    query: 'card header color blue',
    context: { currentVisual: 'card' }
  });

  const fontQuery = api.queryByNaturalLanguage({
    query: 'card header font size larger',
    context: { currentVisual: 'card' }
  });

  // Step 2: Find specific properties
  console.log('\nStep 2: Finding specific properties...');
  const headerColorProps = colorQuery.properties.filter(p => 
    p.path.includes('header') || p.path.includes('title')
  );
  
  const headerFontProps = fontQuery.properties.filter(p => 
    p.path.includes('header') || p.path.includes('title')
  );

  console.log(`Found ${headerColorProps.length} color properties`);
  console.log(`Found ${headerFontProps.length} font properties`);

  // Step 3: Generate theme modifications
  console.log('\nStep 3: Generating theme modifications...');
  const themeModifications: any = {
    visualStyles: {
      card: {
        '*': {}
      }
    }
  };

  // Add color modifications
  headerColorProps.forEach(prop => {
    const pathParts = prop.path.split('.');
    const propertyName = pathParts[pathParts.length - 1];
    
    // Get example values
    const examples = api.getPropertyExamples(prop.id);
    const blueValue = examples.find(ex => 
      typeof ex === 'string' && ex.includes('blue')
    ) || '#0078D4'; // Default blue

    console.log(`  Setting ${propertyName} to ${blueValue}`);
    themeModifications.visualStyles.card['*'][propertyName] = [{ 
      $id: 'default',
      color: blueValue 
    }];
  });

  // Add font size modifications
  headerFontProps.forEach(prop => {
    if (prop.type === 'number' || prop.type === 'integer') {
      const pathParts = prop.path.split('.');
      const propertyName = pathParts[pathParts.length - 1];
      
      // Increase font size by 20%
      const defaultSize = prop.defaultValue || 12;
      const newSize = Math.round(defaultSize * 1.2);

      console.log(`  Setting ${propertyName} to ${newSize}`);
      themeModifications.visualStyles.card['*'][propertyName] = [{ 
        $id: 'default',
        value: newSize 
      }];
    }
  });

  console.log('\nGenerated theme modifications:');
  console.log(JSON.stringify(themeModifications, null, 2));
}

// Run examples
export async function runExamples(processedSchema: ProcessedSchema) {
  const api = new SchemaQueryAPI(processedSchema);
  
  await demonstrateAPI(api);
  await aiModelExample(api);
}

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Please run this after processing the schema with npm run process-schema');
}