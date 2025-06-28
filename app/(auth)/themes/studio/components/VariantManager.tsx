'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface VariantManagerProps {
  selectedVisual: string;
  selectedVariant: string;
  visualVariants: string[];
  visualSettings: Record<string, any>;
  onSelectedVariantChange: (variant: string) => void;
  onCreateVariant: (visual: string, variantName: string) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  onVisualSettingsChange: (visualSettings: Record<string, any>) => void;
}

export function VariantManager({
  selectedVisual,
  selectedVariant,
  visualVariants,
  visualSettings,
  onSelectedVariantChange,
  onCreateVariant,
  onDeleteVariant,
  onVisualSettingsChange,
}: VariantManagerProps) {
  const [showVariantDialog, setShowVariantDialog] = useState(false);
  const [newVariantName, setNewVariantName] = useState('');

  const handleDuplicate = () => {
    const baseName = selectedVariant === '*' ? 'default' : selectedVariant;
    let copyNumber = 1;
    let newName = `${baseName}-copy`;
    
    // Find a unique name
    while (visualVariants.includes(newName)) {
      copyNumber++;
      newName = `${baseName}-copy-${copyNumber}`;
    }
    
    const variantName = prompt('Enter name for the duplicated variant:', newName);
    if (variantName && !visualVariants.includes(variantName)) {
      // First create the variant
      onCreateVariant(selectedVisual, variantName);
      
      // Then copy the current variant's settings
      const currentSettings = visualSettings[selectedVisual]?.[selectedVariant] || {};
      const updatedVisualSettings = {
        ...visualSettings,
        [selectedVisual]: {
          ...visualSettings[selectedVisual],
          [variantName]: JSON.parse(JSON.stringify(currentSettings))
        }
      };
      onVisualSettingsChange(updatedVisualSettings);
      onSelectedVariantChange(variantName);
      toast.success(`Variant "${variantName}" created successfully`);
    }
  };

  const handleDelete = () => {
    if (confirm(`Delete variant "${selectedVariant}"?`)) {
      onDeleteVariant(selectedVisual, selectedVariant);
      onSelectedVariantChange('*');
    }
  };

  const handleCreateVariant = () => {
    if (newVariantName && newVariantName !== '*') {
      onCreateVariant(selectedVisual, newVariantName);
      onSelectedVariantChange(newVariantName);
      setNewVariantName('');
      setShowVariantDialog(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-200">
        <div className="mb-3">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Style Variants
            </h3>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              {visualVariants.length} {visualVariants.length === 1 ? 'variant' : 'variants'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Create multiple visual styles for different contexts and purposes
          </p>
        </div>
          
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Select
              value={selectedVariant || '*'}
              onValueChange={onSelectedVariantChange}
            >
              <SelectTrigger className="flex-1 h-9 text-sm font-medium bg-white border-gray-300 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visualVariants.map(variant => (
                  <SelectItem key={variant} value={variant} className="text-xs">
                    {variant === '*' ? 'Default Style' : variant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVariantDialog(true)}
                className="px-3 py-1.5 text-sm font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-sm"
                title="Create a new variant"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>
              
              <button
                onClick={handleDuplicate}
                className="p-1.5 text-sm font-medium bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-300 shadow-sm"
                title="Duplicate current variant"
              >
                <Copy className="w-4 h-4" />
              </button>
              
              {selectedVariant !== '*' && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  title="Delete variant"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Variant Dialog */}
      <Dialog open={showVariantDialog} onOpenChange={setShowVariantDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Style Variant</DialogTitle>
            <DialogDescription>
              Enter a name for the new style variant. This will create a new set of styling options 
              for {selectedVisual} visuals.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <input
              type="text"
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
              placeholder="e.g. minimal, detailed, corporate"
              className="w-full px-3 py-2 border rounded-md"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateVariant();
                }
              }}
            />
          </div>
          <DialogFooter className="mt-4">
            <button
              onClick={() => {
                setNewVariantName('');
                setShowVariantDialog(false);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateVariant}
              disabled={!newVariantName || newVariantName === '*'}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              Create Variant
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}