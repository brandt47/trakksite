"use client";

import { useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/lib/reviews";

export default function ReviewList({
  reviews,
  initialCount = 4,
  onDark = false,
}: {
  reviews: Review[];
  initialCount?: number;
  onDark?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, initialCount);
  const hidden = reviews.length - visible.length;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((review) => (
          <ReviewCard key={review.id} review={review} onDark={onDark} />
        ))}
      </div>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-8 inline-flex items-center rounded-full border border-clay px-6 py-2.5 text-sm font-semibold text-clay transition hover:bg-clay hover:text-cream"
        >
          Read {hidden} more {hidden === 1 ? "review" : "reviews"}
        </button>
      )}
    </div>
  );
}
