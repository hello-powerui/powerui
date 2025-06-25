'use client';

import Link from 'next/link';
import { Linkedin, Mail, BarChart3, Palette, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Power UI</h1>
          <p className="text-xl text-gray-600">
            Making Power BI beautiful, one theme at a time
          </p>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto md:mx-0 mb-4"></div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">Jonathan Sandmann</h2>
                  <p className="text-gray-600 mb-4">Founder & Creator</p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    <a
                      href="https://www.linkedin.com/in/jonathansandmann/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:hello@powerui.com"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Hi! I'm Jonathan, the creator of Power UI. After years of working with Power BI 
                  and struggling with the complexity of creating beautiful themes through JSON files, 
                  I decided there had to be a better way.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I've spent countless hours manually editing theme files, testing colors, and helping 
                  teams implement consistent branding across their reports. This experience led me to 
                  build Power UI – a tool that transforms what used to take hours into a process that 
                  takes just minutes.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Power UI is built by someone who understands the daily challenges of working with 
                  Power BI. Every feature is designed to solve real problems that analysts and 
                  developers face when creating professional reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Mission</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="font-semibold mb-2">Democratize Design</h4>
              <p className="text-gray-600 text-sm">
                Make professional design accessible to every Power BI user, regardless of their design experience.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="font-semibold mb-2">Save Time</h4>
              <p className="text-gray-600 text-sm">
                Transform hours of manual JSON editing into minutes of visual design with instant preview.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="font-semibold mb-2">Foster Community</h4>
              <p className="text-gray-600 text-sm">
                Build a community where designers and analysts share themes and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Power UI by the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">1,000+</div>
              <div className="text-gray-600 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">10,000+</div>
              <div className="text-gray-600 text-sm">Themes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">1,500+</div>
              <div className="text-gray-600 text-sm">Icons Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Reports?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of analysts creating beautiful Power BI themes with Power UI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}