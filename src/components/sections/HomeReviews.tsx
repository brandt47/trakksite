import ReviewCard from "@/components/ReviewCard";
import { getFeaturedReviews } from "@/lib/reviews";

export default async function HomeReviews() {
  const reviews = await getFeaturedReviews(3);

  if (!reviews.length) return null;

  return (
    <section className="bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          Worn and reviewed
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onDark />
          ))}
        </div>
      </div>
    </section>
  );
}
