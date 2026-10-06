import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductId, addToCart, wishlist, toggleWishlist } = useStore();

  const isSaved = wishlist.includes(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-[#F4F4F1] overflow-hidden cursor-pointer" onClick={() => setSelectedProductId(product.id)}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
          onError={(e) => {
            // Elegant CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Fallback container if image fails */}
        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center -z-10 text-xs text-stone-400">
          {product.name}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
            isSaved
              ? 'bg-amber-700 text-white shadow-xs'
              : 'bg-white/90 text-stone-600 hover:text-stone-900 shadow-xs'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Discount Kicker */}
        {discountPercent && (
          <span className="absolute top-2.5 left-2.5 bg-stone-900/90 text-white text-[11px] font-mono font-medium px-2 py-0.5 rounded tracking-wide">
            {discountPercent}% OFF
          </span>
        )}

        {/* City Origin Indicator */}
        <span className="absolute bottom-2 left-2 text-[10px] text-stone-600 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-stone-200/60 font-medium">
          Crafted in {product.originCity}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider text-[11px] font-medium text-amber-800">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-stone-600">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs font-semibold">{product.rating}</span>
              <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProductId(product.id)}
            className="font-medium text-stone-900 text-sm leading-snug hover:text-emerald-900 transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono tabular-nums text-base font-bold text-stone-950">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-mono tabular-nums text-xs text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium mt-0.5">
              <Check className="w-3 h-3 text-emerald-700" />
              <span>Cash on Delivery</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (product.variants && product.variants.length > 0) {
                // If has variants, open modal for size/variant choice
                setSelectedProductId(product.id);
              } else {
                addToCart(product, undefined, 1);
              }
            }}
            className="p-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg transition-colors cursor-pointer"
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
