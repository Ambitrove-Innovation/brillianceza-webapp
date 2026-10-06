// src/feature/pages/home/components/HeroSection.tsx
import { Link } from "react-router-dom";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

const HeroSection = ({
  imageSrc,
  title,
  subtitle,
  buttonText = "Shop Now",
  buttonLink = "/shop",
}: HeroSectionProps) => {
  return (
    <section className="relative">
      <img
        src={imageSrc}
        alt={title}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={600}
        className="w-full h-[520px] md:h-[640px] lg:h-[720px] object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/20" />
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
