import { DownloadableResources } from '@/components/downloads/DownloadableResources';

export function ResourcesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Premium Resources</h2>
        <p className="text-muted-foreground">
          Download exclusive Power BI examples and templates
        </p>
      </div>
      
      <DownloadableResources
        category="examples/powerbi"
        title="Power BI Examples"
        description="Professional Power BI report files (.pbix) showcasing various themes and design patterns"
      />
    </div>
  );
}