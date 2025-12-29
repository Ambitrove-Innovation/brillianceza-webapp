import { Link, useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { getProductsByCategory } from "../../data/product";
import { formatPrice, scrollToTop } from "../../../utils/helpers";
import { getPromoDetails } from "../../../utils/promoService";

const ShopPage = () => {
  const tops = getProductsByCategory("tops");
  const bottoms = getProductsByCategory("bottoms");

  const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const promo = getPromoDetails(product);

    return (
      <Link to={`/product/${product.id}`} className="block group">
        <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Image with promo badge */}
          <div className="w-full aspect-square overflow-hidden relative">
            {promo.isOnPromo && (
              <div className="absolute top-2 left-2 z-10 ">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg border border-black">
                  30% OFF
                </span>
              </div>
            )}
            <img
              src={`/images/pics/${product.images[0]}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const img = e.currentTarget as HTMLImageElement;
                img.classList.remove("animate-pulse");
                void img.offsetWidth;
                img.classList.add("animate-pulse");
                setTimeout(() => navigate(`/product/${product.id}`), 300);
              }}
            />
          </div>

          {/* Product Info */}
          <div className="p-4 text-center">
            <p className="font-semibold text-gray-800 mb-2">{product.name}</p>

            {promo.isOnPromo ? (
              <div className="space-y-1">
                <div className="text-gray-500 line-through text-sm">
                  {formatPrice(promo.originalPrice)}
                </div>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-bold">
                  {formatPrice(promo.discountedPrice)}
                </button>
                <div className="text-green-600 text-xs font-semibold">
                  Save {formatPrice(promo.savings)}!
                </div>
              </div>
            ) : (
              <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition">
                {formatPrice(product.price)}
              </button>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Promo Banner */}
      <section className="bg-linear-to-r from-green-600 to-green-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-pulse">
            🎉 LIMITED TIME OFFER! 🎉
          </h2>
          <p className="text-lg md:text-xl">
            Get <span className="font-black text-yellow-300">30% OFF</span> All
            White Shirts!
          </p>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="container mx-auto px-4 py-8">
        <img
          src="/images/pics/B12.1.webp"
          alt="Shop Brilliance Collection"
          className="w-full max-w-6xl mx-auto rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 object-cover"
        />
      </section>

      {/* Tops Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase tracking-tight">
          Brilliance Tops
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {tops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottoms Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase tracking-tight">
          Brilliance Bottoms
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {bottoms.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 hover:animate-pulse transition z-50"
        aria-label="Scroll to top">
        <ArrowUp size={24} />
      </button>

      <Footer />
    </div>
  );
};

export default ShopPage;
