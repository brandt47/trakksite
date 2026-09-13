"use client";

import { useCountry } from "@/lib/country-context";

/** Mirrors the free shipping rate configured on the Canada zone in Shopify. */
const FREE_SHIPPING_THRESHOLD = 70;

export default function AnnouncementBar() {
  const country = useCountry();
  if (country !== "CA") return null;

  return (
    <div className="bg-clay text-cream">
      <p className="mx-auto max-w-7xl px-6 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.15em] sm:px-10 sm:text-xs">
        Free shipping across Canada on orders over ${FREE_SHIPPING_THRESHOLD}
      </p>
    </div>
  );
}
