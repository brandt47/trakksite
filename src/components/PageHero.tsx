type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  cta?: React.ReactNode;
};

export default function PageHero({
  eyebrow = "TRAKK",
  title,
  description,
  cta,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/70 via-charcoal/50 to-forest" />
      <div className="relative mx-auto max-w-3xl px-6 pt-36 pb-16 text-center sm:px-10 sm:pt-44 sm:pb-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            {description}
          </p>
        )}
        {cta && <div className="mt-8 flex justify-center">{cta}</div>}
      </div>
    </section>
  );
}
