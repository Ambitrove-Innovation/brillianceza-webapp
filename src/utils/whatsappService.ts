// src/utils/whatsappService.ts

const WHATSAPP_NUMBER = "27686311388";

interface BuyNowParams {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  mainImageSrc: string;
}

/**
 * Handles the "Buy Now" action by redirecting to WhatsApp with order details
 */
export const handleBuyNow = ({
  product,
  size,
  color,
  quantity,
  mainImageSrc,
}: BuyNowParams): void => {
  const message =
    "*New Order Request*\n\n" +
    `*Product:* ${product.name} 👕\n` +
    `*Price:* R${product.price.toFixed(2)}\n` +
    `*Size:* ${size}\n` +
    `*Color:* ${color}\n` +
    `*Quantity:* ${quantity}\n\n` +
    `🖼️ *Product Image:* ${window.location.origin}${mainImageSrc}\n\n` +
    "Please confirm availability. ✅";

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
