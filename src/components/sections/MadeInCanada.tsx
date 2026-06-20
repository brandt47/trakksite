import { IconMaple, IconWool, IconShield } from "@/components/icons";

const points = [
  {
    icon: IconMaple,
    title: "Canadian made",
    description:
      "Every pair is manufactured in Canada, supporting domestic mills and the people behind them.",
  },
  {
    icon: IconWool,
    title: "Built to last",
    description:
      "Small-batch production and tight quality control mean every sock meets the same exacting standard.",
  },
  {
    icon: IconShield,
    title: "Craftsmanship first",
    description:
      "No shortcuts on materials or construction — just durable, technical gear made the right way.",
  },
];

export default function MadeInCanada() {
  return (
    <section id="made-in-canada" className="relative bg-sand-light py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay">
          Proudly Canadian
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
          Made in Canada, for the Canadian outdoors.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone">
          TRAKK is built on the belief that gear inspired by Canadian
          landscapes should be made by Canadian hands. Every pair of Elk
          Island Socks is manufactured domestically, supporting local
          knitting mills and the craftsmanship that comes with decades of
          experience.
        </p>

        <div className="mt-16 grid gap-8 text-left sm:grid-cols-3">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-cream/70 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
