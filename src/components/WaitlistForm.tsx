"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-display text-lg text-cream">
        You&rsquo;re on the list. Welcome aboard.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full bg-cream/95 px-5 py-3.5 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-clay"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light disabled:opacity-60"
        >
          {submitting ? "Joining…" : "Join the Waitlist"}
        </button>
      </div>
      {error && <p className="text-sm text-clay-light">{error}</p>}
    </form>
  );
}
