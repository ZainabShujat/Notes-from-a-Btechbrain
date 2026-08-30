-- Email subscribers for Notes From a BTech Brain.
--
-- Writes happen ONLY through /api/subscribe using the service-role key,
-- so RLS below intentionally grants the anon role nothing at all.

CREATE TABLE IF NOT EXISTS subscribers (
  id           BIGSERIAL PRIMARY KEY,
  email        TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending',   -- pending | confirmed | unsubscribed
  source       TEXT DEFAULT 'site',               -- footer | article | ...
  confirmed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Case-insensitive uniqueness: the API lowercases before inserting, and this
-- guarantees it even if something else writes later.
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_email
  ON subscribers (lower(email));

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers (status);

-- Lock the table down. No policies are created, so with RLS enabled the
-- anon and authenticated roles can neither read nor write it. The
-- service-role key used by the API bypasses RLS by design.
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
