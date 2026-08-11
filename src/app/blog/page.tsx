import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notes | TRAKK",
  description:
    "Trail notes, gear tips, and stories from the TRAKK team — and from Jack, our Chief Adventure Officer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Field Notes | TRAKK",
    description:
      "Trail notes, gear tips, and stories from the TRAKK team — and from Jack, our Chief Adventure Officer.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Field Notes"
          description="Stories, gear notes, and adventures from the TRAKK team."
        />
        <section className="bg-cream py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            {posts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-stone">No posts yet — check back soon.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
