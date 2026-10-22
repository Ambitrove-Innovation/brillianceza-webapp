// src/components/ui/PageLoader.tsx
import React from "react";

/**
 * Editorial, minimal page loader used as the Suspense fallback
 * during route lazy-loading transitions.
 */
const PageLoader: React.FC = () => {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-stone/80" />
        <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-ink animate-spin" />
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">
        Brilliance
      </p>
    </div>
  );
};

export default PageLoader;
