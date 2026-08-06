import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
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
    </html>
  );
}
