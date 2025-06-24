'use client'

import { AlertTriangle, RefreshCw, Settings, HelpCircle, CheckCircle, XCircle } from 'lucide-react'

export default function TroubleshootingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Troubleshooting</h1>
        <p className="text-xl text-gray-600">
          Solutions to common issues and debugging tips for Power UI Theme Studio.
        </p>
      </div>

      {/* Quick Fixes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Fixes</h2>
        <p className="text-gray-600 mb-6">
          Try these common solutions first for most issues:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              Refresh the Page
            </h3>
            <p className="text-sm text-blue-800">
              Many issues resolve with a simple page refresh. Your work is auto-saved locally.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-600" />
              Clear Browser Cache
            </h3>
            <p className="text-sm text-green-800">
              Clear cache and cookies for powerui.app if experiencing persistent issues.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              Check Internet Connection
            </h3>
            <p className="text-sm text-purple-800">
              Power UI requires a stable internet connection for preview and saving features.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              Update Browser
            </h3>
            <p className="text-sm text-orange-800">
              Use latest Chrome, Edge, Firefox, or Safari for best compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Issues & Solutions</h2>
        
        <div className="space-y-4">
          {/* Preview Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Preview not updating or loading
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Preview stays blank or frozen</li>
                    <li>• Changes don't reflect in preview</li>
                    <li>• Loading spinner persists</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Wait 2-3 seconds for automatic update</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Click the refresh button in preview controls</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Switch to JSON view and back to Preview</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Check browser console for errors (F12)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">5.</span>
                      <span>Ensure ad blockers aren't interfering</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>

          {/* Save Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Unable to save theme
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Save button doesn't respond</li>
                    <li>• Error message when saving</li>
                    <li>• Changes lost after refresh</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Verify you're logged in</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Check internet connectivity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Export as backup before troubleshooting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Try saving with a different theme name</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">5.</span>
                      <span>Check browser storage quota (may be full)</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>

          {/* Import Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Theme import failing
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• "Invalid JSON" error</li>
                    <li>• Import dialog won't accept file</li>
                    <li>• Theme doesn't load after import</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Validate JSON at jsonlint.com</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Ensure file has .json extension</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Check for Power BI theme structure</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Remove custom properties not supported</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">5.</span>
                      <span>Try paste method instead of file upload</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>

          {/* Export Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Exported theme not working in Power BI
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Power BI rejects theme file</li>
                    <li>• Theme applies but looks wrong</li>
                    <li>• Missing style variants</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Save theme before exporting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Update Power BI Desktop to latest version</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Test on a new blank report first</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Check for special characters in theme name</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">5.</span>
                      <span>Verify JSON validity in exported file</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>

          {/* Visual Selection Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Visual selection sync not working
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Clicking visual doesn't update panels</li>
                    <li>• Wrong visual type selected</li>
                    <li>• Selection highlighting missing</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Click directly on the visual, not the container</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Wait for visual to highlight before checking</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Some custom visuals don't support selection</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Try manual selection in Visual Styles dropdown</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>

          {/* Style Variants Issues */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
              Style variants not appearing in Power BI
            </summary>
            <div className="px-4 pb-4 pt-2">
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Symptoms:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Only default style shows</li>
                    <li>• Style presets menu missing</li>
                    <li>• Variants don't apply correctly</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm">Solutions:</p>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Right-click visual → Format → Style presets</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>Ensure visual type supports variants</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Check theme JSON includes variant definitions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>Some custom visuals don't support variants</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Performance Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Performance Issues</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">If Theme Studio is running slowly:</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Browser Optimization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Close unnecessary tabs</li>
                <li>• Disable unused extensions</li>
                <li>• Clear browser cache</li>
                <li>• Use hardware acceleration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Theme Optimization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reduce number of variants</li>
                <li>• Simplify complex themes</li>
                <li>• Remove unused properties</li>
                <li>• Clean up JSON structure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Compatibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browser Compatibility</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Browser</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Support</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Chrome (90+)</td>
                <td className="px-4 py-3 text-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Recommended</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Edge (90+)</td>
                <td className="px-4 py-3 text-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Fully supported</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Firefox (88+)</td>
                <td className="px-4 py-3 text-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Fully supported</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Safari (14+)</td>
                <td className="px-4 py-3 text-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Fully supported</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Internet Explorer</td>
                <td className="px-4 py-3 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Not supported</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Error Messages */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Error Messages</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">"Invalid JSON structure"</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The imported file contains syntax errors. Validate at jsonlint.com and fix any issues.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">"Theme save failed"</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Check internet connection and login status. Export as backup before retrying.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">"Preview unavailable"</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Power BI embed service may be temporarily unavailable. Try again in a few minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Help */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Additional Help</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support Resources
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Self-Service</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Review this documentation</li>
                <li>• Check browser console (F12)</li>
                <li>• Try incognito/private mode</li>
                <li>• Test with sample themes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Contact Support</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Email: support@powerui.app</li>
                <li>• Include theme URL if applicable</li>
                <li>• Describe steps to reproduce</li>
                <li>• Attach screenshots if helpful</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Checklist */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Debug Checklist</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-4">When reporting issues, please check:</p>
          <div className="space-y-2">
            {[
              'Browser name and version',
              'Operating system',
              'Theme URL (if saved)',
              'Error messages (exact text)',
              'Browser console errors (F12)',
              'Steps to reproduce the issue',
              'Screenshots of the problem',
              'Network connectivity status'
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-3 text-sm">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Docs */}
      <div className="border-t pt-8">
        <a
          href="/docs"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          ← Back to Documentation
        </a>
      </div>
    </div>
  )
}