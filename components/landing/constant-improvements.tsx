'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, RefreshCw, Rocket } from 'lucide-react';

export function ConstantImprovements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
        
        // Calculate scroll progress (0 to 1)
        const sectionHeight = rect.height;
        const scrolled = windowHeight - rect.top;
        // Adjust the divisor to make the progress complete earlier
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.7)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const improvements = [
    {
      icon: Zap,
      title: 'Monthly Updates',
      description: 'New features and improvements every month',
      delay: 0
    },
    {
      icon: Sparkles,
      title: 'User-Driven Features',
      description: 'Your feedback shapes our roadmap',
      delay: 100
    },
    {
      icon: RefreshCw,
      title: 'Always Current',
      description: 'Stay current with Power BI updates',
      delay: 200
    },
    {
      icon: Rocket,
      title: 'Performance Optimized',
      description: 'Faster and smoother with each release',
      delay: 300
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated text */}
        <div className="text-center mb-16 relative">
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Constantly Improving
          </h2>
          <p 
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Power UI evolves with your needs. Every update brings new features, improvements, and refinements based on user feedback.
          </p>
        </div>

        {/* Animated progress line */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
          
          {/* Improvement cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {improvements.map((item, index) => {
              const Icon = item.icon;
              const cardProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 2));
              const scale = 0.8 + (cardProgress * 0.2);
              const opacity = cardProgress;
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-700`}
                  style={{
                    transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : 20}px)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${item.delay}ms`
                  }}
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated timeline visualization */}
        <div className="relative h-32 mb-12">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            {/* Animated path */}
            <path
              d={`M 0,50 Q 250,${30 + Math.sin(scrollProgress * Math.PI) * 20} 500,50 T 1000,50`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="transition-all duration-300"
              style={{
                strokeDashoffset: -scrollProgress * 100
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Floating elements */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${50 + Math.sin((scrollProgress + i * 0.2) * Math.PI * 2) * 30}%`,
                transform: `scale(${0.5 + Math.sin((scrollProgress + i * 0.3) * Math.PI) * 0.5})`,
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.3s ease-out'
              }}
            />
          ))}
        </div>

        {/* CTA to roadmap */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold mb-4">See what&apos;s coming next</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Check out our public roadmap to see upcoming features and vote on what matters most to you.
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all hover:gap-3 group"
          >
            View Roadmap
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}