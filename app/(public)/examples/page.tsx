'use client'

import { ExampleReportsShowcasePublic } from '@/components/example-reports/ExampleReportsShowcasePublic'
import { ChartBar, Users, TrendingUp, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Example Reports
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Explore our collection of professionally designed Power BI dashboards. 
              Each example showcases best practices in data visualization and theme design.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">What You'll Find</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ChartBar className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Real-World Dashboards</h3>
                <p className="text-sm text-gray-600">
                  Production-ready dashboard designs across various industries
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Multiple Use Cases</h3>
                <p className="text-sm text-gray-600">
                  From executive KPIs to detailed analytics reports
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Best Practices</h3>
                <p className="text-sm text-gray-600">
                  Learn from expertly crafted visualizations and layouts
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Interactive Previews</h3>
                <p className="text-sm text-gray-600">
                  Explore live Power BI reports directly in your browser
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Reports Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Browse Example Reports</h2>
            <p className="text-gray-600">
              Click on any report to view an interactive preview. Sign up for a free account to download these examples.
            </p>
          </div>
          
          <ExampleReportsShowcasePublic />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Own Themes?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start building beautiful Power BI themes with our intuitive Theme Studio
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/sign-up" 
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/docs" 
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}