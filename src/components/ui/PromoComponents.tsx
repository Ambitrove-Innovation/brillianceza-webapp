// Reusable promo badge and price display components

import { getPromoDetails, getPromoBadgeProps } from "../../utils/promoService";
import { formatPrice } from "../../utils/helpers";

export const PromoBadge = () => {
  const badgeProps = getPromoBadgeProps();
  return <span className={badgeProps.className}>{badgeProps.text}</span>;
};

interface PromoPriceProps {
  product: Product;
  className?: string;
}

export const PromoPrice = ({ product, className = "" }: PromoPriceProps) => {
  const promo = getPromoDetails(product);

  if (!promo.isOnPromo) {
    return (
      <span className={`text-xl font-bold ${className}`}>
        {formatPrice(product.price)}
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="text-gray-500 line-through text-sm">
        {formatPrice(promo.originalPrice)}
      </span>
      <span className="text-red-600 text-xl font-bold">
        {formatPrice(promo.discountedPrice)}
      </span>
      <span className="text-green-600 text-xs font-semibold">
        Save {formatPrice(promo.savings)}!
      </span>
    </div>
  );
};

/**
 * Product Card with Promo Badge
 */
interface PromoProductCardProps {
  product: Product;
  imageUrl: string;
  onClickImage?: (e: React.MouseEvent) => void;
}

export const PromoProductCard = ({
  product,
  imageUrl,
  onClickImage,
}: PromoProductCardProps) => {
  const promo = getPromoDetails(product);

  return (
    <div className="transition-colors duration-300">
      {/* Image with badge */}
      <div className="w-full aspect-[4/5] overflow-hidden relative bg-stone">
        {promo.isOnPromo && (
          <div className="absolute top-2 left-2 z-10">
            <PromoBadge />
          </div>
        )}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onClick={onClickImage}
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
            <button className="bg-brand text-white py-2 px-4 rounded-full hover:bg-brand-dark transition font-bold">
              {formatPrice(promo.discountedPrice)}
            </button>
          </div>
        ) : (
          <button className="bg-ink text-white py-2 px-4 rounded-full hover:bg-brand transition">
            {formatPrice(product.price)}
          </button>
        )}
      </div>
    </div>
  );
};
