'use client';

import { useState } from 'react';
import { ExampleReport, exampleReports } from '@/lib/data/example-reports';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Eye, X } from 'lucide-react';
import { useUser } from '@/lib/hooks/use-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ExampleReportsShowcase() {
  const [selectedReport, setSelectedReport] = useState<ExampleReport | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleDownload = async (report: ExampleReport) => {
    if (!isSignedIn) {
      toast.error('Please sign in to download example reports');
      router.push('/sign-in');
      return;
    }

    setDownloading(report.id);
    
    try {
      const response = await fetch(`/api/downloads/examples/powerbi/${report.downloadFile}`);
      
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

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.downloadFile;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Downloaded ${report.name}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = (report: ExampleReport) => {
    setSelectedReport(report);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {exampleReports.map((report) => (
          <Card 
            key={report.id} 
            className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all cursor-pointer group"
          >
            <div 
              className="aspect-video relative overflow-hidden"
              style={{ backgroundColor: report.wallpaperColor }}
              onClick={() => handlePreview(report)}
            >
              {report.previewImage && (
                <div className="absolute bottom-0 left-4 right-4 h-[85%] rounded-t-sm overflow-hidden shadow-lg">
                  <Image
                    src={report.previewImage}
                    alt={report.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(report);
                }}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {report.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {report.description}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(report);
                  }}
                  disabled={downloading === report.id}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 left-0 right-0 px-6 py-4 bg-white/95 backdrop-blur-sm z-10 border-b">
            <DialogTitle>{selectedReport?.name}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full pt-14">
            {selectedReport?.iframeUrl && (
              <iframe
                src={selectedReport.iframeUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={selectedReport.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}