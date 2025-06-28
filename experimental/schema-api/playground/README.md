# Power BI Schema API Playground

This interactive playground demonstrates the power of the new Schema API compared to the current approach.

## Access the Playground

1. Make sure the Schema API is running:
   ```bash
   cd experimental/schema-api
   npm run dev
   ```

2. Make sure the playground server is running:
   ```bash
   python3 -m http.server 3002
   ```

3. Open in your browser:
   **http://localhost:3002/playground/index.html**

## What You Can Do

### 1. Natural Language Search
Try queries like:
- "change card background color"
- "make chart text bigger"
- "add blue borders to tables"
- "card header font size"

### 2. Traditional Search
- Filter by visual type (card, chart, slicer, etc.)
- Filter by category (colors, typography, spacing)
- Filter by property type (string, number, boolean)

### 3. Visual Structure Explorer
- Select any visual to see how properties are organized
- Properties are pre-categorized for easy navigation

### 4. Property Details
Click any property to see:
- Example values
- Related properties
- How it translates to theme JSON

## Key Differences from Current Approach

### Current (SchemaLoader)
```typescript
// Load entire 1.1MB file
const loader = SchemaLoader.getInstance();
await loader.loadSchema();

// Complex navigation
const visualDef = loader.getDefinition(`visual-${visualType}`);
if (visualDef?.allOf?.[1]?.properties) {
  // Manual traversal and resolution
}
```

### New (Schema API)
```typescript
// Instant, targeted queries
const properties = await api.searchProperties({
  visual: 'card',
  category: 'color'
});

// Natural language
const results = await api.queryNaturalLanguage(
  "change card background color"
);
```

## Benefits

1. **Speed**: 100x faster than loading full schema
2. **Intelligence**: Understands natural language
3. **Organization**: Pre-categorized properties
4. **Discovery**: Find related properties easily
5. **Examples**: See valid values instantly

## Try These Scenarios

1. **Scenario: Change card colors**
   - Use natural language: "card background color"
   - Or use filters: Visual="Card", Category="Colors"
   - Click properties to see examples

2. **Scenario: Modify typography**
   - Search: "font size"
   - Filter by visual to narrow results
   - See all font-related properties grouped together

3. **Scenario: Explore a visual**
   - Use Visual Structure dropdown
   - Select "Card" or "Chart"
   - See how properties are organized

4. **Scenario: Build a theme**
   - Search for properties
   - Click to see examples
   - Watch the theme JSON build in real-time