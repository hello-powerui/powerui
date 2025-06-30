import React from 'react';
import Image from 'next/image';
import { getVisualIconPath } from '@/lib/theme-studio/utils/visual-icon-mapping';

interface VisualIconProps {
  visualType: string;
  className?: string;
  size?: number;
}

export function VisualIcon({ visualType, className = '', size = 16 }: VisualIconProps) {
  const iconPath = getVisualIconPath(visualType);
  
  if (!iconPath) {
    return (
      <div 
        className={`bg-gray-200 rounded flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }
  
  // URL encode the path to handle special characters and spaces
  const encodedPath = encodeURI(iconPath);
  
  return (
    <Image
      src={encodedPath}
      alt={`${visualType} icon`}
      width={size}
      height={size}
      className={className}
    />
  );
}