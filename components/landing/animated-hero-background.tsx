'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DataPoint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

interface ChartBar {
  height: number;
  targetHeight: number;
  x: number;
  width: number;
  color: string;
  delay: number;
}

export function AnimatedHeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dataPointsRef = useRef<DataPoint[]>([]);
  const chartBarsRef = useRef<ChartBar[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Initialize data points and chart bars
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvasRef.current.width = rect.width * window.devicePixelRatio;
        canvasRef.current.height = rect.height * window.devicePixelRatio;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize floating data points
    const points: DataPoint[] = [];
    for (let i = 0; i < 80; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.9 + 0.3,
        speed: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.5 ? '#6b7280' : '#4b5563'
      });
    }
    dataPointsRef.current = points;

    // Initialize chart bars
    const bars: ChartBar[] = [];
    const barCount = 20;
    const barWidth = 30;
    const spacing = 15;
    const totalWidth = window.innerWidth * 0.8;
    const startX = window.innerWidth * 0.1;

    for (let i = 0; i < barCount; i++) {
      const barX = startX + (i / barCount) * totalWidth;
      bars.push({
        height: 0,
        targetHeight: Math.random() * 200 + 80,
        x: barX,
        width: barWidth,
        color: i % 2 === 0 ? '#6b7280' : '#4b5563',
        delay: i * 50
      });
    }
    chartBarsRef.current = bars;

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Draw animated background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
      bgGradient.addColorStop(0, 'rgba(107, 114, 128, 0.05)');
      bgGradient.addColorStop(0.5, 'rgba(75, 85, 99, 0.08)');
      bgGradient.addColorStop(1, 'rgba(107, 114, 128, 0.05)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }

      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Draw and update floating data points
      dataPointsRef.current.forEach((point) => {
        // Calculate distance from mouse
        const distance = Math.sqrt(
          Math.pow(point.x - mousePositionRef.current.x, 2) +
          Math.pow(point.y - mousePositionRef.current.y, 2)
        );

        // Repel from mouse
        if (distance < 100) {
          const angle = Math.atan2(
            point.y - mousePositionRef.current.y,
            point.x - mousePositionRef.current.x
          );
          point.x += Math.cos(angle) * 2;
          point.y += Math.sin(angle) * 2;
        }

        // Update position
        point.y -= point.speed;
        if (point.y < -10) {
          point.y = dimensions.height + 10;
          point.x = Math.random() * dimensions.width;
        }

        // Draw connections to nearby points
        dataPointsRef.current.forEach((otherPoint) => {
          if (point !== otherPoint) {
            const dist = Math.sqrt(
              Math.pow(point.x - otherPoint.x, 2) +
              Math.pow(point.y - otherPoint.y, 2)
            );
            if (dist < 150) {
              ctx.strokeStyle = `rgba(107, 114, 128, ${0.3 * (1 - dist / 150)})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.stroke();
            }
          }
        });

        // Draw point with glow effect
        const glowSize = point.size * 3;
        const glowGradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowSize
        );
        glowGradient.addColorStop(0, point.color + '60');
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid point
        ctx.fillStyle = point.color + Math.floor(point.opacity * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw animated wave pattern
      ctx.strokeStyle = 'rgba(107, 114, 128, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < dimensions.width; x += 5) {
        const y = dimensions.height / 2 + Math.sin((x + elapsed * 0.001) * 0.01) * 100 + 
                  Math.sin((x + elapsed * 0.002) * 0.02) * 50;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw animated chart bars
      chartBarsRef.current.forEach((bar, index) => {
        if (elapsed > bar.delay) {
          // Animate bar height
          bar.height += (bar.targetHeight - bar.height) * 0.1;

          // Randomly change target height occasionally
          if (Math.random() < 0.01) {
            bar.targetHeight = Math.random() * 200 + 80;
          }

          // Draw bar with gradient
          const gradient = ctx.createLinearGradient(
            bar.x,
            dimensions.height - bar.height,
            bar.x,
            dimensions.height
          );
          gradient.addColorStop(0, bar.color + '80');
          gradient.addColorStop(1, bar.color + 'EE');

          ctx.fillStyle = gradient;
          ctx.fillRect(
            bar.x,
            dimensions.height - bar.height - 100,
            bar.width,
            bar.height
          );

          // Removed bar top highlight for cleaner look
        }
      });

      // Draw subtle radial gradient overlay
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const radius = Math.max(dimensions.width, dimensions.height);
      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      radialGradient.addColorStop(0, 'rgba(107, 114, 128, 0.2)');
      radialGradient.addColorStop(0.5, 'rgba(75, 85, 99, 0.1)');
      radialGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/60" />
    </div>
  );
}