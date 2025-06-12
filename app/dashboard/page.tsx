'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Icons
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TeamIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
}

const mockAssets = [
  { id: 1, name: 'Dashboard Design in Power BI', type: 'PDF', size: '107MB', icon: BookIcon },
  { id: 2, name: 'Power UI Figma Design System', type: 'FIG', size: '7MB', icon: FileIcon },
  { id: 3, name: 'Spacing Grids', type: 'PBIX', size: '209KB', icon: FileIcon },
  { id: 4, name: 'Icon Pack', type: 'ZIP', size: '22KB', icon: FileIcon },
];

const mockReports = [
  { id: 1, name: 'Sales Dashboard', preview: '🎨' },
  { id: 2, name: 'Financial Overview', preview: '📊' },
  { id: 3, name: 'HR Analytics', preview: '👥' },
  { id: 4, name: 'Marketing Metrics', preview: '📈' },
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
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/themes');
      if (response.ok) {
        const data = await response.json();
        // Only show the first 3 themes
        setThemes(data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to Power UI</h1>
          <p className="mt-1 text-sm text-gray-600">Build beautiful, professional Power BI dashboards</p>
        </div>
        
        {/* My Themes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">My Themes</h2>
            <Link href="/themes/studio" className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
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
                <Link key={theme.id} href={`/themes/${theme.id}`} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all group">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-700">{theme.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{getRelativeTime(theme.updatedAt)}</p>
                  
                  {/* Color dots */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {theme.themeData?.dataColors ? (
                        <>
                          {theme.themeData.dataColors.slice(0, 5).map((color: string, i: number) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {theme.themeData.dataColors.length > 5 && (
                            <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 text-[10px] flex items-center justify-center text-gray-600">
                              +{theme.themeData.dataColors.length - 5}
                            </div>
                          )}
                        </>
                      ) : (
                        // Fallback colors if no themeData
                        <>
                          {['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C'].map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{theme.colorMode}</span>
                  </div>
                </Link>
              ))
            )}
            {themes.length > 0 && (
              <Link href="/themes" className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center text-sm text-gray-600 hover:text-gray-900">
                View all themes →
              </Link>
            )}
          </div>
        </div>

        {/* Team Themes Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TeamIcon />
            <h2 className="text-lg font-medium text-gray-900">Team Themes</h2>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Beta</span>
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <TeamIcon />
            <p className="mt-2 text-sm text-gray-600">No team themes available yet</p>
            <p className="text-xs text-gray-500 mt-1">Team collaboration features coming soon</p>
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
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <DownloadIcon />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Reports */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sample Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-all cursor-pointer">
                <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
                  {report.preview}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-xs text-gray-600 hover:text-gray-900">Preview</button>
                    <span className="text-gray-300">•</span>
                    <button className="text-xs text-gray-600 hover:text-gray-900">Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}