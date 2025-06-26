'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lock, Globe, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: {
    id: string;
    name: string;
    visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
    organization?: {
      id: string;
      name: string;
    };
  };
  userOrganization?: { id: string; name: string } | null;
  onVisibilityChange: (themeId: string, visibility: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC') => Promise<void>;
}

export function ShareModal({ isOpen, onClose, theme, userOrganization, onVisibilityChange }: ShareModalProps) {
  const [selectedVisibility, setSelectedVisibility] = useState<'PRIVATE' | 'ORGANIZATION' | 'PUBLIC'>(
    theme.visibility || 'PRIVATE'
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedVisibility(theme.visibility || 'PRIVATE');
    }
  }, [isOpen, theme.visibility]);

  const handleSave = async () => {
    if (selectedVisibility === theme.visibility) {
      onClose();
      return;
    }

    setIsUpdating(true);
    try {
      await onVisibilityChange(theme.id, selectedVisibility);
      toast.success(`Theme visibility updated to ${selectedVisibility.toLowerCase()}`);
      onClose();
    } catch (error) {
      toast.error('Failed to update theme visibility');
    } finally {
      setIsUpdating(false);
    }
  };

  const options = [
    {
      value: 'PRIVATE' as const,
      icon: Lock,
      title: 'Private',
      description: 'Only you can see and edit this theme',
      iconColor: 'text-gray-500',
    },
    {
      value: 'ORGANIZATION' as const,
      icon: Users,
      title: userOrganization ? `Share with ${userOrganization.name}` : 'Organization',
      description: userOrganization 
        ? `All members of ${userOrganization.name} can view and use this theme. Team members can also edit it.`
        : 'Join an organization to share themes with your team',
      iconColor: 'text-blue-600',
      disabled: !userOrganization,
    },
    {
      value: 'PUBLIC' as const,
      icon: Globe,
      title: 'Public',
      description: 'Anyone can view and use this theme. Only you can edit it.',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change Theme Visibility</DialogTitle>
          <DialogDescription>
            Choose who can access "{theme.name}"
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup 
          value={selectedVisibility} 
          onValueChange={(value) => setSelectedVisibility(value as typeof selectedVisibility)}
          className="space-y-3 py-4"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const isDisabled = option.disabled || false;
            
            return (
              <div key={option.value} className={isDisabled ? 'opacity-50' : ''}>
                <Label
                  htmlFor={option.value}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-50'}
                    ${selectedVisibility === option.value 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200'
                    }
                  `}
                >
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    disabled={isDisabled}
                    className="mt-0.5"
                  />
                  <div className={`mt-0.5 ${option.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-0.5">
                      {option.title}
                    </div>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isUpdating || selectedVisibility === theme.visibility}
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}