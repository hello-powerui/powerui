import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  variantName: string;
  onVariantNameChange: (name: string) => void;
  onCreateVariant: () => void;
  visualType: string;
}

export function CreateVariantModal({
  isOpen,
  onClose,
  variantName,
  onVariantNameChange,
  onCreateVariant,
  visualType,
}: CreateVariantModalProps) {
  const handleCreate = () => {
    if (variantName.trim()) {
      onCreateVariant();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Variant</DialogTitle>
          <DialogDescription>
            Create a new variant for {visualType} visuals
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="variant-name">Variant Name</Label>
            <Input
              id="variant-name"
              value={variantName}
              onChange={(e) => onVariantNameChange(e.target.value)}
              placeholder="e.g., Modern, Classic, Minimal"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && variantName.trim()) {
                  handleCreate();
                }
              }}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!variantName.trim()}
          >
            Create Variant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}