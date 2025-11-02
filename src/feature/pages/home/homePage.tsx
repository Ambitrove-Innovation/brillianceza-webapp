// src/feature/pages/home/homePage.tsx
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { getFeaturedProducts } from "../../data/product";
import { formatPrice } from "../../../utils/helpers";

const Homepage = () => {
  // Featured collections
  const brillianceCollection = getFeaturedProducts([
    "reflector-tshirt",
    "7-ways-brilliance",
    "more-fashion-sweater",
    "3bs-tshirt",
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

  const ProductCard = ({ product }: { product: any }) => (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="cardImageBorder">
        <div className="overflow-hidden rounded mb-4">
          <img
            src={`/images/pics/${product.images[0]}`}
            alt={product.name}
            className="imageHoverEffect"
            loading="lazy"
          />
        </div>
        <p className="font-bold text-center mb-2">{product.name}</p>
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {formatPrice(product.price)}
        </button>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <img
          src="/images/pics/l2.png"
          alt="Brilliance Clothing Brand Banner"
          loading="lazy"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-wider mb-3 hero-text">
            Welcome To Brilliance
          </h2>
          <p className="text-base md:text-xl mb-4">
            South African Streetwear Inspired by Hip-Hop Culture
          </p>
          <Link
            to="/shop"
            className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-semibold rounded hover:bg-gray-100 transition">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Welcome Message */}
      <div className="bg-black text-white text-center py-6">
        <p className="text-2xl md:text-3xl font-bold">Welcome To Euphoria</p>
      </div>
      <div className="bg-black text-white text-center py-4">
        <p className="text-xl md:text-2xl">
          Intense Brightness Of Light To Your Drip
        </p>
      </div>

      {/* Brilliance Collection */}
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

      {/* Welcome Banner */}
      <section className="container mx-auto px-4 py-8">
        <img
          src="/images/pics/hello.png"
          alt="Welcome to Euphoria Collection"
          className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Euphoria Collection */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Explore Our Welcome To Euphoria Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {euphoriaCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <img
            src="/images/pics/s4.png"
            alt="Streetwear Style 1"
            className="w-full sm:w-80 rounded-lg shadow-md"
          />
          <img
            src="/images/pics/s3.png"
            alt="Streetwear Style 2"
            className="w-full sm:w-80 rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Bottoms Collection */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Brilliance Bottoms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomsCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Message */}
      <div className="bg-black text-white text-center py-8 my-12">
        <p className="text-2xl md:text-3xl font-bold px-4">
          Inspired By Hip-Hop And Streetwear Fashion
        </p>
      </div>

      {/* Social Media Bar */}
      <div className="text-center my-8">
        <a
          href="https://www.instagram.com/brilliance_za"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-4 text-black hover:text-pink-500 transition"
          aria-label="Instagram">
          <Instagram size={48} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.tiktok.com/@brilliance_za"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mx-4 text-black hover:text-gray-600 transition"
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

      <Footer />
    </div>
  );
};

export default Homepage;
