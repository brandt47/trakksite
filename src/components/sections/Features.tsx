import {
  IconArch,
  IconCuff,
  IconDroplet,
  IconMesh,
  IconShield,
  IconWool,
} from "@/components/icons";

const features = [
  {
    icon: IconCuff,
    title: "A stay-put cuff",
    description:
      "Stays put when everything else is sliding down into your boot. No bunching at the heel.",
  },
  {
    icon: IconDroplet,
    title: "Moisture Wicking",
    description:
      "Merino fibers pull moisture away from the skin to keep feet dry on long days, in any season.",
  },
  {
    icon: IconShield,
    title: "Reinforced Heel & Toe",
    description:
      "Added durability exactly where you need it most, built to outlast the trail and the daily grind.",
  },
  {
    icon: IconMesh,
    title: "Venting Mesh",
    description:
      "Strategic mesh panels improve breathability and temperature regulation when the pace picks up.",
  },
  {
    icon: IconArch,
    title: "Arch Support",
    description:
      "A supportive arch band adds structure and stability for hours of movement, from singletrack to sidewalk.",
  },
  {
    icon: IconWool,
    title: "Merino Wool Blend",
    description:
      "67% merino wool, naturally odor-resistant, so you can wear it again and again.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-forest py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sand">
            What&rsquo;s actually in the sock
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
            Built to hold up, comfortable enough to forget about.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/75">
            Made for long days on the trail and the walk to get coffee the
            next morning. Most of us wear ours for both.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-7 transition hover:bg-cream/[0.07]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/20 text-sand">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-cream/10 bg-cream/[0.04] px-7 py-6 text-center sm:px-10">
          <p className="text-sm uppercase tracking-wide text-sand">
            Composition
          </p>
          <p className="mt-2 font-display text-lg text-cream sm:text-xl">
            67% Merino Wool · 22% Polyester · 5% Nylon · 6% Elastic
          </p>
        </div>
      </div>
    </section>
  );
}
