'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UpgradeHeader } from '@/components/ui/upgrade-header'

const plans = [
  {
    name: 'Pro',
    price: '$119',
    description: 'One-time purchase for individual professionals',
    features: [
      'Complete theme generator access',
      '15+ example reports with source files',
      '100+ page design guide (PDF)',
      'Figma design system',
      '1,500+ professional icons',
      'All future updates included'
    ],
    planKey: 'pro',
    highlighted: true,
    badge: 'Best Value'
  },
  {
    name: 'Team (5 seats)',
    price: '$399',
    description: 'Perfect for small teams',
    features: [
      'Everything in Pro',
      '5 transferable licenses',
      'Team member management portal',
      'Priority email support',
      'Team training resources'
    ],
    planKey: 'team-5'
  },
  {
    name: 'Team (10 seats)',
    price: '$699',
    description: 'For larger teams and organizations',
    features: [
      'Everything in Team (5 seats)',
      '10 transferable licenses',
      'Priority support with 24hr response',
      'Custom theme consultation',
      'Volume licensing available'
    ],
    planKey: 'team-10'
  }
]

export default function UpgradePage() {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || '/dashboard'
  const router = useRouter()

  const handleCheckout = (planKey: string) => {
    // Preserve the return URL through the checkout flow
    const checkoutUrl = returnUrl !== '/dashboard' 
      ? `/checkout?plan=${planKey}&returnUrl=${encodeURIComponent(returnUrl)}`
      : `/checkout?plan=${planKey}`
    
    router.push(checkoutUrl)
  }

  return (
    <>
      <UpgradeHeader />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upgrade to Access PowerUI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose a plan to unlock all PowerUI features and start creating amazing themes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.highlighted ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">one-time</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => handleCheckout(plan.planKey)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 30-day money-back guarantee
          </p>
          <Button
            variant="link"
            className="mt-4"
            onClick={() => router.push('/pricing')}
          >
            Compare all features →
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}