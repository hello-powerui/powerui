'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqItems } from '@/lib/pricing-data';
import Link from 'next/link';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gray-500 transition-transform",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "px-6 overflow-hidden transition-all",
                openIndex === index ? "py-4" : "max-h-0"
              )}
            >
              <div className="text-gray-600">
                {item.question === 'What makes Power UI different from other theme generators?' ? (
                  <>
                    Power UI offers live Power BI preview, 1,500+ professional icons, comprehensive design systems, light/dark mode support, organization theme sharing, and continuous updates. Read our detailed comparison in our{' '}
                    <Link href="/blog/power-bi-theme-generator-guide" className="text-blue-600 hover:text-blue-700 underline">
                      blog post about Power BI theme generators
                    </Link>.
                  </>
                ) : item.question === 'Can I share themes with non-Power UI users?' ? (
                  <>
                    You can use Power UI themes in your personal and organizational reports, but not in reports you make publicly available or sell. Essentially, use Power UI to make your reports better, but don't distribute the themes on websites or in downloadable PBIX files. For detailed questions, refer to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                      terms of service
                    </Link>.
                  </>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Still have questions CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">We're here to help.</p>
        <a 
          href="/contact" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          Contact us →
        </a>
      </div>
    </div>
  );
}