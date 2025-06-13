'use client';

import Link from 'next/link'
import { CheckIcon, ArrowRightIcon, Sparkles, Palette, BookOpen, Bot, Users } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    quote: "Power UI enables me to quickly deliver polished, app-like reports, saving me a tremendous amount of time and effort...",
    author: "Kimberlee Jelly",
    role: "Product Manager, Microsoft",
  },
  {
    quote: "A huge thank you for Power UI! It's been critical to reducing the time I spend on formatting while improving report quality.",
    author: "Mitchell Telatnik",
    role: "Founder, SecureMetrics.io",
  },
  {
    quote: "Thank you for all you do - you helped me land my dream job!!",
    author: "Sophia C.",
  },
  {
    quote: "Your e-book was amazing. Finally, dashboard design principles that actually make sense.",
    author: "Muhammad K.",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Theme Generator",
    description: "Generate professional Power BI themes instantly. No more wrestling with JSON files or inconsistent styling across reports.",
  },
  {
    icon: "🎨",
    title: "Figma Design System",
    badge: "New!",
    description: "Design and iterate in Figma, then apply identical styling in Power BI. Perfect pixel alignment every time.",
  },
  {
    icon: "📚",
    title: "Expert Design Resources",
    description: "100+ page design guide, 1,500+ dashboard icons, and proven templates from seasoned Power BI professionals.",
  },
];

const customizationOptions = [
  {
    icon: "🌙",
    title: "Light & Dark Themes",
    description: "Switch between light and dark modes instantly. Colors adjust automatically across your entire report.",
  },
  {
    icon: "🎯",
    title: "55+ Style Presets",
    description: "Choose from professionally designed themes that work for any industry. Each preset follows proven design principles.",
  },
  {
    icon: "🎨",
    title: "Brand Color Integration",
    description: "Match your company colors perfectly with smart palette suggestions and real-time preview.",
  },
  {
    icon: "✨",
    title: "Consistent Typography",
    description: "Professional font combinations and sizing that work together seamlessly across all your reports.",
  },
];

const resources = [
  {
    icon: "📖",
    title: "Complete Design Guide",
    description: "100+ pages of dashboard design principles with real examples. Learn what makes reports effective vs. overwhelming.",
  },
  {
    icon: "🔧",
    title: "Figma Workflow System",
    description: "Design faster by prototyping in Figma first. Get stakeholder buy-in before you build, then apply identical styling in Power BI.",
  },
  {
    icon: "🔍",
    title: "Professional Icon Library",
    description: "1,500+ carefully crafted icons for navigation, KPIs, and visual hierarchy. Available as URLs or Figma components.",
  },
  {
    icon: "🤖",
    title: "AI Assistant (Free)",
    description: "Generate DAX formulas, optimize visuals, and get instant answers to Power BI questions.",
    cta: "Try the GPT →",
  },
];

const userTypes = [
  {
    icon: "📈",
    title: "Data Analysts & BI Developers",
    description: "Speed up report creation and ensure consistent branding across all deliverables.",
  },
  {
    icon: "💼",
    title: "Consultants & Agencies",
    description: "Deliver premium-looking reports that justify higher rates and win more clients.",
  },
  {
    icon: "👥",
    title: "Enterprise Data Teams",
    description: "Standardize report design across departments and maintain brand consistency at scale.",
  },
];

const faqs = [
  {
    question: "What exactly is Power UI?",
    answer: "Power UI is a complete toolkit for creating professional Power BI reports. It includes a theme generator, Figma design system, expert guides, and 1,500+ icons.",
  },
  {
    question: "Do I need Power BI experience to use this?",
    answer: "Yes, Power UI is designed for people who already use Power BI. If you can create basic reports, you can use Power UI to make them look amazing.",
  },
  {
    question: "How is this different from free theme generators?",
    answer: "Power UI combines professional design principles with practical tools. You get themes that actually look good, plus the knowledge to use them effectively.",
  },
  {
    question: "Is this really lifetime access?",
    answer: "Yes. One payment gets you lifetime access to Power UI plus all future updates and new resources we add.",
  },
  {
    question: "Can I use this for client work?",
    answer: "Absolutely. Power UI includes commercial usage rights for unlimited personal and client projects.",
  },
  {
    question: "What if I don't know Figma?",
    answer: "The Figma system is optional. You can create beautiful reports using just the theme generator and design guide.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeResourceTab, setActiveResourceTab] = useState(0);

  return (
    <>
      {/* Header/Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Power UI
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="#examples" className="text-gray-600 hover:text-gray-900 text-sm">
                  Examples
                </Link>
                <Link href="#resources" className="text-gray-600 hover:text-gray-900 text-sm">
                  Resources
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 text-sm">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Stop wrestling with Power BI formatting
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-6">
            Create dashboard themes that actually look professional
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Skip the tedious styling work. Power UI gives you everything needed to build beautiful, consistent Power BI reports in minutes, not hours.
          </p>
          <div className="flex items-center justify-center space-x-8 mb-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 font-semibold">5.0</span>
              <span className="ml-1">from 20+ reviews</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">1,000+</span>
              <span className="ml-1">analysts already using Power UI</span>
            </div>
          </div>
          <Link
            href="/sign-up"
            className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start Building Beautiful Dashboards
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Trusted by data teams at 200+ companies
          </h3>
          <p className="text-gray-600">From Fortune 500s to fast-growing startups</p>
        </div>
      </section>

      {/* Meet Power UI Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need for stunning Power BI dashboards
            </h2>
            <h3 className="text-2xl text-gray-600 mb-6">
              Design system, theme generator, and expert resources—all in one toolkit
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your reports from functional to exceptional. Power UI handles the design complexity so you can focus on delivering insights that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                  {feature.badge && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Customization Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Build Power BI themes in 5 minutes (not 5 hours)
            </h2>
            <p className="text-lg text-gray-600">
              No technical expertise required. Our generator applies design best practices automatically—you just pick colors and click apply.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {customizationOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === index
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.title}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                {customizationOptions[activeTab].title}
              </h3>
              <p className="text-gray-600 text-lg">
                {customizationOptions[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">See Power UI in action</h2>
          <h3 className="text-2xl text-gray-600 mb-8">Real reports from real companies</h3>
          <p className="text-lg text-gray-600 mb-8">
            Download 15+ example dashboards and see exactly how to structure layouts for maximum impact.
          </p>
          <Link
            href="/examples"
            className="inline-flex items-center text-gray-900 font-medium hover:underline"
          >
            Browse All Examples
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Analytics Resources Section */}
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Master dashboard design with expert guidance
            </h2>
            <h3 className="text-2xl text-gray-600 mb-6">
              Everything you need to create reports that executives actually want to look at
            </h3>
            <p className="text-lg text-gray-600">
              Stop guessing about design decisions. Get proven frameworks, tested layouts, and professional assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveResourceTab(index)}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">{resource.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    {resource.cta && (
                      <Link
                        href="#"
                        className="inline-flex items-center text-sm text-gray-900 font-medium hover:underline"
                      >
                        {resource.cta}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">We&apos;re constantly improving Power UI</h2>
            <h3 className="text-2xl text-gray-600 mb-6">New features every month based on user feedback</h3>
            <p className="text-lg text-gray-600">
              Stay ahead of design trends with regular updates. Your one-time purchase includes all future enhancements and new resources.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6">What&apos;s Coming</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-medium">In Progress:</span>
                <span className="ml-2 text-gray-600">Enhanced API, advanced customization options</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">📅</span>
                <span className="font-medium">February 2025:</span>
                <span className="ml-2 text-gray-600">Figma Design System v2.0 with component variants</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">📅</span>
                <span className="font-medium">Q1 2025:</span>
                <span className="ml-2 text-gray-600">Team collaboration features and shared theme libraries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What our customers say</h2>
            <h3 className="text-2xl text-gray-600">Real feedback from data professionals like you</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200">
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose the plan that fits your team</h2>
            <h3 className="text-2xl text-gray-600">One-time payment. Lifetime access. No subscriptions.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Personal Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Personal</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$119</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for individual analysts and consultants</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Complete theme generator access</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">15+ example reports with source files</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">100+ page design guide (PDF)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Figma design system</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">1,500+ professional icons</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">All future updates included</span>
                </li>
              </ul>
              <Link
                href="/checkout?plan=personal"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Personal Access →
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white p-8 rounded-xl border-2 border-gray-900 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </div>
              <h3 className="text-2xl font-bold mb-2">Team</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$399</span>
              </div>
              <p className="text-gray-600 mb-6">Best for small teams (2-10 people)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Personal</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">5 transferable licenses</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Team member management portal</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority email support</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Team training resources</span>
                </li>
              </ul>
              <Link
                href="/checkout?plan=team"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Team Access →
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$699</span>
              </div>
              <p className="text-gray-600 mb-6">For organizations needing scale and support</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Team</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">10 transferable licenses</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support with 24hr response</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom theme consultation</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Volume licensing available</span>
                </li>
              </ul>
              <Link
                href="/contact-sales"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Contact Sales →
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8">
            All plans include lifetime updates and 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Who Uses Power UI */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Join 1,000+ analysts creating reports that get noticed
            </h2>
            <h3 className="text-2xl text-gray-600">
              Whether you&apos;re building your first dashboard or your hundredth, Power UI adapts to your skill level
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200">
                <span className="text-3xl mb-4 block">{type.icon}</span>
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Common questions answered</h2>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold mb-3">Q: {faq.question}</h3>
                <p className="text-gray-600">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Questions? We&apos;re here to help.</h3>
          <p className="mb-8">
            Email us at{' '}
            <a href="mailto:hello@powerui.com" className="underline">
              hello@powerui.com
            </a>{' '}
            for quick answers
          </p>
          <div className="text-sm text-gray-400">
            © 2025 Power UI •{' '}
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>{' '}
            •{' '}
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}