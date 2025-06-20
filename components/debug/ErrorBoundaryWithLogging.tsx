'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  componentName: string;
}

export class ErrorBoundaryWithLogging extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[ERROR BOUNDARY] ${this.props.componentName} caught error:`, error);
    console.error('Error Info:', errorInfo);
    
    // Check if it's the React error #185
    if (error.message.includes('Maximum update depth exceeded') || 
        error.message.includes('Error #185') ||
        error.message.includes('Minified React error #185')) {
      console.error(`[INFINITE LOOP DETECTED] in ${this.props.componentName}`);
      console.error('Component Stack:', errorInfo.componentStack);
      
      // Log the last few render cycles
      const renderLog = (window as any).__RENDER_LOG || [];
      console.error('Last 10 renders:', renderLog.slice(-10));
    }
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error in {this.props.componentName}
          </h2>
          <details className="text-sm text-red-700">
            <summary className="cursor-pointer hover:underline">Error details</summary>
            <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}