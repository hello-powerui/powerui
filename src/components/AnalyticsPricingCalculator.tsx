import React, { useState, useEffect } from 'react';

interface DataSource {
  id: number;
  type: string;
  needsEngineering: boolean;
}

interface DataSourceType {
  id: string;
  name: string;
  basePrice: number;
}

const AnalyticsPricingCalculator = () => {
  // Data source types with base prices
  const dataSourceTypes: DataSourceType[] = [
    { id: 'csv', name: 'CSV/Excel', basePrice: 200 },
    { id: 'api', name: 'API', basePrice: 350 },
    { id: 'database', name: 'Database', basePrice: 400 },
    { id: 'cloud', name: 'Cloud Storage', basePrice: 300 },
    { id: 'web', name: 'Web Scraping', basePrice: 450 },
    { id: 'erp', name: 'ERP System', basePrice: 500 }
  ];

  // Data engineering costs by source type
  const dataEngineeringCosts: Record<string, number> = {
    csv: 100,
    api: 250,
    database: 300,
    cloud: 200,
    web: 350,
    erp: 400
  };

  // Price per report page
  const pricePerPage = 150;

  // State management
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [reportPages, setReportPages] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextId, setNextId] = useState(1);

  // Add a new data source
  const addDataSource = () => {
    setDataSources([
      ...dataSources, 
      { 
        id: nextId, 
        type: 'csv', 
        needsEngineering: false 
      }
    ]);
    setNextId(nextId + 1);
  };

  // Remove a data source
  const removeDataSource = (id: number) => {
    setDataSources(dataSources.filter(source => source.id !== id));
  };

  // Update data source type
  const updateSourceType = (id: number, newType: string) => {
    setDataSources(dataSources.map(source => 
      source.id === id ? { ...source, type: newType } : source
    ));
  };

  // Toggle data engineering for a source
  const toggleEngineering = (id: number) => {
    setDataSources(dataSources.map(source => 
      source.id === id ? { ...source, needsEngineering: !source.needsEngineering } : source
    ));
  };

  // Calculate total price whenever dependencies change
  useEffect(() => {
    let price = 0;
    
    // Calculate cost for data sources
    dataSources.forEach(source => {
      const sourceType = dataSourceTypes.find(type => type.id === source.type);
      if (sourceType) {
        price += sourceType.basePrice;
        
        if (source.needsEngineering) {
          price += dataEngineeringCosts[source.type] || 0;
        }
      }
    });
    
    // Add cost for report pages
    price += reportPages * pricePerPage;
    
    setTotalPrice(price);
  }, [dataSources, reportPages]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Analytics Services Pricing Calculator</h1>
      
      {/* Data Sources Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Data Sources</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addDataSource}
          >
            Add Data Source
          </button>
        </div>
        
        {dataSources.length === 0 ? (
          <p className="text-gray-500 italic">No data sources added yet. Click "Add Data Source" to begin.</p>
        ) : (
          <div className="space-y-4">
            {dataSources.map((source) => (
              <div key={source.id} className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex-1 min-w-64">
                  <label className="block text-sm font-medium mb-1">Source Type</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={source.type}
                    onChange={(e) => updateSourceType(source.id, e.target.value)}
                  >
                    {dataSourceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name} (${type.basePrice})</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`engineering-${source.id}`}
                    checked={source.needsEngineering}
                    onChange={() => toggleEngineering(source.id)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`engineering-${source.id}`} className="text-sm">
                    Data Engineering (+${dataEngineeringCosts[source.type] || 0})
                  </label>
                </div>
                
                <button 
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                  onClick={() => removeDataSource(source.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Report Design Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Report Design</h2>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <label className="block text-sm font-medium mb-1">Number of Pages</label>
            <input 
              type="number" 
              min="1" 
              value={reportPages}
              onChange={(e) => setReportPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="text-sm mt-6">
            ${pricePerPage} per page
          </div>
        </div>
      </div>
      
      {/* Pricing Summary */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Pricing Summary</h2>
        
        <div className="space-y-2 mb-4">
          {dataSources.map((source) => {
            const sourceType = dataSourceTypes.find(type => type.id === source.type);
            if (!sourceType) return null;
            
            return (
              <div key={`summary-${source.id}`} className="flex justify-between">
                <span>{sourceType.name} {source.needsEngineering ? '(with Engineering)' : ''}</span>
                <span className="font-semibold">
                  ${sourceType.basePrice + (source.needsEngineering ? (dataEngineeringCosts[source.type] || 0) : 0)}
                </span>
              </div>
            );
          })}
          <div className="flex justify-between">
            <span>Report Design ({reportPages} page{reportPages !== 1 ? 's' : ''})</span>
            <span className="font-semibold">${reportPages * pricePerPage}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-300 flex justify-between text-lg font-bold">
          <span>Total Price</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPricingCalculator; 