'use client';

import { Calendar, CheckCircle2, Clock, Zap, Sparkles, Palette, Users, Code, FileText, Shield } from 'lucide-react';

interface Release {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  title: string;
  description?: string;
  features: {
    category: string;
    icon: React.ElementType;
    items: string[];
  }[];
}

const releases: Release[] = [
  {
    version: '3.0',
    date: 'January 2025',
    type: 'major',
    title: 'Next-Generation Theme Studio',
    description: 'A complete reimagining of Power UI. Built from the ground up with a modern architecture, real-time preview, and powerful new features that transform how you create Power BI themes.',
    features: [
      {
        category: 'Theme Studio',
        icon: Sparkles,
        items: [
          'Brand new visual theme editor with live Power BI preview',
          'Real-time preview updates as you design',
          'Import existing Power BI themes for editing',
          'Visual focus mode for editing specific chart types',
          'Auto-save with change tracking indicators',
          'Professional JSON export with validation'
        ]
      },
      {
        category: 'Design System',
        icon: Palette,
        items: [
          'Token-based color system for light/dark modes',
          'Pre-built professional color palettes',
          'Azure-inspired neutral palettes',
          'Global typography controls',
          'Canvas and layout customization',
          'Structural color definitions'
        ]
      },
      {
        category: 'Team Features',
        icon: Users,
        items: [
          'Organization-based theme sharing',
          'Public theme marketplace',
          'Team member management portal',
          'Theme visibility controls (Private/Org/Public)',
          'Collaborative theme editing',
          'License management dashboard'
        ]
      },
      {
        category: 'Developer Experience',
        icon: Code,
        items: [
          'Built with Next.js 14 and TypeScript',
          'Zustand state management',
          'Prisma ORM with PostgreSQL',
          'RESTful API architecture',
          'Component-level error boundaries',
          'Optimized performance with memoization'
        ]
      },
      {
        category: 'Resources & Icons',
        icon: FileText,
        items: [
          '1,400+ Lucide icons with dynamic colors',
          'CSV export for bulk icon import',
          'Interactive example report showcase',
          'Downloadable PBIX templates',
          'Spacing grids template',
          'Comprehensive documentation'
        ]
      }
    ]
  },
  {
    version: '2.5',
    date: 'November 2024',
    type: 'minor',
    title: 'Style Presets & Enhanced Customization',
    features: [
      {
        category: 'Visual Enhancements',
        icon: Sparkles,
        items: [
          '55+ style presets for visuals, buttons, and cards',
          'Adjustable visual padding (16px to 20px)',
          'New border options: subtle and no border',
          'Enhanced visual consistency controls'
        ]
      },
      {
        category: 'Example Reports',
        icon: FileText,
        items: [
          '15+ new professionally designed reports',
          'Improved data models and layouts',
          'PBIX files available for Pro members',
          'Category-based organization'
        ]
      }
    ]
  },
  {
    version: '2.0',
    date: 'August 2024',
    type: 'major',
    title: 'Theme Generator & Icon Library',
    features: [
      {
        category: 'Core Features',
        icon: Zap,
        items: [
          'Introduced visual theme generator',
          'Dynamic theme preview',
          'Font customization across reports',
          'Border radius controls for all visuals',
          'Transition to LemonSqueezy payments'
        ]
      },
      {
        category: 'Icon System',
        icon: Palette,
        items: [
          '1,000+ icons hosted in Azure',
          'Direct Power BI Desktop integration',
          'Clean and consistent icon designs',
          'URL-based icon access'
        ]
      }
    ]
  },
  {
    version: '1.0',
    date: 'June 2024',
    type: 'major',
    title: 'Power UI Launch',
    features: [
      {
        category: 'Initial Release',
        icon: Sparkles,
        items: [
          'Basic theme generator functionality',
          'Color palette management',
          'Font selection options',
          'JSON export for Power BI',
          'Example report templates',
          'Foundation for future development'
        ]
      }
    ]
  }
];

const upcomingFeatures = [
  {
    title: 'AI Theme Assistant',
    description: 'Natural language theme generation and intelligent color suggestions',
    status: 'In Development'
  },
  {
    title: 'Brand Palette Generator',
    description: 'Upload your logo or brand guidelines to auto-generate matching palettes',
    status: 'In Development'
  },
  {
    title: 'Microsoft Fabric Integration',
    description: 'Seamless theme deployment to Fabric workflows and workspaces',
    status: 'In Development'
  },
  {
    title: 'API Access',
    description: 'Programmatic theme generation and management via REST API',
    status: 'Planning'
  },
  {
    title: 'Version History',
    description: 'Track changes and rollback to previous theme versions',
    status: 'Planning'
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>Always Improving</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Changelog & Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track our journey as we build the future of Power BI theming. 
            With lifetime access, every update is yours at no extra cost.
          </p>
        </div>
      </section>

      {/* Currently Working On */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <Clock className="w-6 h-6 text-blue-500" />
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold">Currently Working On</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFeatures.slice(0, 3).map((feature, i) => (
              <div key={i} className="bg-white rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {feature.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Release Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Calendar className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold">Release History</h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent"></div>
            
            {/* Releases */}
            <div className="space-y-16">
              {releases.map((release, index) => (
                <div key={release.version} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                      release.type === 'major' 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                        : 'bg-white border-2 border-gray-300'
                    }`}>
                      <span className={`font-bold ${
                        release.type === 'major' ? 'text-white' : 'text-gray-700'
                      }`}>
                        {release.version}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{release.title}</h3>
                            <p className="text-gray-500 text-sm">{release.date}</p>
                          </div>
                          {release.type === 'major' && (
                            <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                              Major Release
                            </span>
                          )}
                        </div>
                        {release.description && (
                          <p className="text-gray-600 mt-3">{release.description}</p>
                        )}
                      </div>
                      
                      {/* Features */}
                      <div className="p-6 space-y-6">
                        {release.features.map((category, i) => (
                          <div key={i}>
                            <div className="flex items-center gap-2 mb-3">
                              <category.icon className="w-5 h-5 text-gray-700" />
                              <h4 className="font-semibold text-gray-900">{category.category}</h4>
                            </div>
                            <ul className="space-y-2">
                              {category.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold">Product Roadmap</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="grid gap-4">
              {upcomingFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === 'In Development' 
                      ? 'bg-blue-100 text-blue-700' 
                      : feature.status === 'Planning'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {feature.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}