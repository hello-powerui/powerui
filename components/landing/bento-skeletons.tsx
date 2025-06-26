'use client';

import { cn } from '@/lib/utils';
import { Eye, ChevronRight } from 'lucide-react';

// Base skeleton component
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
  );
}

// Theme Studio skeleton components
export function ThemeStudioSkeleton() {
  return (
    <div className="scale-[0.8] origin-top-left w-[125%]">
      {/* Color palette section */}
      <div className="mb-3">
        <Skeleton className="h-2 w-16 mb-2" />
        <div className="flex gap-1">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </div>
      
      {/* Input fields */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-full rounded" />
      </div>
      
      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
      </div>
    </div>
  );
}

// Visual style skeleton with animated column charts
export function VisualStyleSkeleton() {
  return (
    <div className="space-y-4">
      {/* Style variant examples */}
      <div className="space-y-3">
        {/* Default Column Chart */}
        <div>
          <p className="text-[10px] text-gray-500 mb-1">Default</p>
          <div className="bg-gray-50 p-2 rounded relative h-12">
            <div className="flex items-end justify-between h-full gap-0.5">
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '75%', animationDelay: '0.05s' }} />
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '50%', animationDelay: '0.1s' }} />
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '90%', animationDelay: '0.15s' }} />
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '60%', animationDelay: '0.2s' }} />
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '80%', animationDelay: '0.25s' }} />
              <div className="flex-1 bg-gray-400 animate-grow-bar" style={{ height: '45%', animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
        
        {/* Outlined Column Chart */}
        <div>
          <p className="text-[10px] text-gray-500 mb-1">Outlined</p>
          <div className="bg-gray-50 p-2 rounded relative h-12">
            <div className="flex items-end justify-between h-full gap-0.5">
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '75%', animationDelay: '0.05s' }} />
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '50%', animationDelay: '0.1s' }} />
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '90%', animationDelay: '0.15s' }} />
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '60%', animationDelay: '0.2s' }} />
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '80%', animationDelay: '0.25s' }} />
              <div className="flex-1 bg-white border border-gray-300 animate-grow-bar" style={{ height: '45%', animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
        
        {/* Column Chart with Labels */}
        <div>
          <p className="text-[10px] text-gray-500 mb-1">With Labels</p>
          <div className="bg-gray-50 p-2 rounded relative h-14">
            <div className="flex items-end justify-between h-full gap-0.5">
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '0.5s' }}>75</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '75%', animationDelay: '0.05s' }} />
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '0.6s' }}>50</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '50%', animationDelay: '0.1s' }} />
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '0.7s' }}>90</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '90%', animationDelay: '0.15s' }} />
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '0.8s' }}>60</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '60%', animationDelay: '0.2s' }} />
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '0.9s' }}>80</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '80%', animationDelay: '0.25s' }} />
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 animate-fade-in-label" style={{ animationDelay: '1s' }}>45</div>
                <div className="bg-gray-500 animate-grow-bar absolute bottom-0 left-0 right-0" style={{ height: '45%', animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Power BI dashboard skeleton
export function DashboardSkeleton() {
  return (
    <div className="relative">
      {/* Power BI Logo with pulsing background */}
      <div className="absolute -top-3 -left-3 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" />
          <div className="relative bg-yellow-100 rounded-full p-2">
            <img src="/icons/pbi-logo.svg" alt="Power BI" className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      {/* Live preview indicator */}
      <div className="absolute -top-2 right-0 flex items-center gap-1.5 z-10">
        <Eye className="h-3.5 w-3.5 text-red-500" />
        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-red-600">LIVE</span>
      </div>
      
      <div className="p-2 bg-gray-50 rounded">
        {/* Header */}
        <div className="flex justify-between mb-2">
          <Skeleton className="h-3 w-20" />
          <div className="flex gap-1">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-3 rounded-sm" />
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-2 gap-1">
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

// Light/Dark mode skeleton
export function ThemeModeSkeleton({ mode = 'light' }: { mode?: 'light' | 'dark' }) {
  const bgColor = mode === 'light' ? 'bg-white' : 'bg-gray-900';
  const skeletonColor = mode === 'light' ? 'bg-gray-200' : 'bg-gray-700';
  
  return (
    <div className={cn("p-3 rounded-lg border", bgColor, mode === 'light' ? 'border-gray-200' : 'border-gray-700')}>
      {/* Mini dashboard layout */}
      <div className={cn("h-2 w-12 mb-2 rounded", skeletonColor)} />
      <div className="grid grid-cols-2 gap-1">
        <div className={cn("h-6 rounded", skeletonColor)} />
        <div className={cn("h-6 rounded", skeletonColor)} />
      </div>
    </div>
  );
}

// Organization/Team skeleton
export function TeamSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      {/* Org name */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-2 w-20" />
        <div className="flex -space-x-2">
          <div className="h-5 w-5 rounded-full bg-gray-300 border-2 border-white" />
          <div className="h-5 w-5 rounded-full bg-gray-400 border-2 border-white" />
          <div className="h-5 w-5 rounded-full bg-gray-500 border-2 border-white" />
          <div className="h-5 w-5 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">+3</span>
          </div>
        </div>
      </div>
      
      {/* Brand palette */}
      <div>
        <Skeleton className="h-1.5 w-16 mb-2" />
        <div className="flex gap-1">
          <div className="h-6 w-6 rounded bg-blue-500" />
          <div className="h-6 w-6 rounded bg-green-500" />
          <div className="h-6 w-6 rounded bg-orange-500" />
          <div className="h-6 w-6 rounded bg-purple-500" />
          <div className="h-6 w-6 rounded bg-red-500" />
        </div>
      </div>
      
      {/* Shared themes */}
      <div>
        <Skeleton className="h-1.5 w-14 mb-2" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <Skeleton className="h-1.5 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            <Skeleton className="h-1.5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Template grid skeleton
export function TemplateGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-[4/3]">
          <Skeleton className="h-full w-full rounded" />
        </div>
      ))}
    </div>
  );
}

// Mini Example Reports for Templates
export function MiniExampleReports() {
  const miniExamples = [
    { name: 'Aura Coast', color: '#fdfaf4', image: '/example-reports/Aura Coast.png' },
    { name: 'Love', color: '#fff8f8', image: '/example-reports/Love.png' },
    { name: 'Orbital', color: '#fafff6', image: '/example-reports/Orbital.png' },
    { name: 'Electronics', color: '#f6f9ff', image: '/example-reports/Electronics.png' },
    { name: 'OECD Global', color: '#f1f3f4', image: '/example-reports/OECD Global Health & Safety.png' },
    { name: 'Vertex', color: '#FFFCF8', image: '/example-reports/Vertex.png' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {miniExamples.map((example, i) => (
        <div
          key={i}
          className="aspect-[4/3] rounded-md overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
          style={{ backgroundColor: example.color }}
        >
          {/* Dashboard image container - positioned to show top-left corner */}
          <div className="absolute inset-0 p-1">
            <div className="relative w-full h-full overflow-hidden rounded-t-sm">
              <img
                src={example.image}
                alt={example.name}
                className="absolute left-0 top-0 w-[150%] max-w-none shadow-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Figma integration skeleton
export function FigmaIntegrationSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center relative">
        {/* Figma logo */}
        <div className="relative z-10">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <img src="/icons/figma-logo.svg" alt="Figma" className="h-8 w-8" />
          </div>
        </div>
        
        {/* Animated connection line */}
        <div className="relative w-24 h-0.5 mx-2">
          <div className="absolute inset-0 bg-gray-200" />
          {/* Moving dot */}
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full animate-slide-across" />
        </div>
        
        {/* Power BI logo */}
        <div className="relative z-10">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <img src="/icons/pbi-logo.svg" alt="Power BI" className="h-8 w-8" />
          </div>
        </div>
      </div>
      
      {/* Preview link */}
      <a 
        href="https://www.figma.com/community/file/1106659658691381850" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 transition-colors"
      >
        Preview the Figma UI kit <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  );
}