import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import HeroSection from "./components/HeroSection";
import OptimizedImage from "../../../components/ui/OptimizedImage";
import { useProducts } from "../../../hooks/useProducts";
import { formatPrice, getActiveMarkdown } from "../../../utils/helpers";

const Homepage = () => {
  const { getFeatured } = useProducts();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/images/pics/l2.webp";
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  const brillianceCollection = getFeatured([
    "reflector-tshirt",
    "gum-elastic-wte-tshirt",
    "7-ways-brilliance",
    "more-fashion-sweater",
    "gum-elastic-wte-tshirt",
  ]);

  const euphoriaCollection = getFeatured([
    "og-wte-tshirt-pink",
    "wte-5p",
    "wte-hoodie",
    "uk-motion-wear-navy",
  ]);

  const bottomsCollection = getFeatured([
    "reflector-cargo-pants",
    "purple-strip-short",
    "white-cargo-pants",
    "blue-strip-short",
  ]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Link to={`/product/${product.id}`} className="block group">
      <div
        key={product.id}
        className="group transition-colors duration-300 relative">
        <div className="w-full aspect-[4/5] overflow-hidden relative bg-stone">
          <OptimizedImage
            src={`/images/pics/${product.images[0]}`}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${product.isSoldOut ? "grayscale" : "group-hover:scale-105"}`}
            width={400}
            height={400}
          />
          {product.isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 z-10">
              <span className="bg-white/90 text-ink px-5 py-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col items-start gap-1">
          <p className="text-xs md:text-sm uppercase tracking-[0.12em] text-ink w-full truncate">{product.name}</p>
          {product.isSoldOut ? (
            <button className="text-neutral-400 cursor-not-allowed p-0 uppercase tracking-[0.12em] text-xs" disabled>
              Sold Out
            </button>
          ) : (
            <button className="text-ink text-sm md:text-base font-medium p-0 cursor-pointer hover:underline underline-offset-4 transition max-w-full text-left">
              {getActiveMarkdown(product.markdown) ? (
                <span className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2">
                  <span className="line-through text-neutral-400 text-xs sm:text-sm">{formatPrice(product.price)}</span>
                  <span className="text-sm sm:text-base">{formatPrice(getActiveMarkdown(product.markdown)!.salePrice)}</span>
                </span>
              ) : (
                <span>{formatPrice(product.price)}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        imageSrc="/images/pics/l2.webp"
        title="Brilliance"
        subtitle="South African Streetwear Inspired by Hip-Hop Culture"
        buttonText="Shop Now"
        buttonLink="/shop"
      />

      <section className="bg-stone">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-12 gap-8 items-end">
          <h2 className="md:col-span-8 font-display text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight">
            Welcome To Euphoria
          </h2>
          <div className="md:col-span-4 flex flex-col gap-x-4 md:gap-x-6 gap-y-10">
            <p className="text-lg md:text-xl text-neutral-700">
              Intense Brightness Of Light To Your Drip
            </p>
            <Link to="/shop" className="view-all w-fit">
              Shop the collection →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="section-head">
          <div>
            <span className="eyebrow">01</span>
            <h2 className="section-title">Brilliance Collection</h2>
          </div>
          <Link to="/shop" className="view-all">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {brillianceCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-6">
        <OptimizedImage
          src="/images/pics/hello.webp"
          alt="Welcome to Euphoria Collection"
          className="w-full max-w-7xl mx-auto"
          width={1200}
          height={600}
        />
      </section>

      <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="section-head">
          <div>
            <span className="eyebrow">02</span>
            <h2 className="section-title">Welcome To Euphoria Collection</h2>
          </div>
          <Link to="/shop" className="view-all">View all →</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {euphoriaCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-start max-w-6xl mx-auto">
          <div className="col-span-7 aspect-[4/5] overflow-hidden bg-stone">
            <OptimizedImage
              src="/images/pics/s4.webp"
              alt="Streetwear Style 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              width={400}
              height={500}
            />
          </div>
          <div className="col-span-5 aspect-[4/5] overflow-hidden bg-stone mt-10 md:mt-24">
            <OptimizedImage
              src="/images/pics/s3.webp"
              alt="Streetwear Style 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              width={400}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="section-head">
          <div>
            <span className="eyebrow">03</span>
            <h2 className="section-title">Brilliance Bottoms</h2>
          </div>
          <Link to="/shop" className="view-all">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {bottomsCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="border-y border-ink/15 text-center py-16 md:py-24 mt-12">
        <p className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight px-4 max-w-4xl mx-auto">
          Inspired By Hip-Hop And Streetwear Fashion
        </p>

        <div className="text-center my-8">
          <a
            href="https://www.instagram.com/brilliance_za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-14 h-14 mx-2 border border-ink/30 rounded-full hover:bg-ink hover:text-white transition"
            aria-label="Instagram">
            <Instagram size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.tiktok.com/@brilliance_za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-14 h-14 mx-2 border border-ink/30 rounded-full hover:bg-ink hover:text-white transition"
            aria-label="TikTok">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
