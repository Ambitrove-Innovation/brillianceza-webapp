import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice, getActiveMarkdown } from "../../utils/helpers";
import { handleCartWhatsAppCheckout } from "../../utils/whatsappService";
import { FREE_DELIVERY_THRESHOLD } from "../../utils/constants";

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    hasSoldOutItems,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const progressToFreeDelivery = Math.min(
    100,
    Math.round((cartTotal / FREE_DELIVERY_THRESHOLD) * 100),
  );
  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - cartTotal,
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className={`fixed top-0 right-0 h-full w-full sm:w-105 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-ink" />
            <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-ink">
              Your Bag
            </h2>
            <span className="bg-stone text-ink text-xs font-semibold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="p-2 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-6 py-3 bg-stone/50 border-b border-neutral-100">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            {remainingForFreeDelivery === 0 ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                🎉 Free delivery unlocked!
              </span>
            ) : (
              <span className="text-neutral-700">
                Add{" "}
                <span className="font-bold text-ink">
                  R{remainingForFreeDelivery.toFixed(2)}
                </span>{" "}
                more for Free Delivery
              </span>
            )}
            <span className="text-neutral-500">{progressToFreeDelivery}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                remainingForFreeDelivery === 0 ? "bg-emerald-600" : "bg-ink"
              }`}
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-stone flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-ink mb-2">
                Your Bag is Empty
              </h3>
              <p className="text-sm text-neutral-500 max-w-xs mb-6">
                Looks like you haven&apos;t added any streetwear to your bag
                yet.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand transition">
                Explore Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => {
              const activeMarkdown = getActiveMarkdown(item.product.markdown);
              const price = activeMarkdown
                ? activeMarkdown.salePrice
                : item.product.price;
              const lineTotal = price * item.quantity;

              return (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={closeCart}
                    className="w-20 h-24 bg-stone rounded overflow-hidden shrink-0 block relative">
                    <img
                      src={`/images/pics/${item.product.images[0]}`}
                      alt={item.product.name}
                      className={`w-full h-full object-cover ${item.product.isSoldOut ? "grayscale opacity-50" : ""}`}
                    />
                    {item.product.isSoldOut && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[9px] font-bold uppercase tracking-wider">
                        Sold Out
                      </span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="truncate">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="text-xs uppercase tracking-wider font-bold text-ink truncate hover:underline block">
                          {item.product.name}
                        </Link>
                        {item.product.isSoldOut && (
                          <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                            Sold Out
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-neutral-500 font-medium">
                      <span className="bg-stone px-2 py-0.5 rounded">
                        Size: {item.size}
                      </span>
                      <span className="bg-stone px-2 py-0.5 rounded">
                        Color: {item.color}
                      </span>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        {activeMarkdown && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            R{(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                        <span className="text-sm font-bold text-ink">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 p-6 bg-white space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Delivery</span>
                <span>
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    "Calculated on confirmation"
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-extrabold text-ink">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {hasSoldOutItems && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded text-center font-medium">
                Some items in your bag are sold out. Please remove them to proceed with checkout.
              </div>
            )}

            <button
              onClick={() => handleCartWhatsAppCheckout(cartItems, cartTotal)}
              disabled={hasSoldOutItems}
              className={`w-full font-semibold text-xs uppercase tracking-[0.2em] py-4 transition flex items-center justify-center gap-2 shadow-lg ${
                hasSoldOutItems
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : "bg-ink hover:bg-neutral-800 text-white cursor-pointer hover:shadow-xl"
              }`}>
              <span>{hasSoldOutItems ? "Remove Sold-Out Items" : "Checkout"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <button
                onClick={clearCart}
                className="hover:text-red-500 transition-colors underline">
                Clear Bag
              </button>
              <span>Direct verification • South African delivery</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
