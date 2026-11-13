"use client"

import { useState } from "react"
import {
  BarChart3,
  Check,
  Copy,
  FileCheck2,
  HeartPulse,
  Palette,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import registry from "@/registry.json"
import themes from "@/registry/themes.json"
import { Navbar } from "@/components/blocks/navbar"
import { TopBar } from "@/components/blocks/top-bar"
import { Hero } from "@/components/blocks/hero"
import { PageHero } from "@/components/blocks/page-hero"
import { Features } from "@/components/blocks/features"
import { Stats } from "@/components/blocks/stats"
import { Testimonials } from "@/components/blocks/testimonials"
import { Faq } from "@/components/blocks/faq"
import { ContactSection } from "@/components/blocks/contact-section"
import { CtaBanner } from "@/components/blocks/cta-banner"
import { Footer } from "@/components/blocks/footer"
import { Highlight } from "@/components/blocks/section-heading"
import { ThemeToggle } from "@/components/blocks/theme-toggle"

const REGISTRY = "https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r"

function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const cmd = `npx shadcn@latest add ${REGISTRY}/${name}.json`
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(cmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="group flex w-full items-center gap-3 overflow-hidden rounded-lg border border-border bg-muted/60 px-3 py-2 text-left font-mono text-xs text-muted-foreground transition hover:text-foreground"
      title="Copy install command"
    >
      <span className="truncate">{cmd}</span>
      {copied ? <Check className="ml-auto size-4 shrink-0 text-emerald-500" /> : <Copy className="ml-auto size-4 shrink-0" />}
    </button>
  )
}

function Block({ name, children }: { name: string; children: React.ReactNode }) {
  const item = registry.items.find((i) => i.name === name)
  return (
    <section id={`block-${name}`} className="scroll-mt-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="font-mono text-lg font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{item?.description}</p>
        </div>
        <InstallCommand name={name} />
      </div>
      <div className="mx-auto max-w-[96rem] px-2 sm:px-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">{children}</div>
      </div>
    </section>
  )
}

const services = [
  { icon: <FileCheck2 />, title: "Medical Billing", description: "Clean claims submitted within 24 hours, tracked until paid.", href: "#" },
  { icon: <Stethoscope />, title: "Medical Coding", description: "Certified coders for accurate CPT, ICD-10 and modifiers.", href: "#" },
  { icon: <ShieldCheck />, title: "Credentialing", description: "Payer enrollment and re-credentialing handled end to end.", href: "#" },
  { icon: <BarChart3 />, title: "Denial Management", description: "Root-cause fixes and appeals that recover lost revenue.", href: "#" },
]

const testimonials = [
  { quote: "Our collections went up in the first 60 days and I finally stopped chasing claims myself.", name: "Dr. Sarah Johnson", role: "Cardiologist, Austin TX", rating: 5 },
  { quote: "Clear reporting every month and a team that actually answers the phone. Highly recommend.", name: "Dr. Michael Lee", role: "Orthopedic Surgeon", rating: 5 },
  { quote: "They cleaned up two years of aged AR. Professional, fast, and easy to work with.", name: "Emily Davis", role: "Practice Manager", rating: 4 },
]

const faqs = [
  { question: "How fast can we get started?", answer: "Most practices are onboarded within 7 to 10 business days, including system access and payer setup." },
  { question: "Do you work with our current EHR?", answer: "Yes. We work inside most major EHR and practice management systems, so nothing changes for your front desk." },
  { question: "How is pricing structured?", answer: "A simple percentage of collections. No setup fees, no long-term contracts." },
  { question: "Is patient data secure?", answer: "We are HIPAA compliant, use encrypted access only, and sign a BAA with every client." },
]

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 to-transparent blur-2xl" />
      <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Monthly collections</div>
            <div className="text-3xl font-bold">$184,320</div>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">+28%</span>
        </div>
        <div className="flex h-40 items-end gap-2">
          {[40, 55, 48, 62, 70, 66, 82, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-primary/80" style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
          {[["98%", "Clean claims"], ["14d", "Avg. AR days"], ["2.1%", "Denials"]].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-muted p-3">
              <div className="font-bold">{v}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  const [palette, setPalette] = useState<string>("royal")

  return (
    <div data-palette={palette} className="bg-muted/30 pb-24">
      {/* Intro */}
      <header className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <p className="font-mono text-sm text-primary">shahzad-ui</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">My website blocks</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Every section I keep rebuilding, written once. Install any block into a Next.js + Tailwind + shadcn project with one
          command, then pass your own content as props. Colors come from the project theme.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {registry.items
            .filter((i) => i.type === "registry:block")
            .map((i) => (
              <a
                key={i.name}
                href={`#block-${i.name}`}
                className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs hover:border-primary hover:text-primary"
              >
                {i.name}
              </a>
            ))}
        </nav>
      </header>

      <Block name="top-bar">
        <TopBar {...siteConfig.contact} socials={siteConfig.socials} className="md:block" />
      </Block>

      <Block name="navbar">
        <Navbar
          brand={{ name: siteConfig.name }}
          items={siteConfig.nav}
          cta={siteConfig.cta}
          phone={siteConfig.contact.phone}
          className="relative"
        />
        <div className="h-24" />
        <div className="border-t border-border bg-zinc-950 p-0 dark">
          <Navbar
            brand={{ name: "SA" }}
            variant="pill"
            items={[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ]}
            cta={{ label: "Hire me", href: "#contact" }}
            className="relative"
          />
          <div className="h-20" />
        </div>
      </Block>

      <Block name="hero">
        <Hero
          id="demo-hero"
          badge="Trusted by 100+ independent practices"
          title={<>Get paid faster for the care <Highlight>you already provide</Highlight></>}
          description="End-to-end medical billing and revenue cycle management for independent practices. Fewer denials, faster payments, zero headaches."
          primaryCta={{ label: "Get a free audit", href: "#" }}
          secondaryCta={{ label: "See services", href: "#" }}
          note={<span className="flex items-center gap-1"><Star className="size-4 fill-amber-400 text-amber-400" /> 4.9 average from 120+ providers</span>}
          media={<HeroMockup />}
          highlights={[
            { icon: <Users />, text: "100+ satisfied providers" },
            { icon: <HeartPulse />, text: "50+ specialties served" },
            { icon: <ShieldCheck />, text: "HIPAA compliant" },
          ]}
        />
      </Block>

      <Block name="page-hero">
        <PageHero
          title="Medical Billing Services"
          description="Clean claims, faster reimbursements and full transparency for your practice."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "#" }, { label: "Medical Billing" }]}
        />
      </Block>

      <Block name="features">
        <Features
          id="demo-features"
          eyebrow="Services"
          title={<>Everything your practice needs to <Highlight>get paid</Highlight></>}
          description="Pick one service or hand us the whole revenue cycle."
          items={services}
          columns={4}
        />
        <div className="border-t border-border">
          <Features id="demo-features-expand" variant="expand" title="Expand variant (hover the panels)" items={services} />
        </div>
      </Block>

      <Block name="stats">
        <Stats
          id="demo-stats"
          items={[
            { value: 99, suffix: "%", label: "Clean claim rate" },
            { value: 97.3, decimals: 1, suffix: "%", label: "First-pass approval" },
            { value: 30, suffix: "%", prefix: "+", label: "Average revenue growth" },
            { value: 120, suffix: "+", label: "Providers served" },
          ]}
        />
        <Stats
          id="demo-stats-cards"
          variant="cards"
          eyebrow="Results"
          title="Cards variant"
          items={[
            { value: 14, suffix: " days", label: "Avg. AR days", description: "Down from 45+" },
            { value: 2.1, decimals: 1, suffix: "%", label: "Denial rate", description: "Industry avg is 10%" },
            { value: 48, suffix: "h", label: "Onboarding kickoff", description: "From signed to started" },
          ]}
        />
      </Block>

      <Block name="testimonials">
        <Testimonials id="demo-testimonials" eyebrow="Testimonials" title="What our clients say" items={testimonials} />
        <Testimonials id="demo-testimonials-grid" variant="grid" title="Grid variant" items={testimonials} className="bg-background" />
      </Block>

      <Block name="faq">
        <Faq id="demo-faq" items={faqs} schema={false} />
        <div className="border-t border-border">
          <Faq id="demo-faq-split" layout="split" title="Split layout" description="Still have questions? Call us anytime." items={faqs} schema={false} />
        </div>
      </Block>

      <Block name="contact-section">
        <ContactSection
          id="demo-contact"
          {...siteConfig.contact}
          socials={siteConfig.socials}
          phoneField
          onSubmit={() => new Promise((r) => setTimeout(r, 900))}
        />
      </Block>

      <Block name="cta-banner">
        <CtaBanner
          title="Ready to stop leaving money on the table?"
          description="Get a free billing audit. We'll show you exactly where revenue is leaking."
          primaryCta={{ label: "Get my free audit", href: "#" }}
          secondaryCta={{ label: "Call (512) 555-0123", href: "tel:+15125550123" }}
        />
      </Block>

      <Block name="footer">
        <Footer
          brand={{ name: siteConfig.name }}
          description={siteConfig.description}
          columns={siteConfig.footerColumns}
          contact={siteConfig.contact}
          socials={siteConfig.socials}
          legal={siteConfig.legal}
        />
        <Footer
          tone="muted"
          brand={{ name: siteConfig.name }}
          description="Muted tone follows light/dark mode."
          columns={siteConfig.footerColumns.slice(0, 1)}
          socials={siteConfig.socials}
        />
      </Block>

      {/* Floating palette switcher */}
      <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-border bg-background/90 p-1.5 pl-3 shadow-xl backdrop-blur">
        <Palette className="size-4 text-muted-foreground" />
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            type="button"
            onClick={() => setPalette(key)}
            title={t.title}
            aria-label={`Use ${key} theme`}
            data-palette={key}
            className={cn(
              "size-7 rounded-full bg-primary ring-offset-2 ring-offset-background transition",
              palette === key && "ring-2 ring-foreground"
            )}
          />
        ))}
        <button
          type="button"
          onClick={() => setPalette("none")}
          title="Neutral (shadcn default)"
          className={cn("size-7 rounded-full bg-zinc-900 ring-offset-2 ring-offset-background dark:bg-zinc-100", palette === "none" && "ring-2 ring-foreground")}
        />
        <ThemeToggle />
      </div>
    </div>
  )
}
