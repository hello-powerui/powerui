'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Copy, Check, BookOpen, Zap, Download } from 'lucide-react'
import { useState } from 'react'

export default function QuickstartPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const steps = [
    {
      title: 'Sign up for Power UI',
      description: 'Create your free account to access the theme studio and all features.',
      code: null,
      action: { text: 'Create Account', href: '/sign-up' }
    },
    {
      title: 'Open Theme Studio',
      description: 'Navigate to the Theme Studio from your dashboard.',
      code: null,
      action: { text: 'Open Studio', href: '/themes/studio' }
    },
    {
      title: 'Choose your colors',
      description: 'Select your brand colors or use our AI-powered color suggestions.',
      code: null
    },
    {
      title: 'Export your theme',
      description: 'Download your theme as a JSON file ready for Power BI.',
      code: `{
  "name": "My Custom Theme",
  "dataColors": ["#1e293b", "#3b82f6", "#10b981"],
  "background": "#ffffff",
  "foreground": "#1e293b",
  "tableAccent": "#f3f4f6"
}`
    },
    {
      title: 'Import to Power BI',
      description: 'In Power BI Desktop, go to View → Themes → Browse for themes and select your JSON file.',
      code: null
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
                  
                  {step.code && (
                    <div className="relative">
                      <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-gray-800">{step.code}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.code, index)}
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

          {/* Next Steps */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">What's next?</h3>
            <p className="text-gray-600 mb-6">
              Now that you've created your first theme, explore these resources to level up your Power BI design skills:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/docs/color-palettes"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <div>
                  <h4 className="font-medium">Color Palette Guide</h4>
                  <p className="text-sm text-gray-600">Learn color theory for data viz</p>
                </div>
              </Link>
              
              <Link
                href="/docs/figma-workflow"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium">Figma Integration</h4>
                  <p className="text-sm text-gray-600">Design-first workflow</p>
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
              href="/docs/installation"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-gray-500">Next</p>
                <p className="text-sm font-medium">Installation</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}