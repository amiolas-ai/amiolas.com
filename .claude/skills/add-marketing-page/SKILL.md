---
name: add-marketing-page
description: Use this skill when the user asks to add a new public marketing page (e.g., "add /pricing page", "create about page", "add careers route"). Creates a route under app/(marketing)/ with proper metadata, loading state, and conventions per CLAUDE.md.
---

# Add Marketing Page

When invoked:

## 1. Determine the route slug
- From user request (e.g., `pricing`, `about`, `careers`, `case-studies/<name>`)
- Confirm with user if ambiguous

## 2. Verify route group structure
The `(marketing)` route group must exist with shared layout. If not present:
- Create `src/app/(marketing)/layout.tsx` with header + footer chrome
- Move `app/page.tsx` content into `app/(marketing)/page.tsx` if needed

## 3. Create the page
File: `src/app/(marketing)/<slug>/page.tsx`

Defaults:
- **Server Component** (no `"use client"`)
- Export `metadata` with `title`, `description`, optional OG override
- Use the marketing `<Container>` / `<Section>` helpers if they exist

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Amiolas",
  description: "Plans and pricing for Amiolas Specify.",
};

export default function PricingPage() {
  return (
    <main>
      {/* sections */}
    </main>
  );
}
```

## 4. Optional siblings
- `loading.tsx` — only if the page does dynamic data fetching
- `error.tsx` — for graceful failure UX
- `_components/` — page-only components (underscore excludes from routing)

## 5. Wire into navigation & sitemap
- Add link to `components/layout/header.tsx` if the page is part of main nav
- Add entry to `src/app/sitemap.ts` so search engines discover it

## 6. Verify
- `npm run dev` and confirm the route renders
- Check Lighthouse SEO ≥ 95 (metadata, title, description)
- Confirm no CLS regression from new images

## Naming
- Slug: `kebab-case` (`case-studies`, not `caseStudies`)
- Component: `PascalCase + Page` (`PricingPage`, `AboutPage`)

## Anti-patterns
- ❌ Adding `"use client"` to the page itself (push to leaf islands instead)
- ❌ Hard-coded `<title>` in JSX (use `metadata` export)
- ❌ Forgetting to update sitemap
