export const CONTACT_CONFIG = {
  pollIntervalMs: 5000,
  maxMessageLen: 2000,
  minMessageLen: 1,
  maxNameLen: 64,
  rateLimitPerMin: 6,
  rateLimitWindowSec: 60,
  conversationTtlSec: 60 * 60 * 24 * 30,
  ackText: "문의가 접수되었습니다. 영업일 기준 1일 이내에 회신드립니다.",
} as const;
