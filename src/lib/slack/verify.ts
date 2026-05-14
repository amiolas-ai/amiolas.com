import "server-only";

const MAX_TIMESTAMP_DRIFT_SEC = 5 * 60;

export async function verifySlackSignature(args: {
  secret: string;
  rawBody: string;
  signature: string | null;
  timestamp: string | null;
}): Promise<boolean> {
  const { secret, rawBody, signature, timestamp } = args;
  if (!signature || !timestamp) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > MAX_TIMESTAMP_DRIFT_SEC) return false;

  const expected = await hmacHex(secret, `v0:${timestamp}:${rawBody}`);
  const provided = signature.startsWith("v0=") ? signature.slice(3) : signature;
  return timingSafeEqual(expected, provided);
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
