"use client";

import { useState } from "react";
import Button from "./ui/Button";
import { cx } from "./ui/cx";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubscribeForm({
  source = "site",
  compact = false,
  className,
}: {
  /** Where the signup came from, e.g. "footer" or "article". */
  source?: string;
  /** Footer variant: no heading, tighter spacing. */
  compact?: boolean;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again?");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again?");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cx(
          "rounded-md border border-hairline bg-surface-1 p-4 text-sm text-ink-1",
          className
        )}
        role="status"
      >
        You&rsquo;re on the list. New writing will land in your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cx("w-full", className)}>
      {!compact && (
        <>
          <h3 className="text-lg font-semibold text-ink-1">
            Get new posts by email
          </h3>

          <p className="mt-1 mb-3 text-sm text-ink-2">
            Occasional writing on engineering, curiosity, and figuring things
            out. No spam, unsubscribe anytime.
          </p>
        </>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`subscribe-${source}`} className="sr-only">
          Email address
        </label>

        <input
          id={`subscribe-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cx(
            "min-h-11 w-full flex-1 rounded-md border border-hairline bg-surface-2 px-4 py-2.5",
            "text-ink-1 placeholder:text-ink-2 outline-none transition-colors",
            "hover:border-hairline-strong",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          )}
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === "submitting"}
          className="shrink-0"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>

      {status === "error" && message && (
        <p className="mt-2 text-sm text-rose-500" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
