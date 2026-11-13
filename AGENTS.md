<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# shahzad-ui: agent guide

This repo is Shahzad's personal **block registry**. It holds the website sections he rebuilds on every project
(navbar, hero, services, stats, testimonials, FAQ, contact, CTA, footer...). Each block lives here once and is installed
into other projects with the shadcn CLI. **Do not copy-paste blocks between projects. Install from here, or improve them here.**

Registry base URL: `https://raw.githubusercontent.com/shahzadakram786/shahzad-ui/main/public/r`
Index of everything: `public/r/registry.json` (names, descriptions, dependencies).

## Layout
- `components/blocks/*.tsx`: the source of every block (installed to the same path in consumer projects)
- `components/ui/*`: shadcn primitives the blocks rely on (button, input, label, textarea only)
- `config/site.ts`: site-config template (brand, nav, CTA, contact, socials, footer columns)
- `registry/themes.json`: color themes (royal, emerald, neon, ocean)
- `registry.json`: registry manifest. `npm run registry:build` writes `public/r/*.json`
- `app/page.tsx`: live showcase of every block and variant

## Rules for blocks (keep these when editing or adding)
1. **Props only, no hardcoded content.** Brand, links, phone, copy all come in as props. Sensible defaults are fine.
2. **Theme tokens only, no hex colors.** Use `bg-primary`, `text-muted-foreground`, `border-border`, `bg-card`...
   A project changes its look by changing CSS variables, never by editing blocks.
3. **Style-agnostic shadcn usage.** Consumer projects may use the Radix or Base UI flavour of shadcn.
   Only use `Button` (no `asChild`/`render`), `buttonVariants`, `Input`, `Label`, `Textarea`. Build menus, accordions and
   carousels with framer-motion instead of shadcn Sheet/Accordion/Dropdown, because those APIs differ between flavours.
4. Imports: `@/lib/utils` for `cn`, `@/components/ui/*`, `@/components/blocks/*`. Icons: `lucide-react`;
   brand/social icons only through `social-icons` (react-icons), since lucide removed brand icons.
5. Every section block accepts `id` and `className`, is responsive (mobile first) and works in light and dark mode.
6. No `new Date()` / `Math.random()` during render (Next 16 cacheComponents prerender errors).

## Adding or changing a block
1. Create/edit `components/blocks/<name>.tsx`.
2. Add/update its entry in `registry.json` (`type: registry:block`, `dependencies` = npm packages,
   `registryDependencies` = shadcn names like `button` or full URLs of other blocks here). Add it to `website-kit` too.
3. Add a demo to `app/page.tsx`.
4. `npm run registry:build && npm run build`, then commit **including `public/r`** (consumers install from the committed JSON).

## Using blocks in another project
See `docs/AGENT-SNIPPET.md`; paste it into that project's AGENTS.md / CLAUDE.md.
