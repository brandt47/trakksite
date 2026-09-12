import Link from "next/link";
import { IconStar } from "@/components/icons";
import type { RatingSummary } from "@/lib/reviews";

const SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

type Size = keyof typeof SIZES;

type StarRatingProps = {
  rating: number;
  size?: Size;
  /** Dims the empty stars for forest/charcoal backgrounds. */
  onDark?: boolean;
  className?: string;
};

export function StarRating({
  rating,
  size = "sm",
  onDark = false,
  className = "",
}: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const stars = Array.from({ length: 5 });

  return (
    <span
      role="img"
      aria-label={`${Number(clamped.toFixed(1))} out of 5 stars`}
      className={`relative inline-flex shrink-0 ${className}`}
    >
      <span className={`flex gap-0.5 ${onDark ? "text-cream/20" : "text-sand"}`}>
        {stars.map((_, i) => (
          <IconStar key={i} className={SIZES[size]} />
        ))}
      </span>
      {/* Partial fill for averages: the same row, clipped to the score. */}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${(clamped / 5) * 100}%` }}
      >
        <span className="flex w-max gap-0.5 text-clay">
          {stars.map((_, i) => (
            <IconStar key={i} className={SIZES[size]} />
          ))}
        </span>
      </span>
    </span>
  );
}

type RatingBadgeProps = {
  summary: RatingSummary;
  /** Anchor or page to jump to, e.g. "#reviews". Omit inside another link. */
  href?: string;
  size?: Size;
  onDark?: boolean;
  /** Spells out "2 reviews" instead of the bare count. */
  detailed?: boolean;
  className?: string;
};

export function RatingBadge({
  summary,
  href,
  size = "sm",
  onDark = false,
  detailed = false,
  className = "",
}: RatingBadgeProps) {
  const { count, average } = summary;
  if (!count) return null;

  const label = detailed
    ? `${average.toFixed(1)} · ${count} ${count === 1 ? "review" : "reviews"}`
    : `(${count})`;

  const content = (
    <>
      <StarRating rating={average} size={size} onDark={onDark} />
      <span className={onDark ? "text-cream/70" : "text-stone"}>{label}</span>
    </>
  );

  const layout = `inline-flex items-center gap-2 text-sm ${className}`;

  if (!href) {
    return <span className={layout}>{content}</span>;
  }

  return (
    <Link
      href={href}
      className={`${layout} transition hover:text-clay-light`}
    >
      {content}
    </Link>
  );
}
