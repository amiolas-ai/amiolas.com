import "server-only";
import { WebClient } from "@slack/web-api";
import { env } from "@/lib/env";
import type { Identity } from "@/types/contact";

const slack = new WebClient(env.SLACK_BOT_TOKEN);

export async function postNewInquiryThread(args: {
  identity: Identity;
  conversationId: string;
  firstMessage: string;
}): Promise<string> {
  const name = sanitizeIdentity(args.identity.name);
  const body = escapeMrkdwn(args.firstMessage);
  const quotedBody = body
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
  const preview = args.firstMessage
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  const res = await slack.chat.postMessage({
    channel: env.SLACK_INBOX_CHANNEL_ID,
    text: `${args.identity.name}: ${preview}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📩 *[새 문의]*\n*${name}* (<mailto:${args.identity.email}|${args.identity.email}>)`,
        },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: quotedBody },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `\`conv:${args.conversationId}\``,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "↳ 이 thread에 답글을 달면 방문자 위젯에 즉시 전달됩니다",
          },
        ],
      },
    ],
  });

  if (!res.ok || !res.ts) {
    throw new Error(`Slack postMessage failed: ${res.error ?? "unknown"}`);
  }
  return res.ts;
}

function escapeMrkdwn(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sanitizeIdentity(text: string): string {
  return text.replace(/[*_`~]/g, "").trim();
}

export async function replyInThread(args: {
  threadTs: string;
  text: string;
}): Promise<void> {
  const res = await slack.chat.postMessage({
    channel: env.SLACK_INBOX_CHANNEL_ID,
    thread_ts: args.threadTs,
    text: args.text,
  });
  if (!res.ok) {
    throw new Error(`Slack reply failed: ${res.error ?? "unknown"}`);
  }
}
