// src/utils/imageOptimization.ts

/**
 * Generate responsive image attributes with multiple sizes
 * Use this for product images, gallery images, etc.
 */
export const getResponsiveImageProps = (
  imagePath: string,
  alt: string,
  sizes?: string
) => {
  // Extract filename and create variants
  const filename = imagePath.split("/").pop() || "";
  const basePath = imagePath.substring(0, imagePath.lastIndexOf("/"));
  const [name, ext] = filename.split(".");

  // Generate srcset for different widths (you'll need to create these variants)
  const widths = [400, 800, 1200, 1600];
  const srcSet = widths
    .map((w) => `${basePath}/${name}-${w}w.${ext} ${w}w`)
    .join(", ");

  // Default sizes based on common breakpoints
  const defaultSizes =
    sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return {
    src: imagePath, // fallback
    srcSet,
    sizes: defaultSizes,
    alt,
    loading: "lazy" as const,
    decoding: "async" as const,
  };
};

/**
 * Progressive image loader component props
 * Shows blur placeholder while loading
 */
export const getProgressiveImageProps = (
  imagePath: string,
  alt: string,
  placeholderDataUrl?: string
) => {
  const lowQualityPlaceholder =
    placeholderDataUrl ||
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E`;

  return {
    src: imagePath,
    alt,
    loading: "lazy" as const,
    decoding: "async" as const,
    style: {
      backgroundImage: `url("${lowQualityPlaceholder}")`,
      backgroundSize: "cover",
    },
  };
};

/**
 * Preload critical images (hero, above-the-fold)
 * Call this in useEffect for critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Intersection Observer hook for lazy loading
 */
export const useImageLazyLoad = () => {
  const imageRefs = new Map<string, HTMLImageElement>();

  const observeImage = (key: string, element: HTMLImageElement | null) => {
    if (!element) return;

    imageRefs.set(key, element);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(element);
  };

  return observeImage;
};

/**
 * Image compression quality settings by use case
 */
export const IMAGE_QUALITY = {
  hero: 85, // High quality for hero images
  product: 80, // Good quality for product images
  thumbnail: 70, // Lower quality for thumbnails
  gallery: 75, // Medium quality for gallery
} as const;

/**
 * Generate image path with CDN or optimization service
 * In production, you'd route through image CDN like Cloudinary, Imgix, etc.
 
export const getOptimizedImageUrl = (
  path: string,
  options: {
    width?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpg";
  } = {}
) => {
  // For now, return original path
  // In production, construct CDN URL with transformations:
  // return `https://your-cdn.com/image/${path}?w=${options.width}&q=${options.quality}&f=${options.format}`;
  return path;
};
*/
/**
 * Responsive image component generator
 */
export const createResponsiveImage = (
  src: string,
  alt: string,
  className?: string
) => ({
  src,
  alt,
  className,
  loading: "lazy" as const,
  decoding: "async" as const,
  // Add srcset when you have image variants
  srcSet: undefined, // `${src} 1x, ${src.replace('.webp', '@2x.webp')} 2x`,
});

/**
 * Batch preload multiple images
 */
export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  const preloadPromises = imageUrls.map((url) => preloadImage(url));
  await Promise.all(preloadPromises);
};

/**
 * Check if image is in viewport
 */
export const isImageInViewport = (element: HTMLImageElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Image loading states
 */
export enum ImageLoadState {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

/**
 * Hook to track image loading state
 */
export const useImageLoadState = (src: string) => {
  const [loadState, setLoadState] = React.useState<ImageLoadState>(
    ImageLoadState.LOADING
  );

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setLoadState(ImageLoadState.LOADED);
    img.onerror = () => setLoadState(ImageLoadState.ERROR);
    img.src = src;
  }, [src]);

  return loadState;
};

// Add React import for hooks
import React from "react";
