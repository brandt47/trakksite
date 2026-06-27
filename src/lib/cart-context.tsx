"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeLine: (variantId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalQuantity: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "trakk-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(JSON.parse(stored));
    } catch {
      // corrupted or unavailable storage, start with an empty cart
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addLine(line: Omit<CartLine, "quantity">, quantity = 1) {
    setLines((current) => {
      const existing = current.find((l) => l.variantId === line.variantId);
      if (existing) {
        return current.map((l) =>
          l.variantId === line.variantId
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...current, { ...line, quantity }];
    });
    setIsOpen(true);
  }

  function updateQuantity(variantId: string, quantity: number) {
    setLines((current) =>
      quantity <= 0
        ? current.filter((l) => l.variantId !== variantId)
        : current.map((l) =>
            l.variantId === variantId ? { ...l, quantity } : l,
          ),
    );
  }

  function removeLine(variantId: string) {
    setLines((current) => current.filter((l) => l.variantId !== variantId));
  }

  function clearCart() {
    setLines([]);
  }

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );
  const totalQuantity = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addLine,
        updateQuantity,
        removeLine,
        clearCart,
        subtotal,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
