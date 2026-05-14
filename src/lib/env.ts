import "server-only";
import { z } from "zod";

const EnvSchema = z.object({
  SLACK_BOT_TOKEN: z
    .string()
    .min(1, "SLACK_BOT_TOKEN is required")
    .refine((v) => v.startsWith("xoxb-"), {
      message: "SLACK_BOT_TOKEN must start with 'xoxb-'",
    }),
  SLACK_SIGNING_SECRET: z.string().min(1),
  SLACK_INBOX_CHANNEL_ID: z
    .string()
    .regex(/^C[A-Z0-9]+$/, "must be a Slack channel ID (starts with 'C')"),
  KV_REST_API_URL: z.string().url(),
  KV_REST_API_TOKEN: z.string().min(1),
  KV_URL: z
    .string()
    .min(1)
    .refine((v) => v.startsWith("redis://") || v.startsWith("rediss://"), {
      message: "KV_URL must be a redis:// or rediss:// connection string",
    }),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = parsed.data;
