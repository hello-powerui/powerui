'use client';

import { VisualDiagnostics } from '@/components/theme-studio/preview/VisualDiagnostics';

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <VisualDiagnostics />
      </div>
    </div>
  );
}