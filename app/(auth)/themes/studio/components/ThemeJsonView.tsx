'use client';

import React, { useMemo } from 'react';
import { PowerBITheme } from '@/lib/theme-studio/types';
import { toast } from 'sonner';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { downloadThemeJson } from '@/lib/utils/theme-export';

interface ThemeJsonViewProps {
  theme: PowerBITheme;
}

export function ThemeJsonView({ theme }: ThemeJsonViewProps) {
  
  const formattedJson = useMemo(() => {
    if (!theme) {
      return JSON.stringify({ error: 'No theme data available' }, null, 2);
    }
    
    return JSON.stringify(theme, null, 2);
  }, [theme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    toast.success('JSON copied to clipboard');
  };

  const downloadJson = () => {
    downloadThemeJson(theme);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h3 className="text-sm font-medium text-gray-300">Theme JSON</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
          <button
            onClick={downloadJson}
            className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* JSON Content */}
      <div 
        className="flex-1 overflow-auto p-4 __json-pretty-theme-monikai"
        style={{ 
          backgroundColor: 'rgb(17, 24, 39)',
          fontSize: '12px',
        }}
      >
        <div style={{ 
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word'
        }}>
          <JSONPretty 
            id="json-pretty"
            data={theme}
          />
          
          {/* Fallback: Show raw JSON if JSONPretty doesn't render */}
          {!theme && (
            <pre style={{ color: '#d1d5db', fontSize: '12px', fontFamily: 'monospace' }}>
              {formattedJson}
            </pre>
          )}
        </div>
        
        <style jsx global>{`
          /* Override react-json-pretty styles for better wrapping */
          #json-pretty {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            font-size: 12px !important;
          }
          
          #json-pretty .__json-pretty__ {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
          }
          
          #json-pretty .__json-string__ {
            word-break: break-all !important;
          }
          
          /* Debug - ensure content is visible */
          #json-pretty pre {
            color: #d1d5db !important;
            margin: 0 !important;
          }
        `}</style>
      </div>
    </div>
  );
}