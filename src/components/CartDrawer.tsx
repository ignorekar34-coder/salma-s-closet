import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { createCartWhatsAppUrl, CustomerOrderInfo } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
  freeShippingThreshold: number;
  shippingFee: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
  freeShippingThreshold,
  shippingFee,
}) => {
  const [customer, setCustomer] = useState<CustomerOrderInfo>(() => {
    const saved = localStorage.getItem('salma_customer_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      name: '',
      phone: '',
      city: 'Lahore',
      address: '',
      paymentMethod: 'Cash on Delivery (COD)',
      notes: '',
    };
  });

  const [formError, setFormError] = useState('');

  // Persist customer info for convenience
  useEffect(() => {
    localStorage.setItem('salma_customer_info', JSON.stringify(customer));
  }, [customer]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const actualShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : shippingFee;
  const grandTotal = subtotal + actualShipping;

  const handleCheckoutWhatsApp = () => {
    if (!customer.name.trim()) {
      setFormError('Apna naam zaroor darj karein (Please enter your name)');
      return;
    }
    if (!customer.phone.trim()) {
      setFormError('Apna phone / WhatsApp number darj karein');
      return;
    }
    if (!customer.address.trim()) {
      setFormError('Delivery address darj karein');
      return;
    }

    setFormError('');
    const whatsappUrl = createCartWhatsAppUrl(items, customer, whatsappNumber, actualShipping);
    window.open(whatsappUrl, '_blank');
  };

  const cities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Other / Overseas',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-lg bg-[#F9F6F2] h-full shadow-2xl flex flex-col border-l border-stone-300 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-300 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            <h2 className="font-serif text-lg text-stone-900 font-semibold tracking-wide">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-black hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF7F2] px-5 py-2.5 border-b border-stone-200 text-xs">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Mubarak! You unlocked <strong>FREE Delivery</strong> across Pakistan!</span>
            </p>
          ) : (
            <p className="text-stone-600">
              Add <strong>Rs. {(freeShippingThreshold - subtotal).toLocaleString()}</strong> more to get Free Delivery!
            </p>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-500">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-400 mb-3" />
              <p className="font-serif text-lg text-stone-800 mb-1">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Explore our Winter Edit suits in pure Khaddar, Velvet, and Karandi.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${index}`}
                    className="p-3 bg-white border border-stone-200 flex gap-3 relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-24 object-cover object-top bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm text-stone-900 font-normal leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Size: <span className="font-medium text-stone-800">{item.selectedSize}</span>
                        </div>
                        <div className="font-serif text-sm font-semibold text-stone-900 mt-1 tabular-nums">
                          Rs. {item.product.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-300 bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[11px] text-stone-500 ml-auto tabular-nums font-medium">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Delivery Information Form */}
              <div className="bg-white p-4 border border-stone-300 mt-5 space-y-3">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                    Delivery & Checkout Information
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Order confirmation message WhatsApp pe direct send hoga
                  </p>
                </div>

                {formError && (
                  <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Fatima Khan"
                      className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      City *
                    </label>
                    <select
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={customer.paymentMethod}
                      onChange={(e) => setCustomer({ ...customer, paymentMethod: e.target.value as any })}
                      className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    >
                      <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                      <option value="Bank Transfer (Meezan/HBL/EasyPaisa)">Bank Transfer / EasyPaisa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Complete Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="House / Flat no, Street, Sector / Area name..."
                    className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Order Notes / Stitching Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. Call before delivery, custom shirt length 40 inches"
                    className="w-full text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & WhatsApp Order Trigger */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-300 shadow-lg">
            <div className="space-y-1.5 text-xs text-stone-600 mb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span className="font-mono tabular-nums text-emerald-800">
                  {actualShipping === 0 ? 'FREE' : `Rs. ${actualShipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="tabular-nums">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Confirm Order on WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified WhatsApp Checkout</span>
              </span>
              <span>·</span>
              <span>No Advance Payment Needed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
