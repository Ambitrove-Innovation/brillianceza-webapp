import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { CAMPAIGN } from "../../utils/campaignConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = CAMPAIGN.dropDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function BlackFridayBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [isLive, setIsLive] = useState(Date.now() >= CAMPAIGN.dropDate.getTime());

  useEffect(() => {
    if (Date.now() >= CAMPAIGN.endDate.getTime()) return;
    const id = setInterval(() => {
      if (Date.now() >= CAMPAIGN.dropDate.getTime()) setIsLive(true);
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Hidden when disabled or campaign window has passed
  if (!CAMPAIGN.enabled || Date.now() >= CAMPAIGN.endDate.getTime()) return null;

  const isInstagram = CAMPAIGN.ctaLink.includes("instagram.com");

  return (
    <div
      className="w-full bg-black text-white text-center py-2 px-3 sm:px-4"
      role="region"
      aria-label="Campaign announcement"
    >
      {isLive ? (
        /* ── LIVE STATE ── */
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
            {CAMPAIGN.label}
          </span>
          <span className="text-sm font-bold tracking-wide text-white animate-pulse">
            {CAMPAIGN.liveLabel}
          </span>
          <Link
            to={CAMPAIGN.liveLink}
            className="text-xs uppercase tracking-widest font-bold border border-white/40 hover:bg-white hover:text-black transition-all duration-200 px-3 py-0.5 rounded-sm"
          >
            {CAMPAIGN.liveLinkLabel}
          </Link>
        </div>
      ) : (
        /* ── COUNTDOWN STATE ── */
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {CAMPAIGN.label && (
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/60 hidden sm:inline">
              {CAMPAIGN.label}
            </span>
          )}

          <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90">
            {CAMPAIGN.teaser}
          </span>

          {/* Live countdown */}
          <div className="flex items-center gap-1 font-mono text-xs font-bold">
            <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(timeLeft.days)}d</span>
            <span className="text-white/40">:</span>
            <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(timeLeft.hours)}h</span>
            <span className="text-white/40">:</span>
            <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(timeLeft.minutes)}m</span>
            <span className="text-white/40">:</span>
            <span className="bg-white/10 rounded px-1.5 py-0.5">{pad(timeLeft.seconds)}s</span>
          </div>

          {/* Campaign CTA button — customizable via campaignConfig.ts */}
          {CAMPAIGN.showCta && (
            <a
              href={CAMPAIGN.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold border border-white/30 hover:bg-white hover:text-black transition-all duration-200 px-3 py-0.5 rounded-sm whitespace-nowrap"
              aria-label={CAMPAIGN.ctaLabel}
            >
              {isInstagram && <Instagram className="w-3.5 h-3.5" />}
              <span>{CAMPAIGN.ctaLabel}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
