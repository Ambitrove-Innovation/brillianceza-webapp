// src/feature/pages/home/components/HeroSection.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  imageSrc: string;
  /** Add more images here and the hero fades between all of them, in a loop. */
  extraImages?: string[];
  /** Optional custom object-position per image (e.g. { "/images/pics/hero-banner.jpg": "center 28%" }) */
  imagePositions?: Record<string, string>;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  /** How long each image stays on screen, in milliseconds. */
  interval?: number;
}

const FADE_MS = 1400; // cross-fade between images
const DRIFT_MS = 7000; // slow, subtle zoom on the visible image

const HeroSection = ({
  imageSrc,
  extraImages = [],
  imagePositions = {},
  title,
  subtitle,
  buttonText = "Shop Now",
  buttonLink = "/shop",
  interval = 5500,
}: HeroSectionProps) => {
  const slideKey = [imageSrc, ...extraImages].join("|");
  const slides = useMemo(() => slideKey.split("|"), [slideKey]);
  const count = slides.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [started, setStarted] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // lets the very first image start its slow zoom instead of appearing zoomed
  useEffect(() => {
    const id = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // don't burn through slides while the tab is in the background
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // autoplay loop: 1 -> 2 -> (3 ->) 1 -> ...
  useEffect(() => {
    if (count < 2 || paused || tabHidden || reduceMotion) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % count),
      interval,
    );
    return () => window.clearTimeout(id);
  }, [active, count, paused, tabHidden, reduceMotion, interval]);

  const current = active % count;

  return (
    <section
      className="relative overflow-hidden bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      <div className="relative h-130 md:h-160 lg:h-180">
        {slides.map((src, i) => {
          const isActive = i === current;
          return (
            <img
              key={src}
              src={src}
              alt={isActive ? title : ""}
              aria-hidden={!isActive}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              width={1920}
              height={600}
              style={{
                objectPosition: imagePositions[src] || "center center",
                transition: `opacity ${FADE_MS}ms ease-in-out, transform ${DRIFT_MS}ms ease-out`,
                transform:
                  isActive && started && count > 1 && !reduceMotion
                    ? "scale(1.06)"
                    : "scale(1)",
              }}
              className={`absolute inset-0 h-full w-full object-cover ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/20" />

      {/* Counter + jump lines (only when there is more than one image) */}
      {count > 1 && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-4 text-white md:right-6 md:top-6">
          <span className="font-mono text-[11px] tracking-[0.2em]">
            {String(current + 1).padStart(2, "0")}/
            {String(count).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {slides.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === current}
                onClick={() => setActive(i)}
                className="group py-2 cursor-pointer">
                <span
                  className={`block h-px w-8 transition-colors duration-500 ${
                    i === current
                      ? "bg-white"
                      : "bg-white/40 group-hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0">
        <div className="container mx-auto px-4 md:px-6 pb-10 md:pb-16 text-white">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight">
            {title}
          </h2>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="max-w-md text-base md:text-lg text-white/85">
              {subtitle}
            </p>
            {buttonText && buttonLink && (
              <Link
                to={buttonLink}
                className="inline-flex w-fit items-center gap-3 border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition">
                {buttonText} <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
