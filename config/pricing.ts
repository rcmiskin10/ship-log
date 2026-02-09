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
        'Connect 1 GitHub repository',
        'Up to 4 auto-generated posts per month',
        'Basic public changelog page',
        'Manual approval before posting',
        'ShipLog branding on changelog',
        'Streak tracking'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'For indie hackers serious about building in public',
      price: { monthly: 12, yearly: 108 },
      priceId: process.env.STRIPE_PRICE_STARTER,
      limits: {
        entities: 30
      },
      features: [
        'Unlimited GitHub repos',
        'Up to 30 auto-generated posts per month',
        'Voice learning from 200 past tweets',
        'Auto-posting to X/Twitter',
        'Custom branded changelog page',
        'Streak tracking & milestone badges',
        'Smart commit filtering',
        'Basic engagement analytics'
      ],
      highlighted: true,
      cta: 'Start Building',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Full autopilot for prolific builders',
      price: { monthly: 24, yearly: 228 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Starter',
        'Unlimited auto-generated posts',
        'Multi-platform posting (X, LinkedIn, Bluesky)',
        'Weekly & monthly digest generation',
        'Custom domain for changelog page',
        'Priority voice model training',
        'Advanced analytics & engagement tracking',
        'API access'
      ],
      cta: 'Go Pro',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For small teams shipping together in public',
      price: { monthly: 49, yearly: 468 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Shared product changelog',
        'Editorial approval workflows',
        'White-label changelog embeds',
        'Dedicated support'
      ],
      cta: 'Start Team Plan',
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
