'use client'

import { Users, GitBranch, Shield, Workflow, CheckCircle, AlertCircle } from 'lucide-react'

export default function TeamWorkflowsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Team Workflows</h1>
        <p className="text-xl text-gray-600">
          Best practices for collaborating on themes with your organization.
        </p>
      </div>

      {/* Team Collaboration Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Collaborative Theme Development</h2>
        <p className="text-gray-600 mb-6">
          Power UI's organization features enable teams to maintain consistent branding across all Power BI reports. 
          Learn how to establish workflows that ensure quality, consistency, and efficient collaboration.
        </p>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Key Benefits of Team Workflows
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Consistent brand application across reports</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Version control and change tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Clear ownership and responsibilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>Efficient theme updates and distribution</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Recommended Team Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended Team Structure</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Theme Administrator
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">Responsible for theme governance and standards</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Creates and maintains master themes</li>
                <li>• Sets organization sharing permissions</li>
                <li>• Approves major theme changes</li>
                <li>• Manages theme versioning</li>
                <li>• Documents theme guidelines</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Theme Developers
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">Create and enhance themes for specific needs</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Develop department-specific themes</li>
                <li>• Create style variants for different use cases</li>
                <li>• Test themes with real reports</li>
                <li>• Submit themes for approval</li>
                <li>• Maintain theme documentation</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Report Authors
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">Apply approved themes to their reports</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use organization-approved themes</li>
                <li>• Apply appropriate style variants</li>
                <li>• Provide feedback on theme usability</li>
                <li>• Request new features or variants</li>
                <li>• Follow theme usage guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Development Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Theme Development Workflow</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Planning & Requirements</h3>
                <p className="text-sm text-gray-600 mb-2">Define theme objectives and gather requirements</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Identify report types to support</li>
                  <li>• Define required style variants</li>
                  <li>• Document brand guidelines</li>
                  <li>• Set accessibility requirements</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Development</h3>
                <p className="text-sm text-gray-600 mb-2">Create theme using Power UI's visual tools</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Start with organization template</li>
                  <li>• Create required style variants</li>
                  <li>• Test with sample reports</li>
                  <li>• Iterate based on preview</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Review & Testing</h3>
                <p className="text-sm text-gray-600 mb-2">Validate theme meets all requirements</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Test with production reports</li>
                  <li>• Verify accessibility compliance</li>
                  <li>• Review with stakeholders</li>
                  <li>• Document any limitations</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Approval & Publishing</h3>
                <p className="text-sm text-gray-600 mb-2">Get approval and share with organization</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Submit for admin review</li>
                  <li>• Set organization visibility</li>
                  <li>• Document usage guidelines</li>
                  <li>• Notify team of availability</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  5
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Maintenance</h3>
                <p className="text-sm text-gray-600 mb-2">Keep themes updated and relevant</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Monitor usage and feedback</li>
                  <li>• Update for new requirements</li>
                  <li>• Version major changes</li>
                  <li>• Deprecate old versions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version Control Strategy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Version Control Strategy</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Naming Conventions</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 rounded p-2 font-mono">
                [Brand]-[Type]-v[Major].[Minor]
              </div>
              <p className="text-gray-600">Examples:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Contoso-Sales-v2.1</li>
                <li>• Contoso-Executive-v1.0</li>
                <li>• Contoso-Marketing-v3.2</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Version Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-semibold">Major:</span>
                <span>Breaking changes, new variants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">Minor:</span>
                <span>Color updates, small fixes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">Archive:</span>
                <span>Keep 3 previous versions</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Use the theme description field to document version changes and update reasons.
          </p>
        </div>
      </section>

      {/* Communication & Documentation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Communication & Documentation</h2>
        
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Theme Documentation Template</h3>
            <div className="bg-white rounded border border-purple-200 p-4">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold">Theme Overview</h4>
                  <p className="text-gray-600">Purpose, target audience, key features</p>
                </div>
                <div>
                  <h4 className="font-semibold">Style Variants</h4>
                  <p className="text-gray-600">List of variants and their use cases</p>
                </div>
                <div>
                  <h4 className="font-semibold">Color Meanings</h4>
                  <p className="text-gray-600">What each color represents in context</p>
                </div>
                <div>
                  <h4 className="font-semibold">Usage Guidelines</h4>
                  <p className="text-gray-600">When and how to use the theme</p>
                </div>
                <div>
                  <h4 className="font-semibold">Known Limitations</h4>
                  <p className="text-gray-600">Any visual types or scenarios to avoid</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Change Notifications</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Email updates for major versions</li>
                <li>• Slack/Teams announcements</li>
                <li>• Update changelog in docs</li>
                <li>• Migration guides if needed</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Feedback Channels</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Dedicated feedback form</li>
                <li>• Regular user surveys</li>
                <li>• Theme request process</li>
                <li>• Bug reporting system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices for Teams */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Team Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-blue-600" />
              Process
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Regular theme review meetings</li>
              <li>• Quarterly theme audits</li>
              <li>• Standardized testing checklist</li>
              <li>• Clear approval workflow</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Collaboration
            </h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Shared theme library</li>
              <li>• Variant naming standards</li>
              <li>• Regular training sessions</li>
              <li>• Cross-team reviews</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Quality
            </h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Accessibility testing</li>
              <li>• Performance validation</li>
              <li>• Brand compliance checks</li>
              <li>• User acceptance testing</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Governance
            </h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Access control policies</li>
              <li>• Theme retirement process</li>
              <li>• Compliance documentation</li>
              <li>• Usage monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Challenges & Solutions</h2>
        
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Theme fragmentation</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <p className="mt-2"><strong>Solution:</strong></p>
              <ul className="space-y-1 mt-2 ml-4">
                <li>• Establish clear theme categories</li>
                <li>• Regular consolidation reviews</li>
                <li>• Deprecate duplicate themes</li>
                <li>• Enforce naming conventions</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Inconsistent usage</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <p className="mt-2"><strong>Solution:</strong></p>
              <ul className="space-y-1 mt-2 ml-4">
                <li>• Mandatory training for report authors</li>
                <li>• Clear documentation and guides</li>
                <li>• Regular compliance audits</li>
                <li>• Automated theme application tools</li>
              </ul>
            </div>
          </details>

          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="font-medium">Version control issues</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-600">
              <p className="mt-2"><strong>Solution:</strong></p>
              <ul className="space-y-1 mt-2 ml-4">
                <li>• Clear versioning strategy</li>
                <li>• Automated change tracking</li>
                <li>• Git integration for JSON files</li>
                <li>• Regular archive cleanup</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h3 className="font-semibold mb-4">Next: Keyboard Shortcuts</h3>
        <p className="text-gray-600 mb-4">
          Speed up your workflow with Power UI's keyboard shortcuts.
        </p>
        <a
          href="/docs/keyboard-shortcuts"
          className="inline-flex items-center gap-2 text-black font-medium hover:underline"
        >
          Continue to Keyboard Shortcuts →
        </a>
      </div>
    </div>
  )
}