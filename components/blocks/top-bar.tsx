import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { SocialLinks, type SocialLink } from "@/components/blocks/social-icons"

export interface TopBarProps {
  email?: string
  phone?: string
  address?: string
  hours?: string
  socials?: SocialLink[]
  className?: string
}

/** Thin contact strip above the navbar (business / clinic / restaurant sites). Hidden on small screens. */
export function TopBar({ email, phone, address, hours, socials, className }: TopBarProps) {
  return (
    <div className={cn("hidden bg-primary text-primary-foreground md:block", className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm sm:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 opacity-90 hover:opacity-100">
              <Mail className="size-3.5" />
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100"
            >
              <Phone className="size-3.5" />
              {phone}
            </a>
          )}
          {address && (
            <span className="hidden items-center gap-1.5 opacity-90 lg:flex">
              <MapPin className="size-3.5" />
              {address}
            </span>
          )}
          {hours && (
            <span className="hidden items-center gap-1.5 opacity-90 xl:flex">
              <Clock className="size-3.5" />
              {hours}
            </span>
          )}
        </div>
        {socials && socials.length > 0 && (
          <SocialLinks
            links={socials}
            itemClassName="size-7 border-transparent hover:bg-primary-foreground hover:text-primary"
          />
        )}
      </div>
    </div>
  )
}
