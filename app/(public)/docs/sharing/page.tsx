'use client'

import { Globe, Lock, Users, Share2, Link, Check, X } from 'lucide-react'

export default function SharingThemesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Sharing Themes</h1>
        <p className="text-xl text-gray-600">
          Share your themes publicly, privately, or within your organization.
        </p>
      </div>

      {/* Visibility Options Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Theme Visibility Options</h2>
        <p className="text-gray-600 mb-6">
          Power UI provides flexible sharing options to control who can access your themes. Each theme has a unique URL 
          that remains constant, while visibility settings determine access permissions.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-semibold">Private</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Only visible to you</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Default for new themes</li>
              <li>• Complete privacy</li>
              <li>• Personal workspace</li>
            </ul>
          </div>

          <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Public</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Visible to all Power UI users</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Appears in gallery</li>
              <li>• Community sharing</li>
              <li>• Inspire others</li>
            </ul>
          </div>

          <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Organization</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Shared with your team</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Team access only</li>
              <li>• Requires org account</li>
              <li>• Brand consistency</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Changing Visibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Changing Theme Visibility</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">How to Change Visibility:</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <p className="font-medium mb-1">Open Your Theme</p>
                <p className="text-sm text-gray-600">Navigate to your theme in Theme Studio</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <p className="font-medium mb-1">Locate Sharing Controls</p>
                <p className="text-sm text-gray-600">Find the sharing dropdown in the header (shows current visibility)</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <p className="font-medium mb-1">Select New Visibility</p>
                <p className="text-sm text-gray-600">Choose from Private, Public, or Organization</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">4</span>
              <div>
                <p className="font-medium mb-1">Confirm Change</p>
                <p className="text-sm text-gray-600">Visibility updates immediately</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> The theme URL never changes. Only access permissions are updated when you change visibility.
          </p>
        </div>
      </section>

      {/* Public Gallery */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Public Theme Gallery</h2>
        <p className="text-gray-600 mb-6">
          The public gallery showcases themes shared by the Power UI community. It's a great source of inspiration 
          and ready-to-use professional themes.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Browsing the Gallery:</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="text-purple-600">1.</span>
                <p className="text-gray-700">Go to the Themes page</p>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">2.</span>
                <p className="text-gray-700">Click "Browse Gallery" tab</p>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">3.</span>
                <p className="text-gray-700">Filter by:</p>
                <ul className="text-sm text-gray-600 ml-4 mt-1">
                  <li>• Most Recent - Newest themes first</li>
                  <li>• Most Popular - By usage count</li>
                  <li>• Categories - Business, Creative, etc.</li>
                </ul>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">4.</span>
                <p className="text-gray-700">Preview themes before using</p>
              </li>
            </ol>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Gallery Features:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Preview without leaving gallery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>See author attribution</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>View theme description</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>One-click copy to edit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using Shared Themes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Using Shared Themes</h2>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">How to Use a Shared Theme:</h3>
          
          <div className="space-y-4">
            <div className="border border-purple-200 bg-white rounded-lg p-4">
              <h4 className="font-medium mb-2">Option 1: Direct Use</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Click "Use Theme" from gallery or shared link</li>
                <li>2. Theme opens in read-only mode</li>
                <li>3. Export directly for Power BI use</li>
                <li>4. Original theme remains unchanged</li>
              </ol>
            </div>

            <div className="border border-purple-200 bg-white rounded-lg p-4">
              <h4 className="font-medium mb-2">Option 2: Copy & Customize</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Click "Make a Copy" button</li>
                <li>2. Creates your own editable version</li>
                <li>3. Customize as needed</li>
                <li>4. Save with your modifications</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Tip:</strong> Always make a copy if you plan to customize. This preserves the original and gives you full control.
          </p>
        </div>
      </section>

      {/* Organization Sharing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Organization Sharing</h2>
        <p className="text-gray-600 mb-6">
          Organization sharing is perfect for maintaining brand consistency across teams. All team members can access 
          approved themes while maintaining version control.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Benefits:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 mt-0.5 text-purple-500" />
                <span className="text-sm">All team members access same themes</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 text-purple-500" />
                <span className="text-sm">Private to your organization</span>
              </li>
              <li className="flex items-start gap-2">
                <Share2 className="w-4 h-4 mt-0.5 text-purple-500" />
                <span className="text-sm">Central theme repository</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-purple-500" />
                <span className="text-sm">Ensures brand compliance</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Requirements:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Organization account required</li>
                <li>• All users must be in same org</li>
                <li>• Admins manage access</li>
                <li>• Usage tracking available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sharing Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Sharing Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">For Public Themes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Add clear, descriptive names</li>
              <li>• Include detailed descriptions</li>
              <li>• Document variant purposes</li>
              <li>• Test thoroughly before sharing</li>
              <li>• Credit inspirations if applicable</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">For Organization Themes</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Follow naming conventions</li>
              <li>• Include version numbers</li>
              <li>• Document brand guidelines</li>
              <li>• Specify approved use cases</li>
              <li>• Regular review and updates</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Attribution & Credit</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Credit original authors when enhancing</li>
              <li>• Mention inspirations in description</li>
              <li>• Respect community contributions</li>
              <li>• Share improvements back</li>
            </ul>
          </div>
        </div>
      </section>

      {/* URL Sharing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Direct URL Sharing</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Link className="w-5 h-5" />
            Theme URLs
          </h3>
          <p className="text-gray-600 mb-4">
            Every saved theme has a unique URL that can be shared directly:
          </p>
          
          <div className="bg-white rounded border border-gray-300 p-3 font-mono text-sm mb-4">
            https://powerui.app/themes/abc123def456
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>URL never changes after first save</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Access controlled by visibility settings</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Share via email, docs, or chat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Access Control Matrix */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Access Control Summary</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Private</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Public</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Organization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">View theme</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Owner only</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Anyone</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Team only</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">Edit original</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Owner only</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Owner only</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Owner only</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Make copy</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <X className="w-4 h-4 text-red-500 mx-auto" />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">Export</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <span className="text-green-600">Owner only</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: JSON Editing</h3>
        <p className="text-gray-600 mb-4">
          Learn how to use the JSON editor for advanced theme customization.
        </p>
        <a
          href="/docs/json-editing"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to JSON Editing →
        </a>
      </div>
    </div>
  )
}