"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { checkoutUrl } = useCart();

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex flex-1 items-center justify-center py-32">
        <p className="text-stone">Redirecting to checkout…</p>
      </main>
      <Footer />
    </div>
  );
}
