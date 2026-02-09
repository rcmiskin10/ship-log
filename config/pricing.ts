export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    entities: 4
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Start building in public with zero friction',
      price: { monthly: 0 },
      limits: {
        entities: 4
      },
      features: [
        '1 GitHub repo connected',
        'Up to 4 posts per month',
        'Basic changelog page with ShipLog branding',
        'Manual review & approve workflow',
        'Streak counter',
        'Community support'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'For indie hackers serious about consistency',
      price: { monthly: 9, yearly: 79 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        entities: 20
      },
      features: [
        'Unlimited GitHub repos',
        'Up to 20 posts per month',
        'Voice learning from 100 past tweets',
        'Auto-posting to X/Twitter',
        'Custom domain changelog page',
        'Remove ShipLog branding',
        'Basic engagement analytics',
        'Email support'
      ],
      cta: 'Start 7-Day Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Full automation for prolific builders',
      price: { monthly: 19, yearly: 169 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Starter',
        'Unlimited posts',
        'Full voice learning from entire tweet history',
        'Auto-post to X, LinkedIn & Mastodon',
        'Stripe revenue milestone posts',
        'Vercel & Railway deployment logs',
        'Weekly digest auto-generation',
        'Advanced analytics & engagement tracking',
        'Custom changelog themes',
        'Priority AI processing',
        'Priority support'
      ],
      highlighted: true,
      cta: 'Start 7-Day Trial',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'Build in public as a team',
      price: { monthly: 49, yearly: 449 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Shared changelog with contributor attribution',
        'Team review & approval workflow',
        'Org-level GitHub integration',
        'API access',
        'Dedicated support'
      ],
      cta: 'Contact Us',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
