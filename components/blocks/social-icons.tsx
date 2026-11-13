import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import { cn } from "@/lib/utils"

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "x"
  | "github"
  | "youtube"
  | "tiktok"
  | "whatsapp"

export interface SocialLink {
  platform: SocialPlatform
  href: string
}

const icons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  github: FaGithub,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
}

const labels: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  github: "GitHub",
  youtube: "YouTube",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
}

export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const Icon = icons[platform]
  return <Icon className={className} />
}

/** Row of round social buttons. Inherits text color, so it works on dark and light backgrounds. */
export function SocialLinks({
  links,
  className,
  itemClassName,
}: {
  links: SocialLink[]
  className?: string
  itemClassName?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.platform + link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels[link.platform]}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border border-current/15 opacity-80 transition hover:border-primary hover:bg-primary hover:text-primary-foreground hover:opacity-100",
            itemClassName
          )}
        >
          <SocialIcon platform={link.platform} className="size-4" />
        </a>
      ))}
    </div>
  )
}
