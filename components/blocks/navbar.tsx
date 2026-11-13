"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/blocks/theme-toggle"

export interface NavItem {
  label: string
  href: string
  /** Optional dropdown (e.g. Services). Parent href is used on mobile as "View all". */
  children?: { label: string; href: string; description?: string }[]
}

export interface NavbarProps {
  brand: {
    name: string
    href?: string
    /** Image URL or any element (svg, <Image />). Omit to show the name only. */
    logo?: string | React.ReactNode
    /** Hide the text name next to the logo */
    hideName?: boolean
  }
  items: NavItem[]
  cta?: { label: string; href: string; external?: boolean }
  phone?: string
  showThemeToggle?: boolean
  /**
   * default: solid glass bar with links
   * pill: links inside a rounded pill with an animated active background (portfolio style)
   */
  variant?: "default" | "pill"
  /** Transparent until the page scrolls (good over a dark hero) */
  transparentOnTop?: boolean
  className?: string
}

/** Pixels from the top of the viewport used for scroll-spy and anchor offset */
const OFFSET = 96

export function Navbar({
  brand,
  items,
  cta,
  phone,
  showThemeToggle = true,
  variant = "default",
  transparentOnTop = false,
  className,
}: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [activeHash, setActiveHash] = useState<string | null>(null)

  const hasHashLinks = items.some((i) => i.href.startsWith("#"))

  // Scrolled state + scroll-spy for one-page sites (#about, #contact ...)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (!hasHashLinks) return
      let current: string | null = null
      for (const item of items) {
        if (!item.href.startsWith("#") || item.href.length < 2) continue
        const el = document.getElementById(item.href.slice(1))
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= OFFSET + 40 && rect.bottom >= OFFSET + 40) current = item.href
      }
      setActiveHash(current ?? (window.scrollY < 40 ? items[0]?.href ?? null : null))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [items, hasHashLinks])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href.startsWith("#")) return activeHash === href
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(href + "/")
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false)
    if (!href.startsWith("#")) return
    e.preventDefault()
    const el = href.length > 1 ? document.getElementById(href.slice(1)) : null
    const top = el ? el.getBoundingClientRect().top + window.scrollY - OFFSET + 8 : 0
    window.scrollTo({ top, behavior: "smooth" })
    history.replaceState(null, "", href)
  }

  const solid = scrolled || !transparentOnTop || mobileOpen

  const logo =
    typeof brand.logo === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={brand.logo} alt={brand.name} className="h-9 w-auto object-contain" />
    ) : (
      brand.logo
    )

  const linkBase = "text-sm font-medium transition-colors"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        solid
          ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent",
        scrolled ? "py-2" : "py-3",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Brand */}
        <Link
          href={brand.href ?? "/"}
          onClick={(e) => handleClick(e, brand.href ?? "/")}
          className="flex shrink-0 items-center gap-2.5"
        >
          {logo}
          {!brand.hideName && (
            <span className="text-lg font-bold tracking-tight text-foreground">{brand.name}</span>
          )}
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <ul
            className={cn(
              "flex items-center",
              variant === "pill"
                ? "gap-1 rounded-full border border-border bg-muted/60 p-1 backdrop-blur"
                : "gap-1"
            )}
          >
            {items.map((item) => {
              const active = isActive(item.href) || !!item.children?.some((c) => isActive(c.href))

              if (item.children?.length) {
                return (
                  <li key={item.label} className="group relative">
                    <button
                      type="button"
                      className={cn(
                        linkBase,
                        "flex items-center gap-1 rounded-full px-4 py-2",
                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>
                    {/* Dropdown: opens on hover and keyboard focus */}
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-max min-w-60 max-w-md -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                      <ul
                        className={cn(
                          "grid gap-1 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl",
                          item.children.length > 6 && "grid-cols-2"
                        )}
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={(e) => handleClick(e, child.href)}
                              className={cn(
                                "block rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                                isActive(child.href) && "bg-muted"
                              )}
                            >
                              <span className="block text-sm font-medium">{child.label}</span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={cn(
                      linkBase,
                      "relative inline-block rounded-full px-4 py-2",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && variant === "pill" && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full border border-primary/30 bg-primary/15"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {active && variant === "default" && (
                      <motion.span
                        layoutId="navbar-active-line"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop right side */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-4" />
              {phone}
            </a>
          )}
          {showThemeToggle && <ThemeToggle />}
          {cta && (
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              onClick={(e) => handleClick(e, cta.href)}
              className={cn(buttonVariants(), "h-10 rounded-full px-5")}
            >
              {cta.label}
            </Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          {showThemeToggle && <ThemeToggle />}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-h-[calc(100dvh-4.5rem)] max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6">
              {items.map((item) =>
                item.children?.length ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                      aria-expanded={openGroup === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-4 transition-transform", openGroup === item.label && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openGroup === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-3 overflow-hidden border-l border-border pl-3"
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={(e) => handleClick(e, child.href)}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                                  isActive(child.href) && "text-primary"
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {(phone || cta) && (
                <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-2 px-3 text-muted-foreground"
                    >
                      <Phone className="size-4" />
                      {phone}
                    </a>
                  )}
                  {cta && (
                    <Link
                      href={cta.href}
                      target={cta.external ? "_blank" : undefined}
                      rel={cta.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => handleClick(e, cta.href)}
                      className={cn(buttonVariants(), "h-11 w-full rounded-full text-base")}
                    >
                      {cta.label}
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
