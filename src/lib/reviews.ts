import { cache } from "react";
import {
  fetchJudgemeReviews,
  isJudgemeConfigured,
  type JudgemeReview,
} from "./judgeme";
import { seedReviews } from "./reviews-seed";

export type ReviewPicture = {
  thumbnail: string;
  full: string;
};

export type Review = {
  id: string;
  /** 1–5. */
  rating: number;
  title?: string;
  body: string;
  authorName: string;
  authorLocation?: string;
  /** Shopify handle the review is about. Absent on store-level reviews. */
  productHandle?: string;
  createdAt: string;
  verified: boolean;
  pictures: ReviewPicture[];
};

export type RatingSummary = {
  count: number;
  /** Mean rating, 0 when there are no reviews. */
  average: number;
  /** Review count per star rating, keyed 1–5. */
  distribution: Record<number, number>;
};

/**
 * Verified statuses per Judge.me's docs. Reviews collected through a review
 * request email are verified purchases by definition, whatever the status says.
 */
const VERIFIED_STATUSES = new Set([
  "confirmed-buyer",
  "buyer",
  "verified-purchase",
  "semi-verified-purchase",
  "admin",
]);

const EMAIL_SOURCES = new Set(["email", "rre", "new-rre-flow"]);

/**
 * Judge.me returns unpublished reviews too. "spam" is the marker for reviews
 * the store hid; "not-yet" is awaiting curation and shows on the storefront
 * when auto-publish is on, which is the Judge.me default.
 */
function isPublished(review: JudgemeReview): boolean {
  return review.curated !== "spam" && !review.hidden;
}

function isVerified(review: JudgemeReview): boolean {
  return (
    VERIFIED_STATUSES.has(review.verified ?? "") ||
    EMAIL_SOURCES.has(review.source ?? "")
  );
}

function normalizePictures(review: JudgemeReview): ReviewPicture[] {
  return (review.pictures ?? [])
    .filter((picture) => !picture.hidden)
    .map(({ urls }) => {
      const full = urls?.original ?? urls?.huge ?? urls?.compact ?? urls?.small;
      const thumbnail = urls?.compact ?? urls?.small ?? full;
      return full && thumbnail ? { thumbnail, full } : null;
    })
    .filter((picture): picture is ReviewPicture => picture !== null);
}

function normalize(review: JudgemeReview): Review {
  return {
    id: String(review.id),
    rating: review.rating,
    title: review.title?.trim() || undefined,
    body: review.body?.trim() ?? "",
    authorName: review.reviewer?.name?.trim() || review.name?.trim() || "Anonymous",
    productHandle: review.product_handle ?? undefined,
    createdAt: review.created_at,
    verified: isVerified(review),
    pictures: normalizePictures(review),
  };
}

function newestFirst(a: Review, b: Review): number {
  return Date.parse(b.createdAt) - Date.parse(a.createdAt);
}

/**
 * All published reviews, newest first. Wrapped in `cache` so the pages that
 * show ratings in several places (product grid, badge, review list) share one
 * fetch per request.
 */
export const getReviews = cache(async (): Promise<Review[]> => {
  if (!isJudgemeConfigured()) {
    return [...seedReviews].sort(newestFirst);
  }

  try {
    const reviews = await fetchJudgemeReviews();
    return reviews
      .filter(isPublished)
      .map(normalize)
      .filter((review) => review.body.length > 0)
      .sort(newestFirst);
  } catch (error) {
    console.error("Judge.me unavailable, serving exported reviews:", error);
    return [...seedReviews].sort(newestFirst);
  }
});

/** Reviews for one product, excluding store-level reviews. */
export async function getProductReviews(handle: string): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter((review) => review.productHandle === handle);
}

export function summarize(reviews: Review[]): RatingSummary {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;

  for (const { rating } of reviews) {
    distribution[rating] = (distribution[rating] ?? 0) + 1;
    total += rating;
  }

  return {
    count: reviews.length,
    average: reviews.length ? total / reviews.length : 0,
    distribution,
  };
}

/**
 * Star rating for a single product, or for the whole store when no handle is
 * given. Product pages need the per-product figure because Google requires
 * `aggregateRating` to describe only the product on the page.
 */
export async function getRatingSummary(handle?: string): Promise<RatingSummary> {
  const reviews = handle ? await getProductReviews(handle) : await getReviews();
  return summarize(reviews);
}

/**
 * Strongest reviews for the homepage: top-rated first, preferring ones with a
 * customer photo and enough substance to be worth reading.
 */
export async function getFeaturedReviews(limit = 3): Promise<Review[]> {
  const reviews = await getReviews();

  return reviews
    .filter((review) => review.rating >= 4)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (b.pictures.length !== a.pictures.length) {
        return b.pictures.length - a.pictures.length;
      }
      return b.body.length - a.body.length;
    })
    .slice(0, limit);
}
