import ReviewList from "@/components/ReviewList";
import { getProductReviews } from "@/lib/reviews";

export default async function ProductReviews({ handle }: { handle: string }) {
  const reviews = await getProductReviews(handle);

  if (!reviews.length) return null;

  return (
    <section id="reviews" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          What hikers are saying
        </h2>

        <div className="mt-10">
          <ReviewList reviews={reviews} />
        </div>

        <p className="mt-12 text-xs text-stone/70">
          Reviews are collected from verified buyers by Judge.me after their
          order arrives.
        </p>
      </div>
    </section>
  );
}
