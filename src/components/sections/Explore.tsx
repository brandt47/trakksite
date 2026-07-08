import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

const destinations = [
  {
    title: "Our Story",
    description:
      "Why a national park east of Edmonton became the pattern on your foot.",
    href: "/our-story",
    image: "/images/realelkisland.jpg",
  },
  {
    title: "Lifestyle",
    description: "Running, hiking, road trips, and everything in between.",
    href: "/lifestyle",
    image: "/images/jackhike.jpg",
  },
];

export default function Explore() {
  return (
    <section id="explore" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone">
            Get to know TRAKK
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            Everything behind the sock.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {destinations.map(({ title, description, href, image }) => (
            <Link
              key={title}
              href={href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-forest shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-lg font-semibold text-cream">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/80">
                  {description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sand transition group-hover:text-clay-light">
                  Learn more
                  <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
