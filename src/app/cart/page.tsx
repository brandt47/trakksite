"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCart } from "@/lib/cart-context";
import { IconArrowRight, IconMinus, IconPlus, IconTrash } from "@/components/icons";

export default function CartPage() {
  const { lines, updateQuantity, removeLine, subtotal, checkoutUrl, isLoading } = useCart();

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero title="Your Cart" />
        <section className="bg-cream py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            {lines.length === 0 ? (
              <div className="text-center">
                <p className="text-stone">Your cart is empty.</p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light"
                >
                  Shop TRAKK
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-12 lg:grid-cols-3">
                <ul className="space-y-6 lg:col-span-2">
                  {lines.map((line) => (
                    <li
                      key={line.variantId}
                      className="flex gap-5 rounded-2xl border border-stone/10 bg-white/40 p-5"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-forest">
                        <Image
                          src={line.image}
                          alt={line.productTitle}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-base font-semibold text-charcoal">
                            {line.productTitle}
                          </p>
                          <p className="text-sm text-stone">{line.variantTitle}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-stone/20">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity - 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-charcoal"
                              aria-label="Decrease quantity"
                            >
                              <IconMinus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-charcoal">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity + 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-charcoal"
                              aria-label="Increase quantity"
                            >
                              <IconPlus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold text-charcoal">
                            ${(line.price * line.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        aria-label="Remove item"
                        className="self-start text-stone transition hover:text-clay"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="h-fit rounded-2xl border border-stone/10 bg-white/40 p-6">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    Order Summary
                  </h2>
                  <div className="mt-4 flex items-center justify-between text-sm text-stone">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      ${subtotal.toFixed(2)} CAD
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <a
                    href={checkoutUrl ?? "#"}
                    aria-disabled={!checkoutUrl || isLoading}
                    className="mt-6 flex w-full items-center justify-center rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                  >
                    {isLoading ? "Updating…" : "Checkout"}
                  </a>
                  <Link
                    href="/shop"
                    className="mt-3 flex w-full items-center justify-center text-sm font-semibold text-charcoal/70 transition hover:text-charcoal"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
