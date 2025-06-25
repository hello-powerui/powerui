export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  ctaText: string;
  planKey: string;
  highlighted?: boolean;
  highlightText?: string;
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Pro',
    price: 119,
    description: 'Perfect for individual designers and analysts',
    features: [
      'Complete visual theme editor',
      'Live Power BI preview',
      'Import & export themes',
      'Public theme marketplace',
      '17+ example reports with PBIX files',
      '1,500+ professional icons library',
      '100+ page design guide (PDF)',
      'All color palettes & fonts',
      'Light & dark mode support',
      'Lifetime updates included'
    ],
    ctaText: 'Get Started',
    planKey: 'pro',
    highlighted: false
  },
  {
    name: 'Team',
    price: 399,
    description: 'Best for small teams and departments',
    features: [
      'Everything in Pro, plus:',
      '5 transferable team licenses',
      'Shared organization themes',
      'Team member management',
      'Centralized theme library',
      'Priority email support',
      'Team onboarding session',
      'Bulk license management',
      'Invoice payment option'
    ],
    ctaText: 'Start with Team',
    planKey: 'team',
    highlighted: true,
    highlightText: 'Most Popular',
    popular: true
  },
  {
    name: 'Team Plus',
    price: 699,
    description: 'For larger teams and organizations',
    features: [
      'Everything in Team, plus:',
      '10 transferable team licenses',
      'Custom theme consultation',
      'Advanced team permissions',
      'Priority support (24hr response)',
      'Custom training workshop',
      'Volume licensing available',
      'Dedicated account manager',
      'API access (coming soon)'
    ],
    ctaText: 'Scale with Team Plus',
    planKey: 'team10',
    highlighted: false
  }
];

export const faqItems = [
  {
    question: 'Is this a one-time payment or subscription?',
    answer: 'Power UI is a one-time payment. Pay once, use forever. All future updates are included at no extra cost.'
  },
  {
    question: 'Why isn\'t Power UI completely free?',
    answer: 'Hosting costs, Power BI Embedded licensing, and keeping up with the latest Power BI updates takes significant time and resources. Your purchase helps us maintain and improve Power UI for everyone.'
  },
  {
    question: 'What makes Power UI different from other theme generators?',
    answer: 'Power UI offers live Power BI preview, 1,500+ professional icons, comprehensive design systems, light/dark mode support, organization theme sharing, and continuous updates. Read our detailed comparison in our blog post about Power BI theme generators.'
  },
  {
    question: 'How do team licenses work?',
    answer: 'Team licenses are transferable seats that you can assign to team members. You can add or remove team members anytime through your management portal. Each member gets their own login and access to all features.'
  },
  {
    question: 'Do I need design experience to use Power UI?',
    answer: 'Not at all! Power UI is designed to be intuitive for analysts at any skill level. Our visual editor, pre-built palettes, and example reports make it easy to create professional themes without any design background.'
  },
  {
    question: 'Can I share themes with non-Power UI users?',
    answer: 'You can use Power UI themes in your personal and organizational reports, but not in reports you make publicly available or sell. Essentially, use Power UI to make your reports better, but don\'t distribute the themes on websites or in downloadable PBIX files. For detailed questions, refer to our terms of service.'
  },
  {
    question: 'Is there a trial version available?',
    answer: 'There\'s no trial version, but you can review our docs and demo videos to see if it\'s right for you (it probably is if you\'re on this page!). You can also explore our icon library and preview example reports before purchasing.'
  }
];