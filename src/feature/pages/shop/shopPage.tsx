// src/feature/pages/shop/shopPage.tsx
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { getProductsByCategory } from "../../data/product";
import { formatPrice, scrollToTop } from "../../../utils/helpers";

const ShopPage = () => {
  const tops = getProductsByCategory("tops");
  const bottoms = getProductsByCategory("bottoms");

  const ProductCard = ({ product }: { product: any }) => (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition-all duration-300">
        <div className="overflow-hidden rounded mb-4">
          <img
            src={`/images/pics/${product.images[0]}`}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
      {/* Hero Banner */}
      <section className="container mx-auto px-4 py-8">
        <img
          src="/images/pics/B12.1.png"
          alt="Shop Brilliance Collection"
          className="w-full max-w-6xl mx-auto rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300"
        />
      </section>

      {/* Tops Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center">Brilliance Tops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottoms Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Brilliance Bottoms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bottoms.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
        aria-label="Scroll to top">
        <ArrowUp size={24} />
      </button>

      <Footer />
    </div>
  );
};

export default ShopPage;
