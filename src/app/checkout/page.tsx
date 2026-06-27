"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
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

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Checkout"
          description="Secure checkout is launching soon. Here's what's in your order so far."
        />
        <section className="bg-cream py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-6 sm:px-10">
            {lines.length === 0 ? (
              <p className="text-center text-stone">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li
                      key={line.variantId}
                      className="flex items-center gap-4 rounded-2xl border border-stone/10 bg-white/40 p-4"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-forest">
                        <Image
                          src={line.image}
                          alt={line.productTitle}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-sm font-semibold text-charcoal">
                          {line.productTitle}
                        </p>
                        <p className="text-xs text-stone">
                          {line.variantTitle} · Qty {line.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">
                        ${(line.price * line.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-stone/15 pt-6 text-base font-semibold text-charcoal">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)} CAD</span>
                </div>

                <div className="mt-10 rounded-2xl border border-stone/10 bg-forest p-7 text-center">
                  <p className="font-display text-xl font-semibold text-cream">
                    We&rsquo;re putting the finishing touches on secure checkout.
                  </p>
                  <p className="mt-2 text-sm text-cream/75">
                    Leave your email and we&rsquo;ll let you know the moment you
                    can complete this order.
                  </p>

                  {submitted ? (
                    <p className="mt-5 font-display text-lg text-cream">
                      You&rsquo;re on the list. We&rsquo;ll be in touch soon.
                    </p>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-5 flex flex-col gap-3 sm:flex-row"
                    >
                      <label htmlFor="checkout-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="checkout-email"
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
                        {submitting ? "Sending…" : "Notify Me"}
                      </button>
                    </form>
                  )}
                  {error && (
                    <p className="mt-3 text-sm text-clay-light">{error}</p>
                  )}
                </div>

                <Link
                  href="/cart"
                  className="mt-6 block text-center text-sm font-semibold text-charcoal/70 transition hover:text-charcoal"
                >
                  Back to Cart
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
