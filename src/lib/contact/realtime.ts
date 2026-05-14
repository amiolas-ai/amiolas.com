import "server-only";
import { createClient } from "redis";
import { env } from "@/lib/env";

export function createSubscriber() {
  return createClient({ url: env.KV_URL });
}
