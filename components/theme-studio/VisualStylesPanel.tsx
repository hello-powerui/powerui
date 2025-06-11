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
import { loadVisualSchema } from '@/lib/theme-advanced/services/schema-loader';
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
    const variantName = prompt('Enter variant name:');
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
                data={theme?.visualStyles?.['*']?.['*'] || {}}
                onChange={handlePropertyChange}
                path={[]}
                level={0}
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
      {/* Variant Management */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Style Variant</Label>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleAddVariant}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-1">
          {variants.map(variant => (
            <div 
              key={variant}
              className={cn(
                "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-muted/50",
                selectedVariant === variant && "bg-muted"
              )}
              onClick={() => setSelectedVariant(variant)}
            >
              <span className="text-sm">
                {variant === '*' ? 'Default' : variant}
              </span>
              {variant !== '*' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVariant(variant);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* State Selector (if applicable) */}
      {supportedStates.length > 0 && (
        <div className="space-y-2">
          <Label>Visual State</Label>
          <Select 
            value={selectedState || 'default'} 
            onValueChange={setSelectedState}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {supportedStates.map(state => (
                <SelectItem key={state} value={state}>
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Properties */}
      {loading ? (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Loading visual properties...</p>
        </Card>
      ) : visualSchema ? (
        <Card className="p-4">
          <SchemaForm
            schema={visualSchema}
            data={
              selectedState && selectedState !== 'default' && supportedStates.includes(selectedState)
                ? theme?.visualStyles?.[selectedVisual]?.[selectedVariant || '*']?.[selectedState] || {}
                : theme?.visualStyles?.[selectedVisual]?.[selectedVariant || '*'] || {}
            }
            onChange={handlePropertyChange}
            path={[]}
            level={0}
          />
        </Card>
      ) : (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            No schema available for {visualLabel}
          </p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undoChanges}
          disabled={!canUndo}
        >
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redoChanges}
          disabled={!canRedo}
        >
          Redo
        </Button>
      </div>
    </div>
  );
}