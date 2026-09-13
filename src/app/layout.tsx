import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const SITE_URL = "https://trakk.ca";
const SITE_TITLE = "TRAKK | Merino Wool Trail Socks Designed in Edmonton";
const SITE_DESCRIPTION =
  "TRAKK makes merino wool trail socks, designed in Edmonton, Alberta. Our first release, the Elk Island Sock, maps the lakes of Elk Island National Park.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "TRAKK",
    "trail socks",
    "merino wool socks",
    "Edmonton sock company",
    "hiking socks",
    "Elk Island Sock",
    "Elk Island National Park",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TRAKK",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [{ url: "/images/sockhero.png", alt: "TRAKK merino wool trail socks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/sockhero.png"],
  },
};

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-cream text-charcoal">
        <AnnouncementBar />
        {/* Positioning context for Nav, which floats over each page's hero.
            Anchoring it here keeps it below the announcement bar instead of
            overlapping it. */}
        <div className="relative flex flex-1 flex-col">
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </div>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JMSGHM6LZD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JMSGHM6LZD');
        `}
      </Script>
      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[l]=c[l]||function(){(c[l].q=c[l].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </html>
  );
}
