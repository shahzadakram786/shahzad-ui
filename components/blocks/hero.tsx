"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface HeroCta {
  label: string
  href: string
  external?: boolean
}

export interface HeroProps {
  /** Small pill above the title, e.g. "Trusted by 100+ providers" */
  badge?: string
  title: React.ReactNode
  description?: React.ReactNode
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  /** Image on the right (split) or below (centered) */
  image?: { src: string; alt: string }
  /** Or pass any element instead of an image (form, mockup, 3D scene...) */
  media?: React.ReactNode
  /** Icon + text strip under the hero (e.g. "50+ specialties") */
  highlights?: { icon?: React.ReactNode; text: string }[]
  /** Small trust line under the buttons, e.g. ratings */
  note?: React.ReactNode
  variant?: "split" | "centered"
  background?: "glow" | "grid" | "none"
  id?: string
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

function CtaLink({ cta, primary }: { cta: HeroCta; primary?: boolean }) {
  return (
    <Link
      href={cta.href}
      target={cta.external ? "_blank" : undefined}
      rel={cta.external ? "noopener noreferrer" : undefined}
      className={cn(
        buttonVariants({ variant: primary ? "default" : "outline" }),
        "group h-12 rounded-full px-7 text-base"
      )}
    >
      {cta.label}
      {primary && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
    </Link>
  )
}

export function Hero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  media,
  highlights,
  note,
  variant = "split",
  background = "glow",
  id = "home",
  className,
}: HeroProps) {
  const centered = variant === "centered"
  const visual =
    media ??
    (image && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
        alt={image.alt}
        className="h-full max-h-[34rem] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-border"
      />
    ))

  return (
    <section id={id} className={cn("relative isolate overflow-hidden", className)}>
      {background === "glow" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-primary/10 blur-3xl" />
        </div>
      )}
      {background === "grid" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      )}

      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28",
          centered ? "text-center" : "items-center lg:grid-cols-2"
        )}
      >
        <motion.div
          initial="hidden"
          animate="show"
          className={cn("flex flex-col gap-6", centered && "mx-auto max-w-3xl items-center")}
        >
          {badge && (
            <motion.span
              variants={fadeUp}
              custom={0}
              className="w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              {badge}
            </motion.span>
          )}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} custom={2} className="max-w-2xl text-lg text-pretty text-muted-foreground">
              {description}
            </motion.p>
          )}
          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={fadeUp}
              custom={3}
              className={cn("flex flex-col gap-3 sm:flex-row", centered && "justify-center")}
            >
              {primaryCta && <CtaLink cta={primaryCta} primary />}
              {secondaryCta && <CtaLink cta={secondaryCta} />}
            </motion.div>
          )}
          {note && (
            <motion.div variants={fadeUp} custom={4} className="text-sm text-muted-foreground">
              {note}
            </motion.div>
          )}
        </motion.div>

        {visual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className={cn(centered && "mx-auto w-full max-w-5xl")}
          >
            {visual}
          </motion.div>
        )}
      </div>

      {highlights && highlights.length > 0 && (
        <div className="bg-primary text-primary-foreground">
          <div
            className="mx-auto grid max-w-7xl gap-6 px-4 py-5 text-center sm:px-6"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(12rem, 1fr))` }}
          >
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center justify-center gap-2.5 font-medium">
                {h.icon && <span className="[&_svg]:size-5">{h.icon}</span>}
                {h.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
