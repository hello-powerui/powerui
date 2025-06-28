'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisibilityBadge } from '@/components/theme-sharing-controls';
import { ShareModal } from '@/components/share-modal';
import { ThemeEditModal } from '@/components/theme-edit-modal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, ExternalLink, Copy, Download, Share2, Trash2, Calendar, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface Theme {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  themeData: any;
  visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
  organizationId?: string;
  organization?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    plan: 'PRO' | 'TEAM';
    username?: string;
  };
  previewColors?: string[];
}

interface ThemeCardProps {
  theme: Theme;
  isOwner?: boolean;
  currentUserId?: string;
  userOrganization?: { id: string; name: string } | null;
  onDelete?: (themeId: string, themeName: string) => void;
  onDuplicate?: (themeId: string) => void;
  onVisibilityChange?: (themeId: string, visibility: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC') => void;
  onUpdate?: (themeId: string, name: string, description: string) => Promise<void>;
  isTeamTheme?: boolean;
}

// Helper function to get relative time
function getRelativeTime(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMins > 0) {
    return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else {
    return 'Just now';
  }
}

export function ThemeCard({
  theme,
  isOwner = true,
  currentUserId,
  userOrganization,
  onDelete,
  onDuplicate,
  onVisibilityChange,
  onUpdate,
  isTeamTheme = false,
}: ThemeCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [visibleColors, setVisibleColors] = useState<number>(5);
  const colorContainerRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    if (!onDelete || !confirm(`Are you sure you want to delete "${theme.name}"? This action cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(theme.id, theme.name);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicate = async () => {
    if (!onDuplicate) return;
    setIsDuplicating(true);
    try {
      // Call the parent's duplicate handler
      await onDuplicate(theme.id);
      
      // If this is not the owner duplicating a public theme, show a message
      if (!isOwner) {
        toast.success('Theme duplicated to your workspace. Opening in theme studio...');
      }
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleDownload = () => {
    const themeData = theme.themeData;
    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Theme downloaded');
  };

  // Extract colors for preview
  const previewColors = useMemo(() => {
    return theme.previewColors || 
      (theme.themeData?.dataColors) || 
      (theme.themeData?.palette?.colors) ||
      [];
  }, [theme.previewColors, theme.themeData]);

  // Calculate how many colors can fit
  useEffect(() => {
    const calculateVisibleColors = () => {
      if (!colorContainerRef.current || !previewColors.length) return;
      
      const containerWidth = colorContainerRef.current.offsetWidth;
      const colorWidth = 20; // w-5 = 20px
      const gap = 6; // gap between colors
      const overflowIndicatorWidth = 40; // space for +X indicator
      
      const maxColors = Math.floor((containerWidth - overflowIndicatorWidth) / (colorWidth + gap));
      setVisibleColors(Math.min(maxColors, previewColors.length));
    };

    calculateVisibleColors();
    window.addEventListener('resize', calculateVisibleColors);
    return () => window.removeEventListener('resize', calculateVisibleColors);
  }, [previewColors]);

  const displayColors = previewColors.slice(0, visibleColors);
  const remainingColors = previewColors.length - visibleColors;

  return (
    <>
      <div className={`bg-white p-6 rounded-2xl border ${
        theme.visibility === 'ORGANIZATION' && !isOwner 
          ? 'border-blue-200 hover:border-blue-300' 
          : 'border-gray-200 hover:border-gray-300'
      } hover:shadow-md transition-all duration-200 group relative overflow-hidden`}>
        
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header with title and actions */}
          <div className="flex items-start justify-between mb-4 gap-2">
            {isOwner ? (
              <Link href={`/themes/studio?themeId=${theme.id}`} className="flex-1 min-w-0 group/link">
                <h3 className="text-base font-semibold text-gray-900 group-hover/link:text-gray-700 transition-colors truncate pr-2">
                  {theme.name}
                </h3>
                {theme.description ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {theme.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{theme.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    No description yet.
                  </p>
                )}
              </Link>
            ) : (
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
                  {theme.name}
                </h3>
                {theme.description ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {theme.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{theme.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    No description yet.
                  </p>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
              {/* Dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {isOwner ? (
                    <DropdownMenuItem onClick={() => router.push(`/themes/studio?themeId=${theme.id}`)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in theme studio
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={handleDuplicate} disabled={isDuplicating}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate to my workspace
                    </DropdownMenuItem>
                  )}
                  {isOwner && onUpdate && (
                    <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                  )}
                  {isOwner && onVisibilityChange && (
                    <DropdownMenuItem onClick={() => setIsShareModalOpen(true)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Change visibility
                    </DropdownMenuItem>
                  )}
                  {isOwner && (
                    <DropdownMenuItem onClick={handleDuplicate} disabled={isDuplicating}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                  </DropdownMenuItem>
                  
                  {isOwner && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleDelete} 
                        disabled={isDeleting}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Color preview */}
          <div className="mb-4" ref={colorContainerRef}>
            <div className="flex items-center gap-1.5">
              {displayColors.length > 0 ? (
                <>
                  {displayColors.map((color: string, i: number) => (
                    <div 
                      key={i} 
                      className={`w-5 h-5 rounded-lg ring-1 ${
                        theme.visibility === 'ORGANIZATION' && !isOwner 
                          ? 'ring-blue-200/50' 
                          : 'ring-gray-200/50'
                      } ring-offset-1 shadow-sm hover:scale-110 transition-transform duration-200`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  {remainingColors > 0 && (
                    <div className="text-sm font-medium text-gray-500 ml-1">
                      +{remainingColors}
                    </div>
                  )}
                </>
              ) : (
                // Skeleton colors when no colors available
                [...Array(5)].map((_, i) => (
                  <div key={i} className={`w-5 h-5 rounded-lg ${
                    theme.visibility === 'ORGANIZATION' && !isOwner 
                      ? 'bg-blue-100' 
                      : 'bg-gray-100'
                  } animate-pulse`} />
                ))
              )}
            </div>
          </div>

          {/* Metadata footer */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">{getRelativeTime(theme.updatedAt)}</span>
            </div>
            
            {theme.visibility && theme.visibility !== 'ORGANIZATION' && (
              <VisibilityBadge visibility={theme.visibility} size="sm" />
            )}
            
            {theme.visibility === 'ORGANIZATION' && theme.organization && (
              <span className="text-xs font-medium text-blue-600">
                {theme.organization.name}
              </span>
            )}
            
            {!isOwner && theme.user?.username && (
              <span className="text-xs truncate">
                by <span className="font-medium">{theme.user.username}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {isOwner && onVisibilityChange && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          theme={theme}
          userOrganization={userOrganization}
          onVisibilityChange={async (themeId, visibility) => {
            if (onVisibilityChange) {
              await onVisibilityChange(themeId, visibility);
            }
          }}
        />
      )}
      
      {/* Edit Modal */}
      {isOwner && onUpdate && (
        <ThemeEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          theme={theme}
          onSave={onUpdate}
        />
      )}
    </>
  );
}