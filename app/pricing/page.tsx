'use client';

import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out PowerUI",
    features: [
      "3 custom themes",
      "Basic color palettes",
      "Export to Power BI",
      "Community support",
    ],
    limitations: [
      "Limited theme customization",
      "No advanced styling options",
      "No priority support",
    ],
    cta: "Get Started",
    ctaLink: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For professionals and small teams",
    features: [
      "Unlimited themes",
      "Advanced color palettes",
      "Custom typography",
      "Theme versioning",
      "Priority email support",
      "Export to multiple formats",
      "Theme sharing",
    ],
    limitations: [],
    cta: "Start Free Trial",
    ctaLink: "/sign-up?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom branding",
      "SSO integration",
      "API access",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "Team collaboration",
    ],
    limitations: [],
    cta: "Contact Sales",
    ctaLink: "/contact-sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your Power BI theming needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-lg border bg-white p-6 shadow-sm ${
                plan.highlighted 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-transparent bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                  {plan.badge}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 py-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <CheckIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2">
                        <span className="text-gray-500 text-sm">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link 
                  href={user ? plan.ctaLink.replace('/sign-up', '/checkout') : plan.ctaLink}
                  className={`block w-full text-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    plan.highlighted 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens to my themes if I downgrade?</h3>
              <p className="text-muted-foreground">
                Your existing themes remain accessible. You just won&apos;t be able to create new ones beyond the plan limit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}