'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pricingPlans } from '@/lib/pricing-data';

interface PricingCardsProps {
  showDescription?: boolean;
  className?: string;
}

export function PricingCards({ showDescription = true, className }: PricingCardsProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto", className)}>
      {pricingPlans.map((plan) => (
        <div
          key={plan.planKey}
          className={cn(
            "relative bg-white rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md",
            plan.highlighted && "border-2 border-gray-900 shadow-lg scale-105 hover:shadow-xl"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                {plan.highlightText}
              </span>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            {showDescription && (
              <p className="text-gray-600 text-sm">{plan.description}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/checkout?plan=${plan.planKey}`}
            className={cn(
              "block w-full text-center py-3 px-6 rounded-xl font-medium transition-all",
              plan.highlighted
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            )}
          >
            {plan.ctaText}
          </Link>
        </div>
      ))}
    </div>
  );
}