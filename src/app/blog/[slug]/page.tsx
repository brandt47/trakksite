import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconChevronLeft } from "@/components/icons";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { getPostSlugs, getPostMeta } from "@/lib/blog";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  return {
    title: `${meta.title} | TRAKK Field Notes`,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/blog/${slug}`,
      images: meta.image ? [{ url: meta.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post: React.ComponentType;
  let metadata: Awaited<ReturnType<typeof getPostMeta>>;
  try {
    ({ default: Post, metadata } = await import(`@/content/blog/${slug}.mdx`));
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero eyebrow="Field Notes" title={metadata.title} description={formatDate(metadata.date)} />
        <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone transition hover:text-clay"
          >
            <IconChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            All Field Notes
          </Link>
          {metadata.image && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={metadata.image}
                alt={metadata.title}
                fill
                sizes="768px"
                className="object-cover"
              />
            </div>
          )}
          <div className="prose prose-stone mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-charcoal prose-a:text-clay prose-a:no-underline hover:prose-a:underline">
            <Post />
          </div>
          <div className="mt-12 border-t border-charcoal/10 pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-clay-light"
            >
              <IconChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
              Back to Field Notes
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
