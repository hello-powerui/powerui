'use client';

import Link from 'next/link'
import { ArrowRightIcon, Sparkles, Palette, Zap, Globe, Shield, Users, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const PowerBIVisualEmbed = dynamic(
  () => import('@/components/landing/PowerBIVisualEmbed').then(mod => mod.PowerBIVisualEmbed),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }
)


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Prefetch Power BI embed domain */}
      <link rel="dns-prefetch" href="https://app.powerbi.com" />
      <link rel="preconnect" href="https://app.powerbi.com" />
      <link rel="preconnect" href="https://wabi-us-east2-redirect.analysis.windows.net" />
      
      <Script
        src="https://app.powerbi.com/13.0.23829.90/scripts/powerbiloader.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Power BI script is loaded, resources will be preloaded when component mounts
          console.log('Power BI script loaded');
        }}
      />
      {/* Header/Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold text-gray-900">
                Power UI
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/themes" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Themes
                </Link>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Docs
                </Link>
                <Link href="/examples" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Examples
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pricing
                </Link>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Power UI 2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Beautiful Power BI themes
            <br />
            in seconds, not hours
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The complete design system for creating stunning Power BI dashboards. 
            Stop wrestling with JSON files and start shipping.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="group inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all hover:shadow-xl"
            >
              Start Building for Free
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition-all"
            >
              View Examples
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                ))}
              </div>
              <span>1,000+ analysts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★★★★★</span>
              <span>5.0 (20+ reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to design like a pro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete toolkit that transforms how you create Power BI reports
            </p>
          </div>

          {/* Bento Grid */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
            mounted && "animate-in fade-in duration-500"
          )}>
            {/* Theme Generator - Large Card */}
            <div className="md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Theme Studio</h3>
                <p className="text-white/90 mb-4">
                  Generate professional themes instantly. Pick your colors, preview live, and export to Power BI.
                </p>
                <Link 
                  href="/themes/studio" 
                  className="inline-flex items-center text-white font-medium group-hover:gap-3 gap-2 transition-all"
                >
                  Try it now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Figma Integration */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Figma System</h3>
                <p className="text-white/90 text-sm">
                  Design in Figma, deploy to Power BI. Perfect alignment guaranteed.
                </p>
              </div>
            </div>

            {/* Fast Generation */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">5-Min Setup</h3>
                <p className="text-white/90 text-sm">
                  From zero to beautiful theme in minutes, not hours.
                </p>
              </div>
            </div>

            {/* Icon Library */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">1,500+ Icons</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Professional icons for every use case
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-800 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>

            {/* Templates */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">55+ Templates</h3>
              <p className="text-gray-600 text-sm mb-4">
                Industry-specific themes ready to use
              </p>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-12 h-8 bg-gray-200 rounded border-2 border-white" />
                ))}
              </div>
            </div>

            {/* Enterprise Features */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
                  <p className="text-gray-600 mb-4">
                    Team collaboration, version control, and brand consistency at scale.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Team licenses
                    </span>
                    <span>SSO support</span>
                    <span>API access</span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See the difference
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A single Power BI donut chart with our professional theme applied. 
              Clean, focused, and beautifully styled.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Live Power BI Report</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live data</span>
              </div>
            </div>
            <div className="p-8 bg-gray-50 flex justify-center">
              <PowerBIVisualEmbed 
                visualName="a514429d97b4ca4dc991"
                pageName="97051b42cbd76adb2f5b"
                width={300}
                height={400}
                className="rounded-lg shadow-inner"
              />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              This is a real Power BI visual from our sample report
            </p>
            <Link
              href="/themes/studio"
              className="inline-flex items-center text-gray-900 font-medium hover:gap-3 gap-2 transition-all"
            >
              Try the theme studio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <span className="text-sm font-medium">Trusted by teams at</span>
            {['Microsoft', 'Deloitte', 'PwC', 'EY', 'Accenture'].map((company) => (
              <span key={company} className="text-gray-600 font-medium">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Simplified */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Loved by data professionals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Power UI transformed how our team creates reports. What used to take hours now takes minutes.",
                author: "Sarah Chen",
                role: "Lead Analyst, Microsoft"
              },
              {
                quote: "The Figma integration is a game-changer. Design approval is so much faster now.",
                author: "Marcus Johnson",
                role: "BI Developer, Spotify"
              },
              {
                quote: "Finally, Power BI themes that actually look professional. Worth every penny.",
                author: "Emma Rodriguez",
                role: "Data Consultant"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start creating beautiful reports today
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join 1,000+ analysts building better dashboards with Power UI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <span className="font-semibold">Power UI</span>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link>
            <a href="mailto:hello@powerui.com" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
          </div>
          <p className="text-sm text-gray-500">© 2025 Power UI. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}