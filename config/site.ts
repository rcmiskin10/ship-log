import { GitCommit, Mic, Filter, Calendar, Globe, Flame } from 'lucide-react'
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
  tagline: 'Your commits write your build-in-public posts',
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
    { title: 'Posts', href: '/dashboard/entities' },
    { title: 'Repositories', href: '/dashboard/repositories' },
    { title: 'Changelog Page', href: '/dashboard/changelog' },
    { title: 'Voice Settings', href: '/dashboard/voice' },
    { title: 'Integrations', href: '/dashboard/integrations' }
  ],

  hero: {
    badge: 'Stop writing tweets at midnight',
    headline: 'Your Commits Write Your Build-in-Public Posts',
    headlineHighlight: 'Build-in-Public',
    subheadline: 'ShipLog connects to your GitHub and automatically transforms your commits, PRs, and deployments into engaging social posts that sound like you. Maintain your build-in-public streak without ever context-switching from code to content.',
    primaryCta: { text: 'Connect GitHub Free', href: '/register' },
    secondaryCta: { text: 'See Example Posts', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers shipping in public', rating: '4.9/5' },
  },

  features: [
    {
      icon: GitCommit,
      title: 'Commit-to-Content Pipeline',
      description: 'Connect your GitHub repos and ShipLog automatically ingests commits, merged PRs, and deployment logs to generate narrative-style build-in-public posts.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Mic,
      title: 'Voice Learning Engine',
      description: 'ShipLog learns your writing style from your past tweets so every generated post sounds authentically like you — not generic AI slop.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Filter,
      title: 'Smart Commit Filtering',
      description: 'AI distinguishes tweet-worthy work from mundane changes. No more \'updated README\' posts — only the stuff your audience actually cares about.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Calendar,
      title: 'Scheduled Auto-Posting',
      description: 'Code at midnight, post at peak hours. ShipLog queues your approved posts and publishes them when your audience is most active on X, LinkedIn, and Mastodon.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Globe,
      title: 'Public Build Journal',
      description: 'Get a beautiful, SEO-optimized changelog page at shiplog.dev/you that doubles as social proof for your product and ranks for long-tail technical searches.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Flame,
      title: 'Streak & Milestone Tracking',
      description: 'Gamify your build-in-public practice with streak counters, Day 30/100 celebrations, and public accountability — the same psychology that makes GitHub graphs addictive.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'GitHub API', color: 'bg-gray-800 text-white' },
    { name: 'OpenAI', color: 'bg-teal-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Changelog', href: '/blog' },
        { title: 'Integrations', href: '/features#integrations' }
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
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Data Processing', href: '/dpa' }
      ],
    }
  ],

  footerCopyright: '2026 ShipLog. All rights reserved.',

  social: {
    github: 'https://github.com/shiplog',
    twitter: 'https://twitter.com/shiplogdev'
  },
}
