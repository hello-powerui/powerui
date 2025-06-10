'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useThemeAdvancedStore } from '@/lib/stores/theme-advanced-store';
import { SchemaLoader } from '@/lib/theme-advanced/services/schema-loader';
import { SchemaForm } from '@/components/theme-advanced/form/schema-form';
import { PreviewDashboard } from '@/components/theme-builder/PreviewDashboard';
import { Card } from '@/components/ui/card';

// Icons (same as editor page)
const SaveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PreviewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PropertyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const VisualIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function EditAdvancedThemePage() {
  const router = useRouter();
  const params = useParams();
  const themeId = params.id as string;
  
  const [schemaLoader] = useState(() => SchemaLoader.getInstance());
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingTheme, setLoadingTheme] = useState(true);

  const {
    currentTheme,
    themeMetadata,
    selectedSection,
    selectedProperty,
    selectedVisual,
    selectedStyle,
    setSelectedSection,
    setSelectedProperty,
    setSelectedVisual,
    setSelectedStyle,
    updateThemeProperty,
    updateVisualStyle,
    setThemeMetadata,
    loadTheme,
    isDirty,
    setIsLoading,
  } = useThemeAdvancedStore();

  useEffect(() => {
    loadSchema();
    loadThemeData();
  }, [themeId]);

  const loadSchema = async () => {
    setIsLoading(true);
    try {
      await schemaLoader.loadSchema();
      setSchemaLoaded(true);
    } catch (error) {
      console.error('Failed to load schema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadThemeData = async () => {
    try {
      const response = await fetch(`/api/themes/advanced/${themeId}`);
      if (response.ok) {
        const { theme } = await response.json();
        loadTheme(theme);
      } else {
        console.error('Failed to load theme');
        router.push('/themes/advanced');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
      router.push('/themes/advanced');
    } finally {
      setLoadingTheme(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/themes/advanced/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: themeMetadata.name,
          description: themeMetadata.description,
          themeData: currentTheme,
          schemaVersion: themeMetadata.schemaVersion,
        }),
      });

      if (response.ok) {
        // Show success message or notification
        console.log('Theme saved successfully');
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const themeData = {
      ...currentTheme,
      name: themeMetadata.name,
    };

    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeMetadata.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loadingTheme || !schemaLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            {loadingTheme ? 'Loading theme...' : 'Loading schema...'}
          </p>
        </div>
      </div>
    );
  }

  const topLevelProperties = schemaLoader.getTopLevelProperties();
  const visualTypes = schemaLoader.getVisualTypes();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/themes/advanced')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <BackIcon />
              <span className="text-sm">Back</span>
            </button>
            <div>
              <h1 className="text-xl font-semibold">Edit Advanced Theme</h1>
              <p className="text-sm text-gray-600">
                {isDirty && <span className="text-orange-600">• Unsaved changes</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1.5 text-sm rounded flex items-center gap-2 ${
                showPreview 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <PreviewIcon />
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              Export JSON
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="px-4 py-1.5 text-sm bg-primary text-white hover:opacity-90 rounded flex items-center gap-2 disabled:opacity-50"
            >
              <SaveIcon />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          {/* Theme Name */}
          <div className="p-4 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme Name
            </label>
            <input
              type="text"
              value={themeMetadata.name}
              onChange={(e) => setThemeMetadata({ name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="My Advanced Theme"
            />
          </div>

          {/* Section Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setSelectedSection('properties')}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                selectedSection === 'properties'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <PropertyIcon />
              Properties
            </button>
            <button
              onClick={() => setSelectedSection('visuals')}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                selectedSection === 'visuals'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <VisualIcon />
              Visuals
            </button>
          </div>

          {/* Content based on selected section */}
          <div className="p-4">
            {selectedSection === 'properties' ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Theme Properties</h3>
                {topLevelProperties.map((prop) => (
                  <button
                    key={prop}
                    onClick={() => setSelectedProperty(prop)}
                    className={`w-full text-left px-3 py-2 text-sm rounded border ${
                      selectedProperty === prop
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {prop.charAt(0).toUpperCase() + prop.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Visual Styles</h3>
                {visualTypes.map((visual) => (
                  <button
                    key={visual}
                    onClick={() => {
                      setSelectedVisual(visual);
                      setSelectedStyle('*');
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded border ${
                      selectedVisual === visual
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {visual.charAt(0).toUpperCase() + visual.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Form Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <Card className="bg-white">
              <div className="p-6">
                {selectedSection === 'properties' && selectedProperty ? (
                  <>
                    <h2 className="text-lg font-semibold mb-4">
                      {selectedProperty.charAt(0).toUpperCase() + selectedProperty.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h2>
                    <SchemaForm
                      schema={schemaLoader.getPropertySchema([selectedProperty]) || { type: 'null' }}
                      value={currentTheme[selectedProperty]}
                      onChange={(value) => {
                        updateThemeProperty([selectedProperty], value);
                      }}
                      schemaLoader={schemaLoader}
                      hideTitle
                    />
                  </>
                ) : selectedSection === 'visuals' && selectedVisual ? (
                  <>
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold">
                        {selectedVisual.charAt(0).toUpperCase() + selectedVisual.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Style: <span className="font-medium">{selectedStyle === '*' ? 'Default' : selectedStyle}</span>
                      </p>
                    </div>
                    
                    {/* Style selector if multiple styles exist */}
                    {currentTheme.visualStyles?.[selectedVisual] && 
                     Object.keys(currentTheme.visualStyles[selectedVisual]).length > 1 && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Style Variant
                        </label>
                        <select
                          value={selectedStyle}
                          onChange={(e) => setSelectedStyle(e.target.value)}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="*">Default (*)</option>
                          {Object.keys(currentTheme.visualStyles[selectedVisual])
                            .filter(style => style !== '*')
                            .map(style => (
                              <option key={style} value={style}>{style}</option>
                            ))}
                        </select>
                      </div>
                    )}
                    
                    <SchemaForm
                      schema={
                        schemaLoader.getPropertySchema(['visualStyles', selectedVisual, selectedStyle]) || 
                        schemaLoader.getPropertySchema(['visualStyles', selectedVisual, '*']) ||
                        { type: 'object' }
                      }
                      value={currentTheme.visualStyles?.[selectedVisual]?.[selectedStyle] || {}}
                      onChange={(value) => {
                        updateVisualStyle(selectedVisual, selectedStyle, value);
                      }}
                      schemaLoader={schemaLoader}
                    />
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="mb-2">
                      {selectedSection === 'properties' 
                        ? 'Select a property from the sidebar to edit'
                        : 'Select a visual from the sidebar to edit its styles'}
                    </p>
                    <p className="text-sm">
                      Use the sidebar to navigate through theme properties and visual styles
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-[600px] border-l bg-gray-100 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                <div className="bg-white rounded-lg shadow-sm">
                  <PreviewDashboard theme={currentTheme} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}