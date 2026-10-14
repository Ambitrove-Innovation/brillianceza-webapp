// src/hooks/useProducts.ts
//
// Single source of truth for all product data access in the app.
// Pages import this hook instead of calling product.ts functions directly.
//
// WHY THIS EXISTS:
//   - Centralises all product logic: filtering, sold-out sorting, sale detection
//   - All derived lists are memoised — zero recalculation on re-renders
//   - Sold-out products are automatically sorted to the END of category lists,
//     so customers always see available stock first (better UX, higher conversion)
//   - When the data source changes (e.g. static → Supabase API), ONLY this
//     file needs to change — all pages continue to work unchanged
//
// USAGE:
//   const { tops, bottoms, getById, getRecommendations, hasActiveSale } = useProducts();

import { useMemo } from "react";
import {
  products,
  getProductById,
  getProductsByCategory,
  getRandomProducts,
  getFeaturedProducts,
} from "../feature/data/product";
import { getActiveMarkdown } from "../utils/helpers";

type Category = "tops" | "bottoms" | "accessories";

export interface UseProductsReturn {
  /** The full unfiltered product catalogue */
  allProducts: Product[];
  /** Products that are currently in stock (isSoldOut is falsy) */
  availableProducts: Product[];
  /** Products that are sold out */
  soldOutProducts: Product[];
  /** Products that have an active markdown/sale right now */
  activeSaleProducts: Product[];

  /** Tops — available items first, sold-out pushed to end */
  tops: Product[];
  /** Bottoms — available items first, sold-out pushed to end */
  bottoms: Product[];
  /** Accessories — available items first, sold-out pushed to end */
  accessories: Product[];

  /** Get products for any category, sorted available-first */
  getByCategory: (category: Category) => Product[];
  /** Look up a single product by its slug ID */
  getById: (id: string) => Product | undefined;
  /** Random products for recommendations, excluding an optional ID */
  getRecommendations: (count: number, excludeId?: string) => Product[];
  /** Get specific products by an array of IDs (for homepage collections) */
  getFeatured: (ids: string[]) => Product[];

  /** True if the product is currently sold out */
  isSoldOut: (product: Product) => boolean;
  /** True if the product has an active markdown/sale today */
  hasActiveSale: (product: Product) => boolean;
}

/** Sort a list: available products first, sold-out pushed to the end */
function sortAvailableFirst(list: Product[]): Product[] {
  return [
    ...list.filter((p) => !p.isSoldOut),
    ...list.filter((p) => p.isSoldOut),
  ];
}

export function useProducts(): UseProductsReturn {
  // The full catalogue — stable reference, never changes at runtime
  const allProducts = useMemo(() => products, []);

  // Available / sold-out splits
  const availableProducts = useMemo(
    () => allProducts.filter((p) => !p.isSoldOut),
    [allProducts]
  );

  const soldOutProducts = useMemo(
    () => allProducts.filter((p) => Boolean(p.isSoldOut)),
    [allProducts]
  );

  // Products with an active sale right now
  const activeSaleProducts = useMemo(
    () => allProducts.filter((p) => getActiveMarkdown(p.markdown) !== null),
    [allProducts]
  );

  // Category lists — sold-out items sorted to the bottom automatically
  const tops = useMemo(
    () => sortAvailableFirst(getProductsByCategory("tops")),
    []
  );
  const bottoms = useMemo(
    () => sortAvailableFirst(getProductsByCategory("bottoms")),
    []
  );
  const accessories = useMemo(
    () => sortAvailableFirst(getProductsByCategory("accessories")),
    []
  );

  // Stable function reference for dynamic category lookup
  const getByCategory = useMemo(
    () =>
      (category: Category): Product[] =>
        sortAvailableFirst(getProductsByCategory(category)),
    []
  );

  // Helpers
  const isSoldOut = (product: Product): boolean => Boolean(product.isSoldOut);
  const hasActiveSale = (product: Product): boolean =>
    getActiveMarkdown(product.markdown) !== null;

  return {
    allProducts,
    availableProducts,
    soldOutProducts,
    activeSaleProducts,
    tops,
    bottoms,
    accessories,
    getByCategory,
    getById: getProductById,
    getRecommendations: getRandomProducts,
    getFeatured: getFeaturedProducts,
    isSoldOut,
    hasActiveSale,
  };
}
