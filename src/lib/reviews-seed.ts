import type { Review } from "./reviews";

/**
 * Published reviews exported from Judge.me, used whenever JUDGEME_API_TOKEN is
 * unset or the API call fails. Ids are the Judge.me metaobject handles from the
 * export, so a review keeps the same identity once the API takes over.
 *
 * To refresh: Judge.me → Reviews → Export → "all published reviews in Judge.me
 * format", then transcribe the rows here. Reviewer emails and IP addresses are
 * deliberately left out — this data is rendered in the browser.
 *
 * `authorLocation` is set by hand. The export's `location` column is derived
 * from the reviewer's IP address and had all three of these reviewers in
 * Calgary, so don't copy that column across.
 */
export const seedReviews: Review[] = [
  {
    id: "review-52308209-7fd4-49dc-b139-7045cbb0e84b",
    rating: 5,
    body: "Unique, locally designed socks that hold up quite well! I typically wear a size 11.5 and these fit great still. I have quickly put on nearly 100km of hiking with them on and they're holding up great.",
    authorName: "Austin Novodvorsky",
    authorLocation: "Edmonton, AB",
    productHandle: "elk-island-sock",
    createdAt: "2026-09-09T21:36:45Z",
    verified: true,
    pictures: [],
  },
  {
    id: "review-c81327ba-4e80-40fc-83dc-e15267a0ce82",
    rating: 5,
    body: "Great colors and fantastic delivery!",
    authorName: "Heather Brandt",
    authorLocation: "Red Deer, AB",
    createdAt: "2026-09-10T00:26:51Z",
    verified: true,
    pictures: [],
  },
  {
    id: "review-489fe59e-ce2a-4173-b0fb-8267303bbba4",
    rating: 5,
    body: "I love these socks! They are great for hiking and climbing!",
    authorName: "Isabelle Wiebe",
    authorLocation: "Calgary, AB",
    productHandle: "elk-island-sock",
    createdAt: "2026-09-10T07:57:35Z",
    verified: true,
    pictures: [
      {
        thumbnail:
          "https://s3.amazonaws.com/me.judge.review-images/trakk/1789027056__1789027051508-1000016126__original.jpeg",
        full: "https://s3.amazonaws.com/me.judge.review-images/trakk/1789027056__1789027051508-1000016126__original.jpeg",
      },
    ],
  },
];
