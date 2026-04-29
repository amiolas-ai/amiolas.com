---
name: add-server-action-form
description: Use this skill when the user asks to add a form with server-side handling (e.g., "add contact form", "newsletter signup form", "lead capture", "demo request form"). Creates a Server Action with zod validation paired with a Client Component using useActionState.
---

# Add Server Action Form

When invoked:

## 1. Define the form
- Purpose (contact / newsletter / demo request / etc.)
- Fields and validation rules (e.g., email required, message min 10 chars)
- Where the data goes (email service, DB, third-party API)

## 2. Create the Server Action
File: `src/lib/actions/<name>.ts`

```ts
"use server";

import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  message: z.string().min(10).max(2000),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors: Record<string, string[]> };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  // Side effects: send email, persist, call third-party
  // await resend.emails.send({...})

  return { status: "success" };
}
```

## 3. Create the form Client Component
File: `src/components/marketing/<name>-form.tsx`

```tsx
"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/lib/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-4">
      <input name="name" required />
      {state.status === "error" && state.errors.name && (
        <p className="text-red-500">{state.errors.name[0]}</p>
      )}
      {/* ...email, message */}
      <button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </button>
      {state.status === "success" && (
        <p className="text-green-500">Sent! We'll be in touch.</p>
      )}
    </form>
  );
}
```

## 4. Wire into a page
The form (Client Component) imports cleanly into a Server Component page:
```tsx
import { ContactForm } from "@/components/marketing/contact-form";

export default function ContactPage() {
  return (
    <main>
      <h1>Contact</h1>
      <ContactForm />
    </main>
  );
}
```

## Anti-patterns
- ❌ Use API routes (`app/api/contact/route.ts`) for form submission — Server Actions are simpler and progressive-enhancement friendly
- ❌ Fetch the action from client manually — use `<form action={formAction}>`
- ❌ Skip zod validation — server-side validation is non-negotiable
- ❌ Return non-serializable errors (Error objects, functions) — return plain objects

## When to use API routes instead
Use `app/api/<name>/route.ts` ONLY when:
- The endpoint must be called from outside React (webhook, mobile app, third-party)
- You need fine-grained HTTP method handling (different GET/POST behavior)

## Email/CRM integrations to consider
- **Resend** — modern transactional email
- **Loops** — for marketing/newsletter
- **HubSpot / Notion API** — lead capture
- All called from inside the Server Action with env-validated keys (`lib/env.ts`)
