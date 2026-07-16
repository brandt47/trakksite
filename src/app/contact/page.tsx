import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | TRAKK",
  description: "Get in touch with the TRAKK team — whether you have a question about your order or you're an artist interested in collaborating with us.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Get in Touch"
        />

        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-10 px-6 sm:px-10">

            <div className="rounded-2xl border border-sand bg-white p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                Customer Support
              </h2>
              <p className="mt-4 leading-relaxed text-stone">
                Questions about your order, sizing, or anything else? We&rsquo;re
                happy to help. Reach out and we&rsquo;ll get back to you as soon
                as we can.
              </p>
              <a
                href="mailto:cs@trakk.ca"
                className="mt-6 inline-block font-semibold text-clay transition hover:text-clay-light"
              >
                cs@trakk.ca
              </a>
            </div>

            <div className="rounded-2xl border border-sand bg-white p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                Artists &amp; Collaborators
              </h2>
              <p className="mt-4 leading-relaxed text-stone">
                We make trail socks and we like working with artists. If
                you&rsquo;ve got work that would look good knit into one, email
                us.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
