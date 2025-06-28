// Example: How to integrate the Schema API with your existing theme studio

// 1. Create a new schema service that uses the API
// lib/theme-studio/services/schema-api-service.ts

export class SchemaAPIService {
  private baseUrl = process.env.NEXT_PUBLIC_SCHEMA_API_URL || 'http://localhost:3001';
  private cache = new Map<string, any>();

  // Replace the current schema loader's loadSchema method
  async loadSchema() {
    // No need to load the entire 1.1MB file anymore!
    const stats = await this.fetchAPI('/stats');
    return {
      loaded: true,
      stats
    };
  }

  // Smart property search - replaces complex schema traversal
  async searchProperties(query: {
    visual?: string;
    text?: string;
    category?: string;
  }) {
    const params = new URLSearchParams();
    if (query.visual) params.set('visual', query.visual);
    if (query.text) params.set('text', query.text);
    if (query.category) params.set('category', query.category);

    const response = await this.fetchAPI(`/properties?${params}`);
    return response.results;
  }

  // Get visual structure - replaces getVisualSchema
  async getVisualStructure(visualType: string) {
    return this.fetchAPI(`/visuals/${visualType}/structure`);
  }

  // Natural language search for AI features
  async queryNaturalLanguage(query: string, context?: any) {
    return this.fetchAPI('/query', {
      method: 'POST',
      body: JSON.stringify({ query, context })
    });
  }

  private async fetchAPI(path: string, options?: RequestInit) {
    const cacheKey = `${path}${JSON.stringify(options)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(`${this.baseUrl}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });

    const data = await response.json();
    this.cache.set(cacheKey, data);
    return data;
  }
}

// 2. Update your schema-form.tsx to use the API
// components/theme-studio/form/schema-form.tsx

import { useQuery } from '@tanstack/react-query';
import { SchemaAPIService } from '@/lib/theme-studio/services/schema-api-service';

const schemaAPI = new SchemaAPIService();

export function SchemaForm({ visualType, propertyPath, value, onChange }) {
  // Instead of loading the entire schema, just get what you need
  const { data: structure, isLoading } = useQuery({
    queryKey: ['visual-structure', visualType],
    queryFn: () => schemaAPI.getVisualStructure(visualType)
  });

  if (isLoading) return <div>Loading...</div>;

  // Render form based on the structured data
  return (
    <div>
      {Object.entries(structure.properties).map(([category, properties]) => (
        <PropertySection key={category} title={category}>
          {properties.map(prop => (
            <PropertyInput
              key={prop.id}
              property={prop}
              value={value[prop.path]}
              onChange={(newValue) => onChange(prop.path, newValue)}
            />
          ))}
        </PropertySection>
      ))}
    </div>
  );
}

// 3. Add intelligent property search
// components/theme-studio/property-search.tsx

export function PropertySearch({ onSelectProperty }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // Use natural language search
    const response = await schemaAPI.queryNaturalLanguage(query);
    setResults(response.properties);
  };

  return (
    <div className="property-search">
      <input
        type="text"
        placeholder="Search properties (e.g., 'card background color')"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      
      {results.length > 0 && (
        <div className="search-results">
          {results.map(prop => (
            <button
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="result-item"
            >
              <div className="font-semibold">{prop.title}</div>
              <div className="text-sm text-gray-600">{prop.path}</div>
              {prop.description && (
                <div className="text-xs text-gray-500">{prop.description}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 4. AI-powered theme generation
// components/theme-studio/ai-theme-generator.tsx

export function AIThemeGenerator() {
  const [description, setDescription] = useState('');
  const [generatedTheme, setGeneratedTheme] = useState(null);

  const generateTheme = async () => {
    // Use the API to understand user intent
    const query = await schemaAPI.queryNaturalLanguage(description);
    
    // Build theme based on found properties
    const theme = {
      name: 'AI Generated Theme',
      visualStyles: {}
    };

    for (const prop of query.properties) {
      // Set values based on property type and description
      const path = prop.path.split('.');
      let current = theme;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      
      // Get example values for the property
      const examples = await schemaAPI.getPropertyExamples(prop.id);
      current[path[path.length - 1]] = examples[0] || generateDefaultValue(prop);
    }

    setGeneratedTheme(theme);
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your theme (e.g., 'Dark theme with blue accents and large fonts')"
      />
      <button onClick={generateTheme}>Generate Theme</button>
      
      {generatedTheme && (
        <pre>{JSON.stringify(generatedTheme, null, 2)}</pre>
      )}
    </div>
  );
}

// 5. Replace complex schema navigation in VisualPropertiesPanel
// Before: Complex recursive schema walking
// After: Simple API calls

export function VisualPropertiesPanel({ visualType, value, onChange }) {
  const { data: properties } = useQuery({
    queryKey: ['visual-properties', visualType],
    queryFn: async () => {
      // Get all properties for this visual, grouped by category
      const structure = await schemaAPI.getVisualStructure(visualType);
      return structure.properties;
    }
  });

  return (
    <div>
      {Object.entries(properties || {}).map(([category, props]) => (
        <CategorySection key={category} title={category}>
          {props.map(prop => (
            <SmartPropertyInput
              key={prop.id}
              property={prop}
              value={value}
              onChange={onChange}
              // The API provides related properties for better UX
              relatedProperties={prop.relatedProperties}
            />
          ))}
        </CategorySection>
      ))}
    </div>
  );
}