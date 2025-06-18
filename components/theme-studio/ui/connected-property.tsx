'use client';

interface ConnectedPropertyProps {
  children: React.ReactNode;
  isLast?: boolean;
  level?: number;
  isNested?: boolean;
}

export function ConnectedProperty({ children, isLast = false, level = 0, isNested = false }: ConnectedPropertyProps) {
  // For nested properties, use a smaller, more subtle connection
  if (isNested) {
    return (
      <div className="relative pl-4">
        {/* L-shaped connector for nested items */}
        {!isLast && (
          <div 
            className="absolute left-0 top-[13px] h-full w-px bg-gray-200 opacity-60"
            aria-hidden="true"
          />
        )}
        <div 
          className="absolute left-0 top-[13px] w-[12px] h-px bg-gray-200 opacity-60"
          aria-hidden="true"
        />
        
        <div className="pl-4">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* L-shaped connector */}
      <div className="absolute left-[-15px] -top-2 bottom-0" aria-hidden="true">
        {/* Vertical part - from top to connect to previous item's vertical line */}
        <div 
          className="absolute left-0 top-0 w-px bg-gray-200"
          style={{ height: '21px' }}
        />
        {/* Horizontal part at the connection point */}
        <div 
          className="absolute left-0 top-[21px] w-[11px] h-px bg-gray-200"
        />
        {/* Vertical part continuing down - only if not last */}
        {!isLast && (
          <div 
            className="absolute left-0 top-[21px] bottom-0 w-px bg-gray-200"
          />
        )}
      </div>
      
      <div className="pl-2">
        {children}
      </div>
    </div>
  );
}