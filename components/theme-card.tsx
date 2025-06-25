'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisibilityBadge } from '@/components/theme-sharing-controls';
import { ShareModal } from '@/components/share-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Copy, Download, Share2, Trash2 } from 'lucide-react';
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
  isTeamTheme = false,
}: ThemeCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
      await onDuplicate(theme.id);
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
  const previewColors = theme.previewColors || 
    (theme.themeData?.dataColors?.slice(0, 5)) || 
    (theme.themeData?.palette?.colors?.slice(0, 5)) ||
    [];

  return (
    <>
      <div className={`bg-white/95 backdrop-blur-sm p-4 rounded-xl border ${theme.visibility === 'ORGANIZATION' && !isOwner ? 'border-blue-200/50 hover:border-blue-300' : 'border-gray-200/50 hover:border-gray-300'} hover:shadow-md transition-all group`}>
      {/* Header with title and dropdown */}
      <div className="flex items-start justify-between mb-2">
        <Link href={`/themes/studio?themeId=${theme.id}`} className="flex-1">
          <h3 className="font-medium text-gray-900 group-hover:text-gray-700">{theme.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
          {/* Share button */}
          {isOwner && onVisibilityChange && (
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
              title="Share theme"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
          
          {/* Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 -mr-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/themes/studio?themeId=${theme.id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate} disabled={isDuplicating}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
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

      {/* Metadata */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>{getRelativeTime(theme.updatedAt)}</span>
        {theme.visibility && (
          <>
            <span>•</span>
            <VisibilityBadge visibility={theme.visibility} size="sm" />
          </>
        )}
        {theme.visibility === 'ORGANIZATION' && theme.organization && (
          <>
            <span>•</span>
            <span className="text-xs font-medium text-blue-600">{theme.organization.name}</span>
          </>
        )}
        {!isOwner && theme.user?.username && (
          <>
            <span>•</span>
            <span className="text-xs">by {theme.user.username}</span>
          </>
        )}
      </div>
      
      {/* Color preview */}
      <div className="flex gap-1">
        {previewColors.length > 0 ? (
          previewColors.map((color: string, i: number) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full ring-1 ${theme.visibility === 'ORGANIZATION' && !isOwner ? 'ring-blue-200' : 'ring-gray-200'} ring-offset-1`}
              style={{ backgroundColor: color }}
            />
          ))
        ) : (
          [...Array(5)].map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${theme.visibility === 'ORGANIZATION' && !isOwner ? 'bg-blue-100' : 'bg-gray-200'}`} />
          ))
        )}
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
    </>
  );
}