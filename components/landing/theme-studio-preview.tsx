'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

export function ThemeStudioPreview() {
  const [activeControl, setActiveControl] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 30, y: 40 });
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [pendingChange, setPendingChange] = useState<number | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cycle through different controls with proper timing
  useEffect(() => {
    const interval = setInterval(() => {
      const nextControl = (activeControl + 1) % 5;
      
      // Start click animation
      setIsClicking(true);
      setPendingChange(nextControl);
      
      // After click animation, apply the change
      setTimeout(() => {
        setActiveControl(nextControl);
        setIsClicking(false);
        setPendingChange(null);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeControl]);

  // Mouse animation positions for each control
  const controlPositions = useMemo(() => {
    return isMobile ? [
      { x: 20, y: 25, dataColor: 0 },     // Data color 1
      { x: 45, y: 25, dataColor: 1 },     // Data color 2
      { x: 70, y: 25, dataColor: 2 },     // Data color 3
      { x: 20, y: 50, theme: 'dark' },    // Theme mode
      { x: 200, y: 30, borders: true },   // Borders
    ] : [
      { x: 30, y: 40, dataColor: 0 },     // Data color 1
      { x: 60, y: 40, dataColor: 1 },     // Data color 2
      { x: 90, y: 40, dataColor: 2 },     // Data color 3
      { x: 30, y: 90, theme: 'dark' },    // Theme mode
      { x: 350, y: 50, borders: true },   // Borders
    ];
  }, [isMobile]);

  useEffect(() => {
    const target = controlPositions[activeControl];
    setMousePosition({ x: target.x, y: target.y });
  }, [activeControl, isMobile, controlPositions]);

  const dataColors = ['#3b82f6', '#10b981', '#f59e0b'];
  const currentDataColor = controlPositions[activeControl].dataColor !== undefined 
    ? dataColors[controlPositions[activeControl].dataColor] 
    : dataColors[0];
  const currentTheme = controlPositions[activeControl].theme || 'light';
  const showBorders = controlPositions[activeControl].borders || false;

  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Left Sidebar - Foundation */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 bg-gray-50 border-r border-gray-200",
        isMobile ? "w-20 p-1" : "w-28 p-2"
      )}>
        <div className="h-1.5 w-12 bg-gray-300 rounded mb-2" />
        <div className="flex gap-1 mb-3">
          {dataColors.map((color, i) => (
            <div
              key={i}
              className={cn(
                "w-6 h-6 rounded transition-all duration-300",
                activeControl === i && "ring-2 ring-offset-1 ring-current"
              )}
              style={{ 
                backgroundColor: color,
                color: color
              }}
            />
          ))}
        </div>
        
        {!isMobile && (
          <>
            <div className="h-1.5 w-10 bg-gray-300 rounded mb-2" />
            <div className="flex gap-1 mb-3">
              <div className="w-4 h-4 bg-gray-900 rounded" />
              <div className="w-4 h-4 bg-gray-600 rounded" />
              <div className="w-4 h-4 bg-gray-400 rounded" />
              <div className="w-4 h-4 bg-gray-200 rounded" />
            </div>
          </>
        )}
        
        <div className="h-1.5 w-8 bg-gray-300 rounded mb-2" />
        <div className={cn(
          "h-6 bg-gray-200 rounded flex items-center justify-center transition-all duration-300",
          activeControl === 3 && "ring-2 ring-gray-600 bg-gray-800"
        )}>
          <div className={cn(
            "h-1 w-8 rounded transition-all duration-300",
            currentTheme === 'dark' ? 'bg-gray-400' : 'bg-gray-400'
          )} />
        </div>
      </div>

      {/* Center - Dashboard Preview */}
      <div className={cn(
        "absolute top-0 bottom-0",
        isMobile ? "left-20 right-12 p-2" : "left-28 right-24 p-3"
      )}>
        <div className={cn(
          "h-full rounded-lg p-3 transition-all duration-500",
          currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        )}>
          {/* Header */}
          <div className={cn(
            "px-3 py-2 rounded mb-2 transition-all duration-300 flex items-center justify-between",
            currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white',
            showBorders && 'border border-gray-400'
          )}>
            <div className={cn(
              "h-2 w-20 rounded",
              currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            )} />
            {!isMobile && (
              <div className={cn(
                "h-1.5 w-12 rounded",
                currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              )} />
            )}
          </div>
          
          {/* KPI Cards */}
          <div className={cn(
            "grid gap-2 mb-3",
            isMobile ? "grid-cols-2" : "grid-cols-3"
          )}>
            {[1, 2, isMobile ? null : 3].filter(Boolean).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded transition-all duration-300 overflow-hidden",
                  currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white',
                  showBorders && 'border border-gray-400'
                )}
              >
                <div
                  className="h-2 transition-all duration-300"
                  style={{ backgroundColor: currentDataColor }}
                />
                <div className="p-2">
                  <div className={cn(
                    "h-1 w-8 rounded mb-1",
                    currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                  )} />
                  <div className={cn(
                    "h-2 w-12 rounded",
                    currentTheme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                  )} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className={cn(
            "grid gap-2 flex-grow",
            isMobile ? "grid-cols-1" : "grid-cols-2 h-24"
          )}>
            {/* Bar Chart */}
            <div className={cn(
              "p-2 transition-all duration-300 flex flex-col h-full",
              currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white',
              showBorders && 'border border-gray-400 rounded'
            )}>
              <div className={cn(
                "h-1 w-14 rounded mb-1",
                currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
              )} />
              <div className="flex items-end justify-between flex-grow gap-1">
                {[70, 50, 85, 60, 75].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 transition-all duration-300"
                    style={{
                      background: currentDataColor,
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Line Chart */}
            {!isMobile && (
              <div className={cn(
                "p-2 transition-all duration-300 flex flex-col h-full",
                currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white',
                showBorders && 'border border-gray-400 rounded'
              )}>
                <div className={cn(
                  "h-1 w-12 rounded mb-1",
                  currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                )} />
                <svg className="flex-grow w-full" viewBox="0 0 100 48" preserveAspectRatio="none">
                  <polyline
                    points="10,35 30,20 50,25 70,10 90,15"
                    fill="none"
                    stroke={currentDataColor}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Visual Styles */}
      <div className={cn(
        "absolute right-0 top-0 bottom-0 bg-gray-50 border-l border-gray-200",
        isMobile ? "w-12 p-1" : "w-24 p-2"
      )}>
        <div className="h-1.5 w-8 bg-gray-300 rounded mb-2" />
        
        {/* Borders toggle */}
        <div className={cn(
          "h-6 bg-gray-200 rounded flex items-center justify-center transition-all duration-300 mb-2",
          activeControl === 4 && showBorders && "ring-2 ring-gray-600 bg-gray-300"
        )}>
          <div className="h-1 w-10 bg-gray-400 rounded" />
        </div>
        
        {!isMobile && (
          <>
            <div className="h-6 bg-gray-200 rounded flex items-center justify-center mb-2">
              <div className="h-1 w-10 bg-gray-400 rounded" />
            </div>
            <div className="h-6 bg-gray-200 rounded flex items-center justify-center mb-2">
              <div className="h-1 w-8 bg-gray-400 rounded" />
            </div>
            
            {/* Additional style options */}
            <div className="h-1.5 w-10 bg-gray-300 rounded mb-2 mt-4" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded flex items-center px-1">
                <div className="h-2 w-2 bg-gray-400 rounded-sm mr-1" />
                <div className="h-1 w-8 bg-gray-400 rounded" />
              </div>
              <div className="h-4 bg-gray-200 rounded flex items-center px-1">
                <div className="h-2 w-2 bg-gray-400 rounded-sm mr-1" />
                <div className="h-1 w-6 bg-gray-400 rounded" />
              </div>
              <div className="h-4 bg-gray-200 rounded flex items-center px-1">
                <div className="h-2 w-2 bg-gray-400 rounded-sm mr-1" />
                <div className="h-1 w-10 bg-gray-400 rounded" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Animated Mouse Cursor */}
      <div
        className="absolute pointer-events-none transition-all duration-1000 ease-in-out z-10"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className="relative">
          {/* Mouse cursor */}
          <svg width="20" height="20" viewBox="0 0 20 20" className="absolute">
            <path
              d="M0 0 L0 14 L4 11 L6.5 16 L9 15 L6.5 10 L11 9 Z"
              fill="#374151"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          {/* Click ripple at tip of cursor */}
          {isClicking && (
            <div className="absolute -top-1 -left-1">
              <div className="w-4 h-4 bg-gray-400/40 rounded-full animate-ping" />
              <div className="absolute inset-0 w-4 h-4 bg-gray-400/20 rounded-full animate-ping animation-delay-100" />
            </div>
          )}
        </div>
      </div>

      {/* Labels */}
      {!isMobile && (
        <>
          <div className="absolute bottom-1 left-1 text-[6px] text-gray-400">Foundation</div>
          <div className="absolute bottom-1 right-1 text-[6px] text-gray-400">Styles</div>
        </>
      )}
    </div>
  );
}