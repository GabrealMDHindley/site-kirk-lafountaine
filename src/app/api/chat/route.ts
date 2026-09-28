import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildSiteKnowledge } from "@/lib/site-knowledge";
import { agent } from "@/content/agent";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The chat assistant isn't configured yet — an ANTHROPIC_API_KEY needs to be set in the site's environment variables.",
      },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const trimmed = messages
    .slice(-MAX_HISTORY)
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (trimmed.length === 0) {
    return NextResponse.json({ error: "No valid message provided." }, { status: 400 });
  }

  const knowledge = buildSiteKnowledge();

  const systemPrompt = `You are the on-site assistant for ${agent.name}'s real estate website (${agent.brokerage}). Answer visitor questions ONLY using the information below, drawn directly from the current site content. Be warm, concise, and helpful — a few sentences at a time, not walls of text.

Rules:
- If asked about a specific listing, give the real price/beds/baths/sqft/features from the data below.
- If asked to estimate monthly cost for a listing, point them to that listing's page which has a built-in mortgage calculator, and you may also give a rough ballpark using a typical 20% down / ~6.5% rate assumption — always label it as an estimate and recommend using the on-page calculator or talking to Kirk for accuracy.
- If asked something this data doesn't cover (legal, tax, or lending specifics; scheduling; anything personal to the visitor's situation), say so honestly and direct them to contact Kirk directly at ${agent.phone} or ${agent.email}, or the Contact page.
- Never invent listings, prices, or facts not present below.
- Keep responses focused on real estate, Kirk's services, and this site.

SITE CONTENT:
${knowledge}`;

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 600,
      system: systemPrompt,
      messages: trimmed,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error", err);
    return NextResponse.json(
      { error: "The chat assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
