import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import HeroSection from "./components/HeroSection";
import OptimizedImage from "../../../components/ui/OptimizedImage";
import { getFeaturedProducts } from "../../data/product";
import { formatPrice } from "../../../utils/helpers";

const Homepage = () => {
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

  const brillianceCollection = getFeaturedProducts([
    "reflector-tshirt",
    "7-ways-brilliance",
    "more-fashion-sweater",
    "gum-elastic-wte",
  ]);

  const euphoriaCollection = getFeaturedProducts([
    "og-wte-tshirt-pink",
    "wte-5p",
    "wte-hoodie",
    "uk-motion-wear-navy",
  ]);

  const bottomsCollection = getFeaturedProducts([
    "reflector-cargo-pants",
    "purple-strip-short",
    "white-cargo-pants",
    "blue-strip-short",
  ]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Link to={`/product/${product.id}`} className="block group">
      <div
        key={product.id}
        className="group border-2 border-black bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full aspect-square overflow-hidden">
          <OptimizedImage
            src={`/images/pics/${product.images[0]}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={400}
          />
        </div>

        <div className="p-4 text-center">
          <p className="font-semibold text-gray-800 mb-2">{product.name}</p>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition">
            {formatPrice(product.price)}
          </button>
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

      <div className="bg-black text-white text-center py-6">
        <p className="text-2xl md:text-3xl font-bold">Welcome To Euphoria</p>
      </div>
      <div className="bg-black text-white text-center py-4">
        <p className="text-xl md:text-2xl">
          Intense Brightness Of Light To Your Drip
        </p>
      </div>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Brilliance Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brillianceCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <OptimizedImage
          src="/images/pics/hello.webp"
          alt="Welcome to Euphoria Collection"
          className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
          width={1200}
          height={600}
        />
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wide">
          Explore Our Welcome To Euphoria Collection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {euphoriaCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="w-full aspect-square overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src="/images/pics/s4.webp"
              alt="Streetwear Style 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={400}
            />
          </div>
          <div className="w-full aspect-square overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src="/images/pics/s3.webp"
              alt="Streetwear Style 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase tracking-tight">
          Brilliance Bottoms
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bottomsCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="bg-black text-white text-center py-8 my-12">
        <p className="text-2xl md:text-3xl font-bold px-4">
          Inspired By Hip-Hop And Streetwear Fashion
        </p>

        <div className="text-center my-8">
          <a
            href="https://www.instagram.com/brilliance_za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 hover:text-pink-500 transition"
            aria-label="Instagram">
            <Instagram size={48} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.tiktok.com/@brilliance_za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 hover:text-blue-500 transition"
            aria-label="TikTok">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
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
