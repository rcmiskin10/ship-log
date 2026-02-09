import { GitCommit, Fingerprint, Calendar, Globe, Flame, Filter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'ShipLog',
  tagline: 'Build in public on autopilot — from commits to content',
  description: 'Auto-generate authentic build-in-public posts and changelogs from your GitHub commits using AI voice matching.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  company: 'ShipLog',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Changelog', href: '/blog' },
    { title: 'FAQ', href: '/#faq' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Journal Entries', href: '/dashboard/entities' },
    { title: 'Connected Repos', href: '/dashboard/repos' },
    { title: 'Voice Settings', href: '/dashboard/voice' },
    { title: 'Schedule', href: '/dashboard/schedule' }
  ],

  hero: {
    badge: 'Build in Public, Effortlessly',
    headline: 'Turn Your Commits Into Build-in-Public Content',
    headlineHighlight: 'Build-in-Public Content',
    subheadline: 'ShipLog connects to your GitHub and automatically generates authentic, voice-matched social media posts from your commits and PRs. Maintain your build-in-public streak without the midnight content grind.',
    primaryCta: { text: 'Start Shipping Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers building in public', rating: '4.9/5' },
  },

  features: [
    {
      icon: GitCommit,
      title: 'Commit-to-Content Pipeline',
      description: 'Automatically transform your GitHub commits, PRs, and deployment events into narrative build-in-public posts — no manual writing required.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Fingerprint,
      title: 'Voice Matching AI',
      description: 'ShipLog learns your writing style from your past tweets so every generated post sounds like you, not a robot.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Calendar,
      title: 'Auto-Schedule & Post',
      description: 'Set your preferred posting schedule and ShipLog publishes to X, LinkedIn, and Bluesky on autopilot while you sleep.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Globe,
      title: 'Public Build Journal',
      description: 'Get a beautiful hosted changelog page at shiplog.dev/you — social proof, SEO asset, and portfolio piece in one.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Flame,
      title: 'Streak Tracking & Milestones',
      description: 'Automatic Day 1, Day 30, Day 100 tracking with milestone badges that keep you motivated and your audience engaged.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Filter,
      title: 'Smart Commit Filtering',
      description: 'AI distinguishes tweet-worthy features and bug fixes from mundane dependency updates and merge commits — only the good stuff gets shared.',
      gradient: 'from-pink-500 to-rose-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'OpenAI', color: 'bg-gray-800 text-white' },
    { name: 'GitHub API', color: 'bg-gray-700 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Changelog', href: '/blog' },
        { title: 'Roadmap', href: '/roadmap' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' }
      ],
    }
  ],

  footerCopyright: '2026 ShipLog. All rights reserved.',

  social: {
    github: 'https://github.com/shiplog',
    twitter: 'https://twitter.com/shiplogdev'
  },
}
