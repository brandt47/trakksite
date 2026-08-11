import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { IconArrowRight } from "@/components/icons";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const { slug, title, excerpt, date, image } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-forest shadow-sm transition hover:shadow-lg"
    >
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-sand">
          {formatDate(date)}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-cream">{title}</h3>
        {excerpt && <p className="mt-2 text-sm leading-relaxed text-cream/70">{excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sand transition group-hover:text-clay-light">
          Read more
          <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
