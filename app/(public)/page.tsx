'use client';

import Link from 'next/link'
import { ArrowRightIcon, Sparkles, ChevronRight, Moon, Sun, Users, Share2, PlayCircle, TrendingUp, BarChart3, PieChart, Activity, Target, Zap, Shield, Globe, Database, GitBranch, Layers, Palette, LineChart, DollarSign, Package, ShoppingCart, Calendar, Clock, Mail, Phone, MapPin, Briefcase, Settings, FileText, FolderOpen, Download, Upload, Heart, Star, Award, Flag, AlertCircle, CheckCircle, XCircle, Info, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { BentoGrid, BentoCard } from '@/components/landing/bento-grid'
import { AnimatedHeroBackground } from '@/components/landing/animated-hero-background'
import { PricingCards } from '@/components/pricing-cards'
import { FAQSection } from '@/components/faq-section'
import { ConstantImprovements } from '@/components/landing/constant-improvements'
import { ThemeStudioSkeleton, VisualStyleSkeleton, ThemeModeSkeleton, TeamSkeleton, TemplateGridSkeleton, FigmaIntegrationSkeleton, MiniExampleReports } from '@/components/landing/bento-skeletons'
import { ThemeStudioPreview } from '@/components/landing/theme-studio-preview'
import { JsonPreview } from '@/components/landing/json-preview'
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
              href="/pricing"
              className="group inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all hover:shadow-xl hover:scale-105"
            >
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center text-gray-700 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/80 transition-all"
            >
              View Examples
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mt-12 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {/* Overlapping profile pictures */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-white"></div>
            </div>
            <span>Trusted by 1,000+ developers</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
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
            <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2 p-3 group">
              <Link href="/themes/studio" className="flex flex-col h-full cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Theme Studio</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Customize every aspect of your Power BI theme - colors, fonts, borders, shadows, and 100+ visual properties.
                </p>
                {/* Studio Preview - Interactive Demo */}
                <div className="flex-grow">
                  <ThemeStudioPreview />
                </div>
              </Link>
            </BentoCard>

            {/* Live JSON Preview */}
            <BentoCard className="row-span-2 p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Live JSON Preview</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Real-time theme JSON.
                </p>
                {/* JSON Preview */}
                <div className="flex-grow">
                  <JsonPreview />
                </div>
              </div>
            </BentoCard>

            {/* Style Presets - Expanded */}
            <BentoCard className="md:row-span-2 p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Style Presets</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Transform your visuals with different styling options that you can toggle right from Power BI.
                </p>
                {/* Visual Style Preview - Using Skeleton */}
                <div className="flex-grow">
                  <VisualStyleSkeleton />
                </div>
              </div>
            </BentoCard>

            {/* Live Power BI Preview */}
            <BentoCard className="p-4">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Power BI Embedded</h3>
                  <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">NEW</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  See real Power BI visuals update as you design.
                </p>
                {/* Live embedded preview */}
                <div className="flex-grow relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                  <div className="flex items-center gap-4">
                    {/* Power BI Logo with pulsing background */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" />
                      <div className="relative bg-yellow-100 rounded-full p-2">
                        <img src="/icons/pbi-logo.svg" alt="Power BI" className="h-5 w-5" />
                      </div>
                    </div>
                    
                    {/* Connection lines with heartbeat */}
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-0.5 bg-gray-300" />
                      <Activity className="w-4 h-4 animate-pulse" />
                      <div className="w-8 h-0.5 bg-gray-300" />
                    </div>
                    
                    {/* Live indicator */}
                    <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-sm">
                      <Eye className="h-3 w-3 text-red-500" />
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-gray-700">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Light & Dark Mode */}
            <BentoCard className="p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Light & Dark Mode</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Switch between themes instantly. No manual adjustments.
                </p>
                {/* Theme Mode Preview - Using Skeletons */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1">
                    <ThemeModeSkeleton mode="light" />
                  </div>
                  <div className="flex-1">
                    <ThemeModeSkeleton mode="dark" />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Theme Sharing */}
            <BentoCard className="p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Theme Sharing</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Share themes with your team or the community.
                </p>
                {/* Share Preview */}
                <div className="mt-3 space-y-1.5">
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600 font-mono">powerui.com/t/...</span>
                    </div>
                    <button className="text-xs bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors">
                      Copy
                    </button>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">+3</span>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Organization Features - Wide Card */}
            <BentoCard className="md:col-span-2 p-4">
              <div className="flex items-center justify-between h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Organization Themes & Palettes</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Centralize your brand colors and themes. Team members can collaborate and ensure consistency across all reports.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">
                      <Users className="w-3.5 h-3.5" />
                      Team workspace
                    </span>
                  </div>
                </div>
                {/* Team Preview - Using Skeleton */}
                <div className="hidden lg:block ml-6">
                  <TeamSkeleton />
                </div>
              </div>
            </BentoCard>

            {/* Icons */}
            <BentoCard className="p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">1,500+ Icons</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Professional icons for every metric and KPI.
                </p>
                {/* Actual Icons Preview */}
                <div className="mt-2">
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {[TrendingUp, BarChart3, PieChart, Activity, Target, Zap, Shield, Globe, Database, GitBranch, Layers, Palette].map((Icon, i) => (
                      <div key={i} className="bg-gray-50 rounded p-2 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                    ))}
                  </div>
                  <Link 
                    href="/icons" 
                    className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 transition-colors"
                  >
                    View all icons <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </BentoCard>

            {/* Figma Design System */}
            <BentoCard className="p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Figma Design System</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete UI kit for Power BI design.
                </p>
                {/* Figma Integration Preview - Using Skeleton */}
                <div className="flex-grow">
                  <FigmaIntegrationSkeleton />
                </div>
              </div>
            </BentoCard>

            {/* Templates */}
            <BentoCard className="md:col-span-2 p-4">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-gray-900">55+ Example Reports</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Production-ready Power BI reports across industries.
                </p>
                {/* Mini Examples Preview */}
                <div className="mt-2">
                  <MiniExampleReports />
                  <Link 
                    href="/examples" 
                    className="mt-3 text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 transition-colors"
                  >
                    View all example reports <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
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
              href="/pricing"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all"
            >
              Get Started
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