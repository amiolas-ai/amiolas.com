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
  const header = [
    `*New inquiry · ${args.identity.name}*`,
    `<mailto:${args.identity.email}|${args.identity.email}>`,
    `\`conv:${args.conversationId}\``,
  ].join("  ·  ");

  const res = await slack.chat.postMessage({
    channel: env.SLACK_INBOX_CHANNEL_ID,
    text: `New inquiry from ${args.identity.name}`,
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: header },
      },
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: args.firstMessage },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Reply in this thread to respond to the visitor.",
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
