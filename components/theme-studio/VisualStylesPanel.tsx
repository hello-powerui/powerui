'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SchemaForm } from '@/components/theme-advanced/form/schema-form';
import { CollapsibleSection } from '@/components/theme-advanced/ui/collapsible-section';
import { loadVisualSchema, SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';
import { Plus, Trash2, Copy, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualStylesPanelProps {
  selectedVisual: string;
  visualLabel: string;
  onThemeChange?: (theme: any) => void;
}

export function VisualStylesPanel({ 
  selectedVisual, 
  visualLabel,
  onThemeChange 
}: VisualStylesPanelProps) {
  const {
    theme,
    setTheme,
    selectedVariant,
    setSelectedVariant,
    selectedState,
    setSelectedState,
    undoChanges,
    redoChanges,
    canUndo,
    canRedo
  } = useThemeAdvancedStore();

  const [visualSchema, setVisualSchema] = useState<any>(null);
  const [variants, setVariants] = useState<string[]>(['*']);
  const [supportedStates, setSupportedStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [schemaLoader] = useState(() => SchemaLoader.getInstance());

  // Initialize schema loader on mount
  useEffect(() => {
    const initSchemaLoader = async () => {
      try {
        await schemaLoader.loadSchema();
      } catch (error) {
        console.error('Failed to initialize schema loader:', error);
      }
    };
    initSchemaLoader();
  }, [schemaLoader]);

  // Load visual schema when visual changes
  useEffect(() => {
    if (selectedVisual === '*') {
      setVisualSchema(null);
      return;
    }

    const loadSchema = async () => {
      setLoading(true);
      try {
        const schema = await loadVisualSchema(selectedVisual);
        setVisualSchema(schema);
        
        // Extract supported states from schema
        if (schema?.properties) {
          const states = Object.keys(schema.properties)
            .filter(key => ['default', 'hover', 'selected', 'disabled'].includes(key));
          setSupportedStates(states);
        }

        // Extract existing variants from theme
        if (theme?.visualStyles?.[selectedVisual]) {
          const variantKeys = Object.keys(theme.visualStyles[selectedVisual]);
          setVariants(variantKeys.length > 0 ? variantKeys : ['*']);
        } else {
          setVariants(['*']);
        }
      } catch (error) {
        console.error('Failed to load visual schema:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchema();
  }, [selectedVisual, theme]);

  // Handle property changes
  const handlePropertyChange = (path: string[], value: any) => {
    const newTheme = { ...theme };
    
    // Build the full path for the visual
    const visualPath = ['visualStyles', selectedVisual, selectedVariant || '*'];
    
    // Add state to path if needed
    if (selectedState && selectedState !== 'default' && supportedStates.includes(selectedState)) {
      visualPath.push(selectedState);
    }
    
    // Combine paths
    const fullPath = [...visualPath, ...path];
    
    // Update theme
    let current = newTheme;
    for (let i = 0; i < fullPath.length - 1; i++) {
      if (!current[fullPath[i]]) {
        current[fullPath[i]] = {};
      }
      current = current[fullPath[i]];
    }
    current[fullPath[fullPath.length - 1]] = value;
    
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  // Add new variant
  const handleAddVariant = () => {
    const variantName = prompt('Enter variant name (e.g., minimal, detailed, corporate):');
    if (variantName && !variants.includes(variantName)) {
      setVariants([...variants, variantName]);
      setSelectedVariant(variantName);
      
      // Initialize variant in theme
      const newTheme = { ...theme };
      if (!newTheme.visualStyles) newTheme.visualStyles = {};
      if (!newTheme.visualStyles[selectedVisual]) newTheme.visualStyles[selectedVisual] = {};
      newTheme.visualStyles[selectedVisual][variantName] = {};
      setTheme(newTheme);
    }
  };

  // Delete variant
  const handleDeleteVariant = (variant: string) => {
    if (variant === '*') {
      alert('Cannot delete default variant');
      return;
    }
    
    if (confirm(`Delete variant "${variant}"?`)) {
      const newVariants = variants.filter(v => v !== variant);
      setVariants(newVariants);
      
      // Remove from theme
      const newTheme = { ...theme };
      if (newTheme.visualStyles?.[selectedVisual]) {
        delete newTheme.visualStyles[selectedVisual][variant];
      }
      setTheme(newTheme);
      
      // Select default variant
      setSelectedVariant('*');
    }
  };

  // Global settings configuration
  if (selectedVisual === '*') {
    return (
      <Card className="p-4">
        <div className="text-center space-y-3">
          <Settings className="w-8 h-8 mx-auto text-muted-foreground" />
          <div>
            <p className="font-medium">Global Visual Settings</p>
            <p className="text-sm text-muted-foreground mt-1">
              Settings that apply to all visuals
            </p>
          </div>
          <div className="space-y-4 mt-6 text-left">
            <CollapsibleSection 
              title="Background & Borders" 
              defaultOpen={true}
            >
              <SchemaForm
                schema={{
                  type: 'object',
                  properties: {
                    background: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          show: { type: 'boolean', title: 'Show Background' },
                          color: {
                            type: 'object',
                            properties: {
                              solid: {
                                type: 'object',
                                properties: {
                                  color: { type: 'string', format: 'color', title: 'Background Color' }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    border: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          show: { type: 'boolean', title: 'Show Border' },
                          color: {
                            type: 'object',
                            properties: {
                              solid: {
                                type: 'object',
                                properties: {
                                  color: { type: 'string', format: 'color', title: 'Border Color' }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }}
                value={theme?.visualStyles?.['*']?.['*'] || {}}
                onChange={handlePropertyChange}
                path={[]}
                level={0}
                schemaLoader={schemaLoader}
              />
            </CollapsibleSection>
          </div>
        </div>
      </Card>
    );
  }

  // Visual-specific settings
  return (
    <div className="space-y-4">
      {/* Visual Style Variants */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Visual Style Variants</h3>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Create multiple style variations for this visual type. Users can select different styles 
          to apply varied looks to their visuals.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAddVariant}
            className="px-3 py-1.5 text-xs bg-primary text-white rounded hover:bg-primary/90"
          >
            + New Style Variant
          </button>
          <div className="flex-1 flex gap-2">
            <Select
              value={selectedVariant || '*'}
              onValueChange={setSelectedVariant}
            >
              <SelectTrigger className="h-auto py-1.5 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {variants.map(variant => (
                  <SelectItem key={variant} value={variant}>
                    {variant === '*' ? 'Default Style' : variant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedVariant !== '*' && (
              <button
                onClick={() => handleDeleteVariant(selectedVariant)}
                className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Visual State Selector - only show for visuals with state-driven properties */}
      {supportedStates.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Visual State</h3>
            <p className="text-xs text-gray-600">Edit properties for different interaction states</p>
          </div>
          <div className="flex gap-2">
            {['default', 'hover', 'selected', 'disabled'].map(state => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md border transition-colors",
                  selectedState === state
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                )}
                disabled={!supportedStates.includes(state)}
              >
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Properties with state support will use the selected state. Properties without state support apply to all states.
          </p>
        </div>
      )}

      {/* Properties */}
      {loading ? (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Loading visual properties...</p>
        </div>
      ) : visualSchema ? (
        <div className="bg-white rounded-lg border border-gray-200">
          <SchemaForm
            schema={visualSchema}
            value={
              selectedState && selectedState !== 'default' && supportedStates.includes(selectedState)
                ? theme?.visualStyles?.[selectedVisual]?.[selectedVariant || '*']?.[selectedState] || {}
                : theme?.visualStyles?.[selectedVisual]?.[selectedVariant || '*'] || {}
            }
            onChange={handlePropertyChange}
            path={[]}
            level={0}
            schemaLoader={schemaLoader}
          />
        </div>
      ) : (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">
            No schema available for {visualLabel}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undoChanges}
          disabled={!canUndo}
          className="text-xs"
        >
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redoChanges}
          disabled={!canRedo}
          className="text-xs"
        >
          Redo
        </Button>
      </div>
    </div>
  );
}