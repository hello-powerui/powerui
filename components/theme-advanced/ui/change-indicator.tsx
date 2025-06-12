'use client';

interface ChangeIndicatorProps {
  hasChanged: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function ChangeIndicator({ hasChanged, className = '', size = 'sm' }: ChangeIndicatorProps) {
  if (!hasChanged) return null;
  
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2'
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`} />
    </div>
  );
}