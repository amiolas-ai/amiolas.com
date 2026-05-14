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
  const name = escapeMrkdwn(args.identity.name);
  const body = escapeMrkdwn(args.firstMessage);
  const preview = args.firstMessage
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  const res = await slack.chat.postMessage({
    channel: env.SLACK_INBOX_CHANNEL_ID,
    text: `새 문의 · ${args.identity.name} — ${preview}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "새 문의", emoji: false },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*이름*\n${name}` },
          {
            type: "mrkdwn",
            text: `*이메일*\n<mailto:${args.identity.email}|${args.identity.email}>`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `대화 ID · \`${args.conversationId}\``,
          },
        ],
      },
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: body },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "↳ 이 thread에 답글을 달면 방문자 위젯에 즉시 전달됩니다.",
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
