'use client'

import Link from 'next/link'
import { ArrowRight, Palette, Zap, Users, Code, Sparkles, Eye } from 'lucide-react'

export default function IntroductionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Introduction to Power UI</h1>
        <p className="text-xl text-gray-600">
          The professional Power BI theme generator that transforms your reports from ordinary to extraordinary.
        </p>
      </div>

      {/* What is Power UI */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is Power UI?</h2>
        <p className="text-gray-600 mb-4">
          Power UI is a comprehensive theme creation platform designed specifically for Power BI. It provides an intuitive visual interface 
          that eliminates the need for manual JSON editing while offering advanced features not available in any other theme generator.
        </p>
        <p className="text-gray-600">
          Whether you're a designer looking for pixel-perfect control or a developer needing efficient theme management, 
          Power UI streamlines the entire process from creation to deployment.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Style Variants</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Create multiple style variations for each visual type - the only theme generator with this capability.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Real-Time Preview</h3>
            </div>
            <p className="text-gray-600 text-sm">
              See your changes instantly in an embedded Power BI report without constant export-import cycles.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Advanced Palettes</h3>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered neutral generation, Coolors.co import, and comprehensive palette management.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold">Team Collaboration</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Share themes publicly, privately, or within your organization with granular access control.
            </p>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Who is Power UI for?</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-1">Report Designers</h3>
            <p className="text-gray-600">Create beautiful, consistent themes without touching code. Visual controls for every aspect.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-1">Developers</h3>
            <p className="text-gray-600">Advanced JSON editing, version control friendly exports, and programmatic theme generation.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-1">Organizations</h3>
            <p className="text-gray-600">Enforce brand consistency across all reports with shared theme libraries and team collaboration.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-1">Consultants</h3>
            <p className="text-gray-600">Rapidly create client-specific themes with professional results and easy handoff.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium mb-1">Design Your Foundation</h3>
              <p className="text-gray-600 text-sm">Set color palettes, typography, and core theme properties</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium mb-1">Customize Visuals</h3>
              <p className="text-gray-600 text-sm">Fine-tune each visual type with style variants for different use cases</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium mb-1">Preview in Real-Time</h3>
              <p className="text-gray-600 text-sm">See changes instantly in the embedded Power BI preview</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <div>
              <h3 className="font-medium mb-1">Export and Apply</h3>
              <p className="text-gray-600 text-sm">Download your theme and apply it to any Power BI report</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-600 mb-6">
          Ready to create your first professional Power BI theme? Our quick start guide will have you up and running in minutes.
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Prerequisites</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              A Power UI account (free tier available)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              Basic understanding of Power BI reports
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              Power BI Desktop (for applying themes)
            </li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Ready to begin?</h3>
            <p className="text-gray-600 text-sm">Jump into our quick start guide to create your first theme</p>
          </div>
          <Link
            href="/docs/quickstart"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Quick Start
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}