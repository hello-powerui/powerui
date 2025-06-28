'use client';

import { useRouter, redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeCard } from '@/components/theme-card';
import { ChevronLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

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

export default function ThemesPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [myThemes, setMyThemes] = useState<Theme[]>([]);
  const [publicThemes, setPublicThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-themes');
  const [userPlan, setUserPlan] = useState<'PRO' | 'TEAM'>('PRO');
  const [userOrganization, setUserOrganization] = useState<{ id: string; name: string } | null>(null);
  
  // Redirect to sign-in if not authenticated
  if (isLoaded && !isSignedIn) {
    redirect('/sign-in');
  }

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user/me');
      if (response.ok) {
        const data = await response.json();
        setUserPlan(data.plan || 'PRO');
        setUserOrganization(data.organization || null);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const fetchAllThemes = useCallback(async () => {
    try {
      // Fetch user's themes
      const [myThemesResponse, publicThemesResponse] = await Promise.all([
        fetch('/api/themes'),
        fetch('/api/themes/public')
      ]);

      if (myThemesResponse.ok) {
        const data = await myThemesResponse.json();
        // My themes include all themes (both owned and organization themes)
        setMyThemes(data);
      }

      if (publicThemesResponse.ok) {
        const data = await publicThemesResponse.json();
        setPublicThemes(data.themes || []);
      }
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllThemes();
    fetchUserDetails();
  }, [fetchAllThemes]);

  const handleDelete = async (themeId: string, themeName: string) => {
    try {
      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Refresh all themes to reflect deletion
        await fetchAllThemes();
      } else {
        alert('Failed to delete theme');
      }
    } catch (error) {
      alert('Failed to delete theme');
    }
  };

  const handleDuplicate = async (themeId: string) => {
    try {
      const response = await fetch(`/api/themes/${themeId}/duplicate`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const duplicatedTheme = await response.json();
        
        // Check if this is a public theme being duplicated (not owned by current user)
        const originalTheme = [...publicThemes, ...myThemes].find(t => t.id === themeId);
        const isNonOwned = originalTheme && originalTheme.user?.id !== user?.id;
        
        if (isNonOwned && duplicatedTheme.id) {
          // Redirect to theme studio with the new duplicated theme
          router.push(`/themes/studio?themeId=${duplicatedTheme.id}`);
        } else {
          // Refresh the themes list to show the new duplicate
          await fetchAllThemes();
          toast.success('Theme duplicated successfully');
        }
      } else {
        toast.error('Failed to duplicate theme');
      }
    } catch (error) {
      toast.error('Failed to duplicate theme');
    }
  };

  const handleVisibilityChange = async (themeId: string, newVisibility: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC') => {
    try {
      const response = await fetch(`/api/themes/${themeId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visibility: newVisibility,
          organizationId: newVisibility === 'ORGANIZATION' ? userOrganization?.id : null,
        }),
      });

      if (response.ok) {
        // Refresh all themes to ensure proper categorization
        await fetchAllThemes();
      } else {
        console.error('Failed to update theme visibility');
      }
    } catch (error) {
      console.error('Error updating theme visibility:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="border-l border-gray-200 pl-6">
                <h1 className="text-xl font-semibold text-gray-900">My Themes</h1>
              </div>
            </div>
            <button 
              onClick={() => router.push('/themes/studio')}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Theme</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-themes">My Themes</TabsTrigger>
            <TabsTrigger value="public">Public Themes</TabsTrigger>
          </TabsList>

          <TabsContent value="my-themes">
            <div className="relative">
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
                {/* Section description */}
                <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">My Themes</span> includes themes you've created and organization themes that have been shared with you. 
                    Organization themes can be edited by any team member.
                  </p>
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="w-4 h-4 bg-gray-200 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : myThemes.length === 0 ? (
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/50 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">No themes yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Get started by creating your first theme</p>
                    <button 
                      onClick={() => router.push('/themes/studio')}
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors"
                    >
                      Create New Theme
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {myThemes.map((theme) => (
                      <ThemeCard
                        key={theme.id}
                        theme={theme}
                        isOwner={theme.user?.id === user?.id}
                        currentUserId={user?.id}
                        userOrganization={userOrganization}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                        onVisibilityChange={handleVisibilityChange}
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
                              setMyThemes(myThemes.map(t => 
                                t.id === themeId ? { ...t, name, description } : t
                              ));
                            }
                          } catch (error) {
                            console.error('Failed to update theme:', error);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="public">
            <div className="relative">
              {/* Geometric Pattern Background - Different Pattern */}
              <div className="absolute inset-0 -inset-x-4 sm:-inset-x-6 lg:-inset-x-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden">
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="geometric-pattern-public" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="0.5"/>
                      <circle cx="30" cy="30" r="10" fill="none" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#geometric-pattern-public)" />
                </svg>
              </div>
              
              <div className="relative p-6">
                {/* Section description */}
                <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200/50">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Public Themes</span> are created and shared by the Power BI community. 
                    Browse and duplicate any theme to customize it for your own use.
                  </p>
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="w-4 h-4 bg-gray-200 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : publicThemes.length === 0 ? (
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/50 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">No public themes yet</h3>
                    <p className="text-sm text-gray-500">When users share themes publicly, they'll appear here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {publicThemes.map((theme) => (
                      <ThemeCard
                        key={theme.id}
                        theme={theme}
                        isOwner={theme.user?.id === user?.id}
                        currentUserId={user?.id}
                        userOrganization={userOrganization}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                        onVisibilityChange={handleVisibilityChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  )
}