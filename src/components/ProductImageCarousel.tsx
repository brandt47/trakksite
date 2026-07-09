"use client";

import Image from "next/image";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import type { ProductImage } from "@/lib/products";

export default function ProductImageCarousel({
  images,
}: {
  images: ProductImage[];
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-3xl bg-cream shadow-2xl">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={600}
            height={480}
            className={`w-full transition-opacity duration-300 ${i > 0 ? "absolute inset-0" : ""} ${i === index ? "opacity-100" : "opacity-0"}`}
            priority={i === 0}
          />
        ))}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => i - 1)}
              disabled={!hasPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/50 text-cream backdrop-blur-sm transition hover:bg-charcoal/70 disabled:opacity-0"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              disabled={!hasNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/50 text-cream backdrop-blur-sm transition hover:bg-charcoal/70 disabled:opacity-0"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-cream transition sm:h-18 sm:w-18 ${
                i === index
                  ? "border-clay"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="72px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
