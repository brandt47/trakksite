"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { IconClose, IconMinus, IconPlus, IconTrash } from "@/components/icons";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeLine, subtotal } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-charcoal/60 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-5">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-sm text-stone">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-forest">
                    <Image
                      src={line.image}
                      alt={line.productTitle}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-sm font-semibold text-charcoal">
                      {line.productTitle}
                    </p>
                    <p className="text-xs text-stone">{line.variantTitle}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-stone/20">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(line.id, line.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-charcoal"
                          aria-label="Decrease quantity"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-charcoal">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(line.id, line.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-charcoal"
                          aria-label="Increase quantity"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">
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
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-stone/15 px-6 py-6">
            <div className="flex items-center justify-between text-sm font-semibold text-charcoal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)} CAD</span>
            </div>
            <p className="mt-1 text-xs text-stone">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
