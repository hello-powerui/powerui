'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Target, Lightbulb, TrendingUp, AlertCircle, CheckCircle, Users, BookOpen, Zap, ChevronRight, Clock, Calendar } from 'lucide-react'

export default function BlogContent() {
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
              8 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Power BI Dashboard Design Philosophy: Why Great Design Matters
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            In today's data-driven world, the difference between a dashboard that drives action and one that 
            causes confusion often comes down to design. This guide explores the fundamental principles that 
            separate exceptional Power BI dashboards from the merely functional.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Dashboard Design', 'Power BI', 'Data Visualization', 'Best Practices'].map((tag) => (
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
              <a href="#why-design-matters" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Why dashboard design matters for business success
              </a>
              <a href="#design-communication" className="block text-gray-600 hover:text-gray-900 transition-colors">
                How design is fundamentally about communication
              </a>
              <a href="#power-bi-advantages" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Power BI's unique advantages for designers
              </a>
              <a href="#core-principles" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Core design principles for professional dashboards
              </a>
              <a href="#your-role" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Your evolving role as a dashboard designer
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Why Design Matters */}
          <section id="why-design-matters" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Dashboard Design Matters</h2>
            
            <p className="text-gray-700 mb-6">
              In today's analytics environment, data professionals face increasing demands. They must query data, 
              build models, create data flows, and pull from multiple sources. On top of these technical tasks, 
              they're also expected to create visually engaging, intuitive reports. This can feel overwhelming, 
              and design often seems like a luxury for those with extra time.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-900">Poorly Designed Reports</h3>
                </div>
                <ul className="space-y-2 text-red-800">
                  <li>• Confuse users and slow decision-making</li>
                  <li>• Erode trust in data accuracy</li>
                  <li>• Create negative perceptions of the entire reporting environment</li>
                  <li>• Lead to incorrect business decisions</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-900">Well-Designed Dashboards</h3>
                </div>
                <ul className="space-y-2 text-green-800">
                  <li>• Streamline communication between teams</li>
                  <li>• Provide decision-makers with actionable information</li>
                  <li>• Enable quick, confident responses to challenges</li>
                  <li>• Build trust in data-driven processes</li>
                </ul>
              </div>
            </div>

            <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-gray-700">
              "For beginners, design is often an afterthought. But as the field evolves, the importance of design 
              has never been greater."
            </blockquote>
          </section>

          {/* Design is Communication */}
          <section id="design-communication" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Design is Communication</h2>
            
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">The Bridge Between Data and Decisions</h3>
              </div>
              <p className="text-blue-800">
                Effective design is not just about aesthetics—it's about communication. Great design helps bridge 
                the gap between data and decision-making. Business leaders need reports that are intuitive, easy 
                to understand, and visually appealing.
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              When dashboards are designed well, they not only make data easier to interpret but also elevate 
              the professionalism of the reporting environment. This creates a positive feedback loop where:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Users trust the data more</h4>
                  <p className="text-gray-600 text-sm">Professional appearance signals quality and reliability</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adoption rates increase</h4>
                  <p className="text-gray-600 text-sm">Easy-to-use dashboards get used more frequently</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Better decisions are made</h4>
                  <p className="text-gray-600 text-sm">Clear information leads to confident action</p>
                </div>
              </div>
            </div>
          </section>

          {/* Power BI's Unique Advantages */}
          <section id="power-bi-advantages" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Power BI's Unique Advantages</h2>
            
            <p className="text-gray-700 mb-6">
              Power BI provides distinct advantages for dashboard design. Creating a dashboard outside of Power BI 
              with similar interactivity, data connectivity, and visual polish would require significant time and 
              development resources.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-600" />
                Time Efficiency Comparison
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Traditional Development</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Database Connection</span>
                      <span className="text-gray-500">2-3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interactive Charts</span>
                      <span className="text-gray-500">1-2 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filtering System</span>
                      <span className="text-gray-500">1 week</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsive Design</span>
                      <span className="text-gray-500">3-5 days</span>
                    </div>
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total</span>
                      <span>3-4 weeks</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Power BI Development</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Database Connection</span>
                      <span className="text-green-600">30 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interactive Charts</span>
                      <span className="text-green-600">2-4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filtering System</span>
                      <span className="text-green-600">1 hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsive Design</span>
                      <span className="text-green-600">Built-in</span>
                    </div>
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total</span>
                      <span className="text-green-600">1-2 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              This efficiency frees you to focus more on delivering insights rather than wrestling with technical 
              complexities. You can spend time understanding user needs, refining visual design, and creating 
              compelling data stories.
            </p>
          </section>

          {/* Core Design Principles */}
          <section id="core-principles" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Core Design Principles</h2>
            
            <p className="text-gray-700 mb-6">
              As you develop your dashboards, remember these fundamental principles that guide all great design work:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  Great design doesn't require artistic talent
                </h3>
                <p className="text-gray-600">
                  It's about applying core principles that guide your decisions around layout, color, typography, 
                  and spacing. By focusing on clarity and function, even the simplest design choices can lead to 
                  impactful results.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Create dashboards that let data speak clearly
                </h3>
                <p className="text-gray-600">
                  The goal is to help your audience draw the right conclusions quickly and confidently. Remove 
                  barriers between your users and the insights they need.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  The best dashboards are iterative
                </h3>
                <p className="text-gray-600">
                  Don't be afraid to experiment and refine your designs over time. Seek feedback from colleagues 
                  and users. Use their input to enhance both usability and visual appeal.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Remember:</strong> Power BI provides the flexibility to evolve your designs as new insights 
                emerge and as your skills develop. Iteration is key to mastering not only the technical aspects 
                but also the design process that transforms data into clear, actionable insights.
              </p>
            </div>
          </section>

          {/* Your Role as a Designer */}
          <section id="your-role" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Your Role as a Designer</h2>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">You're Delivering Understanding</h3>
              <p className="text-blue-50">
                Your role as an analyst or designer goes beyond just delivering numbers. When your dashboards 
                are both functional and visually polished, you build trust with your audience. You empower them 
                to make informed, confident decisions.
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              The principles in this series will help you create dashboards that aren't just reports—they're 
              tools for driving action, insight, and success in your organization. You'll learn to:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Balance technical and design skills</p>
                  <p className="text-gray-600 text-sm">Combine Power BI expertise with design thinking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Create user-centered experiences</p>
                  <p className="text-gray-600 text-sm">Design with your audience's needs in mind</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Build scalable design systems</p>
                  <p className="text-gray-600 text-sm">Create consistent, maintainable reports</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Measure and improve impact</p>
                  <p className="text-gray-600 text-sm">Continuously refine based on user feedback</p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Learning Path */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Your Learning Path</h2>
            
            <p className="text-gray-700 mb-6">
              This blog series is structured to build your skills progressively. Each post focuses on a specific 
              aspect of dashboard design, with practical techniques you can apply immediately.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold mb-1">Foundation Skills</h3>
                <p className="text-gray-600">Understanding your audience, planning layouts, and setting up proper foundations</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-1">Visual Design</h3>
                <p className="text-gray-600">Typography, color theory, visual hierarchy, and professional polish</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-1">Advanced Techniques</h3>
                <p className="text-gray-600">Interactions, performance optimization, and design systems</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold mb-1">Real-World Application</h3>
                <p className="text-gray-600">Testing, deployment, maintenance, and continuous improvement</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold mb-3">Native Power BI Focus</h3>
              <p className="text-gray-700">
                All techniques use only native Power BI features. No external tools or complex workarounds are 
                required. This approach ensures your designs are sustainable, scalable, and maintainable.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Dashboards?</h2>
              <p className="text-lg mb-6 text-gray-300">
                Start applying these principles today and see the difference thoughtful design makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/themes/studio"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Try Power UI Theme Studio
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Continue Reading Series
                </Link>
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
                  <span>Effective dashboard design is essential for modern data analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Power BI provides powerful tools to create professional reports efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Design is about communication, not just aesthetics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>With the right principles, you can transform dashboards into compelling communication tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Great design doesn't require artistic talent—just understanding of core principles</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Next in Series */}
          <section>
            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Next in the series</h3>
                  <p className="text-gray-600 text-sm">Understanding Your Audience: The Foundation of Great Dashboard Design</p>
                </div>
                <Link
                  href="/blog/power-bi-dashboard-user-research"
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