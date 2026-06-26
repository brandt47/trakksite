import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | TRAKK",
  description:
    "How TRAKK collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Introduction",
    body: (
      <p>
        TRAKK (&ldquo;TRAKK,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains
        what personal information we collect, how we use and share it, and
        the choices you have, when you visit our website or purchase our
        products. By using our site, you agree to the practices described
        below.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    body: (
      <>
        <p>We collect information in the following ways:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-charcoal">
              Information you give us:
            </span>{" "}
            your name, email address, shipping and billing address, phone
            number, and payment details when you place an order, sign up for
            our newsletter, or contact us.
          </li>
          <li>
            <span className="font-semibold text-charcoal">
              Information collected automatically:
            </span>{" "}
            your IP address, browser type, device information, and pages
            visited, collected through cookies and similar technologies when
            you browse our site.
          </li>
          <li>
            <span className="font-semibold text-charcoal">
              Information from third parties:
            </span>{" "}
            our payment processor and shipping partners may share order and
            delivery status information with us.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Process and fulfill your orders, including shipping and payment.</li>
          <li>Respond to your questions and provide customer support.</li>
          <li>
            Send you order confirmations, shipping updates, and, if you opt
            in, marketing emails about new products and promotions.
          </li>
          <li>Improve our website, products, and customer experience.</li>
          <li>Detect and prevent fraud and protect the security of our site.</li>
          <li>Comply with legal and tax obligations.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Cookies & Tracking",
    body: (
      <p>
        We use cookies and similar technologies to keep our site working
        properly, remember your preferences, and understand how visitors use
        our site through analytics tools. You can disable cookies in your
        browser settings, though some parts of the site may not function as
        intended without them.
      </p>
    ),
  },
  {
    title: "5. How We Share Your Information",
    body: (
      <>
        <p>
          We do not sell your personal information. We share information
          only with:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Service providers who help us operate our business, such as
            payment processors, shipping carriers, email and analytics
            providers, and our e-commerce platform.
          </li>
          <li>Legal authorities, when required to comply with the law.</li>
          <li>
            A successor entity, in the event of a merger, acquisition, or
            sale of business assets.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Retention",
    body: (
      <p>
        We retain personal information for as long as needed to fulfill the
        purposes described in this policy, including to satisfy legal,
        accounting, or reporting requirements, after which it is securely
        deleted or anonymized.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    body: (
      <p>
        Under Canada&rsquo;s Personal Information Protection and Electronic
        Documents Act (PIPEDA), you have the right to access, correct, or
        request deletion of your personal information, and to withdraw
        consent to marketing communications at any time by using the
        unsubscribe link in our emails or by contacting us directly. We will
        respond to verified requests within a reasonable time.
      </p>
    ),
  },
  {
    title: "8. Children's Privacy",
    body: (
      <p>
        Our website is not directed at children under 13, and we do not
        knowingly collect personal information from children.
      </p>
    ),
  },
  {
    title: "9. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated effective date.
      </p>
    ),
  },
  {
    title: "10. Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how we handle
        your personal information, contact us at{" "}
        <a
          href="mailto:hello@trakksocks.com"
          className="font-semibold text-clay underline-offset-4 hover:underline"
        >
          hello@trakksocks.com
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageHero
          title="Privacy Policy"
          description="Effective date: June 21, 2026"
        />

        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-12 px-6 sm:px-10">
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="font-display text-xl font-semibold text-charcoal sm:text-2xl">
                  {title}
                </h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-stone">
                  {body}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
