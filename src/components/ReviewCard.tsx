import Image from "next/image";
import { StarRating } from "@/components/StarRating";
import { IconVerified } from "@/components/icons";
import type { Review } from "@/lib/reviews";

// Fixed to UTC so the server and client agree on the rendered date.
const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function ReviewCard({
  review,
  onDark = false,
}: {
  review: Review;
  onDark?: boolean;
}) {
  const { rating, title, body, authorName, authorLocation, createdAt, verified, pictures } =
    review;

  const surface = onDark
    ? "border-cream/10 bg-charcoal/25"
    : "border-sand bg-white";

  return (
    <figure
      className={`flex flex-col rounded-2xl border p-6 ${surface}`}
    >
      <StarRating rating={rating} size="md" onDark={onDark} />

      {title && (
        <h3
          className={`mt-4 font-display text-lg font-semibold ${
            onDark ? "text-cream" : "text-charcoal"
          }`}
        >
          {title}
        </h3>
      )}

      {/* Judge.me serves review text unsanitized, so it is only ever rendered
          as text — never as HTML. */}
      <blockquote
        className={`mt-3 flex-1 whitespace-pre-line leading-relaxed ${
          onDark ? "text-cream/85" : "text-stone"
        }`}
      >
        {body}
      </blockquote>

      {pictures.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {pictures.map((picture) => (
            <a
              key={picture.full}
              href={picture.full}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-20 w-20 overflow-hidden rounded-lg border border-sand/40 transition hover:opacity-85"
            >
              <Image
                src={picture.thumbnail}
                alt={`Customer photo from ${authorName}'s review`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      )}

      <figcaption className="mt-5">
        <p
          className={`text-sm font-semibold ${
            onDark ? "text-cream" : "text-charcoal"
          }`}
        >
          {authorName}
        </p>
        <p
          className={`mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${
            onDark ? "text-cream/50" : "text-stone/80"
          }`}
        >
          {verified && (
            <span className="inline-flex items-center gap-1 text-clay">
              <IconVerified className="h-3.5 w-3.5" />
              Verified buyer
            </span>
          )}
          {authorLocation && <span>{authorLocation}</span>}
          <time dateTime={createdAt}>
            {dateFormatter.format(new Date(createdAt))}
          </time>
        </p>
      </figcaption>
    </figure>
  );
}
