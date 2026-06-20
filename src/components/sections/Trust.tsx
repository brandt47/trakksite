import { IconMaple, IconShield, IconWool } from "@/components/icons";

const trustPoints = [
  {
    icon: IconWool,
    title: "Premium materials",
    description: "67% merino wool blend, chosen for comfort and performance.",
  },
  {
    icon: IconMaple,
    title: "Canadian made",
    description: "Manufactured domestically, supporting local mills and makers.",
  },
  {
    icon: IconShield,
    title: "Performance focused",
    description: "Reinforced, vented, and built to handle real miles.",
  },
];

export default function Trust() {
  return (
    <section className="border-y border-stone/10 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-charcoal">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">
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
