'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Copy, Trash2, Edit2, MoreVertical, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface VariantManagerProps {
  selectedVisual: string;
  selectedVariant: string;
  visualVariants: string[];
  visualSettings: Record<string, any>;
  onSelectedVariantChange: (variant: string) => void;
  onCreateVariant: (visual: string, variantName: string, initialData?: any) => void;
  onDeleteVariant: (visual: string, variantName: string) => void;
  onRenameVariant: (visual: string, oldName: string, newName: string) => void;
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
  onRenameVariant,
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
      // Get the current variant's settings to copy
      const currentSettings = visualSettings[selectedVisual]?.[selectedVariant] || {};
      const copiedSettings = JSON.parse(JSON.stringify(currentSettings));
      
      // Create the variant with the copied data in one atomic operation
      onCreateVariant(selectedVisual, variantName, copiedSettings);
      toast.success(`Variant "${variantName}" created successfully`);
    }
  };

  const handleRename = () => {
    const currentDisplayName = selectedVariant === '*' ? 'Default Style' : selectedVariant;
    const newName = prompt(`Rename variant "${currentDisplayName}" to:`, selectedVariant === '*' ? '' : selectedVariant);
    
    if (newName && newName !== selectedVariant) {
      // Check if the new name already exists
      if (visualVariants.includes(newName)) {
        toast.error(`A variant named "${newName}" already exists`);
        return;
      }
      
      // Check for invalid characters or reserved names
      if (newName === '*' || newName.trim() === '') {
        toast.error('Invalid variant name');
        return;
      }
      
      onRenameVariant(selectedVisual, selectedVariant, newName);
      toast.success(`Variant renamed to "${newName}"`);
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
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Style Variants
              </h3>
              <span className="text-xs font-medium text-gray-500">
                ({visualVariants.length})
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Create different visual styles for various contexts
            </p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <Select
            value={selectedVariant || '*'}
            onValueChange={onSelectedVariantChange}
          >
            <SelectTrigger className="flex-1 h-8 text-sm bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
              <SelectValue>
                {selectedVariant === '*' ? 'Default Style' : selectedVariant}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*" className="text-sm font-medium">
                Default Style
              </SelectItem>
              {visualVariants.length > 1 && (
                <SelectSeparator className="my-1" />
              )}
              {visualVariants.filter(v => v !== '*').map(variant => (
                <SelectItem key={variant} value={variant} className="text-sm">
                  {variant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <button
            onClick={() => setShowVariantDialog(true)}
            className="h-8 px-3 text-sm font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-1.5"
            title="Create new variant"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="More actions"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleDuplicate}
                className="text-sm cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 mr-2" />
                Duplicate Variant
              </DropdownMenuItem>
              
              {selectedVariant !== '*' && (
                <>
                  <DropdownMenuItem
                    onClick={handleRename}
                    className="text-sm cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-2" />
                    Rename Variant
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-sm cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete Variant
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Create Variant Dialog */}
      <Dialog open={showVariantDialog} onOpenChange={setShowVariantDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Create Style Variant</DialogTitle>
            <DialogDescription className="text-sm">
              Give your new variant a descriptive name
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <input
              type="text"
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
              placeholder="e.g. modern, classic, minimal"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateVariant();
                }
              }}
            />
            <p className="mt-2 text-xs text-gray-500">
              This variant will apply to {selectedVisual} visuals
            </p>
          </div>
          <DialogFooter className="mt-6">
            <button
              onClick={() => {
                setNewVariantName('');
                setShowVariantDialog(false);
              }}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateVariant}
              disabled={!newVariantName || newVariantName === '*'}
              className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              Create
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}