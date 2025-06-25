'use client';

import { useState } from 'react';
import { ExampleReport, exampleReports } from '@/lib/data/example-reports';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ExampleReportsShowcasePublic() {
  const [selectedReport, setSelectedReport] = useState<ExampleReport | null>(null);

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
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {report.name}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {report.description}
              </p>
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