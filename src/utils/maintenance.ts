// src/utils/maintenance.ts
//
// Maintenance mode is OFF by default. Nothing changes for visitors unless you
// set VITE_MAINTENANCE_MODE=true in the host's environment variables and redeploy.
// See MAINTENANCE.md for the full step-by-step.

/** Optional "back by" text shown on the holding page, e.g. "3:00 PM". */
export const MAINTENANCE_BACK_BY: string | undefined =
  (import.meta.env.VITE_MAINTENANCE_BACK_BY as string | undefined)?.trim() ||
  undefined;

/**
 * Returns true when the site should show the maintenance holding page.
 *
 * Two ways to activate:
 *  1. Set VITE_MAINTENANCE_MODE=true in Netlify environment variables and redeploy.
 *  2. Append ?maintenance=preview to any URL to preview the page without taking
 *     the live site down.
 */
export const isMaintenanceMode = (): boolean => {
  // Real switch — baked in at build time by Vite.
  if (import.meta.env.VITE_MAINTENANCE_MODE === "true") return true;

  // Preview mode — visible only to whoever knows the URL.
  return (
    new URLSearchParams(window.location.search).get("maintenance") === "preview"
  );
};
