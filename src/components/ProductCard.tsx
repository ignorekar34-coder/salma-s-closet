import React, { useState } from 'react';
import { MessageCircle, Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { createSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  whatsappNumber,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const whatsappUrl = createSingleProductWhatsAppUrl(product, whatsappNumber, 'Unstitched 3-Piece');

  return (
    <article className="group bg-white border border-[#EAE4DC] flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-600 p-4 text-center">
            <span className="font-serif text-lg">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.fabric}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:text-black hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Top Kicker Label (Clean Unboxed Text) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="text-[10px] tracking-widest uppercase bg-[#1A1A1A] text-white px-2 py-0.5 font-medium">
              New Arrival
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] tracking-widest uppercase bg-stone-700 text-white px-2 py-0.5 font-medium">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="px-3 py-1.5 bg-white text-stone-900 text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 shadow hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Fabric metadata (Unboxed, clean) */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10px] text-stone-400">{product.code}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base text-stone-900 font-normal hover:text-amber-900 cursor-pointer transition-colors leading-snug line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Fabric Line */}
          <p className="text-xs text-stone-600 line-clamp-1 mb-3">
            {product.fabric}
          </p>
        </div>

        {/* Price & Action Strip */}
        <div className="pt-2 border-t border-[#F2EDE6]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold text-stone-900 tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium">
              {product.inStock ? 'Ready to Dispatch' : 'Out of Stock'}
            </span>
          </div>

          {/* Action Buttons: WhatsApp Direct (Priority) + Add to Bag */}
          <div className="flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              title="Order this suit directly via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Order on WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white py-1.5 text-xs tracking-wider uppercase font-medium transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
