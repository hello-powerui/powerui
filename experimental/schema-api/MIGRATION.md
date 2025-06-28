# Migrating Theme Studio to Schema API

## Benefits of Migration

### Before (Current Approach)
- Load entire 1.1MB schema file into memory
- Complex recursive traversal with $ref resolution
- Difficult to search or filter properties
- No natural language support
- Slow initial load time

### After (Schema API)
- Load only what you need via API
- Pre-indexed for instant search
- Natural language queries
- Intelligent property relationships
- Fast response times

## Migration Steps

### Step 1: Start the Schema API Service

```bash
cd experimental/schema-api
npm install
npm run process-schema  # One-time processing
npm run dev            # Start API server
```

### Step 2: Create API Client Service

Replace `SchemaLoader` with a new API client:

```typescript
// lib/theme-studio/services/schema-api-client.ts
export class SchemaAPIClient {
  private baseUrl = process.env.NEXT_PUBLIC_SCHEMA_API_URL || 'http://localhost:3001';

  async searchProperties(query: PropertyQuery) {
    const params = new URLSearchParams(query as any);
    const res = await fetch(`${this.baseUrl}/api/properties?${params}`);
    return res.json();
  }

  async getVisualStructure(visualType: string) {
    const res = await fetch(`${this.baseUrl}/api/visuals/${visualType}/structure`);
    return res.json();
  }

  // Add other methods as needed
}
```

### Step 3: Update Components Gradually

Start with non-critical components:

1. **Property Search** - Add a new search component using the API
2. **Visual Selector** - Use API to get visual metadata
3. **Property Documentation** - Use API for examples and descriptions

### Step 4: Update Form Generation

Replace complex schema walking with API calls:

```typescript
// Before
const schema = schemaLoader.getVisualSchema(visualType);
// Complex recursive rendering...

// After
const { properties } = await api.getVisualStructure(visualType);
// Simple category-based rendering
```

### Step 5: Add New Features

Once migrated, you can add:

1. **Smart Search**: "Find all color properties in charts"
2. **AI Assistance**: "Make this theme more accessible"
3. **Property Recommendations**: Based on current selections
4. **Validation**: Real-time validation with helpful messages

## Example: Updating VisualPropertiesPanel

### Before (Current)
```typescript
// Complex schema resolution
const visualDef = schemaLoader.getDefinition(`visual-${visualType}`);
if (visualDef?.allOf) {
  // Complex merging logic
  // Recursive property extraction
  // Manual categorization
}
```

### After (With API)
```typescript
const structure = await api.getVisualStructure(visualType);
// structure.properties is already categorized and ready to use!
```

## Testing the Integration

1. **Side-by-side testing**: Run both systems in parallel
2. **Verify property mappings**: Ensure all properties are found
3. **Performance testing**: Measure load time improvements
4. **User testing**: Get feedback on search and navigation

## Deployment Options

### Option 1: Embedded Service
- Bundle the API with your Next.js app
- Use Next.js API routes
- Single deployment

### Option 2: Separate Service
- Deploy API as microservice
- Better scaling
- Can be used by multiple apps

### Option 3: Edge Functions
- Deploy to Vercel Edge Functions
- Global distribution
- Automatic scaling

## Next Steps

1. Set up the API in development
2. Create the client service
3. Start with PropertySearch component
4. Gradually migrate other components
5. Add new AI-powered features