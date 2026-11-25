// src/components/ui/MarqueeTicker.tsx
// Seamless infinite scrolling marquee ticker ribbon for promotional highlights

interface MarqueeTickerProps {
  /** Optional custom background color class, defaults to bg-black */
  bgClass?: string;
  /** Optional custom text color class, defaults to text-white */
  textClass?: string;
}

const TICKER_ITEMS = [
  "🔥 BLACK FRIDAY IS LIVE",
  "UP TO 50% OFF ONLINE",
  "NEW DAILY DROPS",
  "TODAY: 18% OFF R349 TEES & SWEATERS",
  "FREE DELIVERY OVER R500",
  "LIMITED DROP STOCK",
  "WELCOME TO EUPHORIA",
  "BRILLIANCE ZA",
];

export default function MarqueeTicker({
  bgClass = "bg-black",
  textClass = "text-white",
}: MarqueeTickerProps) {
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
            {TICKER_ITEMS.map((item, itemIndex) => (
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
