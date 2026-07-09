import ProductCard from "@/components/ProductCard";
import { getFeaturedProduct } from "@/lib/products";

export default async function FeaturedProducts() {
  const product = await getFeaturedProduct();
  if (!product) return null;

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          Featured Products
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard product={product} />
        </div>
      </div>
    </section>
  );
}
