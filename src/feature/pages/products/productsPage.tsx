import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import OptimizedImage from "../../../components/ui/OptimizedImage";
import { getProductById, getRandomProducts } from "../../data/product";
import { formatPrice } from "../../../utils/helpers";
import { handleBuyNow } from "../../../utils/whatsappService";
import {
  isSelectionOnPromo,
  calculatePromoPrice,
  getPromoDetails,
} from "../../../utils/promoService";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  // Check if current selection is on promo
  const isCurrentSelectionOnPromo = currentProduct
    ? isSelectionOnPromo(currentProduct, selectedColor)
    : false;

  const currentPrice =
    currentProduct && isCurrentSelectionOnPromo
      ? calculatePromoPrice(currentProduct.price)
      : currentProduct?.price || 0;

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const product = getProductById(id);
    if (!product) {
      navigate("/");
      return;
    }

    setCurrentProduct(product);
    setSelectedSize(product.sizes[0] || "");
    setSelectedColor(product.colors[0] || "");
    setCurrentImageIndex(0);

    const recommended = getRandomProducts(3, id);
    setRecommendations(recommended);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, navigate]);

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  const changeMainImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBuyNowClick = () => {
    handleBuyNow({
      product: currentProduct,
      size: selectedSize,
      color: selectedColor,
      quantity,
      mainImageSrc: `/images/pics/${currentProduct.images[currentImageIndex]}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Promo Banner if product is on promo */}
      {getPromoDetails(currentProduct).isOnPromo && (
        <section className="bg-linear-to-r from-green-600 to-green-500 text-white py-4 shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-bold">
              🎉 30% OFF on White variants! Limited Time Offer! 🎉
            </p>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {/* Promo badge on main image */}
            <div className="mb-4 relative">
              {isCurrentSelectionOnPromo && (
                <div className="absolute top-4 left-4 z-10 animate-pulse">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg border border-black">
                    30% OFF
                  </span>
                </div>
              )}
              <OptimizedImage
                src={`/images/pics/${currentProduct.images[currentImageIndex]}`}
                alt={currentProduct.name}
                className="w-full rounded-lg shadow-lg cursor-pointer"
                width={800}
                height={800}
                priority
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {currentProduct.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail cursor-pointer w-20 h-20 rounded transition overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-black opacity-100"
                      : "hover:opacity-75 opacity-60"
                  }`}
                  onClick={() => changeMainImage(index)}>
                  <OptimizedImage
                    src={`/images/pics/${img}`}
                    alt={`${currentProduct.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{currentProduct.name}</h1>

            {/* Dynamic price display based on selection */}
            {isCurrentSelectionOnPromo ? (
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-500 line-through text-2xl">
                    {formatPrice(currentProduct.price)}
                  </span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold border border-black">
                    30% OFF
                  </span>
                </div>
                <p className="text-4xl font-bold text-red-600">
                  {formatPrice(currentPrice)}
                </p>
                <p className="text-green-600 text-lg font-semibold mt-1">
                  You save {formatPrice(currentProduct.price - currentPrice)}!
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold text-gray-800 mb-6">
                {formatPrice(currentProduct.price)}
              </p>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="size-select"
                  className="block text-lg font-semibold mb-2">
                  Size:
                </label>
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black">
                  {currentProduct.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="color-select"
                  className="block text-lg font-semibold mb-2">
                  Color:{" "}
                  {isSelectionOnPromo(currentProduct, selectedColor) && (
                    <span className="text-red-600 text-sm ml-2">
                      ⭐ 30% OFF!
                    </span>
                  )}
                </label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black">
                  {currentProduct.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}{" "}
                      {color.toLowerCase().includes("white") && "⭐ 30% OFF"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="quantity-select"
                  className="block text-lg font-semibold mb-2">
                  Quantity:
                </label>
                <select
                  id="quantity-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total price display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-gray-800">
                  {formatPrice(currentPrice * quantity)}
                </span>
              </div>
              {isCurrentSelectionOnPromo && (
                <p className="text-red-600 text-sm mt-2">
                  💰 Total savings:{" "}
                  {formatPrice(
                    (currentProduct.price - currentPrice) * quantity
                  )}
                </p>
              )}
            </div>

            <button
              onClick={handleBuyNowClick}
              className={`w-full ${
                isCurrentSelectionOnPromo
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              } text-white font-bold text-lg py-4 rounded-lg transition cursor-pointer`}>
              {isCurrentSelectionOnPromo ? "🎉 Buy Now - 30% OFF!" : "Buy Now"}
            </button>

            <div className="mt-8 p-6 bg-black text-white rounded-lg">
              {currentProduct.fit && (
                <p className="text-xl font-bold mb-2">
                  FIT | {currentProduct.fit}
                </p>
              )}
              <p className="text-base">{currentProduct.description}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="container mx-auto border-t-4 border-gray-800 my-12" />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product) => {
            const promo = getPromoDetails(product);
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block group">
                <div className="cardImageBorder relative">
                  {promo.isOnPromo && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        30% OFF
                      </span>
                    </div>
                  )}
                  <div className="overflow-hidden rounded mb-4">
                    <OptimizedImage
                      src={`/images/pics/${product.images[0]}`}
                      alt={product.name}
                      className="imageHoverEffect"
                      width={400}
                      height={400}
                    />
                  </div>
                  <p className="font-bold text-center mb-2">{product.name}</p>
                  {promo.isOnPromo ? (
                    <div className="space-y-1">
                      <div className="text-center text-gray-500 line-through text-sm">
                        {formatPrice(promo.originalPrice)}
                      </div>
                      <button className="purchaseBtn bg-red-600 hover:bg-red-700">
                        {formatPrice(promo.discountedPrice)}
                      </button>
                    </div>
                  ) : (
                    <button className="purchaseBtn">
                      {formatPrice(product.price)}
                    </button>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
