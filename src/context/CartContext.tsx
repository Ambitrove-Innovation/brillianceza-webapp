import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { products } from "../feature/data/product";
import { getActiveMarkdown } from "../utils/helpers";

/**
 * Cart item hydrated with fresh catalog data so prices,
 * markdowns, and sold-out states are always live.
 */
export interface CartItem {
  id: string; // unique ID for cart line (productId + size + color)
  productId: string;
  size: string;
  color: string;
  quantity: number;
  product: Product;
}

/**
 * Slim shape saved to localStorage — never caches full Product objects.
 */
interface StoredCartItem {
  id: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
  hasSoldOutItems: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Load raw stored items with backward-compatibility for legacy cart snapshots
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("brilliance_cart");
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((item: any) => ({
        id: item.id || `${item.productId || item.product?.id}-${item.size}-${item.color}`,
        productId: item.productId || item.product?.id || "",
        size: item.size || "",
        color: item.color || "",
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
      })).filter((item) => Boolean(item.productId));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate items fresh against current product catalogue
  const cartItems: CartItem[] = useMemo(() => {
    return storedItems
      .map((item) => {
        const freshProduct = products.find((p) => p.id === item.productId);
        if (!freshProduct) return null;
        return {
          id: item.id,
          productId: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          product: freshProduct,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [storedItems]);

  // Persist only slim IDs and options to localStorage
  useEffect(() => {
    try {
      const payload: StoredCartItem[] = storedItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));
      localStorage.setItem("brilliance_cart", JSON.stringify(payload));
    } catch {
      // LocalStorage quota or privacy mode handling
    }
  }, [storedItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    const id = `${product.id}-${size}-${color}`;
    setStoredItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id,
          productId: product.id,
          size,
          color,
          quantity,
        },
      ];
    });
    setIsCartOpen(true); // Automatically open cart drawer to display confirmation
  };

  const removeFromCart = (id: string) => {
    setStoredItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setStoredItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setStoredItems([]);

  // Compute live subtotal using current pricing and active discounts
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const activeMarkdown = getActiveMarkdown(item.product.markdown);
      const price = activeMarkdown ? activeMarkdown.salePrice : item.product.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // True if any item currently in the bag is marked sold-out in the catalogue
  const hasSoldOutItems = useMemo(() => {
    return cartItems.some((item) => item.product.isSoldOut);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartTotal,
        cartCount,
        hasSoldOutItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
