import { ElkIslandScene } from "@/components/graphics";
import { IconArrowRight } from "@/components/icons";

export default function FinalCta() {
  return (
    <section id="shop" className="relative isolate overflow-hidden bg-forest py-28 sm:py-36">
      <ElkIslandScene className="absolute inset-0 h-full w-full opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-forest" />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          Take a piece of Elk Island with you.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
          Wherever the trail leads next — a city block, a summit, or a quiet
          lake of your own — go there with a little more curiosity, and a
          sock built to keep up.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-semibold text-cream transition hover:bg-clay-light"
          >
            Shop The Elk Island Sock
            <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="mt-5 text-sm text-cream/60">
          Made in Canada · Free shipping on your first pair
        </p>
      </div>
    </section>
  );
}
