'use client';

import { useState, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useThemeStudioStore } from '@/lib/stores/theme-studio-store';
import { PowerBITheme } from '@/lib/theme-studio/types';

interface ImportThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport?: (theme: PowerBITheme) => void;
}

// Icons
const UploadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function ImportThemeModal({ isOpen, onClose, onImport }: ImportThemeModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<PowerBITheme | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { loadTheme, updateTheme } = useThemeStudioStore();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    
    if (!file.name.endsWith('.json')) {
      setError('Please select a JSON file');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        
        // Basic validation
        if (!content.name && !content.dataColors && !content.visualStyles) {
          setError('This doesn\'t appear to be a valid Power BI theme file');
          return;
        }
        
        setFileContent(content);
      } catch (err) {
        setError('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (fileContent) {
      // Set theme name from file or use filename
      const themeName = fileContent.name || selectedFile?.name.replace('.json', '') || 'Imported Theme';
      
      loadTheme(fileContent);
      updateTheme({ 
        name: themeName,
        description: `Imported from ${selectedFile?.name}`
      });
      
      if (onImport) {
        onImport(fileContent);
      }
      
      onClose();
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setFileContent(null);
    setError(null);
    setDragActive(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetModal();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Power BI Theme</DialogTitle>
        </DialogHeader>
        
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-12 h-12 flex items-center justify-center">
              <UploadIcon />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Drag and drop your theme file here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary/80 font-medium"
              >
                browse
              </button>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Supports .json files exported from Power BI
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileIcon />
              <div className="flex-1">
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {fileContent && !error && (
                <CheckIcon className="text-green-500" />
              )}
              {error && (
                <ErrorIcon className="text-red-500" />
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {fileContent && !error && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-sm text-blue-900 mb-2">Theme Details</h4>
                <dl className="space-y-1 text-xs">
                  {fileContent.name && (
                    <div className="flex">
                      <dt className="text-blue-700 w-20">Name:</dt>
                      <dd className="text-blue-900">{fileContent.name}</dd>
                    </div>
                  )}
                  {fileContent.dataColors && (
                    <div className="flex">
                      <dt className="text-blue-700 w-20">Colors:</dt>
                      <dd className="text-blue-900">{fileContent.dataColors.length} data colors</dd>
                    </div>
                  )}
                  {fileContent.visualStyles && (
                    <div className="flex">
                      <dt className="text-blue-700 w-20">Visuals:</dt>
                      <dd className="text-blue-900">
                        {Object.keys(fileContent.visualStyles).length} visual styles
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              resetModal();
              onClose();
            }}
          >
            Cancel
          </Button>
          {selectedFile && (
            <Button
              variant="outline"
              onClick={() => {
                resetModal();
                fileInputRef.current?.click();
              }}
            >
              Choose Different File
            </Button>
          )}
          <Button
            onClick={handleImport}
            disabled={!fileContent || !!error}
          >
            Import Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}