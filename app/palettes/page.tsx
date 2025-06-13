'use client';

import { useState } from 'react';
import { UnifiedPaletteManager } from '@/components/theme-studio/palette/UnifiedPaletteManager';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { Palette, Grid3x3, Plus } from 'lucide-react';

export default function PalettesPage() {
  const [showManager, setShowManager] = useState(false);
  const [managerType, setManagerType] = useState<'color' | 'neutral' | 'both'>('both');
  const { colorPalettes, neutralPalettes } = usePaletteStore();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Palette Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage color and neutral palettes for your themes
          </p>
        </div>

        <Tabs defaultValue="color" className="space-y-4">
          <TabsList>
            <TabsTrigger value="color" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color Palettes
            </TabsTrigger>
            <TabsTrigger value="neutral" className="flex items-center gap-2">
              <Grid3x3 className="h-4 w-4" />
              Neutral Palettes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="color" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Color Palettes</h2>
                <p className="text-muted-foreground">
                  Color palettes for data visualizations
                </p>
              </div>
              <Button onClick={() => {
                setManagerType('color');
                setShowManager(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Manage Palettes
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {colorPalettes.map((palette) => (
                <Card key={palette.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setManagerType('color');
                    setShowManager(true);
                  }}>
                  <CardHeader>
                    <CardTitle className="text-lg">{palette.name}</CardTitle>
                    {palette.description && (
                      <CardDescription>{palette.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 flex-wrap">
                      {(palette.colors as string[]).map((color, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="neutral" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Neutral Palettes</h2>
                <p className="text-muted-foreground">
                  Neutral palettes for backgrounds, borders, and text
                </p>
              </div>
              <Button onClick={() => {
                setManagerType('neutral');
                setShowManager(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Manage Palettes
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {neutralPalettes.map((palette) => (
                <Card key={palette.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setManagerType('neutral');
                    setShowManager(true);
                  }}>
                  <CardHeader>
                    <CardTitle className="text-lg">{palette.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-0.5">
                      {Object.entries(palette.shades as Record<string, string>)
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([shade, color]) => (
                          <div
                            key={shade}
                            className="h-8 w-4 first:rounded-l last:rounded-r"
                            style={{ backgroundColor: color }}
                            title={`${shade}: ${color}`}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <UnifiedPaletteManager
        open={showManager}
        onOpenChange={setShowManager}
        mode="manage"
        paletteType={managerType}
      />
    </div>
  );
}