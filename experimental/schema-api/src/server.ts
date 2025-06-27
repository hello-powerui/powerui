import express from 'express';
import { SchemaQueryAPI } from './api/schema-query-api.js';
import { ProcessedSchema, PropertyQuery, NaturalLanguageQuery } from './types/schema.types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Enable CORS for the playground
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

let api: SchemaQueryAPI;

// Load processed schema
async function loadProcessedSchema(): Promise<ProcessedSchema> {
  const dataPath = path.join(__dirname, '../data/processed-schema.json');
  const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  
  // Reconstruct Maps from JSON
  const processed: ProcessedSchema = {
    ...data,
    properties: new Map(Object.entries(data.properties)),
    visuals: new Map(Object.entries(data.visuals)),
    searchIndex: {
      ...data.searchIndex,
      byTitle: new Map(Object.entries(data.searchIndex.byTitle).map(([k, v]) => [k, new Set(v as string[])])),
      byType: new Map(Object.entries(data.searchIndex.byType).map(([k, v]) => [k, new Set(v as string[])])),
      byCategory: new Map(Object.entries(data.searchIndex.byCategory).map(([k, v]) => [k, new Set(v as string[])])),
      byVisual: new Map(Object.entries(data.searchIndex.byVisual).map(([k, v]) => [k, new Set(v as string[])])),
      fullTextIndex: null // Will be recreated
    },
    relationships: {
      ...data.relationships,
      commonProperties: new Map(Object.entries(data.relationships.commonProperties).map(([k, v]) => [k, new Set(v as string[])])),
      inheritance: new Map(Object.entries(data.relationships.inheritance)),
      propertyGroups: new Map(Object.entries(data.relationships.propertyGroups)),
      stateProperties: new Map(Object.entries(data.relationships.stateProperties))
    }
  };
  
  // Recreate Fuse index
  const Fuse = (await import('fuse.js')).default;
  const fuseData = Array.from(processed.properties.values()).map(prop => ({
    id: prop.id,
    title: prop.title,
    description: prop.description || '',
    path: prop.path
  }));
  
  processed.searchIndex.fullTextIndex = new Fuse(fuseData, {
    keys: ['title', 'description', 'path'],
    threshold: 0.3,
    includeScore: true
  });
  
  return processed;
}

// Initialize API
async function init() {
  try {
    const processed = await loadProcessedSchema();
    api = new SchemaQueryAPI(processed);
    console.log('Schema API initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Schema API:', error);
    process.exit(1);
  }
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'schema-api' });
});

// Get property by ID
app.get('/api/properties/:id', (req, res) => {
  const property = api.getPropertyById(req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

// Search properties
app.get('/api/properties', (req, res) => {
  const query: PropertyQuery = {
    text: req.query.text as string,
    type: req.query.type as string | string[],
    category: req.query.category as any,
    visual: req.query.visual as string | string[],
    hasStates: req.query.hasStates === 'true' ? true : req.query.hasStates === 'false' ? false : undefined,
    maxDepth: req.query.maxDepth ? parseInt(req.query.maxDepth as string) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
  };
  
  const results = api.searchProperties(query);
  res.json({
    results,
    total: results.length,
    query
  });
});

// Get visual
app.get('/api/visuals/:type', (req, res) => {
  const visual = api.getVisual(req.params.type);
  if (!visual) {
    return res.status(404).json({ error: 'Visual not found' });
  }
  res.json(visual);
});

// Get visual structure
app.get('/api/visuals/:type/structure', (req, res) => {
  const structure = api.getVisualStructure(req.params.type);
  if (!structure) {
    return res.status(404).json({ error: 'Visual not found' });
  }
  
  // Convert Map to object for JSON serialization
  const properties: Record<string, any[]> = {};
  structure.properties.forEach((props, category) => {
    properties[category] = props;
  });
  
  res.json({
    visual: structure.visual,
    properties
  });
});

// Natural language query
app.post('/api/query', (req, res) => {
  const query: NaturalLanguageQuery = req.body;
  if (!query.query) {
    return res.status(400).json({ error: 'Query text is required' });
  }
  
  const results = api.queryByNaturalLanguage(query);
  res.json(results);
});

// Get related properties
app.get('/api/properties/:id/related', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
  const related = api.getRelatedProperties(req.params.id, limit);
  res.json(related);
});

// Get common properties
app.get('/api/properties/common', (req, res) => {
  const visuals = req.query.visuals ? 
    (Array.isArray(req.query.visuals) ? req.query.visuals : [req.query.visuals]) as string[] : 
    undefined;
  
  const common = api.getCommonProperties(visuals);
  res.json(common);
});

// Get property examples
app.get('/api/properties/:id/examples', (req, res) => {
  const examples = api.getPropertyExamples(req.params.id);
  res.json({ examples });
});

// Get stats
app.get('/api/stats', (req, res) => {
  const stats = api.getStats();
  res.json(stats);
});

// Start server
const PORT = process.env.PORT || 3001;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Schema API server running on http://localhost:${PORT}`);
    console.log('\nExample requests:');
    console.log(`- GET http://localhost:${PORT}/api/properties?text=color&visual=card`);
    console.log(`- GET http://localhost:${PORT}/api/visuals/card/structure`);
    console.log(`- POST http://localhost:${PORT}/api/query { "query": "change card background color" }`);
  });
});