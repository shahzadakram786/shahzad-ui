"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"

export interface FeatureItem {
  icon?: React.ReactNode
  title: string
  description: string
  href?: string
  /** Used by the "expand" variant */
  image?: string
}

export interface FeaturesProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items: FeatureItem[]
  /**
   * cards: grid of icon cards (services, features, benefits)
   * expand: hover-to-expand panels with image (desktop), stacked cards on mobile
   */
  variant?: "cards" | "expand"
  columns?: 2 | 3 | 4
  linkLabel?: string
  id?: string
  className?: string
}

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
}

function FeatureCard({ item, linkLabel }: { item: FeatureItem; linkLabel: string }) {
  const body = (
    <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {item.icon && (
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-6">
          {item.icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-muted-foreground">{item.description}</p>
      {item.href && (
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </div>
  )
  return item.href ? (
    <Link href={item.href} className="block h-full">
      {body}
    </Link>
  ) : (
    body
  )
}

export function Features({
  eyebrow,
  title,
  description,
  items,
  variant = "cards",
  columns = 3,
  linkLabel = "Learn more",
  id = "services",
  className,
}: FeaturesProps) {
  const [active, setActive] = useState(0)

  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}

        {variant === "cards" && (
          <div className={cn("grid gap-6", cols[columns])}>
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <FeatureCard item={item} linkLabel={linkLabel} />
              </Reveal>
            ))}
          </div>
        )}

        {variant === "expand" && (
          <>
            {/* Desktop: expanding panels */}
            <div className="hidden h-[26rem] gap-4 md:flex">
              {items.map((item, i) => {
                const isActive = active === i
                return (
                  <motion.div
                    key={item.title}
                    layout
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    transition={{ type: "spring", stiffness: 200, damping: 28 }}
                    className={cn(
                      "relative cursor-pointer overflow-hidden rounded-2xl border border-border p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive ? "flex-[3] bg-primary text-primary-foreground" : "flex-1 bg-card text-card-foreground"
                    )}
                  >
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        className={cn(
                          "absolute inset-y-0 right-0 h-full w-1/2 object-cover transition-all duration-700 [mask-image:linear-gradient(to_right,transparent,black_40%)]",
                          isActive ? "translate-x-0 opacity-90" : "translate-x-16 opacity-0"
                        )}
                      />
                    )}
                    <div className="relative z-10 flex h-full max-w-xs flex-col gap-3">
                      {item.icon && <div className="[&_svg]:size-9">{item.icon}</div>}
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-primary-foreground/85"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {item.href && (
                        <Link
                          href={item.href}
                          aria-label={`${linkLabel}: ${item.title}`}
                          className="mt-auto flex size-10 items-center justify-center rounded-full border border-current/30 transition hover:bg-background hover:text-foreground"
                        >
                          <ArrowRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
            {/* Mobile: normal cards */}
            <div className="grid gap-4 md:hidden">
              {items.map((item) => (
                <FeatureCard key={item.title} item={item} linkLabel={linkLabel} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
