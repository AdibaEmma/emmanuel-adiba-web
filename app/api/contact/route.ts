import { NextResponse } from "next/server"
import { validateContact, type ContactInput } from "@/lib/contact"
import { siteConfig } from "@/lib/constants"

/**
 * Delivers a contact brief by email through Resend's HTTP API.
 *
 * Needs RESEND_API_KEY and CONTACT_FROM_EMAIL (an address on a domain
 * verified at resend.com/domains). CONTACT_TO_EMAIL defaults to the address
 * published on the site. Without the configuration the route answers 503
 * rather than pretending the message went anywhere — the form then points
 * the visitor at the email address instead.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  // Honeypot: a field real visitors never see or fill.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const { data, errors } = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email

  if (!apiKey || !from) {
    console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL")
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `Brief: ${data.subject}`,
        text: renderText(data),
      }),
    })

    if (!res.ok) {
      console.error("Contact form delivery failed", res.status, await res.text())
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 })
    }
  } catch (error) {
    console.error("Contact form delivery failed", error)
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

// Plain text only: nothing the visitor typed is ever interpreted as HTML.
function renderText(data: ContactInput): string {
  return [
    `From: ${data.name} <${data.email}>`,
    `Subject: ${data.subject}`,
    "",
    data.message,
    "",
    `— Sent from the contact form at ${siteConfig.url}/contact`,
  ].join("\n")
}
