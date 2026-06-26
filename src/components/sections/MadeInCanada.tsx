import { IconMaple, IconShield, IconWool } from "@/components/icons";

const points = [
  {
    icon: IconWool,
    title: "Knit in British Columbia",
    description:
      "Every pair is knit at a Canadian mill, close enough that we can show up, check the knit, and catch problems before they ship.",
  },
  {
    icon: IconMaple,
    title: "Designed in Edmonton",
    description:
      "The pattern, the fit, and every revision happen here in Alberta, tested on the same trails that inspired it.",
  },
  {
    icon: IconShield,
    title: "Built to last, not just to ship",
    description:
      "Domestic manufacturing costs more, but it means tighter quality control and a sock that holds up instead of one built for a single season.",
  },
];

export default function MadeInCanada() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-clay">
            <IconMaple className="h-4 w-4" />
            Designed in Edmonton, knit in British Columbia
          </div>
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            We kept it close to home.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone">
            It would have been cheaper to manufacture overseas. We chose not
            to. Keeping production in Canada means shorter feedback loops,
            closer relationships with the people actually knitting the socks,
            and a supply chain we can stand behind.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center sm:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest sm:mx-0">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
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
