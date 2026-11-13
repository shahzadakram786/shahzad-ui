import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/blocks/reveal"

export interface CtaBannerProps {
  title: React.ReactNode
  description?: React.ReactNode
  primaryCta: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  className?: string
}

/** Big rounded call-to-action box. Put it right before the footer. */
export function CtaBanner({ title, description, primaryCta, secondaryCta, className }: CtaBannerProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl md:px-16 md:py-20">
          <div aria-hidden className="absolute -left-20 -top-20 -z-10 size-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 size-80 rounded-full bg-black/10 blur-2xl" />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">{description}</p>
          )}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "group h-12 rounded-full px-7 text-base"
              )}
            >
              {primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.external ? "_blank" : undefined}
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/40 px-7 text-base font-medium transition hover:bg-primary-foreground/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
