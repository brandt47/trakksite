import { IconPaw } from "@/components/icons";

export default function MeetJack() {
  return (
    <section id="meet-jack" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-clay">
            <IconPaw className="h-4 w-4" />
            The spirit behind TRAKK
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            Meet Jack.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Jack is an orange cat. He has never climbed a mountain or
              finished a marathon. Most of his exploring happens from a
              windowsill, a porch step, or — more often than we&rsquo;d like
              to admit — the middle of a keyboard during a design review.
            </p>
            <p>
              But Jack approaches the world the way every adventurer should:
              with endless curiosity. He inspects new gear before it leaves
              the house. He watches the birds outside like they&rsquo;re the
              main event. He supervises product sketches with the quiet
              confidence of someone who is definitely in charge.
            </p>
            <p>
              That curiosity — not credentials, not summits — became the
              foundation for TRAKK. You don&rsquo;t need to be an elite
              athlete to want to know what&rsquo;s over the next hill. You
              just need to be curious enough to go look. Jack reminded us of
              that, and every sock we make carries a bit of his spirit along
              for the trip.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-sand-light to-clay-light/40 shadow-lg">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-clay/70">
              <IconPaw className="h-16 w-16" />
              <p className="px-8 text-center text-sm font-medium uppercase tracking-wide text-stone">
                Photo placeholder — Jack, on duty
              </p>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-charcoal px-5 py-3 text-cream shadow-lg">
            <p className="font-display text-sm font-semibold">Jack</p>
            <p className="text-xs text-cream/70">Director of Curiosity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
