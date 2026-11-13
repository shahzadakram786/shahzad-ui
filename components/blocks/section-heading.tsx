import { cn } from "@/lib/utils"
import { Reveal } from "@/components/blocks/reveal"

export interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

/** Small uppercase eyebrow + big title + muted description. Used by every section block. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
      {description && (
        <p className="text-lg text-pretty text-muted-foreground">{description}</p>
      )}
    </Reveal>
  )
}

/** Wrap a word in the title to color it with the theme primary: title={<>Grow your <Highlight>revenue</Highlight></>} */
export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-primary", className)}>{children}</span>
}
