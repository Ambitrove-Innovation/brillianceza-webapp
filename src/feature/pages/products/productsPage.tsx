// src/feature/pages/products/productsPage.tsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import OptimizedImage from "../../../components/ui/OptimizedImage";
import { getProductById, getRandomProducts } from "../../data/product";
import { formatPrice } from "../../../utils/helpers";
import { handleBuyNow } from "../../../utils/whatsappService";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

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
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4">
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
            <p className="text-3xl font-bold text-gray-800 mb-6">
              {formatPrice(currentProduct.price)}
            </p>

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
                  Color:
                </label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black">
                  {currentProduct.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
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

            <button
              onClick={handleBuyNowClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-lg transition cursor-pointer">
              Buy Now
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
          {recommendations.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block group">
              <div className="cardImageBorder">
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
                <button className="purchaseBtn">
                  {formatPrice(product.price)}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
