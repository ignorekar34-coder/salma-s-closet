import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { createSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  whatsappNumber: string;
  onAddToCart: (product: Product, size: 'Unstitched' | 'Small (S)' | 'Medium (M)' | 'Large (L)' | 'Custom Stitching', notes?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  whatsappNumber,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'Unstitched' | 'Small (S)' | 'Medium (M)' | 'Large (L)' | 'Custom Stitching'>('Unstitched');
  const [customNote, setCustomNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, customNote);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappOrderUrl = createSingleProductWhatsAppUrl(
    product,
    whatsappNumber,
    selectedSize,
    customNote
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#F9F6F2] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-black hover:text-white transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Showcase Image */}
        <div className="w-full md:w-1/2 bg-stone-200 relative min-h-[380px] md:min-h-[550px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[11px] uppercase tracking-widest bg-[#1A1A1A] text-white px-2.5 py-1 font-medium">
              {product.category} Edition
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & WhatsApp Ordering */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-2">
              <span>SALMA'S CLOSET</span>
              <span>·</span>
              <span className="font-mono text-stone-400">{product.code}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-2 font-normal">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-medium ml-auto">
                {product.inStock ? 'In Stock (Ready to Dispatch)' : 'Sold Out'}
              </span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stitching / Size Options */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-stone-800">
                  Select Stitching / Size
                </label>
                <span className="text-[11px] text-stone-500">Unstitched or Ready-to-Wear</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Unstitched', 'Small (S)', 'Medium (M)', 'Large (L)', 'Custom Stitching'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-2 text-xs font-medium border text-center transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-stone-300 bg-stone-50 text-stone-700 hover:border-stone-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Notes input */}
            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-wider uppercase text-stone-800 mb-1.5">
                Special Requests / Measurements (Optional)
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g., Sleeves lining, special length, delivery date..."
                className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
              />
            </div>

            {/* 3-Piece Fabric Breakdown */}
            <div className="bg-[#FAF8F5] p-3.5 border border-[#EDE7DF] mb-6 text-xs text-stone-700 space-y-1.5">
              <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                Suit Specifications (3-Piece):
              </div>
              <div><strong className="text-stone-900">Shirt / Kameez:</strong> {product.details.shirt}</div>
              <div><strong className="text-stone-900">Dupatta:</strong> {product.details.dupatta}</div>
              <div><strong className="text-stone-900">Trouser:</strong> {product.details.trouser}</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
            {/* Direct WhatsApp Order */}
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant Order on WhatsApp</span>
            </a>

            {/* Add to Bag Button */}
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="w-full border-2 border-black text-black hover:bg-black hover:text-white py-3 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Added to Shopping Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* Guarantees */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>100% Original Fabric</span>
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-600" />
                <span>Cash on Delivery</span>
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>Bespoke Care</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
