import { CheckIcon } from "lucide-react";
import Link from "next/link";


const plans = [
  {
    name: "Pro",
    price: "$119",
    description: "One-time purchase for individual professionals",
    features: [
      "Complete theme generator access",
      "15+ example reports with source files",
      "100+ page design guide (PDF)",
      "Figma design system",
      "1,500+ professional icons",
      "All future updates included",
    ],
    limitations: [],
    cta: "Get Pro Access",
    ctaLink: "/checkout?plan=pro",
    highlighted: true,
    badge: "Best Value",
  },
  {
    name: "Team (5 seats)",
    price: "$399",
    description: "Perfect for small teams",
    features: [
      "Everything in Pro",
      "5 transferable licenses",
      "Team member management portal",
      "Priority email support",
      "Team training resources",
    ],
    limitations: [],
    cta: "Get Team Access",
    ctaLink: "/checkout?plan=team-5",
    highlighted: false,
  },
  {
    name: "Team (10 seats)",
    price: "$699",
    description: "For larger teams and organizations",
    features: [
      "Everything in Team (5 seats)",
      "10 transferable licenses",
      "Priority support with 24hr response",
      "Custom theme consultation",
      "Volume licensing available",
    ],
    limitations: [],
    cta: "Get Enterprise Access",
    ctaLink: "/checkout?plan=team-10",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One-time purchase. Lifetime access. No subscriptions.
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
                    <span className="text-gray-600 ml-2">one-time</span>
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
                  href={plan.ctaLink}
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
              <h3 className="font-semibold mb-2">Is this really lifetime access?</h3>
              <p className="text-muted-foreground">
                Yes. One payment gets you lifetime access to PowerUI plus all future updates and new resources we add.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use this for client work?</h3>
              <p className="text-muted-foreground">
                Absolutely. PowerUI includes commercial usage rights for unlimited personal and client projects.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee for all plans. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}