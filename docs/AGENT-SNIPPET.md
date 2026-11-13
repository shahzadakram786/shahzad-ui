<!-- Paste this into AGENTS.md / CLAUDE.md of any new website project -->

## UI blocks: use shahzad-ui first

Before writing a navbar, top bar, hero, page hero, services/features grid, stats, testimonials, FAQ, contact section,
CTA banner or footer, **install it from Shahzad's registry instead of writing it from scratch**:

- Index (what exists, descriptions): https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r/registry.json
- Install one block: `npx shadcn@latest add https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r/<name>.json`
- New site, everything at once: `.../r/website-kit.json`, then a theme: `.../r/theme-royal.json` (or emerald, neon, ocean)
- Shortcut: add to components.json
  `"registries": { "@shahzad": "https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r/{name}.json" }`
  then `npx shadcn@latest add @shahzad/navbar @shahzad/footer`

How to use them:
1. Put the client's content in `config/site.ts` (installed by `site-config`) and pass it as props.
   Read the props interface at the top of each block file, they are documented.
2. Change the look through CSS variables in `globals.css` (`--primary`, `--radius`, fonts), not by editing blocks.
3. Wrap the app in `ThemeProvider` (`components/blocks/theme-provider.tsx`, `attribute="class"`) if using the theme toggle.
4. Only edit a block's code when the project truly needs something different. If the change is useful for future sites,
   make it in the shahzad-ui repo as a new prop or variant instead.
5. If no block fits, build the section here and suggest adding it to shahzad-ui.

Requirements: Next.js (app router) + Tailwind v4 + shadcn initialised (`npx shadcn@latest init`).
