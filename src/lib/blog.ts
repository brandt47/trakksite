import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  image?: string;
  excerpt?: string;
};

export type BlogPost = BlogPostMeta & { slug: string };

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta> {
  const { metadata } = await import(`@/content/blog/${slug}.mdx`);
  return metadata as BlogPostMeta;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => ({ slug, ...(await getPostMeta(slug)) })),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
