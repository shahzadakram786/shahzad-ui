"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"

export interface StatItem {
  value: number
  label: string
  prefix?: string
  /** e.g. "+", "%", "k+" */
  suffix?: string
  decimals?: number
  description?: string
}

export interface StatsProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items: StatItem[]
  /** band: full-width primary strip. cards: bordered cards on the page background */
  variant?: "band" | "cards"
  id?: string
  className?: string
}

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: Pick<StatItem, "value" | "decimals" | "prefix" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export function Stats({
  eyebrow,
  title,
  description,
  items,
  variant = "band",
  id = "stats",
  className,
}: StatsProps) {
  const band = variant === "band"
  return (
    <section
      id={id}
      className={cn(band ? "bg-primary py-16 text-primary-foreground" : "py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {title && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            className={cn(band && "[&_p]:text-primary-foreground/80 [&_span]:text-primary-foreground/80")}
          />
        )}
        <div
          className={cn("grid gap-6", band ? "gap-y-10" : "")}
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))" }}
        >
          {items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className={cn(
                "flex flex-col gap-1 text-center",
                !band && "rounded-2xl border border-border bg-card p-8"
              )}
            >
              <div className={cn("text-4xl font-extrabold tracking-tight md:text-5xl", !band && "text-primary")}>
                <CountUp value={item.value} decimals={item.decimals} prefix={item.prefix} suffix={item.suffix} />
              </div>
              <div className="mt-1 font-semibold">{item.label}</div>
              {item.description && (
                <p className={cn("text-sm", band ? "text-primary-foreground/75" : "text-muted-foreground")}>
                  {item.description}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
