//! Centralized promotion system for Brilliance

//* Easily enable/disable and modify promo settings
export const PROMO_CONFIG = {
  // Toggle promotion on/off
  isActive: false,
  discountPercent: 30,

  // Target criteria
  targetCategory: "tops" as const,
  targetColor: "White",

  // Visual settings
  badgeText: "30% OFF",
  badgeColor: "bg-red-600",

  // Display messages
  promoLabel: "SALE",
} as const;

export const isProductOnPromo = (product: Product): boolean => {
  if (!PROMO_CONFIG.isActive) return false;

  return (
    product.category === PROMO_CONFIG.targetCategory &&
    product.colors.some((color) =>
      color.toLowerCase().includes(PROMO_CONFIG.targetColor.toLowerCase())
    )
  );
};

/**
 * Check if specific product + color selection qualifies
 * Used on product detail page where user selects color
 */
export const isSelectionOnPromo = (
  product: Product,
  selectedColor: string
): boolean => {
  if (!PROMO_CONFIG.isActive) return false;

  return (
    product.category === PROMO_CONFIG.targetCategory &&
    selectedColor.toLowerCase().includes(PROMO_CONFIG.targetColor.toLowerCase())
  );
};

/**
 * Calculate discounted price
 */
export const calculatePromoPrice = (originalPrice: number): number => {
  const discount = originalPrice * (PROMO_CONFIG.discountPercent / 100);
  return originalPrice - discount;
};

/**
 * Get promo details for a product
 */
export const getPromoDetails = (product: Product) => {
  const isOnPromo = isProductOnPromo(product);

  if (!isOnPromo) {
    return {
      isOnPromo: false,
      originalPrice: product.price,
      discountedPrice: product.price,
      savings: 0,
      discountPercent: 0,
    };
  }

  const discountedPrice = calculatePromoPrice(product.price);
  const savings = product.price - discountedPrice;

  return {
    isOnPromo: true,
    originalPrice: product.price,
    discountedPrice,
    savings,
    discountPercent: PROMO_CONFIG.discountPercent,
  };
};

/**
 * Get promo badge component props
 */
export const getPromoBadgeProps = () => ({
  text: PROMO_CONFIG.badgeText,
  className: `${PROMO_CONFIG.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`,
});

/**
 * Format promo message for WhatsApp
 */
export const getPromoWhatsAppMessage = (
  product: Product,
  selectedColor: string,
  quantity: number
): string => {
  const isOnPromo = isSelectionOnPromo(product, selectedColor);

  if (!isOnPromo) return "";

  const originalTotal = product.price * quantity;
  const discountedPrice = calculatePromoPrice(product.price);
  const discountedTotal = discountedPrice * quantity;
  const totalSavings = originalTotal - discountedTotal;

  return (
    `\n\n🎉 *SPECIAL OFFER: ${PROMO_CONFIG.discountPercent}% OFF WHITE SHIRTS!*\n` +
    `*Original Price:* R${product.price.toFixed(
      2
    )} × ${quantity} = R${originalTotal.toFixed(2)}\n` +
    `*Promo Price:* R${discountedPrice.toFixed(
      2
    )} × ${quantity} = R${discountedTotal.toFixed(2)}\n` +
    `*You Save:* R${totalSavings.toFixed(2)} 💰`
  );
};

/* Get list of all products currently on promotion*/
export const getPromoProducts = (allProducts: Product[]): Product[] => {
  if (!PROMO_CONFIG.isActive) return [];
  return allProducts.filter(isProductOnPromo);
};

/*
 * Check if promo system is currently active
 */
export const isPromoActive = (): boolean => PROMO_CONFIG.isActive;

/**
 * Get promo configuration (for display purposes)
 */
export const getPromoConfig = () => ({
  ...PROMO_CONFIG,
});
