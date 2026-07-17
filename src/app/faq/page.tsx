import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | TRAKK",
  description:
    "Answers about TRAKK's merino trail socks. We're an Edmonton, Alberta sock company making technical socks for hiking, camping, and running, made in Canada.",
};

const faqs = [
  {
    question: "Where is TRAKK based?",
    answer:
      "TRAKK is based in Edmonton, Alberta. Our socks are designed here and made in Canada. Elk Island is our first design because it's the park down the road.",
  },
  {
    question: "Can I buy TRAKK socks in Edmonton?",
    answer:
      "Right now we're online only, shipping from Edmonton. We're working on getting into local outdoor shops, so check back. If you run a shop in Edmonton and want to stock us, get in touch.",
  },
  {
    question: "Are TRAKK socks made in Canada?",
    answer: "Yes. Designed in Edmonton, knit in Canada.",
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
    question: "Can I run in them?",
    answer:
      "Yes. Merino wicks sweat and doesn't hold odor, so they hold up fine as running socks, on trail or pavement.",
  },
  {
    question: "Are merino socks warm enough for Alberta winters?",
    answer:
      "Merino insulates even when damp, which matters more than raw thickness. For most winter hikes and everyday Edmonton cold, yes. For -30 sledding days, layer them.",
  },
  {
    question: "How do I wash merino wool socks?",
    answer:
      "Machine wash cold, inside out, then tumble dry on low. Treated right, merino socks last years.",
  },
  {
    question: "Do merino socks actually stop smelling?",
    answer:
      "Mostly, yes. Merino fibers resist the bacteria that cause odor, so you can wear them multiple days on a trip before they need a wash. Ask anyone who backpacks.",
  },
  {
    question: "Will there be other designs?",
    answer:
      "Yes, more styles are being developed! Join the email list to hear first.",
  },
  {
    question: "Who runs TRAKK?",
    answer:
      "Jack, our Chief Adventure Officer. He is an orange tabby cat. Day-to-day operations are handled by his human in Edmonton.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Unworn socks with the tag still on can be returned within 30 days. If something's wrong with your pair, email us, and we'll sort it out.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="FAQ"
          description="Everything you want to know about TRAKK socks."
        />
        <section className="bg-cream py-16 sm:py-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="mx-auto max-w-3xl px-6 sm:px-10">
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
