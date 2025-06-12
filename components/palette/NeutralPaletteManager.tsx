'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { usePaletteStore } from '@/lib/stores/palette-store';
import { NeutralPaletteEditor } from './NeutralPaletteEditor';
import { Button } from '@/components/ui/button';

const XIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

interface NeutralPaletteManagerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPalette?: (paletteId: string | Record<string, string>) => void;
}

export function NeutralPaletteManager({ isOpen, onOpenChange, onSelectPalette }: NeutralPaletteManagerProps) {
  const { neutralPalettes, loadPalettes, deleteNeutralPalette } = usePaletteStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      loadPalettes();
    }
  }, [isOpen, loadPalettes]);

  const handleEdit = (palette: any) => {
    setEditingPalette(palette);
    setIsEditorOpen(true);
  };

  const handleDelete = async (paletteId: string) => {
    if (confirm('Are you sure you want to delete this palette?')) {
      try {
        await deleteNeutralPalette(paletteId);
      } catch (error) {
        console.error('Failed to delete palette:', error);
      }
    }
  };

  const handleCreateNew = () => {
    setEditingPalette(null);
    setIsEditorOpen(true);
  };

  const handleSelectPalette = (palette: any) => {
    if (onSelectPalette) {
      // Always pass the full palette object to ensure proper handling
      onSelectPalette(palette);
      onOpenChange(false);
    }
  };

  const shadeOrder = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  // Separate built-in and user palettes
  const builtInPalettes = neutralPalettes.filter(p => p.isBuiltIn);
  const userPalettes = neutralPalettes.filter(p => !p.isBuiltIn);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl border border-gray-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Manage Neutral Palettes
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Choose or create neutral color palettes for your themes
                  </p>
                </div>
                <Dialog.Close className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <XIcon />
                </Dialog.Close>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleCreateNew} 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  <PlusIcon />
                  Create New Palette
                </button>
              </div>

              {/* Built-in Palettes */}
              {builtInPalettes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">Built-in Palettes</h3>
                  <div className="space-y-3">
                    {builtInPalettes.map((palette) => (
                      <div
                        key={palette.id}
                        className="border border-gray-200 rounded-md p-3 bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                        onClick={() => handleSelectPalette(palette)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900">{palette.name}</h4>
                            {palette.id === 'azure-default' && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Default</span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-12 gap-0.5">
                          {shadeOrder.map((shade) => (
                            <div
                              key={shade}
                              className="h-6 first:rounded-l-sm last:rounded-r-sm"
                              style={{ backgroundColor: (palette.shades as any)?.[shade] || '#ccc' }}
                              title={`${shade}: ${(palette.shades as any)?.[shade] || 'N/A'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Palettes */}
              {userPalettes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">Your Palettes</h3>
                  <div className="space-y-3">
                    {userPalettes.map((palette) => (
                      <div
                        key={palette.id}
                        className="border border-gray-200 rounded-md p-3 bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                        onClick={() => handleSelectPalette(palette)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{palette.name}</h4>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleEdit(palette)}
                              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Edit palette"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDelete(palette.id)}
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete palette"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 gap-0.5">
                          {shadeOrder.map((shade) => (
                            <div
                              key={shade}
                              className="h-6 first:rounded-l-sm last:rounded-r-sm"
                              style={{ backgroundColor: (palette.shades as any)?.[shade] || '#ccc' }}
                              title={`${shade}: ${(palette.shades as any)?.[shade] || 'N/A'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <NeutralPaletteEditor
        isOpen={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        editingPalette={editingPalette}
      />
    </>
  );
}