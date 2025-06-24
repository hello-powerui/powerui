'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Copy, Check, BookOpen, Zap, Download } from 'lucide-react'
import { useState } from 'react'

interface Step {
  title: string
  description: string
  code: string | null
  action?: { text: string; href: string }
  tips?: string[]
}

export default function QuickstartPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const steps: Step[] = [
    {
      title: 'Access Theme Studio',
      description: 'Log into Power UI and navigate to Themes from your dashboard. Click "Create New Theme" to open the Theme Studio with its three main panels.',
      code: null,
      action: { text: 'Open Theme Studio', href: '/themes' }
    },
    {
      title: 'Set Your Foundation',
      description: 'Configure core theme settings in the Foundation panel (left side). Start with Color Palette - click "Manage Palettes" to choose from trending palettes or create your own. Then select a font family like Segoe UI or Arial.',
      code: null,
      tips: ['The interface has three sections: Foundation (left), Preview (center), and Visual Styles (right)', 'Blue dots indicate changed properties']
    },
    {
      title: 'Preview Your Theme',
      description: 'Watch your theme come to life in the center panel with a live Power BI report. Changes update within 1-2 seconds. Click any visual to select it, or test focus mode by hovering and clicking the focus icon.',
      code: null,
      tips: ['Toggle between Preview and JSON views', 'The preview is fully interactive']
    },
    {
      title: 'Customize Visuals (Optional)',
      description: 'For more control, use the Visual Styles panel (right side). Select a visual type, expand sections like General or Title, and make changes that apply instantly. Create style variants for different use cases - exclusive to Power UI!',
      code: null,
      tips: ['Create variants like "emphasis" or "subtle"', 'Each variant can have completely different styling']
    },
    {
      title: 'Save and Export',
      description: 'Click "Save" to store your theme in the cloud with a unique URL. Click "Export" to download the theme.json file for use in Power BI.',
      code: `{
  "name": "My Professional Theme",
  "dataColors": ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  "background": "#FFFFFF",
  "foreground": "#000000",
  "tableAccent": "#2a9d8f",
  "visualStyles": {
    "columnChart": {
      "*": {
        "general": [{
          "responsive": true,
          "keepLayerOrder": true
        }]
      }
    }
  }
}`
    }
  ]

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <nav className="flex items-center gap-4">
              <Link 
                href="/docs" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Docs</span>
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-medium">Quick Start</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-500">Getting Started</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Quick Start Guide
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Get up and running with Power UI in just 5 minutes. Follow these simple steps to create your first custom Power BI theme.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              5 min read
            </span>
            <span>Last updated: January 2025</span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -left-12 top-0 hidden lg:flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  {step.tips && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900 mb-2">💡 Tips:</p>
                      <ul className="space-y-1">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-blue-800">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.code && (
                    <div className="relative mt-4">
                      <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-gray-800">{step.code}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.code!, index)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        {copiedStep === index ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  )}

                  {step.action && (
                    <Link
                      href={step.action.href}
                      className="inline-flex items-center gap-2 mt-4 text-gray-900 font-medium hover:underline"
                    >
                      {step.action.text}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-[-28px] top-12 bottom-[-36px] w-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>

          {/* Using in Power BI */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Using Your Theme in Power BI</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Power BI Desktop:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>Open your report in Power BI Desktop</li>
                  <li>Go to <strong>View</strong> tab → <strong>Themes</strong> dropdown</li>
                  <li>Select <strong>"Browse for themes"</strong></li>
                  <li>Choose your exported .json file</li>
                  <li>Theme applies immediately to all visuals</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2">Power BI Service:</h4>
                <p className="text-sm text-gray-600">Themes must be applied in Desktop first, then published with the report.</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">What's next?</h3>
            <p className="text-gray-600 mb-6">
              Now that you've created your first theme, explore these resources to level up your Power BI design skills:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/docs/color-palettes"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <div>
                  <h4 className="font-medium">Master Color Palettes</h4>
                  <p className="text-sm text-gray-600">Create custom palettes & import from Coolors</p>
                </div>
              </Link>
              
              <Link
                href="/docs/visual-variants"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h4 className="font-medium">Style Variants</h4>
                  <p className="text-sm text-gray-600">Multiple styles per visual type</p>
                </div>
              </Link>

              <Link
                href="/docs/sharing"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <h4 className="font-medium">Share Themes</h4>
                  <p className="text-sm text-gray-600">Collaborate with your team</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Download Resources */}
          <div className="mt-8 flex items-center justify-center">
            <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Download sample themes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/docs/introduction"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Previous</p>
                <p className="text-sm font-medium">Introduction</p>
              </div>
            </Link>
            
            <Link
              href="/docs/interface-overview"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-gray-500">Next</p>
                <p className="text-sm font-medium">Interface Overview</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}