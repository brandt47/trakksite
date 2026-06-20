import { TopoPattern } from "@/components/graphics";

const scenes = [
  {
    title: "Running",
    description: "Light enough for tempo runs, tough enough for the long ones.",
  },
  {
    title: "Hiking",
    description: "Arch support and venting mesh for miles of elevation.",
  },
  {
    title: "Road Trips",
    description: "The pair you reach for between gas stations and gravel roads.",
  },
  {
    title: "Everyday Adventure",
    description: "Comfortable enough that you'll forget you put them on.",
  },
];

export default function Lifestyle() {
  return (
    <section className="bg-lake py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sand">
            Wherever the day takes you
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
            One sock, every adventure.
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenes.map(({ title, description }) => (
            <div
              key={title}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-lake-light/30"
            >
              <TopoPattern className="absolute inset-0 h-full w-full text-cream/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-semibold text-cream">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/80">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
