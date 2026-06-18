---
name: project-route-typegen
description: New dynamic routes need `npx next typegen` before PageProps<...> typechecks; dev 404s return HTTP 200 with not-found UI
metadata:
  type: project
---

On amiolas.com (Next 16), adding a new dynamic route (e.g. `/careers/[slug]`) requires running `npx next typegen` before `npx tsc --noEmit` will resolve the `PageProps<"/careers/[slug]">` global helper. The generated route types are not regenerated automatically by a bare tsc run.

**Why:** Next 16 generates per-route literal-typed `PageProps`/`LayoutProps` helpers; they only exist after typegen scans the app dir.

**How to apply:** After creating/renaming any dynamic segment, run `npx next typegen` first, then typecheck. The local dev server (already running on :3000) also picks up new routes without restart.

Related dev quirk: a `notFound()`-triggered route returns **HTTP 200** in `next dev` while serving the "This page could not be found" not-found UI — verify by grepping page *content* (e.g. "This page could not be found"), not the status code. Production serves a real 404.
