import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  interestedProperty?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Lead intake endpoint. Today it validates and logs; wire CRM_WEBHOOK_URL
 * (e.g. a Go High Level inbound webhook) to forward every lead there with
 * no changes to the form or this route's shape.
 */
export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();
  const interestedProperty = (body.interestedProperty || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const lead = {
    name,
    email,
    phone,
    message,
    interestedProperty: interestedProperty || null,
    source: body.source || "website-contact-form",
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("CRM webhook returned non-OK status", res.status);
      }
    } catch (err) {
      console.error("Failed to forward lead to CRM webhook", err);
      // Do not fail the visitor's submission just because the CRM is unreachable —
      // the lead is still logged below.
    }
  } else {
    console.log("New lead (no CRM_WEBHOOK_URL configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
