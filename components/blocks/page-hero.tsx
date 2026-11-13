import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PageHeroProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** Breadcrumb trail. Last item is the current page (no href needed). */
  breadcrumbs?: { label: string; href?: string }[]
  /** Optional background photo (gets a dark overlay so text stays readable) */
  backgroundImage?: string
  className?: string
}

/** Banner for inner pages (About, Services, Contact...) with breadcrumb. */
export function PageHero({ title, description, breadcrumbs, backgroundImage, className }: PageHeroProps) {
  const onImage = !!backgroundImage
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        onImage ? "text-white" : "bg-muted/50",
        className
      )}
    >
      {onImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backgroundImage} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </>
      )}
      {!onImage && (
        <div aria-hidden className="absolute -top-24 right-0 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />
      )}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-16 sm:px-6 md:py-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1.5 text-sm",
                onImage ? "text-white/75" : "text-muted-foreground"
              )}
            >
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumb.href && !last ? (
                      <Link href={crumb.href} className="hover:text-primary">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={last ? "page" : undefined} className={cn(last && "font-medium text-primary")}>
                        {crumb.label}
                      </span>
                    )}
                    {!last && <ChevronRight className="size-3.5" />}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl">{title}</h1>
        {description && (
          <p className={cn("max-w-2xl text-lg", onImage ? "text-white/85" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
