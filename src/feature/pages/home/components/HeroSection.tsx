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
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center text-white px-4">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-wider mb-3 hero-text">
          {title}
        </h2>
        <p className="text-base md:text-xl mb-4 max-w-2xl">{subtitle}</p>
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-semibold rounded hover:bg-gray-100 transition">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
