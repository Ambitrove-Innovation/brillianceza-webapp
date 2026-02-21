export function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function getUrlParameter(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function setUrlParameter(name: string, value: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState({}, "", url.toString());
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s() -]/g, "");
  const phoneRegex = /^(\+27|0)[0-9]{9}$/;
  return phoneRegex.test(cleanPhone);
}

export function showNotification(
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
): void {
  const notification = document.createElement("div");
  const bgColor =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
    }[type] || "bg-blue-500";

  notification.className = `fixed top-24 right-4 ${bgColor}  border-black border-2 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("animate-fade-out");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

export function showLoading(container: string | HTMLElement): void {
  const spinner = `
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  `;
  if (typeof container === "string") {
    const element = document.getElementById(container);
    if (element) {
      element.innerHTML = spinner;
    }
  } else {
    container.innerHTML = spinner;
  }
}

export function lazyLoadImages(): void {
  const images = document.querySelectorAll<HTMLImageElement>("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

export function buildResponsiveSrcSet(
  filename: string,
  folder = "/images/pics",
  widths: number[] = [480, 800, 1200, 1800],
): {
  webpSrcSet: string;
  fallbackSrcSet: string;
  sizes: string;
  fallback: string;
} {
  const parts = filename.split(".");
  const ext = parts.pop() || "jpg";
  const base = parts.join(".");
  const webpSrcSet = widths
    .map((w) => `${folder}/${base}-${w}.webp ${w}w`)
    .join(", ");
  const fallbackSrcSet = widths
    .map((w) => `${folder}/${base}-${w}.${ext} ${w}w`)
    .join(", ");
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  const fallback = `${folder}/${filename}`;
  return { webpSrcSet, fallbackSrcSet, sizes, fallback };
}

export const storage = {
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("Error saving to localStorage:", e);
      return false;
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return null;
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error("Error removing from localStorage:", e);
      return false;
    }
  },

  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error("Error clearing localStorage:", e);
      return false;
    }
  },
};

function validateForm(formId: string): boolean {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return false;

  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "input[required], textarea[required]",
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("border-red-500");
      isValid = false;
    } else {
      input.classList.remove("border-red-500");
    }

    // Email validation
    if (input.type === "email" && !isValidEmail(input.value)) {
      input.classList.add("border-red-500");
      isValid = false;
    }

    // Phone validation
    if (input.type === "tel" && !isValidPhone(input.value)) {
      input.classList.add("border-red-500");
      isValid = false;
    }
  });

  return isValid;
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text: string): void {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Copied to clipboard!", "success");
      })
      .catch(() => {
        showNotification("Failed to copy", "error");
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showNotification("Copied to clipboard!", "success");
  }
}

type SocialPlatform = "facebook" | "twitter" | "whatsapp" | "telegram";

function shareToSocial(
  platform: SocialPlatform,
  url: string,
  text: string,
): void {
  const shareUrls: Record<SocialPlatform, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(text)}`,
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  }
}

declare global {
  interface Window {
    formatPrice: typeof formatPrice;
    scrollToTop: typeof scrollToTop;
    getUrlParameter: typeof getUrlParameter;
    setUrlParameter: typeof setUrlParameter;
    debounce: typeof debounce;
    isValidEmail: (email: string) => boolean;
    isValidPhone: (phone: string) => boolean;
    showNotification: (
      message: string,
      type?: "success" | "error" | "info" | "warning",
    ) => void;
    showLoading: typeof showLoading;
    lazyLoadImages: typeof lazyLoadImages;
    storage: typeof storage;
    validateForm: typeof validateForm;
    copyToClipboard: typeof copyToClipboard;
    shareToSocial: typeof shareToSocial;
    buildResponsiveSrcSet: typeof buildResponsiveSrcSet;
  }
}

window.formatPrice = formatPrice;
window.scrollToTop = scrollToTop;
window.getUrlParameter = getUrlParameter;
window.setUrlParameter = setUrlParameter;
window.debounce = debounce;
window.isValidEmail = isValidEmail;
window.isValidPhone = isValidPhone;
window.showNotification = showNotification;
window.showLoading = showLoading;
window.lazyLoadImages = lazyLoadImages;
window.storage = storage;
window.validateForm = validateForm;
window.copyToClipboard = copyToClipboard;
window.shareToSocial = shareToSocial;
window.buildResponsiveSrcSet = buildResponsiveSrcSet;
