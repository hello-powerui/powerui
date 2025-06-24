'use client';

import { useRouter, redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { VisibilityBadge } from '@/components/theme-sharing-controls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Copy, Download, Globe, Users, Lock, Eye } from 'lucide-react';
import { ThemePreviewModal } from '@/components/theme-preview-modal';

interface Theme {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  dataPalette: string;
  neutralPalette: string;
  fontFamily: string;
  colorMode: string;
  borders: string;
  themeData: any;
  visibility?: 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC';
  organization?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    plan: 'PRO' | 'TEAM';
    username?: string;
  };
  author?: {
    id: string;
    email: string;
    username?: string;
  };
}

// Icon for back navigation
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Icon for delete
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


// Icon for duplicate
const DuplicateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function ThemesPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [myThemes, setMyThemes] = useState<Theme[]>([]);
  const [publicThemes, setPublicThemes] = useState<Theme[]>([]);
  const [organizationThemes, setOrganizationThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('my-themes');
  const [userPlan, setUserPlan] = useState<'PRO' | 'TEAM'>('PRO');
  const [userOrganization, setUserOrganization] = useState<{ id: string; name: string } | null>(null);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  
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
        // My themes include all themes I own
        setMyThemes(data);
        
        // Organization themes are themes shared with my org that I don't own
        const orgThemes = data.filter((t: Theme) => 
          t.visibility === 'ORGANIZATION' && 
          t.user?.id !== user?.id
        );
        setOrganizationThemes(orgThemes);
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
  }, [user?.id]);

  useEffect(() => {
    fetchAllThemes();
    fetchUserDetails();
  }, [fetchAllThemes]);

  const handleDelete = async (themeId: string, themeName: string) => {
    if (!confirm(`Are you sure you want to delete "${themeName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(themeId);
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
      // console.error('Failed to delete theme:', error);
      alert('Failed to delete theme');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (themeId: string) => {
    setDuplicatingId(themeId);
    try {
      const response = await fetch(`/api/themes/${themeId}/duplicate`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const duplicatedTheme = await response.json();
        // Refresh the themes list to show the new duplicate
        await fetchAllThemes();
      } else {
        alert('Failed to duplicate theme');
      }
    } catch (error) {
      // console.error('Failed to duplicate theme:', error);
      alert('Failed to duplicate theme');
    } finally {
      setDuplicatingId(null);
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
        // Update the local state to reflect the change
        setMyThemes(themes => 
          themes.map(theme => 
            theme.id === themeId ? { ...theme, visibility: newVisibility } : theme
          )
        );
        
        // If theme is now public, refresh public themes
        if (newVisibility === 'PUBLIC') {
          fetchAllThemes();
        }
      } else {
        console.error('Failed to update theme visibility');
      }
    } catch (error) {
      console.error('Error updating theme visibility:', error);
    }
  };

  const handleDownloadTheme = async (theme: Theme) => {
    const themeData = theme.themeData;
    
    // Download the raw theme data directly
    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderThemeCard = (theme: Theme, isOwner: boolean = true) => (
    <div key={theme.id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all group relative overflow-hidden">
      
      <div className="p-4">
        {/* Header with title and dropdown */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{theme.name}</h3>
            {theme.visibility && (
              <VisibilityBadge visibility={theme.visibility} size="sm" />
            )}
          </div>
          
          {/* Dropdown menu */}
          {(isOwner || (theme.visibility === 'ORGANIZATION' && theme.organization?.id === userOrganization?.id)) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setPreviewTheme(theme)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/themes/studio?themeId=${theme.id}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDuplicate(theme.id)} disabled={duplicatingId === theme.id}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadTheme(theme)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                {isOwner && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDelete(theme.id, theme.name)} 
                      disabled={deletingId === theme.id}
                      className="text-red-600 focus:text-red-600"
                    >
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
                
                {/* Privacy section */}
                {isOwner && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Privacy</DropdownMenuLabel>
                    <DropdownMenuRadioGroup 
                      value={theme.visibility || 'PRIVATE'} 
                      onValueChange={(value) => handleVisibilityChange(theme.id, value as 'PRIVATE' | 'ORGANIZATION' | 'PUBLIC')}
                    >
                      <DropdownMenuRadioItem value="PRIVATE">
                        <Lock className="mr-2 h-4 w-4" />
                        Private
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="PUBLIC">
                        <Globe className="mr-2 h-4 w-4" />
                        Public
                      </DropdownMenuRadioItem>
                      {userOrganization && (
                        <DropdownMenuRadioItem value="ORGANIZATION">
                          <Users className="mr-2 h-4 w-4" />
                          {userOrganization.name}
                        </DropdownMenuRadioItem>
                      )}
                    </DropdownMenuRadioGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        {/* Metadata */}
        <div className="space-y-1 mb-3 text-xs text-gray-500">
          <div>Created {new Date(theme.createdAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</div>
          {theme.updatedAt && theme.updatedAt !== theme.createdAt && (
            <div>Modified {new Date(theme.updatedAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</div>
          )}
          {theme.author && (
            <div>by {theme.author.username ? `@${theme.author.username}` : theme.author.email.split('@')[0]}</div>
          )}
        </div>
        
        {/* Color preview - more compact */}
        {theme.themeData?.dataColors && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1">
              {theme.themeData.dataColors.slice(0, 4).map((color: string, i: number) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {theme.themeData.dataColors.length > 4 && (
              <span className="text-xs text-gray-500">+{theme.themeData.dataColors.length - 4}</span>
            )}
          </div>
        )}
        
        {/* Compact metadata pills */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
            {(theme.themeData as any)?.mode || 'light'}
          </span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
            {((theme.themeData as any)?.fontFamily || 'Segoe UI').replace('-', ' ')}
          </span>
        </div>
        
        {/* Actions for non-owners */}
        {!isOwner && theme.visibility !== 'ORGANIZATION' && (
          <div className="flex gap-2">
            <button 
              onClick={() => setPreviewTheme(theme)}
              className="px-2 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              title="Preview theme"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleDuplicate(theme.id)}
              disabled={duplicatingId === theme.id}
              className="flex-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {duplicatingId === theme.id ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <DuplicateIcon />
                  <span>Use this theme</span>
                </>
              )}
            </button>
            <button 
              className="px-2 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              title="Download theme"
              onClick={() => handleDownloadTheme(theme)}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

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
                <BackIcon />
                <span>Back to Dashboard</span>
              </button>
              <div className="border-l border-gray-200 pl-6">
                <h1 className="text-xl font-semibold text-gray-900">My Themes</h1>
              </div>
            </div>
            <button 
              onClick={() => {
                // Navigate to studio without themeId to create new theme
                router.push('/themes/studio');
              }}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors text-sm font-medium"
            >
              Create New Theme
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
            {userOrganization && (
              <TabsTrigger value="organization">Organization Themes</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="my-themes">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="flex -space-x-1 mb-3">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      <div className="h-8 bg-gray-200 rounded w-10"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : myThemes.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
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
                {myThemes.map((theme) => renderThemeCard(theme, true))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="public">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="flex -space-x-1 mb-3">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : publicThemes.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No public themes yet</h3>
                <p className="text-sm text-gray-500">When users share themes publicly, they'll appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {publicThemes.map((theme) => renderThemeCard(theme, theme.user?.id === user?.id))}
              </div>
            )}
          </TabsContent>

          {userOrganization && (
            <TabsContent value="organization">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="flex -space-x-1 mb-3">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : organizationThemes.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No organization themes yet</h3>
                  <p className="text-sm text-gray-500">Themes shared with {userOrganization.name} will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {organizationThemes.map((theme) => renderThemeCard(theme, theme.user?.id === user?.id))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>
      
      {/* Preview Modal */}
      {previewTheme && (
        <ThemePreviewModal
          isOpen={!!previewTheme}
          onClose={() => setPreviewTheme(null)}
          themeName={previewTheme.name}
          themeData={previewTheme.themeData}
        />
      )}
    </div>
  )
}