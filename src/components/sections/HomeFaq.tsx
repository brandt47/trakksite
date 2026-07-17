"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";

const faqs = [
  {
    question: "Where is TRAKK based?",
    answer:
      "TRAKK is based in Edmonton, Alberta. Our socks are designed here and made in Canada. Elk Island is our first design because it's the park down the road.",
  },
  {
    question: "What are TRAKK socks made of?",
    answer:
      "Merino wool (67%) blended with polyester (22%), nylon (5%), and elastic (6%) for durability and stretch. Merino regulates temperature, wicks moisture, and resists odor, which is why it's the standard for technical outdoor socks.",
  },
  {
    question: "Are TRAKK socks good for hiking?",
    answer:
      "Yes! TRAKK socks contain a cuff that won't fall down, a reinforced toe/heel, venting mesh and arch support. They work for hiking, camping, trail running, and long days on your feet. Cushioned where you need it, breathable where you don't.",
  },
  {
    question: "Are merino socks warm enough for Alberta winters?",
    answer:
      "Merino insulates even when damp, which matters more than raw thickness. For most winter hikes and everyday Edmonton cold, yes. For -30 sledding days, layer them.",
  },
  {
    question: "Who runs TRAKK?",
    answer:
      "Jack, our Chief Adventure Officer. He is an orange tabby cat. Day-to-day operations are handled by his human in Edmonton.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
          Questions
        </h2>
        <div className="mt-10 divide-y divide-sand">
          {faqs.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between gap-4 py-7 text-left${i === faqs.length - 1 ? " pb-0" : ""}`}
                  aria-expanded={isOpen}
                >
                  <h3 className="font-display text-lg font-semibold text-charcoal sm:text-xl">
                    {question}
                  </h3>
                  <IconChevronRight
                    className={`h-5 w-5 shrink-0 text-stone transition-transform duration-200 ${
                      isOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-7 leading-relaxed text-stone">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href="/faq"
            className="font-semibold text-clay transition hover:text-clay-light"
          >
            See all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
