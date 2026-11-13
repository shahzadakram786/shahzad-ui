# shahzad-ui

My personal website block library. Every section I kept rebuilding for each project (navbar, hero, services, FAQ, footer...) written once, prop-driven and theme-driven, and installable into any Next.js + Tailwind + shadcn project with one command.

## Install a block

```bash
npx shadcn@latest add https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r/navbar.json
```

Or add the namespace once to the project's `components.json`:

```json
"registries": {
  "@shahzad": "https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r/{name}.json"
}
```

```bash
npx shadcn@latest add @shahzad/navbar @shahzad/hero @shahzad/footer
```

### New website in 3 commands

```bash
npx shadcn@latest init
npx shadcn@latest add @shahzad/website-kit   # every block + theme provider + config/site.ts
npx shadcn@latest add @shahzad/theme-royal   # or theme-emerald, theme-neon, theme-ocean
```

## Blocks

| Name | What it is | Variants |
| --- | --- | --- |
| `navbar` | Sticky glass nav, dropdowns, phone, CTA, theme toggle, animated mobile menu, scroll-spy | `default`, `pill` |
| `top-bar` | Email / phone / address / hours / socials strip | |
| `hero` | Badge, title, 2 CTAs, image or custom media, highlight strip | `split`, `centered` · bg `glow`, `grid`, `none` |
| `page-hero` | Inner page banner + breadcrumb, optional photo | |
| `features` | Services / features grid | `cards`, `expand` |
| `stats` | Count-up numbers | `band`, `cards` |
| `testimonials` | Ratings, avatars or initials | `carousel`, `grid` |
| `faq` | Animated accordion + FAQPage SEO schema | `centered`, `split` |
| `contact-section` | Info cards + form (POST to endpoint or `onSubmit`), map | |
| `cta-banner` | Big primary CTA box | |
| `footer` | Brand, socials, link columns, contact, legal | `dark`, `muted` |

Helpers: `reveal`, `section-heading`, `social-icons`, `theme-provider`, `theme-toggle`, `site-config`.
Themes: `theme-royal`, `theme-emerald`, `theme-neon`, `theme-ocean`.

## Example

```tsx
import { Navbar } from "@/components/blocks/navbar"
import { Hero } from "@/components/blocks/hero"
import { Highlight } from "@/components/blocks/section-heading"
import { siteConfig } from "@/config/site"

<Navbar brand={{ name: siteConfig.name, logo: "/logo.svg" }} items={siteConfig.nav} cta={siteConfig.cta} phone={siteConfig.contact.phone} />
<Hero
  badge="Trusted by 100+ practices"
  title={<>Get paid faster for <Highlight>your care</Highlight></>}
  primaryCta={{ label: "Free audit", href: "/contact" }}
  image={{ src: "/hero.jpg", alt: "Doctor" }}
/>
```

## Working on the library

```bash
npm install
npm run dev              # showcase at localhost:3000 (palette switcher bottom-right)
npm run registry:build   # regenerate public/r/*.json after editing blocks or registry.json
```

Commit `public/r` too, that's what projects install from. Rules for writing blocks are in [AGENTS.md](./AGENTS.md).
For AI agents in other projects, paste [docs/AGENT-SNIPPET.md](./docs/AGENT-SNIPPET.md) into their AGENTS.md / CLAUDE.md.
