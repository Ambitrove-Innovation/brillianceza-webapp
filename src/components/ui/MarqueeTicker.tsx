// src/components/ui/MarqueeTicker.tsx
// Seamless infinite scrolling marquee ticker ribbon for promotional highlights

import { CAMPAIGN } from "../../utils/campaignConfig";

interface MarqueeTickerProps {
  /** Optional custom background color class, defaults to bg-black */
  bgClass?: string;
  /** Optional custom text color class, defaults to text-white */
  textClass?: string;
}

function getDailyHighlight(): string {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth(); // 10 = November
  if (month === 10) {
    if (date === 25) return "TODAY: 18% OFF R349 TEES & SWEATERS";
    if (date === 26) return "TODAY: 30% OFF ALL R279 TEES";
    if (date >= 27) return "BLACK FRIDAY LIVE: UP TO 50% OFF CAPS, TEES & BOTTOMS";
  }
  return "BLACK FRIDAY DEALS WE'RE COOKING";
}

export default function MarqueeTicker({
  bgClass = "bg-black",
  textClass = "text-white",
}: MarqueeTickerProps) {
  const isCampaignActive =
    CAMPAIGN.enabled && Date.now() < CAMPAIGN.endDate.getTime();

  // Automatically roll back and disappear once event ends
  if (!isCampaignActive) return null;

  const tickerItems = [
    "🔥 BLACK FRIDAY IS LIVE",
    "UP TO 50% OFF ONLINE",
    "NEW DAILY DROPS",
    getDailyHighlight(),
    "FREE DELIVERY OVER R500",
    "LIMITED DROP STOCK",
    "WELCOME TO EUPHORIA",
    "BRILLIANCE ZA",
  ];

  return (
    <div
      className={`w-full overflow-hidden py-3 border-y border-white/10 select-none ${bgClass} ${textClass}`}
      role="marquee"
      aria-label="Black Friday promotions marquee"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for continuous, gapless looping */}
        {[...Array(2)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center shrink-0">
            {tickerItems.map((item, itemIndex) => (
              <span
                key={itemIndex}
                className="flex items-center text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] mx-4"
              >
                <span>{item}</span>
                <span className="text-red-500 mx-4 text-xs select-none">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
