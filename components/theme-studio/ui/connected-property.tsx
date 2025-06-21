'use client';

interface ConnectedPropertyProps {
  children: React.ReactNode;
  isLast?: boolean;
  level?: number;
  isNested?: boolean;
}

export function ConnectedProperty({ children, isLast = false, level = 0, isNested = false }: ConnectedPropertyProps) {
  // For nested properties, just add some indentation
  if (isNested) {
    return (
      <div className="pl-4">
        {children}
      </div>
    );
  }
  
  // For regular properties, no visual connections needed
  return (
    <div>
      {children}
    </div>
  );
}