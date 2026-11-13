"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/blocks/section-heading"

export interface FaqItem {
  question: string
  /** Plain text is best (it also goes into the SEO schema) */
  answer: string
}

export interface FaqProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items: FaqItem[]
  /** centered: heading on top. split: heading left, questions right */
  layout?: "centered" | "split"
  /** Adds FAQPage JSON-LD for Google rich results (default true) */
  schema?: boolean
  /** Allow several answers open at once */
  multiple?: boolean
  id?: string
  className?: string
}

export function Faq({
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description,
  items,
  layout = "centered",
  schema = true,
  multiple = false,
  id = "faq",
  className,
}: FaqProps) {
  const [open, setOpen] = useState<number[]>([0])

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : multiple ? [...prev, i] : [i]
    )

  const split = layout === "split"

  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div
        className={cn(
          "mx-auto px-4 sm:px-6",
          split ? "grid max-w-7xl gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16" : "max-w-3xl"
        )}
      >
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={split ? "left" : "center"}
          className={cn(split && "lg:sticky lg:top-28 lg:self-start")}
        />

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open.includes(i)
            const panelId = `${id}-panel-${i}`
            return (
              <div
                key={item.question}
                className={cn(
                  "rounded-2xl border bg-card text-card-foreground transition-colors",
                  isOpen ? "border-primary/40 shadow-sm" : "border-border hover:border-primary/25"
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold md:px-6 md:py-5"
                  >
                    {item.question}
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-all",
                        isOpen ? "rotate-45 bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground md:px-6">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}
    </section>
  )
}
