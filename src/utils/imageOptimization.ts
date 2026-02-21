import React from "react";

export const getResponsiveImageProps = (
  imagePath: string,
  alt: string,
  sizes?: string,
) => {
  const filename = imagePath.split("/").pop() || "";
  const basePath = imagePath.substring(0, imagePath.lastIndexOf("/"));
  const [name, ext] = filename.split(".");

  // Generate srcset for different widths (you'll need to create these variants)
  const widths = [400, 800, 1200, 1600];
  const srcSet = widths
    .map((w) => `${basePath}/${name}-${w}w.${ext} ${w}w`)
    .join(", ");

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

export const getProgressiveImageProps = (
  imagePath: string,
  alt: string,
  placeholderDataUrl?: string,
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

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

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
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    observer.observe(element);
  };

  return observeImage;
};

export const IMAGE_QUALITY = {
  hero: 85,
  product: 80,
  thumbnail: 70,
  gallery: 75,
} as const;

export const createResponsiveImage = (
  src: string,
  alt: string,
  className?: string,
) => ({
  src,
  alt,
  className,
  loading: "lazy" as const,
  decoding: "async" as const,

  srcSet: undefined,
});

export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  const preloadPromises = imageUrls.map((url) => preloadImage(url));
  await Promise.all(preloadPromises);
};

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

export enum ImageLoadState {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

export const useImageLoadState = (src: string) => {
  const [loadState, setLoadState] = React.useState<ImageLoadState>(
    ImageLoadState.LOADING,
  );

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setLoadState(ImageLoadState.LOADED);
    img.onerror = () => setLoadState(ImageLoadState.ERROR);
    img.src = src;
  }, [src]);

  return loadState;
};
