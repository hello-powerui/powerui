'use client'

import { Upload, Download, FileJson, AlertCircle, Check, Copy } from 'lucide-react'

export default function ImportExportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Import & Export</h1>
        <p className="text-xl text-gray-600">
          Enhance existing themes and export your creations for Power BI.
        </p>
      </div>

      {/* Import Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Importing Themes</h2>
        <p className="text-gray-600 mb-6">
          Power UI can import any valid Power BI theme JSON file. Once imported, you can enhance it with advanced 
          features like style variants, better palette management, and fine-tuned customization that aren't possible 
          with standard Power BI theme editing.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Import Benefits
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Enhance existing themes with style variants</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Add proper color and neutral palettes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Fine-tune with visual controls instead of JSON</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Fix and improve community themes</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Import Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Import</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Three Import Methods:</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 bg-white rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <Upload className="w-4 h-4 text-purple-600" />
                  </div>
                  Method 1: Drag & Drop
                </h4>
                <ol className="text-sm text-gray-600 space-y-1 ml-10">
                  <li>1. Click the Import button in the header</li>
                  <li>2. Drag your .json file to the drop zone</li>
                  <li>3. Release to upload</li>
                </ol>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <FileJson className="w-4 h-4 text-blue-600" />
                  </div>
                  Method 2: Browse Files
                </h4>
                <ol className="text-sm text-gray-600 space-y-1 ml-10">
                  <li>1. Click the Import button</li>
                  <li>2. Click "Browse" or the drop zone</li>
                  <li>3. Select your theme file</li>
                  <li>4. Click Open</li>
                </ol>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <Copy className="w-4 h-4 text-green-600" />
                  </div>
                  Method 3: Paste JSON
                </h4>
                <ol className="text-sm text-gray-600 space-y-1 ml-10">
                  <li>1. Copy theme JSON to clipboard</li>
                  <li>2. Click Import button</li>
                  <li>3. Switch to "Paste JSON" tab</li>
                  <li>4. Paste and click Import</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens During Import */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Import Process</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
            <div>
              <h3 className="font-medium mb-1">Validation</h3>
              <p className="text-sm text-gray-600">Theme JSON is validated for compatibility and structure</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
            <div>
              <h3 className="font-medium mb-1">Property Mapping</h3>
              <p className="text-sm text-gray-600">Existing properties are mapped to Power UI's controls</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
            <div>
              <h3 className="font-medium mb-1">Enhancement Ready</h3>
              <p className="text-sm text-gray-600">Theme is loaded with all Power UI features available</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
            <div>
              <h3 className="font-medium mb-1">Name Extraction</h3>
              <p className="text-sm text-gray-600">Theme name is extracted from JSON or filename</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Note:</strong> All original theme properties are preserved. Power UI only adds capabilities, never removes features.
          </p>
        </div>
      </section>

      {/* Enhancing Imported Themes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Enhancing Imported Themes</h2>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Common Enhancements:</h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Add Style Variants</h4>
                <p className="text-sm text-purple-700">Create emphasis and subtle variants for existing visuals</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Organize Color Palettes</h4>
                <p className="text-sm text-purple-700">Convert loose colors into proper managed palettes</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Generate Neutral Palette</h4>
                <p className="text-sm text-purple-700">Add AI-generated grayscale system for consistency</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Fine-tune Typography</h4>
                <p className="text-sm text-purple-700">Adjust text classes and font settings visually</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Exporting Themes</h2>
        <p className="text-gray-600 mb-6">
          Export your completed theme as a Power BI-ready JSON file that includes all your customizations, 
          style variants, and enhancements.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Export Process:</h3>
          
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <p className="font-medium mb-1">Click Export Button</p>
                <p className="text-sm text-gray-600">Located in the header toolbar</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <p className="font-medium mb-1">Automatic Download</p>
                <p className="text-sm text-gray-600">File downloads as: <code className="bg-white px-2 py-1 rounded text-xs">[theme-name]-theme.json</code></p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <p className="font-medium mb-1">Ready for Power BI</p>
                <p className="text-sm text-gray-600">File is immediately usable in Power BI Desktop or Service</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Always save your theme in Power UI before exporting. The export uses the last saved version.
          </p>
        </div>
      </section>

      {/* Using in Power BI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Your Theme in Power BI</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Power BI Desktop</h3>
            </div>
            <div className="p-4">
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <span className="font-medium">1.</span>
                  <span>Open your report</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">2.</span>
                  <span>Go to View tab → Themes dropdown</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">3.</span>
                  <span>Select "Browse for themes"</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">4.</span>
                  <span>Choose your exported .json file</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">5.</span>
                  <span>Theme applies to all visuals</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold">Power BI Service</h3>
            </div>
            <div className="p-4">
              <div className="bg-yellow-50 rounded p-3 mb-3">
                <p className="text-xs text-yellow-800">⚠️ Themes must be applied in Desktop first</p>
              </div>
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <span className="font-medium">1.</span>
                  <span>Apply theme in Desktop</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">2.</span>
                  <span>Save the .pbix file</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">3.</span>
                  <span>Publish to Power BI Service</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">4.</span>
                  <span>Theme remains with the report</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Import Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
              <span className="font-medium">Import fails with error?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Ensure file is valid JSON (check with jsonlint.com)</li>
                <li>• Verify it's a Power BI theme file (has required properties)</li>
                <li>• Remove any custom/invalid properties</li>
                <li>• Try the paste method if file upload fails</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
              <span className="font-medium">Export file not working in Power BI?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Ensure you saved before exporting</li>
                <li>• Check Power BI Desktop is up to date</li>
                <li>• Try applying to a new blank report first</li>
                <li>• Look for error messages in Power BI</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
              <span className="font-medium">Style variants not showing?</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ul className="space-y-1 mt-2">
                <li>• Variants appear under Format → Style presets</li>
                <li>• Right-click visual to access formatting</li>
                <li>• Ensure visual type has variants defined</li>
                <li>• Some custom visuals may not support variants</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Version Control</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Include version in filename</li>
              <li>• Keep exports organized by date</li>
              <li>• Document changes between versions</li>
              <li>• Store in git if needed</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Testing</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Test on sample report first</li>
              <li>• Verify all visual types</li>
              <li>• Check variant application</li>
              <li>• Test in target environment</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Documentation</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Note which variants to use</li>
              <li>• Document color meanings</li>
              <li>• Include usage guidelines</li>
              <li>• Share Power UI link for edits</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Backup</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Export after major changes</li>
              <li>• Keep original imports</li>
              <li>• Save Power UI URLs</li>
              <li>• Backup to cloud storage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Sharing Themes</h3>
        <p className="text-gray-600 mb-4">
          Learn how to share your themes with the community or collaborate with your team.
        </p>
        <a
          href="/docs/sharing"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Sharing Themes →
        </a>
      </div>
    </div>
  )
}