import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please add a valid email.").max(200),
  projectType: z.string().trim().max(120).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details.")
    .max(5000),
  // Honeypot — bots fill everything they find.
  company: z.string().max(0).optional().default(""),
});

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "jimwelscruz0406@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

const isThrottled = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] ?? char
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: true } | { error: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return res.status(500).json({ error: "The contact form is not configured." });
  }

  const parsed = payloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.issues[0]?.message ?? "Invalid input." });
  }

  const { name, email, projectType, message, company } = parsed.data;

  if (company) return res.status(200).json({ ok: true });

  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim() ??
    req.socket.remoteAddress ??
    "unknown";

  if (isThrottled(ip)) {
    return res
      .status(429)
      .json({ error: "Too many messages just now — please try again later." });
  }

  const html = `
    <h2 style="margin:0 0 16px;font:600 18px system-ui">New message from ${escapeHtml(name)}</h2>
    <p style="margin:0 0 8px;font:400 15px system-ui"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="margin:0 0 8px;font:400 15px system-ui"><strong>Project type:</strong> ${escapeHtml(projectType || "—")}</p>
    <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
    <p style="margin:0;font:400 15px/1.6 system-ui;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const text = [
    `New message from ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error("contact: resend failed", response.status, await response.text());
      return res
        .status(502)
        .json({ error: "Could not send the message right now." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact: resend request threw", error);
    return res
      .status(502)
      .json({ error: "Could not send the message right now." });
  }
}
