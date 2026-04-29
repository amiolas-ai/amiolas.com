---
name: add-shadcn
description: Use this skill when the user asks to install or add a shadcn/ui component (e.g., "add button component", "install dialog", "I need a dropdown-menu"). Runs npx shadcn add and verifies brand token integration.
---

# Add shadcn/ui Component

When invoked:

## 1. Identify the component
- Standard shadcn names: `button`, `dialog`, `dropdown-menu`, `navigation-menu`, `sheet`, `toast`, `form`, `input`, `card`, etc.
- Confirm spelling against https://ui.shadcn.com/docs/components if uncertain

## 2. Verify shadcn is initialized
Check if `components.json` exists at project root.
- If not, run: `npx shadcn@latest init`
  - Choose: TypeScript, Tailwind v4 (no config), `src/` directory, `app/` (App Router), `components/ui` alias
- If yes, proceed to step 3

## 3. Install the component
```bash
npx shadcn@latest add <component-name>
```

This places the file at `src/components/ui/<component-name>.tsx`.

## 4. Verify brand token integration
shadcn primitives use CSS variables from `app/globals.css`. Check that:
- `--primary` resolves to violet `#693AD4` (or `oklch(50% 0.22 290)`)
- Default Button variant renders with brand violet
- Dark mode tokens (`.dark`) are wired correctly

If the primary color is wrong, update `globals.css` `@theme` block (NOT a tailwind.config — Tailwind v4 has no config file).

## 5. Test the import
Quick smoke test in any Server Component:
```tsx
import { Button } from "@/components/ui/button";
// ...
<Button variant="default">Test</Button>
```

## Constraints
- shadcn primitives **only** in `components/ui/`
- Marketing sections that USE shadcn live in `components/marketing/`
- Don't add MUI / Chakra / Mantine — they fight Tailwind and bloat bundles
- If a primitive doesn't exist (e.g., a brand-specific marquee), build by hand in `components/marketing/`

## Common components for marketing site
| Component | Use case |
| --- | --- |
| `button` | CTAs, form submit |
| `navigation-menu` | Header nav |
| `sheet` | Mobile menu |
| `dialog` | Modal (waitlist, demo request) |
| `form` + `input` + `label` | Contact form |
| `accordion` | FAQ |
| `tabs` | Feature comparison |
| `toast` (sonner) | Form submission feedback |
