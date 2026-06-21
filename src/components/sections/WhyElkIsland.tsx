import Image from "next/image";
import { IconMapPin } from "@/components/icons";

export default function WhyElkIsland() {
  return (
    <section id="why-elk-island" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl bg-forest lg:order-1">
          <Image
            src="/images/realelkisland.jpg"
            alt="Sunset over Astotin Lake, Elk Island National Park, Alberta"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
            <IconMapPin className="h-4 w-4" />
            Elk Island National Park, Alberta
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            We drew the pattern
            <br /> straight from the park.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Just east of Edmonton, fenced off from highways and city light,
              Elk Island protects one of the last wild herds of plains and
              wood bison in the world. Rolling aspen parkland gives way to
              quiet lakes, beaver ponds, and forest trails that feel untouched
              by time.
            </p>
            <p>
              The pattern is a simple map of Elk Island. The blue shapes are
              the park&rsquo;s lakes and ponds, Astotin and all the little ones,
              laid out roughly where you&rsquo;d find them on the map.
            </p>
            <p>
              We spent a summer running and hiking the trails out here, crossing
              each one off the map as we finished it, and this is the version of
              the park we wanted to carry around. It&rsquo;s a small place just
              east of Edmonton, but it doesn&rsquo;t take long to forget
              you&rsquo;re anywhere near a city. That&rsquo;s where TRAKK started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
