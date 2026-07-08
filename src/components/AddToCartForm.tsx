"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { IconMinus, IconPlus } from "@/components/icons";
import type { Product } from "@/lib/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  async function handleAddToCart() {
    if (!variant) return;
    await addLine(variant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8">
      {product.options.map((option) => (
        <div key={option.name} className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sand">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                disabled={!v.available}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  v.id === variantId
                    ? "border-clay bg-clay text-cream"
                    : "border-cream/30 text-cream/80 hover:border-cream/60"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-cream/30">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-cream transition hover:text-clay-light"
            aria-label="Decrease quantity"
          >
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-cream">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center text-cream transition hover:text-clay-light"
            aria-label="Increase quantity"
          >
            <IconPlus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!variant?.available}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          {added ? "Added!" : variant?.available ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
