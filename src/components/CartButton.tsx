"use client";

import { useCart } from "@/lib/cart-context";
import { IconCart } from "@/components/icons";

export default function CartButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream/90 transition hover:text-white"
    >
      <IconCart className="h-5 w-5" />
      {totalQuantity > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[10px] font-semibold text-cream">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
