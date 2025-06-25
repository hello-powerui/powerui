'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, Globe, Users, CheckCircle } from 'lucide-react';
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
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      selectedBorderColor: 'border-gray-600',
    },
    {
      value: 'ORGANIZATION' as const,
      icon: Users,
      title: userOrganization ? `Share with ${userOrganization.name}` : 'Organization',
      description: userOrganization 
        ? `All members of ${userOrganization.name} can view and use this theme. Team members can also edit it.`
        : 'Join an organization to share themes with your team',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      selectedBorderColor: 'border-blue-600',
      disabled: !userOrganization,
    },
    {
      value: 'PUBLIC' as const,
      icon: Globe,
      title: 'Public',
      description: 'Anyone can view and use this theme. Only you can edit it.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      selectedBorderColor: 'border-green-600',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{theme.name}"</DialogTitle>
          <DialogDescription>
            Choose who can access this theme
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedVisibility === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => !option.disabled && setSelectedVisibility(option.value)}
                disabled={option.disabled}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}
                  ${isSelected 
                    ? `${option.bgColor} ${option.selectedBorderColor}` 
                    : `bg-white ${option.borderColor} hover:${option.bgColor}`
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${option.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      {isSelected && (
                        <CheckCircle className={`w-4 h-4 ${option.color}`} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isUpdating || selectedVisibility === theme.visibility}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            {isUpdating ? 'Updating...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}