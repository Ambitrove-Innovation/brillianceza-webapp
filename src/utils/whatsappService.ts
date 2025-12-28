// src/utils/whatsappService.ts
import {
  isSelectionOnPromo,
  calculatePromoPrice,
  getPromoWhatsAppMessage,
} from "./promoService";

const WHATSAPP_NUMBER = "+27686311388";

interface BuyNowParams {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  mainImageSrc: string;
}

/**
 * Handles the "Buy Now" action by redirecting to WhatsApp with order details
 * Now includes promotional pricing if applicable
 */
export const handleBuyNow = ({
  product,
  size,
  color,
  quantity,
  mainImageSrc,
}: BuyNowParams): void => {
  // Check if this selection qualifies for promo
  const isOnPromo = isSelectionOnPromo(product, color);
  const price = isOnPromo ? calculatePromoPrice(product.price) : product.price;
  const totalPrice = price * quantity;

  // Base message
  let message =
    "*New Order Request*\n\n" +
    `*Product:* ${product.name} 👕\n` +
    `*Size:* ${size}\n` +
    `*Color:* ${color}\n` +
    `*Quantity:* ${quantity}\n`;

  // Add pricing based on promo status
  if (isOnPromo) {
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
