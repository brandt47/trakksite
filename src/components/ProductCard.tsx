import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { IconArrowRight } from "@/components/icons";

export default function ProductCard({ product }: { product: Product }) {
  const { title, subtitle, price, compareAtPrice, currency, images, handle, available } = product;
  const image = images[0];

  return (
    <Link
      href={`/shop/${handle}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-forest shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-cream">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain p-8 transition duration-500 group-hover:scale-105"
          />
        )}
        {!available && (
          <span className="absolute left-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            Sold Out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-cream">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-cream/70">{subtitle}</p>}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg text-cream">
            ${price.toFixed(2)} {currency}
            {compareAtPrice && (
              <span className="ml-2 text-sm text-cream/50 line-through">
                ${compareAtPrice.toFixed(2)}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sand transition group-hover:text-clay-light">
            View
            <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
