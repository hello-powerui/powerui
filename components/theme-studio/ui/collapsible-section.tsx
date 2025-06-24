'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useState, useEffect } from 'react';
import { THEME_STUDIO_TYPOGRAPHY } from '../constants/typography';
import { Eraser } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Icons
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

interface CollapsibleSectionProps {
  id?: string;
  title: string;
  tooltip?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string | number;
  className?: string;
  headerAction?: React.ReactNode;
  hasChanges?: boolean;
  changedCount?: number;
  onClear?: () => void;
  clearMessage?: string;
  hasContent?: boolean;
}

export function CollapsibleSection({ 
  id,
  title, 
  tooltip,
  icon, 
  defaultOpen = false, 
  children,
  badge,
  className = "",
  headerAction,
  hasChanges = false,
  changedCount,
  onClear,
  clearMessage = 'Clear all settings in this section?',
  hasContent = true
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Force re-render when props change
  useEffect(() => {
    // This will help debug if the component is receiving prop updates
  }, [hasChanges, title]);

  const handleClear = () => {
    setShowClearDialog(false);
    onClear?.();
  };

  return (
    <>
      <Collapsible.Root 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        className={`${className}`}
      >
        <div 
          className="flex items-center justify-between w-full px-2 py-2.5 hover:bg-gray-50 rounded-md transition-colors group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Collapsible.Trigger asChild>
            <button className="flex items-center gap-2 flex-1 text-left">
              <ChevronRightIcon 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-90' : ''
                }`} 
              />
              {icon && (
                <div className="w-4.5 h-4.5 text-gray-500">{icon}</div>
              )}
              <h3 className={`${THEME_STUDIO_TYPOGRAPHY.sectionHeader.size} text-gray-800 ${
                isOpen ? THEME_STUDIO_TYPOGRAPHY.sectionHeader.weightExpanded : THEME_STUDIO_TYPOGRAPHY.sectionHeader.weight
              }`}>{title}</h3>
              {hasChanges && (
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" title={`${changedCount || ''} ${changedCount === 1 ? 'change' : 'changes'}`} />
              )}
              {badge !== undefined && (
                <span className={`px-1.5 py-0.5 ${THEME_STUDIO_TYPOGRAPHY.metadata.size} ${THEME_STUDIO_TYPOGRAPHY.metadata.color}`}>
                  ({badge})
                </span>
              )}
            </button>
          </Collapsible.Trigger>
          <div className="flex items-center gap-1">
            {onClear && hasContent && isHovered && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowClearDialog(true);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                title={`Clear ${title.toLowerCase()} settings`}
              >
                <Eraser className="h-3 w-3 text-gray-500 hover:text-gray-700" />
              </button>
            )}
            {headerAction}
          </div>
        </div>
        
        <Collapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
          <div className="relative pl-7 pr-3 py-3">
            {/* Content area with improved spacing */}
            <div className="space-y-3">
              {children}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear {title} Settings</AlertDialogTitle>
            <AlertDialogDescription>
              {clearMessage}
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear} className="bg-red-600 hover:bg-red-700">
              Clear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}