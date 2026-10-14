import React from "react";

/**
 * Skeleton loader for individual product cards in grids
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse" aria-hidden="true">
      {/* Image container skeleton */}
      <div className="w-full aspect-4/5 bg-stone/70 rounded-xs relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Product metadata skeleton */}
      <div className="pt-4 flex flex-col items-start gap-2">
        {/* Title skeleton */}
        <div className="h-4 bg-stone/80 rounded w-3/4" />
        {/* Price skeleton */}
        <div className="h-4 bg-stone/60 rounded w-1/3" />
      </div>
    </div>
  );
};

/**
 * Responsive grid of product card skeletons
 */
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 4,
}) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10"
      aria-label="Loading products"
      role="status"
    >
      <span className="sr-only">Loading products...</span>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Detailed skeleton placeholder for the Product Detail Page
 */
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div
      className="container mx-auto px-4 py-12 animate-pulse"
      aria-label="Loading product details"
      role="status"
    >
      <span className="sr-only">Loading product details...</span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column: Image gallery skeleton */}
        <div>
          {/* Main image skeleton */}
          <div className="w-full aspect-square bg-stone/70 rounded-xs mb-4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
          </div>
          {/* Thumbnails row */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-stone/70 rounded-xs shrink-0" />
            ))}
          </div>
        </div>

        {/* Right column: Info & options skeleton */}
        <div className="space-y-6">
          {/* Title & Badge */}
          <div className="space-y-2">
            <div className="h-10 bg-stone/80 rounded w-3/4" />
            <div className="h-6 bg-stone/60 rounded w-1/4" />
          </div>

          {/* Select inputs */}
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="h-4 bg-stone/70 rounded w-16" />
              <div className="h-12 bg-stone/50 rounded w-full border border-stone" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-stone/70 rounded w-16" />
              <div className="h-12 bg-stone/50 rounded w-full border border-stone" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-stone/70 rounded w-20" />
              <div className="h-12 bg-stone/50 rounded w-full border border-stone" />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 space-y-3">
            <div className="h-14 bg-ink/30 rounded w-full" />
            <div className="h-12 bg-stone/60 rounded w-full" />
          </div>

          {/* Description box */}
          <div className="mt-8 p-6 bg-stone/40 space-y-2 rounded">
            <div className="h-5 bg-stone/70 rounded w-1/3" />
            <div className="h-4 bg-stone/60 rounded w-full" />
            <div className="h-4 bg-stone/60 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};
