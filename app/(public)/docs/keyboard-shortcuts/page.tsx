'use client'

import { Keyboard, Command, Monitor } from 'lucide-react'

export default function KeyboardShortcutsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Keyboard Shortcuts</h1>
        <p className="text-xl text-gray-600">
          Speed up your theme creation workflow with these handy shortcuts.
        </p>
      </div>

      {/* Platform Note */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Platform Note:</strong> Use <kbd className="px-2 py-1 bg-blue-100 rounded text-xs">Cmd</kbd> on macOS 
                and <kbd className="px-2 py-1 bg-blue-100 rounded text-xs">Ctrl</kbd> on Windows/Linux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Global Shortcuts</h2>
        <p className="text-gray-600 mb-6">
          These shortcuts work throughout the Theme Studio interface:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Save Theme</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + S</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Save current theme to cloud</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Undo</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + Z</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Undo last change</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Redo</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + Shift + Z</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Redo undone change</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Export Theme</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + D</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Download theme as JSON</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Close Dialogs</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Escape</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Close any open modal or dialog</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
        <p className="text-gray-600 mb-6">
          Quickly move between inputs and panels:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Next Field</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Tab</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Move to next input field</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Previous Field</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Shift + Tab</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Move to previous input field</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Navigate Dropdowns</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">↑ ↓</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Arrow keys in dropdown menus</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Select Option</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Confirm dropdown selection</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Panel Control Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Panel Controls</h2>
        <p className="text-gray-600 mb-6">
          Toggle visibility of the three main panels:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Toggle Foundation</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + 1</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Show/hide left panel</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Toggle Preview</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + 2</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Show/hide center panel</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Toggle Visual Styles</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + 3</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Show/hide right panel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Preview Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Preview Mode</h2>
        <p className="text-gray-600 mb-6">
          Shortcuts specific to the preview panel:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Toggle View Mode</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">P</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Switch Preview/JSON view</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Focus Mode</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">F</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Enter focus mode (visual selected)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Refresh Preview</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">R</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Force preview refresh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Color Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Color Management</h2>
        <p className="text-gray-600 mb-6">
          Shortcuts for working with colors:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Copy Color</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + Shift + C</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Copy current color value</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Paste Color</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + Shift + V</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Paste color value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* JSON Editor Shortcuts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">JSON Editor</h2>
        <p className="text-gray-600 mb-6">
          When working in JSON view:
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Shortcut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Find</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + F</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Search in JSON</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Find & Replace</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + H</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Find and replace text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Copy All</td>
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl/Cmd + A</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Select all JSON content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Help Shortcut */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Help</h2>
        
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Keyboard className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Show Shortcuts</h3>
              <p className="text-sm text-purple-700">
                Press <kbd className="px-2 py-1 bg-purple-100 rounded text-xs">Ctrl/Cmd + /</kbd> to display 
                this shortcuts reference anytime while using Theme Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Productivity Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Learn Core Shortcuts First</h4>
            <p className="text-sm text-blue-800">
              Master Save (Cmd+S), Undo (Cmd+Z), and panel toggles (Cmd+1,2,3) for the biggest productivity boost.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Use Tab Navigation</h4>
            <p className="text-sm text-green-800">
              Tab through form fields quickly instead of clicking. Shift+Tab goes backwards.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Combine with Mouse</h4>
            <p className="text-sm text-purple-800">
              Keyboard shortcuts work best alongside mouse interactions, not as a replacement.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Practice Makes Perfect</h4>
            <p className="text-sm text-orange-800">
              Shortcuts become muscle memory with regular use. Start with a few and add more over time.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Best Practices</h3>
        <p className="text-gray-600 mb-4">
          Learn design guidelines and pro tips for creating professional themes.
        </p>
        <a
          href="/docs/best-practices"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Best Practices →
        </a>
      </div>
    </div>
  )
}