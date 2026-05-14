import { NextResponse } from "next/server";
import { getMessagesSince } from "@/lib/contact/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");
  const sinceParam = url.searchParams.get("since");

  if (!conversationId) {
    return NextResponse.json(
      { messages: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const since = sinceParam ? Number.parseInt(sinceParam, 10) : 0;
  const safeSince = Number.isFinite(since) && since >= 0 ? since : 0;

  const messages = await getMessagesSince(conversationId, safeSince);
  return NextResponse.json(
    { messages },
    { headers: { "Cache-Control": "no-store" } },
  );
}
