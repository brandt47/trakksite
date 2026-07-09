import Image from "next/image";

const scenes = [
  {
    title: "Running",
    description: "Light enough for tempo runs, tough enough for the long ones.",
    image: "/images/jackhike.jpg",
  },
  {
    title: "Hiking",
    description: "Arch support and venting mesh for miles of elevation.",
    image: "/images/jackintent.jpg",
  },
  {
    title: "Road Trips",
    description: "The pair you reach for between gas stations and gravel roads.",
    image: "/images/jackcar.png",
  },
  {
    title: "Everyday Adventure",
    description: "Comfortable enough that you'll forget you put them on.",
    image: "/images/jackonswingset.jpg",
  },
];

export default function Lifestyle() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenes.map(({ title, description, image }) => (
            <div
              key={title}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-lake-light/30"
            >
              <Image
                src={image}
                alt={`${title} with TRAKK`}
                fill
                className="object-cover"
              />
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
