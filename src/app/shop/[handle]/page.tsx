import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AddToCartForm from "@/components/AddToCartForm";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductReviews from "@/components/sections/ProductReviews";
import { RatingBadge } from "@/components/StarRating";
import { getAllProducts, getProductByHandle } from "@/lib/products";
import { getProductReviews, summarize } from "@/lib/reviews";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({ handle: product.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) return {};

  return {
    title: `${product.title} | TRAKK`,
    description: product.description,
    alternates: { canonical: `/shop/${handle}` },
    openGraph: {
      title: `${product.title} | TRAKK`,
      description: product.description,
      url: `/shop/${handle}`,
      images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const reviews = await getProductReviews(handle);
  const summary = summarize(reviews);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `https://trakk.ca${img.src}`,
    ),
    url: `https://trakk.ca/shop/${handle}`,
    brand: { "@type": "Brand", name: "TRAKK" },
    offers: {
      "@type": "Offer",
      url: `https://trakk.ca/shop/${handle}`,
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    // Rich-result ratings must describe only the product on this page, so this
    // counts the product's own reviews and not the store-wide total.
    ...(summary.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: summary.average.toFixed(1),
        reviewCount: summary.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.slice(0, 10).map((review) => ({
        "@type": "Review",
        ...(review.title && { name: review.title }),
        reviewBody: review.body,
        datePublished: review.createdAt.slice(0, 10),
        author: { "@type": "Person", name: review.authorName },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }),
  };

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col">
        <section className="relative isolate overflow-hidden bg-forest">
          <div className="absolute inset-0 bg-linear-to-b from-charcoal/70 via-charcoal/40 to-forest" />
          <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-5 pt-24 pb-16 sm:px-10 sm:pt-36 sm:pb-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-44 lg:pb-28">
            {/* min-w-0 lets the grid item shrink below the image's intrinsic width on narrow screens */}
            <div className="relative mx-auto w-full min-w-0 max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
              <ProductImageCarousel images={product.images} />
            </div>

            <div className="min-w-0 text-cream">
              <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>
              <RatingBadge
                summary={summary}
                href="#reviews"
                size="md"
                onDark
                detailed
                className="mt-3"
              />
              <p className="mt-4 font-display text-xl text-cream sm:text-2xl">
                ${product.price.toFixed(2)} {product.currency}
              </p>
              <div
                className="shopify-description mt-4 text-base leading-relaxed text-cream/85"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />

              <AddToCartForm product={product} />

              <p className="mt-6 text-xs leading-relaxed text-cream/60">
                Every Trakk design is reviewed and approved by our Chief
                Adventure Officer before production.
              </p>
            </div>
          </div>
        </section>

        <ProductReviews handle={handle} />
      </main>
      <Footer />
    </div>
  );
}
