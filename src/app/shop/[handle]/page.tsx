import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Features from "@/components/sections/Features";
import AddToCartForm from "@/components/AddToCartForm";
import { getAllProducts, getProductByHandle } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) return {};

  return {
    title: `${product.title} | TRAKK`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <section className="relative isolate overflow-hidden bg-forest">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-forest" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-20 sm:px-10 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-16">
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
              <div className="overflow-hidden rounded-3xl bg-cream shadow-2xl">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={600}
                  height={480}
                  className="w-full"
                  priority
                />
              </div>
            </div>

            <div className="text-cream">
              {product.subtitle && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand">
                  TRAKK · {product.subtitle}
                </p>
              )}
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 font-display text-2xl text-cream">
                ${product.price.toFixed(2)} {product.currency}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-cream/80">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <AddToCartForm product={product} />
            </div>
          </div>
        </section>

        <Features />
      </main>
      <Footer />
    </div>
  );
}
