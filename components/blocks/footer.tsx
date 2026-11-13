import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { SocialLinks, type SocialLink } from "@/components/blocks/social-icons"

/** Evaluated once at module load (keeps Next 16 cacheComponents prerender happy) */
const YEAR = new Date().getFullYear()

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterProps {
  brand: { name: string; href?: string; logo?: string | React.ReactNode }
  description?: React.ReactNode
  columns?: FooterColumn[]
  contact?: { email?: string; phone?: string; address?: string; hours?: string }
  socials?: SocialLink[]
  /** Links in the bottom bar (Privacy, Terms...) */
  legal?: { label: string; href: string }[]
  /** Defaults to "© {year} {brand.name}. All rights reserved." */
  copyright?: React.ReactNode
  /** dark: always-dark footer (classic business site). muted: follows the light/dark theme */
  tone?: "dark" | "muted"
  className?: string
}

export function Footer({
  brand,
  description,
  columns = [],
  contact,
  socials,
  legal,
  copyright,
  tone = "dark",
  className,
}: FooterProps) {
  const dark = tone === "dark"
  const sub = dark ? "text-zinc-400" : "text-muted-foreground"
  const linkCls = cn("transition-colors hover:text-primary", sub)

  const logo =
    typeof brand.logo === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
    ) : (
      brand.logo
    )

  return (
    <footer className={cn(dark ? "bg-zinc-950 text-zinc-100" : "border-t border-border bg-muted/40", className)}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href={brand.href ?? "/"} className="flex items-center gap-2.5">
              {logo}
              <span className="text-xl font-bold tracking-tight">{brand.name}</span>
            </Link>
            {description && <p className={cn("max-w-sm text-sm leading-relaxed", sub)}>{description}</p>}
            {socials && socials.length > 0 && <SocialLinks links={socials} className={sub} />}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="mb-4 font-semibold">{col.title}</h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className={linkCls}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          {contact && (
            <div className={cn(columns.length >= 3 ? "lg:col-span-2" : "lg:col-span-3")}>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="flex flex-col gap-3 text-sm">
                {contact.address && (
                  <li className={cn("flex gap-2.5", sub)}>
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {contact.address}
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={cn("flex gap-2.5", linkCls)}>
                      <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className={cn("flex gap-2.5 break-all", linkCls)}>
                      <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.hours && (
                  <li className={cn("flex gap-2.5", sub)}>
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                    {contact.hours}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm md:flex-row",
            dark ? "border-zinc-800" : "border-border",
            sub
          )}
        >
          <p>{copyright ?? `© ${YEAR} ${brand.name}. All rights reserved.`}</p>
          {legal && legal.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
