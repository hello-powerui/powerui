'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { WelcomeModal } from '@/components/ui/welcome-modal';

import { ExampleReportsShowcase } from '@/components/example-reports/ExampleReportsShowcase';
import { ThemeCard } from '@/components/theme-card';

// Icons
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconLibraryIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

interface Theme {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  themeData: any;
  visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
  organizationId?: string;
  organization?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    plan: 'PRO' | 'TEAM';
    username?: string;
  };
  previewColors?: string[];
}

interface Asset {
  id: number;
  name: string;
  type: string;
  size: string;
  icon: () => React.ReactElement;
  isLink?: boolean;
  href?: string;
  isDownloadable?: boolean;
  downloadPath?: string;
}

const mockAssets: Asset[] = [
  { id: 1, name: 'Power UI Figma Design System', type: 'FIG', size: '7MB', icon: FileIcon },
  { id: 2, name: 'Spacing Grids', type: 'PBIX', size: '209KB', icon: FileIcon, isDownloadable: true, downloadPath: '/downloads/assets/SpacingGrids.pbix' },
  { id: 3, name: 'Icon Library', type: 'WEB', size: '1,400+ icons', icon: IconLibraryIcon, isLink: true, href: '/icons' },
];


// Helper function to get relative time
function getRelativeTime(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMins > 0) {
    return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else {
    return 'Just now';
  }
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [userOrganization, setUserOrganization] = useState<{ id: string; name: string } | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Check for successful payment redirect
  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      // Redirect to success page
      router.replace(`/success?success=true&session_id=${sessionId}`);
    }
  }, [searchParams, router]);
  
  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    fetchThemes();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user/me');
      if (response.ok) {
        const data = await response.json();
        setUserOrganization(data.organization || null);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/themes');
      if (response.ok) {
        const data = await response.json();
        
        // Show first 3 themes (includes both personal and organization themes)
        setThemes(data.slice(0, 3));
        
        // Check if user is new (no themes created)
        if (data.length === 0) {
          setIsNewUser(true);
        }
      }
    } catch (error) {
      // console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeModal isNewUser={isNewUser} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to Power UI</h1>
          <p className="mt-1 text-sm text-gray-600">Build beautiful, professional Power BI dashboards</p>
        </div>
        
        {/* My Themes Section */}
        <div className="mb-8 relative">
          {/* Geometric Pattern Background */}
          <div className="absolute inset-0 -inset-x-4 sm:-inset-x-6 lg:-inset-x-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="0.5"/>
                  <circle cx="20" cy="20" r="2" fill="rgba(156, 163, 175, 0.1)"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
            </svg>
          </div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">My Themes</h2>
                <p className="text-sm text-gray-600 mt-1">Create and manage your Power BI themes</p>
              </div>
              <Link href="/themes/studio" className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm">
                <PlusIcon />
                <span>New Theme</span>
              </Link>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading ? (
              // Show loading placeholders
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </div>
              ))
            ) : themes.length === 0 ? (
              // No themes yet
              <div className="col-span-full bg-white p-8 rounded-lg border border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">No themes created yet</p>
                <Link href="/themes/studio" className="text-sm text-gray-900 hover:underline">
                  Create your first theme →
                </Link>
              </div>
            ) : (
              // Show actual themes
              themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isOwner={theme.user?.id === user?.id}
                  currentUserId={user?.id}
                  userOrganization={userOrganization}
                  onDelete={async (themeId, themeName) => {
                    // Delegate to themes page for deletion
                    router.push('/themes');
                  }}
                  onDuplicate={async (themeId) => {
                    // Delegate to themes page for duplication
                    router.push('/themes');
                  }}
                  onUpdate={async (themeId, name, description) => {
                    try {
                      const response = await fetch(`/api/themes/${themeId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                          name, 
                          description,
                          themeData: theme.themeData // Include existing themeData
                        }),
                      });
                      if (response.ok) {
                        // Update the theme in local state
                        setThemes(themes.map(t => 
                          t.id === themeId ? { ...t, name, description } : t
                        ));
                      }
                    } catch (error) {
                      console.error('Failed to update theme:', error);
                    }
                  }}
                  onVisibilityChange={async (themeId, visibility) => {
                    try {
                      const response = await fetch(`/api/themes/${themeId}/visibility`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ visibility }),
                      });
                      if (response.ok) {
                        // Update the theme in local state
                        setThemes(themes.map(t => 
                          t.id === themeId ? { ...t, visibility } : t
                        ));
                      }
                    } catch (error) {
                      console.error('Failed to update theme visibility:', error);
                    }
                  }}
                />
              ))
            )}
            {themes.length > 0 && (
              <Link href="/themes" className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-center text-sm text-gray-600 hover:text-gray-900">
                View all themes →
              </Link>
            )}
          </div>
          </div>
        </div>


        {/* Power UI Assets */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Power UI Assets</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {mockAssets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <asset.icon />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{asset.name}</h3>
                      <p className="text-xs text-gray-500">{asset.type} • {asset.size}</p>
                    </div>
                  </div>
                  {asset.isLink ? (
                    <Link href={asset.href!} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <span>View →</span>
                    </Link>
                  ) : asset.isDownloadable ? (
                    <a 
                      href={asset.downloadPath} 
                      download 
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      <DownloadIcon />
                      <span>Download</span>
                    </a>
                  ) : (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors opacity-50 cursor-not-allowed" disabled>
                      <DownloadIcon />
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example Reports */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Example Reports</h2>
          <ExampleReportsShowcase />
        </div>
      </div>
    </div>
  )
}