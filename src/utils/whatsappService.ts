import {
  isSelectionOnPromo,
  calculatePromoPrice,
  getPromoWhatsAppMessage,
} from "./promoService";
import { getActiveMarkdown, showNotification } from "./helpers";
import { FREE_DELIVERY_THRESHOLD } from "./constants";
import type { CartItem } from "../context/CartContext";

export const WHATSAPP_NUMBER = "+27686311388";

interface BuyNowParams {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  mainImageSrc: string;
}

export const handleBuyNow = ({
  product,
  size,
  color,
  quantity,
  mainImageSrc,
}: BuyNowParams): void => {
  // Check if this selection qualifies for promo
  const isOnPromo = isSelectionOnPromo(product, color);
  const activeMarkdown = getActiveMarkdown(product.markdown);
  
  let price = product.price;
  if (isOnPromo) {
    price = calculatePromoPrice(product.price);
  } else if (activeMarkdown) {
    price = activeMarkdown.salePrice;
  }
  
  const totalPrice = price * quantity;

  // Base message
  let message =
    "*New Order Request*\n\n" +
    `*Product:* ${product.name} 👕\n` +
    `*Size:* ${size}\n` +
    `*Color:* ${color}\n` +
    `*Quantity:* ${quantity}\n`;

  // Add pricing based on promo status
  if (isOnPromo || activeMarkdown) {
    const originalTotal = product.price * quantity;
    message +=
      `\n*Original Price:* ~R${product.price.toFixed(2)}~ ❌\n` +
      `*Special Price:* R${price.toFixed(2)} ✨\n` +
      `*Total:* R${totalPrice.toFixed(2)} (Save R${(
        originalTotal - totalPrice
      ).toFixed(2)}!) 💰\n`;
  } else {
    message +=
      `*Price:* R${price.toFixed(2)}\n` +
      `*Total:* R${totalPrice.toFixed(2)}\n`;
  }

  message +=
    `\n🖼️ *Product Image:* ${window.location.origin}${mainImageSrc}\n\n` +
    "Please confirm availability. ✅";

  // Add promo message if applicable
  if (isOnPromo) {
    message += getPromoWhatsAppMessage(product, color, quantity);
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.location.href = whatsappURL;
};

/**
 * Sends a contact form message via WhatsApp
 */
export const sendContactMessage = (formData: ContactFormData): void => {
  const message =
    "*New Contact Message*\n\n" +
    `*Name:* ${formData.name}\n` +
    `*Email:* ${formData.email}\n` +
    `*Phone:* ${formData.phone || "Not provided"}\n` +
    `*Subject:* ${formData.subject || "General Inquiry"}\n\n` +
    `*Message:*\n${formData.message}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.location.href = whatsappURL;
};

/**
 * Opens WhatsApp chat for general inquiries
 */
export const openWhatsAppChat = (message?: string): void => {
  const defaultMessage = "Hi! I have a question about Brilliance products.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
};

/**
 * Validates if WhatsApp number is configured correctly
 */
export const isWhatsAppConfigured = (): boolean => {
  return WHATSAPP_NUMBER.length > 0;
};

/**
 * Sends a full shopping cart checkout request via WhatsApp
 */
export const handleCartWhatsAppCheckout = (
  cartItems: CartItem[],
  cartTotal: number
): void => {
  if (cartItems.length === 0) return;

  // Block checkout if any item in the bag is currently sold out (WARN-09)
  const soldOutItems = cartItems.filter((item) => item.product.isSoldOut);
  if (soldOutItems.length > 0) {
    const names = soldOutItems.map((i) => i.product.name).join(", ");
    showNotification(
      `Please remove sold-out items from your bag before checkout: ${names}`,
      "error"
    );
    return;
  }

  const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;
  
  let message = "*Brilliance Clothing — Bag Checkout Request* 🛍️✨\n\n";
  message += "*Items Ordered:*\n";

  cartItems.forEach((item, index) => {
    const activeMarkdown = getActiveMarkdown(item.product.markdown);
    const price = activeMarkdown ? activeMarkdown.salePrice : item.product.price;
    const lineTotal = price * item.quantity;
    
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   • Size: ${item.size} | Color: ${item.color}\n`;
    message += `   • Quantity: ${item.quantity} × R${price.toFixed(2)} = *R${lineTotal.toFixed(2)}*\n`;
    if (activeMarkdown) {
      message += `   • Note: Promotional Markdown applied ✨\n`;
    }
  });

  message += `\n*Order Subtotal:* R${cartTotal.toFixed(2)}\n`;
  message += `*Delivery Benefit:* ${
    isFreeDelivery
      ? `FREE Standard Delivery unlocked! (Order over R${FREE_DELIVERY_THRESHOLD}) 🚚🎉`
      : "Standard courier delivery rate applies 📦"
  }\n\n`;
  message += "Please confirm stock availability and send payment / banking instructions to finalize my order. Thank you! 🙏";

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const opened = window.open(whatsappURL, "_blank");
  if (!opened) {
    window.location.href = whatsappURL;
  }
};

