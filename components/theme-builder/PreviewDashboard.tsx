'use client';

import { useThemeBuilderStore } from '@/lib/stores/theme-builder-store';
import { ThemePreviewWrapper } from './ThemePreviewWrapper';
import { KPICard } from './preview/KPICard';
import { StackedColumnChart } from './preview/StackedColumnChart';
import { LineAreaChart } from './preview/LineAreaChart';
import { DataTableWithProgress } from './preview/DataTableWithProgress';

export function PreviewDashboard() {
  const { theme } = useThemeBuilderStore();

  return (
    <ThemePreviewWrapper theme={theme} className="preview-dashboard">
      <div className="preview-canvas" style={{ backgroundColor: 'var(--canvas-bg)' }}>
        {/* Header */}
        <div className="flex-block-31">
          <div className="preview-report-title-wrapper">
            <div className="preview-report-title">Theme Preview Dashboard</div>
            <div className="preview-report-subtitle">
              These example visuals are previews of your theme in Power BI.
            </div>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="flex-block-21">
          <KPICard
            title="Income"
            value="$120K"
            target="$180K"
            progress={67}
            comparison="-33%"
            colorIndex={0}
          />
          <KPICard
            title="Revenue"
            value="$340K"
            target="$300K"
            progress={113}
            comparison="+13%"
            colorIndex={1}
          />
          <KPICard
            title="Expenses"
            value="$85K"
            target="$100K"
            progress={85}
            comparison="-15%"
            colorIndex={2}
          />
        </div>

        {/* Charts Section */}
        <div className="section-1">
          <StackedColumnChart 
            title="Monthly Sales by Category"
            subtitle="Breakdown by product categories"
          />
          <LineAreaChart
            title="Revenue Trend"
            subtitle="12-month performance overview"
          />
        </div>

        {/* Table Section */}
        <div className="w-layout-hflex">
          <DataTableWithProgress
            title="Regional Performance"
            subtitle="Sales vs target by continent"
          />
        </div>
      </div>
    </ThemePreviewWrapper>
  );
}