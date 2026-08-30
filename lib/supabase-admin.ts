import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 *
 * Never import this into a client component — the key bypasses RLS.
 * Used for writes that must not be performable from the browser
 * (e.g. inserting subscribers).
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
