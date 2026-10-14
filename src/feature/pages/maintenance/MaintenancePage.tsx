import { useEffect } from "react";
import { WHATSAPP_NUMBER } from "../../../utils/whatsappService";
import { MAINTENANCE_BACK_BY } from "../../../utils/maintenance";

/**
 * Full-screen holding page shown when maintenance mode is active.
 * Rendered in App.tsx before CartProvider/routes, so no nav or cart appears.
 * Injects a noindex meta tag so search engines do not index this temporary state.
 */
const MaintenancePage = () => {
  const year = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

  // Tab title + noindex meta — both cleaned up on unmount.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Back soon | Brilliance";

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-cream text-ink">
      {/* Minimal brand header — no nav, no cart drawer */}
      <header className="flex items-center justify-between px-4 py-5 md:px-6">
        <span className="font-display text-xl font-black uppercase tracking-tight">
          Brilliance
        </span>
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Scheduled update
        </span>
      </header>

      {/* Hero copy */}
      <section className="flex flex-1 flex-col justify-center px-4 py-10 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          {/* Animated pulse status dot */}
          <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            Update in progress
          </p>

          <h1 className="font-display text-[min(22vw,14rem)] font-black uppercase leading-[0.85] tracking-tight">
            Back
            <br />
            soon.
          </h1>

          <p className="mt-8 max-w-md text-lg text-neutral-600">
            We&apos;re giving the site a quick update. Your style will be right
            here when we&apos;re done.
          </p>

          {/* Optional return time — set via VITE_MAINTENANCE_BACK_BY env var */}
          {MAINTENANCE_BACK_BY && (
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em]">
              Expected back by {MAINTENANCE_BACK_BY}
            </p>
          )}

          {/* CTAs — keep orders flowing while the site is down */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 border border-ink bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cream hover:text-ink"
            >
              Order on WhatsApp
            </a>
            <div className="flex gap-6 text-xs font-semibold uppercase tracking-[0.2em]">
              <a
                href="https://www.instagram.com/brilliance_za"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-transparent pb-0.5 transition hover:border-ink"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@brilliance_za"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-transparent pb-0.5 transition hover:border-ink"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 py-6 text-xs text-neutral-500 md:px-6">
        &copy; {year} Brilliance Clothing. All rights reserved.
      </footer>
    </main>
  );
};

export default MaintenancePage;