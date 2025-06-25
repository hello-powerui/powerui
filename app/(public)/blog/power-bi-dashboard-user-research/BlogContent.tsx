'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Users, Target, Search, MessageSquare, Eye, Settings, CheckCircle, AlertTriangle, Lightbulb, ChevronRight, Clock, Calendar, UserCheck, Laptop, Smartphone, BookOpen } from 'lucide-react'

export default function BlogContent() {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary' | 'stakeholder'>('primary')

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2024
            </time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Understanding Your Power BI Dashboard Users: The Foundation of Great Design
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Before opening Power BI, successful dashboard designers ask fundamental questions: Who will use this 
            dashboard? What decisions do they need to make? This guide shows you how to gather these insights 
            systematically to create dashboards that truly serve your users.
          </p>

          <div className="flex flex-wrap gap-2">
            {['User Research', 'Dashboard Design', 'Power BI', 'UX Design', 'Requirements Gathering'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              What You'll Learn
            </h2>
            <nav className="space-y-2">
              <a href="#user-types" className="block text-gray-600 hover:text-gray-900 transition-colors">
                How to identify and categorize your dashboard users
              </a>
              <a href="#gathering-requirements" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Methods for gathering requirements effectively
              </a>
              <a href="#performance-considerations" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Performance and data freshness considerations
              </a>
              <a href="#accessibility" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Building inclusive dashboards for all users
              </a>
              <a href="#balancing-needs" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Strategies for balancing competing requirements
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Start with Your Users */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Start with Your Users</h2>
            
            <p className="text-gray-700 mb-6">
              Understanding your audience is the foundation of effective dashboard design. A dashboard for C-level 
              executives requires different considerations than one for daily operational staff. Financial analysts 
              need different features than marketing teams. Remote workers have different constraints than office-based users.
            </p>

            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">The Golden Rule of Dashboard Design</h3>
              </div>
              <p className="text-blue-800 text-lg italic">
                "Design for your users, not for yourself. What seems obvious to you may be confusing to them."
              </p>
            </div>

            <p className="text-gray-700">
              Every design choice that follows—from layout to colors to interactions—should be informed by deep 
              understanding of who will actually use your dashboard and how they'll use it.
            </p>
          </section>

          {/* Identifying Your Users */}
          <section id="user-types" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Identifying Your User Types</h2>
            
            {/* Interactive User Type Tabs */}
            <div className="bg-gray-50 rounded-lg p-1 mb-6">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('primary')}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'primary' 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Primary Users
                </button>
                <button
                  onClick={() => setActiveTab('secondary')}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'secondary' 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Secondary Users
                </button>
                <button
                  onClick={() => setActiveTab('stakeholder')}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'stakeholder' 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Stakeholders
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'primary' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                    Primary Users
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Your primary users interact with the dashboard most frequently. They're the ones making 
                    decisions based on your data. Understanding their roles and workflows is crucial.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Key Questions to Ask:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• What is their job function and level of responsibility?</li>
                      <li>• How comfortable are they with data analysis?</li>
                      <li>• What decisions do they make that require this data?</li>
                      <li>• How often will they use the dashboard?</li>
                      <li>• What's their typical workflow when reviewing data?</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'secondary' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Secondary Users
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Secondary users access your dashboard less frequently but still need it to be functional 
                    and clear. They might be managers reviewing reports quarterly or team members checking 
                    specific metrics monthly.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Design Considerations:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Simplified navigation for infrequent users</li>
                      <li>• Clear labeling that doesn't require institutional knowledge</li>
                      <li>• Context and explanations for data sources</li>
                      <li>• Self-service capabilities to reduce support requests</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'stakeholder' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    Stakeholders and Influencers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Stakeholders may not use your dashboard directly but have opinions about its content 
                    and design. They might be managers, IT administrators, or other departments affected 
                    by your data.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Managing Expectations:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Regular check-ins during development</li>
                      <li>• Clear communication about capabilities and limitations</li>
                      <li>• Documentation of design decisions and rationale</li>
                      <li>• Training materials for rollout and adoption</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Gathering Requirements */}
          <section id="gathering-requirements" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Gathering Requirements Effectively</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold">Discovery Interviews</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Conduct brief interviews with representative users from each group. Focus on pain points 
                  and desired outcomes.
                </p>
                <div className="bg-gray-50 rounded p-3">
                  <h4 className="font-medium text-sm mb-2">Effective Questions:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• "Walk me through your current process"</li>
                    <li>• "What decisions do you make with this data?"</li>
                    <li>• "What's most frustrating about the current solution?"</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold">Observational Research</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Watch users in their natural work environment. See how they currently access and use data.
                </p>
                <div className="bg-gray-50 rounded p-3">
                  <h4 className="font-medium text-sm mb-2">What to Observe:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Device types and screen sizes</li>
                    <li>• Multitasking patterns</li>
                    <li>• Time pressures and interruptions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Requirements Documentation Template */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Requirements Documentation Template</h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    User Personas
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Create 2-3 detailed personas representing your main user groups with specific needs, 
                    technical skills, and goals.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Key Decisions
                  </h4>
                  <p className="text-gray-600 text-sm">
                    List the specific business decisions your dashboard should support, ranked by frequency 
                    and importance.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Success Metrics
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Define how you'll measure whether the dashboard successfully meets user needs 
                    (adoption rate, time to insight, etc.).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Considerations */}
          <section id="performance-considerations" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Performance Considerations</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Loading Time Expectations
                </h3>
                <p className="text-gray-700 mb-3">
                  Different user contexts have different performance expectations. A daily operational dashboard 
                  needs to load in under 3 seconds. A monthly strategic review can tolerate longer load times 
                  if the depth of analysis justifies it.
                </p>
                <div className="bg-orange-50 rounded p-4">
                  <h4 className="font-medium mb-2">Performance Factors to Consider:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Data refresh frequency and timing</li>
                    <li>• Number of visuals and complexity of calculations</li>
                    <li>• Network connectivity and device capabilities</li>
                    <li>• Peak usage times and concurrent users</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  Data Freshness Requirements
                </h3>
                <p className="text-gray-700 mb-3">
                  Understand how current your data needs to be. Real-time operational dashboards require 
                  different infrastructure than weekly strategic reports.
                </p>
                <div className="bg-blue-50 rounded p-4">
                  <h4 className="font-medium mb-2">Key Questions:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• How quickly do users need to see new data?</li>
                    <li>• What's the business impact of stale data?</li>
                    <li>• Are there specific times when data freshness is critical?</li>
                    <li>• How should you communicate data age and refresh status?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility and Inclusion */}
          <section id="accessibility" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Accessibility and Inclusion</h2>
            
            <p className="text-gray-700 mb-6">
              Design for users with various capabilities. This benefits everyone, not just users with 
              diagnosed impairments. Accessible design is good design.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Visual Accessibility
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• 4.5:1 contrast ratio minimum</li>
                  <li>• Don't rely only on color</li>
                  <li>• Readable fonts and sizes</li>
                  <li>• Alt text for images</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Cognitive Accessibility
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• Progressive disclosure</li>
                  <li>• Consistent patterns</li>
                  <li>• Clear, jargon-free labels</li>
                  <li>• Logical hierarchy</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-green-600" />
                  Device Accessibility
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• Mobile responsiveness</li>
                  <li>• Various screen sizes</li>
                  <li>• Different lighting</li>
                  <li>• Touch vs. mouse</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Pro Tip:</strong> Test your dashboard with accessibility tools and real users with 
                different abilities. What works for you might not work for everyone.
              </p>
            </div>
          </section>

          {/* Balancing Competing Needs */}
          <section id="balancing-needs" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Balancing Competing Needs</h2>
            
            <p className="text-gray-700 mb-6">
              When user needs conflict, use clear criteria to make decisions. Not every request can or 
              should be implemented.
            </p>

            {/* MoSCoW Method */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">The MoSCoW Method for Prioritization</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-100 rounded p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Must Have</h4>
                  <p className="text-red-800 text-sm">
                    Critical features without which the dashboard fails its primary purpose
                  </p>
                </div>
                <div className="bg-orange-100 rounded p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Should Have</h4>
                  <p className="text-orange-800 text-sm">
                    Important features that add significant value but aren't critical
                  </p>
                </div>
                <div className="bg-yellow-100 rounded p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Could Have</h4>
                  <p className="text-yellow-800 text-sm">
                    Nice-to-have features that enhance the experience if resources allow
                  </p>
                </div>
                <div className="bg-gray-100 rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Won't Have</h4>
                  <p className="text-gray-800 text-sm">
                    Features explicitly excluded from the current scope
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Management */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Managing Scope Creep
              </h3>
              <p className="text-gray-700 mb-4">
                Establish clear boundaries early and stick to them. Document what's included and excluded.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Create a "parking lot"</p>
                    <p className="text-gray-600 text-sm">Keep future enhancement ideas without derailing current work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Regular priority reviews</p>
                    <p className="text-gray-600 text-sm">Reconfirm priorities as business needs evolve</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Clear trade-off communication</p>
                    <p className="text-gray-600 text-sm">Help stakeholders understand the cost of changes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testing with Users */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Testing with Users</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Early Feedback Sessions</h3>
                <p className="text-gray-700 mb-4">
                  Share wireframes or prototypes before full development. This prevents costly changes later.
                </p>
                <div className="bg-purple-50 rounded p-4">
                  <h4 className="font-medium mb-2">What to Test:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Navigation flow and information architecture</li>
                    <li>• Visual hierarchy and scanning patterns</li>
                    <li>• Understanding of labels and terminology</li>
                    <li>• Ability to complete key tasks</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Iterative Refinement</h3>
                <p className="text-gray-700 mb-4">
                  Plan for multiple rounds of feedback. Even small adjustments can significantly impact usability.
                </p>
                <div className="bg-blue-50 rounded p-4">
                  <h4 className="font-medium mb-2">Feedback Methods:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Task-based usability testing</li>
                    <li>• Think-aloud protocols during use</li>
                    <li>• Surveys about specific features</li>
                    <li>• Analytics on actual usage patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Identify primary, secondary, and stakeholder users clearly before designing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Gather requirements through interviews and observation, not assumptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Consider performance, accessibility, and device constraints from the start</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Plan for iterative testing and improvement throughout development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Document decisions to manage scope and expectations effectively</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your User Research?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Download our free user research templates and start building better dashboards today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/best-practices"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  View Best Practices
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog/power-bi-dashboard-planning"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue to Planning
                </Link>
              </div>
            </div>
          </section>

          {/* Next in Series */}
          <section>
            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Next in the series</h3>
                  <p className="text-gray-600 text-sm">Planning Your Power BI Dashboard: Canvas Setup and Grid Systems</p>
                </div>
                <Link
                  href="/blog/power-bi-dashboard-planning"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Reading
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold">Power UI Team</h3>
              <p className="text-gray-600 mb-2">
                Helping data professionals create beautiful, effective Power BI dashboards through better design.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}