'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileIcon, Loader2 } from 'lucide-react';
import { useUser } from '@/lib/hooks/use-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface FileInfo {
  name: string;
  size: number;
  sizeFormatted: string;
  modified: string;
}

interface DownloadableResourcesProps {
  category: 'examples/powerbi' | 'examples/templates' | 'examples/datasets';
  title: string;
  description?: string;
}

export function DownloadableResources({ category, title, description }: DownloadableResourcesProps) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      } else if (response.status === 401) {
        // User not authenticated
        setFiles([]);
      } else if (response.status === 403) {
        // User not subscribed
        setFiles([]);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDownload = async (fileName: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to download files');
      router.push('/sign-in');
      return;
    }

    setDownloading(fileName);
    
    try {
      const response = await fetch(`/api/downloads/${category}/${fileName}`);
      
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 403) {
          toast.error(error.error || 'Subscription required');
          router.push('/pricing');
        } else {
          toast.error('Download failed');
        }
        return;
      }

      // Get the file blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Downloaded ${fileName}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pbix':
        return (
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <FileIcon className="w-5 h-5 text-yellow-600" />
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileIcon className="w-5 h-5 text-green-600" />
          </div>
        );
      case 'csv':
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <FileIcon className="w-5 h-5 text-blue-600" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
            <FileIcon className="w-5 h-5 text-gray-600" />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {!isSignedIn 
                ? 'Sign in to view available downloads' 
                : 'Upgrade to access these resources'}
            </p>
            <Button
              onClick={() => router.push(!isSignedIn ? '/sign-in' : '/pricing')}
              variant="default"
            >
              {!isSignedIn ? 'Sign In' : 'View Plans'}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.sizeFormatted}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleDownload(file.name)}
                  disabled={downloading === file.name}
                >
                  {downloading === file.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span className="ml-2">Download</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}