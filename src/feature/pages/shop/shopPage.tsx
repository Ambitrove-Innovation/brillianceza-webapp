import { Link, useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Footer from "../../../components/layout/Footer";
import { useProducts } from "../../../hooks/useProducts";
import { formatPrice, scrollToTop, getActiveMarkdown } from "../../../utils/helpers";

const ShopPage = () => {
  const { tops, bottoms } = useProducts();

  const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();

    return (
      <Link to={`/product/${product.id}`} className="block group">
        <div className="transition-colors duration-300 relative">
          {/* Image */}
          <div className="w-full aspect-[4/5] overflow-hidden relative bg-stone">
            <img
              src={`/images/pics/${product.images[0]}`}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${product.isSoldOut ? "grayscale" : "group-hover:scale-105"}`}
              loading="lazy"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const img = e.currentTarget as HTMLImageElement;
                img.classList.remove("animate-ping");
                void img.offsetWidth; // trigger reflow
                img.classList.add("animate-ping");

                setTimeout(() => navigate(`/product/${product.id}`), 300);
              }}
            />
            {product.isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 z-10 pointer-events-none">
                <span className="bg-white/90 text-ink px-5 py-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pt-4 flex flex-col items-start gap-1">
            <p className="text-xs md:text-sm uppercase tracking-[0.12em] text-ink w-full truncate">{product.name}</p>
            {product.isSoldOut ? (
              <button className="text-neutral-400 cursor-not-allowed p-0 uppercase tracking-[0.12em] text-xs" disabled onClick={(e) => e.preventDefault()}>
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="container mx-auto px-4 md:px-6 py-6">
        <img
          src="/images/pics/B12.1.webp"
          alt="Shop Brilliance Collection"
          className="w-full max-w-7xl mx-auto object-cover"
        />
      </section>

      {/* Tops Section */}
      <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="section-head">
          <div>
            <span className="eyebrow">01</span>
            <h2 className="section-title">Brilliance Tops</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {tops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottoms Section */}
      <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="section-head">
          <div>
            <span className="eyebrow">02</span>
            <h2 className="section-title">Brilliance Bottoms</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {bottoms.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-ink text-white p-4 rounded-full shadow-lg hover:bg-brand transition z-50"
        aria-label="Scroll to top">
        <ArrowUp size={24} />
      </button>

      <Footer />
    </div>
  );
};

export default ShopPage;
