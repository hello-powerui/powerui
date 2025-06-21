'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Share2, Globe, Users, Lock } from 'lucide-react';

type ThemeVisibility = 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';

interface ThemeSharingControlsProps {
  themeId: string;
  currentVisibility: ThemeVisibility;
  userPlan: 'PRO' | 'TEAM';
  organizationId?: string;
  organizationName?: string;
  onVisibilityChange?: (newVisibility: ThemeVisibility) => void;
}

export function ThemeSharingControls({
  themeId,
  currentVisibility,
  userPlan,
  organizationId,
  organizationName,
  onVisibilityChange,
}: ThemeSharingControlsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [visibility, setVisibility] = useState(currentVisibility);

  const handleVisibilityChange = async (newVisibility: ThemeVisibility) => {
    // Don't allow PRO users to set organization visibility
    if (userPlan === 'PRO' && newVisibility === 'ORGANIZATION') {
      toast.error('Organization sharing is only available for Team plans');
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/themes/${themeId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visibility: newVisibility,
          organizationId: newVisibility === 'ORGANIZATION' ? organizationId : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme visibility');
      }

      setVisibility(newVisibility);
      onVisibilityChange?.(newVisibility);
      
      // Show success message based on visibility
      switch (newVisibility) {
        case 'PUBLIC':
          toast.success('Theme is now public and visible to all Power UI users');
          break;
        case 'ORGANIZATION':
          toast.success(`Theme is now shared with ${organizationName || 'your organization'}`);
          break;
        case 'PRIVATE':
          toast.success('Theme is now private');
          break;
      }
    } catch (error) {
      toast.error('Failed to update theme visibility');
      console.error('Error updating theme visibility:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getVisibilityConfig = (value: ThemeVisibility) => {
    switch (value) {
      case 'PUBLIC':
        return {
          icon: <Globe className="w-4 h-4" />,
          label: 'Public',
          description: 'Visible to all Power UI users',
        };
      case 'ORGANIZATION':
        return {
          icon: <Users className="w-4 h-4" />,
          label: 'Organization',
          description: `Share with ${organizationName || 'your team'}`,
        };
      case 'PRIVATE':
        return {
          icon: <Lock className="w-4 h-4" />,
          label: 'Private',
          description: 'Only visible to you',
        };
    }
  };

  const currentConfig = getVisibilityConfig(visibility);

  return (
    <Select
      value={visibility}
      onValueChange={(value) => handleVisibilityChange(value as ThemeVisibility)}
      disabled={isUpdating}
    >
      <SelectTrigger className="h-9 px-3 text-sm w-auto">
        <SelectValue>
          <div className="flex items-center gap-2">
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {currentConfig.icon}
                <span className="hidden sm:inline">{currentConfig.label}</span>
              </>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PRIVATE">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Private</span>
              <span className="text-xs text-gray-500">Only visible to you</span>
            </div>
          </div>
        </SelectItem>
        
        <SelectItem value="PUBLIC">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Public</span>
              <span className="text-xs text-gray-500">Visible to all Power UI users</span>
            </div>
          </div>
        </SelectItem>

        {userPlan === 'TEAM' && organizationId && (
          <SelectItem value="ORGANIZATION">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Organization</span>
                <span className="text-xs text-gray-500">
                  Share with {organizationName || 'your team'}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

// Visibility badge component for displaying current visibility
export function VisibilityBadge({ visibility, size = 'sm' }: { 
  visibility: ThemeVisibility;
  size?: 'sm' | 'md';
}) {
  const getConfig = () => {
    switch (visibility) {
      case 'PUBLIC':
        return {
          icon: <Globe className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          label: 'Public',
          className: 'bg-green-100 text-green-700',
        };
      case 'ORGANIZATION':
        return {
          icon: <Users className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          label: 'Organization',
          className: 'bg-blue-100 text-blue-700',
        };
      case 'PRIVATE':
        return {
          icon: <Lock className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
          label: 'Private',
          className: 'bg-gray-100 text-gray-700',
        };
    }
  };

  const config = getConfig();

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium ${config.className}`}>
      {config.icon}
      <span className="hidden sm:inline">{config.label}</span>
    </span>
  );
}