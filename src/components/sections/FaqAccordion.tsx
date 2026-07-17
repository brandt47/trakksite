"use client";

import { useState } from "react";
import { IconChevronRight } from "@/components/icons";

type Faq = { question: string; answer: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-sand">
      {faqs.map(({ question, answer }, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-4 py-8 text-left${i === faqs.length - 1 ? " pb-0" : ""}`}
              aria-expanded={isOpen}
            >
              <h2 className="font-display text-xl font-semibold text-charcoal sm:text-2xl">
                {question}
              </h2>
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
                <p className="pb-8 leading-relaxed text-stone">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
