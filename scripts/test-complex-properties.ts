import * as fs from 'fs';
import * as path from 'path';

async function testComplexProperties() {
  // Load the schema
  const schemaPath = path.join(process.cwd(), 'public/theme-schemas/reportThemeSchema-2.143.json');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const schema = JSON.parse(schemaContent);
  
  // Get visual types directly from the schema
  const visualTypes = Object.keys(schema.properties?.visualStyles?.properties || {});
  
  const complexProperties = new Map<string, Set<string>>();
  
  console.log(`Found ${visualTypes.length} visual types`);
  
  // Collect complex properties from all visual types
  visualTypes.forEach(visualType => {
    const visualDef = schema.definitions?.[`visual-${visualType}`];
    if (visualDef?.allOf?.[1]?.properties) {
      Object.entries(visualDef.allOf[1].properties).forEach(([propName, propSchema]: [string, any]) => {
        if (propSchema && typeof propSchema === 'object') {
          const schema = propSchema;
          
          // Debug: Check categoryAxis specifically
          if (propName === 'categoryAxis') {
            console.log(`\nDEBUG - categoryAxis schema:`, JSON.stringify({
              type: schema.type,
              hasItems: !!schema.items,
              itemsType: schema.items?.type,
              hasProperties: !!schema.items?.properties,
              propertyCount: schema.items?.properties ? Object.keys(schema.items.properties).length : 0
            }, null, 2));
          }
          
          // Check if this is a complex property (array with object items containing properties)
          if (schema.type === 'array' && 
              schema.items?.type === 'object' && 
              schema.items.properties &&
              Object.keys(schema.items.properties).length > 0) {
            
            if (!complexProperties.has(propName)) {
              complexProperties.set(propName, new Set());
            }
            
            // Add the sub-properties
            Object.keys(schema.items.properties).forEach(subProp => {
              complexProperties.get(propName)!.add(subProp);
            });
          }
        }
      });
    }
  });
  
  console.log('\n=== Complex Properties Found ===\n');
  
  // Sort and display complex properties
  const sortedProps = Array.from(complexProperties.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  sortedProps.forEach(([propName, subProps]) => {
    console.log(`${propName}:`);
    const sortedSubProps = Array.from(subProps).sort();
    
    // Show first 10 sub-properties
    const displayProps = sortedSubProps.slice(0, 10);
    console.log(`  Sub-properties (${subProps.size} total): ${displayProps.join(', ')}${sortedSubProps.length > 10 ? ', ...' : ''}`);
    
    // Check for the specific properties mentioned
    const searchProps = ['gridlineShow', 'gridlineStyle', 'gridlineThickness', 'showAxisTitle', 'titleFontSize'];
    const foundProps = searchProps.filter(p => subProps.has(p));
    if (foundProps.length > 0) {
      console.log(`  ✓ Contains: ${foundProps.join(', ')}`);
    }
    
    console.log('');
  });
}

testComplexProperties().catch(console.error);