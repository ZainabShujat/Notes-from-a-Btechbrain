import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export const dynamic = "force-dynamic";

// Conservative but standard; deliberately not trying to be clever.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Very small in-memory throttle. This resets when the serverless instance
// recycles, so it is a speed bump, not a security control — the real
// protections are the unique constraint and the service-role-only write.
const RECENT = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (RECENT.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RECENT.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body.email !== "string") {
      return NextResponse.json({ error: "Enter an email address." }, { status: 400 });
    }

    // Honeypot: real people leave this empty; most bots fill it in.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const email = body.email.trim().toLowerCase();

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "That doesn't look like an email address." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      console.warn("[subscribe] SUPABASE_SERVICE_ROLE_KEY is not configured. Mocking success.");
      return NextResponse.json({ ok: true });
    }

    const source =
      typeof body.source === "string" ? body.source.slice(0, 60) : "site";

    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({ email, source, status: "pending" });

    // 23505 = unique violation. Someone already subscribed; say the same
    // thing either way so the endpoint can't be used to test whether an
    // address is on the list.
    if (error && error.code !== "23505") {
      console.error("[subscribe] insert failed:", error.message);
      return NextResponse.json(
        { error: "Something went wrong. Try again?" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again?" },
      { status: 500 }
    );
  }
}
