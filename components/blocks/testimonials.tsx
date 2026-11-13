"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"

export interface Testimonial {
  quote: string
  name: string
  role?: string
  avatar?: string
  /** 1-5 */
  rating?: number
}

export interface TestimonialsProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items: Testimonial[]
  /** carousel: one big quote at a time with arrows + dots. grid: all cards visible */
  variant?: "carousel" | "grid"
  /** Carousel autoplay in ms (0 = off) */
  autoplay?: number
  id?: string
  className?: string
}

function Avatar({ item, size = "md" }: { item: Testimonial; size?: "md" | "lg" }) {
  const cls = size === "lg" ? "size-14" : "size-11"
  if (item.avatar) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.avatar} alt={item.name} className={cn(cls, "rounded-full object-cover ring-2 ring-primary/40")} />
  }
  const initials = item.name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
  return (
    <div className={cn(cls, "flex items-center justify-center rounded-full bg-primary/15 font-semibold text-primary")}>
      {initials}
    </div>
  )
}

function Rating({ value }: { value?: number }) {
  if (!value) return null
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />
      ))}
    </div>
  )
}

export function Testimonials({
  eyebrow,
  title,
  description,
  items,
  variant = "carousel",
  autoplay = 6000,
  id = "testimonials",
  className,
}: TestimonialsProps) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + items.length) % items.length, delta]),
    [items.length]
  )

  useEffect(() => {
    if (variant !== "carousel" || !autoplay || paused || items.length < 2) return
    const t = setInterval(() => go(1), autoplay)
    return () => clearInterval(t)
  }, [variant, autoplay, paused, go, items.length])

  const current = items[index]

  return (
    <section id={id} className={cn("bg-muted/40 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}

        {variant === "grid" && (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <Reveal key={item.name + i} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
                <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground">
                  <Rating value={item.rating} />
                  <blockquote className="text-pretty">&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar item={item} />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      {item.role && <div className="text-sm text-muted-foreground">{item.role}</div>}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {variant === "carousel" && current && (
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 text-center text-card-foreground shadow-xl md:px-14 md:py-14">
              <Quote className="mx-auto mb-6 size-10 text-primary/40" />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-6"
                >
                  <blockquote className="text-lg text-pretty italic md:text-xl">&ldquo;{current.quote}&rdquo;</blockquote>
                  <Rating value={current.rating} />
                  <figcaption className="flex items-center gap-4 text-left">
                    <Avatar item={current} size="lg" />
                    <div>
                      <div className="text-lg font-bold text-primary">{current.name}</div>
                      {current.role && <div className="text-sm text-muted-foreground">{current.role}</div>}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {items.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setState([i, i > index ? 1 : -1])}
                      aria-label={`Show testimonial ${i + 1}`}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        i === index ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition hover:border-primary hover:text-primary"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
