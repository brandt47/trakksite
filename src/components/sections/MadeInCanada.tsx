import { IconMaple } from "@/components/icons";

export default function MadeInCanada() {
  return (
    <section id="made-in-canada" className="bg-sand-light py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-6 text-center sm:px-10">
        <IconMaple className="h-5 w-5 text-clay" />
        <p className="font-display text-lg text-charcoal sm:text-xl">
          Designed in Edmonton, knit in British Columbia.
        </p>
      </div>
    </section>
  );
}
