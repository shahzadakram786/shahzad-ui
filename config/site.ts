/**
 * ONE place for a site's content. Every block reads from here, so a new client site
 * = edit this file + pick a theme. Agents: fill this from the client brief first.
 */
import type { NavItem } from "@/components/blocks/navbar"
import type { SocialLink } from "@/components/blocks/social-icons"
import type { FooterColumn } from "@/components/blocks/footer"

export const siteConfig = {
  name: "Acme Studio",
  url: "https://example.com",
  description: "We design and build fast, modern websites that turn visitors into customers.",
  logo: undefined as string | undefined, // "/logo.svg"

  contact: {
    email: "hello@example.com",
    phone: "+1 (512) 555-0123",
    address: "123 Main St, Austin, TX 78701",
    hours: "Mon - Fri, 9am - 6pm",
  },

  nav: [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Web Design", href: "/services/web-design", description: "Custom sites that convert" },
        { label: "Development", href: "/services/development", description: "Next.js, React, headless CMS" },
        { label: "SEO", href: "/services/seo", description: "Rank and get found" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  cta: { label: "Book a call", href: "/contact" },

  socials: [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "linkedin", href: "https://linkedin.com" },
  ] satisfies SocialLink[],

  footerColumns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Design", href: "/services/web-design" },
        { label: "Development", href: "/services/development" },
        { label: "SEO", href: "/services/seo" },
      ],
    },
  ] satisfies FooterColumn[],

  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
}

export type SiteConfig = typeof siteConfig
