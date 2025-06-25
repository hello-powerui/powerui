'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Download, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [iconData, setIconData] = useState<Record<string, string>>({});
  const [iconCategories, setIconCategories] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Fetch all icon data and categories on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/icons/lucide/all').then(res => res.json()),
      fetch('/api/icons/lucide/categories').then(res => res.json())
    ])
      .then(([allData, categoriesData]) => {
        setIconData(allData.icons || {});
        setIconCategories(categoriesData.categories || {});
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Failed to load icons');
      });
  }, []);

  const iconList = Object.keys(iconData);

  // Get unique categories
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    Object.values(iconCategories).forEach(cats => {
      cats.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }, [iconCategories]);

  // Get icons for selected category
  const categoryIcons = useMemo(() => {
    if (selectedCategory === 'all') return iconList;
    
    return iconList.filter(icon => 
      iconCategories[icon]?.includes(selectedCategory)
    );
  }, [iconList, iconCategories, selectedCategory]);

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    const iconsToFilter = categoryIcons;
    
    if (!searchQuery) return iconsToFilter;
    
    const query = searchQuery.toLowerCase();
    return iconsToFilter.filter(icon => icon.toLowerCase().includes(query));
  }, [categoryIcons, searchQuery]);

  // Copy icon URL to clipboard
  const copyIconUrl = async (iconName: string) => {
    const url = `${window.location.origin}/api/icons/lucide/${iconName}?color=${encodeURIComponent(selectedColor)}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIcon(iconName);
      toast.success('Icon URL copied to clipboard!');
      
      setTimeout(() => {
        setCopiedIcon(null);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  // Export filtered icon URLs as CSV
  const exportAsCSV = () => {
    const csvContent = [
      ['Icon Name', 'URL', 'Categories'],
      ...filteredIcons.map(icon => [
        icon,
        `${window.location.origin}/api/icons/lucide/${icon}?color=${encodeURIComponent(selectedColor)}`,
        (iconCategories[icon] || []).join('; ')
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lucide-icons-${selectedCategory}-${selectedColor.replace('#', '')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('CSV downloaded successfully!');
  };

  // Render SVG with color
  const renderIcon = (iconName: string) => {
    const svg = iconData[iconName];
    if (!svg) return null;
    
    // Replace currentColor with the selected color
    const coloredSvg = svg.replace(/currentColor/g, selectedColor);
    
    return (
      <div 
        className="h-6 w-6"
        dangerouslySetInnerHTML={{ __html: coloredSvg }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold text-gray-900">Icon Library</h1>
              <div className="text-sm text-gray-500">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading all icons...
                  </span>
                ) : (
                  `${iconList.length} icons from Lucide`
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category:
              </Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                disabled={loading}
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <Label htmlFor="color" className="text-sm font-medium">
                Color:
              </Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer shadow-sm hover:shadow transition-shadow"
                  style={{ backgroundColor: selectedColor }}
                  onClick={() => colorInputRef.current?.click()}
                />
                <input
                  ref={colorInputRef}
                  type="color"
                  id="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="sr-only"
                />
                <Input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-28 font-mono text-sm"
                />
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={exportAsCSV}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading || filteredIcons.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {loading ? (
              'Loading...'
            ) : (
              <>
                Showing {filteredIcons.length} icons
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Icon Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : filteredIcons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No icons found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 2xl:grid-cols-18 gap-3">
            {filteredIcons.map((iconName) => {
              const isCopied = copiedIcon === iconName;
              const categories = iconCategories[iconName] || [];
              
              return (
                <div
                  key={iconName}
                  className="group relative bg-white rounded-lg border border-gray-200 p-2 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer aspect-square"
                  onClick={() => copyIconUrl(iconName)}
                  title={`${iconName}\nCategories: ${categories.join(', ')}`}
                >
                  {/* Icon Preview - Rendered inline SVG */}
                  <div className="flex justify-center items-center h-full w-full">
                    {renderIcon(iconName)}
                  </div>
                  
                  {/* Copy indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {isCopied ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-gray-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Usage Instructions */}
      <section className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use in Power BI</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Copy Icon URL</h3>
              <p className="text-gray-600 mb-4">
                Click any icon to copy its URL. The URL includes your selected color.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Add to Power BI</h3>
              <p className="text-gray-600 mb-4">
                In Power BI, use the Image visual or add the URL to a table column with Image URL data category.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Dynamic Colors</h3>
              <p className="text-gray-600 mb-4">
                You can also build dynamic URLs in DAX by replacing the color parameter.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-700">Example DAX:</p>
                <p className="text-gray-600 mt-2">
                  "https://powerui.app/api/icons/lucide/home?color=" & [ColorColumn]
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Pro tip:</strong> Export all icons as CSV to quickly import multiple icons into your Power BI dataset.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}