import Image from "next/image";
import { ElkIslandScene } from "@/components/graphics";
import { IconArrowRight } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <ElkIslandScene className="absolute inset-0 h-full w-full opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-forest" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-20 sm:px-10 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-8">
        <div className="text-cream">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sand">
            TRAKK · Designed in Edmonton
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
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute -inset-10 -z-10 rounded-full bg-sand/10 blur-3xl" />
          <div className="overflow-hidden rounded-3xl bg-cream shadow-2xl">
            <Image
              src="/images/elk-island-sock-design.png"
              alt="The Elk Island Sock — front and back, left and right"
              width={513}
              height={412}
              className="w-full"
              priority
            />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-cream/60">
            The Elk Island Sock
          </p>
        </div>
      </div>
    </section>
  );
}
