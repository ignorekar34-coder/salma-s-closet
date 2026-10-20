import React from 'react';
import { X, Heart, MessageCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { createSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  whatsappNumber: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onAddToCart,
  whatsappNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-[#F9F6F2] h-full shadow-2xl flex flex-col border-l border-stone-300 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-300 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-current" />
            <h2 className="font-serif text-lg text-stone-900 font-semibold tracking-wide">
              Saved Suits ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-black hover:bg-stone-100 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-500">
              <Heart className="w-12 h-12 stroke-[1.2] text-stone-300 mb-3" />
              <p className="font-serif text-lg text-stone-800 mb-1">No saved suits yet</p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Click the heart icon on any suit in our Winter Edit to save it here.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors"
              >
                Explore Suits
              </button>
            </div>
          ) : (
            items.map((product) => {
              const waUrl = createSingleProductWhatsAppUrl(product, whatsappNumber, 'Unstitched 3-Piece');
              return (
                <div
                  key={product.id}
                  className="p-3 bg-white border border-stone-200 flex gap-3 relative"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-24 object-cover object-top bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm text-stone-900 font-normal leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{product.fabric}</div>
                      <div className="font-serif text-sm font-semibold text-stone-900 mt-1 tabular-nums">
                        Rs. {product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-1.5 px-2 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Order WA</span>
                      </a>
                      <button
                        onClick={() => {
                          onAddToCart(product);
                        }}
                        className="border border-stone-800 text-stone-900 hover:bg-black hover:text-white py-1.5 px-2 text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
