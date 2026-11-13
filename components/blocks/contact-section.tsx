"use client"

import { useState } from "react"
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { SocialLinks, type SocialLink } from "@/components/blocks/social-icons"

export interface ContactFormValues {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactSectionProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  email?: string
  phone?: string
  address?: string
  hours?: string
  socials?: SocialLink[]
  /** Show a phone field in the form */
  phoneField?: boolean
  /**
   * POST target. Receives JSON { name, email, phone?, message }.
   * Works with your own /api/contact route, Formspree, Web3Forms, etc.
   */
  endpoint?: string
  /** Or handle submit yourself (server action, Supabase, ...). Throw to show the error state. */
  onSubmit?: (values: ContactFormValues) => Promise<void>
  submitLabel?: string
  successMessage?: string
  /** Optional map embed URL (Google Maps "Embed a map" src) */
  mapSrc?: string
  id?: string
  className?: string
}

export function ContactSection({
  eyebrow = "Contact",
  title = "Get in touch",
  description = "Have a question or a project in mind? Send a message and we'll get back to you within one business day.",
  email,
  phone,
  address,
  hours,
  socials,
  phoneField = false,
  endpoint = "/api/contact",
  onSubmit,
  submitLabel = "Send message",
  successMessage = "Thanks! Your message has been sent.",
  mapSrc,
  id = "contact",
  className,
}: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const values: ContactFormValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: phoneField ? String(data.get("phone") ?? "") : undefined,
      message: String(data.get("message") ?? ""),
    }
    setStatus("loading")
    setError("")
    try {
      if (onSubmit) {
        await onSubmit(values)
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || body.message || "Something went wrong. Please try again.")
        }
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  const info = [
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    address && { icon: MapPin, label: "Address", value: address },
    hours && { icon: Clock, label: "Hours", value: hours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[]

  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <Reveal direction="right" className="flex flex-col gap-4 lg:col-span-2">
            {info.map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-medium break-words hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-medium">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
            {socials && socials.length > 0 && <SocialLinks links={socials} className="mt-2" />}
            {mapSrc && (
              <iframe
                src={mapSrc}
                title="Map"
                loading="lazy"
                className="mt-2 h-56 w-full rounded-2xl border border-border"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-name`}>Name</Label>
                  <Input id={`${id}-name`} name="name" required placeholder="Your name" className="h-11" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input id={`${id}-email`} name="email" type="email" required placeholder="you@example.com" className="h-11" />
                </div>
              </div>
              {phoneField && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-phone`}>Phone</Label>
                  <Input id={`${id}-phone`} name="phone" type="tel" placeholder="(555) 123-4567" className="h-11" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor={`${id}-message`}>Message</Label>
                <Textarea
                  id={`${id}-message`}
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="min-h-32 resize-y"
                />
              </div>

              <Button type="submit" disabled={status === "loading"} className="h-12 rounded-full text-base">
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> {submitLabel}
                  </>
                )}
              </Button>

              <div aria-live="polite">
                {status === "success" && (
                  <p className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="size-4" /> {successMessage}
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
