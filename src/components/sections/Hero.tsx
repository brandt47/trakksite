import { ElkIslandScene, SockIllustration } from "@/components/graphics";
import { IconArrowRight } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <ElkIslandScene className="absolute inset-0 h-full w-full opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-forest" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-20 sm:px-10 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-8">
        <div className="text-cream">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sand">
            TRAKK · Made in Canada
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Wear a piece of the wild,
            <br className="hidden sm:block" /> wherever you go.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/85">
            The Elk Island Sock is our first release — a technical merino
            sock inspired by the rolling forests and quiet lakes of Elk
            Island National Park, Alberta.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay-light"
            >
              Shop The Elk Island Sock
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#why-elk-island"
              className="text-sm font-semibold text-cream/90 underline-offset-4 transition hover:text-white hover:underline"
            >
              Discover the story
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-cream/15 pt-6 text-cream/90">
            <div>
              <dt className="text-xs uppercase tracking-wide text-sand">Wool</dt>
              <dd className="font-display text-xl font-semibold">67%</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-sand">Origin</dt>
              <dd className="font-display text-xl font-semibold">Canada</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-sand">Inspired by</dt>
              <dd className="font-display text-xl font-semibold">Elk Island</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
          <SockIllustration className="w-full drop-shadow-2xl" />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-cream/60">
            The Elk Island Sock — product photography coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
