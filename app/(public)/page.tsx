'use client';

import Link from 'next/link'
import { ArrowRightIcon, Sparkles, ChevronRight, Moon, Sun, Users, Share2, PlayCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { BentoGrid, BentoCard } from '@/components/landing/bento-grid'
import { AnimatedHeroBackground } from '@/components/landing/animated-hero-background'
import { PricingCards } from '@/components/pricing-cards'
import { FAQSection } from '@/components/faq-section'
import { ConstantImprovements } from '@/components/landing/constant-improvements'
import Image from 'next/image'
import './page.css'


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedHeroBackground className="-z-10" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-8 animate-slide-down">
            <Sparkles className="w-3.5 h-3.5 animate-pulse-slow" />
            <span>Introducing Power UI 2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent animate-slide-up">
            Beautiful Power BI themes
            <br />
            in seconds, not hours
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
            The complete design system for creating stunning Power BI dashboards. 
            Stop wrestling with JSON files and start shipping.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <Link
              href="/sign-up"
              className="group inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all hover:shadow-xl hover:scale-105"
            >
              Start Building for Free
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center text-gray-700 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/80 transition-all"
            >
              View Examples
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <span>Trusted by 1,000+ analysts</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★★★★★</span>
              <span>5.0 (20+ reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
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
          <BentoGrid className={mounted ? "animate-in fade-in duration-500" : ""}>
            {/* Theme Studio - Large Card */}
            <BentoCard className="md:col-span-3 lg:col-span-3 row-span-2 p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Featured</span>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Theme Studio</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Generate professional themes instantly. Pick your colors, preview live, and export to Power BI.
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/themes/studio" 
                    className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 hover:gap-3 gap-2 transition-all"
                  >
                    Launch Studio <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Studio Preview */}
                <div className="mt-6 flex gap-3">
                  <div className="relative h-64 w-1/3 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src="/landingpageimages/foundation panel.png"
                      alt="Foundation Panel"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-64 flex-1 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src="/landingpageimages/studio.png"
                      alt="Theme Studio Preview"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-64 w-1/3 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src="/landingpageimages/visual style panel.png"
                      alt="Visual Style Panel"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Style Presets */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Visual Variants</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Style Presets</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  Choose from multiple visual styles for your data.
                </p>
                {/* Visual Style Preview */}
                <div className="mt-4 relative h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <Image
                    src="/landingpageimages/visual style panel.png"
                    alt="Visual Style Panel"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </BentoCard>

            {/* Live Power BI Preview */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Live Preview</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Power BI Embedded</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  See real Power BI visuals update as you design.
                </p>
                {/* Dashboard Preview */}
                <div className="mt-4 relative h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <Image
                    src="/landingpageimages/dashboard.png"
                    alt="Power BI Dashboard"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </BentoCard>

            {/* Light & Dark Mode */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">One Click</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Light & Dark Mode</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  Switch between themes instantly. No manual adjustments.
                </p>
                {/* Placeholder visual */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <Sun className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 h-20 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Moon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Theme Sharing */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Collaboration</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Theme Sharing</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  Share themes with your team or the community.
                </p>
                {/* Placeholder visual */}
                <div className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Share link copied</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Organization Features - Wide Card */}
            <BentoCard className="md:col-span-2 p-6">
              <div className="flex items-start justify-between h-full">
                <div className="flex-grow">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-4 inline-block">Teams</span>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Organization Themes & Palettes</h3>
                  <p className="text-gray-600 mb-6">
                    Centralize your brand colors and themes. Ensure consistency across all reports.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">
                      <Users className="w-3.5 h-3.5" />
                      Team workspace
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">Version control</span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">Brand library</span>
                  </div>
                </div>
                {/* Foundation Panel Preview */}
                <div className="hidden lg:block ml-8">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src="/landingpageimages/foundation panel.png"
                      alt="Foundation Panel"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Icons */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Assets</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">1,500+ Icons</h3>
                <p className="text-gray-600 text-sm">
                  Professional icons for every metric and KPI.
                </p>
                {/* Icons Preview */}
                <div className="mt-4 relative h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <Image
                    src="/landingpageimages/icons.png"
                    alt="Icon Library"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </BentoCard>

            {/* Figma Plugin */}
            <BentoCard className="p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Integration</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Figma Plugin</h3>
                <p className="text-gray-600 text-sm">
                  Design in Figma, export to Power BI seamlessly.
                </p>
                {/* Placeholder visual */}
                <div className="mt-auto">
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-6 h-6 bg-purple-200 rounded"></div>
                      <span className="text-xs text-gray-400">→</span>
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Templates */}
            <BentoCard className="md:col-span-2 p-6">
              <div className="flex flex-col h-full">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-4">Templates</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">55+ Templates</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  Industry-specific themes ready to use.
                </p>
                {/* Examples Preview */}
                <div className="mt-4 relative h-32 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <Image
                    src="/landingpageimages/examples.png"
                    alt="Template Examples"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
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

      {/* Video Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Power UI in Action</h2>
          <p className="text-xl text-gray-600 mb-8">
            Watch how easy it is to create beautiful Power BI themes in minutes
          </p>
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/10 backdrop-blur-sm p-6 rounded-full hover:bg-white/20 transition-all group">
                <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm">
              Video demo coming soon
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, One-Time Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No subscriptions. Pay once, use forever. 30-day money-back guarantee.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <FAQSection />
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

      {/* Constant Improvements Section */}
      <ConstantImprovements />

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