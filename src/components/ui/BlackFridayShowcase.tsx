// src/components/ui/BlackFridayShowcase.tsx
// High-energy Black Friday showcase block inspired by streetwear campaign visuals

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CAMPAIGN } from "../../utils/campaignConfig";

export default function BlackFridayShowcase() {
  const isCampaignActive =
    CAMPAIGN.enabled && Date.now() < CAMPAIGN.endDate.getTime();

  // Automatically roll back and disappear once event ends
  if (!isCampaignActive) return null;
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
        {/* ── LEFT COLUMN: Headline & Offer Cards (5 cols) ── */}
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
          {/* Card 1: Black Friday Is Now Live */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-black/10 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-600 mb-2 block">
                ★ Limited Drop Week
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-black">
                Black
                <br />
                Friday
              </h2>
            </div>

            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#ff5722] hover:bg-[#e64a19] text-white text-xs md:text-sm font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Is Now Live</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>

          {/* Card 2: Up to 50% Off Gradient Block */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl p-8 md:p-10 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <p className="text-sm md:text-base font-extrabold uppercase tracking-[0.25em] text-white/90">
                Up To
              </p>
              <p className="font-display text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mt-1">
                50%
                <br />
                OFF
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white/90">
              <span>Online Only</span>
              <span>25 – 30 Nov</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Editorial Fashion Visual with Sticker Badges (7 cols) ── */}
        <div className="lg:col-span-7 relative bg-neutral-900 rounded-3xl overflow-hidden min-h-[460px] md:min-h-[580px] shadow-lg flex flex-col justify-between">
          {/* Background Model Image */}
          <img
            src="/images/pics/B12.1.webp"
            alt="Brilliance Black Friday Collection"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
          />

          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

          {/* ── Diagonal Tape Banner (Top Right) ── */}
          <div className="absolute top-6 -right-12 rotate-[25deg] bg-[#ff5722] text-white px-14 py-1.5 shadow-xl font-extrabold text-[11px] uppercase tracking-[0.25em] z-20 whitespace-nowrap border-y border-white/20 select-none">
            Payday ★ Daily Drops ★ Brilliance
          </div>

          {/* ── Floating Stamp/Sticker Badges ── */}
          <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3 max-w-xs pointer-events-none">
            {/* Stamp Badge 1 */}
            <div className="inline-block bg-[#a855f7] text-white px-4 py-2 rounded-lg font-black text-xs md:text-sm uppercase tracking-wider shadow-lg transform -rotate-3 border-2 border-white/30 w-fit">
              ★ Limited Stock
            </div>

            {/* Stamp Badge 2 */}
            <div className="inline-block bg-[#7e22ce] text-white px-5 py-2.5 rounded-lg font-black text-sm md:text-base uppercase tracking-tight leading-tight shadow-xl transform rotate-2 border-2 border-white/30 w-fit">
              Bigger Deals
              <br />
              Than Ever
            </div>

            {/* Stamp Badge 3 */}
            <div className="inline-block bg-[#9333ea] text-white px-4 py-1.5 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md transform -rotate-1 border-2 border-white/30 w-fit">
              New Daily Drops
            </div>
          </div>

          {/* ── Bottom Brand Strip & CTA ── */}
          <div className="relative z-10 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-auto">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                Euphoria Streetwear
              </p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                Elevate Your Drip
              </p>
            </div>

            <Link
              to="/shop"
              className="bg-white hover:bg-cream text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-200 hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
            >
              Shop All Deals →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
