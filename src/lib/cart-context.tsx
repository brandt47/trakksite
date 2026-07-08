"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  fetchCart,
  type CartLine,
  type MappedCart,
} from "./shopify";

export type { CartLine };

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  clearCart: () => void;
  checkoutUrl: string | null;
  subtotal: number;
  totalQuantity: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_ID_KEY = "trakk-cart-id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    if (!storedId) return;

    fetchCart(storedId).then((cart) => {
      if (!cart) {
        localStorage.removeItem(CART_ID_KEY);
        return;
      }
      applyCart(cart);
    });
  }, []);

  function applyCart(cart: MappedCart) {
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    setLines(cart.lines);
    localStorage.setItem(CART_ID_KEY, cart.id);
  }

  async function addLine(variantId: string, quantity = 1) {
    setIsLoading(true);
    try {
      const lineInput = { merchandiseId: variantId, quantity };
      const cart = cartId
        ? await cartLinesAdd(cartId, [lineInput])
        : await cartCreate([lineInput]);
      applyCart(cart);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const cart =
        quantity <= 0
          ? await cartLinesRemove(cartId, [lineId])
          : await cartLinesUpdate(cartId, [{ id: lineId, quantity }]);
      applyCart(cart);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeLine(lineId: string) {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const cart = await cartLinesRemove(cartId, [lineId]);
      applyCart(cart);
    } finally {
      setIsLoading(false);
    }
  }

  function clearCart() {
    setCartId(null);
    setCheckoutUrl(null);
    setLines([]);
    localStorage.removeItem(CART_ID_KEY);
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
        checkoutUrl,
        subtotal,
        totalQuantity,
        isLoading,
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
