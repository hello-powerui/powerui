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
import { AVAILABLE_FONTS } from '@/lib/theme-studio/font-registry';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

// Analyze fonts in theme
const analyzeFonts = (theme: PowerBITheme) => {
  const fonts = new Set<string>();
  
  // Check text classes for fonts
  if (theme.textClasses) {
    Object.values(theme.textClasses).forEach((textClass: any) => {
      if (textClass.fontFace) {
        fonts.add(textClass.fontFace);
      }
    });
  }
  
  // Check global font family
  if (theme.fontFamily) {
    fonts.add(theme.fontFamily);
  }
  
  return {
    hasMultipleFonts: fonts.size > 1,
    fonts: Array.from(fonts),
    mostCommon: theme.fontFamily || Array.from(fonts)[0] || 'Segoe UI'
  };
};

export function ImportThemeModal({ isOpen, onClose, onImport }: ImportThemeModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<PowerBITheme | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFontDialog, setShowFontDialog] = useState(false);
  const [fontAnalysis, setFontAnalysis] = useState<ReturnType<typeof analyzeFonts> | null>(null);
  const [selectedFont, setSelectedFont] = useState<string>('');
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
        
        // Analyze fonts in the theme
        const analysis = analyzeFonts(content);
        setFontAnalysis(analysis);
        
        // If multiple fonts detected, show font selection dialog
        if (analysis.hasMultipleFonts) {
          setShowFontDialog(true);
          setSelectedFont(analysis.mostCommon);
        }
      } catch (err) {
        setError('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (fileContent) {
      let processedTheme = { ...fileContent };
      
      // If font dialog was shown, normalize fonts to selected font
      if (showFontDialog && selectedFont) {
        // Update global font family
        processedTheme.fontFamily = selectedFont;
        
        // Update all text classes to use selected font
        if (processedTheme.textClasses) {
          const updatedTextClasses: any = {};
          Object.entries(processedTheme.textClasses).forEach(([key, value]: [string, any]) => {
            updatedTextClasses[key] = {
              ...value,
              fontFace: selectedFont
            };
          });
          processedTheme.textClasses = updatedTextClasses;
        }
      }
      
      // Set theme name from file or use filename
      const themeName = processedTheme.name || selectedFile?.name.replace('.json', '') || 'Imported Theme';
      
      loadTheme(processedTheme);
      updateTheme({ 
        name: themeName,
        description: `Imported from ${selectedFile?.name}`
      });
      
      if (onImport) {
        onImport(processedTheme);
      }
      
      onClose();
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setFileContent(null);
    setError(null);
    setDragActive(false);
    setShowFontDialog(false);
    setFontAnalysis(null);
    setSelectedFont('');
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
              <>
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
              
              {/* Font Selection Dialog */}
              {showFontDialog && fontAnalysis && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <div className="flex items-start gap-2 mb-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-amber-900">Multiple Fonts Detected</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        This theme uses {fontAnalysis.fonts.length} different fonts: {fontAnalysis.fonts.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-amber-900">
                      Select a font to use for the entire theme:
                    </label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger className="w-full h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Show detected fonts first */}
                        {fontAnalysis.fonts.map(font => (
                          <SelectItem key={font} value={font}>
                            {font} {font === fontAnalysis.mostCommon && '(Most used)'}
                          </SelectItem>
                        ))}
                        
                        {/* Show other available fonts */}
                        <div className="border-t my-1" />
                        <div className="px-2 py-1">
                          <p className="text-xs text-gray-500">Or choose a different font:</p>
                        </div>
                        {AVAILABLE_FONTS.filter(f => !fontAnalysis.fonts.includes(f.name)).map(font => (
                          <SelectItem key={font.name} value={font.name}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <p className="text-xs text-amber-600">
                      All text elements will be updated to use this font
                    </p>
                  </div>
                </div>
              )}
            </>
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