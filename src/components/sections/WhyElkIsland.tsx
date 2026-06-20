import { ElkIslandScene } from "@/components/graphics";
import { IconMapPin } from "@/components/icons";

export default function WhyElkIsland() {
  return (
    <section id="why-elk-island" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl bg-forest lg:order-1">
          <ElkIslandScene className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
            <IconMapPin className="h-4 w-4" />
            Elk Island National Park, Alberta
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            A landscape worth
            <br /> tracing in thread.
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
              It&rsquo;s a small park with an outsized sense of place — the
              kind of landscape that doesn&rsquo;t need to be big to leave a
              mark on you. That&rsquo;s exactly why it became the first
              chapter in the TRAKK story.
            </p>
            <p>
              Every line in The Elk Island Sock&rsquo;s pattern is drawn from
              that landscape: the tree line at dusk, the still water of
              Astotin Lake, and the bison that have called this place home for
              generations. It&rsquo;s artwork built from a real place, made to
              go with you to the next one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
