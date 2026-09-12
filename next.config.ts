import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      // Judge.me review photos. Older reviews are served straight from the
      // shared S3 bucket, so that host is scoped to the review-images path.
      { protocol: "https", hostname: "s3.amazonaws.com", pathname: "/me.judge.review-images/**" },
      { protocol: "https", hostname: "pub-images.judge.me" },
      { protocol: "https", hostname: "cdn.judge.me" },
      { protocol: "https", hostname: "judgeme.imgix.net" },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
