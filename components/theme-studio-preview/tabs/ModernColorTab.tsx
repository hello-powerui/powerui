'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import { useState, useEffect } from 'react';
import { useThemeBuilderStore } from '@/lib/stores/theme-studio-store';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { PaletteManager } from '@/components/palette/PaletteManager';
import { NeutralPaletteManager } from '@/components/palette/NeutralPaletteManager';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const EditIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export function ModernColorTab() {
  const { theme, setPalette, setThemeMode, setNeutralPalette } = useThemeBuilderStore();
  const { colorPalettes, neutralPalettes, loadPalettes, selectColorPalette } = usePaletteStore();
  const [isPaletteManagerOpen, setIsPaletteManagerOpen] = useState(false);
  const [isNeutralPaletteManagerOpen, setIsNeutralPaletteManagerOpen] = useState(false);
  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);

  useEffect(() => {
    // Sync user first, then load palettes
    const initializePalettes = async () => {
      try {
        // Attempt to sync user (silent fail if not authenticated)
        await fetch('/api/auth/user-sync');
      } catch (error) {
        console.log('User sync skipped:', error);
      }
      
      // Load palettes regardless
      await loadPalettes();
    };
    
    initializePalettes();
  }, [loadPalettes]);

  // Find the currently selected palette based on colors
  useEffect(() => {
    if (colorPalettes.length > 0 && theme.palette.colors) {
      const matchingPalette = colorPalettes.find(p => 
        JSON.stringify(p.colors) === JSON.stringify(theme.palette.colors)
      );
      if (matchingPalette) {
        setSelectedPaletteId(matchingPalette.id);
      }
    }
  }, [colorPalettes, theme.palette.colors]);

  // No more built-in palettes - all palettes are user-created
  const allNeutralPalettes = neutralPalettes;

  const handlePaletteSelect = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (palette) {
      setSelectedPaletteId(paletteId);
      setPalette({
        id: palette.id,
        name: palette.name,
        colors: palette.colors,
        userId: palette.userId,
        description: palette.description,
        isBuiltIn: palette.isBuiltIn,
        createdAt: palette.createdAt,
        updatedAt: palette.updatedAt
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Appearance Mode */}
      <div className="space-y-3">
        <div>
          <Label.Root className="text-sm font-medium text-gray-700">
            Appearance
          </Label.Root>
          <p className="text-xs text-gray-500 mt-0.5">
            Choose between light and dark theme modes
          </p>
        </div>
        
        <RadioGroup.Root
          value={theme.mode}
          onValueChange={(value) => setThemeMode(value as 'light' | 'dark')}
          className="flex gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroup.Item
              value="light"
              className="w-4 h-4 rounded-full border border-gray-300 bg-white data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:border-2 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white" />
            </RadioGroup.Item>
            <Label.Root className="text-sm text-gray-700 cursor-pointer">
              Light
            </Label.Root>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroup.Item
              value="dark"
              className="w-4 h-4 rounded-full border border-gray-300 bg-white data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:border-2 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-white" />
            </RadioGroup.Item>
            <Label.Root className="text-sm text-gray-700 cursor-pointer">
              Dark
            </Label.Root>
          </div>
        </RadioGroup.Root>
      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Data Color Palette */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700">
              Data Colors
            </Label.Root>
            <p className="text-xs text-gray-500 mt-1">
              Colors used for charts and data visualizations
            </p>
          </div>
          <Dialog.Root open={isPaletteManagerOpen} onOpenChange={(open) => {
            setIsPaletteManagerOpen(open);
            // Reload palettes when dialog closes
            if (!open) {
              loadPalettes();
            }
          }}>
            <Dialog.Trigger asChild>
              <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs font-medium">
                <Settings className="h-3 w-3 mr-1" />
                Manage Palettes
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
                <Dialog.Title className="sr-only">Manage Color Palettes</Dialog.Title>
                <PaletteManager />
                <Dialog.Close asChild>
                  <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
                    <span className="sr-only">Close</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="space-y-2">
          {colorPalettes.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">
              Loading palettes...
            </div>
          ) : (
            colorPalettes.map((palette) => (
              <label
                key={palette.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:border-gray-300 ${
                  selectedPaletteId === palette.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="dataPalette"
                  value={palette.id}
                  checked={selectedPaletteId === palette.id}
                  onChange={() => handlePaletteSelect(palette.id)}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{palette.name}</span>
                  {palette.isBuiltIn && (
                    <span className="text-xs text-gray-500">(Built-in)</span>
                  )}
                </div>
                <div className="flex gap-1">
                  {(palette.colors as string[]).slice(0, 6).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {(palette.colors as string[]).length > 6 && (
                    <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 text-xs flex items-center justify-center text-gray-600">
                      +{(palette.colors as string[]).length - 6}
                    </div>
                  )}
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      <Separator.Root className="bg-gray-200 h-px" />

      {/* Neutral Palette */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700">
              Neutral Palette
            </Label.Root>
            <p className="text-xs text-gray-500 mt-1">
              Background and text colors for the interface
            </p>
          </div>
          <Button 
            onClick={() => setIsNeutralPaletteManagerOpen(true)}
            variant="ghost" 
            size="sm" 
            className="h-auto py-1 px-2 text-xs font-medium"
          >
            <Settings className="h-3 w-3 mr-1" />
            Manage Palettes
          </Button>
        </div>

        <Select.Root
          value={(() => {
            if (typeof theme.neutralPalette === 'string') {
              return theme.neutralPalette;
            } else {
              // Find the matching custom palette by shades
              const customPalette = allNeutralPalettes.find(p => 
                !p.isBuiltIn && JSON.stringify(p.shades) === JSON.stringify(theme.neutralPalette)
              );
              return customPalette?.id || 'custom';
            }
          })()}
          onValueChange={(value) => {
            const palette = allNeutralPalettes.find(p => p.id === value);
            if (palette) {
              setNeutralPalette({
                id: palette.id,
                name: palette.name,
                shades: palette.shades,
                userId: palette.userId,
                isBuiltIn: palette.isBuiltIn,
                createdAt: palette.createdAt,
                updatedAt: palette.updatedAt
              });
            }
          }}
        >
          <Select.Trigger className="flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Select.Value>
              {(() => {
                if (theme.neutralPalette?.id) {
                  const palette = allNeutralPalettes.find(p => p.id === theme.neutralPalette.id);
                  return palette?.name || theme.neutralPalette.name;
                } else if (theme.neutralPalette?.shades) {
                  // Find palette by matching shades
                  const customPalette = allNeutralPalettes.find(p => 
                    JSON.stringify(p.shades) === JSON.stringify(theme.neutralPalette.shades)
                  );
                  return customPalette?.name || 'Custom';
                } else {
                  return 'Azure'; // Default fallback
                }
              })()}
            </Select.Value>
            <Select.Icon asChild>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          
          <Select.Portal>
            <Select.Content 
              className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-gray-950 shadow-md animate-in fade-in-80"
              position="popper"
              sideOffset={5}
              align="start"
            >
              <Select.Viewport className="p-1 max-h-64 overflow-y-auto">
                {/* Built-in Palettes */}
                <Select.Group>
                  <Select.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Built-in Palettes
                  </Select.Label>
                  {allNeutralPalettes.filter(p => p.isBuiltIn !== false).map((palette) => {
                    const isSelected = typeof theme.neutralPalette === 'string' && theme.neutralPalette === palette.id;
                    return (
                      <Select.Item
                        key={palette.id}
                        value={palette.id}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <Select.ItemIndicator>
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </span>
                      <Select.ItemText>{palette.name}</Select.ItemText>
                    </Select.Item>
                    );
                  })}
                </Select.Group>

                {/* User Palettes */}
                {allNeutralPalettes.filter(p => !p.isBuiltIn).length > 0 && (
                  <>
                    <div className="my-1 h-px bg-gray-200" />
                    <Select.Group>
                      <Select.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Your Palettes
                      </Select.Label>
                      {allNeutralPalettes.filter(p => !p.isBuiltIn).map((palette) => {
                        const isSelected = typeof theme.neutralPalette === 'object' && 
                          JSON.stringify(palette.shades) === JSON.stringify(theme.neutralPalette);
                        return (
                          <Select.Item
                            key={palette.id}
                            value={palette.id}
                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            <Select.ItemIndicator>
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </span>
                          <Select.ItemText>{palette.name}</Select.ItemText>
                        </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </>
                )}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <NeutralPaletteManager
        isOpen={isNeutralPaletteManagerOpen}
        onOpenChange={setIsNeutralPaletteManagerOpen}
        onSelectPalette={(paletteIdOrShades) => {
          // Handle both palette ID and shades object
          if (typeof paletteIdOrShades === 'string') {
            // Find the palette by ID
            const palette = allNeutralPalettes.find(p => p.id === paletteIdOrShades);
            if (palette) {
              setNeutralPalette({
                id: palette.id,
                name: palette.name,
                shades: palette.shades,
                userId: palette.userId,
                isBuiltIn: palette.isBuiltIn,
                createdAt: palette.createdAt,
                updatedAt: palette.updatedAt
              });
            }
          } else {
            // Assume it's a shades object with id and name
            setNeutralPalette(paletteIdOrShades as any);
          }
          setIsNeutralPaletteManagerOpen(false);
        }}
      />
    </div>
  );
}