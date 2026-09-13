import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
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
        <PageHero title={product.title} />
        {/* overflow-hidden contains the blurred glow behind the carousel */}
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* min-w-0 lets the grid item shrink below the image's intrinsic width on narrow screens */}
            <div className="relative mx-auto w-full min-w-0 max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
              <ProductImageCarousel images={product.images} />
            </div>

            <div className="min-w-0 text-charcoal">
              {/* The title is the PageHero's h1, so it isn't repeated here. */}
              <RatingBadge
                summary={summary}
                href="#reviews"
                size="md"
                detailed
              />
              <p className="mt-4 font-display text-xl text-charcoal sm:text-2xl">
                ${product.price.toFixed(2)} {product.currency}
              </p>
              <div
                className="shopify-description mt-4 text-base leading-relaxed text-stone"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />

              <AddToCartForm product={product} />

              <p className="mt-6 text-xs leading-relaxed text-stone">
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
